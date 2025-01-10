(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const a of n)if(a.type==="childList")for(const s of a.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function d(n){const a={};return n.integrity&&(a.integrity=n.integrity),n.referrerPolicy&&(a.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?a.credentials="include":n.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(n){if(n.ep)return;n.ep=!0;const a=d(n);fetch(n.href,a)}})();const T={restrict_loc:!0,center_x:-8.630436666894104,center_y:115.09447416252982,radius:.016,server:"https://sterling-engaging-whippet.ngrok-free.app",dev_send:!1,show_len:3e3,show_time:null},fe={recording:!1,progress:0,callback:null},f={seed:0,speed:1,val1:Math.random()*100,val2:Math.random()*100,tx:Math.random()*100,ty:Math.random()*100,val1a:0,val1b:0,val2a:0,val2b:0,val3a:Math.random()*100,val3b:Math.random(),val4a:Math.random()*100,val4b:Math.random(),render:0},Me={u_General:0,u_Offsety:0,u_Celltop:.1899999976158142,u_Cellbottom:1.309999942779541,u_Cellspeed:.15000000596046448,u_Speed:1,u_Splitsize:16,u_Color:0,u_Colorgain:1.0700000524520874,u_Pattern:0,u_Patternscale:8,u_Patternpow:0,u_Patterngain:0,u_Patternevery:1,u_Patternstrength:.5080000162124634,u_Signalstrength:1,u_Signalsize:.15199999511241913,u_Displacepos:0,u_Displacegamma:3.2799999713897705,u_Displacex:1,u_Wposscalex:4,u_Wposscaley:4,u_Wposscalez:4,u_Wposspeedx:0,u_Wposspeedy:0,u_Wposspeedz:0,u_Wpospxx:-.4000000059604645,u_Wpospxy:0,u_Wpospxz:0,u_Wpospyx:4,u_Wpospyy:0,u_Wpospyz:0,u_Wpospzx:0,u_Wpospzy:0,u_Wpospzz:0,u_Noisepos:0,u_Nposscalex:4,u_Nposscaley:4,u_Nposscalez:4,u_Nposspeedx:0,u_Nposspeedy:0,u_Nposspeedz:0,u_Nposwfx:.20000000298023224,u_Nposwfy:0,u_Nposwfz:0,u_Nposwwx:0,u_Nposwwy:.6000000238418579,u_Nposwwz:0,u_Nposwyx:-.8999999761581421,u_Nposwyy:0,u_Nposwyz:0,u_Npospxx:-.30000001192092896,u_Npospxy:0,u_Npospxz:0,u_Npospyx:0,u_Npospyy:0,u_Npospyz:0,u_Npospzx:0,u_Npospzy:0,u_Npospzz:.10000000149011612,u_Shownoisepos:0,u_Channels:0,u_Channelwidth:2,u_Channelsymmetry:1,u_Channelspread:1,u_Channelshrinkjoint:0,u_Points:0,u_Pointweight:17.5,u_Pointfade:.6499999761581421,u_Pointweightvariation:0,u_Pointjointwidth:.5,u_Pointweighttop:1,u_Pointweightbottom:1},P={hijack1:!1,x1:0,y1:0,hijack_arrow:!1},Le=(o,e,d)=>{let i=[o.width,o.height];const n=o.getContext("webgl2",{antialias:!0});n||alert("Please use browser with WebGL2 support");var a=n.getExtension("EXT_color_buffer_float");a||alert("Please use browser with Floating Point support");const s=`
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
    `,u=`#version 300 es
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
	Seg Clone_0 = seg_even(float(int(point)), float(int(npoints)), float(int(5)));
	Seg Clone_1 = seg_even(float(int(Clone_0.point)), float(int(Clone_0.npoints)), float(int(3)));
	Seg Clone_2 = seg_even(float(int(Clone_1.point)), float(int(Clone_1.npoints)), float(int(9)));
	Seg Clone_3 = seg_even(float(int(Clone_2.point)), float(int(Clone_2.npoints)), float(int(3)));
	Seg Clone_4 = seg_even(float(int(Clone_3.point)), float(int(Clone_3.npoints)), float(int(1)));
	Seg Clone_5 = seg_even(float(int(Clone_4.point)), float(int(Clone_4.npoints)), float(int(712)));
	

	// Main Code Defs
	vec3 node7 = vec3(0.0, 0.0, 0.0);
	float node23 = float(Clone_0.idx);
	float node385 = gain(1.0, 2.0);
	float node397 = float((Clone_5.idx + fract(0.0)));
	bool node393 = (Clone_5.size > 1.0);
	float node392_out0;
	if (node393) {
		node392_out0 = (node397 / Clone_5.size);
	} else {
		node392_out0 = fract((node397 + 0.5));
	}
	float node390 = (node392_out0 * 17.0);
	float node389 = floor(node390);
	float node217 = (u_off * 0.1);
	vec2 node297 = vec2(node217, 40.0);
	float node288 = mix(3.0, 8.0, ((ns_simplex2((vec2(node297.x, node297.y) / 1.5)) * 0.5) + 0.5));
	float node327 = (u_val4a * 0.5);
	float node325 = ((node327 * 0.1) * 0.25);
	vec2 node323 = vec2((node325 * (1.0 + ns_rand1(64.728))), 64.728);
	float node314 = mix(3.0, 8.0, gain(pow(((ns_simplex2((vec2(node323.x, node323.y) / 1.5)) * 0.5) + 0.5), 1.0), 0.5));
	float node68 = (u_off * 0.5);
	float node66 = fract((node68 * 16.0));
	float node210 = (node68 * 0.25);
	float node211 = (1.0 + ns_rand1(43.152));
	vec2 node208 = vec2((node210 * node211), 43.152);
	float node199 = (2.0 + (gain(((ns_simplex2((vec2(node208.x, node208.y) / 1.5)) * 0.5) + 0.5), 1.0) * 5.0));
	float node246 = (1.0 - mod(node23, 2.0));
	float node238 = clamp((10.0 - (((float(Clone_1.idx) * 2.0) + 7.0) - node246)), 0.0, 10.0);
	float node333 = (node238 * 0.05);
	float node256 = float(Clone_2.idx);
	bool node252 = (Clone_2.size > 1.0);
	float node251_out0;
	if (node252) {
		node251_out0 = (node256 / (Clone_2.size - 1.0));
	} else {
		node251_out0 = 0.5;
	}
	bool node338 = ((Clone_2.idx == 0.0) || (Clone_2.idx == 8.0));
	bool node347 = (Clone_0.idx == 2.0);
	float node1737_out0;
	if ((node338 || node347)) {
		node1737_out0 = (1.0 - parabola(node251_out0, 2.0));
	}
	float node337_out0;
	if (node338) {
		node337_out0 = node1737_out0;
	} else {
		float node346_out0;
		if (node347) {
			node346_out0 = node1737_out0;
		} else {
			bool node351 = (Clone_0.idx < 3.0);
			float node350_out0;
			if (node351) {
				node350_out0 = (1.0 - node251_out0);
			} else {
				node350_out0 = node251_out0;
			}
			node346_out0 = node350_out0;
		}
		node337_out0 = node346_out0;
	}
	float node365 = ((node327 * 0.2) * 0.25);
	vec2 node363 = vec2((node365 * (1.0 + ns_rand1(69.0432))), 69.0432);
	float node335 = (node337_out0 * gain(pow(((ns_simplex2((vec2(node363.x, node363.y) / 1.5)) * 0.5) + 0.5), 1.0), 0.5));
	float node84 = (0.14287755393627663 - ((0.28575510787255326 * cos(1.5707963267948966)) / 6.283185307179586));
	float node220 = ((Clone_0.idx + 0.5) / 5.0);
	float node233 = (1.0 + ns_rand1(47.4672));
	vec2 node231 = vec2((node210 * node233), 47.4672);
	float node218 = ((node220 * n11(gain(((ns_simplex2((vec2(node231.x, node231.y) / 1.5)) * 0.5) + 0.5), 1.0))) * 0.5);
	vec2 node383 = vec2(node327, 40.0);
	float node376 = mix(3.0, 8.0, ((ns_simplex2((vec2(node383.x, node383.y) / 1.5)) * 0.5) + 0.5));
	float node104 = (0.21424489212744674 + node84);
	float node237 = (node238 / 10.0);
	float node268 = (1.0 + ns_rand1(51.782399999999996));
	vec2 node266 = vec2((node210 * node268), 51.782399999999996);
	float node248 = ((node251_out0 * gain(((ns_simplex2((vec2(node266.x, node266.y) / 1.5)) * 0.5) + 0.5), 1.0)) + node217);
	float node56 = 0.0;
	float node406 = 0.0;
	float node409 = 0.0;
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
		vec3 node192 = vec3(((((node197 * node199) + node217) + node218) + node237), node248, 0.0);
		vec3 node190 = vec3(node192.x, node192.y, node192.z);
		float node189 = node190.x;
		float node274 = node190.y;
		float node275 = node190.z;
		vec3 node311 = vec3(((node197 * node314) + node333), node335, node327);
		vec3 node309 = vec3(node311.x, node311.y, node311.z);
		float node55 = (node56 + ((node60_out0 - node128_out0) * mix(pow((0.01 + ((((((gain(((ns_simplex3((vec3(node189, node274, node275) / 1.5)) * 0.5) + 0.5), 2.0) * 2.0) - 1.0) + (((gain(((ns_simplex3((vec3((node189 * 2.0), (node274 * 2.0), (node275 * 2.0)) / 1.5)) * 0.5) + 0.5), 2.0) * 2.0) - 1.0) * 0.5)) / 1.5) * 0.5) + 0.5)), node288), pow((0.001 + ((ns_simplex3((vec3(node309.x, node309.y, node309.z) / 1.5)) * 0.5) + 0.5)), node376), node385)));
		bool node388 = (node65 == node389);
		bool node405 = (!node388);
		float node387_out0;
		if (node388) {
			node387_out0 = node56;
		} else {
			node387_out0 = node406;
		}
		float node408_out0;
		if (node388) {
			node408_out0 = node55;
		} else {
			node408_out0 = node409;
		}
		node56 = node55;
		node406 = node387_out0;
		node409 = node408_out0;
	}
	float node427 = (node68 * 0.3);
	vec2 node426 = vec2(node427, 21.0);
	vec2 node440 = vec2((node327 * 0.3), 31.0);
	float node49 = mix((node406 / node56), (node409 / node56), pow(fract(node390), pow(2.0, mix(((gain(((ns_simplex2((vec2(node426.x, node426.y) / 1.5)) * 0.5) + 0.5), 0.5) * 2.0) - 1.0), ((gain(((ns_simplex2((vec2(node440.x, node440.y) / 1.5)) * 0.5) + 0.5), 0.5) * 2.0) - 1.0), 1.0))));
	float node38 = mod(Clone_0.idx, 2.0);
	float node446 = min(float((Clone_1.idx == 2.0)), float((node38 == 1.0)));
	float node48 = mix(node49, clamp(pow(node49, 3.0), 0.0, 1.0), node446);
	float node43 = ((((Clone_1.idx + node48) / 3.0) * 3.0) - 2.5);
	bool node37 = (node38 > 0.5);
	float node36_out0;
	if (node37) {
		node36_out0 = clamp(node43, -10.0, 0.0);
	} else {
		node36_out0 = node43;
	}
	float node464 = (node43 + (node38 * 0.5));
	float node463 = clamp(node464, -10.0, 0.5);
	vec4 node14 = vec4(n01((((((n11((node23 / 4.0)) + ((mix(0.1, 0.9, n01(cos(((node36_out0 * 3.141592653589793) * 2.0)))) * n11((node256 / 8.0))) / 2.0)) * 0.5249999999999999) * mix(1.0, 0.95, cos(((((node463 * 1.5) - 0.1) * 3.141592653589793) * 2.0)))) * mix(1.0, 0.83, cos(((((node463 * 0.25) + 0.15) * 3.141592653589793) * 2.0)))) * mix(0.9, 1.0, node464))), n01((n11(((node464 * 0.35) + 0.53)) * 1.5)), 0.0, 0.0);
	vec2 node12 = vec2(node14.x, node14.y);
	vec3 node6 = (node7 + vec3(n11(node12.x), n11(node12.y), 0.0));
	float node517 = (fract(node392_out0) * 17.0);
	float node516 = fract(node517);
	float node515 = fract(node516);
	float node775 = floor(node517);
	float node681 = (1.0 + ns_rand1(0.0));
	vec2 node679 = vec2((node210 * node681), 0.0);
	float node670 = (2.0 + (gain(((ns_simplex2((vec2(node679.x, node679.y) / 1.5)) * 0.5) + 0.5), 1.0) * 5.0));
	float node696 = (1.0 + ns_rand1(4.3152));
	vec2 node694 = vec2((node210 * node696), 4.3152);
	float node684 = ((node220 * n11(gain(((ns_simplex2((vec2(node694.x, node694.y) / 1.5)) * 0.5) + 0.5), 1.0))) * 0.5);
	vec2 node709 = vec2((node210 * (1.0 + ns_rand1(8.6304))), 8.6304);
	float node700 = ((node251_out0 * gain(((ns_simplex2((vec2(node709.x, node709.y) / 1.5)) * 0.5) + 0.5), 1.0)) + node217);
	vec2 node753 = vec2((node325 * node681), 0.0);
	float node744 = mix(3.0, 8.0, gain(pow(((ns_simplex2((vec2(node753.x, node753.y) / 1.5)) * 0.5) + 0.5), 1.0), 0.5));
	vec2 node765 = vec2((node365 * node696), 4.3152);
	float node756 = (node337_out0 * gain(pow(((ns_simplex2((vec2(node765.x, node765.y) / 1.5)) * 0.5) + 0.5), 1.0), 0.5));
	float node550 = 0.0;
	float node777 = 0.0;
	float node780 = 0.0;
	for (int node548 = 0; node548 < int(16.0); node548++) {
		float node559 = float(node548);
		float node556 = clamp(((node559 + node66) / 15.0), 0.0, 1.0);
		bool node555 = (node556 < 0.5);
		float node554_out0;
		if (node555) {
			bool node565 = (node556 > 0.28575510787255326);
			float node564_out0;
			if (node565) {
				node564_out0 = ((node556 - 0.28575510787255326) + node84);
			} else {
				float node571 = ((node556 / 0.28575510787255326) / 2.0);
				node564_out0 = ((0.28575510787255326 * node571) - ((0.28575510787255326 * cos((((node571 - 0.25) * 3.141592653589793) * 2.0))) / 6.283185307179586));
			}
			node554_out0 = ((node564_out0 / node104) / 2.0);
		} else {
			float node585 = (1.0 - node556);
			bool node584 = (node585 > 0.28575510787255326);
			float node583_out0;
			if (node584) {
				node583_out0 = ((node585 - 0.28575510787255326) + node84);
			} else {
				float node591 = ((node585 / 0.28575510787255326) / 2.0);
				node583_out0 = ((0.28575510787255326 * node591) - ((0.28575510787255326 * cos((((node591 - 0.25) * 3.141592653589793) * 2.0))) / 6.283185307179586));
			}
			node554_out0 = (1.0 - ((node583_out0 / node104) / 2.0));
		}
		float node602 = clamp((((node559 - 1.0) + node66) / 15.0), 0.0, 1.0);
		bool node601 = (node602 < 0.5);
		float node600_out0;
		if (node601) {
			bool node611 = (node602 > 0.28575510787255326);
			float node610_out0;
			if (node611) {
				node610_out0 = ((node602 - 0.28575510787255326) + node84);
			} else {
				float node617 = ((node602 / 0.28575510787255326) / 2.0);
				node610_out0 = ((0.28575510787255326 * node617) - ((0.28575510787255326 * cos((((node617 - 0.25) * 3.141592653589793) * 2.0))) / 6.283185307179586));
			}
			node600_out0 = ((node610_out0 / node104) / 2.0);
		} else {
			float node631 = (1.0 - node602);
			bool node630 = (node631 > 0.28575510787255326);
			float node629_out0;
			if (node630) {
				node629_out0 = ((node631 - 0.28575510787255326) + node84);
			} else {
				float node637 = ((node631 / 0.28575510787255326) / 2.0);
				node629_out0 = ((0.28575510787255326 * node637) - ((0.28575510787255326 * cos((((node637 - 0.25) * 3.141592653589793) * 2.0))) / 6.283185307179586));
			}
			node600_out0 = (1.0 - ((node629_out0 / node104) / 2.0));
		}
		float node668 = ((node600_out0 + node554_out0) / 2.0);
		vec3 node663 = vec3(((((node668 * node670) + node217) + node684) + node237), node700, 0.0);
		vec3 node661 = vec3(node663.x, node663.y, node663.z);
		float node660 = node661.x;
		float node717 = node661.y;
		float node718 = node661.z;
		vec3 node741 = vec3(((node668 * node744) + node333), node756, node327);
		vec3 node739 = vec3(node741.x, node741.y, node741.z);
		float node549 = (node550 + ((node554_out0 - node600_out0) * mix(pow((0.01 + ((((((gain(((ns_simplex3((vec3(node660, node717, node718) / 1.5)) * 0.5) + 0.5), 2.0) * 2.0) - 1.0) + (((gain(((ns_simplex3((vec3((node660 * 2.0), (node717 * 2.0), (node718 * 2.0)) / 1.5)) * 0.5) + 0.5), 2.0) * 2.0) - 1.0) * 0.5)) / 1.5) * 0.5) + 0.5)), node288), pow((0.001 + ((ns_simplex3((vec3(node739.x, node739.y, node739.z) / 1.5)) * 0.5) + 0.5)), node376), node385)));
		bool node774 = (node559 == node775);
		bool node776 = (!node774);
		float node773_out0;
		if (node774) {
			node773_out0 = node550;
		} else {
			node773_out0 = node777;
		}
		float node779_out0;
		if (node774) {
			node779_out0 = node549;
		} else {
			node779_out0 = node780;
		}
		node550 = node549;
		node777 = node773_out0;
		node780 = node779_out0;
	}
	float node545 = (node777 / node550);
	float node782 = (node780 / node550);
	float node784 = pow(node516, 1.0);
	float node795 = (node327 * 0.25);
	float node796 = (1.0 + ns_rand1(21.576));
	vec2 node793 = vec2((node795 * node796), 21.576);
	float node818 = (1.0 + ns_rand1(25.891199999999998));
	vec2 node816 = vec2((node325 * node818), 25.891199999999998);
	float node824 = (node782 - node545);
	float node835 = (1.0 + ns_rand1(30.2064));
	vec2 node833 = vec2((node795 * node835), 30.2064);
	float node852 = (1.0 + ns_rand1(34.5216));
	vec2 node850 = vec2((node325 * node852), 34.5216);
	bool node863 = (Clone_0.size > 1.0);
	float node862_out0;
	if (node863) {
		node862_out0 = (node23 / (Clone_0.size - 1.0));
	} else {
		node862_out0 = 0.5;
	}
	float node878 = (1.0 + ns_rand1(17.2608));
	vec2 node876 = vec2((node795 * node878), 17.2608);
	float node892 = (1.0 + ns_rand1(38.8368));
	vec2 node890 = vec2((node325 * node892), 38.8368);
	vec2 node907 = vec2((node325 * node211), 43.152);
	vec2 node922 = vec2((node325 * node233), 47.4672);
	vec2 node935 = vec2((node365 * node268), 51.782399999999996);
	vec2 node957 = vec2((node795 * (1.0 + ns_rand1(56.0976))), 56.0976);
	vec3 node537 = ((vec3(((((mix(node545, node782, node784) * gain(pow(((ns_simplex2((vec2(node793.x, node793.y) / 1.5)) * 0.5) + 0.5), 1.0), 0.5)) * 2.0) + ((mod(floor((node775 + (node68 * 16.0))), 2.0) * gain(pow(gain(pow(((ns_simplex2((vec2(node816.x, node816.y) / 1.5)) * 0.5) + 0.5), 1.0), 0.5), 3.0), 2.0)) * 0.5)) + ((node516 * node824) * gain(pow(((ns_simplex2((vec2(node833.x, node833.y) / 1.5)) * 0.5) + 0.5), 1.0), 0.5))), (((node337_out0 * gain(pow(((ns_simplex2((vec2(node850.x, node850.y) / 1.5)) * 0.5) + 0.5), 1.0), 0.5)) - (((abs(n11(node862_out0)) * gain(pow(((ns_simplex2((vec2(node876.x, node876.y) / 1.5)) * 0.5) + 0.5), 1.0), 0.5)) * gain(pow(((ns_simplex2((vec2(node890.x, node890.y) / 1.5)) * 0.5) + 0.5), 1.0), 0.5)) * 4.0)) + (((1.0 - node246) * gain(pow(((ns_simplex2((vec2(node907.x, node907.y) / 1.5)) * 0.5) + 0.5), 1.0), 0.5)) * 2.0)), ((((node337_out0 * gain(pow(((ns_simplex2((vec2(node922.x, node922.y) / 1.5)) * 0.5) + 0.5), 1.0), 0.5)) * 0.5) + ((node824 * gain(pow(((ns_simplex2((vec2(node935.x, node935.y) / 1.5)) * 0.5) + 0.5), 1.0), 0.5)) * 0.5)) + (node238 * 0.2))) + (vec3(0.0, 0.0, ((sin(((((u_off * 4.0) + node333) * 3.141592653589793) * 2.0)) * 0.33) * gain(pow(((ns_simplex2((vec2(node957.x, node957.y) / 1.5)) * 0.5) + 0.5), 1.0), 0.5))) * 0.5)) * pow(2.0, n11(u_val4b)));
	vec3 node971 = vec3(node537.x, node537.y, node537.z);
	vec3 node536 = (node537 + (ns_simplex3((vec3(node971.x, node971.y, node971.z) / 1.5)) * u_val4b));
	float node535 = node536.y;
	float node526 = (fract(((node327 * 0.25) + (ns_simplex2((vec2(float(node535), 0.0) / 1.5)) * 0.25))) * 5.0);
	float node524 = mod(floor(node526), 5.0);
	bool node523 = (node524 == 0.0);
	bool node979 = (node524 == 1.0);
	bool node981 = (node524 == 2.0);
	bool node983 = (node524 == 3.0);
	bool node985 = (node524 == 4.0);
	float node522_out0;
	if (node523) {
		node522_out0 = 0.001;
	} else if (node979) {
		node522_out0 = 0.1;
	} else if (node981) {
		node522_out0 = 0.1;
	} else if (node983) {
		node522_out0 = 4.0;
	} else if (node985) {
		node522_out0 = 0.01;
	}
	float node990 = mod((node524 + 1.0), 5.0);
	bool node989 = (node990 == 0.0);
	bool node992 = (node990 == 1.0);
	bool node993 = (node990 == 2.0);
	bool node994 = (node990 == 3.0);
	bool node995 = (node990 == 4.0);
	float node988_out0;
	if (node989) {
		node988_out0 = 0.001;
	} else if (node992) {
		node988_out0 = 0.1;
	} else if (node993) {
		node988_out0 = 0.1;
	} else if (node994) {
		node988_out0 = 4.0;
	} else if (node995) {
		node988_out0 = 0.01;
	}
	float node996 = smoothstep(0.0, 1.0, fract(node526));
	float node1000_out0;
	if (node523) {
		node1000_out0 = 0.001;
	} else if (node979) {
		node1000_out0 = 0.1;
	} else if (node981) {
		node1000_out0 = 4.0;
	} else if (node983) {
		node1000_out0 = 0.2;
	} else if (node985) {
		node1000_out0 = 1.0;
	}
	float node1002_out0;
	if (node989) {
		node1002_out0 = 0.001;
	} else if (node992) {
		node1002_out0 = 0.1;
	} else if (node993) {
		node1002_out0 = 4.0;
	} else if (node994) {
		node1002_out0 = 0.2;
	} else if (node995) {
		node1002_out0 = 1.0;
	}
	float node511 = ((mix(pcurve(node515, 0.01, 0.01), pcurve(node515, mix(node522_out0, node988_out0, node996), mix(node1000_out0, node1002_out0, node996)), 1.0) * mix(0.5, 1.0, 1.0)) * 0.2);
	vec3 node509 = (node7 * vec3(node511, node511, node511));
	bool node491 = (Clone_2.idx < 4.0);
	bool node498 = (Clone_3.size > 1.0);
	float node497_out0;
	if (node498) {
		node497_out0 = (float(Clone_3.idx) / (Clone_3.size - 1.0));
	} else {
		node497_out0 = 0.5;
	}
	bool node490 = (node491 || ((Clone_2.idx == 4.0) && (node497_out0 > 0.5)));
	vec3 node489_out0;
	if (node490) {
		node489_out0 = vec3((node509.x * -1.0), node509.y, node509.z);
	} else {
		node489_out0 = node509;
	}
	float node1015 = ((node782 + node545) / 2.0);
	float node1012 = mix(u_Channelshrinkjoint, 1.0, parabola(node1015, 1.0));
	pos = ((((node6 + (((node489_out0 + vec3((n11(node497_out0) * node511), 0.0, 0.0)) * 0.04) * vec3(node1012, node1012, node1012))) * vec3(mix((0.5625 / (u_resx / u_resy)), 1.0, u_render), 1.0, 1.0)) * vec3(1.0, mix(1.0, 1.0, u_render), 1.0)) + vec3(0.0, mix(0.06, 0.0, u_render), 0.0));
	alpha = 1.0;
	float node1052 = (((1.0 - parabola(node497_out0, 0.25)) * 0.5) + 0.5);
	float node1045_out0;
	if (node491) {
		node1045_out0 = (1.0 - node497_out0);
	} else {
		bool node1050 = (Clone_2.idx != 4.0);
		float node1049_out0;
		if (node1050) {
			node1049_out0 = node497_out0;
		} else {
			node1049_out0 = node1052;
		}
		node1045_out0 = node1049_out0;
	}
	float node1043 = mix(node1045_out0, node1052, u_Channelsymmetry);
	weight = mix(1.0, 10.0, clamp(((0.5 * mix(0.5, 1.0, node511)) * (1.0 + ((1.0 - node1043) * 0.5))), 0.0, 1.0));
	bool node1062 = (((Clone_0.idx == 0.0) && node491) || ((Clone_0.idx == 4.0) && (Clone_2.idx > 4.0)));
	vec3 node1061_out0;
	if (node1062) {
		node1061_out0 = node7;
	} else {
		float node1098 = (node68 * 0.2);
		float node1117 = node6.y;
		vec2 node1125 = vec2((node210 * (1.0 + ns_rand1(12.945599999999999))), 12.945599999999999);
		vec2 node1143 = vec2((node210 * node878), 17.2608);
		vec2 node1156 = vec2((node210 * node796), 21.576);
		vec3 node1114 = vec3(((node1117 * gain(((ns_simplex2((vec2(node1125.x, node1125.y) / 1.5)) * 0.5) + 0.5), 1.0)) * 0.5), ((((node6.x * gain(((ns_simplex2((vec2(node1143.x, node1143.y) / 1.5)) * 0.5) + 0.5), 1.0)) * 3.0) + (node337_out0 * 2.0)) + ((node251_out0 * 2.0) * gain(((ns_simplex2((vec2(node1156.x, node1156.y) / 1.5)) * 0.5) + 0.5), 1.0))), ((node1043 * 0.3) + (parabola(node1015, 2.0) * 0.3)));
		vec2 node1180 = vec2((node210 * node818), 25.891199999999998);
		float node1171 = pow(2.0, n11(gain(((ns_simplex2((vec2(node1180.x, node1180.y) / 1.5)) * 0.5) + 0.5), 1.0)));
		vec3 node1168 = vec3((node1114.x * node1171), (node1114.y * node1171), ((node1114.z * node1171) + 10.0));
		vec2 node1197 = vec2((node210 * node835), 30.2064);
		vec2 node1210 = vec2((node210 * node852), 34.5216);
		float node1227 = mix(floor(pow(2.0, (((ns_simplex2((vec2(float((node427 + 15.0)), 0.0) / 1.5)) * 0.5) + 0.5) * 3.0))), pow(2.0, (((ns_simplex2((vec2(float(((u_val3a * 0.1) + 15.0)), 0.0) / 1.5)) * 0.5) + 0.5) * 3.0)), 1.0);
		float node1226 = (node784 * node1227);
		bool node1253 = (mod(float(floor(node1226)), 2.0) == 0.0);
		float node1252_out0;
		if (node1253) {
			node1252_out0 = 1.0;
		} else {
			node1252_out0 = 0.0;
		}
		float node1281 = (u_off * -1.0);
		float node1280 = (node1281 * 8.0);
		float node1214 = ((((gain(pow((1.0 - ((cos(((node1226 * 3.141592653589793) * 2.0)) * 0.5) + 0.5)), 1.0), 1.0) * mix(1.0, node1252_out0, mix(1.0, ((((gain(((ns_simplex2((vec2(float((u_val3a + 25.0)), 0.0) / 1.5)) * 0.5) + 0.5), 4.0) * 2.0) - 1.0) * 0.5) + 0.5), 1.0))) * (1.0 + parabola(clamp((fract(((node1280 + ns_rand1(node337_out0)) + node1015)) * node1227), 0.0, 1.0), 2.0))) * parabola(node497_out0, 1.2)) * parabola(node516, 1.0));
		vec3 node1111 = (((node1114 + (ns_simplex3((vec3(node1168.x, node1168.y, node1168.z) / 1.5)) * gain(((ns_simplex2((vec2(node1197.x, node1197.y) / 1.5)) * 0.5) + 0.5), 1.0))) * pow(2.0, (n11(gain(((ns_simplex2((vec2(node1210.x, node1210.y) / 1.5)) * 0.5) + 0.5), 1.0)) * 0.5))) + vec3(0.0, 0.0, node1214));
		vec3 node1286 = vec3((node1280 * 2.0), 0.0, node1281);
		vec3 node1110 = (node1111 + node1286);
		vec3 node1108 = vec3(node1110.x, node1110.y, node1110.z);
		float node1107 = node1108.x;
		float node1290 = node1108.y;
		float node1291 = node1108.z;
		vec3 node1101 = vec3(((ns_simplex3((vec3(node1107, node1290, node1291) / 1.5)) * 0.5) + 0.5), ((ns_simplex3((vec3(node1107, node1290, (node1291 + 33.333333333333336)) / 1.5)) * 0.5) + 0.5), ((ns_simplex3((vec3(node1107, node1290, (node1291 + 66.66666666666667)) / 1.5)) * 0.5) + 0.5));
		vec3 node1096 = vec3((node1098 + (node1101.x * 0.33)), pow(node1101.y, 2.0), pow(node1101.z, 2.0));
		float node1321 = node1096.z;
		bool node1326 = (node1321 < 0.5);
		float node1325_out0;
		if (node1326) {
			node1325_out0 = node1321;
		} else {
			node1325_out0 = (1.0 - node1321);
		}
		float node1320 = (node1321 + (node1096.y * node1325_out0));
		float node1336 = ((2.0 * node1321) - node1320);
		float node1092 = ((fract(node1096.x) * 360.0) / 60.0);
		float node1091 = floor(node1092);
		bool node1316 = (node1091 == 5.0);
		bool node1315 = (node1091 == 4.0);
		bool node1314 = (node1091 == 3.0);
		bool node1313 = (node1091 == 2.0);
		bool node1312 = (node1091 == 1.0);
		bool node1090 = (node1091 == 0.0);
		float node1734_out0;
		if ((node1316 || node1315 || node1314 || node1313 || node1312 || node1090)) {
			node1734_out0 = (node1320 - (((node1320 - node1321) * 2.0) * abs((mod(node1092, 2.0) - 1.0))));
		}
		vec3 node1089_out0;
		if (node1090) {
			node1089_out0 = vec3(node1320, node1734_out0, node1336);
		} else if (node1312) {
			node1089_out0 = vec3(node1734_out0, node1320, node1336);
		} else if (node1313) {
			node1089_out0 = vec3(node1336, node1320, node1734_out0);
		} else if (node1314) {
			node1089_out0 = vec3(node1336, node1734_out0, node1320);
		} else if (node1315) {
			node1089_out0 = vec3(node1734_out0, node1336, node1320);
		} else if (node1316) {
			node1089_out0 = vec3(node1320, node1336, node1734_out0);
		} else {
			node1089_out0 = vec3(node1336, node1336, node1336);
		}
		vec3 node1359 = vec3(node1111.x, node1111.y, (node1111.z + 300.0));
		float node1345 = gain((1.0 - pow(((((gain(((ns_simplex3((vec3(node1359.x, node1359.y, node1359.z) / 1.5)) * 0.5) + 0.5), 2.0) * 2.0) - 1.0) * 0.5) + 0.5), 1.0)), 1.7);
		vec2 node1403 = vec2((node210 * node892), 38.8368);
		vec3 node1392 = ((node1111 * pow(2.0, n11(gain(((ns_simplex2((vec2(node1403.x, node1403.y) / 1.5)) * 0.5) + 0.5), 1.0)))) + (node1286 * 0.5));
		vec3 node1390 = vec3(node1392.x, node1392.y, (node1392.z + 100.0));
		float node1389 = node1390.x;
		float node1411 = node1390.y;
		float node1412 = node1390.z;
		vec3 node1383 = vec3(((ns_simplex3((vec3(node1389, node1411, node1412) / 1.5)) * 0.5) + 0.5), ((ns_simplex3((vec3(node1389, node1411, (node1412 + 33.333333333333336)) / 1.5)) * 0.5) + 0.5), ((ns_simplex3((vec3(node1389, node1411, (node1412 + 66.66666666666667)) / 1.5)) * 0.5) + 0.5));
		vec3 node1377 = vec3(((node1098 + 0.4) + (node1383.x * 0.33)), pow(node1383.y, 3.0), pow(node1383.z, 3.0));
		float node1438 = node1377.z;
		bool node1443 = (node1438 < 0.5);
		float node1442_out0;
		if (node1443) {
			node1442_out0 = node1438;
		} else {
			node1442_out0 = (1.0 - node1438);
		}
		float node1437 = (node1438 + (node1377.y * node1442_out0));
		float node1453 = ((2.0 * node1438) - node1437);
		float node1373 = ((fract(node1377.x) * 360.0) / 60.0);
		float node1372 = floor(node1373);
		bool node1433 = (node1372 == 5.0);
		bool node1432 = (node1372 == 4.0);
		bool node1431 = (node1372 == 3.0);
		bool node1430 = (node1372 == 2.0);
		bool node1429 = (node1372 == 1.0);
		bool node1371 = (node1372 == 0.0);
		float node1731_out0;
		if ((node1433 || node1432 || node1431 || node1430 || node1429 || node1371)) {
			node1731_out0 = (node1437 - (((node1437 - node1438) * 2.0) * abs((mod(node1373, 2.0) - 1.0))));
		}
		vec3 node1370_out0;
		if (node1371) {
			node1370_out0 = vec3(node1437, node1731_out0, node1453);
		} else if (node1429) {
			node1370_out0 = vec3(node1731_out0, node1437, node1453);
		} else if (node1430) {
			node1370_out0 = vec3(node1453, node1437, node1731_out0);
		} else if (node1431) {
			node1370_out0 = vec3(node1453, node1731_out0, node1437);
		} else if (node1432) {
			node1370_out0 = vec3(node1731_out0, node1453, node1437);
		} else if (node1433) {
			node1370_out0 = vec3(node1437, node1453, node1731_out0);
		} else {
			node1370_out0 = vec3(node1453, node1453, node1453);
		}
		float node1462 = gain(1.0, 1.7);
		float node1476 = (u_val3a * 0.2);
		vec3 node1500 = vec3(node536.x, node535, (node536.z + 111.0));
		vec3 node1490 = (node536 + vec3(0.0, 0.0, ((node1214 * ((ns_simplex3((vec3(node1500.x, node1500.y, node1500.z) / 1.5)) * 0.5) + 0.5)) * 0.5)));
		vec3 node1507 = vec3((u_val3a * -1.0), 0.0, 0.0);
		vec3 node1489 = (node1490 + node1507);
		vec3 node1487 = vec3(node1489.x, node1489.y, node1489.z);
		float node1486 = node1487.x;
		float node1511 = node1487.y;
		float node1512 = node1487.z;
		vec3 node1480 = vec3(((ns_simplex3((vec3(node1486, node1511, node1512) / 1.5)) * 0.5) + 0.5), ((ns_simplex3((vec3(node1486, node1511, (node1512 + 33.333333333333336)) / 1.5)) * 0.5) + 0.5), ((ns_simplex3((vec3(node1486, node1511, (node1512 + 66.66666666666667)) / 1.5)) * 0.5) + 0.5));
		vec3 node1474 = vec3((node1476 + ((node1480.x * 0.33) * u_val3b)), pow(node1480.y, 2.0), pow(node1480.z, 2.0));
		float node1539 = node1474.z;
		bool node1544 = (node1539 < 0.5);
		float node1543_out0;
		if (node1544) {
			node1543_out0 = node1539;
		} else {
			node1543_out0 = (1.0 - node1539);
		}
		float node1538 = (node1539 + (node1474.y * node1543_out0));
		float node1554 = ((2.0 * node1539) - node1538);
		float node1470 = ((fract(node1474.x) * 360.0) / 60.0);
		float node1469 = floor(node1470);
		bool node1534 = (node1469 == 5.0);
		bool node1533 = (node1469 == 4.0);
		bool node1532 = (node1469 == 3.0);
		bool node1531 = (node1469 == 2.0);
		bool node1530 = (node1469 == 1.0);
		bool node1468 = (node1469 == 0.0);
		float node1728_out0;
		if ((node1534 || node1533 || node1532 || node1531 || node1530 || node1468)) {
			node1728_out0 = (node1538 - (((node1538 - node1539) * 2.0) * abs((mod(node1470, 2.0) - 1.0))));
		}
		vec3 node1467_out0;
		if (node1468) {
			node1467_out0 = vec3(node1538, node1728_out0, node1554);
		} else if (node1530) {
			node1467_out0 = vec3(node1728_out0, node1538, node1554);
		} else if (node1531) {
			node1467_out0 = vec3(node1554, node1538, node1728_out0);
		} else if (node1532) {
			node1467_out0 = vec3(node1554, node1728_out0, node1538);
		} else if (node1533) {
			node1467_out0 = vec3(node1728_out0, node1554, node1538);
		} else if (node1534) {
			node1467_out0 = vec3(node1538, node1554, node1728_out0);
		} else {
			node1467_out0 = vec3(node1554, node1554, node1554);
		}
		vec3 node1577 = vec3(node1490.x, node1490.y, (node1490.z + 300.0));
		float node1563 = gain((1.0 - pow(((((gain(((ns_simplex3((vec3(node1577.x, node1577.y, node1577.z) / 1.5)) * 0.5) + 0.5), (1.0 + u_val3b)) * 2.0) - 1.0) * 0.5) + 0.5), 1.0)), 1.7);
		vec2 node1621 = vec2((node795 * (1.0 + ns_rand1(60.4128))), 60.4128);
		vec3 node1609 = ((node1490 * pow(2.0, n11(gain(pow(((ns_simplex2((vec2(node1621.x, node1621.y) / 1.5)) * 0.5) + 0.5), 1.0), 0.5)))) + node1507);
		vec3 node1607 = vec3(node1609.x, node1609.y, (node1609.z + 100.0));
		float node1606 = node1607.x;
		float node1630 = node1607.y;
		float node1631 = node1607.z;
		vec3 node1600 = vec3(((ns_simplex3((vec3(node1606, node1630, node1631) / 1.5)) * 0.5) + 0.5), ((ns_simplex3((vec3(node1606, node1630, (node1631 + 33.333333333333336)) / 1.5)) * 0.5) + 0.5), ((ns_simplex3((vec3(node1606, node1630, (node1631 + 66.66666666666667)) / 1.5)) * 0.5) + 0.5));
		vec3 node1594 = vec3(((node1476 + u_val3b) + ((node1600.x * 0.33) * u_val3b)), pow(node1600.y, 3.0), pow(node1600.z, 3.0));
		float node1657 = node1594.z;
		bool node1662 = (node1657 < 0.5);
		float node1661_out0;
		if (node1662) {
			node1661_out0 = node1657;
		} else {
			node1661_out0 = (1.0 - node1657);
		}
		float node1656 = (node1657 + (node1594.y * node1661_out0));
		float node1672 = ((2.0 * node1657) - node1656);
		float node1590 = ((fract(node1594.x) * 360.0) / 60.0);
		float node1589 = floor(node1590);
		bool node1652 = (node1589 == 5.0);
		bool node1651 = (node1589 == 4.0);
		bool node1650 = (node1589 == 3.0);
		bool node1649 = (node1589 == 2.0);
		bool node1648 = (node1589 == 1.0);
		bool node1588 = (node1589 == 0.0);
		float node1725_out0;
		if ((node1652 || node1651 || node1650 || node1649 || node1648 || node1588)) {
			node1725_out0 = (node1656 - (((node1656 - node1657) * 2.0) * abs((mod(node1590, 2.0) - 1.0))));
		}
		vec3 node1587_out0;
		if (node1588) {
			node1587_out0 = vec3(node1656, node1725_out0, node1672);
		} else if (node1648) {
			node1587_out0 = vec3(node1725_out0, node1656, node1672);
		} else if (node1649) {
			node1587_out0 = vec3(node1672, node1656, node1725_out0);
		} else if (node1650) {
			node1587_out0 = vec3(node1672, node1725_out0, node1656);
		} else if (node1651) {
			node1587_out0 = vec3(node1725_out0, node1672, node1656);
		} else if (node1652) {
			node1587_out0 = vec3(node1656, node1672, node1725_out0);
		} else {
			node1587_out0 = vec3(node1672, node1672, node1672);
		}
		vec3 node1079 = clamp((((clamp(((((node1089_out0 * (1.0 - node1345)) + (node1370_out0 * node1345)) * (1.0 - node1462)) + (((node1467_out0 * (1.0 - node1563)) + (node1587_out0 * node1563)) * node1462)), 0.0, 1.0) * mix(0.0, 1.0, gain(parabola(node48, 0.5), 1.0))) * mix(1.0, smoothstep(1.0, 0.5, node48), node446)) * mix(0.3, 1.0, smoothstep(-1.0, -0.3, node1117))), 0.0, 1.0);
		vec2 node1078 = node1079.yz;
		float node1076 = gain(node1078.y, 1.7);
		float node1075 = (1.0 - node1076);
		float node1692 = gain(node1078.x, 1.7);
		float node1691 = (1.0 - node1692);
		float node1701 = gain(node1079.x, 1.7);
		node1061_out0 = ((((((node7 * node1075) + (vec3(1.0, 1.0, 0.0) * node1076)) * node1691) + (((vec3(1.0, 0.0, 0.0) * node1075) + (vec3(1.0, 0.5, 0.0) * node1076)) * node1692)) * (1.0 - node1701)) + (((((vec3(0.0, 0.0, 1.0) * node1075) + (vec3(0.0, 0.5, 1.0) * node1076)) * node1691) + (((vec3(1.0, 0.0, 1.0) * node1075) + (vec3(1.0, 1.0, 1.0) * node1076)) * node1692)) * node1701));
	}
	hue = node1061_out0.r;
	sat = node1061_out0.g;
	val = node1061_out0.b;
	


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
}`,g=`
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
    }`,I=`
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
    `,_=[],r=512;for(let c=0;c<r;c++)_.push(.3),_.push(0),_.push(0),_.push(1);let D={mag:n.LINEAR,min:n.LINEAR,level:0,format:n.RGBA,internalFormat:n.RGBA16F,type:n.FLOAT,width:r,height:1,src:_};const S=twgl.createTexture(n,D);twgl.setTextureFromArray(n,S,_,D);let h=288360;var b=1024,E=Math.ceil(h/b);const M=twgl.createProgramInfo(n,[s,u]),p={position:[-1,-1,0,1,-1,0,-1,1,0,-1,1,0,1,-1,0,1,1,0]},C=twgl.createBufferInfoFromArrays(n,p),X=[{mag:n.NEAREST,min:n.NEAREST,level:0,format:n.RGBA,internalFormat:n.RGBA16F,type:n.FLOAT},{mag:n.NEAREST,min:n.NEAREST,level:0,format:n.RGBA,internalFormat:n.RGBA,type:n.UNSIGNED_BYTE}];let L=twgl.createFramebufferInfo(n,X,b,E);const R=twgl.createProgramInfo(n,[g,I]);let K=[];for(let c=0;c<h;c++)K.push(c);const Q={a_idx:{numComponents:1,data:K}},J=twgl.createBufferInfoFromArrays(n,Q);let t=0,l=0,m=0;function k(c){let N=c-t;m+=e.speed*(N/1e3)*.1;const y=o.clientWidth,x=o.clientHeight,$=1080,H=1920;e.render?(y!==$||x!==H)&&(o.width=$,o.height=H):(y!==o.width||x!==o.height)&&(o.width=y,o.height=x),i=[o.width,o.height],n.viewport(0,0,n.canvas.width,n.canvas.height),n.disable(n.BLEND),n.useProgram(M.program),twgl.setBuffersAndAttributes(n,M,C),twgl.setUniforms(M,{res:[b,E],time:c*1e3,numPoints:h,u_seed:e.seed,u_off:m,u_offset:.1,u_resx:o.width,u_resy:o.height,u_mix1:1,u_mix2:0,u_move:0,u_seed:e.seed,u_speed:.5,u_reflect:0,u_weight_high:1,u_weight_low:1,u_tex0:S,u_tx:e.tx,u_ty:e.ty,u_val1a:e.val1a,u_val1b:e.val1b,u_val2a:e.val2a,u_val2b:e.val2b,u_val3a:e.val3a,u_val3b:e.val3b,u_val4a:e.val4a,u_val4b:e.val4b,u_render:1}),twgl.setUniforms(M,Me),twgl.bindFramebufferInfo(n,L),n.drawBuffers([n.COLOR_ATTACHMENT0,n.COLOR_ATTACHMENT1,n.NONE,n.NONE]),twgl.drawBufferInfo(n,C),twgl.bindFramebufferInfo(n,null),n.useProgram(R.program),n.clearColor(0,0,0,1),n.clear(n.COLOR_BUFFER_BIT),n.enable(n.BLEND),n.blendEquation(n.MAX),n.blendFunc(n.ONE,n.ONE),twgl.setBuffersAndAttributes(n,R,J),twgl.setUniforms(R,{tex_size:[L.width,L.height],point_size:i[1]/1024*2,pos_tex:L.attachments[0],color_tex:L.attachments[1]}),twgl.drawBufferInfo(n,J,n.POINTS),d(l),t=c,l+=1}return k};async function ke(o,e,d,i){o.getContext("webgl2");const n=async a=>{e(a),d.progress=0,requestAnimationFrame(n)};return requestAnimationFrame(n),d}async function Oe(){const o={avaliable:!1,inside:!1,latitude:0,longitude:0};if(navigator.geolocation){o.avaliable=!0,console.log("Geolocation avaliable");try{const e=await new Promise((g,I)=>{navigator.geolocation.getCurrentPosition(g,I)}),d=e.coords.latitude,i=e.coords.longitude;console.log(`Latitude: ${d}, Longitude: ${i}`);let n=T.center_x,a=T.center_y,s=T.radius,u=Math.sqrt((d-n)*(d-n)+(i-a)*(i-a))<s;o.inside=u,o.latitude=d,o.longitude=i,o.inside?(console.log("Inside THK area"),document.getElementById("text-info").innerHTML="LOCATION: INSIDE"):(console.log("Outside THK area"),document.getElementById("text-info").innerHTML="LOCATION: OUTSIDE")}catch(e){console.error("Error retrieving location:",e),o.avaliable=!1}}return o}function qe(){const o=document.getElementById("canvas-ui"),e=o.getContext("2d"),d=document.getElementById("canvas-thk"),i=document.getElementById("slider-color"),n=document.getElementById("slider-shape");function a(t,l){P.hijack1=!1}i.addEventListener("touchstart",t=>{a()}),n.addEventListener("touchstart",t=>{a()});function s(t){let l=t.clientX,m=t.clientY;t.touches&&(l=t.touches[0].clientX,m=t.touches[0].clientY);const k=o.getBoundingClientRect();return l-=k.left,m-=k.top,{x:l,y:m}}function u(t){let l=0,m=0;const k=t.id;k=="slider-color"?(l=2,m=0):k=="slider-shape"&&(l=3,m=1);let c=!1,N=!1,y=0,x=0,$=0,H=Math.random()*100,W=H,ue=Math.random(),V=ue;l==1?(H=.5,W=.5):(H=Math.random()*100,W=H);const Pe="val"+(l+1)+"a";f[Pe]=W;const Ee="val"+(l+1)+"b";f[Ee]=ue,o.getBoundingClientRect();let w=t.getBoundingClientRect().left,z=t.getBoundingClientRect().top;function _e(A){A.preventDefault(),c=!0,Z(A)}function F(A){c&&(A.preventDefault(),c=!1)}function Z(A){if(!c)return;const ee=s(A);y=ee.x,x=ee.y}function Ie(){let A=window.getComputedStyle(t).opacity;if(w=t.getBoundingClientRect().left+t.clientWidth/2,z=t.getBoundingClientRect().top+t.clientHeight/2,N=c,P.hijack1){N=!0;let q=parseFloat(P.x1);m&&(q=-q),q=(q*.25-.5)*Math.PI;let te=parseFloat(P.y1);y=w+Math.cos(q)*(te+.001),x=z+Math.sin(q)*(te+.001)}let ee=d.width,Y=Math.sqrt((y-w)*(y-w)+(x-z)*(x-z)),pe=Y/ee,ae=(y-w)/Y,le=(x-z)/Y,ve=Math.atan2(le,ae),j=ve-$;j>Math.PI&&(j-=Math.PI*2),j<-Math.PI&&(j+=Math.PI*2),j*=Math.pow(pe,1.3)*3,N&&(W+=j,V=Math.min(Math.max(0,pe),1)),$=ve;let me=W*2,Ce=me-Math.min(1,V)*Math.PI*.9,Ne=me+Math.min(1,V)*Math.PI*.9,xe=t.clientWidth/2,oe=xe*.1,G=xe-oe/2+12,U=G*.75,O=A;e.lineWidth=oe,e.lineCap="round",e.strokeStyle="rgba(255, 255, 255, "+.6*O+")",e.beginPath(),e.arc(w,z,G,Ce,Ne),e.stroke(),e.lineWidth=1,e.strokeStyle="rgba(255, 255, 255, "+.2*O+")",e.beginPath(),e.arc(w,z,G+oe/2,0,Math.PI*2),e.stroke();let Be=.05,Te=.05;function ye(q,te,Se){return q+(te-q)*Se}const ne="val"+(l+1)+"a",ie="val"+(l+1)+"b";f.rand&&(console.log("r2"),W=f[ne],V=f[ie]),f[ne]=ye(f[ne],W,Be),f[ie]=ye(f[ie],V,Te),l==1&&(f.speed=f[ne]),N?(e.strokeStyle="rgba(255, 255, 255, "+.3*O+")",e.beginPath(),e.arc(w,z,Math.max(Y,G+oe/2),0,2*Math.PI),e.stroke(),e.strokeStyle="rgba(255, 255, 255, "+.3*O+")",e.beginPath(),e.moveTo(w+ae*G,z+le*G),e.lineTo(w+ae*Y,z+le*Y),e.stroke(),e.strokeStyle="rgba(255, 255, 255, "+.15*O+")",e.beginPath(),e.arc(y,x,U,0,2*Math.PI),e.globalCompositeOperation="destination-out",e.fillStyle="rgba(0, 0, 0, 1)",e.fill(),e.globalCompositeOperation="source-over",e.fillStyle="rgba(255, 255, 255, "+.1*O+")",e.beginPath(),e.arc(y,x,U,0,2*Math.PI),e.fill(),e.strokeStyle="rgba(255, 255, 255, "+.33*O+")",e.lineWidth=2,e.beginPath(),e.arc(y,x,U,0,2*Math.PI),e.stroke()):(e.beginPath(),e.arc(w,z,U,0,2*Math.PI),e.globalCompositeOperation="destination-out",e.fillStyle="rgba(0, 0, 0, 1)",e.fill(),e.globalCompositeOperation="source-over",e.fillStyle="rgba(255, 255, 255, "+.1*O+")",e.beginPath(),e.arc(w,z,U,0,2*Math.PI),e.fill(),e.strokeStyle="rgba(255, 255, 255, "+.25*O+")",e.lineWidth=2,e.beginPath(),e.arc(w,z,U,0,2*Math.PI),e.stroke())}return t.addEventListener("mousedown",_e,!1),t.addEventListener("mousemove",Z,!1),t.addEventListener("mouseup",F,!1),o.addEventListener("mousemove",Z,!1),o.addEventListener("mouseup",F,!1),t.addEventListener("touchstart",_e,!1),t.addEventListener("touchmove",Z,!1),t.addEventListener("touchend",F,!1),t.addEventListener("touchcancel",F,!1),o.addEventListener("touchmove",Z,!1),o.addEventListener("touchend",F,!1),o.addEventListener("touchcancel",F,!1),Ie}const g=u(i),I=u(n);f.rand=!1;let _=!1,r=0,D=0,S=0,h=0,b=0,E=0,M=.01;function p(t,l,m){return t+(l-t)*m}function C(t){t.preventDefault(),_=!0;let l=s(t);S=l.x,h=l.y,r=S,D=h,L(t)}function X(t){_&&(t.preventDefault(),_=!1)}function L(t){if(!_)return;t.preventDefault();const l=s(t);S=l.x,h=l.y}o.addEventListener("mousedown",C,!1),o.addEventListener("mousemove",L,!1),o.addEventListener("mouseup",X,!1),o.addEventListener("touchstart",C,!1),o.addEventListener("touchmove",L,!1),o.addEventListener("touchend",X,!1),o.addEventListener("touchcancel",X,!1);const R=document.getElementById("onb-arrow");let K=R.getBoundingClientRect().top,Q=0;function J(){const t=d.clientWidth,l=d.clientHeight;(t!==o.width||l!==o.height)&&(o.width=t,o.height=l);let m=R.getBoundingClientRect().top;Q=K-m,K=m,P.hijack_arrow&&(E=-Q/o.height*.66*window.getComputedStyle(R).opacity),e.clearRect(0,0,o.width,o.height);let k=0;e.fillStyle=e.fillStyle="rgba(0, 0, 0, "+k*.5+")",e.fillRect(0,0,o.width,o.height),g(),I(),f.rand=!1;let c=0,N=0;if(_){c=S-r,N=h-D;let x=o.height;c=c/x,N=N/x,b=p(b,c,1),E=p(E,N*.2,.5)}else b=p(b,0,M),E=p(E,0,M);f.tx+=b,f.ty+=E,r=S,D=h;let y=fe.progress;e.fillStyle="rgba(255, 255, 255, "+.5+")",e.fillRect(0,o.height-8,o.width*y,8)}return J}function B(o){o.style.pointerEvents="all",o.style.opacity="1"}function v(o){o.style.pointerEvents="none",o.style.opacity="0"}function ge(o){o.style.opacity="1"}function re(o){o.style.opacity="0"}function De(o){let e=.66,d=10;o.style.transform=`translateY(-${d}%) scale(${e}) `,o.style.border="1px solid #666"}function he(o){let e=1,d=0;o.style.transform=`translateY(-${d}%) scale(${e}) `,o.style.border="1px solid #000"}function ce(){const o=document.getElementById("canvas-thk"),e=document.getElementById("butt-info"),d=document.getElementById("butt-rand"),i=document.getElementById("butt-save"),n=document.getElementById("butt-sync"),a=document.getElementById("butt-continue"),s=document.getElementById("butt-download"),u=document.getElementById("onb-butt"),g=document.getElementById("textbox-onb"),I=document.getElementById("slider-color"),_=document.getElementById("slider-shape"),r=document.getElementById("onb-fade");T.show_time=null,document.getElementById("timer_text").style.opacity=0,v(u),re(g),v(a),v(s),B(e),B(d),B(i),B(n),B(I),B(_),re(r),he(o)}function Ae(o){const e=document.getElementById("canvas-thk"),d=document.getElementById("butt-info"),i=document.getElementById("butt-rand"),n=document.getElementById("butt-save"),a=document.getElementById("butt-sync"),s=document.getElementById("slider-color"),u=document.getElementById("slider-shape"),g=document.getElementById("onb-fade");v(d),v(i),v(n),v(a),v(s),v(u),re(g),De(e)}function Re(){const o=document.getElementById("canvas-thk"),e=document.getElementById("butt-info"),d=document.getElementById("butt-rand"),i=document.getElementById("butt-save"),n=document.getElementById("butt-sync"),a=document.getElementById("butt-continue"),s=document.getElementById("butt-download"),u=document.getElementById("onb-butt"),g=document.getElementById("textbox-onb"),I=document.getElementById("slider-color"),_=document.getElementById("slider-shape"),r=document.getElementById("onb-fade");T.show_time=null,document.getElementById("timer_text").style.opacity=0,B(u),ge(g),v(a),v(s),v(e),v(d),v(i),v(n),v(I),v(_),ge(r),he(o)}function be(){const o=document.getElementById("butt-continue"),e=document.getElementById("butt-download");B(o),B(e)}function He(){let o=T.show_time,e=document.getElementById("timer_text"),d="";if(o!=null){let i=new Date().getTime(),n=o-i,a=T.show_len;if(n>0){e.style.opacity=.75;let s=Math.floor(n/6e4),u=Math.floor(n%6e4/1e3);s.toString(),u.toString(),s<1?d=`Your entity will be displayed in THK tower in ${u}s`:d=`Your entity will be displayed in THK tower in ${s}m ${u}s`}else n>-a?(d="Your entity is being displayed now",e.style.opacity=1):(d="Your entity has been displayed",e.style.opacity=.5)}e.innerHTML=d}function se(o){const e=document.getElementById("onb-butt");e.innerHTML=o}const We="TUTORIAL",Fe="NEXT",Ye="START";function je(){document.getElementById("onb-fade"),document.getElementById("butt-info"),document.getElementById("butt-save"),document.getElementById("butt-sync");const o=document.getElementById("onb-header"),e=document.getElementById("onb-body"),d=document.getElementById("onb-butt"),i="THK SYNC",n="CREATE THK DESIGN AND SEND IT TO THK TOWER",a="CREATE",s="DRAG & ROTATE CONTROLS TO ADJUST SHAPE & COLOR",u="EXPLORE",g="SCROLL TO FIND THE DESIGN THAT RESONATES WITH YOU",I="SEND",_="CLICK 'SYNC' AND WATCH YOUR DESIGN ON THE TOWER. DON'T FORGET TO FILM AND SHARE";let r=0;function D(p){switch(p){case 0:o.innerHTML=i,o.innerHTML=o.textContent.replace(/\S/g,"<span class='letter'>$&</span>"),e.innerHTML=n,e.innerHTML=e.textContent.replace(/\S/g,"<span class='letter'>$&</span>");break;case 1:o.innerHTML=a,o.innerHTML=o.textContent.replace(/\S/g,"<span class='letter'>$&</span>"),e.innerHTML=s,e.innerHTML=e.textContent.replace(/\S/g,"<span class='letter'>$&</span>");break;case 2:o.innerHTML=u,o.innerHTML=o.textContent.replace(/\S/g,"<span class='letter'>$&</span>"),e.innerHTML=g,e.innerHTML=e.textContent.replace(/\S/g,"<span class='letter'>$&</span>");break;case 3:o.innerHTML=I,o.innerHTML=o.textContent.replace(/\S/g,"<span class='letter'>$&</span>"),e.innerHTML=_,e.innerHTML=e.textContent.replace(/\S/g,"<span class='letter'>$&</span>");break}}function S(){ce()}let h=anime({targets:P,y1:[0,200],easing:"easeInOutQuad",duration:1e3,delay:200}),b=anime({loop:!0,direction:"alternate",targets:P,x1:[0,1],y1:[200,150],easing:"easeInOutSine",duration:1e3,delay:0});function E(){if(console.log("next page",r),r==0&&se(We),r>0&&r<3&&se(Fe),r==3&&se(Ye),r>3)S();else{if(D(r),r==1){let p=document.getElementById("slider-color"),C=document.getElementById("slider-shape");B(p),B(C),P.hijack1=!0,P.y1=0,P.x1=0,h.play(),setTimeout(()=>{b.play()},1200)}else P.hijack1=!1,h.restart(),b.restart(),h.pause(),b.pause();if(r==2){const p=document.getElementById("onb-arrow");p.style.opacity="0.5",P.hijack_arrow=!0,anime.timeline({loop:!0,direction:"alternate"}).add({targets:"#onb-arrow",translateY:[-100,100],easing:"easeInOutSine",duration:1e3,delay:0})}else{const p=document.getElementById("onb-arrow");p.style.opacity="0.0",P.hijack_arrow=!1}document.querySelectorAll(".letter").forEach(p=>{p.style.opacity="0"}),anime.timeline({loop:!1}).add({targets:"#onb-header .letter",opacity:[0,1],easing:"easeInOutQuad",duration:100,delay:(p,C)=>50*(C+1)}).add({targets:"#onb-body .letter",opacity:[0,1],easing:"easeInOutQuad",duration:100,delay:(p,C)=>30*(C+1)})}r+=1}function M(){r=0,Re(),E(),anime({targets:"#onb-butt",opacity:[0,1],easing:"easeInOutQuad",duration:1e3,delay:500})}return d.addEventListener("click",function(){E()}),M}const Ge=je();Oe();const we=document.getElementById("canvas-thk"),Ue=document.getElementById("butt-sync");Ue.addEventListener("click",function(){{const o=f;fetch(T.server,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)}).then(e=>e.json()).then(e=>{console.log("Success:",e);let d=e.time*1e3,i=e.length*1e3;T.show_time=d,T.show_len=i,de()}).catch(e=>{console.error("Error:",e),de()})}});const Xe=qe();function Ke(){Xe(),He()}const $e=Le(we,f,Ke);ke(we,$e,fe);const ze=document.getElementById("butt-save");ze.addEventListener("click",function(){de()});document.getElementById("butt-download");ze.addEventListener("click",function(){de()});const Ve=document.getElementById("butt-info");Ve.addEventListener("click",function(){Ge()});const Ze=document.getElementById("butt-rand");Ze.addEventListener("click",function(){console.log("rand"),f.val3a=Math.random()*100,f.val3b=Math.random(),f.val4a=Math.random()*100,f.val4b=Math.random(),f.rand=!0});const Qe=document.getElementById("butt-continue");Qe.addEventListener("click",function(){ce()});function Je(){let o=new Date().getTime()+5e3;T.show_time=o,be()}function de(){fe.callback=Je,Ae(),be()}ce();
