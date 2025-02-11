(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))a(o);new MutationObserver(o=>{for(const l of o)if(l.type==="childList")for(const s of l.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function t(o){const l={};return o.integrity&&(l.integrity=o.integrity),o.referrerPolicy&&(l.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?l.credentials="include":o.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function a(o){if(o.ep)return;o.ep=!0;const l=t(o);fetch(o.href,l)}})();const I={restrict_loc:!0,center_x:-8.630436666894104,center_y:115.09447416252982,radius:.016,server:"https://sterling-engaging-whippet.ngrok-free.app",dev_send:!1,show_len:3e3,show_time:null,sync_time:null},se={recording:!1,progress:0,callback:null},f={seed:0,speed:.07,val1:Math.random()*100,val2:Math.random()*100,tx:Math.random()*100,ty:Math.random()*100,val1a:0,val1b:0,val2a:0,val2b:0,val3a:Math.random()*100,val3b:Math.random(),val4a:Math.random()*100,val4b:Math.random(),render:0},ke={u_General:0,u_Offsety:0,u_Celltop:.1899999976158142,u_Cellbottom:1.309999942779541,u_Cellspeed:.15000000596046448,u_Speed:1,u_Splitsize:16,u_Color:0,u_Colorgain:1.0700000524520874,u_Pattern:0,u_Patternscale:8,u_Patternpow:0,u_Patterngain:0,u_Patternevery:1,u_Patternstrength:.5080000162124634,u_Signalstrength:1,u_Signalsize:.15199999511241913,u_Displacepos:0,u_Displacegamma:3.2799999713897705,u_Displacex:1,u_Wposscalex:4,u_Wposscaley:4,u_Wposscalez:4,u_Wposspeedx:0,u_Wposspeedy:0,u_Wposspeedz:0,u_Wpospxx:-.4000000059604645,u_Wpospxy:0,u_Wpospxz:0,u_Wpospyx:4,u_Wpospyy:0,u_Wpospyz:0,u_Wpospzx:0,u_Wpospzy:0,u_Wpospzz:0,u_Noisepos:0,u_Nposscalex:4,u_Nposscaley:4,u_Nposscalez:4,u_Nposspeedx:0,u_Nposspeedy:0,u_Nposspeedz:0,u_Nposwfx:.20000000298023224,u_Nposwfy:0,u_Nposwfz:0,u_Nposwwx:0,u_Nposwwy:.6000000238418579,u_Nposwwz:0,u_Nposwyx:-.8999999761581421,u_Nposwyy:0,u_Nposwyz:0,u_Npospxx:-.30000001192092896,u_Npospxy:0,u_Npospxz:0,u_Npospyx:0,u_Npospyy:0,u_Npospyz:0,u_Npospzx:0,u_Npospzy:0,u_Npospzz:.10000000149011612,u_Shownoisepos:0,u_Channels:0,u_Channelwidth:2,u_Channelsymmetry:1,u_Channelspread:1,u_Channelshrinkjoint:0,u_Points:0,u_Pointweight:17.5,u_Pointfade:.6499999761581421,u_Pointweightvariation:0,u_Pointjointwidth:.5,u_Pointweighttop:1,u_Pointweightbottom:1},L={hijack1:!1,x1:0,y1:0,hijack_arrow:!1},De=(n,e,t)=>{let a=[n.width,n.height];const o=n.getContext("webgl2",{antialias:!0});o||alert("Please use browser with WebGL2 support");var l=o.getExtension("EXT_color_buffer_float");l||alert("Please use browser with Floating Point support");const s=`
    #version 300 es
    precision highp float;
    precision highp int;
    in vec2 uv;
    in vec3 position;
    out vec4 vUV;
    void main() {
        gl_Position = vec4(position.xy, 0.0, 1.0);
        vUV = vec4(position.xy*0.5+0.5, position.xy*0.5+0.5);
    }
    `,v=`#version 300 es
precision highp float;
precision highp int;

layout(location = 0) out vec4 fragPos;
layout(location = 1) out vec4 fragColor;
in vec4 vUV;
// varying vec4 vUV;
uniform vec2 res;
uniform float time;
uniform int numPoints;
uniform sampler2D u_tex0;
uniform sampler2D u_tex1;
// uniform int MODE;

uniform vec2 tex0_res;
uniform vec2 tex1_res;
uniform vec2 tex2_res;


uniform float u_Speed;
uniform float u_Displacepos;
uniform float u_Displacegamma;
uniform float u_Displacex;
uniform float u_Wposscalex;
uniform float u_Wposscaley;
uniform float u_Wposscalez;
uniform float u_Wposspeedx;
uniform float u_Wposspeedy;
uniform float u_Wposspeedz;
uniform float u_Wpospxx;
uniform float u_Wpospxy;
uniform float u_Wpospxz;
uniform float u_Wpospyx;
uniform float u_Wpospyy;
uniform float u_Wpospyz;
uniform float u_Wpospzx;
uniform float u_Wpospzy;
uniform float u_Wpospzz;
uniform float u_Noisepos;
uniform float u_Nposscalex;
uniform float u_Nposscaley;
uniform float u_Nposscalez;
uniform float u_Nposspeedx;
uniform float u_Nposspeedy;
uniform float u_Nposspeedz;
uniform float u_Nposwfx;
uniform float u_Nposwfy;
uniform float u_Nposwfz;
uniform float u_Nposwwx;
uniform float u_Nposwwy;
uniform float u_Nposwwz;
uniform float u_Nposwyx;
uniform float u_Nposwyy;
uniform float u_Nposwyz;
uniform float u_Npospxx;
uniform float u_Npospxy;
uniform float u_Npospxz;
uniform float u_Npospyx;
uniform float u_Npospyy;
uniform float u_Npospyz;
uniform float u_Npospzx;
uniform float u_Npospzy;
uniform float u_Npospzz;
uniform float u_Shownoisepos;
uniform float u_Channels;
uniform float u_Channelwidth;
uniform float u_Channelsymmetry;
uniform float u_Channelspread;
uniform float u_Channelshrinkjoint;
uniform float u_Points;
uniform float u_Pointweight;
uniform float u_Pointfade;
uniform float u_Pointweightvariation;
uniform float u_Pointjointwidth;
uniform float u_Pointweighttop;
uniform float u_Pointweightbottom;
uniform float u_resx;
uniform float u_resy;
uniform float u_val1;
uniform float u_val2;
uniform float u_mix1;
uniform float u_mix2;
uniform float u_move;
uniform float u_tx;
uniform float u_ty;
uniform float u_val1a;
uniform float u_val1b;
uniform float u_val2a;
uniform float u_val2b;
uniform float u_val3a;
uniform float u_val3b;
uniform float u_val4a;
uniform float u_val4b;
uniform float u_render;
uniform float u_chan19;
uniform float u_chan20;
uniform float u_chan21;
uniform float u_seed;
uniform float u_speed;
uniform float u_reflect;
uniform float u_weight_low;
uniform float u_weight_high;
uniform float u_diff_u;
uniform float u_diff_v;
uniform float u_diff_woff;
uniform float u_off;
uniform float u_tex1w;
uniform float u_tex1h;
uniform float u_tex2w;
uniform float u_tex2h;
uniform float u_tex3w;
uniform float u_tex3h;
uniform float u_outw;
uniform float u_outh;


#define PI 3.1415926538



vec3 rgb2hsv(vec3 c)
{
    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
    vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));

    float d = q.x - min(q.w, q.y);
    float e = 1.0e-10;
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}

vec3 hsv2rgb(vec3 c)
{
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}








float rand(float n){return fract(sin(n) * 43758.5453123);}
float rand2(float x, float y){return fract(sin(dot(vec2(x,y), vec2(12.9898,78.233))) * 43758.5453123);}


////////////////////////////////////////////////////////////////////////////////////
// Random
////////////////////////////////////////////////////////////////////////////////////
float ns_rand1(float n){return fract(sin(n) * 43758.5453123);}
float ns_rand2(float x, float y){return fract(sin(dot(vec2(x,y), vec2(12.9898,78.233))) * 43758.5453123);}
////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////
// Value Noise
////////////////////////////////////////////////////////////////////////////////////
float ns_value1_rand(float n){return fract(sin(n) * 43758.5453123);}
float ns_value1(float x) {
  float fx = floor(x);
  float u = fract(x);
	return mix(ns_value1_rand(fx), ns_value1_rand(fx+1.0), u) * 2.0 - 1.0;
}
////////////////////////////////////////////////////////////////////////////////////
float ns_value2_rand(vec2 n) { 
	return fract(sin(dot(n, vec2(12.9898,78.233))) * 43758.5453123);
}
float ns_value2(vec2 p){
  float ipx = floor(p.x);
	vec2 ip = floor(p);
	vec2 u = fract(p);

  // u = smoothstep(0.0, 1.0, u);

  float n00 = ns_value2_rand(floor(ip+vec2(0.0,0.0)));
  float n01 = ns_value2_rand(floor(ip+vec2(0.0,1.0)));
  float n10 = ns_value2_rand(floor(ip+vec2(1.0,0.0)));
  float n11 = ns_value2_rand(floor(ip+vec2(1.0,1.0)));

	float res = mix(
    mix(n00, n01, u.y),
    mix(n10, n11, u.y),
    u.x
  );

  // res = mix(ns_value2_rand(vec2(ipx, 0.0)), ns_value2_rand(vec2(floor(ipx+1.0), 0.0)), u.x);

	return res * 2.0 - 1.0;
}
////////////////////////////////////////////////////////////////////////////////////
float ns_value3_mod289(float x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
vec4 ns_value3_mod289(vec4 x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
vec4 ns_value3_perm(vec4 x){return ns_value3_mod289(((x * 34.0) + 1.0) * x);}
float ns_value3(vec3 p){
    vec3 a = floor(p);
    vec3 d = p - a;

    vec4 b = a.xxyy + vec4(0.0, 1.0, 0.0, 1.0);
    vec4 k1 = ns_value3_perm(b.xyxy);
    vec4 k2 = ns_value3_perm(k1.xyxy + b.zzww);

    vec4 c = k2 + a.zzzz;
    vec4 k3 = ns_value3_perm(c);
    vec4 k4 = ns_value3_perm(c + 1.0);

    vec4 o1 = fract(k3 * (1.0 / 41.0));
    vec4 o2 = fract(k4 * (1.0 / 41.0));

    vec4 o3 = o2 * d.z + o1 * (1.0 - d.z);
    vec2 o4 = o3.yw * d.x + o3.xz * (1.0 - d.x);

    return (o4.y * d.y + o4.x * (1.0 - d.y)) * 2.0 - 1.0;
}
////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////
//	Classic Perlin 2D Noise 
//	by Stefan Gustavson
////////////////////////////////////////////////////////////////////////////////////
vec4 ns_perlin2_permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
vec2 ns_perlin2_fade(vec2 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}
float ns_perlin2(vec2 P){
  vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
  vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
  Pi = mod(Pi, 289.0); // To avoid truncation effects in permutation
  vec4 ix = Pi.xzxz;
  vec4 iy = Pi.yyww;
  vec4 fx = Pf.xzxz;
  vec4 fy = Pf.yyww;
  vec4 i = ns_perlin2_permute(ns_perlin2_permute(ix) + iy);
  vec4 gx = 2.0 * fract(i * 0.0243902439) - 1.0; // 1/41 = 0.024...
  vec4 gy = abs(gx) - 0.5;
  vec4 tx = floor(gx + 0.5);
  gx = gx - tx;
  vec2 g00 = vec2(gx.x,gy.x);
  vec2 g10 = vec2(gx.y,gy.y);
  vec2 g01 = vec2(gx.z,gy.z);
  vec2 g11 = vec2(gx.w,gy.w);
  vec4 norm = 1.79284291400159 - 0.85373472095314 * 
    vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11));
  g00 *= norm.x;
  g01 *= norm.y;
  g10 *= norm.z;
  g11 *= norm.w;
  float n00 = dot(g00, vec2(fx.x, fy.x));
  float n10 = dot(g10, vec2(fx.y, fy.y));
  float n01 = dot(g01, vec2(fx.z, fy.z));
  float n11 = dot(g11, vec2(fx.w, fy.w));
  vec2 fade_xy = ns_perlin2_fade(Pf.xy);
  vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
  float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
  return 2.3 * n_xy;
}
////////////////////////////////////////////////////////////////////////////////////
//	Classic Perlin 3D Noise 
//	by Stefan Gustavson
////////////////////////////////////////////////////////////////////////////////////
vec4 ns_perlin3_permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
vec4 ns_perlin3_taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
vec3 ns_perlin3_fade(vec3 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}

float ns_perlin3(vec3 P){
  vec3 Pi0 = floor(P); // Integer part for indexing
  vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1
  Pi0 = mod(Pi0, 289.0);
  Pi1 = mod(Pi1, 289.0);
  vec3 Pf0 = fract(P); // Fractional part for interpolation
  vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
  vec4 iy = vec4(Pi0.yy, Pi1.yy);
  vec4 iz0 = Pi0.zzzz;
  vec4 iz1 = Pi1.zzzz;

  vec4 ixy = ns_perlin3_permute(ns_perlin3_permute(ix) + iy);
  vec4 ixy0 = ns_perlin3_permute(ixy + iz0);
  vec4 ixy1 = ns_perlin3_permute(ixy + iz1);

  vec4 gx0 = ixy0 / 7.0;
  vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;
  gx0 = fract(gx0);
  vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
  vec4 sz0 = step(gz0, vec4(0.0));
  gx0 -= sz0 * (step(0.0, gx0) - 0.5);
  gy0 -= sz0 * (step(0.0, gy0) - 0.5);

  vec4 gx1 = ixy1 / 7.0;
  vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;
  gx1 = fract(gx1);
  vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
  vec4 sz1 = step(gz1, vec4(0.0));
  gx1 -= sz1 * (step(0.0, gx1) - 0.5);
  gy1 -= sz1 * (step(0.0, gy1) - 0.5);

  vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
  vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
  vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
  vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
  vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
  vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
  vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
  vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

  vec4 norm0 = ns_perlin3_taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
  g000 *= norm0.x;
  g010 *= norm0.y;
  g100 *= norm0.z;
  g110 *= norm0.w;
  vec4 norm1 = ns_perlin3_taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
  g001 *= norm1.x;
  g011 *= norm1.y;
  g101 *= norm1.z;
  g111 *= norm1.w;

  float n000 = dot(g000, Pf0);
  float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
  float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
  float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
  float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
  float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
  float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
  float n111 = dot(g111, Pf1);

  vec3 fade_xyz = ns_perlin3_fade(Pf0);
  vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
  vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
  float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x); 
  return 2.2 * n_xyz;
}
////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////
// Simplex 2D noise
////////////////////////////////////////////////////////////////////////////////////
vec3 ns_simplex2_permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
float ns_simplex2(vec2 v){
  vec4 C = vec4(0.211324865405187, 0.366025403784439,
           -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = ns_simplex2_permute( ns_simplex2_permute( i.y + vec3(0.0, i1.y, 1.0 ))
  + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
    dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}
////////////////////////////////////////////////////////////////////////////////////
//	Simplex 3D Noise 
//	by Ian McEwan, Ashima Arts
////////////////////////////////////////////////////////////////////////////////////
vec4 ns_simplex3_permute(vec4 x){
    vec4 y = ((x*34.0)+1.0)*x;
    return y - (floor(y/289.0) * 289.0);
  }
vec4 ns_simplex3_taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
float ns_simplex3(vec3 v){
  if (v.x == v.y) v.y += 0.00001;
  if (v.y == v.z) v.z += 0.00001;
  if (v.z == v.x) v.z += 0.00001;
  vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
  vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

// First corner
  vec3 i  = floor(v + dot(v, C.yyy) );
  vec3 x0 =   v - i + dot(i, C.xxx) ;

// Other corners
  vec3 g = step(x0.yzx, x0.xyz); // HERE SOMETHING HAPPENING g.x, g.z, i2.xz, i1.xy
  vec3 l = 1.0 - g;
  vec3 i1 = min( g.xyz, l.zxy );
  vec3 i2 = max( g.xyz, l.zxy );
  vec3 x1 = x0 - i1 + 1.0 * C.xxx;
  vec3 x2 = x0 - i2 + 2.0 * C.xxx;
  vec3 x3 = x0 - 1. + 3.0 * C.xxx;

// Permutations
  i = mod(i, 289.0 ); 
  vec4 p = ns_simplex3_permute( ns_simplex3_permute( ns_simplex3_permute( 
             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

// Gradients
// ( N*N points uniformly over a square, mapped onto an octahedron.)
  float n_ = 1.0/7.0; // N=7
  vec3  ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z *ns.z);  //  mod(p,N*N)

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)

  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4( x.xy, y.xy );
  vec4 b1 = vec4( x.zw, y.zw );

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
  vec4 norm = ns_simplex3_taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

// Mix final noise value
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), 
                                dot(p2,x2), dot(p3,x3) ) );
}
////////////////////////////////////////////////////////////////////////////////////



// ////////////////////////////////////////////////////////////////////////////////////
// // Rdapp Distorion
// ////////////////////////////////////////////////////////////////////////////////////
// #define ns_rdapp_PI 3.1415926538
// float ns_rdapp_rand(float n){return fract(sin(n) * 43758.5453123);}
// vec3 ns_rdapp_rand_ch3(float n){return vec3(ns_rdapp_rand(n), ns_rdapp_rand(n+1.0/3.0), ns_rdapp_rand(n+2.0/3.0));}
// vec3 ns_rdapp(vec3 p, float time, float amp, float freq, float astep, float fstep, int seed) {
//   vec3 p0 = p;
// 	p += amp*pow(astep, 0.0)*sin((pow(fstep, 0.0)*freq*p.yzx+normalize(ns_rdapp_rand_ch3(float(seed+0))-0.5)*ns_rdapp_PI*2.0*time+ns_rdapp_rand_ch3(seed+1))*ns_rdapp_PI*2.0);
// 	p += amp*pow(astep, 1.0)*sin((pow(fstep, 1.0)*freq*p.yzx+normalize(ns_rdapp_rand_ch3(float(seed+2))-0.5)*ns_rdapp_PI*2.0*time+ns_rdapp_rand_ch3(seed+3))*ns_rdapp_PI*2.0);
// 	p += amp*pow(astep, 2.0)*sin((pow(fstep, 2.0)*freq*p.yzx+normalize(ns_rdapp_rand_ch3(float(seed+4))-0.5)*ns_rdapp_PI*2.0*time+ns_rdapp_rand_ch3(seed+5))*ns_rdapp_PI*2.0);
// 	p += amp*pow(astep, 4.0)*sin((pow(fstep, 3.0)*freq*p.yzx+normalize(ns_rdapp_rand_ch3(float(seed+6))-0.5)*ns_rdapp_PI*2.0*time+ns_rdapp_rand_ch3(seed+7))*ns_rdapp_PI*2.0);
// 	return p-p0;
// }
// ////////////////////////////////////////////////////////////////////////////////////





float parabola( float x, float k )
{
    return pow( 4.0*x*(1.0-x), k );
}

float gain(float x, float k) 
{
    float a = 0.5*pow(2.0*((x<0.5)?x:1.0-x), k);
    return (x<0.5)?a:1.0-a;
}

float pcurve( float x, float a, float b )
{
    float k = pow(a+b,a+b)/(pow(a,a)*pow(b,b));
    return k*pow(x,a)*pow(1.0-x,b);
}



vec2 rot2(vec2 v, float a) {
	a = a*PI*2.0;
	float s = sin(a);
	float c = cos(a);
	mat2 m = mat2(c, -s, s, c);
	return m * v;
}
vec2 rot2(float a) {
	return rot2(vec2(0.0, 1.0), a);
}
float n11(float x) { return x*2.0-1.0; }
float n01(float x) { return x*0.5+0.5; }

vec3 bezier(vec3 A, vec3 B, vec3 C, vec3 D, float t) {
  vec3 E = mix(A, B, t);
  vec3 F = mix(B, C, t);
  vec3 G = mix(C, D, t);

  vec3 H = mix(E, F, t);
  vec3 I = mix(F, G, t);

  vec3 P = mix(H, I, t);

  return P;
}

float almostIdentity( float x, float m, float n )
{
    if( x>m ) return x;
    float a = 2.0*n - m;
    float b = 2.0*m - 3.0*n;
    float t = x/m;
    return (a*t + b)*t*t + n;
}

float integralSmoothstep( float x, float T )
{
    if( x>T ) return x - T/2.0;
    return x*x*x*(1.0-x*0.5/T)/T/T;
}

// float rsplit(float x, int n) {
// 	float sum = 0;
// 	float rx = 0;
// 	for (int i = 0; i < n; i++) {
// 		float t = time*0.5+i*0.2;
// 		float npos = floor(t+i*10) + gain(fract(t), 4);
// 		float r = pow(rnoise(npos), 1);
// 		rx += mix(0, r, clamp(x*n-float(i), 0.0, 1.0));
// 		sum += r;
// 	}
// 	rx /= sum;
//   return rx;
// }




// float sinnoise(float x, int n, float seed) {
//   float val = 0;
//   float ampaccum = 0;
//   for (int i = 0; i < n; i++) {
//     float amp = rand(seed+i);
//     float freq = rand(seed+i+100);
//     // amp = 1;
//     amp = gain(amp,4);
//     freq += 0.1;
//     ampaccum += amp;
//     val += sin(x*freq*PI*2) * amp;
//   }
//   val /= ampaccum;
//   return val;
// }


// float sinnoise(float x, float y, int n, float seed) {
//   float val = 0;
//   float ampaccum = 0;
//   for (int i = 0; i < n; i++) {
//     float amp = sinnoise(y, n, rand(seed+i+200))*0.5+0.5;
//     // float amp = rand(time);
//     float freq = rand(seed+i+300);
//     // amp = 1/freq;
//     amp = gain(amp,4);
//     freq += 0.1;
//     ampaccum += amp;
//     val += sin(x*freq*PI*2) * amp;
//   }
//   val /= ampaccum;
//   return val;
// }


// float sinnoise(float x, float y, float z, int n, float seed) {
//   float val = 0;
//   float ampaccum = 0;
//   for (int i = 0; i < n; i++) {
//     float amp = rand(seed+i);
//     float freqX = (rand(seed+i+100)*2-1);
//     float freqY = (rand(seed+i+200)*2-1);
//     float freqZ = (rand(seed+i+300)*2-1);
//     // amp = (freqX+freqY+freqZ);
//     // amp = gain(amp,4);
//     ampaccum += amp;
//     // ampaccum += 0.3;
//     float offset = rand(seed+i+400);
//     val += sin(x*freqX*PI*2+y*freqY*PI*2+z*freqZ*PI*2+offset*2*PI) * amp;
//   }
//   val /= ampaccum;
//   return val;
// }

// float sinnoise2(float x, float y, float z, int n, float seed) {
//   float val = 0;
//   float ampaccum = 0;
//   for (int i = 0; i < n; i++) {
//     float freq = 1.0;
//     float amp = sinnoise(x*freq, y*freq, z*freq, 1, seed+50);
//     float freqX = rand(seed+i+100)*2-1;
//     float freqY = rand(seed+i+200)*2-1;
//     float freqZ = rand(seed+i+300)*2-1;
//     // amp = (freqX+freqY+freqZ);
//     // amp = gain(amp,4);
//     // ampaccum += amp;
//     ampaccum += 1.0/3;
//     float offset = rand(seed+i+400);
//     val += sin(x*freqX*PI*2+y*freqY*PI*2+z*freqZ*PI*2+offset*2*PI) * amp;
//   }
//   val /= ampaccum;
//   return val;
// }


vec3 rand3(float n){return vec3(rand(n),rand(n+0.333),rand(n+0.666));}

vec3 distortion(vec3 p, float s, float f, float t, float sp, float l, float toff, float detail, float seed_, bool classic) {
    int seed = int(seed_);
    float det = 1.0/max(detail, 0.0);
    p += s*1.00         *sin((1.0*f*p.yzx+normalize(rand3(float(seed+0))-0.5)*toff+floor(normalize(rand3(float(seed+0))-0.5)*sp*l)/l*t+float(!classic)*rand3(float(seed+1)))*PI*2.0);
    p += s*pow(0.50,det)*sin((2.0*f*p.yzx+normalize(rand3(float(seed+2))-0.5)*toff+floor(normalize(rand3(float(seed+2))-0.5)*sp*l)/l*t+float(!classic)*rand3(float(seed+3)))*PI*2.0);
    p += s*pow(0.25,det)*sin((4.0*f*p.yzx+normalize(rand3(float(seed+4))-0.5)*toff+floor(normalize(rand3(float(seed+4))-0.5)*sp*l)/l*t+float(!classic)*rand3(float(seed+5)))*PI*2.0);
    p += s*pow(0.05,det)*sin((8.0*f*p.yzx+normalize(rand3(float(seed+6))-0.5)*toff+floor(normalize(rand3(float(seed+6))-0.5)*sp*l)/l*t+float(!classic)*rand3(float(seed+7)))*PI*2.0);
    return p;
}

vec3 bump3y (vec3 x, vec3 yoffset)
{
    vec3 y = 1.0 - x * x;
    y = clamp(y-yoffset, 0.0, 1.0);
    return y;
}
vec3 spectral_zucconi6 (float w)
{
    float x = clamp(w, 0.0, 1.0);
    vec3 c1 = vec3(3.54585104, 2.93225262, 2.41593945);
    vec3 x1 = vec3(0.69549072, 0.49228336, 0.27699880);
    vec3 y1 = vec3(0.02312639, 0.15225084, 0.52607955);
    vec3 c2 = vec3(3.90307140, 3.21182957, 3.96587128);
    vec3 x2 = vec3(0.11748627, 0.86755042, 0.66077860);
    vec3 y2 = vec3(0.84897130, 0.88445281, 0.73949448);
    return
        bump3y(c1 * (x - x1), y1) +
        bump3y(c2 * (x - x2), y2) ;
}



struct PData {
	vec3 p;
	float w;
	vec3 hsv;
	float a;
	vec4 extra_0;
};

struct Seg {
	float idx;
	float size;
	float point;
	float npoints;
};

Seg seg_even(float point, float npoints, float size) {
	Seg new;
	new.size = size;
	new.npoints = float(int(npoints / size));
	new.idx = float(int(point / new.npoints));
	new.point = float(int(point-new.idx*new.npoints));
	return new;
}


PData draw() {
	float point = float(int(vUV.t*res.y)*int(res.x)+int(vUV.s*res.x));
	float npoints = float(numPoints);

	vec3 pos;
	float alpha;
	float weight;
	float hue;
	float sat;
	float val;
	vec4 extra_0;
	vec4 extra_1;
	vec4 extra_2;
	vec4 extra_3;


	// Mesh Code
	Seg Clone_0 = seg_even(float(int(point)), float(int(npoints)), float(int(5)));
	Seg Clone_1 = seg_even(float(int(Clone_0.point)), float(int(Clone_0.npoints)), float(int(3)));
	Seg Clone_2 = seg_even(float(int(Clone_1.point)), float(int(Clone_1.npoints)), float(int(9)));
	Seg Clone_3 = seg_even(float(int(Clone_2.point)), float(int(Clone_2.npoints)), float(int(1)));
	Seg Clone_4 = seg_even(float(int(Clone_3.point)), float(int(Clone_3.npoints)), float(int(1)));
	Seg Clone_5 = seg_even(float(int(Clone_4.point)), float(int(Clone_4.npoints)), float(int(712)));
	

	// Main Code Defs
	vec3 node7 = vec3(0.0, 0.0, 0.0);
	float node23 = float(Clone_0.idx);
	float node327 = (u_val4a * 0.5);
	vec2 node395 = vec2(node327, 40.0);
	float node394 = node395.x;
	float node400 = node395.y;
	float node387 = mix(3.0, 8.0, ((ns_value2(vec2((floor(node394) + smoothstep(0.0, 1.0, fract(node394))), (floor(node400) + smoothstep(0.0, 1.0, fract(node400))))) * 0.5) + 0.5));
	float node403 = gain(1.0, 2.0);
	bool node411 = (Clone_5.size > 1.0);
	float node410_out0;
	if (node411) {
		node410_out0 = (float(Clone_5.idx) / (Clone_5.size - 1.0));
	} else {
		node410_out0 = 0.5;
	}
	float node408 = (node410_out0 * 17.0);
	float node407 = floor(node408);
	float node216 = (u_off * 0.1);
	vec2 node300 = vec2(node216, 40.0);
	float node291 = mix(3.0, 8.0, ((ns_simplex2((vec2(node300.x, node300.y) / 1.5)) * 0.5) + 0.5));
	float node325 = ((node327 * 0.1) * 0.25);
	float node236 = (1.0 + ns_rand1(4.3152));
	float node323 = float((node325 * node236));
	float node316 = mix(3.0, 8.0, gain(((ns_value1((floor(node323) + smoothstep(0.0, 1.0, fract(node323)))) * 0.5) + 0.5), 0.5));
	float node68 = (u_off * 0.5);
	float node66 = fract((node68 * 16.0));
	float node210 = (node68 * 0.25);
	float node211 = (1.0 + ns_rand1(0.0));
	vec2 node208 = vec2((node210 * node211), 0.0);
	float node199 = (2.0 + (gain(((ns_simplex2((vec2(node208.x, node208.y) / 1.5)) * 0.5) + 0.5), 1.0) * 5.0));
	float node249 = (1.0 - mod(node23, 2.0));
	float node241 = clamp((10.0 - (((float(Clone_1.idx) * 2.0) + 7.0) - node249)), 0.0, 10.0);
	float node331 = (node241 * 0.05);
	float node259 = float(Clone_2.idx);
	bool node255 = (Clone_2.size > 1.0);
	float node254_out0;
	if (node255) {
		node254_out0 = (node259 / (Clone_2.size - 1.0));
	} else {
		node254_out0 = 0.5;
	}
	bool node337 = ((Clone_2.idx == 0.0) || (Clone_2.idx == 8.0));
	bool node346 = (Clone_0.idx == 2.0);
	float node1417_out0;
	if ((node337 || node346)) {
		node1417_out0 = (1.0 - parabola(node254_out0, 2.0));
	}
	float node336_out0;
	if (node337) {
		node336_out0 = node1417_out0;
	} else {
		float node345_out0;
		if (node346) {
			node345_out0 = node1417_out0;
		} else {
			bool node350 = (Clone_0.idx < 3.0);
			float node349_out0;
			if (node350) {
				node349_out0 = (1.0 - node254_out0);
			} else {
				node349_out0 = node254_out0;
			}
			node345_out0 = node349_out0;
		}
		node336_out0 = node345_out0;
	}
	float node362 = ((node327 * 0.2) * 0.25);
	float node271 = (1.0 + ns_rand1(8.6304));
	float node360 = float((node362 * node271));
	float node369 = mod(Clone_2.idx, 2.0);
	float node380 = (node327 * 0.25);
	float node378 = float((node380 * node211));
	float node333 = ((node336_out0 * gain(((ns_value1((floor(node360) + smoothstep(0.0, 1.0, fract(node360)))) * 0.5) + 0.5), 0.5)) - ((node369 * gain(pow(gain(((ns_value1((floor(node378) + smoothstep(0.0, 1.0, fract(node378)))) * 0.5) + 0.5), 0.5), 3.0), 2.0)) * 0.5));
	float node84 = (0.14287755393627663 - ((0.28575510787255326 * cos(1.5707963267948966)) / 6.283185307179586));
	bool node221 = (Clone_0.size > 1.0);
	float node220_out0;
	if (node221) {
		node220_out0 = (node23 / (Clone_0.size - 1.0));
	} else {
		node220_out0 = 0.5;
	}
	vec2 node234 = vec2((node210 * node236), 4.3152);
	float node217 = ((node220_out0 * n11(gain(((ns_simplex2((vec2(node234.x, node234.y) / 1.5)) * 0.5) + 0.5), 1.0))) * 0.5);
	float node104 = (0.21424489212744674 + node84);
	float node240 = (node241 / 10.0);
	vec2 node269 = vec2((node210 * node271), 8.6304);
	float node251 = ((node254_out0 * gain(((ns_simplex2((vec2(node269.x, node269.y) / 1.5)) * 0.5) + 0.5), 1.0)) + node216);
	float node56 = 0.0;
	float node420 = 0.0;
	float node423 = 0.0;
	for (int node54 = 0; node54 < int(16.0); node54++) {
		float node65 = float(node54);
		float node62 = clamp(((node65 + node66) / 15.0), 0.0, 1.0);
		bool node61 = (node62 < 0.5);
		float node60_out0;
		if (node61) {
			bool node79 = (node62 > 0.28575510787255326);
			float node78_out0;
			if (node79) {
				node78_out0 = ((node62 - 0.28575510787255326) + node84);
			} else {
				float node93 = ((node62 / 0.28575510787255326) / 2.0);
				node78_out0 = ((0.28575510787255326 * node93) - ((0.28575510787255326 * cos((((node93 - 0.25) * 3.141592653589793) * 2.0))) / 6.283185307179586));
			}
			node60_out0 = ((node78_out0 / node104) / 2.0);
		} else {
			float node112 = (1.0 - node62);
			bool node111 = (node112 > 0.28575510787255326);
			float node110_out0;
			if (node111) {
				node110_out0 = ((node112 - 0.28575510787255326) + node84);
			} else {
				float node119 = ((node112 / 0.28575510787255326) / 2.0);
				node110_out0 = ((0.28575510787255326 * node119) - ((0.28575510787255326 * cos((((node119 - 0.25) * 3.141592653589793) * 2.0))) / 6.283185307179586));
			}
			node60_out0 = (1.0 - ((node110_out0 / node104) / 2.0));
		}
		float node130 = clamp((((node65 - 1.0) + node66) / 15.0), 0.0, 1.0);
		bool node129 = (node130 < 0.5);
		float node128_out0;
		if (node129) {
			bool node139 = (node130 > 0.28575510787255326);
			float node138_out0;
			if (node139) {
				node138_out0 = ((node130 - 0.28575510787255326) + node84);
			} else {
				float node145 = ((node130 / 0.28575510787255326) / 2.0);
				node138_out0 = ((0.28575510787255326 * node145) - ((0.28575510787255326 * cos((((node145 - 0.25) * 3.141592653589793) * 2.0))) / 6.283185307179586));
			}
			node128_out0 = ((node138_out0 / node104) / 2.0);
		} else {
			float node159 = (1.0 - node130);
			bool node158 = (node159 > 0.28575510787255326);
			float node157_out0;
			if (node158) {
				node157_out0 = ((node159 - 0.28575510787255326) + node84);
			} else {
				float node165 = ((node159 / 0.28575510787255326) / 2.0);
				node157_out0 = ((0.28575510787255326 * node165) - ((0.28575510787255326 * cos((((node165 - 0.25) * 3.141592653589793) * 2.0))) / 6.283185307179586));
			}
			node128_out0 = (1.0 - ((node157_out0 / node104) / 2.0));
		}
		float node197 = ((node128_out0 + node60_out0) / 2.0);
		vec3 node192 = vec3(((((node197 * node199) + node216) + node217) + node240), node251, 0.0);
		vec3 node190 = vec3(node192.x, node192.y, node192.z);
		float node189 = node190.x;
		float node277 = node190.y;
		float node278 = node190.z;
		vec3 node313 = vec3(((node197 * node316) + node331), node333, node327);
		vec3 node311 = vec3(node313.x, node313.y, node313.z);
		float node55 = (node56 + ((node60_out0 - node128_out0) * mix(pow((0.01 + ((((((gain(((ns_simplex3((vec3(node189, node277, node278) / 1.5)) * 0.5) + 0.5), 2.0) * 2.0) - 1.0) + (((gain(((ns_simplex3((vec3((node189 * 2.0), (node277 * 2.0), (node278 * 2.0)) / 1.5)) * 0.5) + 0.5), 2.0) * 2.0) - 1.0) * 0.5)) / 1.5) * 0.5) + 0.5)), node291), pow((0.01 + ((ns_simplex3((vec3(node311.x, node311.y, node311.z) / 1.5)) * 0.5) + 0.5)), node387), node403)));
		bool node406 = (node65 == node407);
		bool node419 = (!node406);
		float node405_out0;
		if (node406) {
			node405_out0 = node56;
		} else {
			node405_out0 = node420;
		}
		float node422_out0;
		if (node406) {
			node422_out0 = node55;
		} else {
			node422_out0 = node423;
		}
		node56 = node55;
		node420 = node405_out0;
		node423 = node422_out0;
	}
	float node428 = fract(node408);
	float node441 = (node68 * 0.3);
	vec2 node440 = vec2(node441, 21.0);
	vec2 node454 = vec2((node327 * 0.3), 31.0);
	float node49 = mix((node420 / node56), (node423 / node56), pow(node428, pow(2.0, mix(((gain(((ns_simplex2((vec2(node440.x, node440.y) / 1.5)) * 0.5) + 0.5), 0.5) * 2.0) - 1.0), ((gain(((ns_simplex2((vec2(node454.x, node454.y) / 1.5)) * 0.5) + 0.5), 0.5) * 2.0) - 1.0), 1.0))));
	float node38 = mod(Clone_0.idx, 2.0);
	float node460 = min(float((Clone_1.idx == 2.0)), float((node38 == 1.0)));
	float node48 = mix(node49, clamp(pow(node49, 3.0), 0.0, 1.0), node460);
	float node43 = ((((Clone_1.idx + node48) / 3.0) * 3.0) - 2.5);
	bool node37 = (node38 > 0.5);
	float node36_out0;
	if (node37) {
		node36_out0 = clamp(node43, -10.0, 0.0);
	} else {
		node36_out0 = node43;
	}
	float node478 = (node43 + (node38 * 0.5));
	float node477 = clamp(node478, -10.0, 0.5);
	vec4 node14 = vec4(n01((((((n11((node23 / 4.0)) + ((mix(0.1, 0.9, n01(cos(((node36_out0 * 3.141592653589793) * 2.0)))) * n11((node259 / 8.0))) / 2.0)) * 0.5249999999999999) * mix(1.0, 0.95, cos(((((node477 * 1.5) - 0.1) * 3.141592653589793) * 2.0)))) * mix(1.0, 0.83, cos(((((node477 * 0.25) + 0.15) * 3.141592653589793) * 2.0)))) * mix(0.9, 1.0, node478))), n01((n11(((node478 * 0.35) + 0.53)) * 1.5)), 0.0, 0.0);
	vec2 node12 = vec2(node14.x, node14.y);
	vec3 node9 = vec3(n11(node12.x), n11(node12.y), 0.0);
	bool node506 = (Clone_3.size > 1.0);
	float node505_out0;
	if (node506) {
		node505_out0 = (float(Clone_3.idx) / (Clone_3.size - 1.0));
	} else {
		node505_out0 = 0.5;
	}
	float node517 = fract(node428);
	float node680 = (1.0 + ns_rand1(12.945599999999999));
	vec2 node678 = vec2((node210 * node680), 12.945599999999999);
	float node669 = (2.0 + (gain(((ns_simplex2((vec2(node678.x, node678.y) / 1.5)) * 0.5) + 0.5), 1.0) * 5.0));
	float node696 = (1.0 + ns_rand1(17.2608));
	vec2 node694 = vec2((node210 * node696), 17.2608);
	float node684 = ((node220_out0 * n11(gain(((ns_simplex2((vec2(node694.x, node694.y) / 1.5)) * 0.5) + 0.5), 1.0))) * 0.5);
	float node711 = (1.0 + ns_rand1(21.576));
	vec2 node709 = vec2((node210 * node711), 21.576);
	float node700 = ((node254_out0 * gain(((ns_simplex2((vec2(node709.x, node709.y) / 1.5)) * 0.5) + 0.5), 1.0)) + node216);
	float node751 = float((node325 * node696));
	float node744 = mix(3.0, 8.0, gain(((ns_value1((floor(node751) + smoothstep(0.0, 1.0, fract(node751)))) * 0.5) + 0.5), 0.5));
	float node763 = float((node362 * node711));
	float node777 = float((node380 * node680));
	float node755 = ((node336_out0 * gain(((ns_value1((floor(node763) + smoothstep(0.0, 1.0, fract(node763)))) * 0.5) + 0.5), 0.5)) - ((node369 * gain(pow(gain(((ns_value1((floor(node777) + smoothstep(0.0, 1.0, fract(node777)))) * 0.5) + 0.5), 0.5), 3.0), 2.0)) * 0.5));
	float node549 = 0.0;
	float node789 = 0.0;
	float node792 = 0.0;
	for (int node547 = 0; node547 < int(16.0); node547++) {
		float node558 = float(node547);
		float node555 = clamp(((node558 + node66) / 15.0), 0.0, 1.0);
		bool node554 = (node555 < 0.5);
		float node553_out0;
		if (node554) {
			bool node564 = (node555 > 0.28575510787255326);
			float node563_out0;
			if (node564) {
				node563_out0 = ((node555 - 0.28575510787255326) + node84);
			} else {
				float node570 = ((node555 / 0.28575510787255326) / 2.0);
				node563_out0 = ((0.28575510787255326 * node570) - ((0.28575510787255326 * cos((((node570 - 0.25) * 3.141592653589793) * 2.0))) / 6.283185307179586));
			}
			node553_out0 = ((node563_out0 / node104) / 2.0);
		} else {
			float node584 = (1.0 - node555);
			bool node583 = (node584 > 0.28575510787255326);
			float node582_out0;
			if (node583) {
				node582_out0 = ((node584 - 0.28575510787255326) + node84);
			} else {
				float node590 = ((node584 / 0.28575510787255326) / 2.0);
				node582_out0 = ((0.28575510787255326 * node590) - ((0.28575510787255326 * cos((((node590 - 0.25) * 3.141592653589793) * 2.0))) / 6.283185307179586));
			}
			node553_out0 = (1.0 - ((node582_out0 / node104) / 2.0));
		}
		float node601 = clamp((((node558 - 1.0) + node66) / 15.0), 0.0, 1.0);
		bool node600 = (node601 < 0.5);
		float node599_out0;
		if (node600) {
			bool node610 = (node601 > 0.28575510787255326);
			float node609_out0;
			if (node610) {
				node609_out0 = ((node601 - 0.28575510787255326) + node84);
			} else {
				float node616 = ((node601 / 0.28575510787255326) / 2.0);
				node609_out0 = ((0.28575510787255326 * node616) - ((0.28575510787255326 * cos((((node616 - 0.25) * 3.141592653589793) * 2.0))) / 6.283185307179586));
			}
			node599_out0 = ((node609_out0 / node104) / 2.0);
		} else {
			float node630 = (1.0 - node601);
			bool node629 = (node630 > 0.28575510787255326);
			float node628_out0;
			if (node629) {
				node628_out0 = ((node630 - 0.28575510787255326) + node84);
			} else {
				float node636 = ((node630 / 0.28575510787255326) / 2.0);
				node628_out0 = ((0.28575510787255326 * node636) - ((0.28575510787255326 * cos((((node636 - 0.25) * 3.141592653589793) * 2.0))) / 6.283185307179586));
			}
			node599_out0 = (1.0 - ((node628_out0 / node104) / 2.0));
		}
		float node667 = ((node599_out0 + node553_out0) / 2.0);
		vec3 node662 = vec3(((((node667 * node669) + node216) + node684) + node240), node700, 0.0);
		vec3 node660 = vec3(node662.x, node662.y, node662.z);
		float node659 = node660.x;
		float node717 = node660.y;
		float node718 = node660.z;
		vec3 node741 = vec3(((node667 * node744) + node331), node755, node327);
		vec3 node739 = vec3(node741.x, node741.y, node741.z);
		float node548 = (node549 + ((node553_out0 - node599_out0) * mix(pow((0.01 + ((((((gain(((ns_simplex3((vec3(node659, node717, node718) / 1.5)) * 0.5) + 0.5), 2.0) * 2.0) - 1.0) + (((gain(((ns_simplex3((vec3((node659 * 2.0), (node717 * 2.0), (node718 * 2.0)) / 1.5)) * 0.5) + 0.5), 2.0) * 2.0) - 1.0) * 0.5)) / 1.5) * 0.5) + 0.5)), node291), pow((0.01 + ((ns_simplex3((vec3(node739.x, node739.y, node739.z) / 1.5)) * 0.5) + 0.5)), node387), node403)));
		bool node787 = (node558 == node407);
		bool node788 = (!node787);
		float node786_out0;
		if (node787) {
			node786_out0 = node549;
		} else {
			node786_out0 = node789;
		}
		float node791_out0;
		if (node787) {
			node791_out0 = node548;
		} else {
			node791_out0 = node792;
		}
		node549 = node548;
		node789 = node786_out0;
		node792 = node791_out0;
	}
	float node544 = (node789 / node549);
	float node794 = (node792 / node549);
	float node543 = mix(node544, node794, pow(node428, 1.0));
	float node803 = float((node380 * (1.0 + ns_rand1(30.2064))));
	float node824 = float((node325 * (1.0 + ns_rand1(34.5216))));
	float node833 = (node794 - node544);
	float node840 = float((node380 * (1.0 + ns_rand1(38.8368))));
	float node857 = float((node325 * (1.0 + ns_rand1(43.152))));
	float node875 = float((node380 * (1.0 + ns_rand1(25.891199999999998))));
	float node888 = float((node325 * (1.0 + ns_rand1(47.4672))));
	float node904 = float((node325 * (1.0 + ns_rand1(51.782399999999996))));
	float node921 = float((node380 * (1.0 + ns_rand1(56.0976))));
	float node938 = float((node325 * (1.0 + ns_rand1(60.4128))));
	float node953 = float((node362 * (1.0 + ns_rand1(64.728))));
	float node978 = float((node380 * (1.0 + ns_rand1(69.0432))));
	vec3 node536 = ((vec3(((((node543 * gain(((ns_value1((floor(node803) + smoothstep(0.0, 1.0, fract(node803)))) * 0.5) + 0.5), 0.5)) * 2.0) + ((mod(floor((node407 + (node68 * 16.0))), 2.0) * gain(pow(gain(((ns_value1((floor(node824) + smoothstep(0.0, 1.0, fract(node824)))) * 0.5) + 0.5), 0.5), 3.0), 2.0)) * 0.5)) + ((node428 * node833) * gain(((ns_value1((floor(node840) + smoothstep(0.0, 1.0, fract(node840)))) * 0.5) + 0.5), 0.5))), ((((node336_out0 * gain(((ns_value1((floor(node857) + smoothstep(0.0, 1.0, fract(node857)))) * 0.5) + 0.5), 0.5)) - (((abs(n11(node220_out0)) * gain(((ns_value1((floor(node875) + smoothstep(0.0, 1.0, fract(node875)))) * 0.5) + 0.5), 0.5)) * gain(((ns_value1((floor(node888) + smoothstep(0.0, 1.0, fract(node888)))) * 0.5) + 0.5), 0.5)) * 4.0)) + (((1.0 - node249) * gain(((ns_value1((floor(node904) + smoothstep(0.0, 1.0, fract(node904)))) * 0.5) + 0.5), 0.5)) * 2.0)) - ((node369 * gain(pow(gain(((ns_value1((floor(node921) + smoothstep(0.0, 1.0, fract(node921)))) * 0.5) + 0.5), 0.5), 3.0), 2.0)) * 0.5)), ((((node336_out0 * gain(((ns_value1((floor(node938) + smoothstep(0.0, 1.0, fract(node938)))) * 0.5) + 0.5), 0.5)) * 0.5) + ((node833 * gain(((ns_value1((floor(node953) + smoothstep(0.0, 1.0, fract(node953)))) * 0.5) + 0.5), 0.5)) * 0.5)) + (node241 * 0.2))) + vec3(0.0, 0.0, ((sin((((((u_off * 4.0) + node331) + 0.6) * 3.141592653589793) * 2.0)) * 0.33) * gain(((ns_value1((floor(node978) + smoothstep(0.0, 1.0, fract(node978)))) * 0.5) + 0.5), 0.5)))) * pow(2.0, n11(u_val4b)));
	vec3 node993 = vec3(node536.x, node536.y, node536.z);
	vec3 node535 = (node536 + (ns_simplex3((vec3(node993.x, node993.y, node993.z) / 1.5)) * u_val4b));
	float node534 = node535.y;
	float node525 = (fract(((node327 * 0.25) + (ns_simplex2((vec2(float(node534), 0.0) / 1.5)) * 0.25))) * 5.0);
	float node523 = mod(floor(node525), 5.0);
	bool node522 = (node523 == 0.0);
	bool node1001 = (node523 == 1.0);
	bool node1003 = (node523 == 2.0);
	bool node1005 = (node523 == 3.0);
	bool node1007 = (node523 == 4.0);
	float node521_out0;
	if (node522) {
		node521_out0 = 0.001;
	} else if (node1001) {
		node521_out0 = 0.1;
	} else if (node1003) {
		node521_out0 = 0.1;
	} else if (node1005) {
		node521_out0 = 4.0;
	} else if (node1007) {
		node521_out0 = 0.01;
	}
	float node1013 = mod((node523 + 1.0), 5.0);
	bool node1012 = (node1013 == 0.0);
	bool node1015 = (node1013 == 1.0);
	bool node1016 = (node1013 == 2.0);
	bool node1017 = (node1013 == 3.0);
	bool node1018 = (node1013 == 4.0);
	float node1011_out0;
	if (node1012) {
		node1011_out0 = 0.001;
	} else if (node1015) {
		node1011_out0 = 0.1;
	} else if (node1016) {
		node1011_out0 = 0.1;
	} else if (node1017) {
		node1011_out0 = 4.0;
	} else if (node1018) {
		node1011_out0 = 0.01;
	}
	float node1019 = smoothstep(0.0, 1.0, fract(node525));
	float node1023_out0;
	if (node522) {
		node1023_out0 = 0.001;
	} else if (node1001) {
		node1023_out0 = 0.1;
	} else if (node1003) {
		node1023_out0 = 4.0;
	} else if (node1005) {
		node1023_out0 = 0.2;
	} else if (node1007) {
		node1023_out0 = 1.0;
	}
	float node1025_out0;
	if (node1012) {
		node1025_out0 = 0.001;
	} else if (node1015) {
		node1025_out0 = 0.1;
	} else if (node1016) {
		node1025_out0 = 4.0;
	} else if (node1017) {
		node1025_out0 = 0.2;
	} else if (node1018) {
		node1025_out0 = 1.0;
	}
	float node513 = ((mix(pcurve(node517, 0.01, 0.01), pcurve(node517, mix(node521_out0, node1011_out0, node1019), mix(node1023_out0, node1025_out0, node1019)), 1.0) * mix(0.5, 1.0, 1.0)) * 0.2);
	pos = (((((node7 + node9) + vec3((((n11(node505_out0) * node513) * 0.04) * mix(u_Channelshrinkjoint, 1.0, parabola(node543, 1.0))), 0.0, 0.0)) * vec3(mix((0.5625 / (u_resx / u_resy)), 1.0, u_render), 1.0, 1.0)) * vec3(1.0, mix(1.0, 1.0, u_render), 1.0)) + vec3(0.0, mix(0.06, 0.0, u_render), 0.0));
	alpha = 1.0;
	bool node1051 = (((Clone_0.idx == 0.0) && (Clone_2.idx < 4.0)) || ((Clone_0.idx == 4.0) && (Clone_2.idx > 4.0)));
	bool node1059 = (!node1051);
	float node1050_out0;
	if (node1051) {
		node1050_out0 = 0.0;
	} else {
		node1050_out0 = mix(1.0, 10.0, clamp(mix(0.1, 1.0, node513), 0.0, 1.0));
	}
	weight = node1050_out0;
	vec3 node1082_out0;
	if (node1051) {
		node1082_out0 = node7;
	} else {
		float node1095 = (u_val3a * 0.2);
		float node1123 = (node428 * mix(pow(2.0, (((ns_simplex2((vec2(float((node441 + 15.0)), 0.0) / 1.5)) * 0.5) + 0.5) * 3.0)), pow(2.0, (((ns_simplex2((vec2(float(((u_val3a * 0.1) + 15.0)), 0.0) / 1.5)) * 0.5) + 0.5) * 3.0)), 1.0));
		bool node1148 = (mod(float(floor(node1123)), 2.0) == 0.0);
		float node1147_out0;
		if (node1148) {
			node1147_out0 = 1.0;
		} else {
			node1147_out0 = 0.0;
		}
		vec3 node1177 = vec3(node535.x, node534, (node535.z + 111.0));
		vec3 node1110 = (node535 + vec3(0.0, 0.0, ((((((1.0 - ((cos(((node1123 * 3.141592653589793) * 2.0)) * 0.5) + 0.5)) * mix(1.0, node1147_out0, mix(1.0, ((((gain(((ns_simplex2((vec2(float((u_val3a + 25.0)), 0.0) / 1.5)) * 0.5) + 0.5), 4.0) * 2.0) - 1.0) * 0.5) + 0.5), 1.0))) * parabola(node505_out0, 1.2)) * parabola(node428, 1.0)) * ((ns_simplex3((vec3(node1177.x, node1177.y, node1177.z) / 1.5)) * 0.5) + 0.5)) * 0.5)));
		vec3 node1184 = vec3((u_val3a * -1.0), 0.0, 0.0);
		vec3 node1109 = (node1110 + node1184);
		vec3 node1107 = vec3(node1109.x, node1109.y, node1109.z);
		float node1106 = node1107.x;
		float node1189 = node1107.y;
		float node1190 = node1107.z;
		vec3 node1100 = vec3(((ns_simplex3((vec3(node1106, node1189, node1190) / 1.5)) * 0.5) + 0.5), ((ns_simplex3((vec3(node1106, node1189, (node1190 + 33.333333333333336)) / 1.5)) * 0.5) + 0.5), ((ns_simplex3((vec3(node1106, node1189, (node1190 + 66.66666666666667)) / 1.5)) * 0.5) + 0.5));
		float node1208 = (2.0 - u_val3b);
		vec3 node1093 = vec3((node1095 + ((node1100.x * 0.33) * u_val3b)), pow(node1100.y, node1208), pow(node1100.z, node1208));
		float node1222 = node1093.z;
		bool node1227 = (node1222 < 0.5);
		float node1226_out0;
		if (node1227) {
			node1226_out0 = node1222;
		} else {
			node1226_out0 = (1.0 - node1222);
		}
		float node1221 = (node1222 + (node1093.y * node1226_out0));
		float node1237 = ((2.0 * node1222) - node1221);
		float node1089 = ((fract(node1093.x) * 360.0) / 60.0);
		float node1088 = floor(node1089);
		bool node1217 = (node1088 == 5.0);
		bool node1216 = (node1088 == 4.0);
		bool node1215 = (node1088 == 3.0);
		bool node1214 = (node1088 == 2.0);
		bool node1213 = (node1088 == 1.0);
		bool node1087 = (node1088 == 0.0);
		float node1414_out0;
		if ((node1217 || node1216 || node1215 || node1214 || node1213 || node1087)) {
			node1414_out0 = (node1221 - (((node1221 - node1222) * 2.0) * abs((mod(node1089, 2.0) - 1.0))));
		}
		vec3 node1086_out0;
		if (node1087) {
			node1086_out0 = vec3(node1221, node1414_out0, node1237);
		} else if (node1213) {
			node1086_out0 = vec3(node1414_out0, node1221, node1237);
		} else if (node1214) {
			node1086_out0 = vec3(node1237, node1221, node1414_out0);
		} else if (node1215) {
			node1086_out0 = vec3(node1237, node1414_out0, node1221);
		} else if (node1216) {
			node1086_out0 = vec3(node1414_out0, node1237, node1221);
		} else if (node1217) {
			node1086_out0 = vec3(node1221, node1237, node1414_out0);
		} else {
			node1086_out0 = vec3(node1237, node1237, node1237);
		}
		vec3 node1260 = vec3(node1110.x, node1110.y, (node1110.z + 300.0));
		float node1246 = gain((1.0 - pow(((((gain(((ns_simplex3((vec3(node1260.x, node1260.y, node1260.z) / 1.5)) * 0.5) + 0.5), (1.0 + u_val3b)) * 2.0) - 1.0) * 0.5) + 0.5), 1.0)), 1.7);
		float node1304 = float((node380 * (1.0 + ns_rand1(73.3584))));
		vec3 node1294 = ((node1110 * pow(2.0, n11(gain(((ns_value1((floor(node1304) + smoothstep(0.0, 1.0, fract(node1304)))) * 0.5) + 0.5), 0.5)))) + node1184);
		vec3 node1292 = vec3(node1294.x, node1294.y, (node1294.z + 100.0));
		float node1291 = node1292.x;
		float node1315 = node1292.y;
		float node1316 = node1292.z;
		vec3 node1285 = vec3(((ns_simplex3((vec3(node1291, node1315, node1316) / 1.5)) * 0.5) + 0.5), ((ns_simplex3((vec3(node1291, node1315, (node1316 + 33.333333333333336)) / 1.5)) * 0.5) + 0.5), ((ns_simplex3((vec3(node1291, node1315, (node1316 + 66.66666666666667)) / 1.5)) * 0.5) + 0.5));
		vec3 node1279 = vec3(((node1095 + u_val3b) + ((node1285.x * 0.33) * u_val3b)), pow(node1285.y, 2.0), pow(node1285.z, 2.0));
		float node1342 = node1279.z;
		bool node1347 = (node1342 < 0.5);
		float node1346_out0;
		if (node1347) {
			node1346_out0 = node1342;
		} else {
			node1346_out0 = (1.0 - node1342);
		}
		float node1341 = (node1342 + (node1279.y * node1346_out0));
		float node1357 = ((2.0 * node1342) - node1341);
		float node1275 = ((fract(node1279.x) * 360.0) / 60.0);
		float node1274 = floor(node1275);
		bool node1337 = (node1274 == 5.0);
		bool node1336 = (node1274 == 4.0);
		bool node1335 = (node1274 == 3.0);
		bool node1334 = (node1274 == 2.0);
		bool node1333 = (node1274 == 1.0);
		bool node1273 = (node1274 == 0.0);
		float node1411_out0;
		if ((node1337 || node1336 || node1335 || node1334 || node1333 || node1273)) {
			node1411_out0 = (node1341 - (((node1341 - node1342) * 2.0) * abs((mod(node1275, 2.0) - 1.0))));
		}
		vec3 node1272_out0;
		if (node1273) {
			node1272_out0 = vec3(node1341, node1411_out0, node1357);
		} else if (node1333) {
			node1272_out0 = vec3(node1411_out0, node1341, node1357);
		} else if (node1334) {
			node1272_out0 = vec3(node1357, node1341, node1411_out0);
		} else if (node1335) {
			node1272_out0 = vec3(node1357, node1411_out0, node1341);
		} else if (node1336) {
			node1272_out0 = vec3(node1411_out0, node1357, node1341);
		} else if (node1337) {
			node1272_out0 = vec3(node1341, node1357, node1411_out0);
		} else {
			node1272_out0 = vec3(node1357, node1357, node1357);
		}
		node1082_out0 = ((node1086_out0 * (1.0 - node1246)) + (node1272_out0 * node1246));
	}
	vec3 node1076 = clamp((((clamp(node1082_out0, 0.0, 1.0) * mix(0.0, 1.0, gain(parabola(node48, 0.5), 1.0))) * mix(1.0, smoothstep(1.0, 0.5, node48), node460)) * mix(0.3, 1.0, smoothstep(-1.0, -0.3, node9.y))), 0.0, 1.0);
	vec2 node1075 = node1076.yz;
	float node1073 = gain(node1075.y, 1.7);
	float node1072 = (1.0 - node1073);
	float node1378 = gain(node1075.x, 1.7);
	float node1377 = (1.0 - node1378);
	float node1387 = gain(node1076.x, 1.7);
	vec3 node1066 = ((((((node7 * node1072) + (vec3(1.0, 1.0, 0.0) * node1073)) * node1377) + (((vec3(1.0, 0.0, 0.0) * node1072) + (vec3(1.0, 0.5, 0.0) * node1073)) * node1378)) * (1.0 - node1387)) + (((((vec3(0.0, 0.0, 1.0) * node1072) + (vec3(0.0, 0.5, 1.0) * node1073)) * node1377) + (((vec3(1.0, 0.0, 1.0) * node1072) + (vec3(1.0, 1.0, 1.0) * node1073)) * node1378)) * node1387));
	hue = node1066.r;
	sat = node1066.g;
	val = node1066.b;
	


	PData result;
	result.p = pos;
	result.w = weight;
	result.hsv = vec3(hue, sat, val);
	result.a = alpha;
	result.extra_0 = extra_0;
	return result;
}	





void main()
{
	PData pdata = draw();

	vec3 color = pdata.hsv;
	vec4 posw = vec4(pdata.p, pdata.w);
	vec4 colora = vec4(color, pdata.a);

	fragPos = posw;
	fragColor = colora;

	// if (mode == 0) gl_FragColor = posw;
	// if (mode == 1) gl_FragColor = colora;
	// if (MODE == 0) result = posw;
	// if (MODE == 1) result = colora;
	// if (MODE == 2) result = pdata.extra_0;
	// fragColor = result;
}`,_=`
    #version 300 es
    precision highp float;
    precision highp int;
    in float a_idx;
    out vec4 v_color;
    uniform mat4 u_worldViewProjection;
    uniform vec2 tex_size;
    uniform sampler2D pos_tex;
    uniform sampler2D color_tex;
    uniform float point_size;
    void main() 
    {
        int idx = int(a_idx);
        int yi = idx / int(tex_size.x);
        int xi = idx - yi*int(tex_size.x);
        float u = (float(xi)+0.5)/tex_size.x;
        float v = (float(yi)+0.5)/tex_size.y;
        vec2 uvt = vec2(u, v);
        vec4 pos = texture(pos_tex, uvt);
        vec4 color = texture(color_tex, uvt);
        float ww = pos.a;
        // pos = projectionMatrix * modelViewMatrix * vec4(pos.xyz, 1.0);
        pos = vec4(pos.xyz, 1.0);
        ww = clamp(ww, 0.0, 10.0)*1.0;
        float ps = ww*point_size;
        // color.a *= 0.5;
        color.a = min(color.a, 1.0);
        v_color = color;
        gl_Position = pos;
        gl_PointSize = ps;
    }`,p=`
    #version 300 es
    precision highp float;
    precision highp int;
    in vec4 v_color;
    layout(location=0) out vec4 FragColor;
    void main()
    {
        vec4 color = v_color;
        vec2 puv = gl_PointCoord;
        puv = puv*2.0-1.0;
        float dist = length(puv);
        float u_fade = 0.5;
        float fade = mix(0.001, 1.0, clamp(u_fade, 0.0, 1.0));
        fade = u_fade;
        float mask = smoothstep(1.0, 1.0-fade, dist);
        // color.a *= mask;
        color.rgb *= mask;
        FragColor = color;
    }
    `,c=[],y=512;for(let u=0;u<y;u++)c.push(.3),c.push(0),c.push(0),c.push(1);let k={mag:o.LINEAR,min:o.LINEAR,level:0,format:o.RGBA,internalFormat:o.RGBA16F,type:o.FLOAT,width:y,height:1,src:c};const r=twgl.createTexture(o,k);twgl.setTextureFromArray(o,r,c,k);let N=96120;var P=1024,b=Math.ceil(N/P);const B=twgl.createProgramInfo(o,[s,v]),D={position:[-1,-1,0,1,-1,0,-1,1,0,-1,1,0,1,-1,0,1,1,0]},R=twgl.createBufferInfoFromArrays(o,D),F=[{mag:o.NEAREST,min:o.NEAREST,level:0,format:o.RGBA,internalFormat:o.RGBA16F,type:o.FLOAT},{mag:o.NEAREST,min:o.NEAREST,level:0,format:o.RGBA,internalFormat:o.RGBA,type:o.UNSIGNED_BYTE}];let m=twgl.createFramebufferInfo(o,F,P,b);const T=twgl.createProgramInfo(o,[_,p]);let S=[];for(let u=0;u<N;u++)S.push(u);const O={a_idx:{numComponents:1,data:S}},J=twgl.createBufferInfoFromArrays(o,O);let d=0,i=0,x=0;function A(u){let M=u-d;x+=e.speed*(M/1e3);const h=n.clientWidth,g=n.clientHeight,V=1080,Y=1920;e.render?(h!==V||g!==Y)&&(n.width=V,n.height=Y):(h!==n.width||g!==n.height)&&(n.width=h,n.height=g),a=[n.width,n.height],o.viewport(0,0,o.canvas.width,o.canvas.height),o.disable(o.BLEND),o.useProgram(B.program),twgl.setBuffersAndAttributes(o,B,R),twgl.setUniforms(B,{res:[P,b],time:u*1e3,numPoints:N,u_seed:e.seed,u_off:x,u_offset:.1,u_resx:n.width,u_resy:n.height,u_mix1:1,u_mix2:0,u_move:0,u_seed:e.seed,u_speed:.5,u_reflect:0,u_weight_high:1,u_weight_low:1,u_tex0:r,u_tx:e.tx,u_ty:e.ty,u_val1a:e.val1a,u_val1b:e.val1b,u_val2a:e.val2a,u_val2b:e.val2b,u_val3a:e.val3a,u_val3b:e.val3b,u_val4a:e.val4a,u_val4b:e.val4b,u_render:1}),twgl.setUniforms(B,ke),twgl.bindFramebufferInfo(o,m),o.drawBuffers([o.COLOR_ATTACHMENT0,o.COLOR_ATTACHMENT1,o.NONE,o.NONE]),twgl.drawBufferInfo(o,R),twgl.bindFramebufferInfo(o,null),o.useProgram(T.program),o.clearColor(0,0,0,0),o.clear(o.COLOR_BUFFER_BIT),o.enable(o.BLEND),o.blendEquation(o.MAX),o.blendFunc(o.ONE,o.ONE),twgl.setBuffersAndAttributes(o,T,J),twgl.setUniforms(T,{tex_size:[m.width,m.height],point_size:a[1]/1024*2,pos_tex:m.attachments[0],color_tex:m.attachments[1]}),twgl.drawBufferInfo(o,J,o.POINTS),t(i),d=u,i+=1}return A};async function Oe(n,e,t,a){n.getContext("webgl2");const o=async l=>{e(l),t.progress=0,requestAnimationFrame(o)};return requestAnimationFrame(o),t}async function Ae(){const n={avaliable:!1,inside:!1,latitude:0,longitude:0};if(navigator.geolocation){n.avaliable=!0,console.log("Geolocation avaliable");try{const e=await new Promise((_,p)=>{navigator.geolocation.getCurrentPosition(_,p)}),t=e.coords.latitude,a=e.coords.longitude;console.log(`Latitude: ${t}, Longitude: ${a}`);let o=I.center_x,l=I.center_y,s=I.radius,v=Math.sqrt((t-o)*(t-o)+(a-l)*(a-l))<s;n.inside=v,n.latitude=t,n.longitude=a,n.inside?(console.log("Inside THK area"),document.getElementById("text-info").innerHTML="LOCATION: INSIDE"):(console.log("Outside THK area"),document.getElementById("text-info").innerHTML="LOCATION: OUTSIDE")}catch(e){console.error("Error retrieving location:",e),n.avaliable=!1}}return n}function qe(){const n=document.getElementById("canvas-ui"),e=n.getContext("2d"),t=document.getElementById("canvas-thk"),a=document.getElementById("slider-color"),o=document.getElementById("slider-shape");function l(d,i){L.hijack1=!1}a.addEventListener("touchstart",d=>{l()}),o.addEventListener("touchstart",d=>{l()});function s(d){let i=d.clientX,x=d.clientY;d.touches&&(i=d.touches[0].clientX,x=d.touches[0].clientY);const A=n.getBoundingClientRect();return i-=A.left,x-=A.top,{x:i,y:x}}function v(d){let i=0,x=0;const A=d.id;A=="slider-color"?(i=2,x=0):A=="slider-shape"&&(i=3,x=1);let u=!1,M=!1,h=0,g=0,V=0,Y=Math.random()*100,G=Y,ce=Math.random(),Z=ce;i==1?(Y=.5,G=.5):(Y=Math.random()*100,G=Y);const Pe="val"+(i+1)+"a";f[Pe]=G;const Ce="val"+(i+1)+"b";f[Ce]=ce,n.getBoundingClientRect();let w=d.getBoundingClientRect().left,z=d.getBoundingClientRect().top;function ue(W){W.preventDefault(),u=!0,Q(W)}function j(W){u&&(W.preventDefault(),u=!1)}function Q(W){if(!u)return;const ee=s(W);h=ee.x,g=ee.y}function Ne(){let W=window.getComputedStyle(d).opacity;if(w=d.getBoundingClientRect().left+d.clientWidth/2,z=d.getBoundingClientRect().top+d.clientHeight/2,M=u,L.hijack1){M=!0;let H=parseFloat(L.x1);x&&(H=-H),H=(H*.25-.5)*Math.PI;let ne=parseFloat(L.y1);h=w+Math.cos(H)*(ne+.001),g=z+Math.sin(H)*(ne+.001)}let ee=t.width,K=Math.sqrt((h-w)*(h-w)+(g-z)*(g-z)),_e=K/ee,te=(h-w)/K,de=(g-z)/K,pe=Math.atan2(de,te),$=pe-V;$>Math.PI&&($-=Math.PI*2),$<-Math.PI&&($+=Math.PI*2),$*=Math.pow(_e,1.3)*3,M&&(G+=$,Z=Math.min(Math.max(0,_e),1)),V=pe;let me=G*2,Be=me-Math.min(1,Z)*Math.PI*.9,Te=me+Math.min(1,Z)*Math.PI*.9,ve=d.clientWidth/2,ae=ve*.1,U=ve-ae/2+12,X=U*.75,q=W;e.lineWidth=ae,e.lineCap="round",e.lineWidth=4,e.strokeStyle="rgba(255, 255, 255, "+.2*q+")",e.beginPath(),e.arc(w,z,U,Be,Te),e.stroke(),e.strokeStyle="rgba(255, 255, 255, "+.1*q+")",e.beginPath(),e.arc(w,z,U,0,Math.PI*2),e.stroke(),e.lineWidth=2;let Se=.05,Me=.05;function xe(H,ne,Le){return H+(ne-H)*Le}const oe="val"+(i+1)+"a",le="val"+(i+1)+"b";f.rand&&(console.log("r2"),G=f[oe],Z=f[le]),f[oe]=xe(f[oe],G,Se),f[le]=xe(f[le],Z,Me),i==1&&(f.speed=f[oe]),M?(e.strokeStyle="rgba(255, 255, 255, "+.3*q+")",e.beginPath(),e.arc(w,z,Math.max(K,U+ae/2),0,2*Math.PI),e.stroke(),e.strokeStyle="rgba(255, 255, 255, "+.3*q+")",e.beginPath(),e.moveTo(w+te*U,z+de*U),e.lineTo(w+te*K,z+de*K),e.stroke(),e.strokeStyle="rgba(255, 255, 255, "+.1*q+")",e.beginPath(),e.arc(h,g,X,0,2*Math.PI),e.globalCompositeOperation="destination-out",e.fillStyle="rgba(0, 0, 0, 1)",e.fill(),e.globalCompositeOperation="source-over",e.fillStyle="rgba(255, 255, 255, "+.08*q+")",e.beginPath(),e.arc(h,g,X,0,2*Math.PI),e.fill(),e.strokeStyle="rgba(255, 255, 255, "+.5*q+")",e.lineWidth=2,e.beginPath(),e.arc(h,g,X,0,2*Math.PI),e.stroke()):(e.beginPath(),e.arc(w,z,X,0,2*Math.PI),e.globalCompositeOperation="destination-out",e.fillStyle="rgba(0, 0, 0, 1)",e.fill(),e.globalCompositeOperation="source-over",e.fillStyle="rgba(255, 255, 255, "+.08*q+")",e.beginPath(),e.arc(w,z,X,0,2*Math.PI),e.fill(),e.strokeStyle="rgba(255, 255, 255, "+.5*q+")",e.lineWidth=2,e.beginPath(),e.arc(w,z,X,0,2*Math.PI),e.stroke())}return d.addEventListener("mousedown",ue,!1),d.addEventListener("mousemove",Q,!1),d.addEventListener("mouseup",j,!1),n.addEventListener("mousemove",Q,!1),n.addEventListener("mouseup",j,!1),d.addEventListener("touchstart",ue,!1),d.addEventListener("touchmove",Q,!1),d.addEventListener("touchend",j,!1),d.addEventListener("touchcancel",j,!1),n.addEventListener("touchmove",Q,!1),n.addEventListener("touchend",j,!1),n.addEventListener("touchcancel",j,!1),Ne}const _=v(a),p=v(o);f.rand=!1;let c=!1,y=0,k=0,r=0,N=0,P=0,b=0,B=.01;function D(d,i,x){return d+(i-d)*x}function R(d){d.preventDefault(),c=!0;let i=s(d);r=i.x,N=i.y,y=r,k=N,m(d)}function F(d){c&&(d.preventDefault(),c=!1)}function m(d){if(!c)return;d.preventDefault();const i=s(d);r=i.x,N=i.y}n.addEventListener("mousedown",R,!1),n.addEventListener("mousemove",m,!1),n.addEventListener("mouseup",F,!1),n.addEventListener("touchstart",R,!1),n.addEventListener("touchmove",m,!1),n.addEventListener("touchend",F,!1),n.addEventListener("touchcancel",F,!1);const T=document.getElementById("onb-arrow");let S=T.getBoundingClientRect().top,O=0;function J(){const d=t.clientWidth,i=t.clientHeight;(d!==n.width||i!==n.height)&&(n.width=d,n.height=i);let x=T.getBoundingClientRect().top;O=S-x,S=x,L.hijack_arrow&&(b=-O/n.height*.66*window.getComputedStyle(T).opacity),e.clearRect(0,0,n.width,n.height);let A=0;e.fillStyle=e.fillStyle="rgba(0, 0, 0, "+A*.5+")",e.fillRect(0,0,n.width,n.height),_(),p(),f.rand=!1;let u=0,M=0;if(c){u=r-y,M=N-k;let g=n.height;u=u/g,M=M/g,P=D(P,u,1),b=D(b,M*.2,.5)}else P=D(P,0,B),b=D(b,0,B);f.tx+=P,f.ty+=b,y=r,k=N;let h=se.progress;e.fillStyle="rgba(255, 255, 255, "+.5+")",e.fillRect(0,n.height-8,n.width*h,8)}return J}function C(n){n.style.pointerEvents="all",n.style.opacity="1"}function E(n){n.style.pointerEvents="none",n.style.opacity="0"}function ge(n){n.style.opacity="1"}function ye(n){n.style.opacity="0"}function he(n){let e=1,t=0;n.style.transform=`translateY(-${t}%) scale(${e}) `,n.style.border="1px solid #000"}function re(){const n=document.getElementById("canvas-thk"),e=document.getElementById("butt-info"),t=document.getElementById("butt-rand"),a=document.getElementById("butt-save"),o=document.getElementById("butt-sync"),l=document.getElementById("onb-skip"),s=document.getElementById("butt-continue"),v=document.getElementById("butt-download"),_=document.getElementById("onb-butt"),p=document.getElementById("textbox-onb"),c=document.getElementById("slider-color"),y=document.getElementById("slider-shape"),k=document.getElementById("onb-fade");I.show_time=null,document.getElementById("timer_text").style.opacity=0,E(_),ye(p),E(s),E(v),E(l),C(e),C(t),C(a),C(o),C(c),C(y),ye(k),he(n)}function He(n){document.getElementById("canvas-thk"),document.getElementById("butt-info"),document.getElementById("butt-rand"),document.getElementById("butt-save");const e=document.getElementById("butt-sync");document.getElementById("slider-color"),document.getElementById("slider-shape"),document.getElementById("onb-fade"),e.disabled=!0}function We(){const n=document.getElementById("canvas-thk"),e=document.getElementById("butt-info"),t=document.getElementById("butt-rand"),a=document.getElementById("butt-save"),o=document.getElementById("butt-sync"),l=document.getElementById("butt-continue"),s=document.getElementById("butt-download"),v=document.getElementById("onb-butt"),_=document.getElementById("textbox-onb"),p=document.getElementById("slider-color"),c=document.getElementById("slider-shape"),y=document.getElementById("onb-fade");I.show_time=null,document.getElementById("timer_text").style.opacity=0,C(v),ge(_),E(l),E(s),E(e),E(t),E(a),E(o),E(p),E(c),ge(y),he(n)}function be(){document.getElementById("butt-continue"),document.getElementById("butt-download")}function Re(){let n=I.show_time,e=document.getElementById("timer_text"),t=document.getElementById("butt-sync"),a="",o="SYNC";if(n!=null){let l=new Date().getTime(),s=n-l,v=I.show_len;if(s>0){e.style.opacity=.75;let _=Math.floor(s/6e4),p=Math.floor(s%6e4/1e3);_.toString(),p.toString(),_<1?(a=`THK DESIGN WILL BE DISPLAYED ON THK TOWER IN 00:${p}`,o=`00:${p}`):(a=`THK DESIGN WILL BE DISPLAYED ON THK TOWER IN ${_}:${p}`,o=`${_}:${p}`);let c=I.sync_time,y=Math.floor((l-c)/(n-c)*100)*1.1;t.style.backgroundSize=`${y}% 100%`}else if(s>-v){a="THK DESIGN IS BEING DISPLAYED ON THK TOWER NOW",e.style.opacity=1,o="LIVE";let _=Math.floor((s+v)/v*100)*1.1;t.style.backgroundSize=`${_}% 100%`}else a="THK DESIGN HAS BEEN DISPLAYED",e.style.opacity=.5,setTimeout(()=>{e.innerHTML==a&&(e.innerHTML="")},1e3),t.style.backgroundSize="$0% 100%",t.disabled=!1}e.innerHTML=a,t.innerHTML!=o&&(t.innerHTML=o)}let we={fn:()=>{}};document.getElementById("onb-skip").addEventListener("click",function(){we.fn()});function ie(n){const e=document.getElementById("onb-butt");e.innerHTML=n}const Fe="TUTORIAL",Ye="NEXT",Ge="START";function je(){document.getElementById("onb-fade"),document.getElementById("butt-info"),document.getElementById("butt-save");const n=document.getElementById("butt-sync"),e=document.getElementById("onb-skip"),t=document.getElementById("onb-header"),a=document.getElementById("onb-body"),o=document.getElementById("onb-butt"),l="THK SYNC",s="CREATE THK DESIGN AND SEND IT TO THK TOWER",v="CREATE",_="DRAG & ROTATE CONTROLS TO ADJUST SHAPE & COLOR",p="EXPLORE",c="FIND THE DESIGN THAT RESONATES WITH YOU",y="SEND",k="CLICK 'SYNC' AND WATCH YOUR DESIGN ON THE TOWER. DON'T FORGET TO FILM AND SHARE";let r=0;function N(m){switch(m){case 0:t.innerHTML=l,t.innerHTML=t.textContent.replace(/\S/g,"<span class='letter'>$&</span>"),a.innerHTML=s,a.innerHTML=a.textContent.replace(/\S/g,"<span class='letter'>$&</span>");break;case 2:t.innerHTML=v,t.innerHTML=t.textContent.replace(/\S/g,"<span class='letter'>$&</span>"),a.innerHTML=_,a.innerHTML=a.textContent.replace(/\S/g,"<span class='letter'>$&</span>");break;case 1:t.innerHTML=p,t.innerHTML=t.textContent.replace(/\S/g,"<span class='letter'>$&</span>"),a.innerHTML=c,a.innerHTML=a.textContent.replace(/\S/g,"<span class='letter'>$&</span>");break;case 3:t.innerHTML=y,t.innerHTML=t.textContent.replace(/\S/g,"<span class='letter'>$&</span>"),a.innerHTML=k,a.innerHTML=a.textContent.replace(/\S/g,"<span class='letter'>$&</span>");break}}function P(){re()}let b=anime({targets:L,y1:[0,200],easing:"easeInOutQuad",duration:1e3,delay:200}),B=anime({loop:!0,direction:"alternate",targets:L,x1:[0,1],y1:[200,150],easing:"easeInOutSine",duration:1e3,delay:0});function D(){if(console.log("next page",r),r==0&&(ie(Fe),C(e)),r>0&&r<3&&ie(Ye),r==3&&ie(Ge),r>3)P();else{N(r);let m=document.getElementById("butt-rand"),T="2px solid rgba(255,255,255,0.33)";if(r==1?(m.style.border="2px solid rgba(255,255,255,0.7)",C(m)):m.style.border=T,r==2){let S=document.getElementById("slider-color"),O=document.getElementById("slider-shape");C(S),C(O),L.hijack1=!0,L.y1=0,L.x1=0,b.play(),setTimeout(()=>{B.play()},1200)}else L.hijack1=!1,b.restart(),B.restart(),b.pause(),B.pause();r==3&&C(n),document.querySelectorAll(".letter").forEach(S=>{S.style.opacity="0"}),anime.timeline({loop:!1}).add({targets:"#onb-header .letter",opacity:[0,1],easing:"easeInOutQuad",duration:100,delay:(S,O)=>50*(O+1)}).add({targets:"#onb-body .letter",opacity:[0,1],easing:"easeInOutQuad",duration:100,delay:(S,O)=>30*(O+1)})}r+=1}function R(){r=0,We(),D(),anime({targets:"#onb-butt",opacity:[0,1],easing:"easeInOutQuad",duration:0,delay:0})}o.addEventListener("click",function(){D()});function F(){let m=6;for(;r<m;)D();P();let T=document.getElementById("onb-butt");E(T)}return we.fn=F,R}const ze=je();Ae();const Ee=document.getElementById("canvas-thk"),Ke=document.getElementById("butt-sync");Ke.addEventListener("click",function(){{const n=f;fetch(I.server,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)}).then(e=>e.json()).then(e=>{console.log("Success:",e);let t=e.time*1e3,a=e.length*1e3;I.show_time=t,I.show_len=a,I.sync_time=new Date().getTime(),fe()}).catch(e=>{console.error("Error:",e)})}});const $e=qe();function Ue(){$e(),Re()}const Xe=De(Ee,f,Ue);Oe(Ee,Xe,se);const Ie=document.getElementById("butt-save");Ie.addEventListener("click",function(){fe()});document.getElementById("butt-download");Ie.addEventListener("click",function(){fe()});const Ve=document.getElementById("butt-info");Ve.addEventListener("click",function(){ze()});const Ze=document.getElementById("butt-rand");Ze.addEventListener("click",function(){console.log("rand"),f.val3a=Math.random()*100,f.val3b=Math.random(),f.val4a=Math.random()*100,f.val4b=Math.random(),f.rand=!0});const Qe=document.getElementById("butt-continue");Qe.addEventListener("click",function(){re()});function Je(){let n=new Date().getTime()+5e3;I.show_time=n,be()}function fe(){se.callback=Je,He(),be()}re();ze();
