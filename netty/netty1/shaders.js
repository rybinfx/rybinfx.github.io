const vertex_shader = `
#version 100
precision highp float;

attribute vec2 uv;
attribute vec3 position;
varying vec4 vUV;

void main() {
    gl_Position = vec4(position.xy, 0.0, 1.0);
    vUV = vec4(position.xy*0.5+0.5, position.xy*0.5+0.5);
}
`;

const blit_shader = `
#version 100
precision highp float;

varying vec4 vUV;
uniform sampler2D tex;

void main() {
  gl_FragColor = texture2D(tex, vUV.xy);
//   gl_FragColor = vec4(vUV.xy, 0.0, 1.0);
}
`;

const blur_shader = `
#version 100
precision highp float;

varying vec4 vUV;
uniform sampler2D tex;
uniform vec2 res;

void main() {
    const float Pi2 = 6.28318530718;

    // GAUSSIAN BLUR SETTINGS {{{
    const int Directions = 16; // Must be constant in GLSL ES 1.00
    const int Quality = 3;     // Must be constant in GLSL ES 1.00
    const float Size = 8.0;
    // GAUSSIAN BLUR SETTINGS }}}

    vec2 uv = vUV.xy;
    vec2 radius = Size / res;

    vec4 Color = texture2D(tex, uv); // Original color sample

    for (int d = 0; d < Directions; ++d) {
        float angle = Pi2 * float(d) / float(Directions);
        vec2 dir = vec2(cos(angle), sin(angle));

        for (int i = 1; i <= Quality; ++i) {
            float offset = float(i) / float(Quality);
            Color += texture2D(tex, uv + dir * radius * offset);
        }
    }

    // Normalize color (original sample + Directions * Quality samples)
    Color /= float(Quality * Directions + 1);

    gl_FragColor = Color;
}`;


const displace_shader = `
#version 100
precision highp float;

varying vec4 vUV;
uniform sampler2D tex;
uniform sampler2D source_tex;
uniform sampler2D displace_tex;
uniform vec2 res;
uniform float strength;
uniform float time;


void main() {
    vec2 uv = vUV.xy;
    vec4 tx = texture2D(displace_tex, uv);
    vec2 disp = (tx.xy - 0.5) / res * strength;
    vec4 source = texture2D(source_tex, uv);

    vec2 uvoff = uv + disp;
    vec2 uviff2 = uv + disp*0.5;
    vec2 uvoffi = (floor(uvoff * res)+0.5) / res;
    vec4 col1 = texture2D(tex, uvoffi);
    vec4 col2 = texture2D(tex, uvoff);
    vec4 displaced = mix(col1, col2, smoothstep(0.4, 0.6, tx.z));
    float mask = smoothstep(0.4, 0.6, pow(tx.w, 4.0));
    mask = clamp(mask, 0.0, 1.0);
    gl_FragColor = mix(displaced, source, mask);
}`;

const simplex_shader = `
#version 100
precision highp float;

varying vec4 vUV;
uniform sampler2D tex;
uniform sampler2D depth_tex;
uniform sampler2D source_tex;
uniform sampler2D blur_tex;
uniform vec2 res;
uniform float time;
uniform float uv_scale;
uniform float uv_weight;
uniform float depth_weight;
uniform float tex_weight;
uniform vec3 offset;



vec3 ns_simplex_mod289(vec3 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 ns_simplex_mod289(vec4 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 ns_simplex_permute(vec4 x) {
     return ns_simplex_mod289(((x*34.0)+10.0)*x);
}

vec4 ns_simplex_taylorInvSqrt(vec4 r)
{
  return 1.79284291400159 - 0.85373472095314 * r;
}

float ns_simplex(vec3 v)
  { 
  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

// First corner
  vec3 i  = floor(v + dot(v, C.yyy) );
  vec3 x0 =   v - i + dot(i, C.xxx) ;

// Other corners
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min( g.xyz, l.zxy );
  vec3 i2 = max( g.xyz, l.zxy );

  //   x0 = x0 - 0.0 + 0.0 * C.xxx;
  //   x1 = x0 - i1  + 1.0 * C.xxx;
  //   x2 = x0 - i2  + 2.0 * C.xxx;
  //   x3 = x0 - 1.0 + 3.0 * C.xxx;
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y
  vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y

// Permutations
  i = ns_simplex_mod289(i); 
  vec4 p = ns_simplex_permute( ns_simplex_permute( ns_simplex_permute( 
             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

// Gradients: 7x7 points over a square, mapped onto an octahedron.
// The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)
  float n_ = 0.142857142857; // 1.0/7.0
  vec3  ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)

  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4( x.xy, y.xy );
  vec4 b1 = vec4( x.zw, y.zw );

  //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;
  //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;
  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);

//Normalise gradients
  vec4 norm = ns_simplex_taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

// Mix final noise value
  vec4 m = max(0.5 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 105.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), 
                                dot(p2,x2), dot(p3,x3) ) );
  }


void main() {
    vec3 uv = vec3(vUV.xy*uv_scale, 0.0) + offset;
    vec3 depth = texture2D(depth_tex, vUV.xy).xyz;
    uv.z += depth.z * depth_weight;
    vec3 uvtex = texture2D(blur_tex, vUV.xy).xyz*tex_weight;
    vec3 srctex = texture2D(source_tex, vUV.xy).xyz*tex_weight;
    vec3 uv_image = mix(uv, uvtex, uv_weight);
    vec3 uv_source = mix(uv, srctex, uv_weight);
    
    
    float noise1 = ns_simplex(uv_image + vec3(0.0, 0.0, 0.0));
    float noise2 = ns_simplex(uv_image + vec3(0.0, 0.0, 10.0));
    float noise3 = ns_simplex(uv_image + vec3(0.0, 0.0, 20.0));
    float noise4 = ns_simplex(uv_source + vec3(0.0, 0.0, 30.0));

    vec4 noise = vec4(noise1, noise2, noise3, noise4)*0.5+0.5;
    gl_FragColor = noise;
}`;