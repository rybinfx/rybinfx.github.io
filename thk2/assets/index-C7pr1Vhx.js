var PD=Object.defineProperty;var ai=Q=>{throw TypeError(Q)};var _D=(Q,I,C)=>I in Q?PD(Q,I,{enumerable:!0,configurable:!0,writable:!0,value:C}):Q[I]=C;var fA=(Q,I,C)=>_D(Q,typeof I!="symbol"?I+"":I,C),$D=(Q,I,C)=>I.has(Q)||ai("Cannot "+C);var hi=(Q,I,C)=>I.has(Q)?ai("Cannot add the same private member more than once"):I instanceof WeakSet?I.add(Q):I.set(Q,C);var OB=(Q,I,C)=>($D(Q,I,"access private method"),C);(function(){const I=document.createElement("link").relList;if(I&&I.supports&&I.supports("modulepreload"))return;for(const D of document.querySelectorAll('link[rel="modulepreload"]'))y(D);new MutationObserver(D=>{for(const U of D)if(U.type==="childList")for(const N of U.addedNodes)N.tagName==="LINK"&&N.rel==="modulepreload"&&y(N)}).observe(document,{childList:!0,subtree:!0});function C(D){const U={};return D.integrity&&(U.integrity=D.integrity),D.referrerPolicy&&(U.referrerPolicy=D.referrerPolicy),D.crossOrigin==="use-credentials"?U.credentials="include":D.crossOrigin==="anonymous"?U.credentials="omit":U.credentials="same-origin",U}function y(D){if(D.ep)return;D.ep=!0;const U=C(D);fetch(D.href,U)}})();const Ao=(Q,I,C)=>{let y=[Q.width,Q.height];const D=Q.getContext("webgl2",{antialias:!0});D||alert("Please use browser with WebGL2 support");var U=D.getExtension("EXT_color_buffer_float");U||alert("Please use browser with Floating Point support");const N=`
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
    `,G=`#version 300 es
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


uniform float u_off;
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
uniform float u_reflect;
uniform float u_weight_low;
uniform float u_weight_high;
uniform float u_diff_u;
uniform float u_diff_v;
uniform float u_seed;
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
	Seg Clone_0 = seg_even(float(int(point)), float(int(npoints)), float(int(1)));
	Seg Clone_1 = seg_even(float(int(Clone_0.point)), float(int(Clone_0.npoints)), float(int(1)));
	Seg Clone_2 = seg_even(float(int(Clone_1.point)), float(int(Clone_1.npoints)), float(int(9)));
	Seg Clone_3 = seg_even(float(int(Clone_2.point)), float(int(Clone_2.npoints)), float(int(9)));
	Seg Clone_4 = seg_even(float(int(Clone_3.point)), float(int(Clone_3.npoints)), float(int(1)));
	Seg Clone_5 = seg_even(float(int(Clone_4.point)), float(int(Clone_4.npoints)), float(int(356)));
	

	// Main Code Defs
	vec3 node7 = vec3(0.0, 0.0, 0.0);
	float node26 = float(Clone_0.idx);
	float node30 = float(Clone_2.idx);
	float node61 = (u_val4a * 0.5);
	vec2 node59 = vec2((node61 * 0.5), -3.0);
	float node50 = mix(6.0, 16.0, ((ns_simplex2((vec2(node59.x, node59.y) / 1.5)) * 0.5) + 0.5));
	bool node49 = (node50 > 1.0);
	float node776_out0;
	if (((node49 || node49) || (node49 || node49 || (node49 || node49)))) {
		node776_out0 = float(node50);
	}
	float node769_out0;
	bool node769_out1;
	if ((node49 || node49 || (node49 || node49))) {
		node769_out0 = (0.14287755393627663 - ((0.28575510787255326 * cos(1.5707963267948966)) / 6.283185307179586));
		node769_out1 = (node776_out0 < 1.0);
	}
	float node245 = float((Clone_5.idx + fract(0.0)));
	bool node241 = (Clone_5.size > 1.0);
	float node240_out0;
	if (node241) {
		node240_out0 = (node245 / Clone_5.size);
	} else {
		node240_out0 = fract((node245 + 0.5));
	}
	float node238 = fract(node240_out0);
	float node237 = (node238 * (node50 + 1.0));
	float node212 = ((u_ty + ((u_move * -1.0) * 0.2)) * 4.5);
	float node764_out0;
	float node764_out1;
	float node764_out2;
	float node764_out3;
	float node764_out4;
	bool node764_out5;
	if ((node49 || node49)) {
		node764_out0 = floor(node237);
		node764_out1 = (node212 * 0.5);
		node764_out2 = (0.21424489212744674 + node769_out0);
		node764_out3 = (node776_out0 - 1.0);
		node764_out4 = fract(((u_off * 0.25) * node776_out0));
		node764_out5 = (!node769_out1);
	}
	bool node225 = (Clone_2.size > 1.0);
	float node224_out0;
	if (node225) {
		node224_out0 = (node30 / (Clone_2.size - 1.0));
	} else {
		node224_out0 = 0.5;
	}
	float node221 = (1.0 - parabola(node224_out0, 1.0));
	bool node67 = (!node49);
	float node48_out0;
	float node48_out1;
	float node48_out2;
	float node48_out3;
	if (node49) {
		float node73 = 0.0;
		float node254 = 0.0;
		float node257 = 0.0;
		for (int node71 = 0; node71 < int(node50); node71++) {
			float node88 = float(node71);
			float node87 = (node88 + node764_out4);
			float node82_out0;
			if (node769_out1) {
				node82_out0 = node87;
			} else {
				node82_out0 = (node87 / node764_out3);
			}
			float node80 = clamp(node82_out0, 0.0, 1.0);
			bool node79 = (node80 < 0.5);
			float node78_out0;
			if (node79) {
				bool node102 = (node80 > 0.28575510787255326);
				float node101_out0;
				if (node102) {
					node101_out0 = ((node80 - 0.28575510787255326) + node769_out0);
				} else {
					float node116 = ((node80 / 0.28575510787255326) / 2.0);
					node101_out0 = ((0.28575510787255326 * node116) - ((0.28575510787255326 * cos((((node116 - 0.25) * 3.141592653589793) * 2.0))) / 6.283185307179586));
				}
				node78_out0 = ((node101_out0 / node764_out2) / 2.0);
			} else {
				float node134 = (1.0 - node80);
				bool node133 = (node134 > 0.28575510787255326);
				float node132_out0;
				if (node133) {
					node132_out0 = ((node134 - 0.28575510787255326) + node769_out0);
				} else {
					float node140 = ((node134 / 0.28575510787255326) / 2.0);
					node132_out0 = ((0.28575510787255326 * node140) - ((0.28575510787255326 * cos((((node140 - 0.25) * 3.141592653589793) * 2.0))) / 6.283185307179586));
				}
				node78_out0 = (1.0 - ((node132_out0 / node764_out2) / 2.0));
			}
			float node76 = pow(node78_out0, 1.0);
			float node155 = ((node88 - 1.0) + node764_out4);
			float node154_out0;
			if (node769_out1) {
				node154_out0 = node155;
			} else {
				node154_out0 = (node155 / node764_out3);
			}
			float node152 = clamp(node154_out0, 0.0, 1.0);
			bool node151 = (node152 < 0.5);
			float node150_out0;
			if (node151) {
				bool node163 = (node152 > 0.28575510787255326);
				float node162_out0;
				if (node163) {
					node162_out0 = ((node152 - 0.28575510787255326) + node769_out0);
				} else {
					float node169 = ((node152 / 0.28575510787255326) / 2.0);
					node162_out0 = ((0.28575510787255326 * node169) - ((0.28575510787255326 * cos((((node169 - 0.25) * 3.141592653589793) * 2.0))) / 6.283185307179586));
				}
				node150_out0 = ((node162_out0 / node764_out2) / 2.0);
			} else {
				float node183 = (1.0 - node152);
				bool node182 = (node183 > 0.28575510787255326);
				float node181_out0;
				if (node182) {
					node181_out0 = ((node183 - 0.28575510787255326) + node769_out0);
				} else {
					float node189 = ((node183 / 0.28575510787255326) / 2.0);
					node181_out0 = ((0.28575510787255326 * node189) - ((0.28575510787255326 * cos((((node189 - 0.25) * 3.141592653589793) * 2.0))) / 6.283185307179586));
				}
				node150_out0 = (1.0 - ((node181_out0 / node764_out2) / 2.0));
			}
			float node148 = pow(node150_out0, 1.0);
			vec3 node204 = vec3((float((((node148 + node76) / 2.0) * 2.0)) + node764_out1), node221, 0.0);
			float node72 = (node73 + ((node76 - node148) * pow(((ns_simplex3((vec3(node204.x, node204.y, node204.z) / 1.5)) * 0.5) + 0.5), 4.0)));
			bool node235 = (node88 == node764_out0);
			bool node253 = (!node235);
			float node234_out0;
			if (node235) {
				node234_out0 = node73;
			} else {
				node234_out0 = node254;
			}
			float node256_out0;
			if (node235) {
				node256_out0 = node72;
			} else {
				node256_out0 = node257;
			}
			node73 = node72;
			node254 = node234_out0;
			node257 = node256_out0;
		}
		float node68 = (node254 / node73);
		float node259 = (node257 / node73);
		node48_out0 = node68;
		node48_out1 = node259;
		node48_out2 = node68;
		node48_out3 = node259;
	} else {
		node48_out0 = 0.0;
		node48_out1 = 1.0;
		node48_out2 = 0.0;
		node48_out3 = 1.0;
	}
	float node264 = fract(node237);
	vec2 node270 = vec2((node61 + 23.0), node238);
	vec2 node279 = vec2((node61 + 13.0), node238);
	vec2 node307 = vec2(node61, 1.0);
	float node313_out0;
	float node313_out1;
	float node313_out2;
	float node313_out3;
	if (node49) {
		float node319 = 0.0;
		float node439 = 0.0;
		float node442 = 0.0;
		for (int node317 = 0; node317 < int(node50); node317++) {
			float node330 = float(node317);
			float node329 = (node330 + node764_out4);
			float node328_out0;
			if (node769_out1) {
				node328_out0 = node329;
			} else {
				node328_out0 = (node329 / node764_out3);
			}
			float node326 = clamp(node328_out0, 0.0, 1.0);
			bool node325 = (node326 < 0.5);
			float node324_out0;
			if (node325) {
				bool node337 = (node326 > 0.28575510787255326);
				float node336_out0;
				if (node337) {
					node336_out0 = ((node326 - 0.28575510787255326) + node769_out0);
				} else {
					float node343 = ((node326 / 0.28575510787255326) / 2.0);
					node336_out0 = ((0.28575510787255326 * node343) - ((0.28575510787255326 * cos((((node343 - 0.25) * 3.141592653589793) * 2.0))) / 6.283185307179586));
				}
				node324_out0 = ((node336_out0 / node764_out2) / 2.0);
			} else {
				float node357 = (1.0 - node326);
				bool node356 = (node357 > 0.28575510787255326);
				float node355_out0;
				if (node356) {
					node355_out0 = ((node357 - 0.28575510787255326) + node769_out0);
				} else {
					float node363 = ((node357 / 0.28575510787255326) / 2.0);
					node355_out0 = ((0.28575510787255326 * node363) - ((0.28575510787255326 * cos((((node363 - 0.25) * 3.141592653589793) * 2.0))) / 6.283185307179586));
				}
				node324_out0 = (1.0 - ((node355_out0 / node764_out2) / 2.0));
			}
			float node322 = pow(node324_out0, 1.0);
			float node378 = ((node330 - 1.0) + node764_out4);
			float node377_out0;
			if (node769_out1) {
				node377_out0 = node378;
			} else {
				node377_out0 = (node378 / node764_out3);
			}
			float node375 = clamp(node377_out0, 0.0, 1.0);
			bool node374 = (node375 < 0.5);
			float node373_out0;
			if (node374) {
				bool node386 = (node375 > 0.28575510787255326);
				float node385_out0;
				if (node386) {
					node385_out0 = ((node375 - 0.28575510787255326) + node769_out0);
				} else {
					float node392 = ((node375 / 0.28575510787255326) / 2.0);
					node385_out0 = ((0.28575510787255326 * node392) - ((0.28575510787255326 * cos((((node392 - 0.25) * 3.141592653589793) * 2.0))) / 6.283185307179586));
				}
				node373_out0 = ((node385_out0 / node764_out2) / 2.0);
			} else {
				float node406 = (1.0 - node375);
				bool node405 = (node406 > 0.28575510787255326);
				float node404_out0;
				if (node405) {
					node404_out0 = ((node406 - 0.28575510787255326) + node769_out0);
				} else {
					float node412 = ((node406 / 0.28575510787255326) / 2.0);
					node404_out0 = ((0.28575510787255326 * node412) - ((0.28575510787255326 * cos((((node412 - 0.25) * 3.141592653589793) * 2.0))) / 6.283185307179586));
				}
				node373_out0 = (1.0 - ((node404_out0 / node764_out2) / 2.0));
			}
			float node371 = pow(node373_out0, 1.0);
			vec3 node427 = vec3((float((((node371 + node322) / 2.0) * 2.0)) + node764_out1), node221, 0.0);
			float node318 = (node319 + ((node322 - node371) * pow(((ns_simplex3((vec3(node427.x, node427.y, node427.z) / 1.5)) * 0.5) + 0.5), 4.0)));
			bool node437 = (node330 == node764_out0);
			bool node438 = (!node437);
			float node436_out0;
			if (node437) {
				node436_out0 = node319;
			} else {
				node436_out0 = node439;
			}
			float node441_out0;
			if (node437) {
				node441_out0 = node318;
			} else {
				node441_out0 = node442;
			}
			node319 = node318;
			node439 = node436_out0;
			node442 = node441_out0;
		}
		float node314 = (node439 / node319);
		float node444 = (node442 / node319);
		node313_out0 = node314;
		node313_out1 = node444;
		node313_out2 = node314;
		node313_out3 = node444;
	} else {
		node313_out0 = 0.0;
		node313_out1 = 1.0;
		node313_out2 = 0.0;
		node313_out3 = 1.0;
	}
	float node446 = ((node313_out1 - node313_out0) * 0.5);
	vec2 node456 = vec2(node61, 13.0);
	vec2 node467 = vec2(node61, 15.0);
	bool node479 = (Clone_3.size > 1.0);
	float node478_out0;
	if (node479) {
		node478_out0 = (float(Clone_3.idx) / (Clone_3.size - 1.0));
	} else {
		node478_out0 = 0.5;
	}
	bool node474 = (Clone_2.idx < 4.0);
	float node473_out0;
	if (node474) {
		node473_out0 = (1.0 - node478_out0);
	} else {
		bool node488 = (Clone_2.idx != 4.0);
		float node487_out0;
		if (node488) {
			node487_out0 = node478_out0;
		} else {
			node487_out0 = (((1.0 - parabola(node478_out0, 0.25)) * 0.5) + 0.5);
		}
		node473_out0 = node487_out0;
	}
	vec3 node297 = vec3(((node264 * mix(1.0, 2.0, ((ns_simplex2((vec2(node307.x, node307.y) / 1.5)) * 0.5) + 0.5))) + (n11((node313_out0 + node446)) * mix(1.0, 2.0, ((ns_simplex2((vec2(node456.x, node456.y) / 1.5)) * 0.5) + 0.5)))), ((node221 * mix(1.0, 4.0, ((ns_simplex2((vec2(node467.x, node467.y) / 1.5)) * 0.5) + 0.5))) + (node212 * 2.0)), (node473_out0 * 0.5));
	vec3 node295 = vec3(node297.x, node297.y, node297.z);
	float node294 = node295.x;
	float node496 = node295.y;
	float node497 = node295.z;
	float node291 = ns_simplex3((vec3(node294, node496, node497) / 1.5));
	vec3 node285 = vec3(((gain(((node291 * 0.5) + 0.5), 1.0) * 2.0) - 1.0), ((gain(((ns_simplex3((vec3(node294, node496, (node497 + 33.333333333333336)) / 1.5)) * 0.5) + 0.5), 1.0) * 2.0) - 1.0), ((gain(((ns_simplex3((vec3(node294, node496, (node497 + 66.66666666666667)) / 1.5)) * 0.5) + 0.5), 1.0) * 2.0) - 1.0));
	float node43 = (Clone_1.idx + (mix(node48_out0, node48_out1, pow(gain(node264, (1.0 - ns_simplex2((vec2(node270.x, node270.y) / 1.5)))), pow(2.0, ns_simplex2((vec2(node279.x, node279.y) / 1.5))))) + (node285.y * 0.1)));
	vec4 node14 = vec4((0.5 + (float((float(float(((((node26 * 9.0) - node26) - 4.0) + node30))) / 9.0)) * mix(0.1, 0.7, pow(n01(cos((((pow(node43, 1.2) + 0.5) * 3.141592653589793) * 2.0))), 0.8)))), pow(node43, 1.0), 0.0, 0.0);
	vec2 node12 = vec2(node14.x, node14.y);
	vec3 node539 = normalize((node285 * vec3(1.0, 0.0, 1.0)));
	bool node531 = (node474 || ((Clone_2.idx == 4.0) && (node478_out0 > 0.5)));
	vec3 node530_out0;
	if (node531) {
		node530_out0 = vec3((node539.x * -1.0), node539.y, node539.z);
	} else {
		node530_out0 = node539;
	}
	vec2 node527 = rot2(node530_out0.xz, (n11(node478_out0) * 0.25));
	pos = (((((node7 + vec3(n11(node12.x), n11(node12.y), 0.0)) + (vec3(node527.x, node530_out0.y, node527.y) * 0.04)) * vec3(mix((0.5625 / (u_resx / u_resy)), 1.0, u_render), 1.0, 1.0)) * vec3(1.0, mix(1.0, 1.0, u_render), 1.0)) + vec3(0.0, mix(0.06, 0.0, u_render), 0.0));
	alpha = 1.0;
	weight = mix(1.0, 10.0, clamp((((node291 * 0.5) + 0.5) * (1.0 + node446)), 0.0, 1.0));
	vec3 node599 = ((node297 * vec3(0.5, 0.25, 1.0)) + vec3((u_val3a * 0.5), 0.0, 0.0));
	float node605 = pow(2.0, 0.0);
	float node597 = (node599.x * node605);
	float node606 = (node599.y * node605);
	float node610 = (node599.z * node605);
	vec3 node596 = vec3(node597, node606, ((node610 + 100.0) + u_val3a));
	vec3 node588 = spectral_zucconi6(fract(((ns_simplex3((vec3(node596.x, node596.y, node596.z) / 1.5)) * 0.5) + 0.5)));
	vec3 node617 = vec3(0.0, 1.0, 0.0);
	float node615 = (1.0 + node617.r);
	float node620 = (1.0 + node617.g);
	float node624 = (1.0 + node617.b);
	vec3 node634 = vec3(node597, node606, (node610 + u_val3a));
	float node628 = ((ns_simplex3((vec3(node634.x, node634.y, node634.z) / 1.5)) * 0.5) + 0.5);
	float node626 = (pow(node628, 1.0) * pow(0.0, 0.5));
	float node654 = (node610 + 0.6);
	vec3 node651 = vec3(node597, node606, ((node654 + 100.0) + u_val3a));
	vec3 node643 = spectral_zucconi6(fract(((ns_simplex3((vec3(node651.x, node651.y, node651.z) / 1.5)) * 0.5) + 0.5)));
	vec3 node670 = vec3(node597, node606, ((node610 + 0.3) + u_val3a));
	float node662 = (pow(((ns_simplex3((vec3(node670.x, node670.y, node670.z) / 1.5)) * 0.5) + 0.5), 1.0) * pow(0.25, 0.5));
	vec3 node689 = vec3(node597, node606, (((node610 + 1.2) + 100.0) + u_val3a));
	vec3 node681 = spectral_zucconi6(fract(((ns_simplex3((vec3(node689.x, node689.y, node689.z) / 1.5)) * 0.5) + 0.5)));
	vec3 node707 = vec3(node597, node606, (node654 + u_val3a));
	float node699 = (pow(((ns_simplex3((vec3(node707.x, node707.y, node707.z) / 1.5)) * 0.5) + 0.5), 1.0) * pow(0.5, 0.5));
	vec3 node724 = vec3(node597, node606, (((node610 + 1.7999999999999998) + 100.0) + u_val3a));
	vec3 node716 = spectral_zucconi6(fract(((ns_simplex3((vec3(node724.x, node724.y, node724.z) / 1.5)) * 0.5) + 0.5)));
	vec3 node743 = vec3(node597, node606, ((node610 + 0.8999999999999999) + u_val3a));
	float node735 = (pow(((ns_simplex3((vec3(node743.x, node743.y, node743.z) / 1.5)) * 0.5) + 0.5), 1.0) * pow(0.75, 0.5));
	vec3 node577 = (((((((node7 + (vec3(pow(node588.r, node615), pow(node588.g, node620), pow(node588.b, node624)) * node626)) + (vec3(pow(node643.r, node615), pow(node643.g, node620), pow(node643.b, node624)) * node662)) + (vec3(pow(node681.r, node615), pow(node681.g, node620), pow(node681.b, node624)) * node699)) + (vec3(pow(node716.r, node615), pow(node716.g, node620), pow(node716.b, node624)) * node735)) / (((node626 + node662) + node699) + node735)) * (pow(node628, 0.5) * 1.2)) * node473_out0);
	hue = node577.r;
	sat = node577.g;
	val = node577.b;
	


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
}`,s=`
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
    }`,R=`
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
    `,n=[],e=512;for(let eA=0;eA<e;eA++)n.push(.3),n.push(0),n.push(0),n.push(1);let u={mag:D.LINEAR,min:D.LINEAR,level:0,format:D.RGBA,internalFormat:D.RGBA16F,type:D.FLOAT,width:e,height:1,src:n};const v=twgl.createTexture(D,u);twgl.setTextureFromArray(D,v,n,u);let K=28836;var x=1024,J=Math.ceil(K/x);const j=twgl.createProgramInfo(D,[N,G]),z={position:[-1,-1,0,1,-1,0,-1,1,0,-1,1,0,1,-1,0,1,1,0]},QA=twgl.createBufferInfoFromArrays(D,z),T=[{mag:D.NEAREST,min:D.NEAREST,level:0,format:D.RGBA,internalFormat:D.RGBA16F,type:D.FLOAT},{mag:D.NEAREST,min:D.NEAREST,level:0,format:D.RGBA,internalFormat:D.RGBA,type:D.UNSIGNED_BYTE}];let wA=twgl.createFramebufferInfo(D,T,x,J);const EA=twgl.createProgramInfo(D,[s,R]);let IA=[];for(let eA=0;eA<K;eA++)IA.push(eA);const CA={a_idx:{numComponents:1,data:IA}},sA=twgl.createBufferInfoFromArrays(D,CA);let p=0,AA=0;function iA(eA){AA+=I.speed*.01;const FA=Q.clientWidth,tA=Q.clientHeight,LA=1080,aA=1920;I.render?(FA!==LA||tA!==aA)&&(Q.width=LA,Q.height=aA):(FA!==Q.width||tA!==Q.height)&&(Q.width=FA,Q.height=tA),y=[Q.width,Q.height],D.viewport(0,0,D.canvas.width,D.canvas.height),D.disable(D.BLEND),D.useProgram(j.program),twgl.setBuffersAndAttributes(D,j,QA),twgl.setUniforms(j,{res:[x,J],time:eA*1e3,numPoints:K,u_seed:I.seed,u_off:AA,u_offset:.1,u_resx:Q.width,u_resy:Q.height,u_mix1:1,u_mix2:0,u_move:0,u_seed:I.seed,u_speed:.5,u_reflect:0,u_weight_high:1,u_weight_low:1,u_tex0:v,u_tx:I.tx,u_ty:I.ty,u_val1a:I.val1a,u_val1b:I.val1b,u_val2a:I.val2a,u_val2b:I.val2b,u_val3a:I.val3a,u_val3b:I.val3b,u_val4a:I.val4a,u_val4b:I.val4b,u_render:1}),twgl.bindFramebufferInfo(D,wA),D.drawBuffers([D.COLOR_ATTACHMENT0,D.COLOR_ATTACHMENT1,D.NONE,D.NONE]),twgl.drawBufferInfo(D,QA),twgl.bindFramebufferInfo(D,null),D.useProgram(EA.program),D.clearColor(0,0,0,1),D.clear(D.COLOR_BUFFER_BIT),D.enable(D.BLEND),D.blendEquation(D.MAX),D.blendFunc(D.ONE,D.ONE),twgl.setBuffersAndAttributes(D,EA,sA),twgl.setUniforms(EA,{tex_size:[wA.width,wA.height],point_size:y[1]/1024*2,pos_tex:wA.attachments[0],color_tex:wA.attachments[1]}),twgl.drawBufferInfo(D,sA,D.POINTS),C(p),p+=1}return iA};function li(Q){return Q&&Q.__esModule&&Object.prototype.hasOwnProperty.call(Q,"default")?Q.default:Q}function Bo(Q){if(Q.__esModule)return Q;var I=Q.default;if(typeof I=="function"){var C=function y(){return this instanceof y?Reflect.construct(I,arguments,this.constructor):I.apply(this,arguments)};C.prototype=I.prototype}else C={};return Object.defineProperty(C,"__esModule",{value:!0}),Object.keys(Q).forEach(function(y){var D=Object.getOwnPropertyDescriptor(Q,y);Object.defineProperty(C,y,D.get?D:{enumerable:!0,get:function(){return Q[y]}})}),C}var Vi={exports:{}};/*! file-extension v4.0.5 | (c) silverwind | BSD license */(function(Q,I){(function(C){Q.exports=C()})(function(){return function(y,D){if(D||(D={}),!y)return"";var U=(/[^./\\]*$/.exec(y)||[""])[0];return D.preserveCase?U:U.toLowerCase()}})})(Vi);var Qo=Vi.exports;const Io=li(Qo);function go(Q){const I=Q.includes(".")&&Io(Q);return`image/${I==="jpg"?"jpeg":I||"png"}`}function Yi(Q,I){const C=document.createElement("a");C.download=Q,C.href=I;const y=new MouseEvent("click");C.dispatchEvent(y)}function Eo(Q,I={}){const C=new Date,{filename:y=`Screen Shot ${C.toISOString().slice(0,10)} at ${C.toTimeString().slice(0,8).replace(/:/g,".")}.png`,type:D=go(y),quality:U=1,useBlob:N,download:G=!0}={...I};if(N)return new Promise(R=>{Q.toBlob(n=>{if(G){const e=URL.createObjectURL(n);Yi(y,e),setTimeout(()=>{URL.revokeObjectURL(e)},1)}R(n)},D,U)});const s=Q.toDataURL(D,U);return G&&Yi(y,s),s}var pE=(Q,I,C)=>{if(!I.has(Q))throw TypeError("Cannot "+C)},H=(Q,I,C)=>(pE(Q,I,"read from private field"),C?C.call(Q):I.get(Q)),BA=(Q,I,C)=>{if(I.has(Q))throw TypeError("Cannot add the same private member more than once");I instanceof WeakSet?I.add(Q):I.set(Q,C)},rA=(Q,I,C,y)=>(pE(Q,I,"write to private field"),I.set(Q,C),C),Co=(Q,I,C,y)=>({set _(D){rA(Q,I,D)},get _(){return H(Q,I,y)}}),gA=(Q,I,C)=>(pE(Q,I,"access private method"),C),yA=new Uint8Array(8),cB=new DataView(yA.buffer),SA=Q=>[(Q%256+256)%256],GA=Q=>(cB.setUint16(0,Q,!1),[yA[0],yA[1]]),io=Q=>(cB.setInt16(0,Q,!1),[yA[0],yA[1]]),Ki=Q=>(cB.setUint32(0,Q,!1),[yA[1],yA[2],yA[3]]),l=Q=>(cB.setUint32(0,Q,!1),[yA[0],yA[1],yA[2],yA[3]]),Do=Q=>(cB.setInt32(0,Q,!1),[yA[0],yA[1],yA[2],yA[3]]),oQ=Q=>(cB.setUint32(0,Math.floor(Q/2**32),!1),cB.setUint32(4,Q,!1),[yA[0],yA[1],yA[2],yA[3],yA[4],yA[5],yA[6],yA[7]]),xE=Q=>(cB.setInt16(0,2**8*Q,!1),[yA[0],yA[1]]),yB=Q=>(cB.setInt32(0,2**16*Q,!1),[yA[0],yA[1],yA[2],yA[3]]),IE=Q=>(cB.setInt32(0,2**30*Q,!1),[yA[0],yA[1],yA[2],yA[3]]),$A=(Q,I=!1)=>{let C=Array(Q.length).fill(null).map((y,D)=>Q.charCodeAt(D));return I&&C.push(0),C},hg=Q=>Q&&Q[Q.length-1],bE=Q=>{let I;for(let C of Q)(!I||C.presentationTimestamp>I.presentationTimestamp)&&(I=C);return I},FB=(Q,I,C=!0)=>{let y=Q*I;return C?Math.round(y):y},fi=Q=>{let I=Q*(Math.PI/180),C=Math.cos(I),y=Math.sin(I);return[C,y,0,-y,C,0,0,0,1]},ui=fi(0),pi=Q=>[yB(Q[0]),yB(Q[1]),IE(Q[2]),yB(Q[3]),yB(Q[4]),IE(Q[5]),yB(Q[6]),yB(Q[7]),IE(Q[8])],HI=Q=>!Q||typeof Q!="object"?Q:Array.isArray(Q)?Q.map(HI):Object.fromEntries(Object.entries(Q).map(([I,C])=>[I,HI(C)])),vQ=Q=>Q>=0&&Q<2**32,kA=(Q,I,C)=>({type:Q,contents:I&&new Uint8Array(I.flat(10)),children:C}),hA=(Q,I,C,y,D)=>kA(Q,[SA(I),Ki(C),y??[]],D),oo=Q=>{let I=512;return Q.fragmented?kA("ftyp",[$A("iso5"),l(I),$A("iso5"),$A("iso6"),$A("mp41")]):kA("ftyp",[$A("isom"),l(I),$A("isom"),Q.holdsAvc?$A("avc1"):[],$A("mp41")])},yE=Q=>({type:"mdat",largeSize:Q}),yo=Q=>({type:"free",size:Q}),Bg=(Q,I,C=!1)=>kA("moov",null,[so(I,Q),...Q.map(y=>Fo(y,I)),C?bo(Q):null]),so=(Q,I)=>{let C=FB(Math.max(0,...I.filter(N=>N.samples.length>0).map(N=>{const G=bE(N.samples);return G.presentationTimestamp+G.duration})),cE),y=Math.max(...I.map(N=>N.id))+1,D=!vQ(Q)||!vQ(C),U=D?oQ:l;return hA("mvhd",+D,0,[U(Q),U(Q),l(cE),U(C),yB(1),xE(1),Array(10).fill(0),pi(ui),Array(24).fill(0),l(y)])},Fo=(Q,I)=>kA("trak",null,[co(Q,I),Uo(Q,I)]),co=(Q,I)=>{let C=bE(Q.samples),y=FB(C?C.presentationTimestamp+C.duration:0,cE),D=!vQ(I)||!vQ(y),U=D?oQ:l,N;return Q.info.type==="video"?N=typeof Q.info.rotation=="number"?fi(Q.info.rotation):Q.info.rotation:N=ui,hA("tkhd",+D,3,[U(I),U(I),l(Q.id),l(0),U(y),Array(8).fill(0),GA(0),GA(0),xE(Q.info.type==="audio"?1:0),GA(0),pi(N),yB(Q.info.type==="video"?Q.info.width:0),yB(Q.info.type==="video"?Q.info.height:0)])},Uo=(Q,I)=>kA("mdia",null,[wo(Q,I),No(Q.info.type==="video"?"vide":"soun"),Ho(Q)]),wo=(Q,I)=>{let C=bE(Q.samples),y=FB(C?C.presentationTimestamp+C.duration:0,Q.timescale),D=!vQ(I)||!vQ(y),U=D?oQ:l;return hA("mdhd",+D,0,[U(I),U(I),l(Q.timescale),U(y),GA(21956),GA(0)])},No=Q=>hA("hdlr",0,0,[$A("mhlr"),$A(Q),l(0),l(0),l(0),$A("mp4-muxer-hdlr",!0)]),Ho=Q=>kA("minf",null,[Q.info.type==="video"?Go():to(),ao(),eo(Q)]),Go=()=>hA("vmhd",0,1,[GA(0),GA(0),GA(0),GA(0)]),to=()=>hA("smhd",0,0,[GA(0),GA(0)]),ao=()=>kA("dinf",null,[ho()]),ho=()=>hA("dref",0,0,[l(1)],[Yo()]),Yo=()=>hA("url ",0,1),eo=Q=>{const I=Q.compositionTimeOffsetTable.length>1||Q.compositionTimeOffsetTable.some(C=>C.sampleCompositionTimeOffset!==0);return kA("stbl",null,[Lo(Q),Vo(Q),Ko(Q),fo(Q),uo(Q),po(Q),I?xo(Q):null])},Lo=Q=>hA("stsd",0,0,[l(1)],[Q.info.type==="video"?Ro(To[Q.info.codec],Q):Mo(_o[Q.info.codec],Q)]),Ro=(Q,I)=>kA(Q,[Array(6).fill(0),GA(1),GA(0),GA(0),Array(12).fill(0),GA(I.info.width),GA(I.info.height),l(4718592),l(4718592),l(0),GA(1),Array(32).fill(0),GA(24),io(65535)],[Po[I.info.codec](I)]),no=Q=>Q.info.decoderConfig&&kA("avcC",[...new Uint8Array(Q.info.decoderConfig.description)]),ko=Q=>Q.info.decoderConfig&&kA("hvcC",[...new Uint8Array(Q.info.decoderConfig.description)]),So=Q=>{if(!Q.info.decoderConfig)return null;let I=Q.info.decoderConfig;if(!I.colorSpace)throw new Error("'colorSpace' is required in the decoder config for VP9.");let C=I.codec.split("."),y=Number(C[1]),D=Number(C[2]),G=(Number(C[3])<<4)+(0<<1)+Number(I.colorSpace.fullRange);return hA("vpcC",1,0,[SA(y),SA(D),SA(G),SA(2),SA(2),SA(2),GA(0)])},ro=()=>{let C=(1<<7)+1;return kA("av1C",[C,0,0,0])},Mo=(Q,I)=>kA(Q,[Array(6).fill(0),GA(1),GA(0),GA(0),l(0),GA(I.info.numberOfChannels),GA(16),GA(0),GA(0),yB(I.info.sampleRate)],[$o[I.info.codec](I)]),Jo=Q=>{let I=new Uint8Array(Q.info.decoderConfig.description);return hA("esds",0,0,[l(58753152),SA(32+I.byteLength),GA(1),SA(0),l(75530368),SA(18+I.byteLength),SA(64),SA(21),Ki(0),l(130071),l(130071),l(92307584),SA(I.byteLength),...I,l(109084800),SA(1),SA(2)])},lo=Q=>kA("dOps",[SA(0),SA(Q.info.numberOfChannels),GA(3840),l(Q.info.sampleRate),xE(0),SA(0)]),Vo=Q=>hA("stts",0,0,[l(Q.timeToSampleTable.length),Q.timeToSampleTable.map(I=>[l(I.sampleCount),l(I.sampleDelta)])]),Ko=Q=>{if(Q.samples.every(C=>C.type==="key"))return null;let I=[...Q.samples.entries()].filter(([,C])=>C.type==="key");return hA("stss",0,0,[l(I.length),I.map(([C])=>l(C+1))])},fo=Q=>hA("stsc",0,0,[l(Q.compactlyCodedChunkTable.length),Q.compactlyCodedChunkTable.map(I=>[l(I.firstChunk),l(I.samplesPerChunk),l(1)])]),uo=Q=>hA("stsz",0,0,[l(0),l(Q.samples.length),Q.samples.map(I=>l(I.size))]),po=Q=>Q.finalizedChunks.length>0&&hg(Q.finalizedChunks).offset>=2**32?hA("co64",0,0,[l(Q.finalizedChunks.length),Q.finalizedChunks.map(I=>oQ(I.offset))]):hA("stco",0,0,[l(Q.finalizedChunks.length),Q.finalizedChunks.map(I=>l(I.offset))]),xo=Q=>hA("ctts",0,0,[l(Q.compositionTimeOffsetTable.length),Q.compositionTimeOffsetTable.map(I=>[l(I.sampleCount),l(I.sampleCompositionTimeOffset)])]),bo=Q=>kA("mvex",null,Q.map(mo)),mo=Q=>hA("trex",0,0,[l(Q.id),l(1),l(0),l(0),l(0)]),ei=(Q,I)=>kA("moof",null,[Zo(Q),...I.map(vo)]),Zo=Q=>hA("mfhd",0,0,[l(Q)]),xi=Q=>{let I=0,C=0,y=0,D=0,U=Q.type==="delta";return C|=+U,U?I|=1:I|=2,I<<24|C<<16|y<<8|D},vo=Q=>kA("traf",null,[qo(Q),Oo(Q),Wo(Q)]),qo=Q=>{let I=0;I|=8,I|=16,I|=32,I|=131072;let C=Q.currentChunk.samples[1]??Q.currentChunk.samples[0],y={duration:C.timescaleUnitsToNextSample,size:C.size,flags:xi(C)};return hA("tfhd",0,I,[l(Q.id),l(y.duration),l(y.size),l(y.flags)])},Oo=Q=>hA("tfdt",1,0,[oQ(FB(Q.currentChunk.startTimestamp,Q.timescale))]),Wo=Q=>{let I=Q.currentChunk.samples.map(x=>x.timescaleUnitsToNextSample),C=Q.currentChunk.samples.map(x=>x.size),y=Q.currentChunk.samples.map(xi),D=Q.currentChunk.samples.map(x=>FB(x.presentationTimestamp-x.decodeTimestamp,Q.timescale)),U=new Set(I),N=new Set(C),G=new Set(y),s=new Set(D),R=G.size===2&&y[0]!==y[1],n=U.size>1,e=N.size>1,u=!R&&G.size>1,v=s.size>1||[...s].some(x=>x!==0),K=0;return K|=1,K|=4*+R,K|=256*+n,K|=512*+e,K|=1024*+u,K|=2048*+v,hA("trun",1,K,[l(Q.currentChunk.samples.length),l(Q.currentChunk.offset-Q.currentChunk.moofOffset||0),R?l(y[0]):[],Q.currentChunk.samples.map((x,J)=>[n?l(I[J]):[],e?l(C[J]):[],u?l(y[J]):[],v?Do(D[J]):[]])])},Xo=Q=>kA("mfra",null,[...Q.map(jo),zo()]),jo=(Q,I)=>hA("tfra",1,0,[l(Q.id),l(63),l(Q.finalizedChunks.length),Q.finalizedChunks.map(y=>[oQ(FB(y.startTimestamp,Q.timescale)),oQ(y.moofOffset),l(I+1),l(1),l(1)])]),zo=()=>hA("mfro",0,0,[l(0)]),To={avc:"avc1",hevc:"hvc1",vp9:"vp09",av1:"av01"},Po={avc:no,hevc:ko,vp9:So,av1:ro},_o={aac:"mp4a",opus:"Opus"},$o={aac:Jo,opus:lo},bi=class{constructor(){this.buffer=null}},mE=class{constructor(I){this.options=I}},mi=class{constructor(I,C){this.stream=I,this.options=C}},WB,nQ,ZE=class{constructor(){this.pos=0,BA(this,WB,new Uint8Array(8)),BA(this,nQ,new DataView(H(this,WB).buffer)),this.offsets=new WeakMap}seek(I){this.pos=I}writeU32(I){H(this,nQ).setUint32(0,I,!1),this.write(H(this,WB).subarray(0,4))}writeU64(I){H(this,nQ).setUint32(0,Math.floor(I/2**32),!1),H(this,nQ).setUint32(4,I,!1),this.write(H(this,WB).subarray(0,8))}writeAscii(I){for(let C=0;C<I.length;C++)H(this,nQ).setUint8(C%8,I.charCodeAt(C)),C%8===7&&this.write(H(this,WB));I.length%8!==0&&this.write(H(this,WB).subarray(0,I.length%8))}writeBox(I){if(this.offsets.set(I,this.pos),I.contents&&!I.children)this.writeBoxHeader(I,I.size??I.contents.byteLength+8),this.write(I.contents);else{let C=this.pos;if(this.writeBoxHeader(I,0),I.contents&&this.write(I.contents),I.children)for(let U of I.children)U&&this.writeBox(U);let y=this.pos,D=I.size??y-C;this.seek(C),this.writeBoxHeader(I,D),this.seek(y)}}writeBoxHeader(I,C){this.writeU32(I.largeSize?1:C),this.writeAscii(I.type),I.largeSize&&this.writeU64(C)}measureBoxHeader(I){return 8+(I.largeSize?8:0)}patchBox(I){let C=this.pos;this.seek(this.offsets.get(I)),this.writeBox(I),this.seek(C)}measureBox(I){if(I.contents&&!I.children)return this.measureBoxHeader(I)+I.contents.byteLength;{let C=this.measureBoxHeader(I);if(I.contents&&(C+=I.contents.byteLength),I.children)for(let y of I.children)y&&(C+=this.measureBox(y));return C}}};WB=new WeakMap;nQ=new WeakMap;var Qg,CQ,kI,FI,Ig,sE,Ay=class extends ZE{constructor(I){super(),BA(this,Ig),BA(this,Qg,void 0),BA(this,CQ,new ArrayBuffer(2**16)),BA(this,kI,new Uint8Array(H(this,CQ))),BA(this,FI,0),rA(this,Qg,I)}write(I){gA(this,Ig,sE).call(this,this.pos+I.byteLength),H(this,kI).set(I,this.pos),this.pos+=I.byteLength,rA(this,FI,Math.max(H(this,FI),this.pos))}finalize(){gA(this,Ig,sE).call(this,this.pos),H(this,Qg).buffer=H(this,CQ).slice(0,Math.max(H(this,FI),this.pos))}};Qg=new WeakMap;CQ=new WeakMap;kI=new WeakMap;FI=new WeakMap;Ig=new WeakSet;sE=function(Q){let I=H(this,CQ).byteLength;for(;I<Q;)I*=2;if(I===H(this,CQ).byteLength)return;let C=new ArrayBuffer(I),y=new Uint8Array(C);y.set(H(this,kI),0),rA(this,CQ,C),rA(this,kI,y)};var gg,XB,Zi=class extends ZE{constructor(I){super(),BA(this,gg,void 0),BA(this,XB,[]),rA(this,gg,I)}write(I){H(this,XB).push({data:I.slice(),start:this.pos}),this.pos+=I.byteLength}flush(){var y,D;if(H(this,XB).length===0)return;let I=[],C=[...H(this,XB)].sort((U,N)=>U.start-N.start);I.push({start:C[0].start,size:C[0].data.byteLength});for(let U=1;U<C.length;U++){let N=I[I.length-1],G=C[U];G.start<=N.start+N.size?N.size=Math.max(N.size,G.start+G.data.byteLength-N.start):I.push({start:G.start,size:G.data.byteLength})}for(let U of I){U.data=new Uint8Array(U.size);for(let N of H(this,XB))U.start<=N.start&&N.start<U.start+U.size&&U.data.set(N.data,N.start-U.start);(D=(y=H(this,gg).options).onData)==null||D.call(y,U.data,U.start)}H(this,XB).length=0}finalize(){}};gg=new WeakMap;XB=new WeakMap;var By=2**24,Qy=2,Yg,AB,OA,eg,FE,vE,vi,qE,qi,GI,Lg,Oi=class extends ZE{constructor(I){var C;if(super(),BA(this,eg),BA(this,vE),BA(this,qE),BA(this,GI),BA(this,Yg,void 0),BA(this,AB,void 0),BA(this,OA,[]),rA(this,Yg,I),rA(this,AB,((C=I.options)==null?void 0:C.chunkSize)??By),!Number.isInteger(H(this,AB))||H(this,AB)<2**10)throw new Error("Invalid StreamTarget options: chunkSize must be an integer not smaller than 1024.")}write(I){gA(this,eg,FE).call(this,I,this.pos),gA(this,GI,Lg).call(this),this.pos+=I.byteLength}finalize(){gA(this,GI,Lg).call(this,!0)}};Yg=new WeakMap;AB=new WeakMap;OA=new WeakMap;eg=new WeakSet;FE=function(Q,I){let C=H(this,OA).findIndex(G=>G.start<=I&&I<G.start+H(this,AB));C===-1&&(C=gA(this,qE,qi).call(this,I));let y=H(this,OA)[C],D=I-y.start,U=Q.subarray(0,Math.min(H(this,AB)-D,Q.byteLength));y.data.set(U,D);let N={start:D,end:D+U.byteLength};if(gA(this,vE,vi).call(this,y,N),y.written[0].start===0&&y.written[0].end===H(this,AB)&&(y.shouldFlush=!0),H(this,OA).length>Qy){for(let G=0;G<H(this,OA).length-1;G++)H(this,OA)[G].shouldFlush=!0;gA(this,GI,Lg).call(this)}U.byteLength<Q.byteLength&&gA(this,eg,FE).call(this,Q.subarray(U.byteLength),I+U.byteLength)};vE=new WeakSet;vi=function(Q,I){let C=0,y=Q.written.length-1,D=-1;for(;C<=y;){let U=Math.floor(C+(y-C+1)/2);Q.written[U].start<=I.start?(C=U+1,D=U):y=U-1}for(Q.written.splice(D+1,0,I),(D===-1||Q.written[D].end<I.start)&&D++;D<Q.written.length-1&&Q.written[D].end>=Q.written[D+1].start;)Q.written[D].end=Math.max(Q.written[D].end,Q.written[D+1].end),Q.written.splice(D+1,1)};qE=new WeakSet;qi=function(Q){let C={start:Math.floor(Q/H(this,AB))*H(this,AB),data:new Uint8Array(H(this,AB)),written:[],shouldFlush:!1};return H(this,OA).push(C),H(this,OA).sort((y,D)=>y.start-D.start),H(this,OA).indexOf(C)};GI=new WeakSet;Lg=function(Q=!1){var I,C;for(let y=0;y<H(this,OA).length;y++){let D=H(this,OA)[y];if(!(!D.shouldFlush&&!Q)){for(let U of D.written)(C=(I=H(this,Yg).options).onData)==null||C.call(I,D.data.subarray(U.start,U.end),D.start+U.start);H(this,OA).splice(y--,1)}}};var Iy=class extends Oi{constructor(I){var C;super(new mE({onData:(y,D)=>I.stream.write({type:"write",data:y,position:D}),chunkSize:(C=I.options)==null?void 0:C.chunkSize}))}},cE=1e3,gy=["avc","hevc","vp9","av1"],Ey=["aac","opus"],Cy=2082844800,iy=["strict","offset","cross-track-offset"],b,X,Rg,vA,dA,lA,rQ,fQ,OE,jB,zB,tI,UE,Wi,wE,Xi,WE,ji,NE,zi,XE,Ti,Eg,HE,CB,GB,jE,Pi,aI,ng,kg,zE,qQ,VI,Cg,GE,Dy=class{constructor(I){var C;if(BA(this,UE),BA(this,wE),BA(this,WE),BA(this,NE),BA(this,XE),BA(this,Eg),BA(this,CB),BA(this,jE),BA(this,aI),BA(this,kg),BA(this,qQ),BA(this,Cg),BA(this,b,void 0),BA(this,X,void 0),BA(this,Rg,void 0),BA(this,vA,void 0),BA(this,dA,null),BA(this,lA,null),BA(this,rQ,Math.floor(Date.now()/1e3)+Cy),BA(this,fQ,[]),BA(this,OE,1),BA(this,jB,[]),BA(this,zB,[]),BA(this,tI,!1),gA(this,UE,Wi).call(this,I),I.video=HI(I.video),I.audio=HI(I.audio),I.fastStart=HI(I.fastStart),this.target=I.target,rA(this,b,{firstTimestampBehavior:"strict",...I}),I.target instanceof bi)rA(this,X,new Ay(I.target));else if(I.target instanceof mE)rA(this,X,(C=I.target.options)!=null&&C.chunked?new Oi(I.target):new Zi(I.target));else if(I.target instanceof mi)rA(this,X,new Iy(I.target));else throw new Error(`Invalid target: ${I.target}`);gA(this,NE,zi).call(this),gA(this,wE,Xi).call(this)}addVideoChunk(I,C,y,D){let U=new Uint8Array(I.byteLength);I.copyTo(U),this.addVideoChunkRaw(U,I.type,y??I.timestamp,I.duration,C,D)}addVideoChunkRaw(I,C,y,D,U,N){if(gA(this,Cg,GE).call(this),!H(this,b).video)throw new Error("No video track declared.");if(typeof H(this,b).fastStart=="object"&&H(this,dA).samples.length===H(this,b).fastStart.expectedVideoChunks)throw new Error(`Cannot add more video chunks than specified in 'fastStart' (${H(this,b).fastStart.expectedVideoChunks}).`);let G=gA(this,Eg,HE).call(this,H(this,dA),I,C,y,D,U,N);if(H(this,b).fastStart==="fragmented"&&H(this,lA)){for(;H(this,zB).length>0&&H(this,zB)[0].decodeTimestamp<=G.decodeTimestamp;){let s=H(this,zB).shift();gA(this,CB,GB).call(this,H(this,lA),s)}G.decodeTimestamp<=H(this,lA).lastDecodeTimestamp?gA(this,CB,GB).call(this,H(this,dA),G):H(this,jB).push(G)}else gA(this,CB,GB).call(this,H(this,dA),G)}addAudioChunk(I,C,y){let D=new Uint8Array(I.byteLength);I.copyTo(D),this.addAudioChunkRaw(D,I.type,y??I.timestamp,I.duration,C)}addAudioChunkRaw(I,C,y,D,U){if(gA(this,Cg,GE).call(this),!H(this,b).audio)throw new Error("No audio track declared.");if(typeof H(this,b).fastStart=="object"&&H(this,lA).samples.length===H(this,b).fastStart.expectedAudioChunks)throw new Error(`Cannot add more audio chunks than specified in 'fastStart' (${H(this,b).fastStart.expectedAudioChunks}).`);let N=gA(this,Eg,HE).call(this,H(this,lA),I,C,y,D,U);if(H(this,b).fastStart==="fragmented"&&H(this,dA)){for(;H(this,jB).length>0&&H(this,jB)[0].decodeTimestamp<=N.decodeTimestamp;){let G=H(this,jB).shift();gA(this,CB,GB).call(this,H(this,dA),G)}N.decodeTimestamp<=H(this,dA).lastDecodeTimestamp?gA(this,CB,GB).call(this,H(this,lA),N):H(this,zB).push(N)}else gA(this,CB,GB).call(this,H(this,lA),N)}finalize(){if(H(this,tI))throw new Error("Cannot finalize a muxer more than once.");if(H(this,b).fastStart==="fragmented"){for(let C of H(this,jB))gA(this,CB,GB).call(this,H(this,dA),C);for(let C of H(this,zB))gA(this,CB,GB).call(this,H(this,lA),C);gA(this,kg,zE).call(this,!1)}else H(this,dA)&&gA(this,aI,ng).call(this,H(this,dA)),H(this,lA)&&gA(this,aI,ng).call(this,H(this,lA));let I=[H(this,dA),H(this,lA)].filter(Boolean);if(H(this,b).fastStart==="in-memory"){let C;for(let D=0;D<2;D++){let U=Bg(I,H(this,rQ)),N=H(this,X).measureBox(U);C=H(this,X).measureBox(H(this,vA));let G=H(this,X).pos+N+C;for(let s of H(this,fQ)){s.offset=G;for(let{data:R}of s.samples)G+=R.byteLength,C+=R.byteLength}if(G<2**32)break;C>=2**32&&(H(this,vA).largeSize=!0)}let y=Bg(I,H(this,rQ));H(this,X).writeBox(y),H(this,vA).size=C,H(this,X).writeBox(H(this,vA));for(let D of H(this,fQ))for(let U of D.samples)H(this,X).write(U.data),U.data=null}else if(H(this,b).fastStart==="fragmented"){let C=H(this,X).pos,y=Xo(I);H(this,X).writeBox(y);let D=H(this,X).pos-C;H(this,X).seek(H(this,X).pos-4),H(this,X).writeU32(D)}else{let C=H(this,X).offsets.get(H(this,vA)),y=H(this,X).pos-C;H(this,vA).size=y,H(this,vA).largeSize=y>=2**32,H(this,X).patchBox(H(this,vA));let D=Bg(I,H(this,rQ));if(typeof H(this,b).fastStart=="object"){H(this,X).seek(H(this,Rg)),H(this,X).writeBox(D);let U=C-H(this,X).pos;H(this,X).writeBox(yo(U))}else H(this,X).writeBox(D)}gA(this,qQ,VI).call(this),H(this,X).finalize(),rA(this,tI,!0)}};b=new WeakMap;X=new WeakMap;Rg=new WeakMap;vA=new WeakMap;dA=new WeakMap;lA=new WeakMap;rQ=new WeakMap;fQ=new WeakMap;OE=new WeakMap;jB=new WeakMap;zB=new WeakMap;tI=new WeakMap;UE=new WeakSet;Wi=function(Q){if(Q.video){if(!gy.includes(Q.video.codec))throw new Error(`Unsupported video codec: ${Q.video.codec}`);const I=Q.video.rotation;if(typeof I=="number"&&![0,90,180,270].includes(I))throw new Error(`Invalid video rotation: ${I}. Has to be 0, 90, 180 or 270.`);if(Array.isArray(I)&&(I.length!==9||I.some(C=>typeof C!="number")))throw new Error(`Invalid video transformation matrix: ${I.join()}`)}if(Q.audio&&!Ey.includes(Q.audio.codec))throw new Error(`Unsupported audio codec: ${Q.audio.codec}`);if(Q.firstTimestampBehavior&&!iy.includes(Q.firstTimestampBehavior))throw new Error(`Invalid first timestamp behavior: ${Q.firstTimestampBehavior}`);if(typeof Q.fastStart=="object"){if(Q.video&&Q.fastStart.expectedVideoChunks===void 0)throw new Error("'fastStart' is an object but is missing property 'expectedVideoChunks'.");if(Q.audio&&Q.fastStart.expectedAudioChunks===void 0)throw new Error("'fastStart' is an object but is missing property 'expectedAudioChunks'.")}else if(![!1,"in-memory","fragmented"].includes(Q.fastStart))throw new Error("'fastStart' option must be false, 'in-memory', 'fragmented' or an object.")};wE=new WeakSet;Xi=function(){var Q;if(H(this,X).writeBox(oo({holdsAvc:((Q=H(this,b).video)==null?void 0:Q.codec)==="avc",fragmented:H(this,b).fastStart==="fragmented"})),rA(this,Rg,H(this,X).pos),H(this,b).fastStart==="in-memory")rA(this,vA,yE(!1));else if(H(this,b).fastStart!=="fragmented"){if(typeof H(this,b).fastStart=="object"){let I=gA(this,WE,ji).call(this);H(this,X).seek(H(this,X).pos+I)}rA(this,vA,yE(!0)),H(this,X).writeBox(H(this,vA))}gA(this,qQ,VI).call(this)};WE=new WeakSet;ji=function(){if(typeof H(this,b).fastStart!="object")return;let Q=0,I=[H(this,b).fastStart.expectedVideoChunks,H(this,b).fastStart.expectedAudioChunks];for(let C of I)C&&(Q+=8*Math.ceil(2/3*C),Q+=4*C,Q+=12*Math.ceil(2/3*C),Q+=4*C,Q+=8*C);return Q+=4096,Q};NE=new WeakSet;zi=function(){if(H(this,b).video&&rA(this,dA,{id:1,info:{type:"video",codec:H(this,b).video.codec,width:H(this,b).video.width,height:H(this,b).video.height,rotation:H(this,b).video.rotation??0,decoderConfig:null},timescale:11520,samples:[],finalizedChunks:[],currentChunk:null,firstDecodeTimestamp:void 0,lastDecodeTimestamp:-1,timeToSampleTable:[],compositionTimeOffsetTable:[],lastTimescaleUnits:null,lastSample:null,compactlyCodedChunkTable:[]}),H(this,b).audio){let Q=gA(this,XE,Ti).call(this,2,H(this,b).audio.sampleRate,H(this,b).audio.numberOfChannels);rA(this,lA,{id:H(this,b).video?2:1,info:{type:"audio",codec:H(this,b).audio.codec,numberOfChannels:H(this,b).audio.numberOfChannels,sampleRate:H(this,b).audio.sampleRate,decoderConfig:{codec:H(this,b).audio.codec,description:Q,numberOfChannels:H(this,b).audio.numberOfChannels,sampleRate:H(this,b).audio.sampleRate}},timescale:H(this,b).audio.sampleRate,samples:[],finalizedChunks:[],currentChunk:null,firstDecodeTimestamp:void 0,lastDecodeTimestamp:-1,timeToSampleTable:[],compositionTimeOffsetTable:[],lastTimescaleUnits:null,lastSample:null,compactlyCodedChunkTable:[]})}};XE=new WeakSet;Ti=function(Q,I,C){let D=[96e3,88200,64e3,48e3,44100,32e3,24e3,22050,16e3,12e3,11025,8e3,7350].indexOf(I),U=C,N="";N+=Q.toString(2).padStart(5,"0"),N+=D.toString(2).padStart(4,"0"),D===15&&(N+=I.toString(2).padStart(24,"0")),N+=U.toString(2).padStart(4,"0");let G=Math.ceil(N.length/8)*8;N=N.padEnd(G,"0");let s=new Uint8Array(N.length/8);for(let R=0;R<N.length;R+=8)s[R/8]=parseInt(N.slice(R,R+8),2);return s};Eg=new WeakSet;HE=function(Q,I,C,y,D,U,N){let G=y/1e6,s=(y-(N??0))/1e6,R=D/1e6,n=gA(this,jE,Pi).call(this,G,s,Q);return G=n.presentationTimestamp,s=n.decodeTimestamp,U!=null&&U.decoderConfig&&(Q.info.decoderConfig===null?Q.info.decoderConfig=U.decoderConfig:Object.assign(Q.info.decoderConfig,U.decoderConfig)),{presentationTimestamp:G,decodeTimestamp:s,duration:R,data:I,size:I.byteLength,type:C,timescaleUnitsToNextSample:FB(R,Q.timescale)}};CB=new WeakSet;GB=function(Q,I){H(this,b).fastStart!=="fragmented"&&Q.samples.push(I);const C=FB(I.presentationTimestamp-I.decodeTimestamp,Q.timescale);if(Q.lastTimescaleUnits!==null){let D=FB(I.decodeTimestamp,Q.timescale,!1),U=Math.round(D-Q.lastTimescaleUnits);if(Q.lastTimescaleUnits+=U,Q.lastSample.timescaleUnitsToNextSample=U,H(this,b).fastStart!=="fragmented"){let N=hg(Q.timeToSampleTable);N.sampleCount===1?(N.sampleDelta=U,N.sampleCount++):N.sampleDelta===U?N.sampleCount++:(N.sampleCount--,Q.timeToSampleTable.push({sampleCount:2,sampleDelta:U}));const G=hg(Q.compositionTimeOffsetTable);G.sampleCompositionTimeOffset===C?G.sampleCount++:Q.compositionTimeOffsetTable.push({sampleCount:1,sampleCompositionTimeOffset:C})}}else Q.lastTimescaleUnits=0,H(this,b).fastStart!=="fragmented"&&(Q.timeToSampleTable.push({sampleCount:1,sampleDelta:FB(I.duration,Q.timescale)}),Q.compositionTimeOffsetTable.push({sampleCount:1,sampleCompositionTimeOffset:C}));Q.lastSample=I;let y=!1;if(!Q.currentChunk)y=!0;else{let D=I.presentationTimestamp-Q.currentChunk.startTimestamp;if(H(this,b).fastStart==="fragmented"){let U=H(this,dA)??H(this,lA);Q===U&&I.type==="key"&&D>=1&&(y=!0,gA(this,kg,zE).call(this))}else y=D>=.5}y&&(Q.currentChunk&&gA(this,aI,ng).call(this,Q),Q.currentChunk={startTimestamp:I.presentationTimestamp,samples:[]}),Q.currentChunk.samples.push(I)};jE=new WeakSet;Pi=function(Q,I,C){var N,G;const y=H(this,b).firstTimestampBehavior==="strict",D=C.lastDecodeTimestamp===-1;if(y&&D&&I!==0)throw new Error(`The first chunk for your media track must have a timestamp of 0 (received DTS=${I}).Non-zero first timestamps are often caused by directly piping frames or audio data from a MediaStreamTrack into the encoder. Their timestamps are typically relative to the age of thedocument, which is probably what you want.

If you want to offset all timestamps of a track such that the first one is zero, set firstTimestampBehavior: 'offset' in the options.
`);if(H(this,b).firstTimestampBehavior==="offset"||H(this,b).firstTimestampBehavior==="cross-track-offset"){C.firstDecodeTimestamp===void 0&&(C.firstDecodeTimestamp=I);let s;H(this,b).firstTimestampBehavior==="offset"?s=C.firstDecodeTimestamp:s=Math.min(((N=H(this,dA))==null?void 0:N.firstDecodeTimestamp)??1/0,((G=H(this,lA))==null?void 0:G.firstDecodeTimestamp)??1/0),I-=s,Q-=s}if(I<C.lastDecodeTimestamp)throw new Error(`Timestamps must be monotonically increasing (DTS went from ${C.lastDecodeTimestamp*1e6} to ${I*1e6}).`);return C.lastDecodeTimestamp=I,{presentationTimestamp:Q,decodeTimestamp:I}};aI=new WeakSet;ng=function(Q){if(H(this,b).fastStart==="fragmented")throw new Error("Can't finalize individual chunks 'fastStart' is set to 'fragmented'.");if(Q.currentChunk){if(Q.finalizedChunks.push(Q.currentChunk),H(this,fQ).push(Q.currentChunk),(Q.compactlyCodedChunkTable.length===0||hg(Q.compactlyCodedChunkTable).samplesPerChunk!==Q.currentChunk.samples.length)&&Q.compactlyCodedChunkTable.push({firstChunk:Q.finalizedChunks.length,samplesPerChunk:Q.currentChunk.samples.length}),H(this,b).fastStart==="in-memory"){Q.currentChunk.offset=0;return}Q.currentChunk.offset=H(this,X).pos;for(let I of Q.currentChunk.samples)H(this,X).write(I.data),I.data=null;gA(this,qQ,VI).call(this)}};kg=new WeakSet;zE=function(Q=!0){if(H(this,b).fastStart!=="fragmented")throw new Error("Can't finalize a fragment unless 'fastStart' is set to 'fragmented'.");let I=[H(this,dA),H(this,lA)].filter(G=>G&&G.currentChunk);if(I.length===0)return;let C=Co(this,OE)._++;if(C===1){let G=Bg(I,H(this,rQ),!0);H(this,X).writeBox(G)}let y=H(this,X).pos,D=ei(C,I);H(this,X).writeBox(D);{let G=yE(!1),s=0;for(let n of I)for(let e of n.currentChunk.samples)s+=e.size;let R=H(this,X).measureBox(G)+s;R>=2**32&&(G.largeSize=!0,R=H(this,X).measureBox(G)+s),G.size=R,H(this,X).writeBox(G)}for(let G of I){G.currentChunk.offset=H(this,X).pos,G.currentChunk.moofOffset=y;for(let s of G.currentChunk.samples)H(this,X).write(s.data),s.data=null}let U=H(this,X).pos;H(this,X).seek(H(this,X).offsets.get(D));let N=ei(C,I);H(this,X).writeBox(N),H(this,X).seek(U);for(let G of I)G.finalizedChunks.push(G.currentChunk),H(this,fQ).push(G.currentChunk),G.currentChunk=null;Q&&gA(this,qQ,VI).call(this)};qQ=new WeakSet;VI=function(){H(this,X)instanceof Zi&&H(this,X).flush()};Cg=new WeakSet;GE=function(){if(H(this,tI))throw new Error("Cannot add new video or audio chunks after the file has been finalized.")};const oy=Object.freeze(Object.defineProperty({__proto__:null,ArrayBufferTarget:bi,FileSystemWritableFileStreamTarget:mi,Muxer:Dy,StreamTarget:mE},Symbol.toStringTag,{value:"Module"}));var yy=Object.defineProperty,Li=Object.getOwnPropertySymbols,sy=Object.prototype.hasOwnProperty,Fy=Object.prototype.propertyIsEnumerable,pA=Math.pow,Ri=(Q,I,C)=>I in Q?yy(Q,I,{enumerable:!0,configurable:!0,writable:!0,value:C}):Q[I]=C,cy=(Q,I)=>{for(var C in I||(I={}))sy.call(I,C)&&Ri(Q,C,I[C]);if(Li)for(var C of Li(I))Fy.call(I,C)&&Ri(Q,C,I[C]);return Q},TE=(Q,I,C)=>{if(!I.has(Q))throw TypeError("Cannot "+C)},c=(Q,I,C)=>(TE(Q,I,"read from private field"),C?C.call(Q):I.get(Q)),k=(Q,I,C)=>{if(I.has(Q))throw TypeError("Cannot add the same private member more than once");I instanceof WeakSet?I.add(Q):I.set(Q,C)},W=(Q,I,C,y)=>(TE(Q,I,"write to private field"),I.set(Q,C),C),V=(Q,I,C)=>(TE(Q,I,"access private method"),C),_i=class{constructor(Q){this.value=Q}},PE=class{constructor(Q){this.value=Q}},$i=Q=>Q<256?1:Q<65536?2:Q<1<<24?3:Q<pA(2,32)?4:Q<pA(2,40)?5:6,Uy=Q=>{if(Q<127)return 1;if(Q<16383)return 2;if(Q<(1<<21)-1)return 3;if(Q<(1<<28)-1)return 4;if(Q<pA(2,35)-1)return 5;if(Q<pA(2,42)-1)return 6;throw new Error("EBML VINT size not supported "+Q)},RQ=(Q,I,C)=>{let y=0;for(let D=I;D<C;D++){let U=Math.floor(D/8),N=Q[U],G=7-(D&7),s=(N&1<<G)>>G;y<<=1,y|=s}return y},wy=(Q,I,C,y)=>{for(let D=I;D<C;D++){let U=Math.floor(D/8),N=Q[U],G=7-(D&7);N&=~(1<<G),N|=(y&1<<C-D-1)>>C-D-1<<G,Q[U]=N}},AD=class{constructor(){this.buffer=null}},_E=class{constructor(Q){this.options=Q}},BD=class{constructor(Q,I){this.stream=Q,this.options=I}},pB,NA,tE,QD,aE,ID,hE,gD,ig,YE,eE,ED,CD=class{constructor(){k(this,tE),k(this,aE),k(this,hE),k(this,ig),k(this,eE),this.pos=0,k(this,pB,new Uint8Array(8)),k(this,NA,new DataView(c(this,pB).buffer)),this.offsets=new WeakMap,this.dataOffsets=new WeakMap}seek(Q){this.pos=Q}writeEBMLVarInt(Q,I=Uy(Q)){let C=0;switch(I){case 1:c(this,NA).setUint8(C++,128|Q);break;case 2:c(this,NA).setUint8(C++,64|Q>>8),c(this,NA).setUint8(C++,Q);break;case 3:c(this,NA).setUint8(C++,32|Q>>16),c(this,NA).setUint8(C++,Q>>8),c(this,NA).setUint8(C++,Q);break;case 4:c(this,NA).setUint8(C++,16|Q>>24),c(this,NA).setUint8(C++,Q>>16),c(this,NA).setUint8(C++,Q>>8),c(this,NA).setUint8(C++,Q);break;case 5:c(this,NA).setUint8(C++,8|Q/pA(2,32)&7),c(this,NA).setUint8(C++,Q>>24),c(this,NA).setUint8(C++,Q>>16),c(this,NA).setUint8(C++,Q>>8),c(this,NA).setUint8(C++,Q);break;case 6:c(this,NA).setUint8(C++,4|Q/pA(2,40)&3),c(this,NA).setUint8(C++,Q/pA(2,32)|0),c(this,NA).setUint8(C++,Q>>24),c(this,NA).setUint8(C++,Q>>16),c(this,NA).setUint8(C++,Q>>8),c(this,NA).setUint8(C++,Q);break;default:throw new Error("Bad EBML VINT size "+I)}this.write(c(this,pB).subarray(0,C))}writeEBML(Q){var I,C;if(Q!==null)if(Q instanceof Uint8Array)this.write(Q);else if(Array.isArray(Q))for(let y of Q)this.writeEBML(y);else if(this.offsets.set(Q,this.pos),V(this,ig,YE).call(this,Q.id),Array.isArray(Q.data)){let y=this.pos,D=Q.size===-1?1:(I=Q.size)!=null?I:4;Q.size===-1?V(this,tE,QD).call(this,255):this.seek(this.pos+D);let U=this.pos;if(this.dataOffsets.set(Q,U),this.writeEBML(Q.data),Q.size!==-1){let N=this.pos-U,G=this.pos;this.seek(y),this.writeEBMLVarInt(N,D),this.seek(G)}}else if(typeof Q.data=="number"){let y=(C=Q.size)!=null?C:$i(Q.data);this.writeEBMLVarInt(y),V(this,ig,YE).call(this,Q.data,y)}else typeof Q.data=="string"?(this.writeEBMLVarInt(Q.data.length),V(this,eE,ED).call(this,Q.data)):Q.data instanceof Uint8Array?(this.writeEBMLVarInt(Q.data.byteLength,Q.size),this.write(Q.data)):Q.data instanceof _i?(this.writeEBMLVarInt(4),V(this,aE,ID).call(this,Q.data.value)):Q.data instanceof PE&&(this.writeEBMLVarInt(8),V(this,hE,gD).call(this,Q.data.value))}};pB=new WeakMap;NA=new WeakMap;tE=new WeakSet;QD=function(Q){c(this,NA).setUint8(0,Q),this.write(c(this,pB).subarray(0,1))};aE=new WeakSet;ID=function(Q){c(this,NA).setFloat32(0,Q,!1),this.write(c(this,pB).subarray(0,4))};hE=new WeakSet;gD=function(Q){c(this,NA).setFloat64(0,Q,!1),this.write(c(this,pB))};ig=new WeakSet;YE=function(Q,I=$i(Q)){let C=0;switch(I){case 6:c(this,NA).setUint8(C++,Q/pA(2,40)|0);case 5:c(this,NA).setUint8(C++,Q/pA(2,32)|0);case 4:c(this,NA).setUint8(C++,Q>>24);case 3:c(this,NA).setUint8(C++,Q>>16);case 2:c(this,NA).setUint8(C++,Q>>8);case 1:c(this,NA).setUint8(C++,Q);break;default:throw new Error("Bad UINT size "+I)}this.write(c(this,pB).subarray(0,C))};eE=new WeakSet;ED=function(Q){this.write(new Uint8Array(Q.split("").map(I=>I.charCodeAt(0))))};var Dg,iQ,SI,og,LE,Ny=class extends CD{constructor(Q){super(),k(this,og),k(this,Dg,void 0),k(this,iQ,new ArrayBuffer(pA(2,16))),k(this,SI,new Uint8Array(c(this,iQ))),W(this,Dg,Q)}write(Q){V(this,og,LE).call(this,this.pos+Q.byteLength),c(this,SI).set(Q,this.pos),this.pos+=Q.byteLength}finalize(){V(this,og,LE).call(this,this.pos),c(this,Dg).buffer=c(this,iQ).slice(0,this.pos)}};Dg=new WeakMap;iQ=new WeakMap;SI=new WeakMap;og=new WeakSet;LE=function(Q){let I=c(this,iQ).byteLength;for(;I<Q;)I*=2;if(I===c(this,iQ).byteLength)return;let C=new ArrayBuffer(I),y=new Uint8Array(C);y.set(c(this,SI),0),W(this,iQ,C),W(this,SI,y)};var kQ,iB,DB,TB,TQ=class extends CD{constructor(Q){super(),this.target=Q,k(this,kQ,!1),k(this,iB,void 0),k(this,DB,void 0),k(this,TB,void 0)}write(Q){if(!c(this,kQ))return;let I=this.pos;if(I<c(this,DB)){if(I+Q.byteLength<=c(this,DB))return;Q=Q.subarray(c(this,DB)-I),I=0}let C=I+Q.byteLength-c(this,DB),y=c(this,iB).byteLength;for(;y<C;)y*=2;if(y!==c(this,iB).byteLength){let D=new Uint8Array(y);D.set(c(this,iB),0),W(this,iB,D)}c(this,iB).set(Q,I-c(this,DB)),W(this,TB,Math.max(c(this,TB),I+Q.byteLength))}startTrackingWrites(){W(this,kQ,!0),W(this,iB,new Uint8Array(pA(2,10))),W(this,DB,this.pos),W(this,TB,this.pos)}getTrackedWrites(){if(!c(this,kQ))throw new Error("Can't get tracked writes since nothing was tracked.");let I={data:c(this,iB).subarray(0,c(this,TB)-c(this,DB)),start:c(this,DB),end:c(this,TB)};return W(this,iB,void 0),W(this,kQ,!1),I}};kQ=new WeakMap;iB=new WeakMap;DB=new WeakMap;TB=new WeakMap;var PB,yg,sg,iD=class extends TQ{constructor(Q,I){super(Q),k(this,PB,[]),k(this,yg,0),k(this,sg,void 0),W(this,sg,I)}write(Q){super.write(Q),c(this,PB).push({data:Q.slice(),start:this.pos}),this.pos+=Q.byteLength}flush(){var Q,I;if(c(this,PB).length===0)return;let C=[],y=[...c(this,PB)].sort((D,U)=>D.start-U.start);C.push({start:y[0].start,size:y[0].data.byteLength});for(let D=1;D<y.length;D++){let U=C[C.length-1],N=y[D];N.start<=U.start+U.size?U.size=Math.max(U.size,N.start+N.data.byteLength-U.start):C.push({start:N.start,size:N.data.byteLength})}for(let D of C){D.data=new Uint8Array(D.size);for(let U of c(this,PB))D.start<=U.start&&U.start<D.start+D.size&&D.data.set(U.data,U.start-D.start);if(c(this,sg)&&D.start<c(this,yg))throw new Error("Internal error: Monotonicity violation.");(I=(Q=this.target.options).onData)==null||I.call(Q,D.data,D.start),W(this,yg,D.start+D.data.byteLength)}c(this,PB).length=0}finalize(){}};PB=new WeakMap;yg=new WeakMap;sg=new WeakMap;var Hy=pA(2,24),Gy=2,BB,WA,Sg,rg,Mg,RE,$E,DD,AC,oD,hI,Jg,yD=class extends TQ{constructor(Q,I){var C,y;if(super(Q),k(this,Mg),k(this,$E),k(this,AC),k(this,hI),k(this,BB,void 0),k(this,WA,[]),k(this,Sg,0),k(this,rg,void 0),W(this,BB,(y=(C=Q.options)==null?void 0:C.chunkSize)!=null?y:Hy),W(this,rg,I),!Number.isInteger(c(this,BB))||c(this,BB)<pA(2,10))throw new Error("Invalid StreamTarget options: chunkSize must be an integer not smaller than 1024.")}write(Q){super.write(Q),V(this,Mg,RE).call(this,Q,this.pos),V(this,hI,Jg).call(this),this.pos+=Q.byteLength}finalize(){V(this,hI,Jg).call(this,!0)}};BB=new WeakMap;WA=new WeakMap;Sg=new WeakMap;rg=new WeakMap;Mg=new WeakSet;RE=function(Q,I){let C=c(this,WA).findIndex(G=>G.start<=I&&I<G.start+c(this,BB));C===-1&&(C=V(this,AC,oD).call(this,I));let y=c(this,WA)[C],D=I-y.start,U=Q.subarray(0,Math.min(c(this,BB)-D,Q.byteLength));y.data.set(U,D);let N={start:D,end:D+U.byteLength};if(V(this,$E,DD).call(this,y,N),y.written[0].start===0&&y.written[0].end===c(this,BB)&&(y.shouldFlush=!0),c(this,WA).length>Gy){for(let G=0;G<c(this,WA).length-1;G++)c(this,WA)[G].shouldFlush=!0;V(this,hI,Jg).call(this)}U.byteLength<Q.byteLength&&V(this,Mg,RE).call(this,Q.subarray(U.byteLength),I+U.byteLength)};$E=new WeakSet;DD=function(Q,I){let C=0,y=Q.written.length-1,D=-1;for(;C<=y;){let U=Math.floor(C+(y-C+1)/2);Q.written[U].start<=I.start?(C=U+1,D=U):y=U-1}for(Q.written.splice(D+1,0,I),(D===-1||Q.written[D].end<I.start)&&D++;D<Q.written.length-1&&Q.written[D].end>=Q.written[D+1].start;)Q.written[D].end=Math.max(Q.written[D].end,Q.written[D+1].end),Q.written.splice(D+1,1)};AC=new WeakSet;oD=function(Q){let C={start:Math.floor(Q/c(this,BB))*c(this,BB),data:new Uint8Array(c(this,BB)),written:[],shouldFlush:!1};return c(this,WA).push(C),c(this,WA).sort((y,D)=>y.start-D.start),c(this,WA).indexOf(C)};hI=new WeakSet;Jg=function(Q=!1){var I,C;for(let y=0;y<c(this,WA).length;y++){let D=c(this,WA)[y];if(!(!D.shouldFlush&&!Q)){for(let U of D.written){if(c(this,rg)&&D.start+U.start<c(this,Sg))throw new Error("Internal error: Monotonicity violation.");(C=(I=this.target.options).onData)==null||C.call(I,D.data.subarray(U.start,U.end),D.start+U.start),W(this,Sg,D.start+U.end)}c(this,WA).splice(y--,1)}}};var ty=class extends yD{constructor(Q,I){var C;super(new _E({onData:(y,D)=>Q.stream.write({type:"write",data:y,position:D}),chunked:!0,chunkSize:(C=Q.options)==null?void 0:C.chunkSize}),I)}},OQ=1,rI=2,dg=3,ay=1,hy=2,Yy=17,gE=pA(2,15),YI=pA(2,12),ni="https://github.com/Vanilagy/webm-muxer",sD=6,FD=5,ey=["strict","offset","permissive"],Z,f,MI,JI,aB,WQ,MQ,DQ,XQ,xB,uQ,pQ,YB,jQ,xQ,KB,fB,$B,eI,LI,bQ,mQ,lg,dI,RI,nE,cD,kE,UD,BC,wD,QC,ND,IC,HD,gC,GD,EC,tD,pg,CC,xg,iC,DC,aD,AQ,JQ,BQ,dQ,SE,hD,rE,YD,cI,Fg,UI,cg,oC,eD,oB,tB,ZQ,lI,nI,Vg,yC,LD,Kg,sC,wI,Ug,Ly=class{constructor(Q){k(this,nE),k(this,kE),k(this,BC),k(this,QC),k(this,IC),k(this,gC),k(this,EC),k(this,pg),k(this,xg),k(this,DC),k(this,AQ),k(this,BQ),k(this,SE),k(this,rE),k(this,cI),k(this,UI),k(this,oC),k(this,oB),k(this,ZQ),k(this,nI),k(this,yC),k(this,Kg),k(this,wI),k(this,Z,void 0),k(this,f,void 0),k(this,MI,void 0),k(this,JI,void 0),k(this,aB,void 0),k(this,WQ,void 0),k(this,MQ,void 0),k(this,DQ,void 0),k(this,XQ,void 0),k(this,xB,void 0),k(this,uQ,void 0),k(this,pQ,void 0),k(this,YB,void 0),k(this,jQ,void 0),k(this,xQ,0),k(this,KB,[]),k(this,fB,[]),k(this,$B,[]),k(this,eI,void 0),k(this,LI,void 0),k(this,bQ,-1),k(this,mQ,-1),k(this,lg,-1),k(this,dI,void 0),k(this,RI,!1);var I;V(this,nE,cD).call(this,Q),W(this,Z,cy({type:"webm",firstTimestampBehavior:"strict"},Q)),this.target=Q.target;let C=!!c(this,Z).streaming;if(Q.target instanceof AD)W(this,f,new Ny(Q.target));else if(Q.target instanceof _E)W(this,f,(I=Q.target.options)!=null&&I.chunked?new yD(Q.target,C):new iD(Q.target,C));else if(Q.target instanceof BD)W(this,f,new ty(Q.target,C));else throw new Error(`Invalid target: ${Q.target}`);V(this,kE,UD).call(this)}addVideoChunk(Q,I,C){let y=new Uint8Array(Q.byteLength);Q.copyTo(y),this.addVideoChunkRaw(y,Q.type,C??Q.timestamp,I)}addVideoChunkRaw(Q,I,C,y){if(V(this,wI,Ug).call(this),!c(this,Z).video)throw new Error("No video track declared.");c(this,eI)===void 0&&W(this,eI,C),y&&V(this,SE,hD).call(this,y);let D=V(this,UI,cg).call(this,Q,I,C,OQ);for(c(this,Z).video.codec==="V_VP9"&&V(this,rE,YD).call(this,D),W(this,bQ,D.timestamp);c(this,fB).length>0&&c(this,fB)[0].timestamp<=D.timestamp;){let U=c(this,fB).shift();V(this,oB,tB).call(this,U,!1)}!c(this,Z).audio||D.timestamp<=c(this,mQ)?V(this,oB,tB).call(this,D,!0):c(this,KB).push(D),V(this,cI,Fg).call(this),V(this,AQ,JQ).call(this)}addAudioChunk(Q,I,C){let y=new Uint8Array(Q.byteLength);Q.copyTo(y),this.addAudioChunkRaw(y,Q.type,C??Q.timestamp,I)}addAudioChunkRaw(Q,I,C,y){if(V(this,wI,Ug).call(this),!c(this,Z).audio)throw new Error("No audio track declared.");c(this,LI)===void 0&&W(this,LI,C),y!=null&&y.decoderConfig&&(c(this,Z).streaming?W(this,xB,V(this,ZQ,lI).call(this,y.decoderConfig.description)):V(this,nI,Vg).call(this,c(this,xB),y.decoderConfig.description));let D=V(this,UI,cg).call(this,Q,I,C,rI);for(W(this,mQ,D.timestamp);c(this,KB).length>0&&c(this,KB)[0].timestamp<=D.timestamp;){let U=c(this,KB).shift();V(this,oB,tB).call(this,U,!0)}!c(this,Z).video||D.timestamp<=c(this,bQ)?V(this,oB,tB).call(this,D,!c(this,Z).video):c(this,fB).push(D),V(this,cI,Fg).call(this),V(this,AQ,JQ).call(this)}addSubtitleChunk(Q,I,C){if(V(this,wI,Ug).call(this),!c(this,Z).subtitles)throw new Error("No subtitle track declared.");I!=null&&I.decoderConfig&&(c(this,Z).streaming?W(this,uQ,V(this,ZQ,lI).call(this,I.decoderConfig.description)):V(this,nI,Vg).call(this,c(this,uQ),I.decoderConfig.description));let y=V(this,UI,cg).call(this,Q.body,"key",C??Q.timestamp,dg,Q.duration,Q.additions);W(this,lg,y.timestamp),c(this,$B).push(y),V(this,cI,Fg).call(this),V(this,AQ,JQ).call(this)}finalize(){if(c(this,RI))throw new Error("Cannot finalize a muxer more than once.");for(;c(this,KB).length>0;)V(this,oB,tB).call(this,c(this,KB).shift(),!0);for(;c(this,fB).length>0;)V(this,oB,tB).call(this,c(this,fB).shift(),!0);for(;c(this,$B).length>0&&c(this,$B)[0].timestamp<=c(this,xQ);)V(this,oB,tB).call(this,c(this,$B).shift(),!1);if(c(this,Z).streaming||V(this,Kg,sC).call(this),c(this,f).writeEBML(c(this,pQ)),!c(this,Z).streaming){let Q=c(this,f).pos,I=c(this,f).pos-c(this,BQ,dQ);c(this,f).seek(c(this,f).offsets.get(c(this,MI))+4),c(this,f).writeEBMLVarInt(I,sD),c(this,MQ).data=new PE(c(this,xQ)),c(this,f).seek(c(this,f).offsets.get(c(this,MQ))),c(this,f).writeEBML(c(this,MQ)),c(this,aB).data[0].data[1].data=c(this,f).offsets.get(c(this,pQ))-c(this,BQ,dQ),c(this,aB).data[1].data[1].data=c(this,f).offsets.get(c(this,JI))-c(this,BQ,dQ),c(this,aB).data[2].data[1].data=c(this,f).offsets.get(c(this,WQ))-c(this,BQ,dQ),c(this,f).seek(c(this,f).offsets.get(c(this,aB))),c(this,f).writeEBML(c(this,aB)),c(this,f).seek(Q)}V(this,AQ,JQ).call(this),c(this,f).finalize(),W(this,RI,!0)}};Z=new WeakMap;f=new WeakMap;MI=new WeakMap;JI=new WeakMap;aB=new WeakMap;WQ=new WeakMap;MQ=new WeakMap;DQ=new WeakMap;XQ=new WeakMap;xB=new WeakMap;uQ=new WeakMap;pQ=new WeakMap;YB=new WeakMap;jQ=new WeakMap;xQ=new WeakMap;KB=new WeakMap;fB=new WeakMap;$B=new WeakMap;eI=new WeakMap;LI=new WeakMap;bQ=new WeakMap;mQ=new WeakMap;lg=new WeakMap;dI=new WeakMap;RI=new WeakMap;nE=new WeakSet;cD=function(Q){if(Q.type&&Q.type!=="webm"&&Q.type!=="matroska")throw new Error(`Invalid type: ${Q.type}`);if(Q.firstTimestampBehavior&&!ey.includes(Q.firstTimestampBehavior))throw new Error(`Invalid first timestamp behavior: ${Q.firstTimestampBehavior}`)};kE=new WeakSet;UD=function(){c(this,f)instanceof TQ&&c(this,f).target.options.onHeader&&c(this,f).startTrackingWrites(),V(this,BC,wD).call(this),c(this,Z).streaming||V(this,gC,GD).call(this),V(this,EC,tD).call(this),V(this,QC,ND).call(this),V(this,IC,HD).call(this),c(this,Z).streaming||(V(this,pg,CC).call(this),V(this,xg,iC).call(this)),V(this,DC,aD).call(this),V(this,AQ,JQ).call(this)};BC=new WeakSet;wD=function(){var Q;let I={id:440786851,data:[{id:17030,data:1},{id:17143,data:1},{id:17138,data:4},{id:17139,data:8},{id:17026,data:(Q=c(this,Z).type)!=null?Q:"webm"},{id:17031,data:2},{id:17029,data:2}]};c(this,f).writeEBML(I)};QC=new WeakSet;ND=function(){W(this,XQ,{id:236,size:4,data:new Uint8Array(YI)}),W(this,xB,{id:236,size:4,data:new Uint8Array(YI)}),W(this,uQ,{id:236,size:4,data:new Uint8Array(YI)})};IC=new WeakSet;HD=function(){W(this,DQ,{id:21936,data:[{id:21937,data:2},{id:21946,data:2},{id:21947,data:2},{id:21945,data:0}]})};gC=new WeakSet;GD=function(){const Q=new Uint8Array([28,83,187,107]),I=new Uint8Array([21,73,169,102]),C=new Uint8Array([22,84,174,107]);W(this,aB,{id:290298740,data:[{id:19899,data:[{id:21419,data:Q},{id:21420,size:5,data:0}]},{id:19899,data:[{id:21419,data:I},{id:21420,size:5,data:0}]},{id:19899,data:[{id:21419,data:C},{id:21420,size:5,data:0}]}]})};EC=new WeakSet;tD=function(){let Q={id:17545,data:new PE(0)};W(this,MQ,Q);let I={id:357149030,data:[{id:2807729,data:1e6},{id:19840,data:ni},{id:22337,data:ni},c(this,Z).streaming?null:Q]};W(this,JI,I)};pg=new WeakSet;CC=function(){let Q={id:374648427,data:[]};W(this,WQ,Q),c(this,Z).video&&Q.data.push({id:174,data:[{id:215,data:OQ},{id:29637,data:OQ},{id:131,data:ay},{id:134,data:c(this,Z).video.codec},c(this,XQ),c(this,Z).video.frameRate?{id:2352003,data:1e9/c(this,Z).video.frameRate}:null,{id:224,data:[{id:176,data:c(this,Z).video.width},{id:186,data:c(this,Z).video.height},c(this,Z).video.alpha?{id:21440,data:1}:null,c(this,DQ)]}]}),c(this,Z).audio&&(W(this,xB,c(this,Z).streaming?c(this,xB)||null:{id:236,size:4,data:new Uint8Array(YI)}),Q.data.push({id:174,data:[{id:215,data:rI},{id:29637,data:rI},{id:131,data:hy},{id:134,data:c(this,Z).audio.codec},c(this,xB),{id:225,data:[{id:181,data:new _i(c(this,Z).audio.sampleRate)},{id:159,data:c(this,Z).audio.numberOfChannels},c(this,Z).audio.bitDepth?{id:25188,data:c(this,Z).audio.bitDepth}:null]}]})),c(this,Z).subtitles&&Q.data.push({id:174,data:[{id:215,data:dg},{id:29637,data:dg},{id:131,data:Yy},{id:134,data:c(this,Z).subtitles.codec},c(this,uQ)]})};xg=new WeakSet;iC=function(){let Q={id:408125543,size:c(this,Z).streaming?-1:sD,data:[c(this,Z).streaming?null:c(this,aB),c(this,JI),c(this,WQ)]};if(W(this,MI,Q),c(this,f).writeEBML(Q),c(this,f)instanceof TQ&&c(this,f).target.options.onHeader){let{data:I,start:C}=c(this,f).getTrackedWrites();c(this,f).target.options.onHeader(I,C)}};DC=new WeakSet;aD=function(){W(this,pQ,{id:475249515,data:[]})};AQ=new WeakSet;JQ=function(){c(this,f)instanceof iD&&c(this,f).flush()};BQ=new WeakSet;dQ=function(){return c(this,f).dataOffsets.get(c(this,MI))};SE=new WeakSet;hD=function(Q){if(Q.decoderConfig){if(Q.decoderConfig.colorSpace){let I=Q.decoderConfig.colorSpace;if(W(this,dI,I),c(this,DQ).data=[{id:21937,data:{rgb:1,bt709:1,bt470bg:5,smpte170m:6}[I.matrix]},{id:21946,data:{bt709:1,smpte170m:6,"iec61966-2-1":13}[I.transfer]},{id:21947,data:{bt709:1,bt470bg:5,smpte170m:6}[I.primaries]},{id:21945,data:[1,2][Number(I.fullRange)]}],!c(this,Z).streaming){let C=c(this,f).pos;c(this,f).seek(c(this,f).offsets.get(c(this,DQ))),c(this,f).writeEBML(c(this,DQ)),c(this,f).seek(C)}}Q.decoderConfig.description&&(c(this,Z).streaming?W(this,XQ,V(this,ZQ,lI).call(this,Q.decoderConfig.description)):V(this,nI,Vg).call(this,c(this,XQ),Q.decoderConfig.description))}};rE=new WeakSet;YD=function(Q){if(Q.type!=="key"||!c(this,dI))return;let I=0;if(RQ(Q.data,0,2)!==2)return;I+=2;let C=(RQ(Q.data,I+1,I+2)<<1)+RQ(Q.data,I+0,I+1);I+=2,C===3&&I++;let y=RQ(Q.data,I+0,I+1);if(I++,y)return;let D=RQ(Q.data,I+0,I+1);if(I++,D!==0)return;I+=2;let U=RQ(Q.data,I+0,I+24);if(I+=24,U!==4817730)return;C>=2&&I++;let N={rgb:7,bt709:2,bt470bg:1,smpte170m:3}[c(this,dI).matrix];wy(Q.data,I+0,I+3,N)};cI=new WeakSet;Fg=function(){let Q=Math.min(c(this,Z).video?c(this,bQ):1/0,c(this,Z).audio?c(this,mQ):1/0),I=c(this,$B);for(;I.length>0&&I[0].timestamp<=Q;)V(this,oB,tB).call(this,I.shift(),!c(this,Z).video&&!c(this,Z).audio)};UI=new WeakSet;cg=function(Q,I,C,y,D,U){let N=V(this,oC,eD).call(this,C,y);return{data:Q,additions:U,type:I,timestamp:N,duration:D,trackNumber:y}};oC=new WeakSet;eD=function(Q,I){let C=I===OQ?c(this,bQ):I===rI?c(this,mQ):c(this,lg);if(I!==dg){let y=I===OQ?c(this,eI):c(this,LI);if(c(this,Z).firstTimestampBehavior==="strict"&&C===-1&&Q!==0)throw new Error(`The first chunk for your media track must have a timestamp of 0 (received ${Q}). Non-zero first timestamps are often caused by directly piping frames or audio data from a MediaStreamTrack into the encoder. Their timestamps are typically relative to the age of the document, which is probably what you want.

If you want to offset all timestamps of a track such that the first one is zero, set firstTimestampBehavior: 'offset' in the options.
If you want to allow non-zero first timestamps, set firstTimestampBehavior: 'permissive'.
`);c(this,Z).firstTimestampBehavior==="offset"&&(Q-=y)}if(Q<C)throw new Error(`Timestamps must be monotonically increasing (went from ${C} to ${Q}).`);if(Q<0)throw new Error(`Timestamps must be non-negative (received ${Q}).`);return Q};oB=new WeakSet;tB=function(Q,I){c(this,Z).streaming&&!c(this,WQ)&&(V(this,pg,CC).call(this),V(this,xg,iC).call(this));let C=Math.floor(Q.timestamp/1e3),y=I&&Q.type==="key"&&C-c(this,jQ)>=1e3;(!c(this,YB)||y)&&V(this,yC,LD).call(this,C);let D=C-c(this,jQ);if(D<0)return;if(D>=gE)throw new Error(`Current Matroska cluster exceeded its maximum allowed length of ${gE} milliseconds. In order to produce a correct WebM file, you must pass in a key frame at least every ${gE} milliseconds.`);let N=new Uint8Array(4),G=new DataView(N.buffer);if(G.setUint8(0,128|Q.trackNumber),G.setInt16(1,D,!1),Q.duration===void 0&&!Q.additions){G.setUint8(3,+(Q.type==="key")<<7);let s={id:163,data:[N,Q.data]};c(this,f).writeEBML(s)}else{let s=Math.floor(Q.duration/1e3),R={id:160,data:[{id:161,data:[N,Q.data]},Q.duration!==void 0?{id:155,data:s}:null,Q.additions?{id:30113,data:Q.additions}:null]};c(this,f).writeEBML(R)}W(this,xQ,Math.max(c(this,xQ),C))};ZQ=new WeakSet;lI=function(Q){return{id:25506,size:4,data:new Uint8Array(Q)}};nI=new WeakSet;Vg=function(Q,I){let C=c(this,f).pos;c(this,f).seek(c(this,f).offsets.get(Q));let y=6+I.byteLength,D=YI-y;if(D<0){let U=I.byteLength+D;I instanceof ArrayBuffer?I=I.slice(0,U):I=I.buffer.slice(0,U),D=0}Q=[V(this,ZQ,lI).call(this,I),{id:236,size:4,data:new Uint8Array(D)}],c(this,f).writeEBML(Q),c(this,f).seek(C)};yC=new WeakSet;LD=function(Q){c(this,YB)&&!c(this,Z).streaming&&V(this,Kg,sC).call(this),c(this,f)instanceof TQ&&c(this,f).target.options.onCluster&&c(this,f).startTrackingWrites(),W(this,YB,{id:524531317,size:c(this,Z).streaming?-1:FD,data:[{id:231,data:Q}]}),c(this,f).writeEBML(c(this,YB)),W(this,jQ,Q);let I=c(this,f).offsets.get(c(this,YB))-c(this,BQ,dQ);c(this,pQ).data.push({id:187,data:[{id:179,data:Q},c(this,Z).video?{id:183,data:[{id:247,data:OQ},{id:241,data:I}]}:null,c(this,Z).audio?{id:183,data:[{id:247,data:rI},{id:241,data:I}]}:null]})};Kg=new WeakSet;sC=function(){let Q=c(this,f).pos-c(this,f).dataOffsets.get(c(this,YB)),I=c(this,f).pos;if(c(this,f).seek(c(this,f).offsets.get(c(this,YB))+4),c(this,f).writeEBMLVarInt(Q,FD),c(this,f).seek(I),c(this,f)instanceof TQ&&c(this,f).target.options.onCluster){let{data:C,start:y}=c(this,f).getTrackedWrites();c(this,f).target.options.onCluster(C,y,c(this,jQ))}};wI=new WeakSet;Ug=function(){if(c(this,RI))throw new Error("Cannot add new video or audio chunks after the file has been finalized.")};var sI=/(?:(.+?)\n)?((?:\d{2}:)?\d{2}:\d{2}.\d{3})\s+-->\s+((?:\d{2}:)?\d{2}:\d{2}.\d{3})/g,Ry=/^WEBVTT.*?\n{2}/,ny=/(?:(\d{2}):)?(\d{2}):(\d{2}).(\d{3})/,ki=/<(?:(\d{2}):)?(\d{2}):(\d{2}).(\d{3})>/g,EE=new TextEncoder,SQ,wg,Ng,Hg,Gg,NI,tg,ME,RD,ky=class{constructor(Q){k(this,NI),k(this,ME),k(this,SQ,void 0),k(this,wg,void 0),k(this,Ng,!1),k(this,Hg,void 0),k(this,Gg,!1),W(this,SQ,Q)}configure(Q){if(Q.codec!=="webvtt")throw new Error("Codec must be 'webvtt'.");W(this,wg,Q)}encode(Q){var I;if(!c(this,wg))throw new Error("Encoder not configured.");Q=Q.replace(`\r
`,`
`).replace("\r",`
`),sI.lastIndex=0;let C;if(!c(this,Ng)){if(!Ry.test(Q)){let D=new Error("WebVTT preamble incorrect.");throw c(this,SQ).error(D),D}C=sI.exec(Q);let y=Q.slice(0,(I=C==null?void 0:C.index)!=null?I:Q.length).trimEnd();if(!y){let D=new Error("No WebVTT preamble provided.");throw c(this,SQ).error(D),D}W(this,Hg,EE.encode(y)),W(this,Ng,!0),C&&(Q=Q.slice(C.index),sI.lastIndex=0)}for(;C=sI.exec(Q);){let y=Q.slice(0,C.index),D=C[1]||"",U=C.index+C[0].length,N=Q.indexOf(`
`,U)+1,G=Q.slice(U,N).trim(),s=Q.indexOf(`

`,U);s===-1&&(s=Q.length);let R=V(this,NI,tg).call(this,C[2]),e=V(this,NI,tg).call(this,C[3])-R,u=Q.slice(N,s),v=`${G}
${D}
${y}`;ki.lastIndex=0,u=u.replace(ki,J=>{let z=V(this,NI,tg).call(this,J.slice(1,-1))-R;return`<${V(this,ME,RD).call(this,z)}>`}),Q=Q.slice(s).trimStart(),sI.lastIndex=0;let K={body:EE.encode(u),additions:v.trim()===""?void 0:EE.encode(v),timestamp:R*1e3,duration:e*1e3},x={};c(this,Gg)||(x.decoderConfig={description:c(this,Hg)},W(this,Gg,!0)),c(this,SQ).output(K,x)}}};SQ=new WeakMap;wg=new WeakMap;Ng=new WeakMap;Hg=new WeakMap;Gg=new WeakMap;NI=new WeakSet;tg=function(Q){let I=ny.exec(Q);if(!I)throw new Error("Expected match.");return 60*60*1e3*Number(I[1]||"0")+60*1e3*Number(I[2])+1e3*Number(I[3])+Number(I[4])};ME=new WeakSet;RD=function(Q){let I=Math.floor(Q/36e5),C=Math.floor(Q%(60*60*1e3)/(60*1e3)),y=Math.floor(Q%(60*1e3)/1e3),D=Q%1e3;return I.toString().padStart(2,"0")+":"+C.toString().padStart(2,"0")+":"+y.toString().padStart(2,"0")+"."+D.toString().padStart(3,"0")};const Sy=Object.freeze(Object.defineProperty({__proto__:null,ArrayBufferTarget:AD,FileSystemWritableFileStreamTarget:BD,Muxer:Ly,StreamTarget:_E,SubtitleEncoder:ky},Symbol.toStringTag,{value:"Module"})),nD=[{name:"VP8",cccc:"vp08"},{name:"VP9",cccc:"vp09"}],ry=[0,1,2,3],My=["1","1.1","2","2.1","3","3.1","4","4.1","5","5.1","5.2","6","6.1","6.2"],Jy=[8,10,12],dy=Q=>String(Q).padStart(2,"0"),ly=Q=>String(parseFloat(Q)*10).padStart(2,"0"),Vy=Q=>String(Q).padStart(2,"0"),Ky=(Q,I,C,y)=>`${Q}.${I}.${C}.${y}`,fy=({name:Q,profile:I,level:C,bitDepth:y})=>{const D=nD.find(U=>U.name===Q);if(!D)throw new Error(`Unknown VP Codec "${Q}"`);if(!ry.includes(I))throw new Error(`Unknown VP Profile "${I}"`);if(!My.includes(C))throw new Error(`Unknown VP Level "${C}"`);if(!Jy.includes(y))throw new Error(`Unknown VP BitDepth "${y}"`);return Ky(D.cccc,dy(I),ly(C),Vy(y))},uy=[{name:"Constrained Baseline",PP:"42",CC:"40"},{name:"Baseline",PP:"42",CC:"00"},{name:"Extended",PP:"58",CC:"00"},{name:"Main",PP:"4d",CC:"00"},{name:"High",PP:"64",CC:"00"},{name:"Progressive High",PP:"64",CC:"08"},{name:"Constrained High",PP:"64",CC:"0c"},{name:"High 10",PP:"6e",CC:"00"},{name:"High 4:2:2",PP:"7a",CC:"00"},{name:"High 4:4:4 Predictive",PP:"f4",CC:"00"},{name:"High 10 Intra",PP:"6e",CC:"10"},{name:"High 4:2:2 Intra",PP:"7a",CC:"10"},{name:"High 4:4:4 Intra",PP:"f4",CC:"10"},{name:"CAVLC 4:4:4 Intra",PP:"44",CC:"00"},{name:"Scalable Baseline",PP:"53",CC:"00"},{name:"Scalable Constrained Baseline",PP:"53",CC:"04"},{name:"Scalable High",PP:"56",CC:"00"},{name:"Scalable Constrained High",PP:"56",CC:"04"},{name:"Scalable High Intra",PP:"56",CC:"20"},{name:"Stereo High",PP:"80",CC:"00"},{name:"Multiview High",PP:"76",CC:"00"},{name:"Multiview Depth High",PP:"8a",CC:"00"}],py="avc1",xy=["1","1.1","1.2","1.3","2","2.1","2.2","3","3.1","3.2","4","4.1","4.2","5","5.1","5.2","6","6.1","6.2"],by=Q=>(parseFloat(Q)*10).toString(16).padStart(2,"0"),my=(Q,{PP:I,CC:C},y)=>`${Q}.${I}${C}${y}`,kD=({profile:Q,level:I})=>{if(!xy.includes(I))throw new Error(`Unknown AVC Level "${I}"`);const C=uy.find(y=>y.name===Q);if(!C)throw new Error(`Unknown AVC Profile "${Q}"`);return my(py,C,by(I))},QQ=class QQ{constructor(I){Object.assign(this,I)}async init(I){Object.assign(this,I)}async getDirectory(){if("showDirectoryPicker"in window)return await window.showDirectoryPicker()}async getDirectoryHandle(I,C){return await I.getDirectoryHandle(C,{create:!0})}async getFileHandle(I,C){if(this.directoryHandle)return await this.directoryHandle.getFileHandle(I,{create:!0});if("showSaveFilePicker"in window)return await window.showSaveFilePicker({suggestedName:I,...C})}async getWritableFileStream(I){if(await I.queryPermission({mode:"readwrite"})==="granted")return await I.createWritable()}async encode(){}async stop(){}dispose(){}};fA(QQ,"supportedExtensions",["mp4","webm"]),fA(QQ,"supportedTargets",["in-browser"]),fA(QQ,"defaultOptions",{frameMethod:"blob",extension:QQ.supportedExtensions[0],target:QQ.supportedTargets[0]});let zQ=QQ;const Zy=typeof window<"u"&&typeof window.VideoEncoder=="function";let $I;const SD=(Q,I,C)=>{$I||($I=document.createElement("a")),$I.download=Q;const y=new Blob(I,{type:C}),D=URL.createObjectURL(y);$I.href=D;const U=new MouseEvent("click");$I.dispatchEvent(U),setTimeout(()=>{URL.revokeObjectURL(D)},1)},vy=Q=>Q.toISOString().replace(/:/g,"-").replace("T","@").replace("Z",""),Si=Q=>{const I=Math.floor(Q/60),C=Math.floor(Q-I*60);return`${String(I).padStart(2,"0")}:${String(C).padStart(2,"0")}`},fg=(Q,I=2)=>Math.ceil(Q/I)*I,rD=(Q,I,C=30,y=4,D="variable")=>Math.round(Q*I*C*y*.07*(D==="variable"?.75:1)/1e6)*1e6,IQ=class IQ extends zQ{get frameMethod(){return"videoFrame"}constructor(I){super({...IQ.defaultOptions,...I})}async init(I){var N;if(super.init(I),this.target==="file-system"){const G=await this.getFileHandle(this.filename,{types:[{description:"Video File",accept:{[this.mimeType]:[`.${this.extension}`]}}]});this.writableFileStream=await this.getWritableFileStream(G)}const C=((N=this.encoderOptions)==null?void 0:N.codec)||(this.extension==="mp4"?kD({profile:"High",level:"5.2"}):fy({name:"VP9",profile:0,level:"1",bitDepth:8})),y=C.split(".")[0],D=this.extension==="mp4"?oy:Sy;this.muxer=new D.Muxer({target:this.writableFileStream?new D.FileSystemWritableFileStreamTarget(this.writableFileStream):new D.ArrayBufferTarget,type:this.extension==="mkv"?"matroska":"webm",video:{codec:this.extension==="mp4"?y.startsWith("hev")||y.startsWith("hvc")?"hevc":"avc":`V_${y.startsWith("av01")?"AV1":nD.find(G=>G.cccc===y).name}`,width:this.width,height:this.height},firstTimestampBehavior:"offset",fastStart:this.writableFileStream?!1:"in-memory",...this.muxerOptions}),this.encoder=new VideoEncoder({output:(G,s)=>this.muxer.addVideoChunk(G,s),error:G=>console.error(G)});const U={width:this.width,height:this.height,framerate:this.frameRate,bitrate:rD(this.width,this.height,this.frameRate,this.encoderOptions.bitrateMode),...this.encoderOptions,codec:C};if(this.encoder.configure(U),!(await VideoEncoder.isConfigSupported(U)).supported)throw new Error(`canvas-record: Unsupported VideoEncoder config
`):typeof readline=="function"&&(B=readline())!==null&&(B+=`
`);if(!B)return null;A.input=_I(B,!0)}return A.input.shift()},Xa:function(A,B){B===null||B===10?(wA(FA(A.output,0)),A.output=[]):B!=0&&A.output.push(B)},flush:function(A){A.output&&0<A.output.length&&(wA(FA(A.output,0)),A.output=[])}},mD={Xa:function(A,B){B===null||B===10?(EA(FA(A.output,0)),A.output=[]):B!=0&&A.output.push(B)},flush:function(A){A.output&&0<A.output.length&&(EA(FA(A.output,0)),A.output=[])}},$={M:null,s:function(){return $.createNode(null,"/",16895,0)},createNode:function(A,B,g,E){if(i.$b(g)||i.isFIFO(g))throw new i.b(63);return $.M||($.M={dir:{node:{J:$.g.J,A:$.g.A,lookup:$.g.lookup,R:$.g.R,rename:$.g.rename,unlink:$.g.unlink,rmdir:$.g.rmdir,readdir:$.g.readdir,symlink:$.g.symlink},stream:{K:$.h.K}},file:{node:{J:$.g.J,A:$.g.A},stream:{K:$.h.K,read:$.h.read,write:$.h.write,ia:$.h.ia,na:$.h.na,da:$.h.da}},link:{node:{J:$.g.J,A:$.g.A,readlink:$.g.readlink},stream:{}},gb:{node:{J:$.g.J,A:$.g.A},stream:i.Kb}}),g=i.createNode(A,B,g,E),i.v(g.mode)?(g.g=$.M.dir.node,g.h=$.M.dir.stream,g.f={}):i.isFile(g.mode)?(g.g=$.M.file.node,g.h=$.M.file.stream,g.l=0,g.f=null):i.ma(g.mode)?(g.g=$.M.link.node,g.h=$.M.link.stream):i.ya(g.mode)&&(g.g=$.M.gb.node,g.h=$.M.gb.stream),g.timestamp=Date.now(),A&&(A.f[B]=g),g},Gc:function(A){if(A.f&&A.f.subarray){for(var B=[],g=0;g<A.l;++g)B.push(A.f[g]);return B}return A.f},Hc:function(A){return A.f?A.f.subarray?A.f.subarray(0,A.l):new Uint8Array(A.f):new Uint8Array(0)},lb:function(A,B){var g=A.f?A.f.length:0;g>=B||(B=Math.max(B,g*(1048576>g?2:1.125)>>>0),g!=0&&(B=Math.max(B,256)),g=A.f,A.f=new Uint8Array(B),0<A.l&&A.f.set(g.subarray(0,A.l),0))},oc:function(A,B){if(A.l!=B)if(B==0)A.f=null,A.l=0;else{if(!A.f||A.f.subarray){var g=A.f;A.f=new Uint8Array(B),g&&A.f.set(g.subarray(0,Math.min(B,A.l)))}else if(A.f||(A.f=[]),A.f.length>B)A.f.length=B;else for(;A.f.length<B;)A.f.push(0);A.l=B}},g:{J:function(A){var B={};return B.dev=i.ya(A.mode)?A.id:1,B.ino=A.id,B.mode=A.mode,B.nlink=1,B.uid=0,B.gid=0,B.rdev=A.rdev,i.v(A.mode)?B.size=4096:i.isFile(A.mode)?B.size=A.l:i.ma(A.mode)?B.size=A.link.length:B.size=0,B.atime=new Date(A.timestamp),B.mtime=new Date(A.timestamp),B.ctime=new Date(A.timestamp),B.Hb=4096,B.blocks=Math.ceil(B.size/B.Hb),B},A:function(A,B){B.mode!==void 0&&(A.mode=B.mode),B.timestamp!==void 0&&(A.timestamp=B.timestamp),B.size!==void 0&&$.oc(A,B.size)},lookup:function(){throw i.Na[44]},R:function(A,B,g,E){return $.createNode(A,B,g,E)},rename:function(A,B,g){if(i.v(A.mode)){try{var E=i.P(B,g)}catch{}if(E)for(var o in E.f)throw new i.b(55)}delete A.parent.f[A.name],A.name=g,B.f[g]=A,A.parent=B},unlink:function(A,B){delete A.f[B]},rmdir:function(A,B){var g,E=i.P(A,B);for(g in E.f)throw new i.b(55);delete A.f[B]},readdir:function(A){var B,g=[".",".."];for(B in A.f)A.f.hasOwnProperty(B)&&g.push(B);return g},symlink:function(A,B,g){return(A=$.createNode(A,B,41471,0)).link=g,A},readlink:function(A){if(!i.ma(A.mode))throw new i.b(28);return A.link}},h:{read:function(A,B,g,E,o){var F=A.node.f;if(o>=A.node.l)return 0;if(8<(A=Math.min(A.node.l-o,E))&&F.subarray)B.set(F.subarray(o,o+A),g);else for(E=0;E<A;E++)B[g+E]=F[o+E];return A},write:function(A,B,g,E,o,F){if(B.buffer===MA.buffer&&(F=!1),!E)return 0;if((A=A.node).timestamp=Date.now(),B.subarray&&(!A.f||A.f.subarray)){if(F)return A.f=B.subarray(g,g+E),A.l=E;if(A.l===0&&o===0)return A.f=B.slice(g,g+E),A.l=E;if(o+E<=A.l)return A.f.set(B.subarray(g,g+E),o),E}if($.lb(A,o+E),A.f.subarray&&B.subarray)A.f.set(B.subarray(g,g+E),o);else for(F=0;F<E;F++)A.f[o+F]=B[g+F];return A.l=Math.max(A.l,o+E),E},K:function(A,B,g){if(g===1?B+=A.position:g===2&&i.isFile(A.node.mode)&&(B+=A.node.l),0>B)throw new i.b(28);return B},ia:function(A,B,g){$.lb(A.node,B+g),A.node.l=Math.max(A.node.l,B+g)},na:function(A,B,g,E,o,F,w){if(!i.isFile(A.node.mode))throw new i.b(43);if(A=A.node.f,2&w||A.buffer!==B.buffer){if((0<o||o+E<A.length)&&(A=A.subarray?A.subarray(o,o+E):Array.prototype.slice.call(A,o,o+E)),o=!0,w=B.buffer==MA.buffer,!(E=EI(E)))throw new i.b(48);(w?MA:B).set(A,E)}else o=!1,E=A.byteOffset;return{j:E,Gb:o}},da:function(A,B,g,E,o){if(!i.isFile(A.node.mode))throw new i.b(43);return 2&o||$.h.write(A,B,0,E,g,!1),0}}},i={root:null,pa:[],jb:{},streams:[],ec:1,L:null,ib:"/",Qa:!1,ub:!0,u:{},zb:{wb:{Cb:1,Db:2}},b:null,Na:{},Ub:null,Fa:0,Ic:function(A){if(!(A instanceof i.b)){A:{var B=Error();if(!B.stack){try{throw Error()}catch(g){B=g}if(!B.stack){B="(no stack trace available)";break A}}B=B.stack.toString()}throw s.extraStackTrace&&(B+=`
`+s.extraStackTrace()),B=function(g){return g.replace(/\b_Z[\w\d_]+/g,function(E){return E==E?E:E+" ["+E+"]"})}(B),A+" : "+B}return AI(A.B)},m:function(A,B){if(B=B||{},!(A=dB(i.cwd(),A)))return{path:"",node:null};var g,E={Ma:!0,Za:0};for(g in E)B[g]===void 0&&(B[g]=E[g]);if(8<B.Za)throw new i.b(32);A=vg(A.split("/").filter(function(w){return!!w}),!1);var o=i.root;for(E="/",g=0;g<A.length;g++){var F=g===A.length-1;if(F&&B.parent)break;if(o=i.P(o,A[g]),E=JB(E,A[g]),i.W(o)&&(!F||F&&B.Ma)&&(o=o.oa.root),!F||B.H){for(F=0;i.ma(o.mode);)if(o=i.readlink(E),E=dB(xI(E),o),o=i.m(E,{Za:B.Za}).node,40<F++)throw new i.b(32)}}return{path:E,node:o}},I:function(A){for(var B;;){if(i.Aa(A))return A=A.s.vb,B?A[A.length-1]!=="/"?A+"/"+B:A+B:A;B=B?A.name+"/"+B:A.name,A=A.parent}},Pa:function(A,B){for(var g=0,E=0;E<B.length;E++)g=(g<<5)-g+B.charCodeAt(E)|0;return(A+g>>>0)%i.L.length},sb:function(A){var B=i.Pa(A.parent.id,A.name);A.Y=i.L[B],i.L[B]=A},tb:function(A){var B=i.Pa(A.parent.id,A.name);if(i.L[B]===A)i.L[B]=A.Y;else for(B=i.L[B];B;){if(B.Y===A){B.Y=A.Y;break}B=B.Y}},P:function(A,B){var g=i.bc(A);if(g)throw new i.b(g,A);for(g=i.L[i.Pa(A.id,B)];g;g=g.Y){var E=g.name;if(g.parent.id===A.id&&E===B)return g}return i.lookup(A,B)},createNode:function(A,B,g,E){return A=new i.Ab(A,B,g,E),i.sb(A),A},La:function(A){i.tb(A)},Aa:function(A){return A===A.parent},W:function(A){return!!A.oa},isFile:function(A){return(61440&A)==32768},v:function(A){return(61440&A)==16384},ma:function(A){return(61440&A)==40960},ya:function(A){return(61440&A)==8192},$b:function(A){return(61440&A)==24576},isFIFO:function(A){return(61440&A)==4096},isSocket:function(A){return(49152&A)==49152},Vb:{r:0,rs:1052672,"r+":2,w:577,wx:705,xw:705,"w+":578,"wx+":706,"xw+":706,a:1089,ax:1217,xa:1217,"a+":1090,"ax+":1218,"xa+":1218},dc:function(A){var B=i.Vb[A];if(B===void 0)throw Error("Unknown file open mode: "+A);return B},mb:function(A){var B=["r","w","rw"][3&A];return 512&A&&(B+="w"),B},Z:function(A,B){return i.ub||(B.indexOf("r")===-1||292&A.mode)&&(B.indexOf("w")===-1||146&A.mode)&&(B.indexOf("x")===-1||73&A.mode)?0:2},bc:function(A){var B=i.Z(A,"x");return B||(A.g.lookup?0:2)},Wa:function(A,B){try{return i.P(A,B),20}catch{}return i.Z(A,"wx")},Ca:function(A,B,g){try{var E=i.P(A,B)}catch(o){return o.B}if(A=i.Z(A,"wx"))return A;if(g){if(!i.v(E.mode))return 54;if(i.Aa(E)||i.I(E)===i.cwd())return 10}else if(i.v(E.mode))return 31;return 0},cc:function(A,B){return A?i.ma(A.mode)?32:i.v(A.mode)&&(i.mb(B)!=="r"||512&B)?31:i.Z(A,i.mb(B)):44},Bb:4096,fc:function(A,B){for(B=B||i.Bb,A=A||0;A<=B;A++)if(!i.streams[A])return A;throw new i.b(33)},ba:function(A){return i.streams[A]},Sb:function(A,B,g){i.Ja||(i.Ja=function(){},i.Ja.prototype={object:{get:function(){return this.node},set:function(F){this.node=F}}});var E,o=new i.Ja;for(E in A)o[E]=A[E];return A=o,B=i.fc(B,g),A.fd=B,i.streams[B]=A},Lb:function(A){i.streams[A]=null},Kb:{open:function(A){A.h=i.Xb(A.node.rdev).h,A.h.open&&A.h.open(A)},K:function(){throw new i.b(70)}},Va:function(A){return A>>8},Oc:function(A){return 255&A},X:function(A,B){return A<<8|B},$a:function(A,B){i.jb[A]={h:B}},Xb:function(A){return i.jb[A]},pb:function(A){var B=[];for(A=[A];A.length;){var g=A.pop();B.push(g),A.push.apply(A,g.pa)}return B},yb:function(A,B){function g(w){return i.Fa--,B(w)}function E(w){if(w){if(!E.S)return E.S=!0,g(w)}else++F>=o.length&&g(null)}typeof A=="function"&&(B=A,A=!1),i.Fa++,1<i.Fa&&EA("warning: "+i.Fa+" FS.syncfs operations in flight at once, probably just doing extra work");var o=i.pb(i.root.s),F=0;o.forEach(function(w){if(!w.type.yb)return E(null);w.type.yb(w,A,E)})},s:function(A,B,g){var E=g==="/",o=!g;if(E&&i.root)throw new i.b(10);if(!E&&!o){var F=i.m(g,{Ma:!1});if(g=F.path,F=F.node,i.W(F))throw new i.b(10);if(!i.v(F.mode))throw new i.b(54)}return B={type:A,Rc:B,vb:g,pa:[]},(A=A.s(B)).s=B,B.root=A,E?i.root=A:F&&(F.oa=B,F.s&&F.s.pa.push(B)),A},Wc:function(A){if(A=i.m(A,{Ma:!1}),!i.W(A.node))throw new i.b(28);var B=(A=A.node).oa,g=i.pb(B);Object.keys(i.L).forEach(function(E){for(E=i.L[E];E;){var o=E.Y;g.indexOf(E.s)!==-1&&i.La(E),E=o}}),A.oa=null,A.s.pa.splice(A.s.pa.indexOf(B),1)},lookup:function(A,B){return A.g.lookup(A,B)},R:function(A,B,g){var E=i.m(A,{parent:!0}).node;if(!(A=MB(A))||A==="."||A==="..")throw new i.b(28);var o=i.Wa(E,A);if(o)throw new i.b(o);if(!E.g.R)throw new i.b(63);return E.g.R(E,A,B,g)},create:function(A,B){return i.R(A,4095&(B!==void 0?B:438)|32768,0)},mkdir:function(A,B){return i.R(A,1023&(B!==void 0?B:511)|16384,0)},Pc:function(A,B){A=A.split("/");for(var g="",E=0;E<A.length;++E)if(A[E]){g+="/"+A[E];try{i.mkdir(g,B)}catch(o){if(o.B!=20)throw o}}},Da:function(A,B,g){return g===void 0&&(g=B,B=438),i.R(A,8192|B,g)},symlink:function(A,B){if(!dB(A))throw new i.b(44);var g=i.m(B,{parent:!0}).node;if(!g)throw new i.b(44);B=MB(B);var E=i.Wa(g,B);if(E)throw new i.b(E);if(!g.g.symlink)throw new i.b(63);return g.g.symlink(g,B,A)},rename:function(A,B){var g=xI(A),E=xI(B),o=MB(A),F=MB(B);try{var w=i.m(A,{parent:!0}),t=w.node,Y=(w=i.m(B,{parent:!0})).node}catch{throw new i.b(10)}if(!t||!Y)throw new i.b(44);if(t.s!==Y.s)throw new i.b(75);if(w=i.P(t,o),(E=HC(A,E)).charAt(0)!==".")throw new i.b(28);if((E=HC(B,g)).charAt(0)!==".")throw new i.b(55);try{var a=i.P(Y,F)}catch{}if(w!==a){if(g=i.v(w.mode),o=i.Ca(t,o,g))throw new i.b(o);if(o=a?i.Ca(Y,F,g):i.Wa(Y,F))throw new i.b(o);if(!t.g.rename)throw new i.b(63);if(i.W(w)||a&&i.W(a))throw new i.b(10);if(Y!==t&&(o=i.Z(t,"w")))throw new i.b(o);try{i.u.willMovePath&&i.u.willMovePath(A,B)}catch(L){EA("FS.trackingDelegate['willMovePath']('"+A+"', '"+B+"') threw an exception: "+L.message)}i.tb(w);try{t.g.rename(w,Y,F)}catch(L){throw L}finally{i.sb(w)}try{i.u.onMovePath&&i.u.onMovePath(A,B)}catch(L){EA("FS.trackingDelegate['onMovePath']('"+A+"', '"+B+"') threw an exception: "+L.message)}}},rmdir:function(A){var B=i.m(A,{parent:!0}).node,g=MB(A),E=i.P(B,g),o=i.Ca(B,g,!0);if(o)throw new i.b(o);if(!B.g.rmdir)throw new i.b(63);if(i.W(E))throw new i.b(10);try{i.u.willDeletePath&&i.u.willDeletePath(A)}catch(F){EA("FS.trackingDelegate['willDeletePath']('"+A+"') threw an exception: "+F.message)}B.g.rmdir(B,g),i.La(E);try{i.u.onDeletePath&&i.u.onDeletePath(A)}catch(F){EA("FS.trackingDelegate['onDeletePath']('"+A+"') threw an exception: "+F.message)}},readdir:function(A){if(!(A=i.m(A,{H:!0}).node).g.readdir)throw new i.b(54);return A.g.readdir(A)},unlink:function(A){var B=i.m(A,{parent:!0}).node,g=MB(A),E=i.P(B,g),o=i.Ca(B,g,!1);if(o)throw new i.b(o);if(!B.g.unlink)throw new i.b(63);if(i.W(E))throw new i.b(10);try{i.u.willDeletePath&&i.u.willDeletePath(A)}catch(F){EA("FS.trackingDelegate['willDeletePath']('"+A+"') threw an exception: "+F.message)}B.g.unlink(B,g),i.La(E);try{i.u.onDeletePath&&i.u.onDeletePath(A)}catch(F){EA("FS.trackingDelegate['onDeletePath']('"+A+"') threw an exception: "+F.message)}},readlink:function(A){if(!(A=i.m(A).node))throw new i.b(44);if(!A.g.readlink)throw new i.b(28);return dB(i.I(A.parent),A.g.readlink(A))},stat:function(A,B){if(!(A=i.m(A,{H:!B}).node))throw new i.b(44);if(!A.g.J)throw new i.b(63);return A.g.J(A)},lstat:function(A){return i.stat(A,!0)},chmod:function(A,B,g){var E;if(!(E=typeof A=="string"?i.m(A,{H:!g}).node:A).g.A)throw new i.b(63);E.g.A(E,{mode:4095&B|-4096&E.mode,timestamp:Date.now()})},lchmod:function(A,B){i.chmod(A,B,!0)},fchmod:function(A,B){if(!(A=i.ba(A)))throw new i.b(8);i.chmod(A.node,B)},chown:function(A,B,g,E){var o;if(!(o=typeof A=="string"?i.m(A,{H:!E}).node:A).g.A)throw new i.b(63);o.g.A(o,{timestamp:Date.now()})},lchown:function(A,B,g){i.chown(A,B,g,!0)},fchown:function(A,B,g){if(!(A=i.ba(A)))throw new i.b(8);i.chown(A.node,B,g)},truncate:function(A,B){if(0>B)throw new i.b(28);var g;if(!(g=typeof A=="string"?i.m(A,{H:!0}).node:A).g.A)throw new i.b(63);if(i.v(g.mode))throw new i.b(31);if(!i.isFile(g.mode))throw new i.b(28);if(A=i.Z(g,"w"))throw new i.b(A);g.g.A(g,{size:B,timestamp:Date.now()})},Fc:function(A,B){if(!(A=i.ba(A)))throw new i.b(8);if(!(2097155&A.flags))throw new i.b(28);i.truncate(A.node,B)},Xc:function(A,B,g){(A=i.m(A,{H:!0}).node).g.A(A,{timestamp:Math.max(B,g)})},open:function(A,B,g,E,o){if(A==="")throw new i.b(44);if(g=64&(B=typeof B=="string"?i.dc(B):B)?4095&(g===void 0?438:g)|32768:0,typeof A=="object")var F=A;else{A=wQ(A);try{F=i.m(A,{H:!(131072&B)}).node}catch{}}var w=!1;if(64&B)if(F){if(128&B)throw new i.b(20)}else F=i.R(A,g,0),w=!0;if(!F)throw new i.b(44);if(i.ya(F.mode)&&(B&=-513),65536&B&&!i.v(F.mode))throw new i.b(54);if(!w&&(g=i.cc(F,B)))throw new i.b(g);512&B&&i.truncate(F,0),B&=-131713,(E=i.Sb({node:F,path:i.I(F),flags:B,seekable:!0,position:0,h:F.h,wc:[],error:!1},E,o)).h.open&&E.h.open(E),!s.logReadFiles||1&B||(i.Ya||(i.Ya={}),A in i.Ya||(i.Ya[A]=1,EA("FS.trackingDelegate error on read file: "+A)));try{i.u.onOpenFile&&(o=0,(2097155&B)!=1&&(o|=i.zb.wb.Cb),2097155&B&&(o|=i.zb.wb.Db),i.u.onOpenFile(A,o))}catch(t){EA("FS.trackingDelegate['onOpenFile']('"+A+"', flags) threw an exception: "+t.message)}return E},close:function(A){if(i.la(A))throw new i.b(8);A.Oa&&(A.Oa=null);try{A.h.close&&A.h.close(A)}catch(B){throw B}finally{i.Lb(A.fd)}A.fd=null},la:function(A){return A.fd===null},K:function(A,B,g){if(i.la(A))throw new i.b(8);if(!A.seekable||!A.h.K)throw new i.b(70);if(g!=0&&g!=1&&g!=2)throw new i.b(28);return A.position=A.h.K(A,B,g),A.wc=[],A.position},read:function(A,B,g,E,o){if(0>E||0>o)throw new i.b(28);if(i.la(A))throw new i.b(8);if((2097155&A.flags)==1)throw new i.b(8);if(i.v(A.node.mode))throw new i.b(31);if(!A.h.read)throw new i.b(28);var F=o!==void 0;if(F){if(!A.seekable)throw new i.b(70)}else o=A.position;return B=A.h.read(A,B,g,E,o),F||(A.position+=B),B},write:function(A,B,g,E,o,F){if(0>E||0>o)throw new i.b(28);if(i.la(A))throw new i.b(8);if(!(2097155&A.flags))throw new i.b(8);if(i.v(A.node.mode))throw new i.b(31);if(!A.h.write)throw new i.b(28);A.seekable&&1024&A.flags&&i.K(A,0,2);var w=o!==void 0;if(w){if(!A.seekable)throw new i.b(70)}else o=A.position;B=A.h.write(A,B,g,E,o,F),w||(A.position+=B);try{A.path&&i.u.onWriteToFile&&i.u.onWriteToFile(A.path)}catch(t){EA("FS.trackingDelegate['onWriteToFile']('"+A.path+"') threw an exception: "+t.message)}return B},ia:function(A,B,g){if(i.la(A))throw new i.b(8);if(0>B||0>=g)throw new i.b(28);if(!(2097155&A.flags))throw new i.b(8);if(!i.isFile(A.node.mode)&&!i.v(A.node.mode))throw new i.b(43);if(!A.h.ia)throw new i.b(138);A.h.ia(A,B,g)},na:function(A,B,g,E,o,F,w){if(2&F&&!(2&w)&&(2097155&A.flags)!=2)throw new i.b(2);if((2097155&A.flags)==1)throw new i.b(2);if(!A.h.na)throw new i.b(43);return A.h.na(A,B,g,E,o,F,w)},da:function(A,B,g,E,o){return A&&A.h.da?A.h.da(A,B,g,E,o):0},Qc:function(){return 0},Ra:function(A,B,g){if(!A.h.Ra)throw new i.b(59);return A.h.Ra(A,B,g)},readFile:function(A,B){if((B=B||{}).flags=B.flags||"r",B.encoding=B.encoding||"binary",B.encoding!=="utf8"&&B.encoding!=="binary")throw Error('Invalid encoding type "'+B.encoding+'"');var g,E=i.open(A,B.flags);A=i.stat(A).size;var o=new Uint8Array(A);return i.read(E,o,0,A,0),B.encoding==="utf8"?g=FA(o,0):B.encoding==="binary"&&(g=o),i.close(E),g},writeFile:function(A,B,g){if((g=g||{}).flags=g.flags||"w",A=i.open(A,g.flags,g.mode),typeof B=="string"){var E=new Uint8Array(aA(B)+1);B=LA(B,E,0,E.length),i.write(A,E,0,B,void 0,g.Jb)}else{if(!ArrayBuffer.isView(B))throw Error("Unsupported data type");i.write(A,B,0,B.byteLength,void 0,g.Jb)}i.close(A)},cwd:function(){return i.ib},chdir:function(A){if((A=i.m(A,{H:!0})).node===null)throw new i.b(44);if(!i.v(A.node.mode))throw new i.b(54);var B=i.Z(A.node,"x");if(B)throw new i.b(B);i.ib=A.path},Ob:function(){i.mkdir("/tmp"),i.mkdir("/home"),i.mkdir("/home/web_user")},Nb:function(){if(i.mkdir("/dev"),i.$a(i.X(1,3),{read:function(){return 0},write:function(E,o,F,w){return w}}),i.Da("/dev/null",i.X(1,3)),tC(i.X(5,0),bD),tC(i.X(6,0),mD),i.Da("/dev/tty",i.X(5,0)),i.Da("/dev/tty1",i.X(6,0)),typeof crypto=="object"&&typeof crypto.getRandomValues=="function")var A=new Uint8Array(1),B=function(){return crypto.getRandomValues(A),A[0]};else if(v)try{var g=C(4);B=function(){return g.randomBytes(1)[0]}}catch{}B||(B=function(){RA("random_device")}),i.T("/dev","random",B),i.T("/dev","urandom",B),i.mkdir("/dev/shm"),i.mkdir("/dev/shm/tmp")},Qb:function(){i.mkdir("/proc"),i.mkdir("/proc/self"),i.mkdir("/proc/self/fd"),i.s({s:function(){var A=i.createNode("/proc/self","fd",16895,73);return A.g={lookup:function(B,g){var E=i.ba(+g);if(!E)throw new i.b(8);return(B={parent:null,s:{vb:"fake"},g:{readlink:function(){return E.path}}}).parent=B}},A}},{},"/proc/self/fd")},Rb:function(){s.stdin?i.T("/dev","stdin",s.stdin):i.symlink("/dev/tty","/dev/stdin"),s.stdout?i.T("/dev","stdout",null,s.stdout):i.symlink("/dev/tty","/dev/stdout"),s.stderr?i.T("/dev","stderr",null,s.stderr):i.symlink("/dev/tty1","/dev/stderr"),i.open("/dev/stdin","r"),i.open("/dev/stdout","w"),i.open("/dev/stderr","w")},kb:function(){i.b||(i.b=function(A,B){this.node=B,this.pc=function(g){this.B=g},this.pc(A),this.message="FS error"},i.b.prototype=Error(),i.b.prototype.constructor=i.b,[44].forEach(function(A){i.Na[A]=new i.b(A),i.Na[A].stack="<generic error, no stack>"}))},rc:function(){i.kb(),i.L=Array(4096),i.s($,{},"/"),i.Ob(),i.Nb(),i.Qb(),i.Ub={MEMFS:$}},ka:function(A,B,g){i.ka.Qa=!0,i.kb(),s.stdin=A||s.stdin,s.stdout=B||s.stdout,s.stderr=g||s.stderr,i.Rb()},quit:function(){i.ka.Qa=!1;var A=s._fflush;for(A&&A(0),A=0;A<i.streams.length;A++){var B=i.streams[A];B&&i.close(B)}},wa:function(A,B){var g=0;return A&&(g|=365),B&&(g|=146),g},Kc:function(A,B){return A=pD.apply(null,A),B&&A[0]=="/"&&(A=A.substr(1)),A},xc:function(A,B){return dB(B,A)},Uc:function(A){return wQ(A)},Ec:function(A,B){return(A=i.Ka(A,B)).exists?A.object:(AI(A.error),null)},Ka:function(A,B){try{var g=i.m(A,{H:!B});A=g.path}catch{}var E={Aa:!1,exists:!1,error:0,name:null,path:null,object:null,hc:!1,jc:null,ic:null};try{g=i.m(A,{parent:!0}),E.hc=!0,E.jc=g.path,E.ic=g.node,E.name=MB(A),g=i.m(A,{H:!B}),E.exists=!0,E.path=g.path,E.object=g.node,E.name=g.node.name,E.Aa=g.path==="/"}catch(o){E.error=o.B}return E},zc:function(A,B,g,E){return A=JB(typeof A=="string"?A:i.I(A),B),i.mkdir(A,i.wa(g,E))},Cc:function(A,B){for(A=typeof A=="string"?A:i.I(A),B=B.split("/").reverse();B.length;){var g=B.pop();if(g){var E=JB(A,g);try{i.mkdir(E)}catch{}A=E}}return E},Pb:function(A,B,g,E,o){return A=JB(typeof A=="string"?A:i.I(A),B),i.create(A,i.wa(E,o))},hb:function(A,B,g,E,o,F){if(A=B?JB(typeof A=="string"?A:i.I(A),B):A,E=i.wa(E,o),o=i.create(A,E),g){if(typeof g=="string"){A=Array(g.length),B=0;for(var w=g.length;B<w;++B)A[B]=g.charCodeAt(B);g=A}i.chmod(o,146|E),A=i.open(o,"w"),i.write(A,g,0,g.length,0,F),i.close(A),i.chmod(o,E)}return o},T:function(A,B,g,E){A=JB(typeof A=="string"?A:i.I(A),B),B=i.wa(!!g,!!E),i.T.Va||(i.T.Va=64);var o=i.X(i.T.Va++,0);return i.$a(o,{open:function(F){F.seekable=!1},close:function(){E&&E.buffer&&E.buffer.length&&E(10)},read:function(F,w,t,Y){for(var a=0,L=0;L<Y;L++){try{var S=g()}catch{throw new i.b(29)}if(S===void 0&&a===0)throw new i.b(6);if(S==null)break;a++,w[t+L]=S}return a&&(F.node.timestamp=Date.now()),a},write:function(F,w,t,Y){for(var a=0;a<Y;a++)try{E(w[t+a])}catch{throw new i.b(29)}return Y&&(F.node.timestamp=Date.now()),a}}),i.Da(A,B,o)},Bc:function(A,B,g){return A=JB(typeof A=="string"?A:i.I(A),B),i.symlink(g,A)},nb:function(A){if(A.Sa||A.ac||A.link||A.f)return!0;var B=!0;if(typeof XMLHttpRequest<"u")throw Error("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");if(!J)throw Error("Cannot load without read() or XMLHttpRequest.");try{A.f=_I(J(A.url),!0),A.l=A.f.length}catch{B=!1}return B||AI(29),B},Ac:function(A,B,g,E,o){function F(){this.Ua=!1,this.S=[]}if(F.prototype.get=function(a){if(!(a>this.length-1||0>a)){var L=a%this.chunkSize;return this.rb(a/this.chunkSize|0)[L]}},F.prototype.Ib=function(a){this.rb=a},F.prototype.eb=function(){var a=new XMLHttpRequest;if(a.open("HEAD",g,!1),a.send(null),!(200<=a.status&&300>a.status||a.status===304))throw Error("Couldn't load "+g+". Status: "+a.status);var L,S=Number(a.getResponseHeader("Content-length")),d=(L=a.getResponseHeader("Accept-Ranges"))&&L==="bytes";a=(L=a.getResponseHeader("Content-Encoding"))&&L==="gzip";var q=1048576;d||(q=S);var r=this;r.Ib(function(P){var O=P*q,h=(P+1)*q-1;if(h=Math.min(h,S-1),r.S[P]===void 0){var m=r.S;if(O>h)throw Error("invalid range ("+O+", "+h+") or no bytes requested!");if(h>S-1)throw Error("only "+S+" bytes available! programmer error!");var _=new XMLHttpRequest;if(_.open("GET",g,!1),S!==q&&_.setRequestHeader("Range","bytes="+O+"-"+h),typeof Uint8Array<"u"&&(_.responseType="arraybuffer"),_.overrideMimeType&&_.overrideMimeType("text/plain; charset=x-user-defined"),_.send(null),!(200<=_.status&&300>_.status||_.status===304))throw Error("Couldn't load "+g+". Status: "+_.status);O=_.response!==void 0?new Uint8Array(_.response||[]):_I(_.responseText||"",!0),m[P]=O}if(r.S[P]===void 0)throw Error("doXHR failed!");return r.S[P]}),!a&&S||(q=S=1,q=S=this.rb(0).length,wA("LazyFiles on gzip forces download of the whole file when length is accessed")),this.Fb=S,this.Eb=q,this.Ua=!0},typeof XMLHttpRequest<"u"){if(!u)throw"Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc";var w=new F;Object.defineProperties(w,{length:{get:function(){return this.Ua||this.eb(),this.Fb}},chunkSize:{get:function(){return this.Ua||this.eb(),this.Eb}}}),w={Sa:!1,f:w}}else w={Sa:!1,url:g};var t=i.Pb(A,B,w,E,o);w.f?t.f=w.f:w.url&&(t.f=null,t.url=w.url),Object.defineProperties(t,{l:{get:function(){return this.f.length}}});var Y={};return Object.keys(t.h).forEach(function(a){var L=t.h[a];Y[a]=function(){if(!i.nb(t))throw new i.b(29);return L.apply(null,arguments)}}),Y.read=function(a,L,S,d,q){if(!i.nb(t))throw new i.b(29);if(q>=(a=a.node.f).length)return 0;if(d=Math.min(a.length-q,d),a.slice)for(var r=0;r<d;r++)L[S+r]=a[q+r];else for(r=0;r<d;r++)L[S+r]=a.get(q+r);return d},t.h=Y,t},Dc:function(A,B,g,E,o,F,w,t,Y,a){function L(d){function q(P){a&&a(),t||i.hb(A,B,P,E,o,Y),F&&F(),cQ()}var r=!1;s.preloadPlugins.forEach(function(P){!r&&P.canHandle(S)&&(P.handle(d,S,q,function(){w&&w(),cQ()}),r=!0)}),r||q(d)}(void 0).ka();var S=B?dB(JB(A,B)):A;uI(),typeof g=="string"?(void 0).yc(g,function(d){L(d)},w):L(g)},indexedDB:function(){return window.indexedDB||window.mozIndexedDB||window.webkitIndexedDB||window.msIndexedDB},bb:function(){return"EM_FS_"+window.location.pathname},cb:20,ga:"FILE_DATA",Tc:function(A,B,g){B=B||function(){},g=g||function(){};var E=i.indexedDB();try{var o=E.open(i.bb(),i.cb)}catch(F){return g(F)}o.onupgradeneeded=function(){wA("creating db"),o.result.createObjectStore(i.ga)},o.onsuccess=function(){var F=o.result.transaction([i.ga],"readwrite"),w=F.objectStore(i.ga),t=0,Y=0,a=A.length;A.forEach(function(L){(L=w.put(i.Ka(L).object.f,L)).onsuccess=function(){++t+Y==a&&(Y==0?B():g())},L.onerror=function(){Y++,t+Y==a&&(Y==0?B():g())}}),F.onerror=g},o.onerror=g},Mc:function(A,B,g){B=B||function(){},g=g||function(){};var E=i.indexedDB();try{var o=E.open(i.bb(),i.cb)}catch(F){return g(F)}o.onupgradeneeded=g,o.onsuccess=function(){var F=o.result;try{var w=F.transaction([i.ga],"readonly")}catch(S){return void g(S)}var t=w.objectStore(i.ga),Y=0,a=0,L=A.length;A.forEach(function(S){var d=t.get(S);d.onsuccess=function(){i.Ka(S).exists&&i.unlink(S),i.hb(xI(S),MB(S),d.result,!0,!0,!0),++Y+a==L&&(a==0?B():g())},d.onerror=function(){a++,Y+a==L&&(a==0?B():g())}}),w.onerror=g},o.onerror=g}},aC={},bI=void 0;function NQ(){return M[(bI+=4)-4>>2]}function HQ(A){if(!(A=i.ba(A)))throw new i.b(8);return A}function qg(A){switch(A){case 1:return 0;case 2:return 1;case 4:return 2;case 8:return 3;default:throw new TypeError("Unknown type size: "+A)}}var hC=void 0;function mA(A){for(var B="";YA[A];)B+=hC[YA[A++]];return B}var GQ={},tQ={},mI={};function Og(A){if(A===void 0)return"_unknown";var B=(A=A.replace(/[^a-zA-Z0-9_]/g,"$")).charCodeAt(0);return 48<=B&&57>=B?"_"+A:A}function Wg(A,B){return A=Og(A),new Function("body","return function "+A+`() {
    "use strict";    return body.apply(this, arguments);
};
`)(B)}function Xg(A){var B=Error,g=Wg(A,function(E){this.name=A,this.message=E,(E=Error(E).stack)!==void 0&&(this.stack=this.toString()+`
`+E.replace(/^Error(:[^\n]*)?\n/,""))});return g.prototype=Object.create(B.prototype),g.prototype.constructor=g,g.prototype.toString=function(){return this.message===void 0?this.name:this.name+": "+this.message},g}var aQ=void 0;function DA(A){throw new aQ(A)}var YC=void 0;function ZI(A){throw new YC(A)}function ZB(A,B,g){function E(t){(t=g(t)).length!==A.length&&ZI("Mismatched type converter count");for(var Y=0;Y<A.length;++Y)NB(A[Y],t[Y])}A.forEach(function(t){mI[t]=B});var o=Array(B.length),F=[],w=0;B.forEach(function(t,Y){tQ.hasOwnProperty(t)?o[Y]=tQ[t]:(F.push(t),GQ.hasOwnProperty(t)||(GQ[t]=[]),GQ[t].push(function(){o[Y]=tQ[t],++w===F.length&&E(o)}))}),F.length===0&&E(o)}function NB(A,B,g){if(g=g||{},!("argPackAdvance"in B))throw new TypeError("registerType registeredInstance requires argPackAdvance");var E=B.name;if(A||DA('type "'+E+'" must have a positive integer typeid pointer'),tQ.hasOwnProperty(A)){if(g.Zb)return;DA("Cannot register type '"+E+"' twice")}tQ[A]=B,delete mI[A],GQ.hasOwnProperty(A)&&(B=GQ[A],delete GQ[A],B.forEach(function(o){o()}))}function ZD(A){return{count:A.count,aa:A.aa,qa:A.qa,j:A.j,o:A.o,D:A.D,F:A.F}}function jg(A){DA(A.c.o.i.name+" instance already deleted")}var zg=!1;function eC(){}function LC(A){--A.count.value,A.count.value===0&&(A.D?A.F.$(A.D):A.o.i.$(A.j))}function vI(A){return typeof FinalizationGroup>"u"?(vI=function(B){return B},A):(zg=new FinalizationGroup(function(B){for(var g=B.next();!g.done;g=B.next())(g=g.value).j?LC(g):console.warn("object already deleted: "+g.j)}),eC=function(B){zg.unregister(B.c)},(vI=function(B){return zg.register(B,B.c,B.c),B})(A))}var BI=void 0,QI=[];function Tg(){for(;QI.length;){var A=QI.pop();A.c.aa=!1,A.delete()}}function lB(){}var RC={};function nC(A,B,g){if(A[B].N===void 0){var E=A[B];A[B]=function(){return A[B].N.hasOwnProperty(arguments.length)||DA("Function '"+g+"' called with an invalid number of arguments ("+arguments.length+") - expects one of ("+A[B].N+")!"),A[B].N[arguments.length].apply(this,arguments)},A[B].N=[],A[B].N[E.va]=E}}function vD(A,B,g,E,o,F,w,t){this.name=A,this.constructor=B,this.U=g,this.$=E,this.G=o,this.Wb=F,this.ta=w,this.Tb=t,this.lc=[]}function qI(A,B,g){for(;B!==g;)B.ta||DA("Expected null or instance of "+g.name+", got an instance of "+B.name),A=B.ta(A),B=B.G;return A}function qD(A,B){return B===null?(this.Ta&&DA("null is not a valid "+this.name),0):(B.c||DA('Cannot pass "'+hQ(B)+'" as a '+this.name),B.c.j||DA("Cannot pass deleted object as a pointer of type "+this.name),qI(B.c.j,B.c.o.i,this.i))}function OD(A,B){if(B===null){if(this.Ta&&DA("null is not a valid "+this.name),this.Ba){var g=this.mc();return A!==null&&A.push(this.$,g),g}return 0}if(B.c||DA('Cannot pass "'+hQ(B)+'" as a '+this.name),B.c.j||DA("Cannot pass deleted object as a pointer of type "+this.name),!this.za&&B.c.o.za&&DA("Cannot convert argument of type "+(B.c.F?B.c.F.name:B.c.o.name)+" to parameter type "+this.name),g=qI(B.c.j,B.c.o.i,this.i),this.Ba)switch(B.c.D===void 0&&DA("Passing raw pointer to smart pointer is illegal"),this.qc){case 0:B.c.F===this?g=B.c.D:DA("Cannot convert argument of type "+(B.c.F?B.c.F.name:B.c.o.name)+" to parameter type "+this.name);break;case 1:g=B.c.D;break;case 2:if(B.c.F===this)g=B.c.D;else{var E=B.clone();g=this.nc(g,MC(function(){E.delete()})),A!==null&&A.push(this.$,g)}break;default:DA("Unsupporting sharing policy")}return g}function WD(A,B){return B===null?(this.Ta&&DA("null is not a valid "+this.name),0):(B.c||DA('Cannot pass "'+hQ(B)+'" as a '+this.name),B.c.j||DA("Cannot pass deleted object as a pointer of type "+this.name),B.c.o.za&&DA("Cannot convert argument of type "+B.c.o.name+" to parameter type "+this.name),qI(B.c.j,B.c.o.i,this.i))}function OI(A){return this.fromWireType(zA[A>>2])}var II={};function WI(A,B){return B.o&&B.j||ZI("makeClassHandle requires ptr and ptrType"),!!B.F!=!!B.D&&ZI("Both smartPtrType and smartPtr must be specified"),B.count={value:1},vI(Object.create(A,{c:{value:B}}))}function HB(A,B,g,E){this.name=A,this.i=B,this.Ta=g,this.za=E,this.Ba=!1,this.$=this.nc=this.mc=this.xb=this.qc=this.kc=void 0,B.G!==void 0?this.toWireType=OD:(this.toWireType=E?qD:WD,this.O=null)}function VB(A,B){A=mA(A);for(var g=s["dynCall_"+A],E=[],o=1;o<A.length;++o)E.push("a"+o);return o="return function dynCall_"+A+"_"+B+"("+E.join(", ")+`) {
`,o+="    return dynCall(rawFunction"+(E.length?", ":"")+E.join(", ")+`);
`,typeof(g=new Function("dynCall","rawFunction",o+`};
`)(g,B))!="function"&&DA("unknown function pointer with signature "+A+": "+B),g}var kC=void 0;function XD(A){var B=mA(A=bC(A));return PA(A),B}function gI(A,B){var g=[],E={};throw B.forEach(function o(F){E[F]||tQ[F]||(mI[F]?mI[F].forEach(o):(g.push(F),E[F]=!0))}),new kC(A+": "+g.map(XD).join([", "]))}function SC(A,B){for(var g=[],E=0;E<A;E++)g.push(M[(B>>2)+E]);return g}function Pg(A){for(;A.length;){var B=A.pop();A.pop()(B)}}function rC(A,B,g){return A instanceof Object||DA(g+' with invalid "this": '+A),A instanceof B.i.constructor||DA(g+' incompatible with "this" of type '+A.constructor.name),A.c.j||DA("cannot call emscripten binding method "+g+" on deleted object"),qI(A.c.j,A.c.o.i,B.i)}var _g=[],EB=[{},{value:void 0},{value:null},{value:!0},{value:!1}];function MC(A){switch(A){case void 0:return 1;case null:return 2;case!0:return 3;case!1:return 4;default:var B=_g.length?_g.pop():EB.length;return EB[B]={ra:1,value:A},B}}function hQ(A){if(A===null)return"null";var B=typeof A;return B==="object"||B==="array"||B==="function"?A.toString():""+A}function jD(A,B){switch(B){case 2:return function(g){return this.fromWireType(VA[g>>2])};case 3:return function(g){return this.fromWireType(KA[g>>3])};default:throw new TypeError("Unknown float type: "+A)}}function zD(A,B,g){switch(B){case 0:return g?function(E){return MA[E]}:function(E){return YA[E]};case 1:return g?function(E){return jA[E>>1]}:function(E){return LB[E>>1]};case 2:return g?function(E){return M[E>>2]}:function(E){return zA[E>>2]};default:throw new TypeError("Unknown integer type: "+A)}}var $g,JC={};function dC(){if(!$g){var A,B={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:(typeof navigator=="object"&&navigator.languages&&navigator.languages[0]||"C").replace("-","_")+".UTF-8",_:x||"./this.program"};for(A in JC)B[A]=JC[A];var g=[];for(A in B)g.push(A+"="+B[A]);$g=g}return $g}function XI(A){return A%4==0&&(A%100!=0||A%400==0)}function AE(A,B){for(var g=0,E=0;E<=B;g+=A[E++]);return g}var jI=[31,29,31,30,31,30,31,31,30,31,30,31],zI=[31,28,31,30,31,30,31,31,30,31,30,31];function TI(A,B){for(A=new Date(A.getTime());0<B;){var g=A.getMonth(),E=(XI(A.getFullYear())?jI:zI)[g];if(!(B>E-A.getDate())){A.setDate(A.getDate()+B);break}B-=E-A.getDate()+1,A.setDate(1),11>g?A.setMonth(g+1):(A.setMonth(0),A.setFullYear(A.getFullYear()+1))}return A}function lC(A,B,g,E){A||(A=this),this.parent=A,this.s=A.s,this.oa=null,this.id=i.ec++,this.name=B,this.mode=g,this.g={},this.h={},this.rdev=E}Object.defineProperties(lC.prototype,{read:{get:function(){return(365&this.mode)==365},set:function(A){A?this.mode|=365:this.mode&=-366}},write:{get:function(){return(146&this.mode)==146},set:function(A){A?this.mode|=146:this.mode&=-147}},ac:{get:function(){return i.v(this.mode)}},Sa:{get:function(){return i.ya(this.mode)}}}),i.Ab=lC,i.rc();for(var VC=Array(256),PI=0;256>PI;++PI)VC[PI]=String.fromCharCode(PI);function _I(A,B){var g=Array(aA(A)+1);return A=LA(A,g,0,g.length),B&&(g.length=A),g}function KC(A){for(var B=[],g=0;g<A.length;g++){var E=A[g];255<E&&(E&=255),B.push(String.fromCharCode(E))}return B.join("")}hC=VC,aQ=s.BindingError=Xg("BindingError"),YC=s.InternalError=Xg("InternalError"),lB.prototype.isAliasOf=function(A){if(!(this instanceof lB&&A instanceof lB))return!1;var B=this.c.o.i,g=this.c.j,E=A.c.o.i;for(A=A.c.j;B.G;)g=B.ta(g),B=B.G;for(;E.G;)A=E.ta(A),E=E.G;return B===E&&g===A},lB.prototype.clone=function(){if(this.c.j||jg(this),this.c.qa)return this.c.count.value+=1,this;var A=vI(Object.create(Object.getPrototypeOf(this),{c:{value:ZD(this.c)}}));return A.c.count.value+=1,A.c.aa=!1,A},lB.prototype.delete=function(){this.c.j||jg(this),this.c.aa&&!this.c.qa&&DA("Object already scheduled for deletion"),eC(this),LC(this.c),this.c.qa||(this.c.D=void 0,this.c.j=void 0)},lB.prototype.isDeleted=function(){return!this.c.j},lB.prototype.deleteLater=function(){return this.c.j||jg(this),this.c.aa&&!this.c.qa&&DA("Object already scheduled for deletion"),QI.push(this),QI.length===1&&BI&&BI(Tg),this.c.aa=!0,this},HB.prototype.Yb=function(A){return this.xb&&(A=this.xb(A)),A},HB.prototype.ja=function(A){this.$&&this.$(A)},HB.prototype.argPackAdvance=8,HB.prototype.readValueFromPointer=OI,HB.prototype.deleteObject=function(A){A!==null&&A.delete()},HB.prototype.fromWireType=function(A){function B(){return this.Ba?WI(this.i.U,{o:this.kc,j:g,F:this,D:A}):WI(this.i.U,{o:this,j:A})}var g=this.Yb(A);if(!g)return this.ja(A),null;var E=function(F,w){for(w===void 0&&DA("ptr should not be undefined");F.G;)w=F.ta(w),F=F.G;return II[w]}(this.i,g);if(E!==void 0)return E.c.count.value===0?(E.c.j=g,E.c.D=A,E.clone()):(E=E.clone(),this.ja(A),E);if(E=this.i.Wb(g),!(E=RC[E]))return B.call(this);E=this.za?E.Mb:E.pointerType;var o=function F(w,t,Y){return t===Y?w:Y.G===void 0||(w=F(w,t,Y.G))===null?null:Y.Tb(w)}(g,this.i,E.i);return o===null?B.call(this):this.Ba?WI(E.i.U,{o:E,j:o,F:this,D:A}):WI(E.i.U,{o:E,j:o})},s.getInheritedInstanceCount=function(){return Object.keys(II).length},s.getLiveInheritedInstances=function(){var A,B=[];for(A in II)II.hasOwnProperty(A)&&B.push(II[A]);return B},s.flushPendingDeletes=Tg,s.setDelayFunction=function(A){BI=A,QI.length&&BI&&BI(Tg)},kC=s.UnboundTypeError=Xg("UnboundTypeError"),s.count_emval_handles=function(){for(var A=0,B=5;B<EB.length;++B)EB[B]!==void 0&&++A;return A},s.get_first_emval=function(){for(var A=5;A<EB.length;++A)if(EB[A]!==void 0)return EB[A];return null};var TD=typeof atob=="function"?atob:function(A){var B="",g=0;A=A.replace(/[^A-Za-z0-9\+\/=]/g,"");do{var E="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(A.charAt(g++)),o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(A.charAt(g++)),F="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(A.charAt(g++)),w="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(A.charAt(g++));E=E<<2|o>>4,o=(15&o)<<4|F>>2;var t=(3&F)<<6|w;B+=String.fromCharCode(E),F!==64&&(B+=String.fromCharCode(o)),w!==64&&(B+=String.fromCharCode(t))}while(g<A.length);return B};function YQ(A){if(rB(A,UQ)){if(A=A.slice(UQ.length),typeof v=="boolean"&&v){try{var B=Buffer.from(A,"base64")}catch{B=new Buffer(A,"base64")}var g=new Uint8Array(B.buffer,B.byteOffset,B.byteLength)}else try{var E=TD(A),o=new Uint8Array(E.length);for(B=0;B<E.length;++B)o[B]=E.charCodeAt(B);g=o}catch{throw Error("Converting base64 string to bytes failed.")}return g}}var fC={__assert_fail:function(A,B,g,E){RA("Assertion failed: "+tA(A)+", at: "+[B?tA(B):"unknown filename",g,E?tA(E):"unknown function"])},__cxa_allocate_exception:function(A){return EI(A)},__cxa_atexit:function(A,B){},__cxa_begin_catch:function(A){var B=bA[A];return B&&!B.fb&&(B.fb=!0,eQ.ab--),B&&(B.Ea=!1),pI.push(A),(B=Zg(A))&&bA[B].ra++,A},__cxa_end_catch:function(){oA(0);var A=pI.pop();if(A){if(A=Zg(A)){var B=bA[A];B.ra--,B.ra!==0||B.Ea||(B.ja&&s.dynCall_ii(B.ja,A),delete bA[A],NC(A))}wB=0}},__cxa_find_matching_catch_2:function(){var A=wB;if(!A)return CA=0;var B=bA[A],g=B.type;if(!g)return CA=0,0|A;var E=Array.prototype.slice.call(arguments);iI(g),M[22792]=A,A=91168;for(var o=0;o<E.length;o++)if(E[o]&&CI(E[o],g,A))return A=M[A>>2],B.ha.push(A),CA=E[o],0|A;return A=M[A>>2],CA=g,0|A},__cxa_find_matching_catch_3:function(){var A=wB;if(!A)return CA=0;var B=bA[A],g=B.type;if(!g)return CA=0,0|A;var E=Array.prototype.slice.call(arguments);iI(g),M[22792]=A,A=91168;for(var o=0;o<E.length;o++)if(E[o]&&CI(E[o],g,A))return A=M[A>>2],B.ha.push(A),CA=E[o],0|A;return A=M[A>>2],CA=g,0|A},__cxa_find_matching_catch_4:function(){var A=wB;if(!A)return CA=0;var B=bA[A],g=B.type;if(!g)return CA=0,0|A;var E=Array.prototype.slice.call(arguments);iI(g),M[22792]=A,A=91168;for(var o=0;o<E.length;o++)if(E[o]&&CI(E[o],g,A))return A=M[A>>2],B.ha.push(A),CA=E[o],0|A;return A=M[A>>2],CA=g,0|A},__cxa_find_matching_catch_5:function(){var A=wB;if(!A)return CA=0;var B=bA[A],g=B.type;if(!g)return CA=0,0|A;var E=Array.prototype.slice.call(arguments);iI(g),M[22792]=A,A=91168;for(var o=0;o<E.length;o++)if(E[o]&&CI(E[o],g,A))return A=M[A>>2],B.ha.push(A),CA=E[o],0|A;return A=M[A>>2],CA=g,0|A},__cxa_free_exception:NC,__cxa_get_exception_ptr:function(A){return A},__cxa_rethrow:function(){var A=pI.pop();throw A=Zg(A),bA[A].Ea||(pI.push(A),bA[A].Ea=!0),wB=A,A},__cxa_throw:function(A,B,g){throw bA[A]={j:A,ha:[A],type:B,ja:g,ra:0,fb:!1,Ea:!1},wB=A,"uncaught_exception"in eQ?eQ.ab++:eQ.ab=1,A},__cxa_uncaught_exceptions:function(){return eQ.ab},__map_file:function(){return AI(63),-1},__resumeException:function(A){throw wB||(wB=A),A},__sys_fcntl64:function(A,B,g){bI=g;try{var E=HQ(A);switch(B){case 0:var o=NQ();return 0>o?-28:i.open(E.path,E.flags,0,o).fd;case 1:case 2:return 0;case 3:return E.flags;case 4:return o=NQ(),E.flags|=o,0;case 12:return o=NQ(),jA[o+0>>1]=2,0;case 13:case 14:return 0;case 16:case 8:return-28;case 9:return AI(28),-1;default:return-28}}catch(F){return i!==void 0&&F instanceof i.b||RA(F),-F.B}},__sys_ioctl:function(A,B,g){bI=g;try{var E=HQ(A);switch(B){case 21509:case 21505:return E.tty?0:-59;case 21510:case 21511:case 21512:case 21506:case 21507:case 21508:return E.tty?0:-59;case 21519:if(!E.tty)return-59;var o=NQ();return M[o>>2]=0;case 21520:return E.tty?-28:-59;case 21531:return o=NQ(),i.Ra(E,B,o);case 21523:case 21524:return E.tty?0:-59;default:RA("bad ioctl syscall "+B)}}catch(F){return i!==void 0&&F instanceof i.b||RA(F),-F.B}},__sys_munmap:function(A,B){try{if((0|A)==-1||B===0)var g=-28;else{var E=aC[A];if(E&&B===E.Lc){var o=i.ba(E.fd);if(2&E.Sc){var F=E.flags,w=E.offset,t=YA.slice(A,A+B);i.da(o,t,w,B,F)}aC[A]=null,E.Gb&&PA(E.Nc)}g=0}return g}catch(Y){return i!==void 0&&Y instanceof i.b||RA(Y),-Y.B}},__sys_open:function(A,B,g){bI=g;try{var E=tA(A),o=NQ();return i.open(E,B,o).fd}catch(F){return i!==void 0&&F instanceof i.b||RA(F),-F.B}},__sys_stat64:function(A,B){try{A=tA(A);A:{var g=i.stat;try{var E=g(A)}catch(F){if(F&&F.node&&wQ(A)!==wQ(i.I(F.node))){var o=-54;break A}throw F}M[B>>2]=E.dev,M[B+4>>2]=0,M[B+8>>2]=E.ino,M[B+12>>2]=E.mode,M[B+16>>2]=E.nlink,M[B+20>>2]=E.uid,M[B+24>>2]=E.gid,M[B+28>>2]=E.rdev,M[B+32>>2]=0,xA=[E.size>>>0,(HA=E.size,1<=+FQ(HA)?0<HA?(0|gB(+IB(HA/4294967296),4294967295))>>>0:~~+SB((HA-+(~~HA>>>0))/4294967296)>>>0:0)],M[B+40>>2]=xA[0],M[B+44>>2]=xA[1],M[B+48>>2]=4096,M[B+52>>2]=E.blocks,M[B+56>>2]=E.atime.getTime()/1e3|0,M[B+60>>2]=0,M[B+64>>2]=E.mtime.getTime()/1e3|0,M[B+68>>2]=0,M[B+72>>2]=E.ctime.getTime()/1e3|0,M[B+76>>2]=0,xA=[E.ino>>>0,(HA=E.ino,1<=+FQ(HA)?0<HA?(0|gB(+IB(HA/4294967296),4294967295))>>>0:~~+SB((HA-+(~~HA>>>0))/4294967296)>>>0:0)],M[B+80>>2]=xA[0],M[B+84>>2]=xA[1],o=0}return o}catch(F){return i!==void 0&&F instanceof i.b||RA(F),-F.B}},_embind_register_bool:function(A,B,g,E,o){var F=qg(g);NB(A,{name:B=mA(B),fromWireType:function(w){return!!w},toWireType:function(w,t){return t?E:o},argPackAdvance:8,readValueFromPointer:function(w){if(g===1)var t=MA;else if(g===2)t=jA;else{if(g!==4)throw new TypeError("Unknown boolean type size: "+B);t=M}return this.fromWireType(t[w>>F])},O:null})},_embind_register_class:function(A,B,g,E,o,F,w,t,Y,a,L,S,d){L=mA(L),F=VB(o,F),t&&(t=VB(w,t)),a&&(a=VB(Y,a)),d=VB(S,d);var q=Og(L);(function(r,P){s.hasOwnProperty(r)?(DA("Cannot register public name '"+r+"' twice"),nC(s,r,r),s.hasOwnProperty(void 0)&&DA("Cannot register multiple overloads of a function with the same number of arguments (undefined)!"),s[r].N[void 0]=P):s[r]=P})(q,function(){gI("Cannot construct "+L+" due to unbound types",[E])}),ZB([A,B,g],E?[E]:[],function(r){if(r=r[0],E)var P=r.i,O=P.U;else O=lB.prototype;r=Wg(q,function(){if(Object.getPrototypeOf(this)!==h)throw new aQ("Use 'new' to construct "+L);if(m.V===void 0)throw new aQ(L+" has no accessible constructor");var nA=m.V[arguments.length];if(nA===void 0)throw new aQ("Tried to invoke ctor of "+L+" with invalid number of parameters ("+arguments.length+") - expected ("+Object.keys(m.V).toString()+") parameters instead!");return nA.apply(this,arguments)});var h=Object.create(O,{constructor:{value:r}});r.prototype=h;var m=new vD(L,r,h,d,P,F,t,a);P=new HB(L,m,!0,!1),O=new HB(L+"*",m,!1,!1);var _=new HB(L+" const*",m,!1,!0);return RC[A]={pointerType:O,Mb:_},function(nA,vB){s.hasOwnProperty(nA)||ZI("Replacing nonexistant public symbol"),s[nA]=vB,s[nA].va=void 0}(q,r),[P,O,_]})},_embind_register_class_constructor:function(A,B,g,E,o,F){iA(0<B);var w=SC(B,g);o=VB(E,o);var t=[F],Y=[];ZB([],[A],function(a){var L="constructor "+(a=a[0]).name;if(a.i.V===void 0&&(a.i.V=[]),a.i.V[B-1]!==void 0)throw new aQ("Cannot register multiple constructors with identical number of parameters ("+(B-1)+") for class '"+a.name+"'! Overload resolution is currently only performed using the parameter count, not actual type info!");return a.i.V[B-1]=function(){gI("Cannot construct "+a.name+" due to unbound types",w)},ZB([],w,function(S){return a.i.V[B-1]=function(){arguments.length!==B-1&&DA(L+" called with "+arguments.length+" arguments, expected "+(B-1)),Y.length=0,t.length=B;for(var d=1;d<B;++d)t[d]=S[d].toWireType(Y,arguments[d-1]);return d=o.apply(null,t),Pg(Y),S[0].fromWireType(d)},[]}),[]})},_embind_register_class_function:function(A,B,g,E,o,F,w,t){var Y=SC(g,E);B=mA(B),F=VB(o,F),ZB([],[A],function(a){function L(){gI("Cannot call "+S+" due to unbound types",Y)}var S=(a=a[0]).name+"."+B;t&&a.i.lc.push(B);var d=a.i.U,q=d[B];return q===void 0||q.N===void 0&&q.className!==a.name&&q.va===g-2?(L.va=g-2,L.className=a.name,d[B]=L):(nC(d,B,S),d[B].N[g-2]=L),ZB([],Y,function(r){var P=S,O=a,h=F,m=r.length;2>m&&DA("argTypes array size mismatch! Must at least get return value and 'this' types!");var _=r[1]!==null&&O!==null,nA=!1;for(O=1;O<r.length;++O)if(r[O]!==null&&r[O].O===void 0){nA=!0;break}var vB=r[0].name!=="void",qB="",LQ="";for(O=0;O<m-2;++O)qB+=(O!==0?", ":"")+"arg"+O,LQ+=(O!==0?", ":"")+"arg"+O+"Wired";P="return function "+Og(P)+"("+qB+`) {
if (arguments.length !== `+(m-2)+`) {
throwBindingError('function `+P+" called with ' + arguments.length + ' arguments, expected "+(m-2)+` args!');
}
`,nA&&(P+=`var destructors = [];
`);var ti=nA?"destructors":"null";for(qB="throwBindingError invoker fn runDestructors retType classParam".split(" "),h=[DA,h,w,Pg,r[0],r[1]],_&&(P+="var thisWired = classParam.toWireType("+ti+`, this);
`),O=0;O<m-2;++O)P+="var arg"+O+"Wired = argType"+O+".toWireType("+ti+", arg"+O+"); // "+r[O+2].name+`
`,qB.push("argType"+O),h.push(r[O+2]);if(_&&(LQ="thisWired"+(0<LQ.length?", ":"")+LQ),P+=(vB?"var rv = ":"")+"invoker(fn"+(0<LQ.length?", ":"")+LQ+`);
`,nA)P+=`runDestructors(destructors);
`;else for(O=_?1:2;O<r.length;++O)m=O===1?"thisWired":"arg"+(O-2)+"Wired",r[O].O!==null&&(P+=m+"_dtor("+m+"); // "+r[O].name+`
`,qB.push(m+"_dtor"),h.push(r[O].O));return vB&&(P+=`var ret = retType.fromWireType(rv);
return ret;
`),qB.push(P+`}
`),r=function(QE){var oI=Function;if(!(oI instanceof Function))throw new TypeError("new_ called with constructor type "+typeof oI+" which is not a function");var yI=Wg(oI.name||"unknownFunctionName",function(){});return yI.prototype=oI.prototype,yI=new yI,(QE=oI.apply(yI,QE))instanceof Object?QE:yI}(qB).apply(null,h),d[B].N===void 0?(r.va=g-2,d[B]=r):d[B].N[g-2]=r,[]}),[]})},_embind_register_class_property:function(A,B,g,E,o,F,w,t,Y,a){B=mA(B),o=VB(E,o),ZB([],[A],function(L){var S=(L=L[0]).name+"."+B,d={get:function(){gI("Cannot access "+S+" due to unbound types",[g,w])},enumerable:!0,configurable:!0};return d.set=Y?function(){gI("Cannot access "+S+" due to unbound types",[g,w])}:function(){DA(S+" is a read-only property")},Object.defineProperty(L.i.U,B,d),ZB([],Y?[g,w]:[g],function(q){var r=q[0],P={get:function(){var h=rC(this,L,S+" getter");return r.fromWireType(o(F,h))},enumerable:!0};if(Y){Y=VB(t,Y);var O=q[1];P.set=function(h){var m=rC(this,L,S+" setter"),_=[];Y(a,m,O.toWireType(_,h)),Pg(_)}}return Object.defineProperty(L.i.U,B,P),[]}),[]})},_embind_register_emval:function(A,B){NB(A,{name:B=mA(B),fromWireType:function(g){var E=EB[g].value;return 4<g&&--EB[g].ra==0&&(EB[g]=void 0,_g.push(g)),E},toWireType:function(g,E){return MC(E)},argPackAdvance:8,readValueFromPointer:OI,O:null})},_embind_register_float:function(A,B,g){g=qg(g),NB(A,{name:B=mA(B),fromWireType:function(E){return E},toWireType:function(E,o){if(typeof o!="number"&&typeof o!="boolean")throw new TypeError('Cannot convert "'+hQ(o)+'" to '+this.name);return o},argPackAdvance:8,readValueFromPointer:jD(B,g),O:null})},_embind_register_integer:function(A,B,g,E,o){function F(a){return a}B=mA(B),o===-1&&(o=4294967295);var w=qg(g);if(E===0){var t=32-8*g;F=function(a){return a<<t>>>t}}var Y=B.indexOf("unsigned")!=-1;NB(A,{name:B,fromWireType:F,toWireType:function(a,L){if(typeof L!="number"&&typeof L!="boolean")throw new TypeError('Cannot convert "'+hQ(L)+'" to '+this.name);if(L<E||L>o)throw new TypeError('Passing a number "'+hQ(L)+'" from JS side to C/C++ side to an argument of type "'+B+'", which is outside the valid range ['+E+", "+o+"]!");return Y?L>>>0:0|L},argPackAdvance:8,readValueFromPointer:zD(B,w,E!==0),O:null})},_embind_register_memory_view:function(A,B,g){function E(F){var w=zA;return new o(XA,w[1+(F>>=2)],w[F])}var o=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array][B];NB(A,{name:g=mA(g),fromWireType:E,argPackAdvance:8,readValueFromPointer:E},{Zb:!0})},_embind_register_std_string:function(A,B){var g=(B=mA(B))==="std::string";NB(A,{name:B,fromWireType:function(E){var o=zA[E>>2];if(g){var F=YA[E+4+o],w=0;F!=0&&(w=F,YA[E+4+o]=0);var t=E+4;for(F=0;F<=o;++F){var Y=E+4+F;if(YA[Y]==0){if(t=tA(t),a===void 0)var a=t;else a+="\0",a+=t;t=Y+1}}w!=0&&(YA[E+4+o]=w)}else{for(a=Array(o),F=0;F<o;++F)a[F]=String.fromCharCode(YA[E+4+F]);a=a.join("")}return PA(E),a},toWireType:function(E,o){o instanceof ArrayBuffer&&(o=new Uint8Array(o));var F=typeof o=="string";F||o instanceof Uint8Array||o instanceof Uint8ClampedArray||o instanceof Int8Array||DA("Cannot pass non-string to std::string");var w=(g&&F?function(){return aA(o)}:function(){return o.length})(),t=EI(4+w+1);if(zA[t>>2]=w,g&&F)LA(o,YA,t+4,w+1);else if(F)for(F=0;F<w;++F){var Y=o.charCodeAt(F);255<Y&&(PA(t),DA("String has UTF-16 code units that do not fit in 8 bits")),YA[t+4+F]=Y}else for(F=0;F<w;++F)YA[t+4+F]=o[F];return E!==null&&E.push(PA,t),t},argPackAdvance:8,readValueFromPointer:OI,O:function(E){PA(E)}})},_embind_register_std_wstring:function(A,B,g){if(g=mA(g),B===2)var E=RB,o=bB,F=bg,w=function(){return LB},t=1;else B===4&&(E=QB,o=yQ,F=nB,w=function(){return zA},t=2);NB(A,{name:g,fromWireType:function(Y){var a=zA[Y>>2],L=w(),S=L[Y+4+a*B>>t],d=0;S!=0&&(d=S,L[Y+4+a*B>>t]=0);var q=Y+4;for(S=0;S<=a;++S){var r=Y+4+S*B;if(L[r>>t]==0){if(q=E(q),P===void 0)var P=q;else P+="\0",P+=q;q=r+B}}return d!=0&&(L[Y+4+a*B>>t]=d),PA(Y),P},toWireType:function(Y,a){typeof a!="string"&&DA("Cannot pass non-string to C++ string type "+g);var L=F(a),S=EI(4+L+B);return zA[S>>2]=L>>t,o(a,S+4,L+B),Y!==null&&Y.push(PA,S),S},argPackAdvance:8,readValueFromPointer:OI,O:function(Y){PA(Y)}})},_embind_register_void:function(A,B){NB(A,{Jc:!0,name:B=mA(B),argPackAdvance:0,fromWireType:function(){},toWireType:function(){}})},abort:function(){RA()},emscripten_get_sbrk_ptr:function(){return 91008},emscripten_memcpy_big:function(A,B,g){YA.copyWithin(A,B,B+g)},emscripten_resize_heap:function(A){A>>>=0;var B=YA.length;if(2147483648<A)return!1;for(var g=1;4>=g;g*=2){var E=B*(1+.2/g);E=Math.min(E,A+100663296),0<(E=Math.max(16777216,A,E))%65536&&(E+=65536-E%65536);A:{try{sA.grow(Math.min(2147483648,E)-XA.byteLength+65535>>>16),_Q(sA.buffer);var o=1;break A}catch{}o=void 0}if(o)return!0}return!1},environ_get:function(A,B){var g=0;return dC().forEach(function(E,o){var F=B+g;for(o=M[A+4*o>>2]=F,F=0;F<E.length;++F)MA[o++>>0]=E.charCodeAt(F);MA[o>>0]=0,g+=E.length+1}),0},environ_sizes_get:function(A,B){var g=dC();M[A>>2]=g.length;var E=0;return g.forEach(function(o){E+=o.length+1}),M[B>>2]=E,0},fd_close:function(A){try{var B=HQ(A);return i.close(B),0}catch(g){return i!==void 0&&g instanceof i.b||RA(g),g.B}},fd_read:function(A,B,g,E){try{A:{for(var o=HQ(A),F=A=0;F<g;F++){var w=M[B+(8*F+4)>>2],t=i.read(o,MA,M[B+8*F>>2],w,void 0);if(0>t){var Y=-1;break A}if(A+=t,t<w)break}Y=A}return M[E>>2]=Y,0}catch(a){return i!==void 0&&a instanceof i.b||RA(a),a.B}},fd_seek:function(A,B,g,E,o){try{var F=HQ(A);return-9007199254740992>=(A=4294967296*g+(B>>>0))||9007199254740992<=A?-61:(i.K(F,A,E),xA=[F.position>>>0,(HA=F.position,1<=+FQ(HA)?0<HA?(0|gB(+IB(HA/4294967296),4294967295))>>>0:~~+SB((HA-+(~~HA>>>0))/4294967296)>>>0:0)],M[o>>2]=xA[0],M[o+4>>2]=xA[1],F.Oa&&A===0&&E===0&&(F.Oa=null),0)}catch(w){return i!==void 0&&w instanceof i.b||RA(w),w.B}},fd_write:function(A,B,g,E){try{A:{for(var o=HQ(A),F=A=0;F<g;F++){var w=i.write(o,MA,M[B+8*F>>2],M[B+(8*F+4)>>2],void 0);if(0>w){var t=-1;break A}A+=w}t=A}return M[E>>2]=t,0}catch(Y){return i!==void 0&&Y instanceof i.b||RA(Y),Y.B}},getTempRet0:function(){return 0|CA},gettimeofday:function(A){var B=Date.now();return M[A>>2]=B/1e3|0,M[A+4>>2]=B%1e3*1e3|0,0},invoke_diii:function(A,B,g,E){var o=cA();try{return Gi(A,B,g,E)}catch(F){if(UA(o),F!==F+0&&F!=="longjmp")throw F;oA(1,0)}},invoke_fiii:function(A,B,g,E){var o=cA();try{return Hi(A,B,g,E)}catch(F){if(UA(o),F!==F+0&&F!=="longjmp")throw F;oA(1,0)}},invoke_i:function(A){var B=cA();try{return $C(A)}catch(g){if(UA(B),g!==g+0&&g!=="longjmp")throw g;oA(1,0)}},invoke_ii:function(A,B){var g=cA();try{return Ai(A,B)}catch(E){if(UA(g),E!==E+0&&E!=="longjmp")throw E;oA(1,0)}},invoke_iif:function(A,B,g){var E=cA();try{return Ui(A,B,g)}catch(o){if(UA(E),o!==o+0&&o!=="longjmp")throw o;oA(1,0)}},invoke_iii:function(A,B,g){var E=cA();try{return Bi(A,B,g)}catch(o){if(UA(E),o!==o+0&&o!=="longjmp")throw o;oA(1,0)}},invoke_iiii:function(A,B,g,E){var o=cA();try{return Qi(A,B,g,E)}catch(F){if(UA(o),F!==F+0&&F!=="longjmp")throw F;oA(1,0)}},invoke_iiiii:function(A,B,g,E,o){var F=cA();try{return Ii(A,B,g,E,o)}catch(w){if(UA(F),w!==w+0&&w!=="longjmp")throw w;oA(1,0)}},invoke_iiiiid:function(A,B,g,E,o,F){var w=cA();try{return si(A,B,g,E,o,F)}catch(t){if(UA(w),t!==t+0&&t!=="longjmp")throw t;oA(1,0)}},invoke_iiiiii:function(A,B,g,E,o,F){var w=cA();try{return gi(A,B,g,E,o,F)}catch(t){if(UA(w),t!==t+0&&t!=="longjmp")throw t;oA(1,0)}},invoke_iiiiiii:function(A,B,g,E,o,F,w){var t=cA();try{return Ei(A,B,g,E,o,F,w)}catch(Y){if(UA(t),Y!==Y+0&&Y!=="longjmp")throw Y;oA(1,0)}},invoke_iiiiiiii:function(A,B,g,E,o,F,w,t){var Y=cA();try{return Ci(A,B,g,E,o,F,w,t)}catch(a){if(UA(Y),a!==a+0&&a!=="longjmp")throw a;oA(1,0)}},invoke_iiiiiiiiiii:function(A,B,g,E,o,F,w,t,Y,a,L){var S=cA();try{return ii(A,B,g,E,o,F,w,t,Y,a,L)}catch(d){if(UA(S),d!==d+0&&d!=="longjmp")throw d;oA(1,0)}},invoke_iiiiiiiiiiii:function(A,B,g,E,o,F,w,t,Y,a,L,S){var d=cA();try{return Di(A,B,g,E,o,F,w,t,Y,a,L,S)}catch(q){if(UA(d),q!==q+0&&q!=="longjmp")throw q;oA(1,0)}},invoke_iiiiiiiiiiiii:function(A,B,g,E,o,F,w,t,Y,a,L,S,d){var q=cA();try{return oi(A,B,g,E,o,F,w,t,Y,a,L,S,d)}catch(r){if(UA(q),r!==r+0&&r!=="longjmp")throw r;oA(1,0)}},invoke_iiiiij:function(A,B,g,E,o,F,w){var t=cA();try{return yi(A,B,g,E,o,F,w)}catch(Y){if(UA(t),Y!==Y+0&&Y!=="longjmp")throw Y;oA(1,0)}},invoke_iiijiiiiii:function(A,B,g,E,o,F,w,t,Y,a,L){var S=cA();try{return Fi(A,B,g,E,o,F,w,t,Y,a,L)}catch(d){if(UA(S),d!==d+0&&d!=="longjmp")throw d;oA(1,0)}},invoke_iij:function(A,B,g,E){var o=cA();try{return ci(A,B,g,E)}catch(F){if(UA(o),F!==F+0&&F!=="longjmp")throw F;oA(1,0)}},invoke_jii:function(A,B,g){var E=cA();try{return wi(A,B,g)}catch(o){if(UA(E),o!==o+0&&o!=="longjmp")throw o;oA(1,0)}},invoke_jiiii:function(A,B,g,E,o){var F=cA();try{return Ni(A,B,g,E,o)}catch(w){if(UA(F),w!==w+0&&w!=="longjmp")throw w;oA(1,0)}},invoke_v:function(A){var B=cA();try{mC(A)}catch(g){if(UA(B),g!==g+0&&g!=="longjmp")throw g;oA(1,0)}},invoke_vi:function(A,B){var g=cA();try{ZC(A,B)}catch(E){if(UA(g),E!==E+0&&E!=="longjmp")throw E;oA(1,0)}},invoke_vii:function(A,B,g){var E=cA();try{vC(A,B,g)}catch(o){if(UA(E),o!==o+0&&o!=="longjmp")throw o;oA(1,0)}},invoke_viii:function(A,B,g,E){var o=cA();try{qC(A,B,g,E)}catch(F){if(UA(o),F!==F+0&&F!=="longjmp")throw F;oA(1,0)}},invoke_viiii:function(A,B,g,E,o){var F=cA();try{OC(A,B,g,E,o)}catch(w){if(UA(F),w!==w+0&&w!=="longjmp")throw w;oA(1,0)}},invoke_viiiii:function(A,B,g,E,o,F){var w=cA();try{WC(A,B,g,E,o,F)}catch(t){if(UA(w),t!==t+0&&t!=="longjmp")throw t;oA(1,0)}},invoke_viiiiiii:function(A,B,g,E,o,F,w,t){var Y=cA();try{XC(A,B,g,E,o,F,w,t)}catch(a){if(UA(Y),a!==a+0&&a!=="longjmp")throw a;oA(1,0)}},invoke_viiiiiiiiii:function(A,B,g,E,o,F,w,t,Y,a,L){var S=cA();try{jC(A,B,g,E,o,F,w,t,Y,a,L)}catch(d){if(UA(S),d!==d+0&&d!=="longjmp")throw d;oA(1,0)}},invoke_viiiiiiiiiiiiiii:function(A,B,g,E,o,F,w,t,Y,a,L,S,d,q,r,P){var O=cA();try{zC(A,B,g,E,o,F,w,t,Y,a,L,S,d,q,r,P)}catch(h){if(UA(O),h!==h+0&&h!=="longjmp")throw h;oA(1,0)}},invoke_viiiijji:function(A,B,g,E,o,F,w,t,Y,a){var L=cA();try{TC(A,B,g,E,o,F,w,t,Y,a)}catch(S){if(UA(L),S!==S+0&&S!=="longjmp")throw S;oA(1,0)}},invoke_viijii:function(A,B,g,E,o,F,w){var t=cA();try{PC(A,B,g,E,o,F,w)}catch(Y){if(UA(t),Y!==Y+0&&Y!=="longjmp")throw Y;oA(1,0)}},invoke_viji:function(A,B,g,E,o){var F=cA();try{_C(A,B,g,E,o)}catch(w){if(UA(F),w!==w+0&&w!=="longjmp")throw w;oA(1,0)}},llvm_eh_typeid_for:function(A){return A},memory:sA,setTempRet0:function(A){CA=0|A},strftime_l:function(A,B,g,E){return function(o,F,w,t){function Y(h,m,_){for(h=typeof h=="number"?h.toString():h||"";h.length<m;)h=_[0]+h;return h}function a(h,m){return Y(h,m,"0")}function L(h,m){function _(vB){return 0>vB?-1:0<vB?1:0}var nA;return(nA=_(h.getFullYear()-m.getFullYear()))===0&&(nA=_(h.getMonth()-m.getMonth()))===0&&(nA=_(h.getDate()-m.getDate())),nA}function S(h){switch(h.getDay()){case 0:return new Date(h.getFullYear()-1,11,29);case 1:return h;case 2:return new Date(h.getFullYear(),0,3);case 3:return new Date(h.getFullYear(),0,2);case 4:return new Date(h.getFullYear(),0,1);case 5:return new Date(h.getFullYear()-1,11,31);case 6:return new Date(h.getFullYear()-1,11,30)}}function d(h){h=TI(new Date(h.C+1900,0,1),h.Ia);var m=new Date(h.getFullYear()+1,0,4),_=S(new Date(h.getFullYear(),0,4));return m=S(m),0>=L(_,h)?0>=L(m,h)?h.getFullYear()+1:h.getFullYear():h.getFullYear()-1}var q=M[t+40>>2];for(var r in t={uc:M[t>>2],tc:M[t+4>>2],Ga:M[t+8>>2],sa:M[t+12>>2],fa:M[t+16>>2],C:M[t+20>>2],Ha:M[t+24>>2],Ia:M[t+28>>2],Vc:M[t+32>>2],sc:M[t+36>>2],vc:q?tA(q):""},w=tA(w),q={"%c":"%a %b %d %H:%M:%S %Y","%D":"%m/%d/%y","%F":"%Y-%m-%d","%h":"%b","%r":"%I:%M:%S %p","%R":"%H:%M","%T":"%H:%M:%S","%x":"%m/%d/%y","%X":"%H:%M:%S","%Ec":"%c","%EC":"%C","%Ex":"%m/%d/%y","%EX":"%H:%M:%S","%Ey":"%y","%EY":"%Y","%Od":"%d","%Oe":"%e","%OH":"%H","%OI":"%I","%Om":"%m","%OM":"%M","%OS":"%S","%Ou":"%u","%OU":"%U","%OV":"%V","%Ow":"%w","%OW":"%W","%Oy":"%y"})w=w.replace(new RegExp(r,"g"),q[r]);var P="Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),O="January February March April May June July August September October November December".split(" ");for(r in q={"%a":function(h){return P[h.Ha].substring(0,3)},"%A":function(h){return P[h.Ha]},"%b":function(h){return O[h.fa].substring(0,3)},"%B":function(h){return O[h.fa]},"%C":function(h){return a((h.C+1900)/100|0,2)},"%d":function(h){return a(h.sa,2)},"%e":function(h){return Y(h.sa,2," ")},"%g":function(h){return d(h).toString().substring(2)},"%G":function(h){return d(h)},"%H":function(h){return a(h.Ga,2)},"%I":function(h){return(h=h.Ga)==0?h=12:12<h&&(h-=12),a(h,2)},"%j":function(h){return a(h.sa+AE(XI(h.C+1900)?jI:zI,h.fa-1),3)},"%m":function(h){return a(h.fa+1,2)},"%M":function(h){return a(h.tc,2)},"%n":function(){return`
`},"%p":function(h){return 0<=h.Ga&&12>h.Ga?"AM":"PM"},"%S":function(h){return a(h.uc,2)},"%t":function(){return"	"},"%u":function(h){return h.Ha||7},"%U":function(h){var m=new Date(h.C+1900,0,1),_=m.getDay()===0?m:TI(m,7-m.getDay());return 0>L(_,h=new Date(h.C+1900,h.fa,h.sa))?a(Math.ceil((31-_.getDate()+(AE(XI(h.getFullYear())?jI:zI,h.getMonth()-1)-31)+h.getDate())/7),2):L(_,m)===0?"01":"00"},"%V":function(h){var m=new Date(h.C+1901,0,4),_=S(new Date(h.C+1900,0,4));m=S(m);var nA=TI(new Date(h.C+1900,0,1),h.Ia);return 0>L(nA,_)?"53":0>=L(m,nA)?"01":a(Math.ceil((_.getFullYear()<h.C+1900?h.Ia+32-_.getDate():h.Ia+1-_.getDate())/7),2)},"%w":function(h){return h.Ha},"%W":function(h){var m=new Date(h.C,0,1),_=m.getDay()===1?m:TI(m,m.getDay()===0?1:7-m.getDay()+1);return 0>L(_,h=new Date(h.C+1900,h.fa,h.sa))?a(Math.ceil((31-_.getDate()+(AE(XI(h.getFullYear())?jI:zI,h.getMonth()-1)-31)+h.getDate())/7),2):L(_,m)===0?"01":"00"},"%y":function(h){return(h.C+1900).toString().substring(2)},"%Y":function(h){return h.C+1900},"%z":function(h){var m=0<=(h=h.sc);return h=Math.abs(h)/60,(m?"+":"-")+("0000"+(h/60*100+h%60)).slice(-4)},"%Z":function(h){return h.vc},"%%":function(){return"%"}})0<=w.indexOf(r)&&(w=w.replace(new RegExp(r,"g"),q[r](t)));return(r=_I(w,!1)).length>F?0:(MA.set(r,o),r.length-1)}(A,B,g,E)},table:p},uC=function(){function A(o){s.asm=o.exports,cQ()}function B(o){A(o.instance)}function g(o){return(IA||!e&&!u||typeof fetch!="function"||rB(TA,"file://")?new Promise(function(F){F(wC())}):fetch(TA,{credentials:"same-origin"}).then(function(F){if(!F.ok)throw"failed to load wasm binary file at '"+TA+"'";return F.arrayBuffer()}).catch(function(){return wC()})).then(function(F){return WebAssembly.instantiate(F,E)}).then(o,function(F){EA("failed to asynchronously prepare wasm: "+F),RA(F)})}var E={env:fC,wasi_snapshot_preview1:fC};if(uI(),s.instantiateWasm)try{return s.instantiateWasm(E,A)}catch(o){return EA("Module.instantiateWasm callback failed with error: "+o),!1}return function(){if(IA||typeof WebAssembly.instantiateStreaming!="function"||rB(TA,UQ)||rB(TA,"file://")||typeof fetch!="function")return g(B);fetch(TA,{credentials:"same-origin"}).then(function(o){return WebAssembly.instantiateStreaming(o,E).then(B,function(F){EA("wasm streaming compile failed: "+F),EA("falling back to ArrayBuffer instantiation"),g(B)})})}(),{}}();s.asm=uC;var pC=s.___wasm_call_ctors=function(){return(pC=s.___wasm_call_ctors=s.asm.__wasm_call_ctors).apply(null,arguments)},EI=s._malloc=function(){return(EI=s._malloc=s.asm.malloc).apply(null,arguments)},PA=s._free=function(){return(PA=s._free=s.asm.free).apply(null,arguments)},xC=s.___errno_location=function(){return(xC=s.___errno_location=s.asm.__errno_location).apply(null,arguments)},oA=s._setThrew=function(){return(oA=s._setThrew=s.asm.setThrew).apply(null,arguments)},eQ=s.__ZSt18uncaught_exceptionv=function(){return(eQ=s.__ZSt18uncaught_exceptionv=s.asm._ZSt18uncaught_exceptionv).apply(null,arguments)},CI=s.___cxa_can_catch=function(){return(CI=s.___cxa_can_catch=s.asm.__cxa_can_catch).apply(null,arguments)},iI=s.___cxa_is_pointer_type=function(){return(iI=s.___cxa_is_pointer_type=s.asm.__cxa_is_pointer_type).apply(null,arguments)},bC=s.___getTypeName=function(){return(bC=s.___getTypeName=s.asm.__getTypeName).apply(null,arguments)};s.___embind_register_native_and_builtin_types=function(){return(s.___embind_register_native_and_builtin_types=s.asm.__embind_register_native_and_builtin_types).apply(null,arguments)};var mC=s.dynCall_v=function(){return(mC=s.dynCall_v=s.asm.dynCall_v).apply(null,arguments)},ZC=s.dynCall_vi=function(){return(ZC=s.dynCall_vi=s.asm.dynCall_vi).apply(null,arguments)},vC=s.dynCall_vii=function(){return(vC=s.dynCall_vii=s.asm.dynCall_vii).apply(null,arguments)},qC=s.dynCall_viii=function(){return(qC=s.dynCall_viii=s.asm.dynCall_viii).apply(null,arguments)},OC=s.dynCall_viiii=function(){return(OC=s.dynCall_viiii=s.asm.dynCall_viiii).apply(null,arguments)},WC=s.dynCall_viiiii=function(){return(WC=s.dynCall_viiiii=s.asm.dynCall_viiiii).apply(null,arguments)},XC=s.dynCall_viiiiiii=function(){return(XC=s.dynCall_viiiiiii=s.asm.dynCall_viiiiiii).apply(null,arguments)},jC=s.dynCall_viiiiiiiiii=function(){return(jC=s.dynCall_viiiiiiiiii=s.asm.dynCall_viiiiiiiiii).apply(null,arguments)},zC=s.dynCall_viiiiiiiiiiiiiii=function(){return(zC=s.dynCall_viiiiiiiiiiiiiii=s.asm.dynCall_viiiiiiiiiiiiiii).apply(null,arguments)},TC=s.dynCall_viiiijji=function(){return(TC=s.dynCall_viiiijji=s.asm.dynCall_viiiijji).apply(null,arguments)},PC=s.dynCall_viijii=function(){return(PC=s.dynCall_viijii=s.asm.dynCall_viijii).apply(null,arguments)},_C=s.dynCall_viji=function(){return(_C=s.dynCall_viji=s.asm.dynCall_viji).apply(null,arguments)},$C=s.dynCall_i=function(){return($C=s.dynCall_i=s.asm.dynCall_i).apply(null,arguments)},Ai=s.dynCall_ii=function(){return(Ai=s.dynCall_ii=s.asm.dynCall_ii).apply(null,arguments)},Bi=s.dynCall_iii=function(){return(Bi=s.dynCall_iii=s.asm.dynCall_iii).apply(null,arguments)},Qi=s.dynCall_iiii=function(){return(Qi=s.dynCall_iiii=s.asm.dynCall_iiii).apply(null,arguments)},Ii=s.dynCall_iiiii=function(){return(Ii=s.dynCall_iiiii=s.asm.dynCall_iiiii).apply(null,arguments)},gi=s.dynCall_iiiiii=function(){return(gi=s.dynCall_iiiiii=s.asm.dynCall_iiiiii).apply(null,arguments)},Ei=s.dynCall_iiiiiii=function(){return(Ei=s.dynCall_iiiiiii=s.asm.dynCall_iiiiiii).apply(null,arguments)},Ci=s.dynCall_iiiiiiii=function(){return(Ci=s.dynCall_iiiiiiii=s.asm.dynCall_iiiiiiii).apply(null,arguments)},ii=s.dynCall_iiiiiiiiiii=function(){return(ii=s.dynCall_iiiiiiiiiii=s.asm.dynCall_iiiiiiiiiii).apply(null,arguments)},Di=s.dynCall_iiiiiiiiiiii=function(){return(Di=s.dynCall_iiiiiiiiiiii=s.asm.dynCall_iiiiiiiiiiii).apply(null,arguments)},oi=s.dynCall_iiiiiiiiiiiii=function(){return(oi=s.dynCall_iiiiiiiiiiiii=s.asm.dynCall_iiiiiiiiiiiii).apply(null,arguments)},yi=s.dynCall_iiiiij=function(){return(yi=s.dynCall_iiiiij=s.asm.dynCall_iiiiij).apply(null,arguments)},si=s.dynCall_iiiiid=function(){return(si=s.dynCall_iiiiid=s.asm.dynCall_iiiiid).apply(null,arguments)},Fi=s.dynCall_iiijiiiiii=function(){return(Fi=s.dynCall_iiijiiiiii=s.asm.dynCall_iiijiiiiii).apply(null,arguments)},ci=s.dynCall_iij=function(){return(ci=s.dynCall_iij=s.asm.dynCall_iij).apply(null,arguments)},Ui=s.dynCall_iif=function(){return(Ui=s.dynCall_iif=s.asm.dynCall_iif).apply(null,arguments)},wi=s.dynCall_jii=function(){return(wi=s.dynCall_jii=s.asm.dynCall_jii).apply(null,arguments)},Ni=s.dynCall_jiiii=function(){return(Ni=s.dynCall_jiiii=s.asm.dynCall_jiiii).apply(null,arguments)},Hi=s.dynCall_fiii=function(){return(Hi=s.dynCall_fiii=s.asm.dynCall_fiii).apply(null,arguments)},Gi=s.dynCall_diii=function(){return(Gi=s.dynCall_diii=s.asm.dynCall_diii).apply(null,arguments)},cA=s.stackSave=function(){return(cA=s.stackSave=s.asm.stackSave).apply(null,arguments)};s.stackAlloc=function(){return(s.stackAlloc=s.asm.stackAlloc).apply(null,arguments)};var DI,UA=s.stackRestore=function(){return(UA=s.stackRestore=s.asm.stackRestore).apply(null,arguments)};function BE(){function A(){if(!DI&&(DI=!0,s.calledRun=!0,!AA)){if(s.noFSInit||i.ka.Qa||i.ka(),kB(UB),i.ub=!1,kB(KI),s.onRuntimeInitialized&&s.onRuntimeInitialized(),s.postRun)for(typeof s.postRun=="function"&&(s.postRun=[s.postRun]);s.postRun.length;){var B=s.postRun.shift();fI.unshift(B)}kB(fI)}}if(!(0<JA)){if(s.preRun)for(typeof s.preRun=="function"&&(s.preRun=[s.preRun]);s.preRun.length;)mg();kB($Q),0<JA||(s.setStatus?(s.setStatus("Running..."),setTimeout(function(){setTimeout(function(){s.setStatus("")},1),A()},1)):A())}}if(s.__growWasmMemory=function(){return(s.__growWasmMemory=s.asm.__growWasmMemory).apply(null,arguments)},s.dynCall_iiijij=function(){return(s.dynCall_iiijij=s.asm.dynCall_iiijij).apply(null,arguments)},s.dynCall_jiji=function(){return(s.dynCall_jiji=s.asm.dynCall_jiji).apply(null,arguments)},s.dynCall_iidiiii=function(){return(s.dynCall_iidiiii=s.asm.dynCall_iidiiii).apply(null,arguments)},s.dynCall_iiiiiiiii=function(){return(s.dynCall_iiiiiiiii=s.asm.dynCall_iiiiiiiii).apply(null,arguments)},s.dynCall_iiiiijj=function(){return(s.dynCall_iiiiijj=s.asm.dynCall_iiiiijj).apply(null,arguments)},s.dynCall_iiiiiijj=function(){return(s.dynCall_iiiiiijj=s.asm.dynCall_iiiiiijj).apply(null,arguments)},s.dynCall_viiiiii=function(){return(s.dynCall_viiiiii=s.asm.dynCall_viiiiii).apply(null,arguments)},s.asm=uC,s.FS=i,s.then=function(A){if(DI)A(s);else{var B=s.onRuntimeInitialized;s.onRuntimeInitialized=function(){B&&B(),A(s)}}return s},mB=function A(){DI||BE(),DI||(mB=A)},s.run=BE,s.preInit)for(typeof s.preInit=="function"&&(s.preInit=[s.preInit]);0<s.preInit.length;)s.preInit.pop()();return BE(),G});Q.exports=N}).call(this,"/index.js","/")},function(Q,I,C){C.r(I),C.d(I,"createH264MP4Encoder",function(){return G});var y=C(1),D=function(s,R,n,e){return new(n||(n=Promise))(function(u,v){function K(j){try{J(e.next(j))}catch(z){v(z)}}function x(j){try{J(e.throw(j))}catch(z){v(z)}}function J(j){var z;j.done?u(j.value):(z=j.value,z instanceof n?z:new n(function(QA){QA(z)})).then(K,x)}J((e=e.apply(s,[])).next())})};const U=C.n(y)()(),N=new Promise(s=>{U.then(()=>{s()})}),G=()=>D(void 0,void 0,void 0,function*(){yield N;const s=new U.H264MP4Encoder;return s.FS=U.FS,s})},function(Q,I){Q.exports=CE},function(Q,I){Q.exports=CE}]);const Xy=li(Wy),lQ=class lQ extends zQ{constructor(I){super({...lQ.defaultOptions,...I})}async init(I){super.init(I),this.encoder=await Xy.createH264MP4Encoder(),Object.assign(this.encoder,{width:fg(this.width,2),height:fg(this.height,2),frameRate:this.frameRate,kbps:rD(this.width,this.height,this.frameRate)/1e3,debug:this.debug,...this.encoderOptions}),this.encoder.initialize()}async start(){await super.start(),this.step()}encode(I){this.encoder.addFrameRgba(I)}stop(){return this.encoder.finalize(),this.encoder.FS.readFile(this.encoder.outputFilename)}dispose(){this.encoder.delete(),this.encoder=null}};fA(lQ,"supportedExtensions",["mp4"]),fA(lQ,"defaultOptions",{extension:lQ.supportedExtensions[0],frameMethod:"imageData"});let dE=lQ;var jy={signature:"GIF",version:"89a",trailer:59,extensionIntroducer:33,applicationExtensionLabel:255,graphicControlExtensionLabel:249,imageSeparator:44,signatureSize:3,versionSize:3,globalColorTableFlagMask:128,colorResolutionMask:112,sortFlagMask:8,globalColorTableSizeMask:7,applicationIdentifierSize:8,applicationAuthCodeSize:3,disposalMethodMask:28,userInputFlagMask:2,transparentColorFlagMask:1,localColorTableFlagMask:128,interlaceFlagMask:64,idSortFlagMask:32,localColorTableSizeMask:7};function MD(Q=256){let I=0,C=new Uint8Array(Q);return{get buffer(){return C.buffer},reset(){I=0},bytesView(){return C.subarray(0,I)},bytes(){return C.slice(0,I)},writeByte(D){y(I+1),C[I]=D,I++},writeBytes(D,U=0,N=D.length){y(I+N);for(let G=0;G<N;G++)C[I++]=D[G+U]},writeBytesView(D,U=0,N=D.byteLength){y(I+N),C.set(D.subarray(U,U+N),I),I+=N}};function y(D){var U=C.length;if(U>=D)return;var N=1024*1024;D=Math.max(D,U*(U<N?2:1.125)>>>0),U!=0&&(D=Math.max(D,256));let G=C;C=new Uint8Array(D),I>0&&C.set(G.subarray(0,I),0)}}var iE=12,ri=5003,zy=[0,1,3,7,15,31,63,127,255,511,1023,2047,4095,8191,16383,32767,65535];function Ty(Q,I,C,y,D=MD(512),U=new Uint8Array(256),N=new Int32Array(ri),G=new Int32Array(ri)){let s=N.length,R=Math.max(2,y);U.fill(0),G.fill(0),N.fill(-1);let n=0,e=0,u=R+1,v=u,K=!1,x=v,J=(1<<x)-1,j=1<<u-1,z=j+1,QA=j+2,T=0,wA=C[0],EA=0;for(let sA=s;sA<65536;sA*=2)++EA;EA=8-EA,D.writeByte(R),CA(j);let IA=C.length;for(let sA=1;sA<IA;sA++)A:{let p=C[sA],AA=(p<<iE)+wA,iA=p<<EA^wA;if(N[iA]===AA){wA=G[iA];break A}let eA=iA===0?1:s-iA;for(;N[iA]>=0;)if(iA-=eA,iA<0&&(iA+=s),N[iA]===AA){wA=G[iA];break A}CA(wA),wA=p,QA<1<<iE?(G[iA]=QA++,N[iA]=AA):(N.fill(-1),QA=j+2,K=!0,CA(j))}return CA(wA),CA(z),D.writeByte(0),D.bytesView();function CA(sA){for(n&=zy[e],e>0?n|=sA<<e:n=sA,e+=x;e>=8;)U[T++]=n&255,T>=254&&(D.writeByte(T),D.writeBytesView(U,0,T),T=0),n>>=8,e-=8;if((QA>J||K)&&(K?(x=v,J=(1<<x)-1,K=!1):(++x,J=x===iE?1<<x:(1<<x)-1)),sA==z){for(;e>0;)U[T++]=n&255,T>=254&&(D.writeByte(T),D.writeBytesView(U,0,T),T=0),n>>=8,e-=8;T>0&&(D.writeByte(T),D.writeBytesView(U,0,T),T=0)}}}var Py=Ty;function JD(Q,I,C){return Q<<8&63488|I<<2&992|C>>3}function dD(Q,I,C,y){return Q>>4|I&240|(C&240)<<4|(y&240)<<8}function lD(Q,I,C){return Q>>4<<8|I&240|C>>4}function Ag(Q,I,C){return Q<I?I:Q>C?C:Q}function ag(Q){return Q*Q}function Mi(Q,I,C){var y=0,D=1e100;let U=Q[I],N=U.cnt;U.ac;let G=U.rc,s=U.gc,R=U.bc;for(var n=U.fw;n!=0;n=Q[n].fw){let u=Q[n],v=u.cnt,K=N*v/(N+v);if(!(K>=D)){var e=0;e+=K*ag(u.rc-G),!(e>=D)&&(e+=K*ag(u.gc-s),!(e>=D)&&(e+=K*ag(u.bc-R),!(e>=D)&&(D=e,y=n)))}}U.err=D,U.nn=y}function DE(){return{ac:0,rc:0,gc:0,bc:0,cnt:0,nn:0,fw:0,bk:0,tm:0,mtm:0,err:0}}function _y(Q,I){let C=I==="rgb444"?4096:65536,y=new Array(C),D=Q.length;if(I==="rgba4444")for(let U=0;U<D;++U){let N=Q[U],G=N>>24&255,s=N>>16&255,R=N>>8&255,n=N&255,e=dD(n,R,s,G),u=e in y?y[e]:y[e]=DE();u.rc+=n,u.gc+=R,u.bc+=s,u.ac+=G,u.cnt++}else if(I==="rgb444")for(let U=0;U<D;++U){let N=Q[U],G=N>>16&255,s=N>>8&255,R=N&255,n=lD(R,s,G),e=n in y?y[n]:y[n]=DE();e.rc+=R,e.gc+=s,e.bc+=G,e.cnt++}else for(let U=0;U<D;++U){let N=Q[U],G=N>>16&255,s=N>>8&255,R=N&255,n=JD(R,s,G),e=n in y?y[n]:y[n]=DE();e.rc+=R,e.gc+=s,e.bc+=G,e.cnt++}return y}function $y(Q,I,C={}){let{format:y="rgb565",clearAlpha:D=!0,clearAlphaColor:U=0,clearAlphaThreshold:N=0,oneBitAlpha:G=!1}=C;if(!Q||!Q.buffer)throw new Error("quantize() expected RGBA Uint8Array data");if(!(Q instanceof Uint8Array)&&!(Q instanceof Uint8ClampedArray))throw new Error("quantize() expected RGBA Uint8Array data");let s=new Uint32Array(Q.buffer),R=C.useSqrt!==!1,n=y==="rgba4444",e=_y(s,y),u=e.length,v=u-1,K=new Uint32Array(u+1);for(var x=0,J=0;J<u;++J){let FA=e[J];if(FA!=null){var j=1/FA.cnt;n&&(FA.ac*=j),FA.rc*=j,FA.gc*=j,FA.bc*=j,e[x++]=FA}}ag(I)/x<.022&&(R=!1);for(var J=0;J<x-1;++J)e[J].fw=J+1,e[J+1].bk=J,R&&(e[J].cnt=Math.sqrt(e[J].cnt));R&&(e[J].cnt=Math.sqrt(e[J].cnt));var z,QA,T;for(J=0;J<x;++J){Mi(e,J);var wA=e[J].err;for(QA=++K[0];QA>1&&(T=QA>>1,!(e[z=K[T]].err<=wA));QA=T)K[QA]=z;K[QA]=J}var EA=x-I;for(J=0;J<EA;){for(var IA;;){var CA=K[1];if(IA=e[CA],IA.tm>=IA.mtm&&e[IA.nn].mtm<=IA.tm)break;IA.mtm==v?CA=K[1]=K[K[0]--]:(Mi(e,CA),IA.tm=J);var wA=e[CA].err;for(QA=1;(T=QA+QA)<=K[0]&&(T<K[0]&&e[K[T]].err>e[K[T+1]].err&&T++,!(wA<=e[z=K[T]].err));QA=T)K[QA]=z;K[QA]=CA}var sA=e[IA.nn],p=IA.cnt,AA=sA.cnt,j=1/(p+AA);n&&(IA.ac=j*(p*IA.ac+AA*sA.ac)),IA.rc=j*(p*IA.rc+AA*sA.rc),IA.gc=j*(p*IA.gc+AA*sA.gc),IA.bc=j*(p*IA.bc+AA*sA.bc),IA.cnt+=sA.cnt,IA.mtm=++J,e[sA.bk].fw=sA.fw,e[sA.fw].bk=sA.bk,sA.mtm=v}let iA=[];var eA=0;for(J=0;;++eA){let FA=Ag(Math.round(e[J].rc),0,255),tA=Ag(Math.round(e[J].gc),0,255),LA=Ag(Math.round(e[J].bc),0,255),aA=255;n&&(aA=Ag(Math.round(e[J].ac),0,255),G&&(aA=aA<=(typeof G=="number"?G:127)?0:255),D&&aA<=N&&(FA=tA=LA=U,aA=0));let XA=n?[FA,tA,LA,aA]:[FA,tA,LA];if(As(iA,XA)||iA.push(XA),(J=e[J].fw)==0)break}return iA}function As(Q,I){for(let C=0;C<Q.length;C++){let y=Q[C],D=y[0]===I[0]&&y[1]===I[1]&&y[2]===I[2],U=y.length>=4&&I.length>=4?y[3]===I[3]:!0;if(D&&U)return!0}return!1}function Bs(Q,I,C="rgb565"){if(!Q||!Q.buffer)throw new Error("quantize() expected RGBA Uint8Array data");if(!(Q instanceof Uint8Array)&&!(Q instanceof Uint8ClampedArray))throw new Error("quantize() expected RGBA Uint8Array data");if(I.length>256)throw new Error("applyPalette() only works with 256 colors or less");let y=new Uint32Array(Q.buffer),D=y.length,U=C==="rgb444"?4096:65536,N=new Uint8Array(D),G=new Array(U);if(C==="rgba4444")for(let s=0;s<D;s++){let R=y[s],n=R>>24&255,e=R>>16&255,u=R>>8&255,v=R&255,K=dD(v,u,e,n),x=K in G?G[K]:G[K]=Qs(v,u,e,n,I);N[s]=x}else{let s=C==="rgb444"?lD:JD;for(let R=0;R<D;R++){let n=y[R],e=n>>16&255,u=n>>8&255,v=n&255,K=s(v,u,e),x=K in G?G[K]:G[K]=Is(v,u,e,I);N[R]=x}}return N}function Qs(Q,I,C,y,D){let U=0,N=1e100;for(let G=0;G<D.length;G++){let s=D[G],R=s[3],n=EQ(R-y);if(n>N)continue;let e=s[0];if(n+=EQ(e-Q),n>N)continue;let u=s[1];if(n+=EQ(u-I),n>N)continue;let v=s[2];n+=EQ(v-C),!(n>N)&&(N=n,U=G)}return U}function Is(Q,I,C,y){let D=0,U=1e100;for(let N=0;N<y.length;N++){let G=y[N],s=G[0],R=EQ(s-Q);if(R>U)continue;let n=G[1];if(R+=EQ(n-I),R>U)continue;let e=G[2];R+=EQ(e-C),!(R>U)&&(U=R,D=N)}return D}function EQ(Q){return Q*Q}function gs(Q={}){let{initialCapacity:I=4096,auto:C=!0}=Q,y=MD(I),D=5003,U=new Uint8Array(256),N=new Int32Array(D),G=new Int32Array(D),s=!1;return{reset(){y.reset(),s=!1},finish(){y.writeByte(jy.trailer)},bytes(){return y.bytes()},bytesView(){return y.bytesView()},get buffer(){return y.buffer},get stream(){return y},writeHeader:R,writeFrame(n,e,u,v={}){let{transparent:K=!1,transparentIndex:x=0,delay:J=0,palette:j=null,repeat:z=0,colorDepth:QA=8,dispose:T=-1}=v,wA=!1;if(C?s||(wA=!0,R(),s=!0):wA=!!v.first,e=Math.max(0,Math.floor(e)),u=Math.max(0,Math.floor(u)),wA){if(!j)throw new Error("First frame must include a { palette } option");Cs(y,e,u,j,QA),Ji(y,j),z>=0&&is(y,z)}let EA=Math.round(J/10);Es(y,T,EA,K,x);let IA=!!j&&!wA;Ds(y,e,u,IA?j:null),IA&&Ji(y,j),os(y,n,e,u,QA,U,N,G)}};function R(){VD(y,"GIF89a")}}function Es(Q,I,C,y,D){Q.writeByte(33),Q.writeByte(249),Q.writeByte(4),D<0&&(D=0,y=!1);var U,N;y?(U=1,N=2):(U=0,N=0),I>=0&&(N=I&7),N<<=2,Q.writeByte(0|N|0|U),uB(Q,C),Q.writeByte(D||0),Q.writeByte(0)}function Cs(Q,I,C,y,D=8){let U=1,N=0,G=FC(y.length)-1,s=U<<7|D-1<<4|N<<3|G;uB(Q,I),uB(Q,C),Q.writeBytes([s,0,0])}function is(Q,I){Q.writeByte(33),Q.writeByte(255),Q.writeByte(11),VD(Q,"NETSCAPE2.0"),Q.writeByte(3),Q.writeByte(1),uB(Q,I),Q.writeByte(0)}function Ji(Q,I){let C=1<<FC(I.length);for(let y=0;y<C;y++){let D=[0,0,0];y<I.length&&(D=I[y]),Q.writeByte(D[0]),Q.writeByte(D[1]),Q.writeByte(D[2])}}function Ds(Q,I,C,y){if(Q.writeByte(44),uB(Q,0),uB(Q,0),uB(Q,I),uB(Q,C),y){let D=0,U=0,N=FC(y.length)-1;Q.writeByte(128|D|U|0|N)}else Q.writeByte(0)}function os(Q,I,C,y,D=8,U,N,G){Py(C,y,I,D,Q,U,N,G)}function uB(Q,I){Q.writeByte(I&255),Q.writeByte(I>>8&255)}function VD(Q,I){for(var C=0;C<I.length;C++)Q.writeByte(I.charCodeAt(C))}function FC(Q){return Math.max(Math.ceil(Math.log2(Q)),1)}const VQ=class VQ extends zQ{constructor(I){super({...VQ.defaultOptions,...I})}async init(I){super.init(I),this.encoder=gs()}async start(){await super.start(),this.step()}encode(I){const C=$y(I,this.maxColors,this.quantizeOptions),y=Bs(I,C,this.quantizeOptions.format);this.encoder.writeFrame(y,this.width,this.height,{palette:C,delay:1/this.frameRate*1e3,...this.encoderOptions})}stop(){this.encoder.finish();const I=this.encoder.bytes();return this.encoder.reset(),I}dispose(){this.encoder=null}};fA(VQ,"supportedExtensions",["gif"]),fA(VQ,"defaultOptions",{extension:VQ.supportedExtensions[0],frameMethod:"imageData",maxColors:256,quantizeOptions:{format:"rgb565",oneBitAlpha:!1,clearAlpha:!0,clearAlphaThreshold:0,clearAlphaColor:0}});let lE=VQ;const gQ=class gQ extends zQ{constructor(I){super({...gQ.defaultOptions,...I})}async init(I){super.init(I),this.target==="file-system"&&(this.directory||(this.directory=await this.getDirectory()),this.directoryHandle=await this.getDirectoryHandle(this.directory,this.filename))}async writeFile(I,C){try{if(this.directoryHandle){const y=await this.getFileHandle(I),D=await this.getWritableFileStream(y);await D.write(C),await D.close()}else SD(I,[C],this.mimeType),await new Promise(y=>setTimeout(y,100))}catch(y){console.error(y)}}async encode(I,C){await this.writeFile(`${`${C}`.padStart(5,"0")}.${this.extension}`,I)}};fA(gQ,"supportedExtensions",["png","jpg"]),fA(gQ,"supportedTargets",["in-browser","file-system"]),fA(gQ,"defaultOptions",{extension:gQ.supportedExtensions[0],frameMethod:"blob"});let VE=gQ;const _A=Object.freeze({Ready:0,Initializing:1,Recording:2,Stopping:3,Stopped:4});var hB,_B;const KQ=class KQ{constructor(I,C={}){hi(this,hB);this.context=I;const y={...KQ.defaultOptions,...C};Object.assign(this,y),this.encoder||(this.extension==="gif"?this.encoder=new lE(y):["png","jpg"].includes(this.extension)?this.encoder=new VE(y):this.encoder=Zy?new JE(y):new dE(y)),OB(this,hB,_B).call(this,_A.Ready)}set width(I){this.encoder.width=I}set height(I){this.encoder.height=I}get width(){return this.context.drawingBufferWidth||this.context.canvas.width}get height(){return this.context.drawingBufferHeight||this.context.canvas.height}get stats(){if(this.status!==_A.Recording)return;const I=(Date.now()-this.startTime.getTime())/1e3,C=I/this.frame;return{renderTime:I,secondsPerFrame:C,detail:`Time: ${this.time.toFixed(2)} / ${this.duration.toFixed(2)}
Frame: ${this.frame} / ${this.frameTotal}
Elapsed Time: ${Si(I)}
Remaining Time: ${Si(C*this.frameTotal-I)}
Speedup: x${(this.time/I).toFixed(3)}`}}getParamString(){return`${this.width}x${this.height}@${this.frameRate}fps`}getDefaultFileName(I){return`${[this.name,vy(this.startTime),this.getParamString()].filter(Boolean).join("-")}.${I}`}getSupportedExtension(){const I=this.encoder.constructor,C=I.supportedExtensions.includes(this.extension),y=C?this.extension:I.supportedExtensions[0];return C||console.warn(`canvas-record: unsupported extension for encoder "${I.name}". Defaulting to "${y}".`),y}getSupportedTarget(){const I=this.encoder.constructor;let C=I.supportedTargets.includes(this.target);this.target==="file-system"&&!("showSaveFilePicker"in window)&&(C=!1);const y=C?this.target:I.supportedTargets[0];return C||console.warn(`canvas-record: unsupported target for encoder "${I.name}". Defaulting to "${y}".`),y}async init({filename:I}={}){OB(this,hB,_B).call(this,_A.Initializing),this.deltaTime=1/this.frameRate,this.time=0,this.frame=0,this.frameTotal=this.duration*this.frameRate;const C=this.getSupportedExtension(),y=this.getSupportedTarget();this.startTime=new Date,this.filename=I||this.getDefaultFileName(C),await this.encoder.init({encoderOptions:this.encoderOptions,muxerOptions:this.muxerOptions,canvas:this.context.canvas,width:this.width,height:this.height,frameRate:this.frameRate,extension:C,target:y,mimeType:KQ.mimeTypes[C],filename:this.filename,debug:this.debug}),OB(this,hB,_B).call(this,_A.Initialized)}async start(I={}){if(await this.init(I),this.status!==_A.Initialized){console.debug("canvas-record: recorder not initialized.");return}OB(this,hB,_B).call(this,_A.Recording),I.initOnly||await this.step()}async getFrame(I){switch(I){case"bitmap":return await createImageBitmap(this.context.canvas);case"videoFrame":return new VideoFrame(this.context.canvas,{timestamp:this.time*1e6});case"requestFrame":return;case"imageData":{if(this.context.drawingBufferWidth){const C=this.context.drawingBufferWidth,y=this.context.drawingBufferHeight,D=C*y*4,U=new Uint8Array(D),N=new Uint8Array(D);this.context.readPixels(0,0,C,y,this.context.RGBA,this.context.UNSIGNED_BYTE,U);const G=C*4,s=(y-1)*G;for(let R=0;R<D;R+=G)N.set(U.subarray(R,R+G),s-R);return N}return this.context.getImageData(0,0,fg(this.width,2),fg(this.height,2)).data}default:return await Eo(this.context.canvas,{useBlob:!0,download:!1,filename:`output.${this.encoder.extension}`})}}async step(){this.status===_A.Recording&&this.frame<this.frameTotal?(await this.encoder.encode(await this.getFrame(this.encoder.frameMethod),this.frame),this.time+=this.deltaTime,this.frame++):await this.stop()}async stop(){if(this.status!==_A.Recording)return;OB(this,hB,_B).call(this,_A.Stopping);const I=await this.encoder.stop();return this.download&&I&&SD(this.filename,Array.isArray(I)?I:[I],this.encoder.mimeType),OB(this,hB,_B).call(this,_A.Stopped),I}async dispose(){await this.encoder.dispose()}};hB=new WeakSet,_B=function(I){this.status=I,this.onStatusChange(this.status)},fA(KQ,"defaultOptions",{name:"",duration:10,frameRate:30,download:!0,extension:"mp4",target:"in-browser",onStatusChange:()=>{}}),fA(KQ,"mimeTypes",{mkv:"video/x-matroska;codecs=avc1",webm:"video/webm",mp4:"video/mp4",gif:"image/gif"});let KE=KQ;async function ys(Q,I,C,y){const D=Q.getContext("webgl2");let U=null,N=!1,G=0,s=60*3;const R=async n=>{if(C.recording&&(N=!0,y.render=1,C.recording=!1,C.progress=0,typeof VideoEncoder>"u")){alert("Looks like your user agent doesn't support VideoEncoder / WebCodecs API yet.");return}G>s&&(N=!1,console.log("RENDER END"),y.render=0),I(n),N&&U==null&&(console.log("Recording started"),U=new KE(D,{name:"thk",frameRate:60,duration:100,encoderOptions:{codec:kD({profile:"Main",level:"5.2"})},download:!1}),U.start({initOnly:!0}),G=0),!N&&U!=null&&(U.stop().then(e=>{const u=[new File([e],"thk-sync.mp4",{type:"video/mp4"})],v=document.getElementById("butt-download");v.onclick=()=>{navigator.share({files:u})},U=null,C.callback()}),y.render=0,G=0),C.progress=0,U!=null&&(U.status!==_A.Recording||(G>0&&await U.step(),G++,C.progress=G/s)),requestAnimationFrame(R)};return requestAnimationFrame(R),C}const eB={restrict_loc:!0,center_x:-8.630436666894104,center_y:115.09447416252982,radius:.016,dev_send:!1,show_len:3e3,show_time:null},ug={recording:!1,progress:0,callback:null},ZA={seed:0,speed:.1,val1:Math.random()*100,val2:Math.random()*100,tx:Math.random()*100,ty:Math.random()*100,val1a:0,val1b:0,val2a:0,val2b:0,val3a:0,val3b:0,val4a:0,val4b:0,render:0},qA={hijack1:!1,x1:0,y1:0,hijack_arrow:!1};async function ss(){const Q={avaliable:!1,inside:!1,latitude:0,longitude:0};if(navigator.geolocation){Q.avaliable=!0,console.log("Geolocation avaliable");try{const I=await new Promise((s,R)=>{navigator.geolocation.getCurrentPosition(s,R)}),C=I.coords.latitude,y=I.coords.longitude;console.log(`Latitude: ${C}, Longitude: ${y}`);let D=eB.center_x,U=eB.center_y,N=eB.radius,G=Math.sqrt((C-D)*(C-D)+(y-U)*(y-U))<N;Q.inside=G,Q.latitude=C,Q.longitude=y,Q.inside?(console.log("Inside THK area"),document.getElementById("text-info").innerHTML="LOCATION: INSIDE"):(console.log("Outside THK area"),document.getElementById("text-info").innerHTML="LOCATION: OUTSIDE")}catch(I){console.error("Error retrieving location:",I),Q.avaliable=!1}}return Q}function Fs(){const Q=document.getElementById("canvas-ui"),I=Q.getContext("2d"),C=document.getElementById("canvas-thk"),y=document.getElementById("slider-color"),D=document.getElementById("slider-shape");function U(p,AA){qA.hijack1=!1}y.addEventListener("touchstart",p=>{U()}),D.addEventListener("touchstart",p=>{U()});function N(p){let AA=p.clientX,iA=p.clientY;p.touches&&(AA=p.touches[0].clientX,iA=p.touches[0].clientY);const eA=Q.getBoundingClientRect();return AA-=eA.left,iA-=eA.top,{x:AA,y:iA}}function G(p){let AA=0,iA=0;const eA=p.id;eA=="slider-color"?(AA=2,iA=0):eA=="slider-shape"&&(AA=3,iA=1);let FA=!1,tA=!1,LA=0,aA=0,XA=0,MA=Math.random()*100,YA=MA,jA=0,LB=jA;AA==1?(MA=.5,YA=.5):(MA=Math.random()*100,YA=MA);const M="val"+(AA+1)+"a";ZA[M]=YA;const zA="val"+(AA+1)+"b";ZA[zA]=jA,Q.getBoundingClientRect();let VA=p.getBoundingClientRect().left,KA=p.getBoundingClientRect().top;function PQ(QB){QB.preventDefault(),FA=!0,bB(QB)}function RB(QB){FA&&(QB.preventDefault(),FA=!1)}function bB(QB){if(!FA)return;const yQ=N(QB);LA=yQ.x,aA=yQ.y}function bg(){let QB=window.getComputedStyle(p).opacity;if(VA=p.getBoundingClientRect().left+p.clientWidth/2,KA=p.getBoundingClientRect().top+p.clientHeight/2,tA=FA,qA.hijack1){tA=!0;let HA=parseFloat(qA.x1);iA&&(HA=-HA),HA=(HA*.25-.5)*Math.PI;let xA=parseFloat(qA.y1);LA=VA+Math.cos(HA)*(xA+.001),aA=KA+Math.sin(HA)*(xA+.001)}let yQ=C.width,nB=Math.sqrt((LA-VA)*(LA-VA)+(aA-KA)*(aA-KA)),_Q=nB/yQ,sQ=(LA-VA)/nB,kB=(aA-KA)/nB,$Q=Math.atan2(kB,sQ),UB=$Q-XA;UB>Math.PI&&(UB-=Math.PI*2),UB<-Math.PI&&(UB+=Math.PI*2),UB*=Math.pow(_Q,1.3)*3,tA&&(YA+=UB,LB=Math.min(Math.max(0,_Q),1)),XA=$Q;let KI=YA*2,fI=KI-Math.min(1,LB)*Math.PI*.9,mg=KI+Math.min(1,LB)*Math.PI*.9,FQ=p.clientWidth/2,SB=FQ*.1,IB=FQ-SB/2+12,gB=IB*.75,JA=QB;I.lineWidth=SB,I.lineCap="round",I.strokeStyle="rgba(255, 255, 255, "+.6*JA+")",I.beginPath(),I.arc(VA,KA,IB,fI,mg),I.stroke(),I.lineWidth=1,I.strokeStyle="rgba(255, 255, 255, "+.2*JA+")",I.beginPath(),I.arc(VA,KA,IB+SB/2,0,Math.PI*2),I.stroke();let mB=.05,uI=.05;function cQ(HA,xA,UQ){return HA+(xA-HA)*UQ}const RA="val"+(AA+1)+"a",rB="val"+(AA+1)+"b";ZA[RA]=cQ(ZA[RA],YA,mB),ZA[rB]=cQ(ZA[rB],LB,uI),AA==1&&(ZA.speed=ZA[RA]),tA?(I.strokeStyle="rgba(255, 255, 255, "+.3*JA+")",I.beginPath(),I.arc(VA,KA,Math.max(nB,IB+SB/2),0,2*Math.PI),I.stroke(),I.strokeStyle="rgba(255, 255, 255, "+.3*JA+")",I.beginPath(),I.moveTo(VA+sQ*IB,KA+kB*IB),I.lineTo(VA+sQ*nB,KA+kB*nB),I.stroke(),I.strokeStyle="rgba(255, 255, 255, "+.15*JA+")",I.beginPath(),I.arc(LA,aA,gB,0,2*Math.PI),I.globalCompositeOperation="destination-out",I.fillStyle="rgba(0, 0, 0, 1)",I.fill(),I.globalCompositeOperation="source-over",I.fillStyle="rgba(255, 255, 255, "+.1*JA+")",I.beginPath(),I.arc(LA,aA,gB,0,2*Math.PI),I.fill(),I.strokeStyle="rgba(255, 255, 255, "+.33*JA+")",I.lineWidth=2,I.beginPath(),I.arc(LA,aA,gB,0,2*Math.PI),I.stroke()):(I.beginPath(),I.arc(VA,KA,gB,0,2*Math.PI),I.globalCompositeOperation="destination-out",I.fillStyle="rgba(0, 0, 0, 1)",I.fill(),I.globalCompositeOperation="source-over",I.fillStyle="rgba(255, 255, 255, "+.1*JA+")",I.beginPath(),I.arc(VA,KA,gB,0,2*Math.PI),I.fill(),I.strokeStyle="rgba(255, 255, 255, "+.25*JA+")",I.lineWidth=2,I.beginPath(),I.arc(VA,KA,gB,0,2*Math.PI),I.stroke())}return p.addEventListener("mousedown",PQ,!1),p.addEventListener("mousemove",bB,!1),p.addEventListener("mouseup",RB,!1),Q.addEventListener("mousemove",bB,!1),Q.addEventListener("mouseup",RB,!1),p.addEventListener("touchstart",PQ,!1),p.addEventListener("touchmove",bB,!1),p.addEventListener("touchend",RB,!1),p.addEventListener("touchcancel",RB,!1),Q.addEventListener("touchmove",bB,!1),Q.addEventListener("touchend",RB,!1),Q.addEventListener("touchcancel",RB,!1),bg}const s=G(y),R=G(D);let n=!1,e=0,u=0,v=0,K=0,x=0,J=0,j=.01;function z(p,AA,iA){return p+(AA-p)*iA}function QA(p){p.preventDefault(),n=!0;let AA=N(p);v=AA.x,K=AA.y,e=v,u=K,wA(p)}function T(p){n&&(p.preventDefault(),n=!1)}function wA(p){if(!n)return;p.preventDefault();const AA=N(p);v=AA.x,K=AA.y}Q.addEventListener("mousedown",QA,!1),Q.addEventListener("mousemove",wA,!1),Q.addEventListener("mouseup",T,!1),Q.addEventListener("touchstart",QA,!1),Q.addEventListener("touchmove",wA,!1),Q.addEventListener("touchend",T,!1),Q.addEventListener("touchcancel",T,!1);const EA=document.getElementById("onb-arrow");let IA=EA.getBoundingClientRect().top,CA=0;function sA(){const p=C.clientWidth,AA=C.clientHeight;(p!==Q.width||AA!==Q.height)&&(Q.width=p,Q.height=AA);let iA=EA.getBoundingClientRect().top;CA=IA-iA,IA=iA,qA.hijack_arrow&&(J=-CA/Q.height*.66*window.getComputedStyle(EA).opacity),I.clearRect(0,0,Q.width,Q.height);let eA=0;I.fillStyle=I.fillStyle="rgba(0, 0, 0, "+eA*.5+")",I.fillRect(0,0,Q.width,Q.height),s(),R();let FA=0,tA=0;if(n){FA=v-e,tA=K-u;let aA=Q.height;FA=FA/aA,tA=tA/aA,x=z(x,FA,1),J=z(J,tA*.2,.5)}else x=z(x,0,j),J=z(J,0,j);ZA.tx+=x,ZA.ty+=J,e=v,u=K;let LA=ug.progress;I.fillStyle="rgba(255, 255, 255, "+.5+")",I.fillRect(0,Q.height-8,Q.width*LA,8)}return sA}function sB(Q){Q.style.pointerEvents="all",Q.style.opacity="1"}function uA(Q){Q.style.pointerEvents="none",Q.style.opacity="0"}function di(Q){Q.style.opacity="1"}function fE(Q){Q.style.opacity="0"}function cs(Q){let I=.66,C=10;Q.style.transform=`translateY(-${C}%) scale(${I}) `,Q.style.border="1px solid #666"}function KD(Q){let I=1,C=0;Q.style.transform=`translateY(-${C}%) scale(${I}) `,Q.style.border="1px solid #000"}function cC(){const Q=document.getElementById("canvas-thk"),I=document.getElementById("butt-info"),C=document.getElementById("butt-save"),y=document.getElementById("butt-sync"),D=document.getElementById("butt-continue"),U=document.getElementById("butt-download"),N=document.getElementById("onb-butt"),G=document.getElementById("textbox-onb"),s=document.getElementById("slider-color"),R=document.getElementById("slider-shape"),n=document.getElementById("onb-fade");eB.show_time=null,document.getElementById("timer_text").style.opacity=0,uA(N),fE(G),uA(D),uA(U),sB(I),sB(C),sB(y),sB(s),sB(R),fE(n),KD(Q)}function Us(Q){const I=document.getElementById("canvas-thk"),C=document.getElementById("butt-info"),y=document.getElementById("butt-save"),D=document.getElementById("butt-sync"),U=document.getElementById("slider-color"),N=document.getElementById("slider-shape"),G=document.getElementById("onb-fade");uA(C),uA(y),uA(D),uA(U),uA(N),fE(G),cs(I)}function ws(){const Q=document.getElementById("canvas-thk"),I=document.getElementById("butt-info"),C=document.getElementById("butt-save"),y=document.getElementById("butt-sync"),D=document.getElementById("butt-continue"),U=document.getElementById("butt-download"),N=document.getElementById("onb-butt"),G=document.getElementById("textbox-onb"),s=document.getElementById("slider-color"),R=document.getElementById("slider-shape"),n=document.getElementById("onb-fade");eB.show_time=null,document.getElementById("timer_text").style.opacity=0,sB(N),di(G),uA(D),uA(U),uA(I),uA(C),uA(y),uA(s),uA(R),di(n),KD(Q)}function Ns(){const Q=document.getElementById("butt-continue"),I=document.getElementById("butt-download");sB(Q),sB(I)}function Hs(){let Q=eB.show_time,I=document.getElementById("timer_text"),C="";if(Q!=null){let y=new Date().getTime(),D=Q-y,U=eB.show_len;if(D>0){I.style.opacity=.75;let N=Math.floor(D/6e4),G=Math.floor(D%6e4/1e3);N.toString(),G.toString(),N<1?C=`Your entity will be displayed in THK tower in ${G}s`:C=`Your entity will be displayed in THK tower in ${N}m ${G}s`}else D>-U?(C="Your entity is being displayed now",I.style.opacity=1):(C="Your entity has been displayed",I.style.opacity=.5)}I.innerHTML=C}function oE(Q){const I=document.getElementById("onb-butt");I.innerHTML=Q}const Gs="TUTORIAL",ts="NEXT",as="START";function hs(){document.getElementById("onb-fade"),document.getElementById("butt-info"),document.getElementById("butt-save"),document.getElementById("butt-sync");const Q=document.getElementById("onb-header"),I=document.getElementById("onb-body"),C=document.getElementById("onb-butt"),y="THK SYNC",D="CREATE THK DESIGN AND SEND IT TO THK TOWER",U="CREATE",N="DRAG & ROTATE CONTROLS TO ADJUST SHAPE & COLOR",G="EXPLORE",s="SCROLL TO FIND THE DESIGN THAT RESONATES WITH YOU",R="SEND",n="CLICK 'SYNC' AND WATCH YOUR DESIGN ON THE TOWER. DON'T FORGET TO FILM AND SHARE";let e=0;function u(z){switch(z){case 0:Q.innerHTML=y,Q.innerHTML=Q.textContent.replace(/\S/g,"<span class='letter'>$&</span>"),I.innerHTML=D,I.innerHTML=I.textContent.replace(/\S/g,"<span class='letter'>$&</span>");break;case 1:Q.innerHTML=U,Q.innerHTML=Q.textContent.replace(/\S/g,"<span class='letter'>$&</span>"),I.innerHTML=N,I.innerHTML=I.textContent.replace(/\S/g,"<span class='letter'>$&</span>");break;case 2:Q.innerHTML=G,Q.innerHTML=Q.textContent.replace(/\S/g,"<span class='letter'>$&</span>"),I.innerHTML=s,I.innerHTML=I.textContent.replace(/\S/g,"<span class='letter'>$&</span>");break;case 3:Q.innerHTML=R,Q.innerHTML=Q.textContent.replace(/\S/g,"<span class='letter'>$&</span>"),I.innerHTML=n,I.innerHTML=I.textContent.replace(/\S/g,"<span class='letter'>$&</span>");break}}function v(){cC()}let K=anime({targets:qA,y1:[0,200],easing:"easeInOutQuad",duration:1e3,delay:200}),x=anime({loop:!0,direction:"alternate",targets:qA,x1:[0,1],y1:[200,150],easing:"easeInOutSine",duration:1e3,delay:0});function J(){if(console.log("next page",e),e==0&&oE(Gs),e>0&&e<3&&oE(ts),e==3&&oE(as),e>3)v();else{if(u(e),e==1){let z=document.getElementById("slider-color"),QA=document.getElementById("slider-shape");sB(z),sB(QA),qA.hijack1=!0,qA.y1=0,qA.x1=0,K.play(),setTimeout(()=>{x.play()},1200)}else qA.hijack1=!1,K.restart(),x.restart(),K.pause(),x.pause();if(e==2){const z=document.getElementById("onb-arrow");z.style.opacity="0.5",qA.hijack_arrow=!0,anime.timeline({loop:!0,direction:"alternate"}).add({targets:"#onb-arrow",translateY:[-100,100],easing:"easeInOutSine",duration:1e3,delay:0})}else{const z=document.getElementById("onb-arrow");z.style.opacity="0.0",qA.hijack_arrow=!1}document.querySelectorAll(".letter").forEach(z=>{z.style.opacity="0"}),anime.timeline({loop:!1}).add({targets:"#onb-header .letter",opacity:[0,1],easing:"easeInOutQuad",duration:100,delay:(z,QA)=>50*(QA+1)}).add({targets:"#onb-body .letter",opacity:[0,1],easing:"easeInOutQuad",duration:100,delay:(z,QA)=>30*(QA+1)})}e+=1}function j(){e=0,ws(),J(),anime({targets:"#onb-butt",opacity:[0,1],easing:"easeInOutQuad",duration:1e3,delay:500})}return C.addEventListener("click",function(){J()}),j}const fD=hs();ss();const uD=document.getElementById("canvas-thk"),Ys=document.getElementById("butt-sync");Ys.addEventListener("click",function(){fetch("https://sterling-engaging-whippet.ngrok-free.app",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(ZA)}).then(I=>I.json()).then(I=>{console.log("Success:",I);let C=I.time*1e3,y=I.length*1e3;eB.show_time=C,eB.show_len=y,uE()}).catch(I=>{console.error("Error:",I),uE()})});const es=Fs();function Ls(){es(),Hs()}const Rs=Ao(uD,ZA,Ls);ys(uD,Rs,ug,ZA);const ns=document.getElementById("butt-save");ns.addEventListener("click",function(){uE()});const ks=document.getElementById("butt-info");ks.addEventListener("click",function(){fD()});const Ss=document.getElementById("butt-continue");Ss.addEventListener("click",function(){cC()});function rs(){Ns()}function uE(){ug.recording=!0,ug.callback=rs,Us()}cC();fD();