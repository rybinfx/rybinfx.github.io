var TD=Object.defineProperty;var ai=Q=>{throw TypeError(Q)};var PD=(Q,I,C)=>I in Q?TD(Q,I,{enumerable:!0,configurable:!0,writable:!0,value:C}):Q[I]=C;var fA=(Q,I,C)=>PD(Q,typeof I!="symbol"?I+"":I,C),_D=(Q,I,C)=>I.has(Q)||ai("Cannot "+C);var ei=(Q,I,C)=>I.has(Q)?ai("Cannot add the same private member more than once"):I instanceof WeakSet?I.add(Q):I.set(Q,C);var qB=(Q,I,C)=>(_D(Q,I,"access private method"),C);(function(){const I=document.createElement("link").relList;if(I&&I.supports&&I.supports("modulepreload"))return;for(const D of document.querySelectorAll('link[rel="modulepreload"]'))y(D);new MutationObserver(D=>{for(const U of D)if(U.type==="childList")for(const N of U.addedNodes)N.tagName==="LINK"&&N.rel==="modulepreload"&&y(N)}).observe(document,{childList:!0,subtree:!0});function C(D){const U={};return D.integrity&&(U.integrity=D.integrity),D.referrerPolicy&&(U.referrerPolicy=D.referrerPolicy),D.crossOrigin==="use-credentials"?U.credentials="include":D.crossOrigin==="anonymous"?U.credentials="omit":U.credentials="same-origin",U}function y(D){if(D.ep)return;D.ep=!0;const U=C(D);fetch(D.href,U)}})();const YB={restrict_loc:!0,center_x:-8.630436666894104,center_y:115.09447416252982,radius:.016,dev_send:!1,show_len:3e3,show_time:null},eg={recording:!1,progress:0,callback:null},ZA={seed:0,speed:.1,val1:Math.random()*100,val2:Math.random()*100,tx:Math.random()*100,ty:Math.random()*100,val1a:0,val1b:0,val2a:0,val2b:0,val3a:Math.random()*100,val3b:Math.random(),val4a:Math.random()*100,val4b:Math.random(),render:0},$D={u_General:0,u_Offsety:0,u_Celltop:.1899999976158142,u_Cellbottom:1.309999942779541,u_Cellspeed:.15000000596046448,u_Speed:1,u_Splitsize:16,u_Color:0,u_Colorgain:1.0700000524520874,u_Pattern:0,u_Patternscale:8,u_Patternpow:0,u_Patterngain:0,u_Patternevery:1,u_Patternstrength:.5080000162124634,u_Signalstrength:1,u_Signalsize:.15199999511241913,u_Displacepos:0,u_Displacegamma:3.2799999713897705,u_Displacex:1,u_Wposscalex:4,u_Wposscaley:4,u_Wposscalez:4,u_Wposspeedx:0,u_Wposspeedy:0,u_Wposspeedz:0,u_Wpospxx:-.4000000059604645,u_Wpospxy:0,u_Wpospxz:0,u_Wpospyx:4,u_Wpospyy:0,u_Wpospyz:0,u_Wpospzx:0,u_Wpospzy:0,u_Wpospzz:0,u_Noisepos:0,u_Nposscalex:4,u_Nposscaley:4,u_Nposscalez:4,u_Nposspeedx:0,u_Nposspeedy:0,u_Nposspeedz:0,u_Nposwfx:.20000000298023224,u_Nposwfy:0,u_Nposwfz:0,u_Nposwwx:0,u_Nposwwy:.6000000238418579,u_Nposwwz:0,u_Nposwyx:-.8999999761581421,u_Nposwyy:0,u_Nposwyz:0,u_Npospxx:-.30000001192092896,u_Npospxy:0,u_Npospxz:0,u_Npospyx:0,u_Npospyy:0,u_Npospyz:0,u_Npospzx:0,u_Npospzy:0,u_Npospzz:.10000000149011612,u_Shownoisepos:0,u_Channels:0,u_Channelwidth:2,u_Channelsymmetry:1,u_Channelspread:1,u_Channelshrinkjoint:0,u_Points:0,u_Pointweight:17.5,u_Pointfade:.6499999761581421,u_Pointweightvariation:0,u_Pointjointwidth:.5,u_Pointweighttop:1,u_Pointweightbottom:1},OA={hijack1:!1,x1:0,y1:0,hijack_arrow:!1},Ao=(Q,I,C)=>{let y=[Q.width,Q.height];const D=Q.getContext("webgl2",{antialias:!0});D||alert("Please use browser with WebGL2 support");var U=D.getExtension("EXT_color_buffer_float");U||alert("Please use browser with Floating Point support");const N=`
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
    `,H=`#version 300 es
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


uniform float u_General;
uniform float u_Offsety;
uniform float u_Celltop;
uniform float u_Cellbottom;
uniform float u_Cellspeed;
uniform float u_Speed;
uniform float u_Splitsize;
uniform float u_Color;
uniform float u_Colorgain;
uniform float u_Pattern;
uniform float u_Patternscale;
uniform float u_Patternpow;
uniform float u_Patterngain;
uniform float u_Patternevery;
uniform float u_Patternstrength;
uniform float u_Signalstrength;
uniform float u_Signalsize;
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
	Seg Clone_0 = seg_even(float(int(point)), float(int(npoints)), float(int(1)));
	Seg Clone_1 = seg_even(float(int(Clone_0.point)), float(int(Clone_0.npoints)), float(int(1)));
	Seg Clone_2 = seg_even(float(int(Clone_1.point)), float(int(Clone_1.npoints)), float(int(9)));
	Seg Clone_3 = seg_even(float(int(Clone_2.point)), float(int(Clone_2.npoints)), float(int(5)));
	Seg Clone_4 = seg_even(float(int(Clone_3.point)), float(int(Clone_3.npoints)), float(int(1)));
	Seg Clone_5 = seg_even(float(int(Clone_4.point)), float(int(Clone_4.npoints)), float(int(712)));
	

	// Main Code Defs
	vec3 node7 = vec3(0.0, 0.0, 0.0);
	float node26 = float(Clone_0.idx);
	float node30 = float(Clone_2.idx);
	bool node222 = (Clone_2.size > 1.0);
	float node221_out0;
	if (node222) {
		node221_out0 = (node30 / (Clone_2.size - 1.0));
	} else {
		node221_out0 = 0.5;
	}
	float node259 = (1.0 - parabola(node221_out0, 2.0));
	float node274 = ((5.0 - clamp((Clone_1.idx - 0.5), 0.0, 5.0)) / 6.0);
	float node273 = (node274 * u_diff_v);
	float node270 = ((u_val4a * 0.5) + node273);
	float node269 = (node270 * 0.2);
	vec2 node267 = vec2((node269 + 20.0), 1.0);
	float node257 = ((node259 * ((ns_simplex2((vec2(node267.x, node267.y) / 1.5)) * 0.5) + 0.5)) * 2.0);
	float node286 = gain(1.0, 2.0);
	float node287 = (parabola(1.0, 1.0) * 0.5);
	float node207 = (u_off * 0.1);
	vec2 node299 = vec2(node207, 40.0);
	float node289 = mix(mix(3.0, 8.0, ((ns_simplex2((vec2(node299.x, node299.y) / 1.5)) * 0.5) + 0.5)), (3.0 + (u_val4b * 5.0)), node286);
	float node316 = float((Clone_5.idx + fract(0.0)));
	bool node312 = (Clone_5.size > 1.0);
	float node311_out0;
	if (node312) {
		node311_out0 = (node316 / Clone_5.size);
	} else {
		node311_out0 = fract((node316 + 0.5));
	}
	float node309 = (node311_out0 * 17.0);
	float node308 = floor(node309);
	float node70 = (u_ty * 4.5);
	float node66 = ((u_off - (node70 * 0.1)) * 0.4);
	float node64 = fract((node66 * 16.0));
	float node209 = (Clone_0.idx + 0.5);
	float node208 = (node209 * 0.2);
	float node211 = (clamp((10.0 - ((float(Clone_1.idx) * 2.0) - mod(node26, 2.0))), 0.0, 10.0) / 10.0);
	float node88 = (0.14287755393627663 - ((0.28575510787255326 * cos(1.5707963267948966)) / 6.283185307179586));
	float node219 = (node221_out0 * 2.0);
	float node108 = (0.21424489212744674 + node88);
	float node53 = 0.0;
	float node325 = 0.0;
	float node328 = 0.0;
	for (int node51 = 0; node51 < int(16.0); node51++) {
		float node63 = float(node51);
		float node60 = clamp(((node63 + node64) / 15.0), 0.0, 1.0);
		bool node59 = (node60 < 0.5);
		float node58_out0;
		if (node59) {
			bool node83 = (node60 > 0.28575510787255326);
			float node82_out0;
			if (node83) {
				node82_out0 = ((node60 - 0.28575510787255326) + node88);
			} else {
				float node97 = ((node60 / 0.28575510787255326) / 2.0);
				node82_out0 = ((0.28575510787255326 * node97) - ((0.28575510787255326 * cos((((node97 - 0.25) * 3.141592653589793) * 2.0))) / 6.283185307179586));
			}
			node58_out0 = ((node82_out0 / node108) / 2.0);
		} else {
			float node116 = (1.0 - node60);
			bool node115 = (node116 > 0.28575510787255326);
			float node114_out0;
			if (node115) {
				node114_out0 = ((node116 - 0.28575510787255326) + node88);
			} else {
				float node123 = ((node116 / 0.28575510787255326) / 2.0);
				node114_out0 = ((0.28575510787255326 * node123) - ((0.28575510787255326 * cos((((node123 - 0.25) * 3.141592653589793) * 2.0))) / 6.283185307179586));
			}
			node58_out0 = (1.0 - ((node114_out0 / node108) / 2.0));
		}
		float node56 = pow(node58_out0, 1.0);
		float node135 = clamp((((node63 - 1.0) + node64) / 15.0), 0.0, 1.0);
		bool node134 = (node135 < 0.5);
		float node133_out0;
		if (node134) {
			bool node144 = (node135 > 0.28575510787255326);
			float node143_out0;
			if (node144) {
				node143_out0 = ((node135 - 0.28575510787255326) + node88);
			} else {
				float node150 = ((node135 / 0.28575510787255326) / 2.0);
				node143_out0 = ((0.28575510787255326 * node150) - ((0.28575510787255326 * cos((((node150 - 0.25) * 3.141592653589793) * 2.0))) / 6.283185307179586));
			}
			node133_out0 = ((node143_out0 / node108) / 2.0);
		} else {
			float node164 = (1.0 - node135);
			bool node163 = (node164 > 0.28575510787255326);
			float node162_out0;
			if (node163) {
				node162_out0 = ((node164 - 0.28575510787255326) + node88);
			} else {
				float node170 = ((node164 / 0.28575510787255326) / 2.0);
				node162_out0 = ((0.28575510787255326 * node170) - ((0.28575510787255326 * cos((((node170 - 0.25) * 3.141592653589793) * 2.0))) / 6.283185307179586));
			}
			node133_out0 = (1.0 - ((node162_out0 / node108) / 2.0));
		}
		float node131 = pow(node133_out0, 1.0);
		float node203 = ((node131 + node56) / 2.0);
		vec3 node198 = vec3(((((node203 * 4.0) + node207) + node208) + node211), node219, 0.0);
		vec3 node196 = vec3(node198.x, node198.y, node198.z);
		float node195 = node196.x;
		float node229 = node196.y;
		float node230 = node196.z;
		vec3 node253 = vec3(((node203 * 6.0) + node211), node257, node269);
		vec3 node251 = vec3(node253.x, node253.y, node253.z);
		float node52 = (node53 + ((node56 - node131) * pow(mix(mix((0.001 + ((((((gain(((ns_simplex3((vec3(node195, node229, node230) / 1.5)) * 0.5) + 0.5), 2.0) * 2.0) - 1.0) + (((gain(((ns_simplex3((vec3((node195 * 2.0), (node229 * 2.0), (node230 * 2.0)) / 1.5)) * 0.5) + 0.5), 2.0) * 2.0) - 1.0) * 0.5)) / 1.5) * 0.5) + 0.5)), (0.001 + ((ns_simplex3((vec3(node251.x, node251.y, node251.z) / 1.5)) * 0.5) + 0.5)), node286), 1.0, node287), node289)));
		bool node307 = (node63 == node308);
		bool node324 = (!node307);
		float node306_out0;
		if (node307) {
			node306_out0 = node53;
		} else {
			node306_out0 = node325;
		}
		float node327_out0;
		if (node307) {
			node327_out0 = node52;
		} else {
			node327_out0 = node328;
		}
		node53 = node52;
		node325 = node306_out0;
		node328 = node327_out0;
	}
	float node369 = (node270 * 0.3);
	vec2 node368 = vec2(node369, 20.0);
	float node373 = fract(node311_out0);
	vec2 node381 = vec2(node270, 30.0);
	bool node392 = (Clone_3.size > 1.0);
	float node391_out0;
	if (node392) {
		node391_out0 = (float(Clone_3.idx) / (Clone_3.size - 1.0));
	} else {
		node391_out0 = 0.5;
	}
	float node403 = (((1.0 - parabola(node391_out0, 0.25)) * 0.5) + 0.5);
	bool node387 = (Clone_2.idx < 4.0);
	float node386_out0;
	if (node387) {
		node386_out0 = (1.0 - node391_out0);
	} else {
		bool node401 = (Clone_2.idx != 4.0);
		float node400_out0;
		if (node401) {
			node400_out0 = node391_out0;
		} else {
			node400_out0 = node403;
		}
		node386_out0 = node400_out0;
	}
	float node384 = mix(node386_out0, node403, u_Channelsymmetry);
	vec2 node421 = vec2(node270, 40.0);
	float node425 = (node373 * 17.0);
	float node424 = fract(node425);
	float node423 = pow(node424, pow(2.0, mix((ns_simplex2((vec2(float(((u_off * 0.5) + node273)), 0.0) / 1.5)) * 2.0), (ns_simplex2((vec2(float(node270), 0.0) / 1.5)) * 2.0), 1.0)));
	vec2 node454 = vec2(node270, 50.0);
	float node621 = floor(node425);
	float node463 = 0.0;
	float node623 = 0.0;
	float node626 = 0.0;
	for (int node461 = 0; node461 < int(16.0); node461++) {
		float node473 = float(node461);
		float node470 = clamp(((node473 + node64) / 15.0), 0.0, 1.0);
		bool node469 = (node470 < 0.5);
		float node468_out0;
		if (node469) {
			bool node479 = (node470 > 0.28575510787255326);
			float node478_out0;
			if (node479) {
				node478_out0 = ((node470 - 0.28575510787255326) + node88);
			} else {
				float node485 = ((node470 / 0.28575510787255326) / 2.0);
				node478_out0 = ((0.28575510787255326 * node485) - ((0.28575510787255326 * cos((((node485 - 0.25) * 3.141592653589793) * 2.0))) / 6.283185307179586));
			}
			node468_out0 = ((node478_out0 / node108) / 2.0);
		} else {
			float node499 = (1.0 - node470);
			bool node498 = (node499 > 0.28575510787255326);
			float node497_out0;
			if (node498) {
				node497_out0 = ((node499 - 0.28575510787255326) + node88);
			} else {
				float node505 = ((node499 / 0.28575510787255326) / 2.0);
				node497_out0 = ((0.28575510787255326 * node505) - ((0.28575510787255326 * cos((((node505 - 0.25) * 3.141592653589793) * 2.0))) / 6.283185307179586));
			}
			node468_out0 = (1.0 - ((node497_out0 / node108) / 2.0));
		}
		float node466 = pow(node468_out0, 1.0);
		float node517 = clamp((((node473 - 1.0) + node64) / 15.0), 0.0, 1.0);
		bool node516 = (node517 < 0.5);
		float node515_out0;
		if (node516) {
			bool node526 = (node517 > 0.28575510787255326);
			float node525_out0;
			if (node526) {
				node525_out0 = ((node517 - 0.28575510787255326) + node88);
			} else {
				float node532 = ((node517 / 0.28575510787255326) / 2.0);
				node525_out0 = ((0.28575510787255326 * node532) - ((0.28575510787255326 * cos((((node532 - 0.25) * 3.141592653589793) * 2.0))) / 6.283185307179586));
			}
			node515_out0 = ((node525_out0 / node108) / 2.0);
		} else {
			float node546 = (1.0 - node517);
			bool node545 = (node546 > 0.28575510787255326);
			float node544_out0;
			if (node545) {
				node544_out0 = ((node546 - 0.28575510787255326) + node88);
			} else {
				float node552 = ((node546 / 0.28575510787255326) / 2.0);
				node544_out0 = ((0.28575510787255326 * node552) - ((0.28575510787255326 * cos((((node552 - 0.25) * 3.141592653589793) * 2.0))) / 6.283185307179586));
			}
			node515_out0 = (1.0 - ((node544_out0 / node108) / 2.0));
		}
		float node513 = pow(node515_out0, 1.0);
		float node584 = ((node513 + node466) / 2.0);
		vec3 node579 = vec3(((((node584 * 4.0) + node207) + node208) + node211), node219, 0.0);
		vec3 node577 = vec3(node579.x, node579.y, node579.z);
		float node576 = node577.x;
		float node588 = node577.y;
		float node589 = node577.z;
		vec3 node611 = vec3(((node584 * 6.0) + node211), node257, node269);
		vec3 node609 = vec3(node611.x, node611.y, node611.z);
		float node462 = (node463 + ((node466 - node513) * pow(mix(mix((0.001 + ((((((gain(((ns_simplex3((vec3(node576, node588, node589) / 1.5)) * 0.5) + 0.5), 2.0) * 2.0) - 1.0) + (((gain(((ns_simplex3((vec3((node576 * 2.0), (node588 * 2.0), (node589 * 2.0)) / 1.5)) * 0.5) + 0.5), 2.0) * 2.0) - 1.0) * 0.5)) / 1.5) * 0.5) + 0.5)), (0.001 + ((ns_simplex3((vec3(node609.x, node609.y, node609.z) / 1.5)) * 0.5) + 0.5)), node286), 1.0, node287), node289)));
		bool node620 = (node473 == node621);
		bool node622 = (!node620);
		float node619_out0;
		if (node620) {
			node619_out0 = node463;
		} else {
			node619_out0 = node623;
		}
		float node625_out0;
		if (node620) {
			node625_out0 = node462;
		} else {
			node625_out0 = node626;
		}
		node463 = node462;
		node623 = node619_out0;
		node626 = node625_out0;
	}
	float node458 = (node626 / node463);
	float node628 = (node623 / node463);
	float node457 = (node458 - node628);
	vec3 node633 = vec3(1.0, 1.0, 1.0);
	vec2 node652 = vec2(node270, 60.0);
	vec3 node348 = (((((((((((node7 + (vec3(0.0, (((ns_simplex2((vec2(node368.x, node368.y) / 1.5)) * 0.5) + 0.5) * 6.0), 0.0) * node259)) + (node7 * node373)) + (vec3(0.0, 0.0, (ns_simplex2((vec2(node381.x, node381.y) / 1.5)) * 0.2)) * node384)) + (vec3(u_Nposspeedx, u_Nposspeedy, u_Nposspeedz) * u_off)) + (vec3(((ns_simplex2((vec2(node421.x, node421.y) / 1.5)) * 0.5) + 0.5), 0.0, 0.0) * node423)) + (vec3(0.0, 0.0, (((((gain(((ns_simplex2((vec2(node454.x, node454.y) / 1.5)) * 0.5) + 0.5), 2.0) * 2.0) - 1.0) * 0.5) + 0.5) * 4.0)) * node457)) + (node7 * (node628 + (node457 * 0.5)))) * node633) + vec3(node70, 0.0, node270)) + vec3(0.0, 0.0, (mod(floor((node621 + (node66 * 16.0))), 2.0) * ((((gain(((ns_simplex2((vec2(node652.x, node652.y) / 1.5)) * 0.5) + 0.5), 2.0) * 2.0) - 1.0) * 0.5) + 0.5)))) + vec3(((1.0 - parabola(node209, 1.0)) * u_diff_u), node273, 0.0));
	float node347 = node348.x;
	float node660 = node348.y;
	float node661 = node348.z;
	vec3 node346 = vec3(node347, node660, node661);
	float node664 = parabola(node423, 1.0);
	float node43 = (Clone_1.idx + (mix((node325 / node53), (node328 / node53), pow(fract(node309), 1.0)) + (((((gain(((ns_simplex3((vec3(node346.x, node346.y, node346.z) / 1.5)) * 0.5) + 0.5), 2.0) * 2.0) - 1.0) * node664) * u_Offsety) * 0.04)));
	vec4 node14 = vec4((0.5 + (float((float(float(((((node26 * 9.0) - node26) - 4.0) + node30))) / 9.0)) * mix(0.1, 0.7, pow(n01(cos((((pow(node43, 1.2) + 0.5) * 3.141592653589793) * 2.0))), 0.8)))), pow(node43, 1.0), 0.0, 0.0);
	vec2 node12 = vec2(node14.x, node14.y);
	vec3 node690 = vec3(0.0, 0.0, 1.0);
	float node695 = fract(node424);
	float node704 = (fract((node270 * 0.25)) * 5.0);
	float node702 = mod(floor(node704), 5.0);
	bool node701 = (node702 == 0.0);
	bool node709 = (node702 == 1.0);
	bool node711 = (node702 == 2.0);
	bool node713 = (node702 == 3.0);
	bool node715 = (node702 == 4.0);
	float node700_out0;
	if (node701) {
		node700_out0 = 0.001;
	} else if (node709) {
		node700_out0 = 0.1;
	} else if (node711) {
		node700_out0 = 0.1;
	} else if (node713) {
		node700_out0 = 4.0;
	} else if (node715) {
		node700_out0 = 0.001;
	}
	float node720 = mod((node702 + 1.0), 5.0);
	bool node719 = (node720 == 0.0);
	bool node722 = (node720 == 1.0);
	bool node723 = (node720 == 2.0);
	bool node724 = (node720 == 3.0);
	bool node725 = (node720 == 4.0);
	float node718_out0;
	if (node719) {
		node718_out0 = 0.001;
	} else if (node722) {
		node718_out0 = 0.1;
	} else if (node723) {
		node718_out0 = 0.1;
	} else if (node724) {
		node718_out0 = 4.0;
	} else if (node725) {
		node718_out0 = 0.001;
	}
	float node726 = smoothstep(0.0, 1.0, fract(node704));
	float node730_out0;
	if (node701) {
		node730_out0 = 0.001;
	} else if (node709) {
		node730_out0 = 0.1;
	} else if (node711) {
		node730_out0 = 4.0;
	} else if (node713) {
		node730_out0 = 0.2;
	} else if (node715) {
		node730_out0 = 2.0;
	}
	float node732_out0;
	if (node719) {
		node732_out0 = 0.001;
	} else if (node722) {
		node732_out0 = 0.1;
	} else if (node723) {
		node732_out0 = 4.0;
	} else if (node724) {
		node732_out0 = 0.2;
	} else if (node725) {
		node732_out0 = 2.0;
	}
	float node692 = mix((pcurve(node695, 0.01, 0.01) * 0.2), pcurve(node695, mix(node700_out0, node718_out0, node726), mix(node730_out0, node732_out0, node726)), 1.0);
	vec3 node689 = (node690 * vec3(node692, node692, node692));
	bool node681 = (node387 || ((Clone_2.idx == 4.0) && (node391_out0 > 0.5)));
	vec3 node680_out0;
	if (node681) {
		node680_out0 = vec3((node689.x * -1.0), node689.y, node689.z);
	} else {
		node680_out0 = node689;
	}
	vec2 node677 = rot2(node680_out0.xz, ((n11(node391_out0) * 0.2) * u_Channelspread));
	float node746 = mix(node628, node458, pow(node424, 1.0));
	float node743 = mix(u_Channelshrinkjoint, 1.0, parabola(node746, 1.0));
	pos = (((((node7 + vec3(n11(node12.x), n11(node12.y), 0.0)) + ((vec3(node677.x, node680_out0.y, node677.y) * 0.04) * vec3(node743, node743, node743))) * vec3(mix((0.5625 / (u_resx / u_resy)), 1.0, u_render), 1.0, 1.0)) * vec3(1.0, mix(1.0, 1.0, u_render), 1.0)) + vec3(0.0, mix(0.06, 0.0, u_render), 0.0));
	alpha = 1.0;
	weight = mix(1.0, 1.4, (((1.0 + (n11(clamp(0.5, 0.0, 1.0)) * u_Pointweightvariation)) * u_Pointweight) * mix(u_Pointjointwidth, 1.0, parabola(node746, 2.0))));
	float node815 = (u_val3a * 0.3);
	vec3 node826 = vec3(((((node211 * 6.0) + node746) - (u_off * 4.0)) + ((node423 * node457) * 0.25)), (node221_out0 + (node209 * 5.0)), ((node457 * 3.0) + (node384 * 0.2)));
	float node825 = node826.x;
	float node839 = node826.y;
	float node841 = node826.z;
	vec3 node824 = vec3(node825, node839, (node841 + 14.0));
	vec3 node851 = vec3(node825, node839, (node841 + 20.0));
	vec3 node813 = vec3((node815 + (((ns_simplex3((vec3(node824.x, node824.y, node824.z) / 1.5)) * 0.5) + 0.5) * 0.1)), ((ns_simplex3((vec3(node851.x, node851.y, node851.z) / 1.5)) * 0.5) + 0.5), 0.5);
	float node866 = node813.z;
	bool node871 = (node866 < 0.5);
	float node870_out0;
	if (node871) {
		node870_out0 = node866;
	} else {
		node870_out0 = (1.0 - node866);
	}
	float node865 = (node866 + (node813.y * node870_out0));
	float node881 = ((2.0 * node866) - node865);
	float node809 = ((fract(node813.x) * 360.0) / 60.0);
	float node808 = floor(node809);
	bool node861 = (node808 == 5.0);
	bool node860 = (node808 == 4.0);
	bool node859 = (node808 == 3.0);
	bool node858 = (node808 == 2.0);
	bool node857 = (node808 == 1.0);
	bool node807 = (node808 == 0.0);
	float node1464_out0;
	if ((node861 || node860 || node859 || node858 || node857 || node807)) {
		node1464_out0 = (node865 - (((node865 - node866) * 2.0) * abs((mod(node809, 2.0) - 1.0))));
	}
	vec3 node806_out0;
	if (node807) {
		node806_out0 = vec3(node865, node1464_out0, node881);
	} else if (node857) {
		node806_out0 = vec3(node1464_out0, node865, node881);
	} else if (node858) {
		node806_out0 = vec3(node881, node865, node1464_out0);
	} else if (node859) {
		node806_out0 = vec3(node881, node1464_out0, node865);
	} else if (node860) {
		node806_out0 = vec3(node1464_out0, node881, node865);
	} else if (node861) {
		node806_out0 = vec3(node865, node881, node1464_out0);
	} else {
		node806_out0 = vec3(node881, node881, node881);
	}
	vec3 node906 = vec3(node347, node660, (node661 + 14.0));
	vec3 node916 = vec3(node347, node660, (node661 + 20.0));
	vec3 node897 = vec3((node815 + (((ns_simplex3((vec3(node906.x, node906.y, node906.z) / 1.5)) * 0.5) + 0.5) * 0.1)), ((ns_simplex3((vec3(node916.x, node916.y, node916.z) / 1.5)) * 0.5) + 0.5), 0.5);
	float node930 = node897.z;
	bool node935 = (node930 < 0.5);
	float node934_out0;
	if (node935) {
		node934_out0 = node930;
	} else {
		node934_out0 = (1.0 - node930);
	}
	float node929 = (node930 + (node897.y * node934_out0));
	float node945 = ((2.0 * node930) - node929);
	float node893 = ((fract(node897.x) * 360.0) / 60.0);
	float node892 = floor(node893);
	bool node925 = (node892 == 5.0);
	bool node924 = (node892 == 4.0);
	bool node923 = (node892 == 3.0);
	bool node922 = (node892 == 2.0);
	bool node921 = (node892 == 1.0);
	bool node891 = (node892 == 0.0);
	float node1461_out0;
	if ((node925 || node924 || node923 || node922 || node921 || node891)) {
		node1461_out0 = (node929 - (((node929 - node930) * 2.0) * abs((mod(node893, 2.0) - 1.0))));
	}
	vec3 node890_out0;
	if (node891) {
		node890_out0 = vec3(node929, node1461_out0, node945);
	} else if (node921) {
		node890_out0 = vec3(node1461_out0, node929, node945);
	} else if (node922) {
		node890_out0 = vec3(node945, node929, node1461_out0);
	} else if (node923) {
		node890_out0 = vec3(node945, node1461_out0, node929);
	} else if (node924) {
		node890_out0 = vec3(node1461_out0, node945, node929);
	} else if (node925) {
		node890_out0 = vec3(node929, node945, node1461_out0);
	} else {
		node890_out0 = vec3(node945, node945, node945);
	}
	float node990 = mix(4.0, floor(pow(2.0, (((ns_simplex2((vec2(float((node369 + 15.0)), 0.0) / 1.5)) * 0.5) + 0.5) * 3.0))), 1.0);
	float node988 = (pow(node423, 1.0) * node990);
	bool node1005 = (mod(float(floor(node988)), 2.0) == 0.0);
	float node1004_out0;
	if (node1005) {
		node1004_out0 = 1.0;
	} else {
		node1004_out0 = 0.0;
	}
	float node1017 = ((ns_simplex2((vec2(float((u_val3a + 25.0)), 0.0) / 1.5)) * 0.5) + 0.5);
	float node975 = (((((gain(pow((1.0 - ((cos(((node988 * 3.141592653589793) * 2.0)) * 0.5) + 0.5)), 1.0), 1.0) * mix(1.0, node1004_out0, mix(1.0, ((((gain(node1017, 4.0) * 2.0) - 1.0) * 0.5) + 0.5), 1.0))) * (1.0 + parabola(clamp((fract(((((u_off * -1.0) * 8.0) + ns_rand1(node259)) + node746)) * node990), 0.0, 1.0), 2.0))) * parabola(node391_out0, 1.2)) * node664) * (((((gain(node1017, 1.0) * 2.0) - 1.0) * 0.5) + 0.5) * 2.0));
	vec3 node972 = (node826 + vec3(0.0, 0.0, (node975 * 0.5)));
	float node971 = node972.x;
	float node1042 = node972.y;
	float node1043 = node972.z;
	vec3 node969 = vec3((node971 * 0.5), node1042, node1043);
	float node958 = ((((gain(((ns_simplex3((vec3(node969.x, node969.y, node969.z) / 1.5)) * 0.5) + 0.5), 1.0) * 2.0) - 1.0) * 0.5) + 0.5);
	vec3 node1059 = (node348 + vec3(0.0, 0.0, node975));
	float node1058 = node1059.x;
	float node1061 = node1059.y;
	float node1062 = node1059.z;
	vec3 node1057 = vec3(node1058, node1061, node1062);
	float node1046 = ((((gain(((ns_simplex3((vec3(node1057.x, node1057.y, node1057.z) / 1.5)) * 0.5) + 0.5), u_Colorgain) * 2.0) - 1.0) * 0.5) + 0.5);
	float node954 = gain((1.0 - pow(mix(node958, node1046, 1.0), 4.0)), 2.0);
	float node1081 = mix(0.4, (u_val3b * 0.5), 1.0);
	float node1080 = (node815 + node1081);
	vec3 node1090 = vec3(node825, node839, (node841 + 30.0));
	vec3 node1079 = vec3(node1080, ((ns_simplex3((vec3(node1090.x, node1090.y, node1090.z) / 1.5)) * 0.5) + 0.5), 0.5);
	float node1104 = node1079.z;
	float node1075 = ((fract(node1079.x) * 360.0) / 60.0);
	bool node1109 = (node1104 < 0.5);
	float node1108_out0;
	if (node1109) {
		node1108_out0 = node1104;
	} else {
		node1108_out0 = (1.0 - node1104);
	}
	float node1103 = (node1104 + (node1079.y * node1108_out0));
	float node1074 = floor(node1075);
	bool node1099 = (node1074 == 5.0);
	bool node1098 = (node1074 == 4.0);
	bool node1097 = (node1074 == 3.0);
	bool node1096 = (node1074 == 2.0);
	bool node1095 = (node1074 == 1.0);
	bool node1073 = (node1074 == 0.0);
	float node1458_out0;
	if ((node1099 || node1098 || node1097 || node1096 || node1095 || node1073)) {
		node1458_out0 = (node1103 - (((node1103 - node1104) * 2.0) * abs((mod(node1075, 2.0) - 1.0))));
	}
	float node1119 = ((2.0 * node1104) - node1103);
	vec3 node1072_out0;
	if (node1073) {
		node1072_out0 = vec3(node1103, node1458_out0, node1119);
	} else if (node1095) {
		node1072_out0 = vec3(node1458_out0, node1103, node1119);
	} else if (node1096) {
		node1072_out0 = vec3(node1119, node1103, node1458_out0);
	} else if (node1097) {
		node1072_out0 = vec3(node1119, node1458_out0, node1103);
	} else if (node1098) {
		node1072_out0 = vec3(node1458_out0, node1119, node1103);
	} else if (node1099) {
		node1072_out0 = vec3(node1103, node1119, node1458_out0);
	} else {
		node1072_out0 = vec3(node1119, node1119, node1119);
	}
	vec3 node1135 = vec3(node1080, ((((ns_simplex2((vec2(float((u_val3a + 10.0)), 0.0) / 1.5)) * 0.5) + 0.5) * 0.5) + 0.5), ((ns_simplex2((vec2(float((u_val3a + 30.0)), 0.0) / 1.5)) * 0.5) + 0.5));
	float node1161 = node1135.z;
	bool node1166 = (node1161 < 0.5);
	float node1165_out0;
	if (node1166) {
		node1165_out0 = node1161;
	} else {
		node1165_out0 = (1.0 - node1161);
	}
	float node1160 = (node1161 + (node1135.y * node1165_out0));
	float node1176 = ((2.0 * node1161) - node1160);
	float node1131 = ((fract(node1135.x) * 360.0) / 60.0);
	float node1130 = floor(node1131);
	bool node1156 = (node1130 == 5.0);
	bool node1155 = (node1130 == 4.0);
	bool node1154 = (node1130 == 3.0);
	bool node1153 = (node1130 == 2.0);
	bool node1152 = (node1130 == 1.0);
	bool node1129 = (node1130 == 0.0);
	float node1455_out0;
	if ((node1156 || node1155 || node1154 || node1153 || node1152 || node1129)) {
		node1455_out0 = (node1160 - (((node1160 - node1161) * 2.0) * abs((mod(node1131, 2.0) - 1.0))));
	}
	vec3 node1128_out0;
	if (node1129) {
		node1128_out0 = vec3(node1160, node1455_out0, node1176);
	} else if (node1152) {
		node1128_out0 = vec3(node1455_out0, node1160, node1176);
	} else if (node1153) {
		node1128_out0 = vec3(node1176, node1160, node1455_out0);
	} else if (node1154) {
		node1128_out0 = vec3(node1176, node1455_out0, node1160);
	} else if (node1155) {
		node1128_out0 = vec3(node1455_out0, node1176, node1160);
	} else if (node1156) {
		node1128_out0 = vec3(node1160, node1176, node1455_out0);
	} else {
		node1128_out0 = vec3(node1176, node1176, node1176);
	}
	float node1199 = (node971 * 2.0);
	float node1200 = (node1043 + (node958 * 2.0));
	vec3 node1198 = vec3(node1199, node1042, node1200);
	float node1216 = (node1062 + (node1046 * 2.0));
	vec3 node1215 = vec3(node1058, node1061, node1216);
	float node1185 = gain(mix(((((gain(((ns_simplex3((vec3(node1198.x, node1198.y, node1198.z) / 1.5)) * 0.5) + 0.5), 1.0) * 2.0) - 1.0) * 0.5) + 0.5), ((((gain(((ns_simplex3((vec3(node1215.x, node1215.y, node1215.z) / 1.5)) * 0.5) + 0.5), u_Colorgain) * 2.0) - 1.0) * 0.5) + 0.5), 1.0), 2.0);
	float node1231 = (node815 - node1081);
	vec3 node1238 = vec3(node825, node839, (node841 + 40.0));
	vec3 node1230 = vec3(node1231, ((ns_simplex3((vec3(node1238.x, node1238.y, node1238.z) / 1.5)) * 0.5) + 0.5), 0.5);
	float node1252 = node1230.z;
	bool node1257 = (node1252 < 0.5);
	float node1256_out0;
	if (node1257) {
		node1256_out0 = node1252;
	} else {
		node1256_out0 = (1.0 - node1252);
	}
	float node1251 = (node1252 + (node1230.y * node1256_out0));
	float node1267 = ((2.0 * node1252) - node1251);
	float node1226 = ((fract(node1230.x) * 360.0) / 60.0);
	float node1225 = floor(node1226);
	bool node1247 = (node1225 == 5.0);
	bool node1246 = (node1225 == 4.0);
	bool node1245 = (node1225 == 3.0);
	bool node1244 = (node1225 == 2.0);
	bool node1243 = (node1225 == 1.0);
	bool node1224 = (node1225 == 0.0);
	float node1452_out0;
	if ((node1247 || node1246 || node1245 || node1244 || node1243 || node1224)) {
		node1452_out0 = (node1251 - (((node1251 - node1252) * 2.0) * abs((mod(node1226, 2.0) - 1.0))));
	}
	vec3 node1223_out0;
	if (node1224) {
		node1223_out0 = vec3(node1251, node1452_out0, node1267);
	} else if (node1243) {
		node1223_out0 = vec3(node1452_out0, node1251, node1267);
	} else if (node1244) {
		node1223_out0 = vec3(node1267, node1251, node1452_out0);
	} else if (node1245) {
		node1223_out0 = vec3(node1267, node1452_out0, node1251);
	} else if (node1246) {
		node1223_out0 = vec3(node1452_out0, node1267, node1251);
	} else if (node1247) {
		node1223_out0 = vec3(node1251, node1267, node1452_out0);
	} else {
		node1223_out0 = vec3(node1267, node1267, node1267);
	}
	vec3 node1283 = vec3(node1231, ((((ns_simplex2((vec2(float((u_val3a + 20.0)), 0.0) / 1.5)) * 0.5) + 0.5) * 0.5) + 0.5), ((ns_simplex2((vec2(float((u_val3a + 40.0)), 0.0) / 1.5)) * 0.5) + 0.5));
	float node1309 = node1283.z;
	bool node1314 = (node1309 < 0.5);
	float node1313_out0;
	if (node1314) {
		node1313_out0 = node1309;
	} else {
		node1313_out0 = (1.0 - node1309);
	}
	float node1308 = (node1309 + (node1283.y * node1313_out0));
	float node1324 = ((2.0 * node1309) - node1308);
	float node1279 = ((fract(node1283.x) * 360.0) / 60.0);
	float node1278 = floor(node1279);
	bool node1304 = (node1278 == 5.0);
	bool node1303 = (node1278 == 4.0);
	bool node1302 = (node1278 == 3.0);
	bool node1301 = (node1278 == 2.0);
	bool node1300 = (node1278 == 1.0);
	bool node1277 = (node1278 == 0.0);
	float node1449_out0;
	if ((node1304 || node1303 || node1302 || node1301 || node1300 || node1277)) {
		node1449_out0 = (node1308 - (((node1308 - node1309) * 2.0) * abs((mod(node1279, 2.0) - 1.0))));
	}
	vec3 node1276_out0;
	if (node1277) {
		node1276_out0 = vec3(node1308, node1449_out0, node1324);
	} else if (node1300) {
		node1276_out0 = vec3(node1449_out0, node1308, node1324);
	} else if (node1301) {
		node1276_out0 = vec3(node1324, node1308, node1449_out0);
	} else if (node1302) {
		node1276_out0 = vec3(node1324, node1449_out0, node1308);
	} else if (node1303) {
		node1276_out0 = vec3(node1449_out0, node1324, node1308);
	} else if (node1304) {
		node1276_out0 = vec3(node1308, node1324, node1449_out0);
	} else {
		node1276_out0 = vec3(node1324, node1324, node1324);
	}
	vec3 node1345 = vec3(node1199, (node1042 * 20.0), (node1200 + 10.0));
	vec3 node1361 = vec3(node1058, node1061, (node1216 + 10.0));
	bool node1380 = (Clone_0.size > 1.0);
	float node1379_out0;
	if (node1380) {
		node1379_out0 = (node26 / (Clone_0.size - 1.0));
	} else {
		node1379_out0 = 0.5;
	}
	float node1386 = float((Clone_1.idx == 6.0));
	vec3 node1405 = (node348 * node633);
	vec3 node796 = mix((((((((mix(node806_out0, node890_out0, 1.0) * (1.0 - node954)) + ((((mix(node1072_out0, node1128_out0, 1.0) * (1.0 - node1185)) + (mix(node1223_out0, node1276_out0, 1.0) * node1185)) * gain(mix(((((gain(((ns_simplex3((vec3(node1345.x, node1345.y, node1345.z) / 1.5)) * 0.5) + 0.5), 1.0) * 2.0) - 1.0) * 0.5) + 0.5), ((((gain(((ns_simplex3((vec3(node1361.x, node1361.y, node1361.z) / 1.5)) * 0.5) + 0.5), 2.0) * 2.0) - 1.0) * 0.5) + 0.5), 1.0), 2.0)) * node954)) * gain(parabola(clamp(n01(n11(node746)), 0.0, 1.0), 0.7), 2.0)) * mix(1.0, 0.5, pow(node274, 1.0))) * mix(1.0, smoothstep((1.0 - ((node221_out0 + (node1379_out0 * 3.0)) * 0.07)), 0.5, node746), node1386)) * mix(1.0, pow((node746 * 0.5), 2.0), min(node1386, float((mod(Clone_0.idx, 2.0) == 0.0))))) * mix(1.0, pow(node746, 0.75), min(node1386, float((mod(Clone_0.idx, 1.0) == 0.0))))), vec3(fract(node1405.x), fract(node1405.y), fract(node1405.z)), u_Shownoisepos);
	vec3 node793 = vec3(pow(node796.r, 0.75), pow(node796.g, 0.75), pow(node796.b, 0.75));
	vec2 node792 = node793.yz;
	float node790 = gain(node792.y, 2.0);
	float node789 = (1.0 - node790);
	float node1418 = gain(node792.x, 2.0);
	float node1417 = (1.0 - node1418);
	float node1427 = gain(node793.x, 2.0);
	vec3 node782 = clamp(((((((node7 * node789) + (vec3(1.0, 1.0, 0.0) * node790)) * node1417) + (((vec3(1.0, 0.0, 0.0) * node789) + (vec3(1.0, 0.5, 0.0) * node790)) * node1418)) * (1.0 - node1427)) + (((((node690 * node789) + (vec3(0.0, 0.5, 0.0) * node790)) * node1417) + (((vec3(1.0, 0.0, 1.0) * node789) + (node633 * node790)) * node1418)) * node1427)), 0.0, 1.0);
	hue = node782.r;
	sat = node782.g;
	val = node782.b;
	


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
    `,n=[],Y=512;for(let YA=0;YA<Y;YA++)n.push(.3),n.push(0),n.push(0),n.push(1);let u={mag:D.LINEAR,min:D.LINEAR,level:0,format:D.RGBA,internalFormat:D.RGBA16F,type:D.FLOAT,width:Y,height:1,src:n};const v=twgl.createTexture(D,u);twgl.setTextureFromArray(D,v,n,u);let K=32040;var x=1024,M=Math.ceil(K/x);const z=twgl.createProgramInfo(D,[N,H]),j={position:[-1,-1,0,1,-1,0,-1,1,0,-1,1,0,1,-1,0,1,1,0]},QA=twgl.createBufferInfoFromArrays(D,j),T=[{mag:D.NEAREST,min:D.NEAREST,level:0,format:D.RGBA,internalFormat:D.RGBA16F,type:D.FLOAT},{mag:D.NEAREST,min:D.NEAREST,level:0,format:D.RGBA,internalFormat:D.RGBA,type:D.UNSIGNED_BYTE}];let wA=twgl.createFramebufferInfo(D,T,x,M);const EA=twgl.createProgramInfo(D,[s,R]);let IA=[];for(let YA=0;YA<K;YA++)IA.push(YA);const CA={a_idx:{numComponents:1,data:IA}},sA=twgl.createBufferInfoFromArrays(D,CA);let p=0,AA=0;function iA(YA){AA+=I.speed*.01;const FA=Q.clientWidth,GA=Q.clientHeight,LA=1080,aA=1920;I.render?(FA!==LA||GA!==aA)&&(Q.width=LA,Q.height=aA):(FA!==Q.width||GA!==Q.height)&&(Q.width=FA,Q.height=GA),y=[Q.width,Q.height],D.viewport(0,0,D.canvas.width,D.canvas.height),D.disable(D.BLEND),D.useProgram(z.program),twgl.setBuffersAndAttributes(D,z,QA),twgl.setUniforms(z,{res:[x,M],time:YA*1e3,numPoints:K,u_seed:I.seed,u_off:AA,u_offset:.1,u_resx:Q.width,u_resy:Q.height,u_mix1:1,u_mix2:0,u_move:0,u_seed:I.seed,u_speed:.5,u_reflect:0,u_weight_high:1,u_weight_low:1,u_tex0:v,u_tx:I.tx,u_ty:I.ty,u_val1a:I.val1a,u_val1b:I.val1b,u_val2a:I.val2a,u_val2b:I.val2b,u_val3a:I.val3a,u_val3b:I.val3b,u_val4a:I.val4a,u_val4b:I.val4b,u_render:1}),twgl.setUniforms(z,$D),twgl.bindFramebufferInfo(D,wA),D.drawBuffers([D.COLOR_ATTACHMENT0,D.COLOR_ATTACHMENT1,D.NONE,D.NONE]),twgl.drawBufferInfo(D,QA),twgl.bindFramebufferInfo(D,null),D.useProgram(EA.program),D.clearColor(0,0,0,1),D.clear(D.COLOR_BUFFER_BIT),D.enable(D.BLEND),D.blendEquation(D.MAX),D.blendFunc(D.ONE,D.ONE),twgl.setBuffersAndAttributes(D,EA,sA),twgl.setUniforms(EA,{tex_size:[wA.width,wA.height],point_size:y[1]/1024*2,pos_tex:wA.attachments[0],color_tex:wA.attachments[1]}),twgl.drawBufferInfo(D,sA,D.POINTS),C(p),p+=1}return iA};function Ji(Q){return Q&&Q.__esModule&&Object.prototype.hasOwnProperty.call(Q,"default")?Q.default:Q}function Bo(Q){if(Q.__esModule)return Q;var I=Q.default;if(typeof I=="function"){var C=function y(){return this instanceof y?Reflect.construct(I,arguments,this.constructor):I.apply(this,arguments)};C.prototype=I.prototype}else C={};return Object.defineProperty(C,"__esModule",{value:!0}),Object.keys(Q).forEach(function(y){var D=Object.getOwnPropertyDescriptor(Q,y);Object.defineProperty(C,y,D.get?D:{enumerable:!0,get:function(){return Q[y]}})}),C}var Vi={exports:{}};/*! file-extension v4.0.5 | (c) silverwind | BSD license */(function(Q,I){(function(C){Q.exports=C()})(function(){return function(y,D){if(D||(D={}),!y)return"";var U=(/[^./\\]*$/.exec(y)||[""])[0];return D.preserveCase?U:U.toLowerCase()}})})(Vi);var Qo=Vi.exports;const Io=Ji(Qo);function go(Q){const I=Q.includes(".")&&Io(Q);return`image/${I==="jpg"?"jpeg":I||"png"}`}function hi(Q,I){const C=document.createElement("a");C.download=Q,C.href=I;const y=new MouseEvent("click");C.dispatchEvent(y)}function Eo(Q,I={}){const C=new Date,{filename:y=`Screen Shot ${C.toISOString().slice(0,10)} at ${C.toTimeString().slice(0,8).replace(/:/g,".")}.png`,type:D=go(y),quality:U=1,useBlob:N,download:H=!0}={...I};if(N)return new Promise(R=>{Q.toBlob(n=>{if(H){const Y=URL.createObjectURL(n);hi(y,Y),setTimeout(()=>{URL.revokeObjectURL(Y)},1)}R(n)},D,U)});const s=Q.toDataURL(D,U);return H&&hi(y,s),s}var pE=(Q,I,C)=>{if(!I.has(Q))throw TypeError("Cannot "+C)},t=(Q,I,C)=>(pE(Q,I,"read from private field"),C?C.call(Q):I.get(Q)),BA=(Q,I,C)=>{if(I.has(Q))throw TypeError("Cannot add the same private member more than once");I instanceof WeakSet?I.add(Q):I.set(Q,C)},rA=(Q,I,C,y)=>(pE(Q,I,"write to private field"),I.set(Q,C),C),Co=(Q,I,C,y)=>({set _(D){rA(Q,I,D)},get _(){return t(Q,I,y)}}),gA=(Q,I,C)=>(pE(Q,I,"access private method"),C),yA=new Uint8Array(8),cB=new DataView(yA.buffer),SA=Q=>[(Q%256+256)%256],HA=Q=>(cB.setUint16(0,Q,!1),[yA[0],yA[1]]),io=Q=>(cB.setInt16(0,Q,!1),[yA[0],yA[1]]),Ki=Q=>(cB.setUint32(0,Q,!1),[yA[1],yA[2],yA[3]]),J=Q=>(cB.setUint32(0,Q,!1),[yA[0],yA[1],yA[2],yA[3]]),Do=Q=>(cB.setInt32(0,Q,!1),[yA[0],yA[1],yA[2],yA[3]]),oQ=Q=>(cB.setUint32(0,Math.floor(Q/2**32),!1),cB.setUint32(4,Q,!1),[yA[0],yA[1],yA[2],yA[3],yA[4],yA[5],yA[6],yA[7]]),xE=Q=>(cB.setInt16(0,2**8*Q,!1),[yA[0],yA[1]]),yB=Q=>(cB.setInt32(0,2**16*Q,!1),[yA[0],yA[1],yA[2],yA[3]]),IE=Q=>(cB.setInt32(0,2**30*Q,!1),[yA[0],yA[1],yA[2],yA[3]]),$A=(Q,I=!1)=>{let C=Array(Q.length).fill(null).map((y,D)=>Q.charCodeAt(D));return I&&C.push(0),C},hg=Q=>Q&&Q[Q.length-1],mE=Q=>{let I;for(let C of Q)(!I||C.presentationTimestamp>I.presentationTimestamp)&&(I=C);return I},FB=(Q,I,C=!0)=>{let y=Q*I;return C?Math.round(y):y},fi=Q=>{let I=Q*(Math.PI/180),C=Math.cos(I),y=Math.sin(I);return[C,y,0,-y,C,0,0,0,1]},ui=fi(0),pi=Q=>[yB(Q[0]),yB(Q[1]),IE(Q[2]),yB(Q[3]),yB(Q[4]),IE(Q[5]),yB(Q[6]),yB(Q[7]),IE(Q[8])],tI=Q=>!Q||typeof Q!="object"?Q:Array.isArray(Q)?Q.map(tI):Object.fromEntries(Object.entries(Q).map(([I,C])=>[I,tI(C)])),vQ=Q=>Q>=0&&Q<2**32,kA=(Q,I,C)=>({type:Q,contents:I&&new Uint8Array(I.flat(10)),children:C}),eA=(Q,I,C,y,D)=>kA(Q,[SA(I),Ki(C),y??[]],D),oo=Q=>{let I=512;return Q.fragmented?kA("ftyp",[$A("iso5"),J(I),$A("iso5"),$A("iso6"),$A("mp41")]):kA("ftyp",[$A("isom"),J(I),$A("isom"),Q.holdsAvc?$A("avc1"):[],$A("mp41")])},yE=Q=>({type:"mdat",largeSize:Q}),yo=Q=>({type:"free",size:Q}),Bg=(Q,I,C=!1)=>kA("moov",null,[so(I,Q),...Q.map(y=>Fo(y,I)),C?mo(Q):null]),so=(Q,I)=>{let C=FB(Math.max(0,...I.filter(N=>N.samples.length>0).map(N=>{const H=mE(N.samples);return H.presentationTimestamp+H.duration})),cE),y=Math.max(...I.map(N=>N.id))+1,D=!vQ(Q)||!vQ(C),U=D?oQ:J;return eA("mvhd",+D,0,[U(Q),U(Q),J(cE),U(C),yB(1),xE(1),Array(10).fill(0),pi(ui),Array(24).fill(0),J(y)])},Fo=(Q,I)=>kA("trak",null,[co(Q,I),Uo(Q,I)]),co=(Q,I)=>{let C=mE(Q.samples),y=FB(C?C.presentationTimestamp+C.duration:0,cE),D=!vQ(I)||!vQ(y),U=D?oQ:J,N;return Q.info.type==="video"?N=typeof Q.info.rotation=="number"?fi(Q.info.rotation):Q.info.rotation:N=ui,eA("tkhd",+D,3,[U(I),U(I),J(Q.id),J(0),U(y),Array(8).fill(0),HA(0),HA(0),xE(Q.info.type==="audio"?1:0),HA(0),pi(N),yB(Q.info.type==="video"?Q.info.width:0),yB(Q.info.type==="video"?Q.info.height:0)])},Uo=(Q,I)=>kA("mdia",null,[wo(Q,I),No(Q.info.type==="video"?"vide":"soun"),to(Q)]),wo=(Q,I)=>{let C=mE(Q.samples),y=FB(C?C.presentationTimestamp+C.duration:0,Q.timescale),D=!vQ(I)||!vQ(y),U=D?oQ:J;return eA("mdhd",+D,0,[U(I),U(I),J(Q.timescale),U(y),HA(21956),HA(0)])},No=Q=>eA("hdlr",0,0,[$A("mhlr"),$A(Q),J(0),J(0),J(0),$A("mp4-muxer-hdlr",!0)]),to=Q=>kA("minf",null,[Q.info.type==="video"?Ho():Go(),ao(),Yo(Q)]),Ho=()=>eA("vmhd",0,1,[HA(0),HA(0),HA(0),HA(0)]),Go=()=>eA("smhd",0,0,[HA(0),HA(0)]),ao=()=>kA("dinf",null,[eo()]),eo=()=>eA("dref",0,0,[J(1)],[ho()]),ho=()=>eA("url ",0,1),Yo=Q=>{const I=Q.compositionTimeOffsetTable.length>1||Q.compositionTimeOffsetTable.some(C=>C.sampleCompositionTimeOffset!==0);return kA("stbl",null,[Lo(Q),Vo(Q),Ko(Q),fo(Q),uo(Q),po(Q),I?xo(Q):null])},Lo=Q=>eA("stsd",0,0,[J(1)],[Q.info.type==="video"?Ro(To[Q.info.codec],Q):Mo(_o[Q.info.codec],Q)]),Ro=(Q,I)=>kA(Q,[Array(6).fill(0),HA(1),HA(0),HA(0),Array(12).fill(0),HA(I.info.width),HA(I.info.height),J(4718592),J(4718592),J(0),HA(1),Array(32).fill(0),HA(24),io(65535)],[Po[I.info.codec](I)]),no=Q=>Q.info.decoderConfig&&kA("avcC",[...new Uint8Array(Q.info.decoderConfig.description)]),ko=Q=>Q.info.decoderConfig&&kA("hvcC",[...new Uint8Array(Q.info.decoderConfig.description)]),So=Q=>{if(!Q.info.decoderConfig)return null;let I=Q.info.decoderConfig;if(!I.colorSpace)throw new Error("'colorSpace' is required in the decoder config for VP9.");let C=I.codec.split("."),y=Number(C[1]),D=Number(C[2]),H=(Number(C[3])<<4)+(0<<1)+Number(I.colorSpace.fullRange);return eA("vpcC",1,0,[SA(y),SA(D),SA(H),SA(2),SA(2),SA(2),HA(0)])},ro=()=>{let C=(1<<7)+1;return kA("av1C",[C,0,0,0])},Mo=(Q,I)=>kA(Q,[Array(6).fill(0),HA(1),HA(0),HA(0),J(0),HA(I.info.numberOfChannels),HA(16),HA(0),HA(0),yB(I.info.sampleRate)],[$o[I.info.codec](I)]),lo=Q=>{let I=new Uint8Array(Q.info.decoderConfig.description);return eA("esds",0,0,[J(58753152),SA(32+I.byteLength),HA(1),SA(0),J(75530368),SA(18+I.byteLength),SA(64),SA(21),Ki(0),J(130071),J(130071),J(92307584),SA(I.byteLength),...I,J(109084800),SA(1),SA(2)])},Jo=Q=>kA("dOps",[SA(0),SA(Q.info.numberOfChannels),HA(3840),J(Q.info.sampleRate),xE(0),SA(0)]),Vo=Q=>eA("stts",0,0,[J(Q.timeToSampleTable.length),Q.timeToSampleTable.map(I=>[J(I.sampleCount),J(I.sampleDelta)])]),Ko=Q=>{if(Q.samples.every(C=>C.type==="key"))return null;let I=[...Q.samples.entries()].filter(([,C])=>C.type==="key");return eA("stss",0,0,[J(I.length),I.map(([C])=>J(C+1))])},fo=Q=>eA("stsc",0,0,[J(Q.compactlyCodedChunkTable.length),Q.compactlyCodedChunkTable.map(I=>[J(I.firstChunk),J(I.samplesPerChunk),J(1)])]),uo=Q=>eA("stsz",0,0,[J(0),J(Q.samples.length),Q.samples.map(I=>J(I.size))]),po=Q=>Q.finalizedChunks.length>0&&hg(Q.finalizedChunks).offset>=2**32?eA("co64",0,0,[J(Q.finalizedChunks.length),Q.finalizedChunks.map(I=>oQ(I.offset))]):eA("stco",0,0,[J(Q.finalizedChunks.length),Q.finalizedChunks.map(I=>J(I.offset))]),xo=Q=>eA("ctts",0,0,[J(Q.compositionTimeOffsetTable.length),Q.compositionTimeOffsetTable.map(I=>[J(I.sampleCount),J(I.sampleCompositionTimeOffset)])]),mo=Q=>kA("mvex",null,Q.map(bo)),bo=Q=>eA("trex",0,0,[J(Q.id),J(1),J(0),J(0),J(0)]),Yi=(Q,I)=>kA("moof",null,[Zo(Q),...I.map(vo)]),Zo=Q=>eA("mfhd",0,0,[J(Q)]),xi=Q=>{let I=0,C=0,y=0,D=0,U=Q.type==="delta";return C|=+U,U?I|=1:I|=2,I<<24|C<<16|y<<8|D},vo=Q=>kA("traf",null,[Oo(Q),qo(Q),Wo(Q)]),Oo=Q=>{let I=0;I|=8,I|=16,I|=32,I|=131072;let C=Q.currentChunk.samples[1]??Q.currentChunk.samples[0],y={duration:C.timescaleUnitsToNextSample,size:C.size,flags:xi(C)};return eA("tfhd",0,I,[J(Q.id),J(y.duration),J(y.size),J(y.flags)])},qo=Q=>eA("tfdt",1,0,[oQ(FB(Q.currentChunk.startTimestamp,Q.timescale))]),Wo=Q=>{let I=Q.currentChunk.samples.map(x=>x.timescaleUnitsToNextSample),C=Q.currentChunk.samples.map(x=>x.size),y=Q.currentChunk.samples.map(xi),D=Q.currentChunk.samples.map(x=>FB(x.presentationTimestamp-x.decodeTimestamp,Q.timescale)),U=new Set(I),N=new Set(C),H=new Set(y),s=new Set(D),R=H.size===2&&y[0]!==y[1],n=U.size>1,Y=N.size>1,u=!R&&H.size>1,v=s.size>1||[...s].some(x=>x!==0),K=0;return K|=1,K|=4*+R,K|=256*+n,K|=512*+Y,K|=1024*+u,K|=2048*+v,eA("trun",1,K,[J(Q.currentChunk.samples.length),J(Q.currentChunk.offset-Q.currentChunk.moofOffset||0),R?J(y[0]):[],Q.currentChunk.samples.map((x,M)=>[n?J(I[M]):[],Y?J(C[M]):[],u?J(y[M]):[],v?Do(D[M]):[]])])},Xo=Q=>kA("mfra",null,[...Q.map(zo),jo()]),zo=(Q,I)=>eA("tfra",1,0,[J(Q.id),J(63),J(Q.finalizedChunks.length),Q.finalizedChunks.map(y=>[oQ(FB(y.startTimestamp,Q.timescale)),oQ(y.moofOffset),J(I+1),J(1),J(1)])]),jo=()=>eA("mfro",0,0,[J(0)]),To={avc:"avc1",hevc:"hvc1",vp9:"vp09",av1:"av01"},Po={avc:no,hevc:ko,vp9:So,av1:ro},_o={aac:"mp4a",opus:"Opus"},$o={aac:lo,opus:Jo},mi=class{constructor(){this.buffer=null}},bE=class{constructor(I){this.options=I}},bi=class{constructor(I,C){this.stream=I,this.options=C}},WB,nQ,ZE=class{constructor(){this.pos=0,BA(this,WB,new Uint8Array(8)),BA(this,nQ,new DataView(t(this,WB).buffer)),this.offsets=new WeakMap}seek(I){this.pos=I}writeU32(I){t(this,nQ).setUint32(0,I,!1),this.write(t(this,WB).subarray(0,4))}writeU64(I){t(this,nQ).setUint32(0,Math.floor(I/2**32),!1),t(this,nQ).setUint32(4,I,!1),this.write(t(this,WB).subarray(0,8))}writeAscii(I){for(let C=0;C<I.length;C++)t(this,nQ).setUint8(C%8,I.charCodeAt(C)),C%8===7&&this.write(t(this,WB));I.length%8!==0&&this.write(t(this,WB).subarray(0,I.length%8))}writeBox(I){if(this.offsets.set(I,this.pos),I.contents&&!I.children)this.writeBoxHeader(I,I.size??I.contents.byteLength+8),this.write(I.contents);else{let C=this.pos;if(this.writeBoxHeader(I,0),I.contents&&this.write(I.contents),I.children)for(let U of I.children)U&&this.writeBox(U);let y=this.pos,D=I.size??y-C;this.seek(C),this.writeBoxHeader(I,D),this.seek(y)}}writeBoxHeader(I,C){this.writeU32(I.largeSize?1:C),this.writeAscii(I.type),I.largeSize&&this.writeU64(C)}measureBoxHeader(I){return 8+(I.largeSize?8:0)}patchBox(I){let C=this.pos;this.seek(this.offsets.get(I)),this.writeBox(I),this.seek(C)}measureBox(I){if(I.contents&&!I.children)return this.measureBoxHeader(I)+I.contents.byteLength;{let C=this.measureBoxHeader(I);if(I.contents&&(C+=I.contents.byteLength),I.children)for(let y of I.children)y&&(C+=this.measureBox(y));return C}}};WB=new WeakMap;nQ=new WeakMap;var Qg,CQ,kI,FI,Ig,sE,Ay=class extends ZE{constructor(I){super(),BA(this,Ig),BA(this,Qg,void 0),BA(this,CQ,new ArrayBuffer(2**16)),BA(this,kI,new Uint8Array(t(this,CQ))),BA(this,FI,0),rA(this,Qg,I)}write(I){gA(this,Ig,sE).call(this,this.pos+I.byteLength),t(this,kI).set(I,this.pos),this.pos+=I.byteLength,rA(this,FI,Math.max(t(this,FI),this.pos))}finalize(){gA(this,Ig,sE).call(this,this.pos),t(this,Qg).buffer=t(this,CQ).slice(0,Math.max(t(this,FI),this.pos))}};Qg=new WeakMap;CQ=new WeakMap;kI=new WeakMap;FI=new WeakMap;Ig=new WeakSet;sE=function(Q){let I=t(this,CQ).byteLength;for(;I<Q;)I*=2;if(I===t(this,CQ).byteLength)return;let C=new ArrayBuffer(I),y=new Uint8Array(C);y.set(t(this,kI),0),rA(this,CQ,C),rA(this,kI,y)};var gg,XB,Zi=class extends ZE{constructor(I){super(),BA(this,gg,void 0),BA(this,XB,[]),rA(this,gg,I)}write(I){t(this,XB).push({data:I.slice(),start:this.pos}),this.pos+=I.byteLength}flush(){var y,D;if(t(this,XB).length===0)return;let I=[],C=[...t(this,XB)].sort((U,N)=>U.start-N.start);I.push({start:C[0].start,size:C[0].data.byteLength});for(let U=1;U<C.length;U++){let N=I[I.length-1],H=C[U];H.start<=N.start+N.size?N.size=Math.max(N.size,H.start+H.data.byteLength-N.start):I.push({start:H.start,size:H.data.byteLength})}for(let U of I){U.data=new Uint8Array(U.size);for(let N of t(this,XB))U.start<=N.start&&N.start<U.start+U.size&&U.data.set(N.data,N.start-U.start);(D=(y=t(this,gg).options).onData)==null||D.call(y,U.data,U.start)}t(this,XB).length=0}finalize(){}};gg=new WeakMap;XB=new WeakMap;var By=2**24,Qy=2,Yg,AB,qA,Lg,FE,vE,vi,OE,Oi,HI,Rg,qi=class extends ZE{constructor(I){var C;if(super(),BA(this,Lg),BA(this,vE),BA(this,OE),BA(this,HI),BA(this,Yg,void 0),BA(this,AB,void 0),BA(this,qA,[]),rA(this,Yg,I),rA(this,AB,((C=I.options)==null?void 0:C.chunkSize)??By),!Number.isInteger(t(this,AB))||t(this,AB)<2**10)throw new Error("Invalid StreamTarget options: chunkSize must be an integer not smaller than 1024.")}write(I){gA(this,Lg,FE).call(this,I,this.pos),gA(this,HI,Rg).call(this),this.pos+=I.byteLength}finalize(){gA(this,HI,Rg).call(this,!0)}};Yg=new WeakMap;AB=new WeakMap;qA=new WeakMap;Lg=new WeakSet;FE=function(Q,I){let C=t(this,qA).findIndex(H=>H.start<=I&&I<H.start+t(this,AB));C===-1&&(C=gA(this,OE,Oi).call(this,I));let y=t(this,qA)[C],D=I-y.start,U=Q.subarray(0,Math.min(t(this,AB)-D,Q.byteLength));y.data.set(U,D);let N={start:D,end:D+U.byteLength};if(gA(this,vE,vi).call(this,y,N),y.written[0].start===0&&y.written[0].end===t(this,AB)&&(y.shouldFlush=!0),t(this,qA).length>Qy){for(let H=0;H<t(this,qA).length-1;H++)t(this,qA)[H].shouldFlush=!0;gA(this,HI,Rg).call(this)}U.byteLength<Q.byteLength&&gA(this,Lg,FE).call(this,Q.subarray(U.byteLength),I+U.byteLength)};vE=new WeakSet;vi=function(Q,I){let C=0,y=Q.written.length-1,D=-1;for(;C<=y;){let U=Math.floor(C+(y-C+1)/2);Q.written[U].start<=I.start?(C=U+1,D=U):y=U-1}for(Q.written.splice(D+1,0,I),(D===-1||Q.written[D].end<I.start)&&D++;D<Q.written.length-1&&Q.written[D].end>=Q.written[D+1].start;)Q.written[D].end=Math.max(Q.written[D].end,Q.written[D+1].end),Q.written.splice(D+1,1)};OE=new WeakSet;Oi=function(Q){let C={start:Math.floor(Q/t(this,AB))*t(this,AB),data:new Uint8Array(t(this,AB)),written:[],shouldFlush:!1};return t(this,qA).push(C),t(this,qA).sort((y,D)=>y.start-D.start),t(this,qA).indexOf(C)};HI=new WeakSet;Rg=function(Q=!1){var I,C;for(let y=0;y<t(this,qA).length;y++){let D=t(this,qA)[y];if(!(!D.shouldFlush&&!Q)){for(let U of D.written)(C=(I=t(this,Yg).options).onData)==null||C.call(I,D.data.subarray(U.start,U.end),D.start+U.start);t(this,qA).splice(y--,1)}}};var Iy=class extends qi{constructor(I){var C;super(new bE({onData:(y,D)=>I.stream.write({type:"write",data:y,position:D}),chunkSize:(C=I.options)==null?void 0:C.chunkSize}))}},cE=1e3,gy=["avc","hevc","vp9","av1"],Ey=["aac","opus"],Cy=2082844800,iy=["strict","offset","cross-track-offset"],m,X,ng,vA,lA,JA,rQ,fQ,qE,zB,jB,GI,UE,Wi,wE,Xi,WE,zi,NE,ji,XE,Ti,Eg,tE,CB,HB,zE,Pi,aI,kg,Sg,jE,OQ,VI,Cg,HE,Dy=class{constructor(I){var C;if(BA(this,UE),BA(this,wE),BA(this,WE),BA(this,NE),BA(this,XE),BA(this,Eg),BA(this,CB),BA(this,zE),BA(this,aI),BA(this,Sg),BA(this,OQ),BA(this,Cg),BA(this,m,void 0),BA(this,X,void 0),BA(this,ng,void 0),BA(this,vA,void 0),BA(this,lA,null),BA(this,JA,null),BA(this,rQ,Math.floor(Date.now()/1e3)+Cy),BA(this,fQ,[]),BA(this,qE,1),BA(this,zB,[]),BA(this,jB,[]),BA(this,GI,!1),gA(this,UE,Wi).call(this,I),I.video=tI(I.video),I.audio=tI(I.audio),I.fastStart=tI(I.fastStart),this.target=I.target,rA(this,m,{firstTimestampBehavior:"strict",...I}),I.target instanceof mi)rA(this,X,new Ay(I.target));else if(I.target instanceof bE)rA(this,X,(C=I.target.options)!=null&&C.chunked?new qi(I.target):new Zi(I.target));else if(I.target instanceof bi)rA(this,X,new Iy(I.target));else throw new Error(`Invalid target: ${I.target}`);gA(this,NE,ji).call(this),gA(this,wE,Xi).call(this)}addVideoChunk(I,C,y,D){let U=new Uint8Array(I.byteLength);I.copyTo(U),this.addVideoChunkRaw(U,I.type,y??I.timestamp,I.duration,C,D)}addVideoChunkRaw(I,C,y,D,U,N){if(gA(this,Cg,HE).call(this),!t(this,m).video)throw new Error("No video track declared.");if(typeof t(this,m).fastStart=="object"&&t(this,lA).samples.length===t(this,m).fastStart.expectedVideoChunks)throw new Error(`Cannot add more video chunks than specified in 'fastStart' (${t(this,m).fastStart.expectedVideoChunks}).`);let H=gA(this,Eg,tE).call(this,t(this,lA),I,C,y,D,U,N);if(t(this,m).fastStart==="fragmented"&&t(this,JA)){for(;t(this,jB).length>0&&t(this,jB)[0].decodeTimestamp<=H.decodeTimestamp;){let s=t(this,jB).shift();gA(this,CB,HB).call(this,t(this,JA),s)}H.decodeTimestamp<=t(this,JA).lastDecodeTimestamp?gA(this,CB,HB).call(this,t(this,lA),H):t(this,zB).push(H)}else gA(this,CB,HB).call(this,t(this,lA),H)}addAudioChunk(I,C,y){let D=new Uint8Array(I.byteLength);I.copyTo(D),this.addAudioChunkRaw(D,I.type,y??I.timestamp,I.duration,C)}addAudioChunkRaw(I,C,y,D,U){if(gA(this,Cg,HE).call(this),!t(this,m).audio)throw new Error("No audio track declared.");if(typeof t(this,m).fastStart=="object"&&t(this,JA).samples.length===t(this,m).fastStart.expectedAudioChunks)throw new Error(`Cannot add more audio chunks than specified in 'fastStart' (${t(this,m).fastStart.expectedAudioChunks}).`);let N=gA(this,Eg,tE).call(this,t(this,JA),I,C,y,D,U);if(t(this,m).fastStart==="fragmented"&&t(this,lA)){for(;t(this,zB).length>0&&t(this,zB)[0].decodeTimestamp<=N.decodeTimestamp;){let H=t(this,zB).shift();gA(this,CB,HB).call(this,t(this,lA),H)}N.decodeTimestamp<=t(this,lA).lastDecodeTimestamp?gA(this,CB,HB).call(this,t(this,JA),N):t(this,jB).push(N)}else gA(this,CB,HB).call(this,t(this,JA),N)}finalize(){if(t(this,GI))throw new Error("Cannot finalize a muxer more than once.");if(t(this,m).fastStart==="fragmented"){for(let C of t(this,zB))gA(this,CB,HB).call(this,t(this,lA),C);for(let C of t(this,jB))gA(this,CB,HB).call(this,t(this,JA),C);gA(this,Sg,jE).call(this,!1)}else t(this,lA)&&gA(this,aI,kg).call(this,t(this,lA)),t(this,JA)&&gA(this,aI,kg).call(this,t(this,JA));let I=[t(this,lA),t(this,JA)].filter(Boolean);if(t(this,m).fastStart==="in-memory"){let C;for(let D=0;D<2;D++){let U=Bg(I,t(this,rQ)),N=t(this,X).measureBox(U);C=t(this,X).measureBox(t(this,vA));let H=t(this,X).pos+N+C;for(let s of t(this,fQ)){s.offset=H;for(let{data:R}of s.samples)H+=R.byteLength,C+=R.byteLength}if(H<2**32)break;C>=2**32&&(t(this,vA).largeSize=!0)}let y=Bg(I,t(this,rQ));t(this,X).writeBox(y),t(this,vA).size=C,t(this,X).writeBox(t(this,vA));for(let D of t(this,fQ))for(let U of D.samples)t(this,X).write(U.data),U.data=null}else if(t(this,m).fastStart==="fragmented"){let C=t(this,X).pos,y=Xo(I);t(this,X).writeBox(y);let D=t(this,X).pos-C;t(this,X).seek(t(this,X).pos-4),t(this,X).writeU32(D)}else{let C=t(this,X).offsets.get(t(this,vA)),y=t(this,X).pos-C;t(this,vA).size=y,t(this,vA).largeSize=y>=2**32,t(this,X).patchBox(t(this,vA));let D=Bg(I,t(this,rQ));if(typeof t(this,m).fastStart=="object"){t(this,X).seek(t(this,ng)),t(this,X).writeBox(D);let U=C-t(this,X).pos;t(this,X).writeBox(yo(U))}else t(this,X).writeBox(D)}gA(this,OQ,VI).call(this),t(this,X).finalize(),rA(this,GI,!0)}};m=new WeakMap;X=new WeakMap;ng=new WeakMap;vA=new WeakMap;lA=new WeakMap;JA=new WeakMap;rQ=new WeakMap;fQ=new WeakMap;qE=new WeakMap;zB=new WeakMap;jB=new WeakMap;GI=new WeakMap;UE=new WeakSet;Wi=function(Q){if(Q.video){if(!gy.includes(Q.video.codec))throw new Error(`Unsupported video codec: ${Q.video.codec}`);const I=Q.video.rotation;if(typeof I=="number"&&![0,90,180,270].includes(I))throw new Error(`Invalid video rotation: ${I}. Has to be 0, 90, 180 or 270.`);if(Array.isArray(I)&&(I.length!==9||I.some(C=>typeof C!="number")))throw new Error(`Invalid video transformation matrix: ${I.join()}`)}if(Q.audio&&!Ey.includes(Q.audio.codec))throw new Error(`Unsupported audio codec: ${Q.audio.codec}`);if(Q.firstTimestampBehavior&&!iy.includes(Q.firstTimestampBehavior))throw new Error(`Invalid first timestamp behavior: ${Q.firstTimestampBehavior}`);if(typeof Q.fastStart=="object"){if(Q.video&&Q.fastStart.expectedVideoChunks===void 0)throw new Error("'fastStart' is an object but is missing property 'expectedVideoChunks'.");if(Q.audio&&Q.fastStart.expectedAudioChunks===void 0)throw new Error("'fastStart' is an object but is missing property 'expectedAudioChunks'.")}else if(![!1,"in-memory","fragmented"].includes(Q.fastStart))throw new Error("'fastStart' option must be false, 'in-memory', 'fragmented' or an object.")};wE=new WeakSet;Xi=function(){var Q;if(t(this,X).writeBox(oo({holdsAvc:((Q=t(this,m).video)==null?void 0:Q.codec)==="avc",fragmented:t(this,m).fastStart==="fragmented"})),rA(this,ng,t(this,X).pos),t(this,m).fastStart==="in-memory")rA(this,vA,yE(!1));else if(t(this,m).fastStart!=="fragmented"){if(typeof t(this,m).fastStart=="object"){let I=gA(this,WE,zi).call(this);t(this,X).seek(t(this,X).pos+I)}rA(this,vA,yE(!0)),t(this,X).writeBox(t(this,vA))}gA(this,OQ,VI).call(this)};WE=new WeakSet;zi=function(){if(typeof t(this,m).fastStart!="object")return;let Q=0,I=[t(this,m).fastStart.expectedVideoChunks,t(this,m).fastStart.expectedAudioChunks];for(let C of I)C&&(Q+=8*Math.ceil(2/3*C),Q+=4*C,Q+=12*Math.ceil(2/3*C),Q+=4*C,Q+=8*C);return Q+=4096,Q};NE=new WeakSet;ji=function(){if(t(this,m).video&&rA(this,lA,{id:1,info:{type:"video",codec:t(this,m).video.codec,width:t(this,m).video.width,height:t(this,m).video.height,rotation:t(this,m).video.rotation??0,decoderConfig:null},timescale:11520,samples:[],finalizedChunks:[],currentChunk:null,firstDecodeTimestamp:void 0,lastDecodeTimestamp:-1,timeToSampleTable:[],compositionTimeOffsetTable:[],lastTimescaleUnits:null,lastSample:null,compactlyCodedChunkTable:[]}),t(this,m).audio){let Q=gA(this,XE,Ti).call(this,2,t(this,m).audio.sampleRate,t(this,m).audio.numberOfChannels);rA(this,JA,{id:t(this,m).video?2:1,info:{type:"audio",codec:t(this,m).audio.codec,numberOfChannels:t(this,m).audio.numberOfChannels,sampleRate:t(this,m).audio.sampleRate,decoderConfig:{codec:t(this,m).audio.codec,description:Q,numberOfChannels:t(this,m).audio.numberOfChannels,sampleRate:t(this,m).audio.sampleRate}},timescale:t(this,m).audio.sampleRate,samples:[],finalizedChunks:[],currentChunk:null,firstDecodeTimestamp:void 0,lastDecodeTimestamp:-1,timeToSampleTable:[],compositionTimeOffsetTable:[],lastTimescaleUnits:null,lastSample:null,compactlyCodedChunkTable:[]})}};XE=new WeakSet;Ti=function(Q,I,C){let D=[96e3,88200,64e3,48e3,44100,32e3,24e3,22050,16e3,12e3,11025,8e3,7350].indexOf(I),U=C,N="";N+=Q.toString(2).padStart(5,"0"),N+=D.toString(2).padStart(4,"0"),D===15&&(N+=I.toString(2).padStart(24,"0")),N+=U.toString(2).padStart(4,"0");let H=Math.ceil(N.length/8)*8;N=N.padEnd(H,"0");let s=new Uint8Array(N.length/8);for(let R=0;R<N.length;R+=8)s[R/8]=parseInt(N.slice(R,R+8),2);return s};Eg=new WeakSet;tE=function(Q,I,C,y,D,U,N){let H=y/1e6,s=(y-(N??0))/1e6,R=D/1e6,n=gA(this,zE,Pi).call(this,H,s,Q);return H=n.presentationTimestamp,s=n.decodeTimestamp,U!=null&&U.decoderConfig&&(Q.info.decoderConfig===null?Q.info.decoderConfig=U.decoderConfig:Object.assign(Q.info.decoderConfig,U.decoderConfig)),{presentationTimestamp:H,decodeTimestamp:s,duration:R,data:I,size:I.byteLength,type:C,timescaleUnitsToNextSample:FB(R,Q.timescale)}};CB=new WeakSet;HB=function(Q,I){t(this,m).fastStart!=="fragmented"&&Q.samples.push(I);const C=FB(I.presentationTimestamp-I.decodeTimestamp,Q.timescale);if(Q.lastTimescaleUnits!==null){let D=FB(I.decodeTimestamp,Q.timescale,!1),U=Math.round(D-Q.lastTimescaleUnits);if(Q.lastTimescaleUnits+=U,Q.lastSample.timescaleUnitsToNextSample=U,t(this,m).fastStart!=="fragmented"){let N=hg(Q.timeToSampleTable);N.sampleCount===1?(N.sampleDelta=U,N.sampleCount++):N.sampleDelta===U?N.sampleCount++:(N.sampleCount--,Q.timeToSampleTable.push({sampleCount:2,sampleDelta:U}));const H=hg(Q.compositionTimeOffsetTable);H.sampleCompositionTimeOffset===C?H.sampleCount++:Q.compositionTimeOffsetTable.push({sampleCount:1,sampleCompositionTimeOffset:C})}}else Q.lastTimescaleUnits=0,t(this,m).fastStart!=="fragmented"&&(Q.timeToSampleTable.push({sampleCount:1,sampleDelta:FB(I.duration,Q.timescale)}),Q.compositionTimeOffsetTable.push({sampleCount:1,sampleCompositionTimeOffset:C}));Q.lastSample=I;let y=!1;if(!Q.currentChunk)y=!0;else{let D=I.presentationTimestamp-Q.currentChunk.startTimestamp;if(t(this,m).fastStart==="fragmented"){let U=t(this,lA)??t(this,JA);Q===U&&I.type==="key"&&D>=1&&(y=!0,gA(this,Sg,jE).call(this))}else y=D>=.5}y&&(Q.currentChunk&&gA(this,aI,kg).call(this,Q),Q.currentChunk={startTimestamp:I.presentationTimestamp,samples:[]}),Q.currentChunk.samples.push(I)};zE=new WeakSet;Pi=function(Q,I,C){var N,H;const y=t(this,m).firstTimestampBehavior==="strict",D=C.lastDecodeTimestamp===-1;if(y&&D&&I!==0)throw new Error(`The first chunk for your media track must have a timestamp of 0 (received DTS=${I}).Non-zero first timestamps are often caused by directly piping frames or audio data from a MediaStreamTrack into the encoder. Their timestamps are typically relative to the age of thedocument, which is probably what you want.

If you want to offset all timestamps of a track such that the first one is zero, set firstTimestampBehavior: 'offset' in the options.
`);if(t(this,m).firstTimestampBehavior==="offset"||t(this,m).firstTimestampBehavior==="cross-track-offset"){C.firstDecodeTimestamp===void 0&&(C.firstDecodeTimestamp=I);let s;t(this,m).firstTimestampBehavior==="offset"?s=C.firstDecodeTimestamp:s=Math.min(((N=t(this,lA))==null?void 0:N.firstDecodeTimestamp)??1/0,((H=t(this,JA))==null?void 0:H.firstDecodeTimestamp)??1/0),I-=s,Q-=s}if(I<C.lastDecodeTimestamp)throw new Error(`Timestamps must be monotonically increasing (DTS went from ${C.lastDecodeTimestamp*1e6} to ${I*1e6}).`);return C.lastDecodeTimestamp=I,{presentationTimestamp:Q,decodeTimestamp:I}};aI=new WeakSet;kg=function(Q){if(t(this,m).fastStart==="fragmented")throw new Error("Can't finalize individual chunks 'fastStart' is set to 'fragmented'.");if(Q.currentChunk){if(Q.finalizedChunks.push(Q.currentChunk),t(this,fQ).push(Q.currentChunk),(Q.compactlyCodedChunkTable.length===0||hg(Q.compactlyCodedChunkTable).samplesPerChunk!==Q.currentChunk.samples.length)&&Q.compactlyCodedChunkTable.push({firstChunk:Q.finalizedChunks.length,samplesPerChunk:Q.currentChunk.samples.length}),t(this,m).fastStart==="in-memory"){Q.currentChunk.offset=0;return}Q.currentChunk.offset=t(this,X).pos;for(let I of Q.currentChunk.samples)t(this,X).write(I.data),I.data=null;gA(this,OQ,VI).call(this)}};Sg=new WeakSet;jE=function(Q=!0){if(t(this,m).fastStart!=="fragmented")throw new Error("Can't finalize a fragment unless 'fastStart' is set to 'fragmented'.");let I=[t(this,lA),t(this,JA)].filter(H=>H&&H.currentChunk);if(I.length===0)return;let C=Co(this,qE)._++;if(C===1){let H=Bg(I,t(this,rQ),!0);t(this,X).writeBox(H)}let y=t(this,X).pos,D=Yi(C,I);t(this,X).writeBox(D);{let H=yE(!1),s=0;for(let n of I)for(let Y of n.currentChunk.samples)s+=Y.size;let R=t(this,X).measureBox(H)+s;R>=2**32&&(H.largeSize=!0,R=t(this,X).measureBox(H)+s),H.size=R,t(this,X).writeBox(H)}for(let H of I){H.currentChunk.offset=t(this,X).pos,H.currentChunk.moofOffset=y;for(let s of H.currentChunk.samples)t(this,X).write(s.data),s.data=null}let U=t(this,X).pos;t(this,X).seek(t(this,X).offsets.get(D));let N=Yi(C,I);t(this,X).writeBox(N),t(this,X).seek(U);for(let H of I)H.finalizedChunks.push(H.currentChunk),t(this,fQ).push(H.currentChunk),H.currentChunk=null;Q&&gA(this,OQ,VI).call(this)};OQ=new WeakSet;VI=function(){t(this,X)instanceof Zi&&t(this,X).flush()};Cg=new WeakSet;HE=function(){if(t(this,GI))throw new Error("Cannot add new video or audio chunks after the file has been finalized.")};const oy=Object.freeze(Object.defineProperty({__proto__:null,ArrayBufferTarget:mi,FileSystemWritableFileStreamTarget:bi,Muxer:Dy,StreamTarget:bE},Symbol.toStringTag,{value:"Module"}));var yy=Object.defineProperty,Li=Object.getOwnPropertySymbols,sy=Object.prototype.hasOwnProperty,Fy=Object.prototype.propertyIsEnumerable,pA=Math.pow,Ri=(Q,I,C)=>I in Q?yy(Q,I,{enumerable:!0,configurable:!0,writable:!0,value:C}):Q[I]=C,cy=(Q,I)=>{for(var C in I||(I={}))sy.call(I,C)&&Ri(Q,C,I[C]);if(Li)for(var C of Li(I))Fy.call(I,C)&&Ri(Q,C,I[C]);return Q},TE=(Q,I,C)=>{if(!I.has(Q))throw TypeError("Cannot "+C)},c=(Q,I,C)=>(TE(Q,I,"read from private field"),C?C.call(Q):I.get(Q)),k=(Q,I,C)=>{if(I.has(Q))throw TypeError("Cannot add the same private member more than once");I instanceof WeakSet?I.add(Q):I.set(Q,C)},W=(Q,I,C,y)=>(TE(Q,I,"write to private field"),I.set(Q,C),C),V=(Q,I,C)=>(TE(Q,I,"access private method"),C),_i=class{constructor(Q){this.value=Q}},PE=class{constructor(Q){this.value=Q}},$i=Q=>Q<256?1:Q<65536?2:Q<1<<24?3:Q<pA(2,32)?4:Q<pA(2,40)?5:6,Uy=Q=>{if(Q<127)return 1;if(Q<16383)return 2;if(Q<(1<<21)-1)return 3;if(Q<(1<<28)-1)return 4;if(Q<pA(2,35)-1)return 5;if(Q<pA(2,42)-1)return 6;throw new Error("EBML VINT size not supported "+Q)},RQ=(Q,I,C)=>{let y=0;for(let D=I;D<C;D++){let U=Math.floor(D/8),N=Q[U],H=7-(D&7),s=(N&1<<H)>>H;y<<=1,y|=s}return y},wy=(Q,I,C,y)=>{for(let D=I;D<C;D++){let U=Math.floor(D/8),N=Q[U],H=7-(D&7);N&=~(1<<H),N|=(y&1<<C-D-1)>>C-D-1<<H,Q[U]=N}},AD=class{constructor(){this.buffer=null}},_E=class{constructor(Q){this.options=Q}},BD=class{constructor(Q,I){this.stream=Q,this.options=I}},pB,NA,GE,QD,aE,ID,eE,gD,ig,hE,YE,ED,CD=class{constructor(){k(this,GE),k(this,aE),k(this,eE),k(this,ig),k(this,YE),this.pos=0,k(this,pB,new Uint8Array(8)),k(this,NA,new DataView(c(this,pB).buffer)),this.offsets=new WeakMap,this.dataOffsets=new WeakMap}seek(Q){this.pos=Q}writeEBMLVarInt(Q,I=Uy(Q)){let C=0;switch(I){case 1:c(this,NA).setUint8(C++,128|Q);break;case 2:c(this,NA).setUint8(C++,64|Q>>8),c(this,NA).setUint8(C++,Q);break;case 3:c(this,NA).setUint8(C++,32|Q>>16),c(this,NA).setUint8(C++,Q>>8),c(this,NA).setUint8(C++,Q);break;case 4:c(this,NA).setUint8(C++,16|Q>>24),c(this,NA).setUint8(C++,Q>>16),c(this,NA).setUint8(C++,Q>>8),c(this,NA).setUint8(C++,Q);break;case 5:c(this,NA).setUint8(C++,8|Q/pA(2,32)&7),c(this,NA).setUint8(C++,Q>>24),c(this,NA).setUint8(C++,Q>>16),c(this,NA).setUint8(C++,Q>>8),c(this,NA).setUint8(C++,Q);break;case 6:c(this,NA).setUint8(C++,4|Q/pA(2,40)&3),c(this,NA).setUint8(C++,Q/pA(2,32)|0),c(this,NA).setUint8(C++,Q>>24),c(this,NA).setUint8(C++,Q>>16),c(this,NA).setUint8(C++,Q>>8),c(this,NA).setUint8(C++,Q);break;default:throw new Error("Bad EBML VINT size "+I)}this.write(c(this,pB).subarray(0,C))}writeEBML(Q){var I,C;if(Q!==null)if(Q instanceof Uint8Array)this.write(Q);else if(Array.isArray(Q))for(let y of Q)this.writeEBML(y);else if(this.offsets.set(Q,this.pos),V(this,ig,hE).call(this,Q.id),Array.isArray(Q.data)){let y=this.pos,D=Q.size===-1?1:(I=Q.size)!=null?I:4;Q.size===-1?V(this,GE,QD).call(this,255):this.seek(this.pos+D);let U=this.pos;if(this.dataOffsets.set(Q,U),this.writeEBML(Q.data),Q.size!==-1){let N=this.pos-U,H=this.pos;this.seek(y),this.writeEBMLVarInt(N,D),this.seek(H)}}else if(typeof Q.data=="number"){let y=(C=Q.size)!=null?C:$i(Q.data);this.writeEBMLVarInt(y),V(this,ig,hE).call(this,Q.data,y)}else typeof Q.data=="string"?(this.writeEBMLVarInt(Q.data.length),V(this,YE,ED).call(this,Q.data)):Q.data instanceof Uint8Array?(this.writeEBMLVarInt(Q.data.byteLength,Q.size),this.write(Q.data)):Q.data instanceof _i?(this.writeEBMLVarInt(4),V(this,aE,ID).call(this,Q.data.value)):Q.data instanceof PE&&(this.writeEBMLVarInt(8),V(this,eE,gD).call(this,Q.data.value))}};pB=new WeakMap;NA=new WeakMap;GE=new WeakSet;QD=function(Q){c(this,NA).setUint8(0,Q),this.write(c(this,pB).subarray(0,1))};aE=new WeakSet;ID=function(Q){c(this,NA).setFloat32(0,Q,!1),this.write(c(this,pB).subarray(0,4))};eE=new WeakSet;gD=function(Q){c(this,NA).setFloat64(0,Q,!1),this.write(c(this,pB))};ig=new WeakSet;hE=function(Q,I=$i(Q)){let C=0;switch(I){case 6:c(this,NA).setUint8(C++,Q/pA(2,40)|0);case 5:c(this,NA).setUint8(C++,Q/pA(2,32)|0);case 4:c(this,NA).setUint8(C++,Q>>24);case 3:c(this,NA).setUint8(C++,Q>>16);case 2:c(this,NA).setUint8(C++,Q>>8);case 1:c(this,NA).setUint8(C++,Q);break;default:throw new Error("Bad UINT size "+I)}this.write(c(this,pB).subarray(0,C))};YE=new WeakSet;ED=function(Q){this.write(new Uint8Array(Q.split("").map(I=>I.charCodeAt(0))))};var Dg,iQ,SI,og,LE,Ny=class extends CD{constructor(Q){super(),k(this,og),k(this,Dg,void 0),k(this,iQ,new ArrayBuffer(pA(2,16))),k(this,SI,new Uint8Array(c(this,iQ))),W(this,Dg,Q)}write(Q){V(this,og,LE).call(this,this.pos+Q.byteLength),c(this,SI).set(Q,this.pos),this.pos+=Q.byteLength}finalize(){V(this,og,LE).call(this,this.pos),c(this,Dg).buffer=c(this,iQ).slice(0,this.pos)}};Dg=new WeakMap;iQ=new WeakMap;SI=new WeakMap;og=new WeakSet;LE=function(Q){let I=c(this,iQ).byteLength;for(;I<Q;)I*=2;if(I===c(this,iQ).byteLength)return;let C=new ArrayBuffer(I),y=new Uint8Array(C);y.set(c(this,SI),0),W(this,iQ,C),W(this,SI,y)};var kQ,iB,DB,TB,TQ=class extends CD{constructor(Q){super(),this.target=Q,k(this,kQ,!1),k(this,iB,void 0),k(this,DB,void 0),k(this,TB,void 0)}write(Q){if(!c(this,kQ))return;let I=this.pos;if(I<c(this,DB)){if(I+Q.byteLength<=c(this,DB))return;Q=Q.subarray(c(this,DB)-I),I=0}let C=I+Q.byteLength-c(this,DB),y=c(this,iB).byteLength;for(;y<C;)y*=2;if(y!==c(this,iB).byteLength){let D=new Uint8Array(y);D.set(c(this,iB),0),W(this,iB,D)}c(this,iB).set(Q,I-c(this,DB)),W(this,TB,Math.max(c(this,TB),I+Q.byteLength))}startTrackingWrites(){W(this,kQ,!0),W(this,iB,new Uint8Array(pA(2,10))),W(this,DB,this.pos),W(this,TB,this.pos)}getTrackedWrites(){if(!c(this,kQ))throw new Error("Can't get tracked writes since nothing was tracked.");let I={data:c(this,iB).subarray(0,c(this,TB)-c(this,DB)),start:c(this,DB),end:c(this,TB)};return W(this,iB,void 0),W(this,kQ,!1),I}};kQ=new WeakMap;iB=new WeakMap;DB=new WeakMap;TB=new WeakMap;var PB,yg,sg,iD=class extends TQ{constructor(Q,I){super(Q),k(this,PB,[]),k(this,yg,0),k(this,sg,void 0),W(this,sg,I)}write(Q){super.write(Q),c(this,PB).push({data:Q.slice(),start:this.pos}),this.pos+=Q.byteLength}flush(){var Q,I;if(c(this,PB).length===0)return;let C=[],y=[...c(this,PB)].sort((D,U)=>D.start-U.start);C.push({start:y[0].start,size:y[0].data.byteLength});for(let D=1;D<y.length;D++){let U=C[C.length-1],N=y[D];N.start<=U.start+U.size?U.size=Math.max(U.size,N.start+N.data.byteLength-U.start):C.push({start:N.start,size:N.data.byteLength})}for(let D of C){D.data=new Uint8Array(D.size);for(let U of c(this,PB))D.start<=U.start&&U.start<D.start+D.size&&D.data.set(U.data,U.start-D.start);if(c(this,sg)&&D.start<c(this,yg))throw new Error("Internal error: Monotonicity violation.");(I=(Q=this.target.options).onData)==null||I.call(Q,D.data,D.start),W(this,yg,D.start+D.data.byteLength)}c(this,PB).length=0}finalize(){}};PB=new WeakMap;yg=new WeakMap;sg=new WeakMap;var ty=pA(2,24),Hy=2,BB,WA,rg,dg,Mg,RE,$E,DD,AC,oD,eI,lg,yD=class extends TQ{constructor(Q,I){var C,y;if(super(Q),k(this,Mg),k(this,$E),k(this,AC),k(this,eI),k(this,BB,void 0),k(this,WA,[]),k(this,rg,0),k(this,dg,void 0),W(this,BB,(y=(C=Q.options)==null?void 0:C.chunkSize)!=null?y:ty),W(this,dg,I),!Number.isInteger(c(this,BB))||c(this,BB)<pA(2,10))throw new Error("Invalid StreamTarget options: chunkSize must be an integer not smaller than 1024.")}write(Q){super.write(Q),V(this,Mg,RE).call(this,Q,this.pos),V(this,eI,lg).call(this),this.pos+=Q.byteLength}finalize(){V(this,eI,lg).call(this,!0)}};BB=new WeakMap;WA=new WeakMap;rg=new WeakMap;dg=new WeakMap;Mg=new WeakSet;RE=function(Q,I){let C=c(this,WA).findIndex(H=>H.start<=I&&I<H.start+c(this,BB));C===-1&&(C=V(this,AC,oD).call(this,I));let y=c(this,WA)[C],D=I-y.start,U=Q.subarray(0,Math.min(c(this,BB)-D,Q.byteLength));y.data.set(U,D);let N={start:D,end:D+U.byteLength};if(V(this,$E,DD).call(this,y,N),y.written[0].start===0&&y.written[0].end===c(this,BB)&&(y.shouldFlush=!0),c(this,WA).length>Hy){for(let H=0;H<c(this,WA).length-1;H++)c(this,WA)[H].shouldFlush=!0;V(this,eI,lg).call(this)}U.byteLength<Q.byteLength&&V(this,Mg,RE).call(this,Q.subarray(U.byteLength),I+U.byteLength)};$E=new WeakSet;DD=function(Q,I){let C=0,y=Q.written.length-1,D=-1;for(;C<=y;){let U=Math.floor(C+(y-C+1)/2);Q.written[U].start<=I.start?(C=U+1,D=U):y=U-1}for(Q.written.splice(D+1,0,I),(D===-1||Q.written[D].end<I.start)&&D++;D<Q.written.length-1&&Q.written[D].end>=Q.written[D+1].start;)Q.written[D].end=Math.max(Q.written[D].end,Q.written[D+1].end),Q.written.splice(D+1,1)};AC=new WeakSet;oD=function(Q){let C={start:Math.floor(Q/c(this,BB))*c(this,BB),data:new Uint8Array(c(this,BB)),written:[],shouldFlush:!1};return c(this,WA).push(C),c(this,WA).sort((y,D)=>y.start-D.start),c(this,WA).indexOf(C)};eI=new WeakSet;lg=function(Q=!1){var I,C;for(let y=0;y<c(this,WA).length;y++){let D=c(this,WA)[y];if(!(!D.shouldFlush&&!Q)){for(let U of D.written){if(c(this,dg)&&D.start+U.start<c(this,rg))throw new Error("Internal error: Monotonicity violation.");(C=(I=this.target.options).onData)==null||C.call(I,D.data.subarray(U.start,U.end),D.start+U.start),W(this,rg,D.start+U.end)}c(this,WA).splice(y--,1)}}};var Gy=class extends yD{constructor(Q,I){var C;super(new _E({onData:(y,D)=>Q.stream.write({type:"write",data:y,position:D}),chunked:!0,chunkSize:(C=Q.options)==null?void 0:C.chunkSize}),I)}},qQ=1,rI=2,Jg=3,ay=1,ey=2,hy=17,gE=pA(2,15),hI=pA(2,12),ni="https://github.com/Vanilagy/webm-muxer",sD=6,FD=5,Yy=["strict","offset","permissive"],Z,f,dI,MI,aB,WQ,dQ,DQ,XQ,xB,uQ,pQ,hB,zQ,xQ,KB,fB,$B,YI,LI,mQ,bQ,Vg,lI,RI,nE,cD,kE,UD,BC,wD,QC,ND,IC,tD,gC,HD,EC,GD,pg,CC,xg,iC,DC,aD,AQ,MQ,BQ,lQ,SE,eD,rE,hD,cI,Fg,UI,cg,oC,YD,oB,GB,ZQ,JI,nI,Kg,yC,LD,fg,sC,wI,Ug,Ly=class{constructor(Q){k(this,nE),k(this,kE),k(this,BC),k(this,QC),k(this,IC),k(this,gC),k(this,EC),k(this,pg),k(this,xg),k(this,DC),k(this,AQ),k(this,BQ),k(this,SE),k(this,rE),k(this,cI),k(this,UI),k(this,oC),k(this,oB),k(this,ZQ),k(this,nI),k(this,yC),k(this,fg),k(this,wI),k(this,Z,void 0),k(this,f,void 0),k(this,dI,void 0),k(this,MI,void 0),k(this,aB,void 0),k(this,WQ,void 0),k(this,dQ,void 0),k(this,DQ,void 0),k(this,XQ,void 0),k(this,xB,void 0),k(this,uQ,void 0),k(this,pQ,void 0),k(this,hB,void 0),k(this,zQ,void 0),k(this,xQ,0),k(this,KB,[]),k(this,fB,[]),k(this,$B,[]),k(this,YI,void 0),k(this,LI,void 0),k(this,mQ,-1),k(this,bQ,-1),k(this,Vg,-1),k(this,lI,void 0),k(this,RI,!1);var I;V(this,nE,cD).call(this,Q),W(this,Z,cy({type:"webm",firstTimestampBehavior:"strict"},Q)),this.target=Q.target;let C=!!c(this,Z).streaming;if(Q.target instanceof AD)W(this,f,new Ny(Q.target));else if(Q.target instanceof _E)W(this,f,(I=Q.target.options)!=null&&I.chunked?new yD(Q.target,C):new iD(Q.target,C));else if(Q.target instanceof BD)W(this,f,new Gy(Q.target,C));else throw new Error(`Invalid target: ${Q.target}`);V(this,kE,UD).call(this)}addVideoChunk(Q,I,C){let y=new Uint8Array(Q.byteLength);Q.copyTo(y),this.addVideoChunkRaw(y,Q.type,C??Q.timestamp,I)}addVideoChunkRaw(Q,I,C,y){if(V(this,wI,Ug).call(this),!c(this,Z).video)throw new Error("No video track declared.");c(this,YI)===void 0&&W(this,YI,C),y&&V(this,SE,eD).call(this,y);let D=V(this,UI,cg).call(this,Q,I,C,qQ);for(c(this,Z).video.codec==="V_VP9"&&V(this,rE,hD).call(this,D),W(this,mQ,D.timestamp);c(this,fB).length>0&&c(this,fB)[0].timestamp<=D.timestamp;){let U=c(this,fB).shift();V(this,oB,GB).call(this,U,!1)}!c(this,Z).audio||D.timestamp<=c(this,bQ)?V(this,oB,GB).call(this,D,!0):c(this,KB).push(D),V(this,cI,Fg).call(this),V(this,AQ,MQ).call(this)}addAudioChunk(Q,I,C){let y=new Uint8Array(Q.byteLength);Q.copyTo(y),this.addAudioChunkRaw(y,Q.type,C??Q.timestamp,I)}addAudioChunkRaw(Q,I,C,y){if(V(this,wI,Ug).call(this),!c(this,Z).audio)throw new Error("No audio track declared.");c(this,LI)===void 0&&W(this,LI,C),y!=null&&y.decoderConfig&&(c(this,Z).streaming?W(this,xB,V(this,ZQ,JI).call(this,y.decoderConfig.description)):V(this,nI,Kg).call(this,c(this,xB),y.decoderConfig.description));let D=V(this,UI,cg).call(this,Q,I,C,rI);for(W(this,bQ,D.timestamp);c(this,KB).length>0&&c(this,KB)[0].timestamp<=D.timestamp;){let U=c(this,KB).shift();V(this,oB,GB).call(this,U,!0)}!c(this,Z).video||D.timestamp<=c(this,mQ)?V(this,oB,GB).call(this,D,!c(this,Z).video):c(this,fB).push(D),V(this,cI,Fg).call(this),V(this,AQ,MQ).call(this)}addSubtitleChunk(Q,I,C){if(V(this,wI,Ug).call(this),!c(this,Z).subtitles)throw new Error("No subtitle track declared.");I!=null&&I.decoderConfig&&(c(this,Z).streaming?W(this,uQ,V(this,ZQ,JI).call(this,I.decoderConfig.description)):V(this,nI,Kg).call(this,c(this,uQ),I.decoderConfig.description));let y=V(this,UI,cg).call(this,Q.body,"key",C??Q.timestamp,Jg,Q.duration,Q.additions);W(this,Vg,y.timestamp),c(this,$B).push(y),V(this,cI,Fg).call(this),V(this,AQ,MQ).call(this)}finalize(){if(c(this,RI))throw new Error("Cannot finalize a muxer more than once.");for(;c(this,KB).length>0;)V(this,oB,GB).call(this,c(this,KB).shift(),!0);for(;c(this,fB).length>0;)V(this,oB,GB).call(this,c(this,fB).shift(),!0);for(;c(this,$B).length>0&&c(this,$B)[0].timestamp<=c(this,xQ);)V(this,oB,GB).call(this,c(this,$B).shift(),!1);if(c(this,Z).streaming||V(this,fg,sC).call(this),c(this,f).writeEBML(c(this,pQ)),!c(this,Z).streaming){let Q=c(this,f).pos,I=c(this,f).pos-c(this,BQ,lQ);c(this,f).seek(c(this,f).offsets.get(c(this,dI))+4),c(this,f).writeEBMLVarInt(I,sD),c(this,dQ).data=new PE(c(this,xQ)),c(this,f).seek(c(this,f).offsets.get(c(this,dQ))),c(this,f).writeEBML(c(this,dQ)),c(this,aB).data[0].data[1].data=c(this,f).offsets.get(c(this,pQ))-c(this,BQ,lQ),c(this,aB).data[1].data[1].data=c(this,f).offsets.get(c(this,MI))-c(this,BQ,lQ),c(this,aB).data[2].data[1].data=c(this,f).offsets.get(c(this,WQ))-c(this,BQ,lQ),c(this,f).seek(c(this,f).offsets.get(c(this,aB))),c(this,f).writeEBML(c(this,aB)),c(this,f).seek(Q)}V(this,AQ,MQ).call(this),c(this,f).finalize(),W(this,RI,!0)}};Z=new WeakMap;f=new WeakMap;dI=new WeakMap;MI=new WeakMap;aB=new WeakMap;WQ=new WeakMap;dQ=new WeakMap;DQ=new WeakMap;XQ=new WeakMap;xB=new WeakMap;uQ=new WeakMap;pQ=new WeakMap;hB=new WeakMap;zQ=new WeakMap;xQ=new WeakMap;KB=new WeakMap;fB=new WeakMap;$B=new WeakMap;YI=new WeakMap;LI=new WeakMap;mQ=new WeakMap;bQ=new WeakMap;Vg=new WeakMap;lI=new WeakMap;RI=new WeakMap;nE=new WeakSet;cD=function(Q){if(Q.type&&Q.type!=="webm"&&Q.type!=="matroska")throw new Error(`Invalid type: ${Q.type}`);if(Q.firstTimestampBehavior&&!Yy.includes(Q.firstTimestampBehavior))throw new Error(`Invalid first timestamp behavior: ${Q.firstTimestampBehavior}`)};kE=new WeakSet;UD=function(){c(this,f)instanceof TQ&&c(this,f).target.options.onHeader&&c(this,f).startTrackingWrites(),V(this,BC,wD).call(this),c(this,Z).streaming||V(this,gC,HD).call(this),V(this,EC,GD).call(this),V(this,QC,ND).call(this),V(this,IC,tD).call(this),c(this,Z).streaming||(V(this,pg,CC).call(this),V(this,xg,iC).call(this)),V(this,DC,aD).call(this),V(this,AQ,MQ).call(this)};BC=new WeakSet;wD=function(){var Q;let I={id:440786851,data:[{id:17030,data:1},{id:17143,data:1},{id:17138,data:4},{id:17139,data:8},{id:17026,data:(Q=c(this,Z).type)!=null?Q:"webm"},{id:17031,data:2},{id:17029,data:2}]};c(this,f).writeEBML(I)};QC=new WeakSet;ND=function(){W(this,XQ,{id:236,size:4,data:new Uint8Array(hI)}),W(this,xB,{id:236,size:4,data:new Uint8Array(hI)}),W(this,uQ,{id:236,size:4,data:new Uint8Array(hI)})};IC=new WeakSet;tD=function(){W(this,DQ,{id:21936,data:[{id:21937,data:2},{id:21946,data:2},{id:21947,data:2},{id:21945,data:0}]})};gC=new WeakSet;HD=function(){const Q=new Uint8Array([28,83,187,107]),I=new Uint8Array([21,73,169,102]),C=new Uint8Array([22,84,174,107]);W(this,aB,{id:290298740,data:[{id:19899,data:[{id:21419,data:Q},{id:21420,size:5,data:0}]},{id:19899,data:[{id:21419,data:I},{id:21420,size:5,data:0}]},{id:19899,data:[{id:21419,data:C},{id:21420,size:5,data:0}]}]})};EC=new WeakSet;GD=function(){let Q={id:17545,data:new PE(0)};W(this,dQ,Q);let I={id:357149030,data:[{id:2807729,data:1e6},{id:19840,data:ni},{id:22337,data:ni},c(this,Z).streaming?null:Q]};W(this,MI,I)};pg=new WeakSet;CC=function(){let Q={id:374648427,data:[]};W(this,WQ,Q),c(this,Z).video&&Q.data.push({id:174,data:[{id:215,data:qQ},{id:29637,data:qQ},{id:131,data:ay},{id:134,data:c(this,Z).video.codec},c(this,XQ),c(this,Z).video.frameRate?{id:2352003,data:1e9/c(this,Z).video.frameRate}:null,{id:224,data:[{id:176,data:c(this,Z).video.width},{id:186,data:c(this,Z).video.height},c(this,Z).video.alpha?{id:21440,data:1}:null,c(this,DQ)]}]}),c(this,Z).audio&&(W(this,xB,c(this,Z).streaming?c(this,xB)||null:{id:236,size:4,data:new Uint8Array(hI)}),Q.data.push({id:174,data:[{id:215,data:rI},{id:29637,data:rI},{id:131,data:ey},{id:134,data:c(this,Z).audio.codec},c(this,xB),{id:225,data:[{id:181,data:new _i(c(this,Z).audio.sampleRate)},{id:159,data:c(this,Z).audio.numberOfChannels},c(this,Z).audio.bitDepth?{id:25188,data:c(this,Z).audio.bitDepth}:null]}]})),c(this,Z).subtitles&&Q.data.push({id:174,data:[{id:215,data:Jg},{id:29637,data:Jg},{id:131,data:hy},{id:134,data:c(this,Z).subtitles.codec},c(this,uQ)]})};xg=new WeakSet;iC=function(){let Q={id:408125543,size:c(this,Z).streaming?-1:sD,data:[c(this,Z).streaming?null:c(this,aB),c(this,MI),c(this,WQ)]};if(W(this,dI,Q),c(this,f).writeEBML(Q),c(this,f)instanceof TQ&&c(this,f).target.options.onHeader){let{data:I,start:C}=c(this,f).getTrackedWrites();c(this,f).target.options.onHeader(I,C)}};DC=new WeakSet;aD=function(){W(this,pQ,{id:475249515,data:[]})};AQ=new WeakSet;MQ=function(){c(this,f)instanceof iD&&c(this,f).flush()};BQ=new WeakSet;lQ=function(){return c(this,f).dataOffsets.get(c(this,dI))};SE=new WeakSet;eD=function(Q){if(Q.decoderConfig){if(Q.decoderConfig.colorSpace){let I=Q.decoderConfig.colorSpace;if(W(this,lI,I),c(this,DQ).data=[{id:21937,data:{rgb:1,bt709:1,bt470bg:5,smpte170m:6}[I.matrix]},{id:21946,data:{bt709:1,smpte170m:6,"iec61966-2-1":13}[I.transfer]},{id:21947,data:{bt709:1,bt470bg:5,smpte170m:6}[I.primaries]},{id:21945,data:[1,2][Number(I.fullRange)]}],!c(this,Z).streaming){let C=c(this,f).pos;c(this,f).seek(c(this,f).offsets.get(c(this,DQ))),c(this,f).writeEBML(c(this,DQ)),c(this,f).seek(C)}}Q.decoderConfig.description&&(c(this,Z).streaming?W(this,XQ,V(this,ZQ,JI).call(this,Q.decoderConfig.description)):V(this,nI,Kg).call(this,c(this,XQ),Q.decoderConfig.description))}};rE=new WeakSet;hD=function(Q){if(Q.type!=="key"||!c(this,lI))return;let I=0;if(RQ(Q.data,0,2)!==2)return;I+=2;let C=(RQ(Q.data,I+1,I+2)<<1)+RQ(Q.data,I+0,I+1);I+=2,C===3&&I++;let y=RQ(Q.data,I+0,I+1);if(I++,y)return;let D=RQ(Q.data,I+0,I+1);if(I++,D!==0)return;I+=2;let U=RQ(Q.data,I+0,I+24);if(I+=24,U!==4817730)return;C>=2&&I++;let N={rgb:7,bt709:2,bt470bg:1,smpte170m:3}[c(this,lI).matrix];wy(Q.data,I+0,I+3,N)};cI=new WeakSet;Fg=function(){let Q=Math.min(c(this,Z).video?c(this,mQ):1/0,c(this,Z).audio?c(this,bQ):1/0),I=c(this,$B);for(;I.length>0&&I[0].timestamp<=Q;)V(this,oB,GB).call(this,I.shift(),!c(this,Z).video&&!c(this,Z).audio)};UI=new WeakSet;cg=function(Q,I,C,y,D,U){let N=V(this,oC,YD).call(this,C,y);return{data:Q,additions:U,type:I,timestamp:N,duration:D,trackNumber:y}};oC=new WeakSet;YD=function(Q,I){let C=I===qQ?c(this,mQ):I===rI?c(this,bQ):c(this,Vg);if(I!==Jg){let y=I===qQ?c(this,YI):c(this,LI);if(c(this,Z).firstTimestampBehavior==="strict"&&C===-1&&Q!==0)throw new Error(`The first chunk for your media track must have a timestamp of 0 (received ${Q}). Non-zero first timestamps are often caused by directly piping frames or audio data from a MediaStreamTrack into the encoder. Their timestamps are typically relative to the age of the document, which is probably what you want.

If you want to offset all timestamps of a track such that the first one is zero, set firstTimestampBehavior: 'offset' in the options.
If you want to allow non-zero first timestamps, set firstTimestampBehavior: 'permissive'.
`);c(this,Z).firstTimestampBehavior==="offset"&&(Q-=y)}if(Q<C)throw new Error(`Timestamps must be monotonically increasing (went from ${C} to ${Q}).`);if(Q<0)throw new Error(`Timestamps must be non-negative (received ${Q}).`);return Q};oB=new WeakSet;GB=function(Q,I){c(this,Z).streaming&&!c(this,WQ)&&(V(this,pg,CC).call(this),V(this,xg,iC).call(this));let C=Math.floor(Q.timestamp/1e3),y=I&&Q.type==="key"&&C-c(this,zQ)>=1e3;(!c(this,hB)||y)&&V(this,yC,LD).call(this,C);let D=C-c(this,zQ);if(D<0)return;if(D>=gE)throw new Error(`Current Matroska cluster exceeded its maximum allowed length of ${gE} milliseconds. In order to produce a correct WebM file, you must pass in a key frame at least every ${gE} milliseconds.`);let N=new Uint8Array(4),H=new DataView(N.buffer);if(H.setUint8(0,128|Q.trackNumber),H.setInt16(1,D,!1),Q.duration===void 0&&!Q.additions){H.setUint8(3,+(Q.type==="key")<<7);let s={id:163,data:[N,Q.data]};c(this,f).writeEBML(s)}else{let s=Math.floor(Q.duration/1e3),R={id:160,data:[{id:161,data:[N,Q.data]},Q.duration!==void 0?{id:155,data:s}:null,Q.additions?{id:30113,data:Q.additions}:null]};c(this,f).writeEBML(R)}W(this,xQ,Math.max(c(this,xQ),C))};ZQ=new WeakSet;JI=function(Q){return{id:25506,size:4,data:new Uint8Array(Q)}};nI=new WeakSet;Kg=function(Q,I){let C=c(this,f).pos;c(this,f).seek(c(this,f).offsets.get(Q));let y=6+I.byteLength,D=hI-y;if(D<0){let U=I.byteLength+D;I instanceof ArrayBuffer?I=I.slice(0,U):I=I.buffer.slice(0,U),D=0}Q=[V(this,ZQ,JI).call(this,I),{id:236,size:4,data:new Uint8Array(D)}],c(this,f).writeEBML(Q),c(this,f).seek(C)};yC=new WeakSet;LD=function(Q){c(this,hB)&&!c(this,Z).streaming&&V(this,fg,sC).call(this),c(this,f)instanceof TQ&&c(this,f).target.options.onCluster&&c(this,f).startTrackingWrites(),W(this,hB,{id:524531317,size:c(this,Z).streaming?-1:FD,data:[{id:231,data:Q}]}),c(this,f).writeEBML(c(this,hB)),W(this,zQ,Q);let I=c(this,f).offsets.get(c(this,hB))-c(this,BQ,lQ);c(this,pQ).data.push({id:187,data:[{id:179,data:Q},c(this,Z).video?{id:183,data:[{id:247,data:qQ},{id:241,data:I}]}:null,c(this,Z).audio?{id:183,data:[{id:247,data:rI},{id:241,data:I}]}:null]})};fg=new WeakSet;sC=function(){let Q=c(this,f).pos-c(this,f).dataOffsets.get(c(this,hB)),I=c(this,f).pos;if(c(this,f).seek(c(this,f).offsets.get(c(this,hB))+4),c(this,f).writeEBMLVarInt(Q,FD),c(this,f).seek(I),c(this,f)instanceof TQ&&c(this,f).target.options.onCluster){let{data:C,start:y}=c(this,f).getTrackedWrites();c(this,f).target.options.onCluster(C,y,c(this,zQ))}};wI=new WeakSet;Ug=function(){if(c(this,RI))throw new Error("Cannot add new video or audio chunks after the file has been finalized.")};var sI=/(?:(.+?)\n)?((?:\d{2}:)?\d{2}:\d{2}.\d{3})\s+-->\s+((?:\d{2}:)?\d{2}:\d{2}.\d{3})/g,Ry=/^WEBVTT.*?\n{2}/,ny=/(?:(\d{2}):)?(\d{2}):(\d{2}).(\d{3})/,ki=/<(?:(\d{2}):)?(\d{2}):(\d{2}).(\d{3})>/g,EE=new TextEncoder,SQ,wg,Ng,tg,Hg,NI,Gg,dE,RD,ky=class{constructor(Q){k(this,NI),k(this,dE),k(this,SQ,void 0),k(this,wg,void 0),k(this,Ng,!1),k(this,tg,void 0),k(this,Hg,!1),W(this,SQ,Q)}configure(Q){if(Q.codec!=="webvtt")throw new Error("Codec must be 'webvtt'.");W(this,wg,Q)}encode(Q){var I;if(!c(this,wg))throw new Error("Encoder not configured.");Q=Q.replace(`\r
`,`
`).replace("\r",`
`),sI.lastIndex=0;let C;if(!c(this,Ng)){if(!Ry.test(Q)){let D=new Error("WebVTT preamble incorrect.");throw c(this,SQ).error(D),D}C=sI.exec(Q);let y=Q.slice(0,(I=C==null?void 0:C.index)!=null?I:Q.length).trimEnd();if(!y){let D=new Error("No WebVTT preamble provided.");throw c(this,SQ).error(D),D}W(this,tg,EE.encode(y)),W(this,Ng,!0),C&&(Q=Q.slice(C.index),sI.lastIndex=0)}for(;C=sI.exec(Q);){let y=Q.slice(0,C.index),D=C[1]||"",U=C.index+C[0].length,N=Q.indexOf(`
`,U)+1,H=Q.slice(U,N).trim(),s=Q.indexOf(`

`,U);s===-1&&(s=Q.length);let R=V(this,NI,Gg).call(this,C[2]),Y=V(this,NI,Gg).call(this,C[3])-R,u=Q.slice(N,s),v=`${H}
${D}
${y}`;ki.lastIndex=0,u=u.replace(ki,M=>{let j=V(this,NI,Gg).call(this,M.slice(1,-1))-R;return`<${V(this,dE,RD).call(this,j)}>`}),Q=Q.slice(s).trimStart(),sI.lastIndex=0;let K={body:EE.encode(u),additions:v.trim()===""?void 0:EE.encode(v),timestamp:R*1e3,duration:Y*1e3},x={};c(this,Hg)||(x.decoderConfig={description:c(this,tg)},W(this,Hg,!0)),c(this,SQ).output(K,x)}}};SQ=new WeakMap;wg=new WeakMap;Ng=new WeakMap;tg=new WeakMap;Hg=new WeakMap;NI=new WeakSet;Gg=function(Q){let I=ny.exec(Q);if(!I)throw new Error("Expected match.");return 60*60*1e3*Number(I[1]||"0")+60*1e3*Number(I[2])+1e3*Number(I[3])+Number(I[4])};dE=new WeakSet;RD=function(Q){let I=Math.floor(Q/36e5),C=Math.floor(Q%(60*60*1e3)/(60*1e3)),y=Math.floor(Q%(60*1e3)/1e3),D=Q%1e3;return I.toString().padStart(2,"0")+":"+C.toString().padStart(2,"0")+":"+y.toString().padStart(2,"0")+"."+D.toString().padStart(3,"0")};const Sy=Object.freeze(Object.defineProperty({__proto__:null,ArrayBufferTarget:AD,FileSystemWritableFileStreamTarget:BD,Muxer:Ly,StreamTarget:_E,SubtitleEncoder:ky},Symbol.toStringTag,{value:"Module"})),nD=[{name:"VP8",cccc:"vp08"},{name:"VP9",cccc:"vp09"}],ry=[0,1,2,3],dy=["1","1.1","2","2.1","3","3.1","4","4.1","5","5.1","5.2","6","6.1","6.2"],My=[8,10,12],ly=Q=>String(Q).padStart(2,"0"),Jy=Q=>String(parseFloat(Q)*10).padStart(2,"0"),Vy=Q=>String(Q).padStart(2,"0"),Ky=(Q,I,C,y)=>`${Q}.${I}.${C}.${y}`,fy=({name:Q,profile:I,level:C,bitDepth:y})=>{const D=nD.find(U=>U.name===Q);if(!D)throw new Error(`Unknown VP Codec "${Q}"`);if(!ry.includes(I))throw new Error(`Unknown VP Profile "${I}"`);if(!dy.includes(C))throw new Error(`Unknown VP Level "${C}"`);if(!My.includes(y))throw new Error(`Unknown VP BitDepth "${y}"`);return Ky(D.cccc,ly(I),Jy(C),Vy(y))},uy=[{name:"Constrained Baseline",PP:"42",CC:"40"},{name:"Baseline",PP:"42",CC:"00"},{name:"Extended",PP:"58",CC:"00"},{name:"Main",PP:"4d",CC:"00"},{name:"High",PP:"64",CC:"00"},{name:"Progressive High",PP:"64",CC:"08"},{name:"Constrained High",PP:"64",CC:"0c"},{name:"High 10",PP:"6e",CC:"00"},{name:"High 4:2:2",PP:"7a",CC:"00"},{name:"High 4:4:4 Predictive",PP:"f4",CC:"00"},{name:"High 10 Intra",PP:"6e",CC:"10"},{name:"High 4:2:2 Intra",PP:"7a",CC:"10"},{name:"High 4:4:4 Intra",PP:"f4",CC:"10"},{name:"CAVLC 4:4:4 Intra",PP:"44",CC:"00"},{name:"Scalable Baseline",PP:"53",CC:"00"},{name:"Scalable Constrained Baseline",PP:"53",CC:"04"},{name:"Scalable High",PP:"56",CC:"00"},{name:"Scalable Constrained High",PP:"56",CC:"04"},{name:"Scalable High Intra",PP:"56",CC:"20"},{name:"Stereo High",PP:"80",CC:"00"},{name:"Multiview High",PP:"76",CC:"00"},{name:"Multiview Depth High",PP:"8a",CC:"00"}],py="avc1",xy=["1","1.1","1.2","1.3","2","2.1","2.2","3","3.1","3.2","4","4.1","4.2","5","5.1","5.2","6","6.1","6.2"],my=Q=>(parseFloat(Q)*10).toString(16).padStart(2,"0"),by=(Q,{PP:I,CC:C},y)=>`${Q}.${I}${C}${y}`,kD=({profile:Q,level:I})=>{if(!xy.includes(I))throw new Error(`Unknown AVC Level "${I}"`);const C=uy.find(y=>y.name===Q);if(!C)throw new Error(`Unknown AVC Profile "${Q}"`);return by(py,C,my(I))},QQ=class QQ{constructor(I){Object.assign(this,I)}async init(I){Object.assign(this,I)}async getDirectory(){if("showDirectoryPicker"in window)return await window.showDirectoryPicker()}async getDirectoryHandle(I,C){return await I.getDirectoryHandle(C,{create:!0})}async getFileHandle(I,C){if(this.directoryHandle)return await this.directoryHandle.getFileHandle(I,{create:!0});if("showSaveFilePicker"in window)return await window.showSaveFilePicker({suggestedName:I,...C})}async getWritableFileStream(I){if(await I.queryPermission({mode:"readwrite"})==="granted")return await I.createWritable()}async encode(){}async stop(){}dispose(){}};fA(QQ,"supportedExtensions",["mp4","webm"]),fA(QQ,"supportedTargets",["in-browser"]),fA(QQ,"defaultOptions",{frameMethod:"blob",extension:QQ.supportedExtensions[0],target:QQ.supportedTargets[0]});let jQ=QQ;const Zy=typeof window<"u"&&typeof window.VideoEncoder=="function";let $I;const SD=(Q,I,C)=>{$I||($I=document.createElement("a")),$I.download=Q;const y=new Blob(I,{type:C}),D=URL.createObjectURL(y);$I.href=D;const U=new MouseEvent("click");$I.dispatchEvent(U),setTimeout(()=>{URL.revokeObjectURL(D)},1)},vy=Q=>Q.toISOString().replace(/:/g,"-").replace("T","@").replace("Z",""),Si=Q=>{const I=Math.floor(Q/60),C=Math.floor(Q-I*60);return`${String(I).padStart(2,"0")}:${String(C).padStart(2,"0")}`},ug=(Q,I=2)=>Math.ceil(Q/I)*I,rD=(Q,I,C=30,y=4,D="variable")=>Math.round(Q*I*C*y*.07*(D==="variable"?.75:1)/1e6)*1e6,IQ=class IQ extends jQ{get frameMethod(){return"videoFrame"}constructor(I){super({...IQ.defaultOptions,...I})}async init(I){var N;if(super.init(I),this.target==="file-system"){const H=await this.getFileHandle(this.filename,{types:[{description:"Video File",accept:{[this.mimeType]:[`.${this.extension}`]}}]});this.writableFileStream=await this.getWritableFileStream(H)}const C=((N=this.encoderOptions)==null?void 0:N.codec)||(this.extension==="mp4"?kD({profile:"High",level:"5.2"}):fy({name:"VP9",profile:0,level:"1",bitDepth:8})),y=C.split(".")[0],D=this.extension==="mp4"?oy:Sy;this.muxer=new D.Muxer({target:this.writableFileStream?new D.FileSystemWritableFileStreamTarget(this.writableFileStream):new D.ArrayBufferTarget,type:this.extension==="mkv"?"matroska":"webm",video:{codec:this.extension==="mp4"?y.startsWith("hev")||y.startsWith("hvc")?"hevc":"avc":`V_${y.startsWith("av01")?"AV1":nD.find(H=>H.cccc===y).name}`,width:this.width,height:this.height},firstTimestampBehavior:"offset",fastStart:this.writableFileStream?!1:"in-memory",...this.muxerOptions}),this.encoder=new VideoEncoder({output:(H,s)=>this.muxer.addVideoChunk(H,s),error:H=>console.error(H)});const U={width:this.width,height:this.height,framerate:this.frameRate,bitrate:rD(this.width,this.height,this.frameRate,this.encoderOptions.bitrateMode),...this.encoderOptions,codec:C};if(this.encoder.configure(U),!(await VideoEncoder.isConfigSupported(U)).supported)throw new Error(`canvas-record: Unsupported VideoEncoder config
`):typeof readline=="function"&&(B=readline())!==null&&(B+=`
`);if(!B)return null;A.input=_I(B,!0)}return A.input.shift()},Xa:function(A,B){B===null||B===10?(wA(FA(A.output,0)),A.output=[]):B!=0&&A.output.push(B)},flush:function(A){A.output&&0<A.output.length&&(wA(FA(A.output,0)),A.output=[])}},mD={Xa:function(A,B){B===null||B===10?(EA(FA(A.output,0)),A.output=[]):B!=0&&A.output.push(B)},flush:function(A){A.output&&0<A.output.length&&(EA(FA(A.output,0)),A.output=[])}},$={M:null,s:function(){return $.createNode(null,"/",16895,0)},createNode:function(A,B,g,E){if(i.$b(g)||i.isFIFO(g))throw new i.b(63);return $.M||($.M={dir:{node:{J:$.g.J,A:$.g.A,lookup:$.g.lookup,R:$.g.R,rename:$.g.rename,unlink:$.g.unlink,rmdir:$.g.rmdir,readdir:$.g.readdir,symlink:$.g.symlink},stream:{K:$.h.K}},file:{node:{J:$.g.J,A:$.g.A},stream:{K:$.h.K,read:$.h.read,write:$.h.write,ia:$.h.ia,na:$.h.na,da:$.h.da}},link:{node:{J:$.g.J,A:$.g.A,readlink:$.g.readlink},stream:{}},gb:{node:{J:$.g.J,A:$.g.A},stream:i.Kb}}),g=i.createNode(A,B,g,E),i.v(g.mode)?(g.g=$.M.dir.node,g.h=$.M.dir.stream,g.f={}):i.isFile(g.mode)?(g.g=$.M.file.node,g.h=$.M.file.stream,g.l=0,g.f=null):i.ma(g.mode)?(g.g=$.M.link.node,g.h=$.M.link.stream):i.ya(g.mode)&&(g.g=$.M.gb.node,g.h=$.M.gb.stream),g.timestamp=Date.now(),A&&(A.f[B]=g),g},Gc:function(A){if(A.f&&A.f.subarray){for(var B=[],g=0;g<A.l;++g)B.push(A.f[g]);return B}return A.f},Hc:function(A){return A.f?A.f.subarray?A.f.subarray(0,A.l):new Uint8Array(A.f):new Uint8Array(0)},lb:function(A,B){var g=A.f?A.f.length:0;g>=B||(B=Math.max(B,g*(1048576>g?2:1.125)>>>0),g!=0&&(B=Math.max(B,256)),g=A.f,A.f=new Uint8Array(B),0<A.l&&A.f.set(g.subarray(0,A.l),0))},oc:function(A,B){if(A.l!=B)if(B==0)A.f=null,A.l=0;else{if(!A.f||A.f.subarray){var g=A.f;A.f=new Uint8Array(B),g&&A.f.set(g.subarray(0,Math.min(B,A.l)))}else if(A.f||(A.f=[]),A.f.length>B)A.f.length=B;else for(;A.f.length<B;)A.f.push(0);A.l=B}},g:{J:function(A){var B={};return B.dev=i.ya(A.mode)?A.id:1,B.ino=A.id,B.mode=A.mode,B.nlink=1,B.uid=0,B.gid=0,B.rdev=A.rdev,i.v(A.mode)?B.size=4096:i.isFile(A.mode)?B.size=A.l:i.ma(A.mode)?B.size=A.link.length:B.size=0,B.atime=new Date(A.timestamp),B.mtime=new Date(A.timestamp),B.ctime=new Date(A.timestamp),B.Hb=4096,B.blocks=Math.ceil(B.size/B.Hb),B},A:function(A,B){B.mode!==void 0&&(A.mode=B.mode),B.timestamp!==void 0&&(A.timestamp=B.timestamp),B.size!==void 0&&$.oc(A,B.size)},lookup:function(){throw i.Na[44]},R:function(A,B,g,E){return $.createNode(A,B,g,E)},rename:function(A,B,g){if(i.v(A.mode)){try{var E=i.P(B,g)}catch{}if(E)for(var o in E.f)throw new i.b(55)}delete A.parent.f[A.name],A.name=g,B.f[g]=A,A.parent=B},unlink:function(A,B){delete A.f[B]},rmdir:function(A,B){var g,E=i.P(A,B);for(g in E.f)throw new i.b(55);delete A.f[B]},readdir:function(A){var B,g=[".",".."];for(B in A.f)A.f.hasOwnProperty(B)&&g.push(B);return g},symlink:function(A,B,g){return(A=$.createNode(A,B,41471,0)).link=g,A},readlink:function(A){if(!i.ma(A.mode))throw new i.b(28);return A.link}},h:{read:function(A,B,g,E,o){var F=A.node.f;if(o>=A.node.l)return 0;if(8<(A=Math.min(A.node.l-o,E))&&F.subarray)B.set(F.subarray(o,o+A),g);else for(E=0;E<A;E++)B[g+E]=F[o+E];return A},write:function(A,B,g,E,o,F){if(B.buffer===dA.buffer&&(F=!1),!E)return 0;if((A=A.node).timestamp=Date.now(),B.subarray&&(!A.f||A.f.subarray)){if(F)return A.f=B.subarray(g,g+E),A.l=E;if(A.l===0&&o===0)return A.f=B.slice(g,g+E),A.l=E;if(o+E<=A.l)return A.f.set(B.subarray(g,g+E),o),E}if($.lb(A,o+E),A.f.subarray&&B.subarray)A.f.set(B.subarray(g,g+E),o);else for(F=0;F<E;F++)A.f[o+F]=B[g+F];return A.l=Math.max(A.l,o+E),E},K:function(A,B,g){if(g===1?B+=A.position:g===2&&i.isFile(A.node.mode)&&(B+=A.node.l),0>B)throw new i.b(28);return B},ia:function(A,B,g){$.lb(A.node,B+g),A.node.l=Math.max(A.node.l,B+g)},na:function(A,B,g,E,o,F,w){if(!i.isFile(A.node.mode))throw new i.b(43);if(A=A.node.f,2&w||A.buffer!==B.buffer){if((0<o||o+E<A.length)&&(A=A.subarray?A.subarray(o,o+E):Array.prototype.slice.call(A,o,o+E)),o=!0,w=B.buffer==dA.buffer,!(E=EI(E)))throw new i.b(48);(w?dA:B).set(A,E)}else o=!1,E=A.byteOffset;return{j:E,Gb:o}},da:function(A,B,g,E,o){if(!i.isFile(A.node.mode))throw new i.b(43);return 2&o||$.h.write(A,B,0,E,g,!1),0}}},i={root:null,pa:[],jb:{},streams:[],ec:1,L:null,ib:"/",Qa:!1,ub:!0,u:{},zb:{wb:{Cb:1,Db:2}},b:null,Na:{},Ub:null,Fa:0,Ic:function(A){if(!(A instanceof i.b)){A:{var B=Error();if(!B.stack){try{throw Error()}catch(g){B=g}if(!B.stack){B="(no stack trace available)";break A}}B=B.stack.toString()}throw s.extraStackTrace&&(B+=`
`+s.extraStackTrace()),B=function(g){return g.replace(/\b_Z[\w\d_]+/g,function(E){return E==E?E:E+" ["+E+"]"})}(B),A+" : "+B}return AI(A.B)},m:function(A,B){if(B=B||{},!(A=lB(i.cwd(),A)))return{path:"",node:null};var g,E={Ma:!0,Za:0};for(g in E)B[g]===void 0&&(B[g]=E[g]);if(8<B.Za)throw new i.b(32);A=vg(A.split("/").filter(function(w){return!!w}),!1);var o=i.root;for(E="/",g=0;g<A.length;g++){var F=g===A.length-1;if(F&&B.parent)break;if(o=i.P(o,A[g]),E=MB(E,A[g]),i.W(o)&&(!F||F&&B.Ma)&&(o=o.oa.root),!F||B.H){for(F=0;i.ma(o.mode);)if(o=i.readlink(E),E=lB(xI(E),o),o=i.m(E,{Za:B.Za}).node,40<F++)throw new i.b(32)}}return{path:E,node:o}},I:function(A){for(var B;;){if(i.Aa(A))return A=A.s.vb,B?A[A.length-1]!=="/"?A+"/"+B:A+B:A;B=B?A.name+"/"+B:A.name,A=A.parent}},Pa:function(A,B){for(var g=0,E=0;E<B.length;E++)g=(g<<5)-g+B.charCodeAt(E)|0;return(A+g>>>0)%i.L.length},sb:function(A){var B=i.Pa(A.parent.id,A.name);A.Y=i.L[B],i.L[B]=A},tb:function(A){var B=i.Pa(A.parent.id,A.name);if(i.L[B]===A)i.L[B]=A.Y;else for(B=i.L[B];B;){if(B.Y===A){B.Y=A.Y;break}B=B.Y}},P:function(A,B){var g=i.bc(A);if(g)throw new i.b(g,A);for(g=i.L[i.Pa(A.id,B)];g;g=g.Y){var E=g.name;if(g.parent.id===A.id&&E===B)return g}return i.lookup(A,B)},createNode:function(A,B,g,E){return A=new i.Ab(A,B,g,E),i.sb(A),A},La:function(A){i.tb(A)},Aa:function(A){return A===A.parent},W:function(A){return!!A.oa},isFile:function(A){return(61440&A)==32768},v:function(A){return(61440&A)==16384},ma:function(A){return(61440&A)==40960},ya:function(A){return(61440&A)==8192},$b:function(A){return(61440&A)==24576},isFIFO:function(A){return(61440&A)==4096},isSocket:function(A){return(49152&A)==49152},Vb:{r:0,rs:1052672,"r+":2,w:577,wx:705,xw:705,"w+":578,"wx+":706,"xw+":706,a:1089,ax:1217,xa:1217,"a+":1090,"ax+":1218,"xa+":1218},dc:function(A){var B=i.Vb[A];if(B===void 0)throw Error("Unknown file open mode: "+A);return B},mb:function(A){var B=["r","w","rw"][3&A];return 512&A&&(B+="w"),B},Z:function(A,B){return i.ub||(B.indexOf("r")===-1||292&A.mode)&&(B.indexOf("w")===-1||146&A.mode)&&(B.indexOf("x")===-1||73&A.mode)?0:2},bc:function(A){var B=i.Z(A,"x");return B||(A.g.lookup?0:2)},Wa:function(A,B){try{return i.P(A,B),20}catch{}return i.Z(A,"wx")},Ca:function(A,B,g){try{var E=i.P(A,B)}catch(o){return o.B}if(A=i.Z(A,"wx"))return A;if(g){if(!i.v(E.mode))return 54;if(i.Aa(E)||i.I(E)===i.cwd())return 10}else if(i.v(E.mode))return 31;return 0},cc:function(A,B){return A?i.ma(A.mode)?32:i.v(A.mode)&&(i.mb(B)!=="r"||512&B)?31:i.Z(A,i.mb(B)):44},Bb:4096,fc:function(A,B){for(B=B||i.Bb,A=A||0;A<=B;A++)if(!i.streams[A])return A;throw new i.b(33)},ba:function(A){return i.streams[A]},Sb:function(A,B,g){i.Ja||(i.Ja=function(){},i.Ja.prototype={object:{get:function(){return this.node},set:function(F){this.node=F}}});var E,o=new i.Ja;for(E in A)o[E]=A[E];return A=o,B=i.fc(B,g),A.fd=B,i.streams[B]=A},Lb:function(A){i.streams[A]=null},Kb:{open:function(A){A.h=i.Xb(A.node.rdev).h,A.h.open&&A.h.open(A)},K:function(){throw new i.b(70)}},Va:function(A){return A>>8},Oc:function(A){return 255&A},X:function(A,B){return A<<8|B},$a:function(A,B){i.jb[A]={h:B}},Xb:function(A){return i.jb[A]},pb:function(A){var B=[];for(A=[A];A.length;){var g=A.pop();B.push(g),A.push.apply(A,g.pa)}return B},yb:function(A,B){function g(w){return i.Fa--,B(w)}function E(w){if(w){if(!E.S)return E.S=!0,g(w)}else++F>=o.length&&g(null)}typeof A=="function"&&(B=A,A=!1),i.Fa++,1<i.Fa&&EA("warning: "+i.Fa+" FS.syncfs operations in flight at once, probably just doing extra work");var o=i.pb(i.root.s),F=0;o.forEach(function(w){if(!w.type.yb)return E(null);w.type.yb(w,A,E)})},s:function(A,B,g){var E=g==="/",o=!g;if(E&&i.root)throw new i.b(10);if(!E&&!o){var F=i.m(g,{Ma:!1});if(g=F.path,F=F.node,i.W(F))throw new i.b(10);if(!i.v(F.mode))throw new i.b(54)}return B={type:A,Rc:B,vb:g,pa:[]},(A=A.s(B)).s=B,B.root=A,E?i.root=A:F&&(F.oa=B,F.s&&F.s.pa.push(B)),A},Wc:function(A){if(A=i.m(A,{Ma:!1}),!i.W(A.node))throw new i.b(28);var B=(A=A.node).oa,g=i.pb(B);Object.keys(i.L).forEach(function(E){for(E=i.L[E];E;){var o=E.Y;g.indexOf(E.s)!==-1&&i.La(E),E=o}}),A.oa=null,A.s.pa.splice(A.s.pa.indexOf(B),1)},lookup:function(A,B){return A.g.lookup(A,B)},R:function(A,B,g){var E=i.m(A,{parent:!0}).node;if(!(A=dB(A))||A==="."||A==="..")throw new i.b(28);var o=i.Wa(E,A);if(o)throw new i.b(o);if(!E.g.R)throw new i.b(63);return E.g.R(E,A,B,g)},create:function(A,B){return i.R(A,4095&(B!==void 0?B:438)|32768,0)},mkdir:function(A,B){return i.R(A,1023&(B!==void 0?B:511)|16384,0)},Pc:function(A,B){A=A.split("/");for(var g="",E=0;E<A.length;++E)if(A[E]){g+="/"+A[E];try{i.mkdir(g,B)}catch(o){if(o.B!=20)throw o}}},Da:function(A,B,g){return g===void 0&&(g=B,B=438),i.R(A,8192|B,g)},symlink:function(A,B){if(!lB(A))throw new i.b(44);var g=i.m(B,{parent:!0}).node;if(!g)throw new i.b(44);B=dB(B);var E=i.Wa(g,B);if(E)throw new i.b(E);if(!g.g.symlink)throw new i.b(63);return g.g.symlink(g,B,A)},rename:function(A,B){var g=xI(A),E=xI(B),o=dB(A),F=dB(B);try{var w=i.m(A,{parent:!0}),G=w.node,h=(w=i.m(B,{parent:!0})).node}catch{throw new i.b(10)}if(!G||!h)throw new i.b(44);if(G.s!==h.s)throw new i.b(75);if(w=i.P(G,o),(E=tC(A,E)).charAt(0)!==".")throw new i.b(28);if((E=tC(B,g)).charAt(0)!==".")throw new i.b(55);try{var a=i.P(h,F)}catch{}if(w!==a){if(g=i.v(w.mode),o=i.Ca(G,o,g))throw new i.b(o);if(o=a?i.Ca(h,F,g):i.Wa(h,F))throw new i.b(o);if(!G.g.rename)throw new i.b(63);if(i.W(w)||a&&i.W(a))throw new i.b(10);if(h!==G&&(o=i.Z(G,"w")))throw new i.b(o);try{i.u.willMovePath&&i.u.willMovePath(A,B)}catch(L){EA("FS.trackingDelegate['willMovePath']('"+A+"', '"+B+"') threw an exception: "+L.message)}i.tb(w);try{G.g.rename(w,h,F)}catch(L){throw L}finally{i.sb(w)}try{i.u.onMovePath&&i.u.onMovePath(A,B)}catch(L){EA("FS.trackingDelegate['onMovePath']('"+A+"', '"+B+"') threw an exception: "+L.message)}}},rmdir:function(A){var B=i.m(A,{parent:!0}).node,g=dB(A),E=i.P(B,g),o=i.Ca(B,g,!0);if(o)throw new i.b(o);if(!B.g.rmdir)throw new i.b(63);if(i.W(E))throw new i.b(10);try{i.u.willDeletePath&&i.u.willDeletePath(A)}catch(F){EA("FS.trackingDelegate['willDeletePath']('"+A+"') threw an exception: "+F.message)}B.g.rmdir(B,g),i.La(E);try{i.u.onDeletePath&&i.u.onDeletePath(A)}catch(F){EA("FS.trackingDelegate['onDeletePath']('"+A+"') threw an exception: "+F.message)}},readdir:function(A){if(!(A=i.m(A,{H:!0}).node).g.readdir)throw new i.b(54);return A.g.readdir(A)},unlink:function(A){var B=i.m(A,{parent:!0}).node,g=dB(A),E=i.P(B,g),o=i.Ca(B,g,!1);if(o)throw new i.b(o);if(!B.g.unlink)throw new i.b(63);if(i.W(E))throw new i.b(10);try{i.u.willDeletePath&&i.u.willDeletePath(A)}catch(F){EA("FS.trackingDelegate['willDeletePath']('"+A+"') threw an exception: "+F.message)}B.g.unlink(B,g),i.La(E);try{i.u.onDeletePath&&i.u.onDeletePath(A)}catch(F){EA("FS.trackingDelegate['onDeletePath']('"+A+"') threw an exception: "+F.message)}},readlink:function(A){if(!(A=i.m(A).node))throw new i.b(44);if(!A.g.readlink)throw new i.b(28);return lB(i.I(A.parent),A.g.readlink(A))},stat:function(A,B){if(!(A=i.m(A,{H:!B}).node))throw new i.b(44);if(!A.g.J)throw new i.b(63);return A.g.J(A)},lstat:function(A){return i.stat(A,!0)},chmod:function(A,B,g){var E;if(!(E=typeof A=="string"?i.m(A,{H:!g}).node:A).g.A)throw new i.b(63);E.g.A(E,{mode:4095&B|-4096&E.mode,timestamp:Date.now()})},lchmod:function(A,B){i.chmod(A,B,!0)},fchmod:function(A,B){if(!(A=i.ba(A)))throw new i.b(8);i.chmod(A.node,B)},chown:function(A,B,g,E){var o;if(!(o=typeof A=="string"?i.m(A,{H:!E}).node:A).g.A)throw new i.b(63);o.g.A(o,{timestamp:Date.now()})},lchown:function(A,B,g){i.chown(A,B,g,!0)},fchown:function(A,B,g){if(!(A=i.ba(A)))throw new i.b(8);i.chown(A.node,B,g)},truncate:function(A,B){if(0>B)throw new i.b(28);var g;if(!(g=typeof A=="string"?i.m(A,{H:!0}).node:A).g.A)throw new i.b(63);if(i.v(g.mode))throw new i.b(31);if(!i.isFile(g.mode))throw new i.b(28);if(A=i.Z(g,"w"))throw new i.b(A);g.g.A(g,{size:B,timestamp:Date.now()})},Fc:function(A,B){if(!(A=i.ba(A)))throw new i.b(8);if(!(2097155&A.flags))throw new i.b(28);i.truncate(A.node,B)},Xc:function(A,B,g){(A=i.m(A,{H:!0}).node).g.A(A,{timestamp:Math.max(B,g)})},open:function(A,B,g,E,o){if(A==="")throw new i.b(44);if(g=64&(B=typeof B=="string"?i.dc(B):B)?4095&(g===void 0?438:g)|32768:0,typeof A=="object")var F=A;else{A=wQ(A);try{F=i.m(A,{H:!(131072&B)}).node}catch{}}var w=!1;if(64&B)if(F){if(128&B)throw new i.b(20)}else F=i.R(A,g,0),w=!0;if(!F)throw new i.b(44);if(i.ya(F.mode)&&(B&=-513),65536&B&&!i.v(F.mode))throw new i.b(54);if(!w&&(g=i.cc(F,B)))throw new i.b(g);512&B&&i.truncate(F,0),B&=-131713,(E=i.Sb({node:F,path:i.I(F),flags:B,seekable:!0,position:0,h:F.h,wc:[],error:!1},E,o)).h.open&&E.h.open(E),!s.logReadFiles||1&B||(i.Ya||(i.Ya={}),A in i.Ya||(i.Ya[A]=1,EA("FS.trackingDelegate error on read file: "+A)));try{i.u.onOpenFile&&(o=0,(2097155&B)!=1&&(o|=i.zb.wb.Cb),2097155&B&&(o|=i.zb.wb.Db),i.u.onOpenFile(A,o))}catch(G){EA("FS.trackingDelegate['onOpenFile']('"+A+"', flags) threw an exception: "+G.message)}return E},close:function(A){if(i.la(A))throw new i.b(8);A.Oa&&(A.Oa=null);try{A.h.close&&A.h.close(A)}catch(B){throw B}finally{i.Lb(A.fd)}A.fd=null},la:function(A){return A.fd===null},K:function(A,B,g){if(i.la(A))throw new i.b(8);if(!A.seekable||!A.h.K)throw new i.b(70);if(g!=0&&g!=1&&g!=2)throw new i.b(28);return A.position=A.h.K(A,B,g),A.wc=[],A.position},read:function(A,B,g,E,o){if(0>E||0>o)throw new i.b(28);if(i.la(A))throw new i.b(8);if((2097155&A.flags)==1)throw new i.b(8);if(i.v(A.node.mode))throw new i.b(31);if(!A.h.read)throw new i.b(28);var F=o!==void 0;if(F){if(!A.seekable)throw new i.b(70)}else o=A.position;return B=A.h.read(A,B,g,E,o),F||(A.position+=B),B},write:function(A,B,g,E,o,F){if(0>E||0>o)throw new i.b(28);if(i.la(A))throw new i.b(8);if(!(2097155&A.flags))throw new i.b(8);if(i.v(A.node.mode))throw new i.b(31);if(!A.h.write)throw new i.b(28);A.seekable&&1024&A.flags&&i.K(A,0,2);var w=o!==void 0;if(w){if(!A.seekable)throw new i.b(70)}else o=A.position;B=A.h.write(A,B,g,E,o,F),w||(A.position+=B);try{A.path&&i.u.onWriteToFile&&i.u.onWriteToFile(A.path)}catch(G){EA("FS.trackingDelegate['onWriteToFile']('"+A.path+"') threw an exception: "+G.message)}return B},ia:function(A,B,g){if(i.la(A))throw new i.b(8);if(0>B||0>=g)throw new i.b(28);if(!(2097155&A.flags))throw new i.b(8);if(!i.isFile(A.node.mode)&&!i.v(A.node.mode))throw new i.b(43);if(!A.h.ia)throw new i.b(138);A.h.ia(A,B,g)},na:function(A,B,g,E,o,F,w){if(2&F&&!(2&w)&&(2097155&A.flags)!=2)throw new i.b(2);if((2097155&A.flags)==1)throw new i.b(2);if(!A.h.na)throw new i.b(43);return A.h.na(A,B,g,E,o,F,w)},da:function(A,B,g,E,o){return A&&A.h.da?A.h.da(A,B,g,E,o):0},Qc:function(){return 0},Ra:function(A,B,g){if(!A.h.Ra)throw new i.b(59);return A.h.Ra(A,B,g)},readFile:function(A,B){if((B=B||{}).flags=B.flags||"r",B.encoding=B.encoding||"binary",B.encoding!=="utf8"&&B.encoding!=="binary")throw Error('Invalid encoding type "'+B.encoding+'"');var g,E=i.open(A,B.flags);A=i.stat(A).size;var o=new Uint8Array(A);return i.read(E,o,0,A,0),B.encoding==="utf8"?g=FA(o,0):B.encoding==="binary"&&(g=o),i.close(E),g},writeFile:function(A,B,g){if((g=g||{}).flags=g.flags||"w",A=i.open(A,g.flags,g.mode),typeof B=="string"){var E=new Uint8Array(aA(B)+1);B=LA(B,E,0,E.length),i.write(A,E,0,B,void 0,g.Jb)}else{if(!ArrayBuffer.isView(B))throw Error("Unsupported data type");i.write(A,B,0,B.byteLength,void 0,g.Jb)}i.close(A)},cwd:function(){return i.ib},chdir:function(A){if((A=i.m(A,{H:!0})).node===null)throw new i.b(44);if(!i.v(A.node.mode))throw new i.b(54);var B=i.Z(A.node,"x");if(B)throw new i.b(B);i.ib=A.path},Ob:function(){i.mkdir("/tmp"),i.mkdir("/home"),i.mkdir("/home/web_user")},Nb:function(){if(i.mkdir("/dev"),i.$a(i.X(1,3),{read:function(){return 0},write:function(E,o,F,w){return w}}),i.Da("/dev/null",i.X(1,3)),GC(i.X(5,0),xD),GC(i.X(6,0),mD),i.Da("/dev/tty",i.X(5,0)),i.Da("/dev/tty1",i.X(6,0)),typeof crypto=="object"&&typeof crypto.getRandomValues=="function")var A=new Uint8Array(1),B=function(){return crypto.getRandomValues(A),A[0]};else if(v)try{var g=C(4);B=function(){return g.randomBytes(1)[0]}}catch{}B||(B=function(){RA("random_device")}),i.T("/dev","random",B),i.T("/dev","urandom",B),i.mkdir("/dev/shm"),i.mkdir("/dev/shm/tmp")},Qb:function(){i.mkdir("/proc"),i.mkdir("/proc/self"),i.mkdir("/proc/self/fd"),i.s({s:function(){var A=i.createNode("/proc/self","fd",16895,73);return A.g={lookup:function(B,g){var E=i.ba(+g);if(!E)throw new i.b(8);return(B={parent:null,s:{vb:"fake"},g:{readlink:function(){return E.path}}}).parent=B}},A}},{},"/proc/self/fd")},Rb:function(){s.stdin?i.T("/dev","stdin",s.stdin):i.symlink("/dev/tty","/dev/stdin"),s.stdout?i.T("/dev","stdout",null,s.stdout):i.symlink("/dev/tty","/dev/stdout"),s.stderr?i.T("/dev","stderr",null,s.stderr):i.symlink("/dev/tty1","/dev/stderr"),i.open("/dev/stdin","r"),i.open("/dev/stdout","w"),i.open("/dev/stderr","w")},kb:function(){i.b||(i.b=function(A,B){this.node=B,this.pc=function(g){this.B=g},this.pc(A),this.message="FS error"},i.b.prototype=Error(),i.b.prototype.constructor=i.b,[44].forEach(function(A){i.Na[A]=new i.b(A),i.Na[A].stack="<generic error, no stack>"}))},rc:function(){i.kb(),i.L=Array(4096),i.s($,{},"/"),i.Ob(),i.Nb(),i.Qb(),i.Ub={MEMFS:$}},ka:function(A,B,g){i.ka.Qa=!0,i.kb(),s.stdin=A||s.stdin,s.stdout=B||s.stdout,s.stderr=g||s.stderr,i.Rb()},quit:function(){i.ka.Qa=!1;var A=s._fflush;for(A&&A(0),A=0;A<i.streams.length;A++){var B=i.streams[A];B&&i.close(B)}},wa:function(A,B){var g=0;return A&&(g|=365),B&&(g|=146),g},Kc:function(A,B){return A=uD.apply(null,A),B&&A[0]=="/"&&(A=A.substr(1)),A},xc:function(A,B){return lB(B,A)},Uc:function(A){return wQ(A)},Ec:function(A,B){return(A=i.Ka(A,B)).exists?A.object:(AI(A.error),null)},Ka:function(A,B){try{var g=i.m(A,{H:!B});A=g.path}catch{}var E={Aa:!1,exists:!1,error:0,name:null,path:null,object:null,hc:!1,jc:null,ic:null};try{g=i.m(A,{parent:!0}),E.hc=!0,E.jc=g.path,E.ic=g.node,E.name=dB(A),g=i.m(A,{H:!B}),E.exists=!0,E.path=g.path,E.object=g.node,E.name=g.node.name,E.Aa=g.path==="/"}catch(o){E.error=o.B}return E},zc:function(A,B,g,E){return A=MB(typeof A=="string"?A:i.I(A),B),i.mkdir(A,i.wa(g,E))},Cc:function(A,B){for(A=typeof A=="string"?A:i.I(A),B=B.split("/").reverse();B.length;){var g=B.pop();if(g){var E=MB(A,g);try{i.mkdir(E)}catch{}A=E}}return E},Pb:function(A,B,g,E,o){return A=MB(typeof A=="string"?A:i.I(A),B),i.create(A,i.wa(E,o))},hb:function(A,B,g,E,o,F){if(A=B?MB(typeof A=="string"?A:i.I(A),B):A,E=i.wa(E,o),o=i.create(A,E),g){if(typeof g=="string"){A=Array(g.length),B=0;for(var w=g.length;B<w;++B)A[B]=g.charCodeAt(B);g=A}i.chmod(o,146|E),A=i.open(o,"w"),i.write(A,g,0,g.length,0,F),i.close(A),i.chmod(o,E)}return o},T:function(A,B,g,E){A=MB(typeof A=="string"?A:i.I(A),B),B=i.wa(!!g,!!E),i.T.Va||(i.T.Va=64);var o=i.X(i.T.Va++,0);return i.$a(o,{open:function(F){F.seekable=!1},close:function(){E&&E.buffer&&E.buffer.length&&E(10)},read:function(F,w,G,h){for(var a=0,L=0;L<h;L++){try{var S=g()}catch{throw new i.b(29)}if(S===void 0&&a===0)throw new i.b(6);if(S==null)break;a++,w[G+L]=S}return a&&(F.node.timestamp=Date.now()),a},write:function(F,w,G,h){for(var a=0;a<h;a++)try{E(w[G+a])}catch{throw new i.b(29)}return h&&(F.node.timestamp=Date.now()),a}}),i.Da(A,B,o)},Bc:function(A,B,g){return A=MB(typeof A=="string"?A:i.I(A),B),i.symlink(g,A)},nb:function(A){if(A.Sa||A.ac||A.link||A.f)return!0;var B=!0;if(typeof XMLHttpRequest<"u")throw Error("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");if(!M)throw Error("Cannot load without read() or XMLHttpRequest.");try{A.f=_I(M(A.url),!0),A.l=A.f.length}catch{B=!1}return B||AI(29),B},Ac:function(A,B,g,E,o){function F(){this.Ua=!1,this.S=[]}if(F.prototype.get=function(a){if(!(a>this.length-1||0>a)){var L=a%this.chunkSize;return this.rb(a/this.chunkSize|0)[L]}},F.prototype.Ib=function(a){this.rb=a},F.prototype.eb=function(){var a=new XMLHttpRequest;if(a.open("HEAD",g,!1),a.send(null),!(200<=a.status&&300>a.status||a.status===304))throw Error("Couldn't load "+g+". Status: "+a.status);var L,S=Number(a.getResponseHeader("Content-length")),l=(L=a.getResponseHeader("Accept-Ranges"))&&L==="bytes";a=(L=a.getResponseHeader("Content-Encoding"))&&L==="gzip";var O=1048576;l||(O=S);var r=this;r.Ib(function(P){var q=P*O,e=(P+1)*O-1;if(e=Math.min(e,S-1),r.S[P]===void 0){var b=r.S;if(q>e)throw Error("invalid range ("+q+", "+e+") or no bytes requested!");if(e>S-1)throw Error("only "+S+" bytes available! programmer error!");var _=new XMLHttpRequest;if(_.open("GET",g,!1),S!==O&&_.setRequestHeader("Range","bytes="+q+"-"+e),typeof Uint8Array<"u"&&(_.responseType="arraybuffer"),_.overrideMimeType&&_.overrideMimeType("text/plain; charset=x-user-defined"),_.send(null),!(200<=_.status&&300>_.status||_.status===304))throw Error("Couldn't load "+g+". Status: "+_.status);q=_.response!==void 0?new Uint8Array(_.response||[]):_I(_.responseText||"",!0),b[P]=q}if(r.S[P]===void 0)throw Error("doXHR failed!");return r.S[P]}),!a&&S||(O=S=1,O=S=this.rb(0).length,wA("LazyFiles on gzip forces download of the whole file when length is accessed")),this.Fb=S,this.Eb=O,this.Ua=!0},typeof XMLHttpRequest<"u"){if(!u)throw"Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc";var w=new F;Object.defineProperties(w,{length:{get:function(){return this.Ua||this.eb(),this.Fb}},chunkSize:{get:function(){return this.Ua||this.eb(),this.Eb}}}),w={Sa:!1,f:w}}else w={Sa:!1,url:g};var G=i.Pb(A,B,w,E,o);w.f?G.f=w.f:w.url&&(G.f=null,G.url=w.url),Object.defineProperties(G,{l:{get:function(){return this.f.length}}});var h={};return Object.keys(G.h).forEach(function(a){var L=G.h[a];h[a]=function(){if(!i.nb(G))throw new i.b(29);return L.apply(null,arguments)}}),h.read=function(a,L,S,l,O){if(!i.nb(G))throw new i.b(29);if(O>=(a=a.node.f).length)return 0;if(l=Math.min(a.length-O,l),a.slice)for(var r=0;r<l;r++)L[S+r]=a[O+r];else for(r=0;r<l;r++)L[S+r]=a.get(O+r);return l},G.h=h,G},Dc:function(A,B,g,E,o,F,w,G,h,a){function L(l){function O(P){a&&a(),G||i.hb(A,B,P,E,o,h),F&&F(),cQ()}var r=!1;s.preloadPlugins.forEach(function(P){!r&&P.canHandle(S)&&(P.handle(l,S,O,function(){w&&w(),cQ()}),r=!0)}),r||O(l)}(void 0).ka();var S=B?lB(MB(A,B)):A;uI(),typeof g=="string"?(void 0).yc(g,function(l){L(l)},w):L(g)},indexedDB:function(){return window.indexedDB||window.mozIndexedDB||window.webkitIndexedDB||window.msIndexedDB},bb:function(){return"EM_FS_"+window.location.pathname},cb:20,ga:"FILE_DATA",Tc:function(A,B,g){B=B||function(){},g=g||function(){};var E=i.indexedDB();try{var o=E.open(i.bb(),i.cb)}catch(F){return g(F)}o.onupgradeneeded=function(){wA("creating db"),o.result.createObjectStore(i.ga)},o.onsuccess=function(){var F=o.result.transaction([i.ga],"readwrite"),w=F.objectStore(i.ga),G=0,h=0,a=A.length;A.forEach(function(L){(L=w.put(i.Ka(L).object.f,L)).onsuccess=function(){++G+h==a&&(h==0?B():g())},L.onerror=function(){h++,G+h==a&&(h==0?B():g())}}),F.onerror=g},o.onerror=g},Mc:function(A,B,g){B=B||function(){},g=g||function(){};var E=i.indexedDB();try{var o=E.open(i.bb(),i.cb)}catch(F){return g(F)}o.onupgradeneeded=g,o.onsuccess=function(){var F=o.result;try{var w=F.transaction([i.ga],"readonly")}catch(S){return void g(S)}var G=w.objectStore(i.ga),h=0,a=0,L=A.length;A.forEach(function(S){var l=G.get(S);l.onsuccess=function(){i.Ka(S).exists&&i.unlink(S),i.hb(xI(S),dB(S),l.result,!0,!0,!0),++h+a==L&&(a==0?B():g())},l.onerror=function(){a++,h+a==L&&(a==0?B():g())}}),w.onerror=g},o.onerror=g}},aC={},mI=void 0;function NQ(){return d[(mI+=4)-4>>2]}function tQ(A){if(!(A=i.ba(A)))throw new i.b(8);return A}function Og(A){switch(A){case 1:return 0;case 2:return 1;case 4:return 2;case 8:return 3;default:throw new TypeError("Unknown type size: "+A)}}var eC=void 0;function bA(A){for(var B="";hA[A];)B+=eC[hA[A++]];return B}var HQ={},GQ={},bI={};function qg(A){if(A===void 0)return"_unknown";var B=(A=A.replace(/[^a-zA-Z0-9_]/g,"$")).charCodeAt(0);return 48<=B&&57>=B?"_"+A:A}function Wg(A,B){return A=qg(A),new Function("body","return function "+A+`() {
    "use strict";    return body.apply(this, arguments);
};
`)(B)}function Xg(A){var B=Error,g=Wg(A,function(E){this.name=A,this.message=E,(E=Error(E).stack)!==void 0&&(this.stack=this.toString()+`
`+E.replace(/^Error(:[^\n]*)?\n/,""))});return g.prototype=Object.create(B.prototype),g.prototype.constructor=g,g.prototype.toString=function(){return this.message===void 0?this.name:this.name+": "+this.message},g}var aQ=void 0;function DA(A){throw new aQ(A)}var hC=void 0;function ZI(A){throw new hC(A)}function ZB(A,B,g){function E(G){(G=g(G)).length!==A.length&&ZI("Mismatched type converter count");for(var h=0;h<A.length;++h)NB(A[h],G[h])}A.forEach(function(G){bI[G]=B});var o=Array(B.length),F=[],w=0;B.forEach(function(G,h){GQ.hasOwnProperty(G)?o[h]=GQ[G]:(F.push(G),HQ.hasOwnProperty(G)||(HQ[G]=[]),HQ[G].push(function(){o[h]=GQ[G],++w===F.length&&E(o)}))}),F.length===0&&E(o)}function NB(A,B,g){if(g=g||{},!("argPackAdvance"in B))throw new TypeError("registerType registeredInstance requires argPackAdvance");var E=B.name;if(A||DA('type "'+E+'" must have a positive integer typeid pointer'),GQ.hasOwnProperty(A)){if(g.Zb)return;DA("Cannot register type '"+E+"' twice")}GQ[A]=B,delete bI[A],HQ.hasOwnProperty(A)&&(B=HQ[A],delete HQ[A],B.forEach(function(o){o()}))}function bD(A){return{count:A.count,aa:A.aa,qa:A.qa,j:A.j,o:A.o,D:A.D,F:A.F}}function zg(A){DA(A.c.o.i.name+" instance already deleted")}var jg=!1;function YC(){}function LC(A){--A.count.value,A.count.value===0&&(A.D?A.F.$(A.D):A.o.i.$(A.j))}function vI(A){return typeof FinalizationGroup>"u"?(vI=function(B){return B},A):(jg=new FinalizationGroup(function(B){for(var g=B.next();!g.done;g=B.next())(g=g.value).j?LC(g):console.warn("object already deleted: "+g.j)}),YC=function(B){jg.unregister(B.c)},(vI=function(B){return jg.register(B,B.c,B.c),B})(A))}var BI=void 0,QI=[];function Tg(){for(;QI.length;){var A=QI.pop();A.c.aa=!1,A.delete()}}function JB(){}var RC={};function nC(A,B,g){if(A[B].N===void 0){var E=A[B];A[B]=function(){return A[B].N.hasOwnProperty(arguments.length)||DA("Function '"+g+"' called with an invalid number of arguments ("+arguments.length+") - expects one of ("+A[B].N+")!"),A[B].N[arguments.length].apply(this,arguments)},A[B].N=[],A[B].N[E.va]=E}}function ZD(A,B,g,E,o,F,w,G){this.name=A,this.constructor=B,this.U=g,this.$=E,this.G=o,this.Wb=F,this.ta=w,this.Tb=G,this.lc=[]}function OI(A,B,g){for(;B!==g;)B.ta||DA("Expected null or instance of "+g.name+", got an instance of "+B.name),A=B.ta(A),B=B.G;return A}function vD(A,B){return B===null?(this.Ta&&DA("null is not a valid "+this.name),0):(B.c||DA('Cannot pass "'+eQ(B)+'" as a '+this.name),B.c.j||DA("Cannot pass deleted object as a pointer of type "+this.name),OI(B.c.j,B.c.o.i,this.i))}function OD(A,B){if(B===null){if(this.Ta&&DA("null is not a valid "+this.name),this.Ba){var g=this.mc();return A!==null&&A.push(this.$,g),g}return 0}if(B.c||DA('Cannot pass "'+eQ(B)+'" as a '+this.name),B.c.j||DA("Cannot pass deleted object as a pointer of type "+this.name),!this.za&&B.c.o.za&&DA("Cannot convert argument of type "+(B.c.F?B.c.F.name:B.c.o.name)+" to parameter type "+this.name),g=OI(B.c.j,B.c.o.i,this.i),this.Ba)switch(B.c.D===void 0&&DA("Passing raw pointer to smart pointer is illegal"),this.qc){case 0:B.c.F===this?g=B.c.D:DA("Cannot convert argument of type "+(B.c.F?B.c.F.name:B.c.o.name)+" to parameter type "+this.name);break;case 1:g=B.c.D;break;case 2:if(B.c.F===this)g=B.c.D;else{var E=B.clone();g=this.nc(g,dC(function(){E.delete()})),A!==null&&A.push(this.$,g)}break;default:DA("Unsupporting sharing policy")}return g}function qD(A,B){return B===null?(this.Ta&&DA("null is not a valid "+this.name),0):(B.c||DA('Cannot pass "'+eQ(B)+'" as a '+this.name),B.c.j||DA("Cannot pass deleted object as a pointer of type "+this.name),B.c.o.za&&DA("Cannot convert argument of type "+B.c.o.name+" to parameter type "+this.name),OI(B.c.j,B.c.o.i,this.i))}function qI(A){return this.fromWireType(jA[A>>2])}var II={};function WI(A,B){return B.o&&B.j||ZI("makeClassHandle requires ptr and ptrType"),!!B.F!=!!B.D&&ZI("Both smartPtrType and smartPtr must be specified"),B.count={value:1},vI(Object.create(A,{c:{value:B}}))}function tB(A,B,g,E){this.name=A,this.i=B,this.Ta=g,this.za=E,this.Ba=!1,this.$=this.nc=this.mc=this.xb=this.qc=this.kc=void 0,B.G!==void 0?this.toWireType=OD:(this.toWireType=E?vD:qD,this.O=null)}function VB(A,B){A=bA(A);for(var g=s["dynCall_"+A],E=[],o=1;o<A.length;++o)E.push("a"+o);return o="return function dynCall_"+A+"_"+B+"("+E.join(", ")+`) {
`,o+="    return dynCall(rawFunction"+(E.length?", ":"")+E.join(", ")+`);
`,typeof(g=new Function("dynCall","rawFunction",o+`};
`)(g,B))!="function"&&DA("unknown function pointer with signature "+A+": "+B),g}var kC=void 0;function WD(A){var B=bA(A=mC(A));return PA(A),B}function gI(A,B){var g=[],E={};throw B.forEach(function o(F){E[F]||GQ[F]||(bI[F]?bI[F].forEach(o):(g.push(F),E[F]=!0))}),new kC(A+": "+g.map(WD).join([", "]))}function SC(A,B){for(var g=[],E=0;E<A;E++)g.push(d[(B>>2)+E]);return g}function Pg(A){for(;A.length;){var B=A.pop();A.pop()(B)}}function rC(A,B,g){return A instanceof Object||DA(g+' with invalid "this": '+A),A instanceof B.i.constructor||DA(g+' incompatible with "this" of type '+A.constructor.name),A.c.j||DA("cannot call emscripten binding method "+g+" on deleted object"),OI(A.c.j,A.c.o.i,B.i)}var _g=[],EB=[{},{value:void 0},{value:null},{value:!0},{value:!1}];function dC(A){switch(A){case void 0:return 1;case null:return 2;case!0:return 3;case!1:return 4;default:var B=_g.length?_g.pop():EB.length;return EB[B]={ra:1,value:A},B}}function eQ(A){if(A===null)return"null";var B=typeof A;return B==="object"||B==="array"||B==="function"?A.toString():""+A}function XD(A,B){switch(B){case 2:return function(g){return this.fromWireType(VA[g>>2])};case 3:return function(g){return this.fromWireType(KA[g>>3])};default:throw new TypeError("Unknown float type: "+A)}}function zD(A,B,g){switch(B){case 0:return g?function(E){return dA[E]}:function(E){return hA[E]};case 1:return g?function(E){return zA[E>>1]}:function(E){return LB[E>>1]};case 2:return g?function(E){return d[E>>2]}:function(E){return jA[E>>2]};default:throw new TypeError("Unknown integer type: "+A)}}var $g,MC={};function lC(){if(!$g){var A,B={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:(typeof navigator=="object"&&navigator.languages&&navigator.languages[0]||"C").replace("-","_")+".UTF-8",_:x||"./this.program"};for(A in MC)B[A]=MC[A];var g=[];for(A in B)g.push(A+"="+B[A]);$g=g}return $g}function XI(A){return A%4==0&&(A%100!=0||A%400==0)}function AE(A,B){for(var g=0,E=0;E<=B;g+=A[E++]);return g}var zI=[31,29,31,30,31,30,31,31,30,31,30,31],jI=[31,28,31,30,31,30,31,31,30,31,30,31];function TI(A,B){for(A=new Date(A.getTime());0<B;){var g=A.getMonth(),E=(XI(A.getFullYear())?zI:jI)[g];if(!(B>E-A.getDate())){A.setDate(A.getDate()+B);break}B-=E-A.getDate()+1,A.setDate(1),11>g?A.setMonth(g+1):(A.setMonth(0),A.setFullYear(A.getFullYear()+1))}return A}function JC(A,B,g,E){A||(A=this),this.parent=A,this.s=A.s,this.oa=null,this.id=i.ec++,this.name=B,this.mode=g,this.g={},this.h={},this.rdev=E}Object.defineProperties(JC.prototype,{read:{get:function(){return(365&this.mode)==365},set:function(A){A?this.mode|=365:this.mode&=-366}},write:{get:function(){return(146&this.mode)==146},set:function(A){A?this.mode|=146:this.mode&=-147}},ac:{get:function(){return i.v(this.mode)}},Sa:{get:function(){return i.ya(this.mode)}}}),i.Ab=JC,i.rc();for(var VC=Array(256),PI=0;256>PI;++PI)VC[PI]=String.fromCharCode(PI);function _I(A,B){var g=Array(aA(A)+1);return A=LA(A,g,0,g.length),B&&(g.length=A),g}function KC(A){for(var B=[],g=0;g<A.length;g++){var E=A[g];255<E&&(E&=255),B.push(String.fromCharCode(E))}return B.join("")}eC=VC,aQ=s.BindingError=Xg("BindingError"),hC=s.InternalError=Xg("InternalError"),JB.prototype.isAliasOf=function(A){if(!(this instanceof JB&&A instanceof JB))return!1;var B=this.c.o.i,g=this.c.j,E=A.c.o.i;for(A=A.c.j;B.G;)g=B.ta(g),B=B.G;for(;E.G;)A=E.ta(A),E=E.G;return B===E&&g===A},JB.prototype.clone=function(){if(this.c.j||zg(this),this.c.qa)return this.c.count.value+=1,this;var A=vI(Object.create(Object.getPrototypeOf(this),{c:{value:bD(this.c)}}));return A.c.count.value+=1,A.c.aa=!1,A},JB.prototype.delete=function(){this.c.j||zg(this),this.c.aa&&!this.c.qa&&DA("Object already scheduled for deletion"),YC(this),LC(this.c),this.c.qa||(this.c.D=void 0,this.c.j=void 0)},JB.prototype.isDeleted=function(){return!this.c.j},JB.prototype.deleteLater=function(){return this.c.j||zg(this),this.c.aa&&!this.c.qa&&DA("Object already scheduled for deletion"),QI.push(this),QI.length===1&&BI&&BI(Tg),this.c.aa=!0,this},tB.prototype.Yb=function(A){return this.xb&&(A=this.xb(A)),A},tB.prototype.ja=function(A){this.$&&this.$(A)},tB.prototype.argPackAdvance=8,tB.prototype.readValueFromPointer=qI,tB.prototype.deleteObject=function(A){A!==null&&A.delete()},tB.prototype.fromWireType=function(A){function B(){return this.Ba?WI(this.i.U,{o:this.kc,j:g,F:this,D:A}):WI(this.i.U,{o:this,j:A})}var g=this.Yb(A);if(!g)return this.ja(A),null;var E=function(F,w){for(w===void 0&&DA("ptr should not be undefined");F.G;)w=F.ta(w),F=F.G;return II[w]}(this.i,g);if(E!==void 0)return E.c.count.value===0?(E.c.j=g,E.c.D=A,E.clone()):(E=E.clone(),this.ja(A),E);if(E=this.i.Wb(g),!(E=RC[E]))return B.call(this);E=this.za?E.Mb:E.pointerType;var o=function F(w,G,h){return G===h?w:h.G===void 0||(w=F(w,G,h.G))===null?null:h.Tb(w)}(g,this.i,E.i);return o===null?B.call(this):this.Ba?WI(E.i.U,{o:E,j:o,F:this,D:A}):WI(E.i.U,{o:E,j:o})},s.getInheritedInstanceCount=function(){return Object.keys(II).length},s.getLiveInheritedInstances=function(){var A,B=[];for(A in II)II.hasOwnProperty(A)&&B.push(II[A]);return B},s.flushPendingDeletes=Tg,s.setDelayFunction=function(A){BI=A,QI.length&&BI&&BI(Tg)},kC=s.UnboundTypeError=Xg("UnboundTypeError"),s.count_emval_handles=function(){for(var A=0,B=5;B<EB.length;++B)EB[B]!==void 0&&++A;return A},s.get_first_emval=function(){for(var A=5;A<EB.length;++A)if(EB[A]!==void 0)return EB[A];return null};var jD=typeof atob=="function"?atob:function(A){var B="",g=0;A=A.replace(/[^A-Za-z0-9\+\/=]/g,"");do{var E="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(A.charAt(g++)),o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(A.charAt(g++)),F="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(A.charAt(g++)),w="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(A.charAt(g++));E=E<<2|o>>4,o=(15&o)<<4|F>>2;var G=(3&F)<<6|w;B+=String.fromCharCode(E),F!==64&&(B+=String.fromCharCode(o)),w!==64&&(B+=String.fromCharCode(G))}while(g<A.length);return B};function hQ(A){if(rB(A,UQ)){if(A=A.slice(UQ.length),typeof v=="boolean"&&v){try{var B=Buffer.from(A,"base64")}catch{B=new Buffer(A,"base64")}var g=new Uint8Array(B.buffer,B.byteOffset,B.byteLength)}else try{var E=jD(A),o=new Uint8Array(E.length);for(B=0;B<E.length;++B)o[B]=E.charCodeAt(B);g=o}catch{throw Error("Converting base64 string to bytes failed.")}return g}}var fC={__assert_fail:function(A,B,g,E){RA("Assertion failed: "+GA(A)+", at: "+[B?GA(B):"unknown filename",g,E?GA(E):"unknown function"])},__cxa_allocate_exception:function(A){return EI(A)},__cxa_atexit:function(A,B){},__cxa_begin_catch:function(A){var B=mA[A];return B&&!B.fb&&(B.fb=!0,YQ.ab--),B&&(B.Ea=!1),pI.push(A),(B=Zg(A))&&mA[B].ra++,A},__cxa_end_catch:function(){oA(0);var A=pI.pop();if(A){if(A=Zg(A)){var B=mA[A];B.ra--,B.ra!==0||B.Ea||(B.ja&&s.dynCall_ii(B.ja,A),delete mA[A],NC(A))}wB=0}},__cxa_find_matching_catch_2:function(){var A=wB;if(!A)return CA=0;var B=mA[A],g=B.type;if(!g)return CA=0,0|A;var E=Array.prototype.slice.call(arguments);iI(g),d[22792]=A,A=91168;for(var o=0;o<E.length;o++)if(E[o]&&CI(E[o],g,A))return A=d[A>>2],B.ha.push(A),CA=E[o],0|A;return A=d[A>>2],CA=g,0|A},__cxa_find_matching_catch_3:function(){var A=wB;if(!A)return CA=0;var B=mA[A],g=B.type;if(!g)return CA=0,0|A;var E=Array.prototype.slice.call(arguments);iI(g),d[22792]=A,A=91168;for(var o=0;o<E.length;o++)if(E[o]&&CI(E[o],g,A))return A=d[A>>2],B.ha.push(A),CA=E[o],0|A;return A=d[A>>2],CA=g,0|A},__cxa_find_matching_catch_4:function(){var A=wB;if(!A)return CA=0;var B=mA[A],g=B.type;if(!g)return CA=0,0|A;var E=Array.prototype.slice.call(arguments);iI(g),d[22792]=A,A=91168;for(var o=0;o<E.length;o++)if(E[o]&&CI(E[o],g,A))return A=d[A>>2],B.ha.push(A),CA=E[o],0|A;return A=d[A>>2],CA=g,0|A},__cxa_find_matching_catch_5:function(){var A=wB;if(!A)return CA=0;var B=mA[A],g=B.type;if(!g)return CA=0,0|A;var E=Array.prototype.slice.call(arguments);iI(g),d[22792]=A,A=91168;for(var o=0;o<E.length;o++)if(E[o]&&CI(E[o],g,A))return A=d[A>>2],B.ha.push(A),CA=E[o],0|A;return A=d[A>>2],CA=g,0|A},__cxa_free_exception:NC,__cxa_get_exception_ptr:function(A){return A},__cxa_rethrow:function(){var A=pI.pop();throw A=Zg(A),mA[A].Ea||(pI.push(A),mA[A].Ea=!0),wB=A,A},__cxa_throw:function(A,B,g){throw mA[A]={j:A,ha:[A],type:B,ja:g,ra:0,fb:!1,Ea:!1},wB=A,"uncaught_exception"in YQ?YQ.ab++:YQ.ab=1,A},__cxa_uncaught_exceptions:function(){return YQ.ab},__map_file:function(){return AI(63),-1},__resumeException:function(A){throw wB||(wB=A),A},__sys_fcntl64:function(A,B,g){mI=g;try{var E=tQ(A);switch(B){case 0:var o=NQ();return 0>o?-28:i.open(E.path,E.flags,0,o).fd;case 1:case 2:return 0;case 3:return E.flags;case 4:return o=NQ(),E.flags|=o,0;case 12:return o=NQ(),zA[o+0>>1]=2,0;case 13:case 14:return 0;case 16:case 8:return-28;case 9:return AI(28),-1;default:return-28}}catch(F){return i!==void 0&&F instanceof i.b||RA(F),-F.B}},__sys_ioctl:function(A,B,g){mI=g;try{var E=tQ(A);switch(B){case 21509:case 21505:return E.tty?0:-59;case 21510:case 21511:case 21512:case 21506:case 21507:case 21508:return E.tty?0:-59;case 21519:if(!E.tty)return-59;var o=NQ();return d[o>>2]=0;case 21520:return E.tty?-28:-59;case 21531:return o=NQ(),i.Ra(E,B,o);case 21523:case 21524:return E.tty?0:-59;default:RA("bad ioctl syscall "+B)}}catch(F){return i!==void 0&&F instanceof i.b||RA(F),-F.B}},__sys_munmap:function(A,B){try{if((0|A)==-1||B===0)var g=-28;else{var E=aC[A];if(E&&B===E.Lc){var o=i.ba(E.fd);if(2&E.Sc){var F=E.flags,w=E.offset,G=hA.slice(A,A+B);i.da(o,G,w,B,F)}aC[A]=null,E.Gb&&PA(E.Nc)}g=0}return g}catch(h){return i!==void 0&&h instanceof i.b||RA(h),-h.B}},__sys_open:function(A,B,g){mI=g;try{var E=GA(A),o=NQ();return i.open(E,B,o).fd}catch(F){return i!==void 0&&F instanceof i.b||RA(F),-F.B}},__sys_stat64:function(A,B){try{A=GA(A);A:{var g=i.stat;try{var E=g(A)}catch(F){if(F&&F.node&&wQ(A)!==wQ(i.I(F.node))){var o=-54;break A}throw F}d[B>>2]=E.dev,d[B+4>>2]=0,d[B+8>>2]=E.ino,d[B+12>>2]=E.mode,d[B+16>>2]=E.nlink,d[B+20>>2]=E.uid,d[B+24>>2]=E.gid,d[B+28>>2]=E.rdev,d[B+32>>2]=0,xA=[E.size>>>0,(tA=E.size,1<=+FQ(tA)?0<tA?(0|gB(+IB(tA/4294967296),4294967295))>>>0:~~+SB((tA-+(~~tA>>>0))/4294967296)>>>0:0)],d[B+40>>2]=xA[0],d[B+44>>2]=xA[1],d[B+48>>2]=4096,d[B+52>>2]=E.blocks,d[B+56>>2]=E.atime.getTime()/1e3|0,d[B+60>>2]=0,d[B+64>>2]=E.mtime.getTime()/1e3|0,d[B+68>>2]=0,d[B+72>>2]=E.ctime.getTime()/1e3|0,d[B+76>>2]=0,xA=[E.ino>>>0,(tA=E.ino,1<=+FQ(tA)?0<tA?(0|gB(+IB(tA/4294967296),4294967295))>>>0:~~+SB((tA-+(~~tA>>>0))/4294967296)>>>0:0)],d[B+80>>2]=xA[0],d[B+84>>2]=xA[1],o=0}return o}catch(F){return i!==void 0&&F instanceof i.b||RA(F),-F.B}},_embind_register_bool:function(A,B,g,E,o){var F=Og(g);NB(A,{name:B=bA(B),fromWireType:function(w){return!!w},toWireType:function(w,G){return G?E:o},argPackAdvance:8,readValueFromPointer:function(w){if(g===1)var G=dA;else if(g===2)G=zA;else{if(g!==4)throw new TypeError("Unknown boolean type size: "+B);G=d}return this.fromWireType(G[w>>F])},O:null})},_embind_register_class:function(A,B,g,E,o,F,w,G,h,a,L,S,l){L=bA(L),F=VB(o,F),G&&(G=VB(w,G)),a&&(a=VB(h,a)),l=VB(S,l);var O=qg(L);(function(r,P){s.hasOwnProperty(r)?(DA("Cannot register public name '"+r+"' twice"),nC(s,r,r),s.hasOwnProperty(void 0)&&DA("Cannot register multiple overloads of a function with the same number of arguments (undefined)!"),s[r].N[void 0]=P):s[r]=P})(O,function(){gI("Cannot construct "+L+" due to unbound types",[E])}),ZB([A,B,g],E?[E]:[],function(r){if(r=r[0],E)var P=r.i,q=P.U;else q=JB.prototype;r=Wg(O,function(){if(Object.getPrototypeOf(this)!==e)throw new aQ("Use 'new' to construct "+L);if(b.V===void 0)throw new aQ(L+" has no accessible constructor");var nA=b.V[arguments.length];if(nA===void 0)throw new aQ("Tried to invoke ctor of "+L+" with invalid number of parameters ("+arguments.length+") - expected ("+Object.keys(b.V).toString()+") parameters instead!");return nA.apply(this,arguments)});var e=Object.create(q,{constructor:{value:r}});r.prototype=e;var b=new ZD(L,r,e,l,P,F,G,a);P=new tB(L,b,!0,!1),q=new tB(L+"*",b,!1,!1);var _=new tB(L+" const*",b,!1,!0);return RC[A]={pointerType:q,Mb:_},function(nA,vB){s.hasOwnProperty(nA)||ZI("Replacing nonexistant public symbol"),s[nA]=vB,s[nA].va=void 0}(O,r),[P,q,_]})},_embind_register_class_constructor:function(A,B,g,E,o,F){iA(0<B);var w=SC(B,g);o=VB(E,o);var G=[F],h=[];ZB([],[A],function(a){var L="constructor "+(a=a[0]).name;if(a.i.V===void 0&&(a.i.V=[]),a.i.V[B-1]!==void 0)throw new aQ("Cannot register multiple constructors with identical number of parameters ("+(B-1)+") for class '"+a.name+"'! Overload resolution is currently only performed using the parameter count, not actual type info!");return a.i.V[B-1]=function(){gI("Cannot construct "+a.name+" due to unbound types",w)},ZB([],w,function(S){return a.i.V[B-1]=function(){arguments.length!==B-1&&DA(L+" called with "+arguments.length+" arguments, expected "+(B-1)),h.length=0,G.length=B;for(var l=1;l<B;++l)G[l]=S[l].toWireType(h,arguments[l-1]);return l=o.apply(null,G),Pg(h),S[0].fromWireType(l)},[]}),[]})},_embind_register_class_function:function(A,B,g,E,o,F,w,G){var h=SC(g,E);B=bA(B),F=VB(o,F),ZB([],[A],function(a){function L(){gI("Cannot call "+S+" due to unbound types",h)}var S=(a=a[0]).name+"."+B;G&&a.i.lc.push(B);var l=a.i.U,O=l[B];return O===void 0||O.N===void 0&&O.className!==a.name&&O.va===g-2?(L.va=g-2,L.className=a.name,l[B]=L):(nC(l,B,S),l[B].N[g-2]=L),ZB([],h,function(r){var P=S,q=a,e=F,b=r.length;2>b&&DA("argTypes array size mismatch! Must at least get return value and 'this' types!");var _=r[1]!==null&&q!==null,nA=!1;for(q=1;q<r.length;++q)if(r[q]!==null&&r[q].O===void 0){nA=!0;break}var vB=r[0].name!=="void",OB="",LQ="";for(q=0;q<b-2;++q)OB+=(q!==0?", ":"")+"arg"+q,LQ+=(q!==0?", ":"")+"arg"+q+"Wired";P="return function "+qg(P)+"("+OB+`) {
if (arguments.length !== `+(b-2)+`) {
throwBindingError('function `+P+" called with ' + arguments.length + ' arguments, expected "+(b-2)+` args!');
}
`,nA&&(P+=`var destructors = [];
`);var Gi=nA?"destructors":"null";for(OB="throwBindingError invoker fn runDestructors retType classParam".split(" "),e=[DA,e,w,Pg,r[0],r[1]],_&&(P+="var thisWired = classParam.toWireType("+Gi+`, this);
`),q=0;q<b-2;++q)P+="var arg"+q+"Wired = argType"+q+".toWireType("+Gi+", arg"+q+"); // "+r[q+2].name+`
`,OB.push("argType"+q),e.push(r[q+2]);if(_&&(LQ="thisWired"+(0<LQ.length?", ":"")+LQ),P+=(vB?"var rv = ":"")+"invoker(fn"+(0<LQ.length?", ":"")+LQ+`);
`,nA)P+=`runDestructors(destructors);
`;else for(q=_?1:2;q<r.length;++q)b=q===1?"thisWired":"arg"+(q-2)+"Wired",r[q].O!==null&&(P+=b+"_dtor("+b+"); // "+r[q].name+`
`,OB.push(b+"_dtor"),e.push(r[q].O));return vB&&(P+=`var ret = retType.fromWireType(rv);
return ret;
`),OB.push(P+`}
`),r=function(QE){var oI=Function;if(!(oI instanceof Function))throw new TypeError("new_ called with constructor type "+typeof oI+" which is not a function");var yI=Wg(oI.name||"unknownFunctionName",function(){});return yI.prototype=oI.prototype,yI=new yI,(QE=oI.apply(yI,QE))instanceof Object?QE:yI}(OB).apply(null,e),l[B].N===void 0?(r.va=g-2,l[B]=r):l[B].N[g-2]=r,[]}),[]})},_embind_register_class_property:function(A,B,g,E,o,F,w,G,h,a){B=bA(B),o=VB(E,o),ZB([],[A],function(L){var S=(L=L[0]).name+"."+B,l={get:function(){gI("Cannot access "+S+" due to unbound types",[g,w])},enumerable:!0,configurable:!0};return l.set=h?function(){gI("Cannot access "+S+" due to unbound types",[g,w])}:function(){DA(S+" is a read-only property")},Object.defineProperty(L.i.U,B,l),ZB([],h?[g,w]:[g],function(O){var r=O[0],P={get:function(){var e=rC(this,L,S+" getter");return r.fromWireType(o(F,e))},enumerable:!0};if(h){h=VB(G,h);var q=O[1];P.set=function(e){var b=rC(this,L,S+" setter"),_=[];h(a,b,q.toWireType(_,e)),Pg(_)}}return Object.defineProperty(L.i.U,B,P),[]}),[]})},_embind_register_emval:function(A,B){NB(A,{name:B=bA(B),fromWireType:function(g){var E=EB[g].value;return 4<g&&--EB[g].ra==0&&(EB[g]=void 0,_g.push(g)),E},toWireType:function(g,E){return dC(E)},argPackAdvance:8,readValueFromPointer:qI,O:null})},_embind_register_float:function(A,B,g){g=Og(g),NB(A,{name:B=bA(B),fromWireType:function(E){return E},toWireType:function(E,o){if(typeof o!="number"&&typeof o!="boolean")throw new TypeError('Cannot convert "'+eQ(o)+'" to '+this.name);return o},argPackAdvance:8,readValueFromPointer:XD(B,g),O:null})},_embind_register_integer:function(A,B,g,E,o){function F(a){return a}B=bA(B),o===-1&&(o=4294967295);var w=Og(g);if(E===0){var G=32-8*g;F=function(a){return a<<G>>>G}}var h=B.indexOf("unsigned")!=-1;NB(A,{name:B,fromWireType:F,toWireType:function(a,L){if(typeof L!="number"&&typeof L!="boolean")throw new TypeError('Cannot convert "'+eQ(L)+'" to '+this.name);if(L<E||L>o)throw new TypeError('Passing a number "'+eQ(L)+'" from JS side to C/C++ side to an argument of type "'+B+'", which is outside the valid range ['+E+", "+o+"]!");return h?L>>>0:0|L},argPackAdvance:8,readValueFromPointer:zD(B,w,E!==0),O:null})},_embind_register_memory_view:function(A,B,g){function E(F){var w=jA;return new o(XA,w[1+(F>>=2)],w[F])}var o=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array][B];NB(A,{name:g=bA(g),fromWireType:E,argPackAdvance:8,readValueFromPointer:E},{Zb:!0})},_embind_register_std_string:function(A,B){var g=(B=bA(B))==="std::string";NB(A,{name:B,fromWireType:function(E){var o=jA[E>>2];if(g){var F=hA[E+4+o],w=0;F!=0&&(w=F,hA[E+4+o]=0);var G=E+4;for(F=0;F<=o;++F){var h=E+4+F;if(hA[h]==0){if(G=GA(G),a===void 0)var a=G;else a+="\0",a+=G;G=h+1}}w!=0&&(hA[E+4+o]=w)}else{for(a=Array(o),F=0;F<o;++F)a[F]=String.fromCharCode(hA[E+4+F]);a=a.join("")}return PA(E),a},toWireType:function(E,o){o instanceof ArrayBuffer&&(o=new Uint8Array(o));var F=typeof o=="string";F||o instanceof Uint8Array||o instanceof Uint8ClampedArray||o instanceof Int8Array||DA("Cannot pass non-string to std::string");var w=(g&&F?function(){return aA(o)}:function(){return o.length})(),G=EI(4+w+1);if(jA[G>>2]=w,g&&F)LA(o,hA,G+4,w+1);else if(F)for(F=0;F<w;++F){var h=o.charCodeAt(F);255<h&&(PA(G),DA("String has UTF-16 code units that do not fit in 8 bits")),hA[G+4+F]=h}else for(F=0;F<w;++F)hA[G+4+F]=o[F];return E!==null&&E.push(PA,G),G},argPackAdvance:8,readValueFromPointer:qI,O:function(E){PA(E)}})},_embind_register_std_wstring:function(A,B,g){if(g=bA(g),B===2)var E=RB,o=mB,F=mg,w=function(){return LB},G=1;else B===4&&(E=QB,o=yQ,F=nB,w=function(){return jA},G=2);NB(A,{name:g,fromWireType:function(h){var a=jA[h>>2],L=w(),S=L[h+4+a*B>>G],l=0;S!=0&&(l=S,L[h+4+a*B>>G]=0);var O=h+4;for(S=0;S<=a;++S){var r=h+4+S*B;if(L[r>>G]==0){if(O=E(O),P===void 0)var P=O;else P+="\0",P+=O;O=r+B}}return l!=0&&(L[h+4+a*B>>G]=l),PA(h),P},toWireType:function(h,a){typeof a!="string"&&DA("Cannot pass non-string to C++ string type "+g);var L=F(a),S=EI(4+L+B);return jA[S>>2]=L>>G,o(a,S+4,L+B),h!==null&&h.push(PA,S),S},argPackAdvance:8,readValueFromPointer:qI,O:function(h){PA(h)}})},_embind_register_void:function(A,B){NB(A,{Jc:!0,name:B=bA(B),argPackAdvance:0,fromWireType:function(){},toWireType:function(){}})},abort:function(){RA()},emscripten_get_sbrk_ptr:function(){return 91008},emscripten_memcpy_big:function(A,B,g){hA.copyWithin(A,B,B+g)},emscripten_resize_heap:function(A){A>>>=0;var B=hA.length;if(2147483648<A)return!1;for(var g=1;4>=g;g*=2){var E=B*(1+.2/g);E=Math.min(E,A+100663296),0<(E=Math.max(16777216,A,E))%65536&&(E+=65536-E%65536);A:{try{sA.grow(Math.min(2147483648,E)-XA.byteLength+65535>>>16),_Q(sA.buffer);var o=1;break A}catch{}o=void 0}if(o)return!0}return!1},environ_get:function(A,B){var g=0;return lC().forEach(function(E,o){var F=B+g;for(o=d[A+4*o>>2]=F,F=0;F<E.length;++F)dA[o++>>0]=E.charCodeAt(F);dA[o>>0]=0,g+=E.length+1}),0},environ_sizes_get:function(A,B){var g=lC();d[A>>2]=g.length;var E=0;return g.forEach(function(o){E+=o.length+1}),d[B>>2]=E,0},fd_close:function(A){try{var B=tQ(A);return i.close(B),0}catch(g){return i!==void 0&&g instanceof i.b||RA(g),g.B}},fd_read:function(A,B,g,E){try{A:{for(var o=tQ(A),F=A=0;F<g;F++){var w=d[B+(8*F+4)>>2],G=i.read(o,dA,d[B+8*F>>2],w,void 0);if(0>G){var h=-1;break A}if(A+=G,G<w)break}h=A}return d[E>>2]=h,0}catch(a){return i!==void 0&&a instanceof i.b||RA(a),a.B}},fd_seek:function(A,B,g,E,o){try{var F=tQ(A);return-9007199254740992>=(A=4294967296*g+(B>>>0))||9007199254740992<=A?-61:(i.K(F,A,E),xA=[F.position>>>0,(tA=F.position,1<=+FQ(tA)?0<tA?(0|gB(+IB(tA/4294967296),4294967295))>>>0:~~+SB((tA-+(~~tA>>>0))/4294967296)>>>0:0)],d[o>>2]=xA[0],d[o+4>>2]=xA[1],F.Oa&&A===0&&E===0&&(F.Oa=null),0)}catch(w){return i!==void 0&&w instanceof i.b||RA(w),w.B}},fd_write:function(A,B,g,E){try{A:{for(var o=tQ(A),F=A=0;F<g;F++){var w=i.write(o,dA,d[B+8*F>>2],d[B+(8*F+4)>>2],void 0);if(0>w){var G=-1;break A}A+=w}G=A}return d[E>>2]=G,0}catch(h){return i!==void 0&&h instanceof i.b||RA(h),h.B}},getTempRet0:function(){return 0|CA},gettimeofday:function(A){var B=Date.now();return d[A>>2]=B/1e3|0,d[A+4>>2]=B%1e3*1e3|0,0},invoke_diii:function(A,B,g,E){var o=cA();try{return Hi(A,B,g,E)}catch(F){if(UA(o),F!==F+0&&F!=="longjmp")throw F;oA(1,0)}},invoke_fiii:function(A,B,g,E){var o=cA();try{return ti(A,B,g,E)}catch(F){if(UA(o),F!==F+0&&F!=="longjmp")throw F;oA(1,0)}},invoke_i:function(A){var B=cA();try{return $C(A)}catch(g){if(UA(B),g!==g+0&&g!=="longjmp")throw g;oA(1,0)}},invoke_ii:function(A,B){var g=cA();try{return Ai(A,B)}catch(E){if(UA(g),E!==E+0&&E!=="longjmp")throw E;oA(1,0)}},invoke_iif:function(A,B,g){var E=cA();try{return Ui(A,B,g)}catch(o){if(UA(E),o!==o+0&&o!=="longjmp")throw o;oA(1,0)}},invoke_iii:function(A,B,g){var E=cA();try{return Bi(A,B,g)}catch(o){if(UA(E),o!==o+0&&o!=="longjmp")throw o;oA(1,0)}},invoke_iiii:function(A,B,g,E){var o=cA();try{return Qi(A,B,g,E)}catch(F){if(UA(o),F!==F+0&&F!=="longjmp")throw F;oA(1,0)}},invoke_iiiii:function(A,B,g,E,o){var F=cA();try{return Ii(A,B,g,E,o)}catch(w){if(UA(F),w!==w+0&&w!=="longjmp")throw w;oA(1,0)}},invoke_iiiiid:function(A,B,g,E,o,F){var w=cA();try{return si(A,B,g,E,o,F)}catch(G){if(UA(w),G!==G+0&&G!=="longjmp")throw G;oA(1,0)}},invoke_iiiiii:function(A,B,g,E,o,F){var w=cA();try{return gi(A,B,g,E,o,F)}catch(G){if(UA(w),G!==G+0&&G!=="longjmp")throw G;oA(1,0)}},invoke_iiiiiii:function(A,B,g,E,o,F,w){var G=cA();try{return Ei(A,B,g,E,o,F,w)}catch(h){if(UA(G),h!==h+0&&h!=="longjmp")throw h;oA(1,0)}},invoke_iiiiiiii:function(A,B,g,E,o,F,w,G){var h=cA();try{return Ci(A,B,g,E,o,F,w,G)}catch(a){if(UA(h),a!==a+0&&a!=="longjmp")throw a;oA(1,0)}},invoke_iiiiiiiiiii:function(A,B,g,E,o,F,w,G,h,a,L){var S=cA();try{return ii(A,B,g,E,o,F,w,G,h,a,L)}catch(l){if(UA(S),l!==l+0&&l!=="longjmp")throw l;oA(1,0)}},invoke_iiiiiiiiiiii:function(A,B,g,E,o,F,w,G,h,a,L,S){var l=cA();try{return Di(A,B,g,E,o,F,w,G,h,a,L,S)}catch(O){if(UA(l),O!==O+0&&O!=="longjmp")throw O;oA(1,0)}},invoke_iiiiiiiiiiiii:function(A,B,g,E,o,F,w,G,h,a,L,S,l){var O=cA();try{return oi(A,B,g,E,o,F,w,G,h,a,L,S,l)}catch(r){if(UA(O),r!==r+0&&r!=="longjmp")throw r;oA(1,0)}},invoke_iiiiij:function(A,B,g,E,o,F,w){var G=cA();try{return yi(A,B,g,E,o,F,w)}catch(h){if(UA(G),h!==h+0&&h!=="longjmp")throw h;oA(1,0)}},invoke_iiijiiiiii:function(A,B,g,E,o,F,w,G,h,a,L){var S=cA();try{return Fi(A,B,g,E,o,F,w,G,h,a,L)}catch(l){if(UA(S),l!==l+0&&l!=="longjmp")throw l;oA(1,0)}},invoke_iij:function(A,B,g,E){var o=cA();try{return ci(A,B,g,E)}catch(F){if(UA(o),F!==F+0&&F!=="longjmp")throw F;oA(1,0)}},invoke_jii:function(A,B,g){var E=cA();try{return wi(A,B,g)}catch(o){if(UA(E),o!==o+0&&o!=="longjmp")throw o;oA(1,0)}},invoke_jiiii:function(A,B,g,E,o){var F=cA();try{return Ni(A,B,g,E,o)}catch(w){if(UA(F),w!==w+0&&w!=="longjmp")throw w;oA(1,0)}},invoke_v:function(A){var B=cA();try{bC(A)}catch(g){if(UA(B),g!==g+0&&g!=="longjmp")throw g;oA(1,0)}},invoke_vi:function(A,B){var g=cA();try{ZC(A,B)}catch(E){if(UA(g),E!==E+0&&E!=="longjmp")throw E;oA(1,0)}},invoke_vii:function(A,B,g){var E=cA();try{vC(A,B,g)}catch(o){if(UA(E),o!==o+0&&o!=="longjmp")throw o;oA(1,0)}},invoke_viii:function(A,B,g,E){var o=cA();try{OC(A,B,g,E)}catch(F){if(UA(o),F!==F+0&&F!=="longjmp")throw F;oA(1,0)}},invoke_viiii:function(A,B,g,E,o){var F=cA();try{qC(A,B,g,E,o)}catch(w){if(UA(F),w!==w+0&&w!=="longjmp")throw w;oA(1,0)}},invoke_viiiii:function(A,B,g,E,o,F){var w=cA();try{WC(A,B,g,E,o,F)}catch(G){if(UA(w),G!==G+0&&G!=="longjmp")throw G;oA(1,0)}},invoke_viiiiiii:function(A,B,g,E,o,F,w,G){var h=cA();try{XC(A,B,g,E,o,F,w,G)}catch(a){if(UA(h),a!==a+0&&a!=="longjmp")throw a;oA(1,0)}},invoke_viiiiiiiiii:function(A,B,g,E,o,F,w,G,h,a,L){var S=cA();try{zC(A,B,g,E,o,F,w,G,h,a,L)}catch(l){if(UA(S),l!==l+0&&l!=="longjmp")throw l;oA(1,0)}},invoke_viiiiiiiiiiiiiii:function(A,B,g,E,o,F,w,G,h,a,L,S,l,O,r,P){var q=cA();try{jC(A,B,g,E,o,F,w,G,h,a,L,S,l,O,r,P)}catch(e){if(UA(q),e!==e+0&&e!=="longjmp")throw e;oA(1,0)}},invoke_viiiijji:function(A,B,g,E,o,F,w,G,h,a){var L=cA();try{TC(A,B,g,E,o,F,w,G,h,a)}catch(S){if(UA(L),S!==S+0&&S!=="longjmp")throw S;oA(1,0)}},invoke_viijii:function(A,B,g,E,o,F,w){var G=cA();try{PC(A,B,g,E,o,F,w)}catch(h){if(UA(G),h!==h+0&&h!=="longjmp")throw h;oA(1,0)}},invoke_viji:function(A,B,g,E,o){var F=cA();try{_C(A,B,g,E,o)}catch(w){if(UA(F),w!==w+0&&w!=="longjmp")throw w;oA(1,0)}},llvm_eh_typeid_for:function(A){return A},memory:sA,setTempRet0:function(A){CA=0|A},strftime_l:function(A,B,g,E){return function(o,F,w,G){function h(e,b,_){for(e=typeof e=="number"?e.toString():e||"";e.length<b;)e=_[0]+e;return e}function a(e,b){return h(e,b,"0")}function L(e,b){function _(vB){return 0>vB?-1:0<vB?1:0}var nA;return(nA=_(e.getFullYear()-b.getFullYear()))===0&&(nA=_(e.getMonth()-b.getMonth()))===0&&(nA=_(e.getDate()-b.getDate())),nA}function S(e){switch(e.getDay()){case 0:return new Date(e.getFullYear()-1,11,29);case 1:return e;case 2:return new Date(e.getFullYear(),0,3);case 3:return new Date(e.getFullYear(),0,2);case 4:return new Date(e.getFullYear(),0,1);case 5:return new Date(e.getFullYear()-1,11,31);case 6:return new Date(e.getFullYear()-1,11,30)}}function l(e){e=TI(new Date(e.C+1900,0,1),e.Ia);var b=new Date(e.getFullYear()+1,0,4),_=S(new Date(e.getFullYear(),0,4));return b=S(b),0>=L(_,e)?0>=L(b,e)?e.getFullYear()+1:e.getFullYear():e.getFullYear()-1}var O=d[G+40>>2];for(var r in G={uc:d[G>>2],tc:d[G+4>>2],Ga:d[G+8>>2],sa:d[G+12>>2],fa:d[G+16>>2],C:d[G+20>>2],Ha:d[G+24>>2],Ia:d[G+28>>2],Vc:d[G+32>>2],sc:d[G+36>>2],vc:O?GA(O):""},w=GA(w),O={"%c":"%a %b %d %H:%M:%S %Y","%D":"%m/%d/%y","%F":"%Y-%m-%d","%h":"%b","%r":"%I:%M:%S %p","%R":"%H:%M","%T":"%H:%M:%S","%x":"%m/%d/%y","%X":"%H:%M:%S","%Ec":"%c","%EC":"%C","%Ex":"%m/%d/%y","%EX":"%H:%M:%S","%Ey":"%y","%EY":"%Y","%Od":"%d","%Oe":"%e","%OH":"%H","%OI":"%I","%Om":"%m","%OM":"%M","%OS":"%S","%Ou":"%u","%OU":"%U","%OV":"%V","%Ow":"%w","%OW":"%W","%Oy":"%y"})w=w.replace(new RegExp(r,"g"),O[r]);var P="Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),q="January February March April May June July August September October November December".split(" ");for(r in O={"%a":function(e){return P[e.Ha].substring(0,3)},"%A":function(e){return P[e.Ha]},"%b":function(e){return q[e.fa].substring(0,3)},"%B":function(e){return q[e.fa]},"%C":function(e){return a((e.C+1900)/100|0,2)},"%d":function(e){return a(e.sa,2)},"%e":function(e){return h(e.sa,2," ")},"%g":function(e){return l(e).toString().substring(2)},"%G":function(e){return l(e)},"%H":function(e){return a(e.Ga,2)},"%I":function(e){return(e=e.Ga)==0?e=12:12<e&&(e-=12),a(e,2)},"%j":function(e){return a(e.sa+AE(XI(e.C+1900)?zI:jI,e.fa-1),3)},"%m":function(e){return a(e.fa+1,2)},"%M":function(e){return a(e.tc,2)},"%n":function(){return`
`},"%p":function(e){return 0<=e.Ga&&12>e.Ga?"AM":"PM"},"%S":function(e){return a(e.uc,2)},"%t":function(){return"	"},"%u":function(e){return e.Ha||7},"%U":function(e){var b=new Date(e.C+1900,0,1),_=b.getDay()===0?b:TI(b,7-b.getDay());return 0>L(_,e=new Date(e.C+1900,e.fa,e.sa))?a(Math.ceil((31-_.getDate()+(AE(XI(e.getFullYear())?zI:jI,e.getMonth()-1)-31)+e.getDate())/7),2):L(_,b)===0?"01":"00"},"%V":function(e){var b=new Date(e.C+1901,0,4),_=S(new Date(e.C+1900,0,4));b=S(b);var nA=TI(new Date(e.C+1900,0,1),e.Ia);return 0>L(nA,_)?"53":0>=L(b,nA)?"01":a(Math.ceil((_.getFullYear()<e.C+1900?e.Ia+32-_.getDate():e.Ia+1-_.getDate())/7),2)},"%w":function(e){return e.Ha},"%W":function(e){var b=new Date(e.C,0,1),_=b.getDay()===1?b:TI(b,b.getDay()===0?1:7-b.getDay()+1);return 0>L(_,e=new Date(e.C+1900,e.fa,e.sa))?a(Math.ceil((31-_.getDate()+(AE(XI(e.getFullYear())?zI:jI,e.getMonth()-1)-31)+e.getDate())/7),2):L(_,b)===0?"01":"00"},"%y":function(e){return(e.C+1900).toString().substring(2)},"%Y":function(e){return e.C+1900},"%z":function(e){var b=0<=(e=e.sc);return e=Math.abs(e)/60,(b?"+":"-")+("0000"+(e/60*100+e%60)).slice(-4)},"%Z":function(e){return e.vc},"%%":function(){return"%"}})0<=w.indexOf(r)&&(w=w.replace(new RegExp(r,"g"),O[r](G)));return(r=_I(w,!1)).length>F?0:(dA.set(r,o),r.length-1)}(A,B,g,E)},table:p},uC=function(){function A(o){s.asm=o.exports,cQ()}function B(o){A(o.instance)}function g(o){return(IA||!Y&&!u||typeof fetch!="function"||rB(TA,"file://")?new Promise(function(F){F(wC())}):fetch(TA,{credentials:"same-origin"}).then(function(F){if(!F.ok)throw"failed to load wasm binary file at '"+TA+"'";return F.arrayBuffer()}).catch(function(){return wC()})).then(function(F){return WebAssembly.instantiate(F,E)}).then(o,function(F){EA("failed to asynchronously prepare wasm: "+F),RA(F)})}var E={env:fC,wasi_snapshot_preview1:fC};if(uI(),s.instantiateWasm)try{return s.instantiateWasm(E,A)}catch(o){return EA("Module.instantiateWasm callback failed with error: "+o),!1}return function(){if(IA||typeof WebAssembly.instantiateStreaming!="function"||rB(TA,UQ)||rB(TA,"file://")||typeof fetch!="function")return g(B);fetch(TA,{credentials:"same-origin"}).then(function(o){return WebAssembly.instantiateStreaming(o,E).then(B,function(F){EA("wasm streaming compile failed: "+F),EA("falling back to ArrayBuffer instantiation"),g(B)})})}(),{}}();s.asm=uC;var pC=s.___wasm_call_ctors=function(){return(pC=s.___wasm_call_ctors=s.asm.__wasm_call_ctors).apply(null,arguments)},EI=s._malloc=function(){return(EI=s._malloc=s.asm.malloc).apply(null,arguments)},PA=s._free=function(){return(PA=s._free=s.asm.free).apply(null,arguments)},xC=s.___errno_location=function(){return(xC=s.___errno_location=s.asm.__errno_location).apply(null,arguments)},oA=s._setThrew=function(){return(oA=s._setThrew=s.asm.setThrew).apply(null,arguments)},YQ=s.__ZSt18uncaught_exceptionv=function(){return(YQ=s.__ZSt18uncaught_exceptionv=s.asm._ZSt18uncaught_exceptionv).apply(null,arguments)},CI=s.___cxa_can_catch=function(){return(CI=s.___cxa_can_catch=s.asm.__cxa_can_catch).apply(null,arguments)},iI=s.___cxa_is_pointer_type=function(){return(iI=s.___cxa_is_pointer_type=s.asm.__cxa_is_pointer_type).apply(null,arguments)},mC=s.___getTypeName=function(){return(mC=s.___getTypeName=s.asm.__getTypeName).apply(null,arguments)};s.___embind_register_native_and_builtin_types=function(){return(s.___embind_register_native_and_builtin_types=s.asm.__embind_register_native_and_builtin_types).apply(null,arguments)};var bC=s.dynCall_v=function(){return(bC=s.dynCall_v=s.asm.dynCall_v).apply(null,arguments)},ZC=s.dynCall_vi=function(){return(ZC=s.dynCall_vi=s.asm.dynCall_vi).apply(null,arguments)},vC=s.dynCall_vii=function(){return(vC=s.dynCall_vii=s.asm.dynCall_vii).apply(null,arguments)},OC=s.dynCall_viii=function(){return(OC=s.dynCall_viii=s.asm.dynCall_viii).apply(null,arguments)},qC=s.dynCall_viiii=function(){return(qC=s.dynCall_viiii=s.asm.dynCall_viiii).apply(null,arguments)},WC=s.dynCall_viiiii=function(){return(WC=s.dynCall_viiiii=s.asm.dynCall_viiiii).apply(null,arguments)},XC=s.dynCall_viiiiiii=function(){return(XC=s.dynCall_viiiiiii=s.asm.dynCall_viiiiiii).apply(null,arguments)},zC=s.dynCall_viiiiiiiiii=function(){return(zC=s.dynCall_viiiiiiiiii=s.asm.dynCall_viiiiiiiiii).apply(null,arguments)},jC=s.dynCall_viiiiiiiiiiiiiii=function(){return(jC=s.dynCall_viiiiiiiiiiiiiii=s.asm.dynCall_viiiiiiiiiiiiiii).apply(null,arguments)},TC=s.dynCall_viiiijji=function(){return(TC=s.dynCall_viiiijji=s.asm.dynCall_viiiijji).apply(null,arguments)},PC=s.dynCall_viijii=function(){return(PC=s.dynCall_viijii=s.asm.dynCall_viijii).apply(null,arguments)},_C=s.dynCall_viji=function(){return(_C=s.dynCall_viji=s.asm.dynCall_viji).apply(null,arguments)},$C=s.dynCall_i=function(){return($C=s.dynCall_i=s.asm.dynCall_i).apply(null,arguments)},Ai=s.dynCall_ii=function(){return(Ai=s.dynCall_ii=s.asm.dynCall_ii).apply(null,arguments)},Bi=s.dynCall_iii=function(){return(Bi=s.dynCall_iii=s.asm.dynCall_iii).apply(null,arguments)},Qi=s.dynCall_iiii=function(){return(Qi=s.dynCall_iiii=s.asm.dynCall_iiii).apply(null,arguments)},Ii=s.dynCall_iiiii=function(){return(Ii=s.dynCall_iiiii=s.asm.dynCall_iiiii).apply(null,arguments)},gi=s.dynCall_iiiiii=function(){return(gi=s.dynCall_iiiiii=s.asm.dynCall_iiiiii).apply(null,arguments)},Ei=s.dynCall_iiiiiii=function(){return(Ei=s.dynCall_iiiiiii=s.asm.dynCall_iiiiiii).apply(null,arguments)},Ci=s.dynCall_iiiiiiii=function(){return(Ci=s.dynCall_iiiiiiii=s.asm.dynCall_iiiiiiii).apply(null,arguments)},ii=s.dynCall_iiiiiiiiiii=function(){return(ii=s.dynCall_iiiiiiiiiii=s.asm.dynCall_iiiiiiiiiii).apply(null,arguments)},Di=s.dynCall_iiiiiiiiiiii=function(){return(Di=s.dynCall_iiiiiiiiiiii=s.asm.dynCall_iiiiiiiiiiii).apply(null,arguments)},oi=s.dynCall_iiiiiiiiiiiii=function(){return(oi=s.dynCall_iiiiiiiiiiiii=s.asm.dynCall_iiiiiiiiiiiii).apply(null,arguments)},yi=s.dynCall_iiiiij=function(){return(yi=s.dynCall_iiiiij=s.asm.dynCall_iiiiij).apply(null,arguments)},si=s.dynCall_iiiiid=function(){return(si=s.dynCall_iiiiid=s.asm.dynCall_iiiiid).apply(null,arguments)},Fi=s.dynCall_iiijiiiiii=function(){return(Fi=s.dynCall_iiijiiiiii=s.asm.dynCall_iiijiiiiii).apply(null,arguments)},ci=s.dynCall_iij=function(){return(ci=s.dynCall_iij=s.asm.dynCall_iij).apply(null,arguments)},Ui=s.dynCall_iif=function(){return(Ui=s.dynCall_iif=s.asm.dynCall_iif).apply(null,arguments)},wi=s.dynCall_jii=function(){return(wi=s.dynCall_jii=s.asm.dynCall_jii).apply(null,arguments)},Ni=s.dynCall_jiiii=function(){return(Ni=s.dynCall_jiiii=s.asm.dynCall_jiiii).apply(null,arguments)},ti=s.dynCall_fiii=function(){return(ti=s.dynCall_fiii=s.asm.dynCall_fiii).apply(null,arguments)},Hi=s.dynCall_diii=function(){return(Hi=s.dynCall_diii=s.asm.dynCall_diii).apply(null,arguments)},cA=s.stackSave=function(){return(cA=s.stackSave=s.asm.stackSave).apply(null,arguments)};s.stackAlloc=function(){return(s.stackAlloc=s.asm.stackAlloc).apply(null,arguments)};var DI,UA=s.stackRestore=function(){return(UA=s.stackRestore=s.asm.stackRestore).apply(null,arguments)};function BE(){function A(){if(!DI&&(DI=!0,s.calledRun=!0,!AA)){if(s.noFSInit||i.ka.Qa||i.ka(),kB(UB),i.ub=!1,kB(KI),s.onRuntimeInitialized&&s.onRuntimeInitialized(),s.postRun)for(typeof s.postRun=="function"&&(s.postRun=[s.postRun]);s.postRun.length;){var B=s.postRun.shift();fI.unshift(B)}kB(fI)}}if(!(0<MA)){if(s.preRun)for(typeof s.preRun=="function"&&(s.preRun=[s.preRun]);s.preRun.length;)bg();kB($Q),0<MA||(s.setStatus?(s.setStatus("Running..."),setTimeout(function(){setTimeout(function(){s.setStatus("")},1),A()},1)):A())}}if(s.__growWasmMemory=function(){return(s.__growWasmMemory=s.asm.__growWasmMemory).apply(null,arguments)},s.dynCall_iiijij=function(){return(s.dynCall_iiijij=s.asm.dynCall_iiijij).apply(null,arguments)},s.dynCall_jiji=function(){return(s.dynCall_jiji=s.asm.dynCall_jiji).apply(null,arguments)},s.dynCall_iidiiii=function(){return(s.dynCall_iidiiii=s.asm.dynCall_iidiiii).apply(null,arguments)},s.dynCall_iiiiiiiii=function(){return(s.dynCall_iiiiiiiii=s.asm.dynCall_iiiiiiiii).apply(null,arguments)},s.dynCall_iiiiijj=function(){return(s.dynCall_iiiiijj=s.asm.dynCall_iiiiijj).apply(null,arguments)},s.dynCall_iiiiiijj=function(){return(s.dynCall_iiiiiijj=s.asm.dynCall_iiiiiijj).apply(null,arguments)},s.dynCall_viiiiii=function(){return(s.dynCall_viiiiii=s.asm.dynCall_viiiiii).apply(null,arguments)},s.asm=uC,s.FS=i,s.then=function(A){if(DI)A(s);else{var B=s.onRuntimeInitialized;s.onRuntimeInitialized=function(){B&&B(),A(s)}}return s},bB=function A(){DI||BE(),DI||(bB=A)},s.run=BE,s.preInit)for(typeof s.preInit=="function"&&(s.preInit=[s.preInit]);0<s.preInit.length;)s.preInit.pop()();return BE(),H});Q.exports=N}).call(this,"/index.js","/")},function(Q,I,C){C.r(I),C.d(I,"createH264MP4Encoder",function(){return H});var y=C(1),D=function(s,R,n,Y){return new(n||(n=Promise))(function(u,v){function K(z){try{M(Y.next(z))}catch(j){v(j)}}function x(z){try{M(Y.throw(z))}catch(j){v(j)}}function M(z){var j;z.done?u(z.value):(j=z.value,j instanceof n?j:new n(function(QA){QA(j)})).then(K,x)}M((Y=Y.apply(s,[])).next())})};const U=C.n(y)()(),N=new Promise(s=>{U.then(()=>{s()})}),H=()=>D(void 0,void 0,void 0,function*(){yield N;const s=new U.H264MP4Encoder;return s.FS=U.FS,s})},function(Q,I){Q.exports=CE},function(Q,I){Q.exports=CE}]);const Xy=Ji(Wy),JQ=class JQ extends jQ{constructor(I){super({...JQ.defaultOptions,...I})}async init(I){super.init(I),this.encoder=await Xy.createH264MP4Encoder(),Object.assign(this.encoder,{width:ug(this.width,2),height:ug(this.height,2),frameRate:this.frameRate,kbps:rD(this.width,this.height,this.frameRate)/1e3,debug:this.debug,...this.encoderOptions}),this.encoder.initialize()}async start(){await super.start(),this.step()}encode(I){this.encoder.addFrameRgba(I)}stop(){return this.encoder.finalize(),this.encoder.FS.readFile(this.encoder.outputFilename)}dispose(){this.encoder.delete(),this.encoder=null}};fA(JQ,"supportedExtensions",["mp4"]),fA(JQ,"defaultOptions",{extension:JQ.supportedExtensions[0],frameMethod:"imageData"});let lE=JQ;var zy={signature:"GIF",version:"89a",trailer:59,extensionIntroducer:33,applicationExtensionLabel:255,graphicControlExtensionLabel:249,imageSeparator:44,signatureSize:3,versionSize:3,globalColorTableFlagMask:128,colorResolutionMask:112,sortFlagMask:8,globalColorTableSizeMask:7,applicationIdentifierSize:8,applicationAuthCodeSize:3,disposalMethodMask:28,userInputFlagMask:2,transparentColorFlagMask:1,localColorTableFlagMask:128,interlaceFlagMask:64,idSortFlagMask:32,localColorTableSizeMask:7};function dD(Q=256){let I=0,C=new Uint8Array(Q);return{get buffer(){return C.buffer},reset(){I=0},bytesView(){return C.subarray(0,I)},bytes(){return C.slice(0,I)},writeByte(D){y(I+1),C[I]=D,I++},writeBytes(D,U=0,N=D.length){y(I+N);for(let H=0;H<N;H++)C[I++]=D[H+U]},writeBytesView(D,U=0,N=D.byteLength){y(I+N),C.set(D.subarray(U,U+N),I),I+=N}};function y(D){var U=C.length;if(U>=D)return;var N=1024*1024;D=Math.max(D,U*(U<N?2:1.125)>>>0),U!=0&&(D=Math.max(D,256));let H=C;C=new Uint8Array(D),I>0&&C.set(H.subarray(0,I),0)}}var iE=12,ri=5003,jy=[0,1,3,7,15,31,63,127,255,511,1023,2047,4095,8191,16383,32767,65535];function Ty(Q,I,C,y,D=dD(512),U=new Uint8Array(256),N=new Int32Array(ri),H=new Int32Array(ri)){let s=N.length,R=Math.max(2,y);U.fill(0),H.fill(0),N.fill(-1);let n=0,Y=0,u=R+1,v=u,K=!1,x=v,M=(1<<x)-1,z=1<<u-1,j=z+1,QA=z+2,T=0,wA=C[0],EA=0;for(let sA=s;sA<65536;sA*=2)++EA;EA=8-EA,D.writeByte(R),CA(z);let IA=C.length;for(let sA=1;sA<IA;sA++)A:{let p=C[sA],AA=(p<<iE)+wA,iA=p<<EA^wA;if(N[iA]===AA){wA=H[iA];break A}let YA=iA===0?1:s-iA;for(;N[iA]>=0;)if(iA-=YA,iA<0&&(iA+=s),N[iA]===AA){wA=H[iA];break A}CA(wA),wA=p,QA<1<<iE?(H[iA]=QA++,N[iA]=AA):(N.fill(-1),QA=z+2,K=!0,CA(z))}return CA(wA),CA(j),D.writeByte(0),D.bytesView();function CA(sA){for(n&=jy[Y],Y>0?n|=sA<<Y:n=sA,Y+=x;Y>=8;)U[T++]=n&255,T>=254&&(D.writeByte(T),D.writeBytesView(U,0,T),T=0),n>>=8,Y-=8;if((QA>M||K)&&(K?(x=v,M=(1<<x)-1,K=!1):(++x,M=x===iE?1<<x:(1<<x)-1)),sA==j){for(;Y>0;)U[T++]=n&255,T>=254&&(D.writeByte(T),D.writeBytesView(U,0,T),T=0),n>>=8,Y-=8;T>0&&(D.writeByte(T),D.writeBytesView(U,0,T),T=0)}}}var Py=Ty;function MD(Q,I,C){return Q<<8&63488|I<<2&992|C>>3}function lD(Q,I,C,y){return Q>>4|I&240|(C&240)<<4|(y&240)<<8}function JD(Q,I,C){return Q>>4<<8|I&240|C>>4}function Ag(Q,I,C){return Q<I?I:Q>C?C:Q}function ag(Q){return Q*Q}function di(Q,I,C){var y=0,D=1e100;let U=Q[I],N=U.cnt;U.ac;let H=U.rc,s=U.gc,R=U.bc;for(var n=U.fw;n!=0;n=Q[n].fw){let u=Q[n],v=u.cnt,K=N*v/(N+v);if(!(K>=D)){var Y=0;Y+=K*ag(u.rc-H),!(Y>=D)&&(Y+=K*ag(u.gc-s),!(Y>=D)&&(Y+=K*ag(u.bc-R),!(Y>=D)&&(D=Y,y=n)))}}U.err=D,U.nn=y}function DE(){return{ac:0,rc:0,gc:0,bc:0,cnt:0,nn:0,fw:0,bk:0,tm:0,mtm:0,err:0}}function _y(Q,I){let C=I==="rgb444"?4096:65536,y=new Array(C),D=Q.length;if(I==="rgba4444")for(let U=0;U<D;++U){let N=Q[U],H=N>>24&255,s=N>>16&255,R=N>>8&255,n=N&255,Y=lD(n,R,s,H),u=Y in y?y[Y]:y[Y]=DE();u.rc+=n,u.gc+=R,u.bc+=s,u.ac+=H,u.cnt++}else if(I==="rgb444")for(let U=0;U<D;++U){let N=Q[U],H=N>>16&255,s=N>>8&255,R=N&255,n=JD(R,s,H),Y=n in y?y[n]:y[n]=DE();Y.rc+=R,Y.gc+=s,Y.bc+=H,Y.cnt++}else for(let U=0;U<D;++U){let N=Q[U],H=N>>16&255,s=N>>8&255,R=N&255,n=MD(R,s,H),Y=n in y?y[n]:y[n]=DE();Y.rc+=R,Y.gc+=s,Y.bc+=H,Y.cnt++}return y}function $y(Q,I,C={}){let{format:y="rgb565",clearAlpha:D=!0,clearAlphaColor:U=0,clearAlphaThreshold:N=0,oneBitAlpha:H=!1}=C;if(!Q||!Q.buffer)throw new Error("quantize() expected RGBA Uint8Array data");if(!(Q instanceof Uint8Array)&&!(Q instanceof Uint8ClampedArray))throw new Error("quantize() expected RGBA Uint8Array data");let s=new Uint32Array(Q.buffer),R=C.useSqrt!==!1,n=y==="rgba4444",Y=_y(s,y),u=Y.length,v=u-1,K=new Uint32Array(u+1);for(var x=0,M=0;M<u;++M){let FA=Y[M];if(FA!=null){var z=1/FA.cnt;n&&(FA.ac*=z),FA.rc*=z,FA.gc*=z,FA.bc*=z,Y[x++]=FA}}ag(I)/x<.022&&(R=!1);for(var M=0;M<x-1;++M)Y[M].fw=M+1,Y[M+1].bk=M,R&&(Y[M].cnt=Math.sqrt(Y[M].cnt));R&&(Y[M].cnt=Math.sqrt(Y[M].cnt));var j,QA,T;for(M=0;M<x;++M){di(Y,M);var wA=Y[M].err;for(QA=++K[0];QA>1&&(T=QA>>1,!(Y[j=K[T]].err<=wA));QA=T)K[QA]=j;K[QA]=M}var EA=x-I;for(M=0;M<EA;){for(var IA;;){var CA=K[1];if(IA=Y[CA],IA.tm>=IA.mtm&&Y[IA.nn].mtm<=IA.tm)break;IA.mtm==v?CA=K[1]=K[K[0]--]:(di(Y,CA),IA.tm=M);var wA=Y[CA].err;for(QA=1;(T=QA+QA)<=K[0]&&(T<K[0]&&Y[K[T]].err>Y[K[T+1]].err&&T++,!(wA<=Y[j=K[T]].err));QA=T)K[QA]=j;K[QA]=CA}var sA=Y[IA.nn],p=IA.cnt,AA=sA.cnt,z=1/(p+AA);n&&(IA.ac=z*(p*IA.ac+AA*sA.ac)),IA.rc=z*(p*IA.rc+AA*sA.rc),IA.gc=z*(p*IA.gc+AA*sA.gc),IA.bc=z*(p*IA.bc+AA*sA.bc),IA.cnt+=sA.cnt,IA.mtm=++M,Y[sA.bk].fw=sA.fw,Y[sA.fw].bk=sA.bk,sA.mtm=v}let iA=[];var YA=0;for(M=0;;++YA){let FA=Ag(Math.round(Y[M].rc),0,255),GA=Ag(Math.round(Y[M].gc),0,255),LA=Ag(Math.round(Y[M].bc),0,255),aA=255;n&&(aA=Ag(Math.round(Y[M].ac),0,255),H&&(aA=aA<=(typeof H=="number"?H:127)?0:255),D&&aA<=N&&(FA=GA=LA=U,aA=0));let XA=n?[FA,GA,LA,aA]:[FA,GA,LA];if(As(iA,XA)||iA.push(XA),(M=Y[M].fw)==0)break}return iA}function As(Q,I){for(let C=0;C<Q.length;C++){let y=Q[C],D=y[0]===I[0]&&y[1]===I[1]&&y[2]===I[2],U=y.length>=4&&I.length>=4?y[3]===I[3]:!0;if(D&&U)return!0}return!1}function Bs(Q,I,C="rgb565"){if(!Q||!Q.buffer)throw new Error("quantize() expected RGBA Uint8Array data");if(!(Q instanceof Uint8Array)&&!(Q instanceof Uint8ClampedArray))throw new Error("quantize() expected RGBA Uint8Array data");if(I.length>256)throw new Error("applyPalette() only works with 256 colors or less");let y=new Uint32Array(Q.buffer),D=y.length,U=C==="rgb444"?4096:65536,N=new Uint8Array(D),H=new Array(U);if(C==="rgba4444")for(let s=0;s<D;s++){let R=y[s],n=R>>24&255,Y=R>>16&255,u=R>>8&255,v=R&255,K=lD(v,u,Y,n),x=K in H?H[K]:H[K]=Qs(v,u,Y,n,I);N[s]=x}else{let s=C==="rgb444"?JD:MD;for(let R=0;R<D;R++){let n=y[R],Y=n>>16&255,u=n>>8&255,v=n&255,K=s(v,u,Y),x=K in H?H[K]:H[K]=Is(v,u,Y,I);N[R]=x}}return N}function Qs(Q,I,C,y,D){let U=0,N=1e100;for(let H=0;H<D.length;H++){let s=D[H],R=s[3],n=EQ(R-y);if(n>N)continue;let Y=s[0];if(n+=EQ(Y-Q),n>N)continue;let u=s[1];if(n+=EQ(u-I),n>N)continue;let v=s[2];n+=EQ(v-C),!(n>N)&&(N=n,U=H)}return U}function Is(Q,I,C,y){let D=0,U=1e100;for(let N=0;N<y.length;N++){let H=y[N],s=H[0],R=EQ(s-Q);if(R>U)continue;let n=H[1];if(R+=EQ(n-I),R>U)continue;let Y=H[2];R+=EQ(Y-C),!(R>U)&&(U=R,D=N)}return D}function EQ(Q){return Q*Q}function gs(Q={}){let{initialCapacity:I=4096,auto:C=!0}=Q,y=dD(I),D=5003,U=new Uint8Array(256),N=new Int32Array(D),H=new Int32Array(D),s=!1;return{reset(){y.reset(),s=!1},finish(){y.writeByte(zy.trailer)},bytes(){return y.bytes()},bytesView(){return y.bytesView()},get buffer(){return y.buffer},get stream(){return y},writeHeader:R,writeFrame(n,Y,u,v={}){let{transparent:K=!1,transparentIndex:x=0,delay:M=0,palette:z=null,repeat:j=0,colorDepth:QA=8,dispose:T=-1}=v,wA=!1;if(C?s||(wA=!0,R(),s=!0):wA=!!v.first,Y=Math.max(0,Math.floor(Y)),u=Math.max(0,Math.floor(u)),wA){if(!z)throw new Error("First frame must include a { palette } option");Cs(y,Y,u,z,QA),Mi(y,z),j>=0&&is(y,j)}let EA=Math.round(M/10);Es(y,T,EA,K,x);let IA=!!z&&!wA;Ds(y,Y,u,IA?z:null),IA&&Mi(y,z),os(y,n,Y,u,QA,U,N,H)}};function R(){VD(y,"GIF89a")}}function Es(Q,I,C,y,D){Q.writeByte(33),Q.writeByte(249),Q.writeByte(4),D<0&&(D=0,y=!1);var U,N;y?(U=1,N=2):(U=0,N=0),I>=0&&(N=I&7),N<<=2,Q.writeByte(0|N|0|U),uB(Q,C),Q.writeByte(D||0),Q.writeByte(0)}function Cs(Q,I,C,y,D=8){let U=1,N=0,H=FC(y.length)-1,s=U<<7|D-1<<4|N<<3|H;uB(Q,I),uB(Q,C),Q.writeBytes([s,0,0])}function is(Q,I){Q.writeByte(33),Q.writeByte(255),Q.writeByte(11),VD(Q,"NETSCAPE2.0"),Q.writeByte(3),Q.writeByte(1),uB(Q,I),Q.writeByte(0)}function Mi(Q,I){let C=1<<FC(I.length);for(let y=0;y<C;y++){let D=[0,0,0];y<I.length&&(D=I[y]),Q.writeByte(D[0]),Q.writeByte(D[1]),Q.writeByte(D[2])}}function Ds(Q,I,C,y){if(Q.writeByte(44),uB(Q,0),uB(Q,0),uB(Q,I),uB(Q,C),y){let D=0,U=0,N=FC(y.length)-1;Q.writeByte(128|D|U|0|N)}else Q.writeByte(0)}function os(Q,I,C,y,D=8,U,N,H){Py(C,y,I,D,Q,U,N,H)}function uB(Q,I){Q.writeByte(I&255),Q.writeByte(I>>8&255)}function VD(Q,I){for(var C=0;C<I.length;C++)Q.writeByte(I.charCodeAt(C))}function FC(Q){return Math.max(Math.ceil(Math.log2(Q)),1)}const VQ=class VQ extends jQ{constructor(I){super({...VQ.defaultOptions,...I})}async init(I){super.init(I),this.encoder=gs()}async start(){await super.start(),this.step()}encode(I){const C=$y(I,this.maxColors,this.quantizeOptions),y=Bs(I,C,this.quantizeOptions.format);this.encoder.writeFrame(y,this.width,this.height,{palette:C,delay:1/this.frameRate*1e3,...this.encoderOptions})}stop(){this.encoder.finish();const I=this.encoder.bytes();return this.encoder.reset(),I}dispose(){this.encoder=null}};fA(VQ,"supportedExtensions",["gif"]),fA(VQ,"defaultOptions",{extension:VQ.supportedExtensions[0],frameMethod:"imageData",maxColors:256,quantizeOptions:{format:"rgb565",oneBitAlpha:!1,clearAlpha:!0,clearAlphaThreshold:0,clearAlphaColor:0}});let JE=VQ;const gQ=class gQ extends jQ{constructor(I){super({...gQ.defaultOptions,...I})}async init(I){super.init(I),this.target==="file-system"&&(this.directory||(this.directory=await this.getDirectory()),this.directoryHandle=await this.getDirectoryHandle(this.directory,this.filename))}async writeFile(I,C){try{if(this.directoryHandle){const y=await this.getFileHandle(I),D=await this.getWritableFileStream(y);await D.write(C),await D.close()}else SD(I,[C],this.mimeType),await new Promise(y=>setTimeout(y,100))}catch(y){console.error(y)}}async encode(I,C){await this.writeFile(`${`${C}`.padStart(5,"0")}.${this.extension}`,I)}};fA(gQ,"supportedExtensions",["png","jpg"]),fA(gQ,"supportedTargets",["in-browser","file-system"]),fA(gQ,"defaultOptions",{extension:gQ.supportedExtensions[0],frameMethod:"blob"});let VE=gQ;const _A=Object.freeze({Ready:0,Initializing:1,Recording:2,Stopping:3,Stopped:4});var eB,_B;const KQ=class KQ{constructor(I,C={}){ei(this,eB);this.context=I;const y={...KQ.defaultOptions,...C};Object.assign(this,y),this.encoder||(this.extension==="gif"?this.encoder=new JE(y):["png","jpg"].includes(this.extension)?this.encoder=new VE(y):this.encoder=Zy?new ME(y):new lE(y)),qB(this,eB,_B).call(this,_A.Ready)}set width(I){this.encoder.width=I}set height(I){this.encoder.height=I}get width(){return this.context.drawingBufferWidth||this.context.canvas.width}get height(){return this.context.drawingBufferHeight||this.context.canvas.height}get stats(){if(this.status!==_A.Recording)return;const I=(Date.now()-this.startTime.getTime())/1e3,C=I/this.frame;return{renderTime:I,secondsPerFrame:C,detail:`Time: ${this.time.toFixed(2)} / ${this.duration.toFixed(2)}
Frame: ${this.frame} / ${this.frameTotal}
Elapsed Time: ${Si(I)}
Remaining Time: ${Si(C*this.frameTotal-I)}
Speedup: x${(this.time/I).toFixed(3)}`}}getParamString(){return`${this.width}x${this.height}@${this.frameRate}fps`}getDefaultFileName(I){return`${[this.name,vy(this.startTime),this.getParamString()].filter(Boolean).join("-")}.${I}`}getSupportedExtension(){const I=this.encoder.constructor,C=I.supportedExtensions.includes(this.extension),y=C?this.extension:I.supportedExtensions[0];return C||console.warn(`canvas-record: unsupported extension for encoder "${I.name}". Defaulting to "${y}".`),y}getSupportedTarget(){const I=this.encoder.constructor;let C=I.supportedTargets.includes(this.target);this.target==="file-system"&&!("showSaveFilePicker"in window)&&(C=!1);const y=C?this.target:I.supportedTargets[0];return C||console.warn(`canvas-record: unsupported target for encoder "${I.name}". Defaulting to "${y}".`),y}async init({filename:I}={}){qB(this,eB,_B).call(this,_A.Initializing),this.deltaTime=1/this.frameRate,this.time=0,this.frame=0,this.frameTotal=this.duration*this.frameRate;const C=this.getSupportedExtension(),y=this.getSupportedTarget();this.startTime=new Date,this.filename=I||this.getDefaultFileName(C),await this.encoder.init({encoderOptions:this.encoderOptions,muxerOptions:this.muxerOptions,canvas:this.context.canvas,width:this.width,height:this.height,frameRate:this.frameRate,extension:C,target:y,mimeType:KQ.mimeTypes[C],filename:this.filename,debug:this.debug}),qB(this,eB,_B).call(this,_A.Initialized)}async start(I={}){if(await this.init(I),this.status!==_A.Initialized){console.debug("canvas-record: recorder not initialized.");return}qB(this,eB,_B).call(this,_A.Recording),I.initOnly||await this.step()}async getFrame(I){switch(I){case"bitmap":return await createImageBitmap(this.context.canvas);case"videoFrame":return new VideoFrame(this.context.canvas,{timestamp:this.time*1e6});case"requestFrame":return;case"imageData":{if(this.context.drawingBufferWidth){const C=this.context.drawingBufferWidth,y=this.context.drawingBufferHeight,D=C*y*4,U=new Uint8Array(D),N=new Uint8Array(D);this.context.readPixels(0,0,C,y,this.context.RGBA,this.context.UNSIGNED_BYTE,U);const H=C*4,s=(y-1)*H;for(let R=0;R<D;R+=H)N.set(U.subarray(R,R+H),s-R);return N}return this.context.getImageData(0,0,ug(this.width,2),ug(this.height,2)).data}default:return await Eo(this.context.canvas,{useBlob:!0,download:!1,filename:`output.${this.encoder.extension}`})}}async step(){this.status===_A.Recording&&this.frame<this.frameTotal?(await this.encoder.encode(await this.getFrame(this.encoder.frameMethod),this.frame),this.time+=this.deltaTime,this.frame++):await this.stop()}async stop(){if(this.status!==_A.Recording)return;qB(this,eB,_B).call(this,_A.Stopping);const I=await this.encoder.stop();return this.download&&I&&SD(this.filename,Array.isArray(I)?I:[I],this.encoder.mimeType),qB(this,eB,_B).call(this,_A.Stopped),I}async dispose(){await this.encoder.dispose()}};eB=new WeakSet,_B=function(I){this.status=I,this.onStatusChange(this.status)},fA(KQ,"defaultOptions",{name:"",duration:10,frameRate:30,download:!0,extension:"mp4",target:"in-browser",onStatusChange:()=>{}}),fA(KQ,"mimeTypes",{mkv:"video/x-matroska;codecs=avc1",webm:"video/webm",mp4:"video/mp4",gif:"image/gif"});let KE=KQ;async function ys(Q,I,C,y){const D=Q.getContext("webgl2");let U=null,N=!1,H=0,s=60*10;const R=async n=>{if(C.recording&&(N=!0,y.render=1,C.recording=!1,C.progress=0,typeof VideoEncoder>"u")){alert("Looks like your user agent doesn't support VideoEncoder / WebCodecs API yet.");return}H>s&&(N=!1,console.log("RENDER END"),y.render=0),I(n),N&&U==null&&(console.log("Recording started"),U=new KE(D,{name:"thk",frameRate:60,duration:100,encoderOptions:{codec:kD({profile:"Main",level:"5.2"})},download:!1}),U.start({initOnly:!0}),H=0),!N&&U!=null&&(U.stop().then(Y=>{const u=[new File([Y],"thk-sync.mp4",{type:"video/mp4"})],v=document.getElementById("butt-download");v.onclick=()=>{navigator.share({files:u})},U=null,C.callback()}),y.render=0,H=0),C.progress=0,U!=null&&(U.status!==_A.Recording||(H>0&&await U.step(),H++,C.progress=H/s)),requestAnimationFrame(R)};return requestAnimationFrame(R),C}async function ss(){const Q={avaliable:!1,inside:!1,latitude:0,longitude:0};if(navigator.geolocation){Q.avaliable=!0,console.log("Geolocation avaliable");try{const I=await new Promise((s,R)=>{navigator.geolocation.getCurrentPosition(s,R)}),C=I.coords.latitude,y=I.coords.longitude;console.log(`Latitude: ${C}, Longitude: ${y}`);let D=YB.center_x,U=YB.center_y,N=YB.radius,H=Math.sqrt((C-D)*(C-D)+(y-U)*(y-U))<N;Q.inside=H,Q.latitude=C,Q.longitude=y,Q.inside?(console.log("Inside THK area"),document.getElementById("text-info").innerHTML="LOCATION: INSIDE"):(console.log("Outside THK area"),document.getElementById("text-info").innerHTML="LOCATION: OUTSIDE")}catch(I){console.error("Error retrieving location:",I),Q.avaliable=!1}}return Q}function Fs(){const Q=document.getElementById("canvas-ui"),I=Q.getContext("2d"),C=document.getElementById("canvas-thk"),y=document.getElementById("slider-color"),D=document.getElementById("slider-shape");function U(p,AA){OA.hijack1=!1}y.addEventListener("touchstart",p=>{U()}),D.addEventListener("touchstart",p=>{U()});function N(p){let AA=p.clientX,iA=p.clientY;p.touches&&(AA=p.touches[0].clientX,iA=p.touches[0].clientY);const YA=Q.getBoundingClientRect();return AA-=YA.left,iA-=YA.top,{x:AA,y:iA}}function H(p){let AA=0,iA=0;const YA=p.id;YA=="slider-color"?(AA=2,iA=0):YA=="slider-shape"&&(AA=3,iA=1);let FA=!1,GA=!1,LA=0,aA=0,XA=0,dA=Math.random()*100,hA=dA,zA=Math.random(),LB=zA;AA==1?(dA=.5,hA=.5):(dA=Math.random()*100,hA=dA);const d="val"+(AA+1)+"a";ZA[d]=hA;const jA="val"+(AA+1)+"b";ZA[jA]=zA,Q.getBoundingClientRect();let VA=p.getBoundingClientRect().left,KA=p.getBoundingClientRect().top;function PQ(QB){QB.preventDefault(),FA=!0,mB(QB)}function RB(QB){FA&&(QB.preventDefault(),FA=!1)}function mB(QB){if(!FA)return;const yQ=N(QB);LA=yQ.x,aA=yQ.y}function mg(){let QB=window.getComputedStyle(p).opacity;if(VA=p.getBoundingClientRect().left+p.clientWidth/2,KA=p.getBoundingClientRect().top+p.clientHeight/2,GA=FA,OA.hijack1){GA=!0;let tA=parseFloat(OA.x1);iA&&(tA=-tA),tA=(tA*.25-.5)*Math.PI;let xA=parseFloat(OA.y1);LA=VA+Math.cos(tA)*(xA+.001),aA=KA+Math.sin(tA)*(xA+.001)}let yQ=C.width,nB=Math.sqrt((LA-VA)*(LA-VA)+(aA-KA)*(aA-KA)),_Q=nB/yQ,sQ=(LA-VA)/nB,kB=(aA-KA)/nB,$Q=Math.atan2(kB,sQ),UB=$Q-XA;UB>Math.PI&&(UB-=Math.PI*2),UB<-Math.PI&&(UB+=Math.PI*2),UB*=Math.pow(_Q,1.3)*3,GA&&(hA+=UB,LB=Math.min(Math.max(0,_Q),1)),XA=$Q;let KI=hA*2,fI=KI-Math.min(1,LB)*Math.PI*.9,bg=KI+Math.min(1,LB)*Math.PI*.9,FQ=p.clientWidth/2,SB=FQ*.1,IB=FQ-SB/2+12,gB=IB*.75,MA=QB;I.lineWidth=SB,I.lineCap="round",I.strokeStyle="rgba(255, 255, 255, "+.6*MA+")",I.beginPath(),I.arc(VA,KA,IB,fI,bg),I.stroke(),I.lineWidth=1,I.strokeStyle="rgba(255, 255, 255, "+.2*MA+")",I.beginPath(),I.arc(VA,KA,IB+SB/2,0,Math.PI*2),I.stroke();let bB=.05,uI=.05;function cQ(tA,xA,UQ){return tA+(xA-tA)*UQ}const RA="val"+(AA+1)+"a",rB="val"+(AA+1)+"b";ZA[RA]=cQ(ZA[RA],hA,bB),ZA[rB]=cQ(ZA[rB],LB,uI),AA==1&&(ZA.speed=ZA[RA]),GA?(I.strokeStyle="rgba(255, 255, 255, "+.3*MA+")",I.beginPath(),I.arc(VA,KA,Math.max(nB,IB+SB/2),0,2*Math.PI),I.stroke(),I.strokeStyle="rgba(255, 255, 255, "+.3*MA+")",I.beginPath(),I.moveTo(VA+sQ*IB,KA+kB*IB),I.lineTo(VA+sQ*nB,KA+kB*nB),I.stroke(),I.strokeStyle="rgba(255, 255, 255, "+.15*MA+")",I.beginPath(),I.arc(LA,aA,gB,0,2*Math.PI),I.globalCompositeOperation="destination-out",I.fillStyle="rgba(0, 0, 0, 1)",I.fill(),I.globalCompositeOperation="source-over",I.fillStyle="rgba(255, 255, 255, "+.1*MA+")",I.beginPath(),I.arc(LA,aA,gB,0,2*Math.PI),I.fill(),I.strokeStyle="rgba(255, 255, 255, "+.33*MA+")",I.lineWidth=2,I.beginPath(),I.arc(LA,aA,gB,0,2*Math.PI),I.stroke()):(I.beginPath(),I.arc(VA,KA,gB,0,2*Math.PI),I.globalCompositeOperation="destination-out",I.fillStyle="rgba(0, 0, 0, 1)",I.fill(),I.globalCompositeOperation="source-over",I.fillStyle="rgba(255, 255, 255, "+.1*MA+")",I.beginPath(),I.arc(VA,KA,gB,0,2*Math.PI),I.fill(),I.strokeStyle="rgba(255, 255, 255, "+.25*MA+")",I.lineWidth=2,I.beginPath(),I.arc(VA,KA,gB,0,2*Math.PI),I.stroke())}return p.addEventListener("mousedown",PQ,!1),p.addEventListener("mousemove",mB,!1),p.addEventListener("mouseup",RB,!1),Q.addEventListener("mousemove",mB,!1),Q.addEventListener("mouseup",RB,!1),p.addEventListener("touchstart",PQ,!1),p.addEventListener("touchmove",mB,!1),p.addEventListener("touchend",RB,!1),p.addEventListener("touchcancel",RB,!1),Q.addEventListener("touchmove",mB,!1),Q.addEventListener("touchend",RB,!1),Q.addEventListener("touchcancel",RB,!1),mg}const s=H(y),R=H(D);let n=!1,Y=0,u=0,v=0,K=0,x=0,M=0,z=.01;function j(p,AA,iA){return p+(AA-p)*iA}function QA(p){p.preventDefault(),n=!0;let AA=N(p);v=AA.x,K=AA.y,Y=v,u=K,wA(p)}function T(p){n&&(p.preventDefault(),n=!1)}function wA(p){if(!n)return;p.preventDefault();const AA=N(p);v=AA.x,K=AA.y}Q.addEventListener("mousedown",QA,!1),Q.addEventListener("mousemove",wA,!1),Q.addEventListener("mouseup",T,!1),Q.addEventListener("touchstart",QA,!1),Q.addEventListener("touchmove",wA,!1),Q.addEventListener("touchend",T,!1),Q.addEventListener("touchcancel",T,!1);const EA=document.getElementById("onb-arrow");let IA=EA.getBoundingClientRect().top,CA=0;function sA(){const p=C.clientWidth,AA=C.clientHeight;(p!==Q.width||AA!==Q.height)&&(Q.width=p,Q.height=AA);let iA=EA.getBoundingClientRect().top;CA=IA-iA,IA=iA,OA.hijack_arrow&&(M=-CA/Q.height*.66*window.getComputedStyle(EA).opacity),I.clearRect(0,0,Q.width,Q.height);let YA=0;I.fillStyle=I.fillStyle="rgba(0, 0, 0, "+YA*.5+")",I.fillRect(0,0,Q.width,Q.height),s(),R();let FA=0,GA=0;if(n){FA=v-Y,GA=K-u;let aA=Q.height;FA=FA/aA,GA=GA/aA,x=j(x,FA,1),M=j(M,GA*.2,.5)}else x=j(x,0,z),M=j(M,0,z);ZA.tx+=x,ZA.ty+=M,Y=v,u=K;let LA=eg.progress;I.fillStyle="rgba(255, 255, 255, "+.5+")",I.fillRect(0,Q.height-8,Q.width*LA,8)}return sA}function sB(Q){Q.style.pointerEvents="all",Q.style.opacity="1"}function uA(Q){Q.style.pointerEvents="none",Q.style.opacity="0"}function li(Q){Q.style.opacity="1"}function fE(Q){Q.style.opacity="0"}function cs(Q){let I=.66,C=10;Q.style.transform=`translateY(-${C}%) scale(${I}) `,Q.style.border="1px solid #666"}function KD(Q){let I=1,C=0;Q.style.transform=`translateY(-${C}%) scale(${I}) `,Q.style.border="1px solid #000"}function cC(){const Q=document.getElementById("canvas-thk"),I=document.getElementById("butt-info"),C=document.getElementById("butt-save"),y=document.getElementById("butt-sync"),D=document.getElementById("butt-continue"),U=document.getElementById("butt-download"),N=document.getElementById("onb-butt"),H=document.getElementById("textbox-onb"),s=document.getElementById("slider-color"),R=document.getElementById("slider-shape"),n=document.getElementById("onb-fade");YB.show_time=null,document.getElementById("timer_text").style.opacity=0,uA(N),fE(H),uA(D),uA(U),sB(I),sB(C),sB(y),sB(s),sB(R),fE(n),KD(Q)}function Us(Q){const I=document.getElementById("canvas-thk"),C=document.getElementById("butt-info"),y=document.getElementById("butt-save"),D=document.getElementById("butt-sync"),U=document.getElementById("slider-color"),N=document.getElementById("slider-shape"),H=document.getElementById("onb-fade");uA(C),uA(y),uA(D),uA(U),uA(N),fE(H),cs(I)}function ws(){const Q=document.getElementById("canvas-thk"),I=document.getElementById("butt-info"),C=document.getElementById("butt-save"),y=document.getElementById("butt-sync"),D=document.getElementById("butt-continue"),U=document.getElementById("butt-download"),N=document.getElementById("onb-butt"),H=document.getElementById("textbox-onb"),s=document.getElementById("slider-color"),R=document.getElementById("slider-shape"),n=document.getElementById("onb-fade");YB.show_time=null,document.getElementById("timer_text").style.opacity=0,sB(N),li(H),uA(D),uA(U),uA(I),uA(C),uA(y),uA(s),uA(R),li(n),KD(Q)}function Ns(){const Q=document.getElementById("butt-continue"),I=document.getElementById("butt-download");sB(Q),sB(I)}function ts(){let Q=YB.show_time,I=document.getElementById("timer_text"),C="";if(Q!=null){let y=new Date().getTime(),D=Q-y,U=YB.show_len;if(D>0){I.style.opacity=.75;let N=Math.floor(D/6e4),H=Math.floor(D%6e4/1e3);N.toString(),H.toString(),N<1?C=`Your entity will be displayed in THK tower in ${H}s`:C=`Your entity will be displayed in THK tower in ${N}m ${H}s`}else D>-U?(C="Your entity is being displayed now",I.style.opacity=1):(C="Your entity has been displayed",I.style.opacity=.5)}I.innerHTML=C}function oE(Q){const I=document.getElementById("onb-butt");I.innerHTML=Q}const Hs="TUTORIAL",Gs="NEXT",as="START";function es(){document.getElementById("onb-fade"),document.getElementById("butt-info"),document.getElementById("butt-save"),document.getElementById("butt-sync");const Q=document.getElementById("onb-header"),I=document.getElementById("onb-body"),C=document.getElementById("onb-butt"),y="THK SYNC",D="CREATE THK DESIGN AND SEND IT TO THK TOWER",U="CREATE",N="DRAG & ROTATE CONTROLS TO ADJUST SHAPE & COLOR",H="EXPLORE",s="SCROLL TO FIND THE DESIGN THAT RESONATES WITH YOU",R="SEND",n="CLICK 'SYNC' AND WATCH YOUR DESIGN ON THE TOWER. DON'T FORGET TO FILM AND SHARE";let Y=0;function u(j){switch(j){case 0:Q.innerHTML=y,Q.innerHTML=Q.textContent.replace(/\S/g,"<span class='letter'>$&</span>"),I.innerHTML=D,I.innerHTML=I.textContent.replace(/\S/g,"<span class='letter'>$&</span>");break;case 1:Q.innerHTML=U,Q.innerHTML=Q.textContent.replace(/\S/g,"<span class='letter'>$&</span>"),I.innerHTML=N,I.innerHTML=I.textContent.replace(/\S/g,"<span class='letter'>$&</span>");break;case 2:Q.innerHTML=H,Q.innerHTML=Q.textContent.replace(/\S/g,"<span class='letter'>$&</span>"),I.innerHTML=s,I.innerHTML=I.textContent.replace(/\S/g,"<span class='letter'>$&</span>");break;case 3:Q.innerHTML=R,Q.innerHTML=Q.textContent.replace(/\S/g,"<span class='letter'>$&</span>"),I.innerHTML=n,I.innerHTML=I.textContent.replace(/\S/g,"<span class='letter'>$&</span>");break}}function v(){cC()}let K=anime({targets:OA,y1:[0,200],easing:"easeInOutQuad",duration:1e3,delay:200}),x=anime({loop:!0,direction:"alternate",targets:OA,x1:[0,1],y1:[200,150],easing:"easeInOutSine",duration:1e3,delay:0});function M(){if(console.log("next page",Y),Y==0&&oE(Hs),Y>0&&Y<3&&oE(Gs),Y==3&&oE(as),Y>3)v();else{if(u(Y),Y==1){let j=document.getElementById("slider-color"),QA=document.getElementById("slider-shape");sB(j),sB(QA),OA.hijack1=!0,OA.y1=0,OA.x1=0,K.play(),setTimeout(()=>{x.play()},1200)}else OA.hijack1=!1,K.restart(),x.restart(),K.pause(),x.pause();if(Y==2){const j=document.getElementById("onb-arrow");j.style.opacity="0.5",OA.hijack_arrow=!0,anime.timeline({loop:!0,direction:"alternate"}).add({targets:"#onb-arrow",translateY:[-100,100],easing:"easeInOutSine",duration:1e3,delay:0})}else{const j=document.getElementById("onb-arrow");j.style.opacity="0.0",OA.hijack_arrow=!1}document.querySelectorAll(".letter").forEach(j=>{j.style.opacity="0"}),anime.timeline({loop:!1}).add({targets:"#onb-header .letter",opacity:[0,1],easing:"easeInOutQuad",duration:100,delay:(j,QA)=>50*(QA+1)}).add({targets:"#onb-body .letter",opacity:[0,1],easing:"easeInOutQuad",duration:100,delay:(j,QA)=>30*(QA+1)})}Y+=1}function z(){Y=0,ws(),M(),anime({targets:"#onb-butt",opacity:[0,1],easing:"easeInOutQuad",duration:1e3,delay:500})}return C.addEventListener("click",function(){M()}),z}const hs=es();ss();const fD=document.getElementById("canvas-thk"),Ys=document.getElementById("butt-sync");Ys.addEventListener("click",function(){fetch("https://sterling-engaging-whippet.ngrok-free.app",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(ZA)}).then(I=>I.json()).then(I=>{console.log("Success:",I);let C=I.time*1e3,y=I.length*1e3;YB.show_time=C,YB.show_len=y,uE()}).catch(I=>{console.error("Error:",I),uE()})});const Ls=Fs();function Rs(){Ls(),ts()}const ns=Ao(fD,ZA,Rs);ys(fD,ns,eg,ZA);const ks=document.getElementById("butt-save");ks.addEventListener("click",function(){uE()});const Ss=document.getElementById("butt-info");Ss.addEventListener("click",function(){hs()});const rs=document.getElementById("butt-continue");rs.addEventListener("click",function(){cC()});function ds(){Ns()}function uE(){eg.recording=!0,eg.callback=ds,Us()}cC();