(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const a of n)if(a.type==="childList")for(const s of a.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function d(n){const a={};return n.integrity&&(a.integrity=n.integrity),n.referrerPolicy&&(a.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?a.credentials="include":n.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(n){if(n.ep)return;n.ep=!0;const a=d(n);fetch(n.href,a)}})();const B={restrict_loc:!0,center_x:-8.630436666894104,center_y:115.09447416252982,radius:.016,server:"https://sterling-engaging-whippet.ngrok-free.app",dev_send:!1,show_len:3e3,show_time:null},fe={recording:!1,progress:0,callback:null},P={seed:0,speed:1,val1:Math.random()*100,val2:Math.random()*100,tx:Math.random()*100,ty:Math.random()*100,val1a:0,val1b:0,val2a:0,val2b:0,val3a:Math.random()*100,val3b:Math.random(),val4a:Math.random()*100,val4b:Math.random(),render:0},Me={u_General:0,u_Offsety:0,u_Celltop:.1899999976158142,u_Cellbottom:1.309999942779541,u_Cellspeed:.15000000596046448,u_Speed:1,u_Splitsize:16,u_Color:0,u_Colorgain:1.0700000524520874,u_Pattern:0,u_Patternscale:8,u_Patternpow:0,u_Patterngain:0,u_Patternevery:1,u_Patternstrength:.5080000162124634,u_Signalstrength:1,u_Signalsize:.15199999511241913,u_Displacepos:0,u_Displacegamma:3.2799999713897705,u_Displacex:1,u_Wposscalex:4,u_Wposscaley:4,u_Wposscalez:4,u_Wposspeedx:0,u_Wposspeedy:0,u_Wposspeedz:0,u_Wpospxx:-.4000000059604645,u_Wpospxy:0,u_Wpospxz:0,u_Wpospyx:4,u_Wpospyy:0,u_Wpospyz:0,u_Wpospzx:0,u_Wpospzy:0,u_Wpospzz:0,u_Noisepos:0,u_Nposscalex:4,u_Nposscaley:4,u_Nposscalez:4,u_Nposspeedx:0,u_Nposspeedy:0,u_Nposspeedz:0,u_Nposwfx:.20000000298023224,u_Nposwfy:0,u_Nposwfz:0,u_Nposwwx:0,u_Nposwwy:.6000000238418579,u_Nposwwz:0,u_Nposwyx:-.8999999761581421,u_Nposwyy:0,u_Nposwyz:0,u_Npospxx:-.30000001192092896,u_Npospxy:0,u_Npospxz:0,u_Npospyx:0,u_Npospyy:0,u_Npospyz:0,u_Npospzx:0,u_Npospzy:0,u_Npospzz:.10000000149011612,u_Shownoisepos:0,u_Channels:0,u_Channelwidth:2,u_Channelsymmetry:1,u_Channelspread:1,u_Channelshrinkjoint:0,u_Points:0,u_Pointweight:17.5,u_Pointfade:.6499999761581421,u_Pointweightvariation:0,u_Pointjointwidth:.5,u_Pointweighttop:1,u_Pointweightbottom:1},w={hijack1:!1,x1:0,y1:0,hijack_arrow:!1},Le=(o,e,d)=>{let i=[o.width,o.height];const n=o.getContext("webgl2",{antialias:!0});n||alert("Please use browser with WebGL2 support");var a=n.getExtension("EXT_color_buffer_float");a||alert("Please use browser with Floating Point support");const s=`
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
    `,r=`#version 300 es
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
	float node286 = (u_val4a * 0.5);
	float node284 = ((node286 * 0.2) * 0.25);
	vec2 node282 = vec2((node284 * (1.0 + ns_rand1(56.0976))), 56.0976);
	float node272 = mix(3.0, 6.0, gain(pow(((ns_simplex2((vec2(node282.x, node282.y) / 1.5)) * 0.5) + 0.5), 1.0), 2.0));
	float node227 = float(Clone_2.idx);
	bool node223 = (Clone_2.size > 1.0);
	float node222_out0;
	if (node223) {
		node222_out0 = (node227 / (Clone_2.size - 1.0));
	} else {
		node222_out0 = 0.5;
	}
	bool node295 = ((Clone_2.idx == 0.0) || (Clone_2.idx == 8.0));
	bool node304 = (Clone_0.idx == 2.0);
	float node1635_out0;
	if ((node295 || node304)) {
		node1635_out0 = (1.0 - parabola(node222_out0, 2.0));
	}
	float node294_out0;
	if (node295) {
		node294_out0 = node1635_out0;
	} else {
		float node303_out0;
		if (node304) {
			node303_out0 = node1635_out0;
		} else {
			bool node308 = (Clone_0.idx < 3.0);
			float node307_out0;
			if (node308) {
				node307_out0 = (1.0 - node222_out0);
			} else {
				node307_out0 = node222_out0;
			}
			node303_out0 = node307_out0;
		}
		node294_out0 = node303_out0;
	}
	vec2 node320 = vec2((node284 * (1.0 + ns_rand1(60.4128))), 60.4128);
	float node292 = (node294_out0 * gain(pow(((ns_simplex2((vec2(node320.x, node320.y) / 1.5)) * 0.5) + 0.5), 1.0), 2.0));
	float node69 = (u_off * 0.5);
	float node72 = (u_ty * 4.5);
	float node68 = (node69 - (node72 * 0.02));
	float node66 = fract((node68 * 16.0));
	float node331 = gain(1.0, 2.0);
	float node205 = (u_off * 0.1);
	float node207 = ((Clone_0.idx + 0.5) / 5.0);
	float node206 = (node207 * 0.2);
	float node343 = float((Clone_5.idx + fract(0.0)));
	bool node339 = (Clone_5.size > 1.0);
	float node338_out0;
	if (node339) {
		node338_out0 = (node343 / Clone_5.size);
	} else {
		node338_out0 = fract((node343 + 0.5));
	}
	float node336 = (node338_out0 * 17.0);
	float node335 = floor(node336);
	float node219 = mod(node23, 2.0);
	float node212 = clamp((10.0 - (((float(Clone_1.idx) * 2.0) + 4.0) - node219)), 0.0, 10.0);
	float node211 = (node212 / 10.0);
	float node90 = (0.14287755393627663 - ((0.28575510787255326 * cos(1.5707963267948966)) / 6.283185307179586));
	vec2 node256 = vec2(node205, 40.0);
	float node247 = mix(3.0, 8.0, ((ns_simplex2((vec2(node256.x, node256.y) / 1.5)) * 0.5) + 0.5));
	float node220 = (node222_out0 * 2.0);
	float node110 = (0.21424489212744674 + node90);
	float node56 = 0.0;
	float node352 = 0.0;
	float node355 = 0.0;
	for (int node54 = 0; node54 < int(16.0); node54++) {
		float node65 = float(node54);
		float node62 = clamp(((node65 + node66) / 15.0), 0.0, 1.0);
		bool node61 = (node62 < 0.5);
		float node60_out0;
		if (node61) {
			bool node85 = (node62 > 0.28575510787255326);
			float node84_out0;
			if (node85) {
				node84_out0 = ((node62 - 0.28575510787255326) + node90);
			} else {
				float node99 = ((node62 / 0.28575510787255326) / 2.0);
				node84_out0 = ((0.28575510787255326 * node99) - ((0.28575510787255326 * cos((((node99 - 0.25) * 3.141592653589793) * 2.0))) / 6.283185307179586));
			}
			node60_out0 = ((node84_out0 / node110) / 2.0);
		} else {
			float node118 = (1.0 - node62);
			bool node117 = (node118 > 0.28575510787255326);
			float node116_out0;
			if (node117) {
				node116_out0 = ((node118 - 0.28575510787255326) + node90);
			} else {
				float node125 = ((node118 / 0.28575510787255326) / 2.0);
				node116_out0 = ((0.28575510787255326 * node125) - ((0.28575510787255326 * cos((((node125 - 0.25) * 3.141592653589793) * 2.0))) / 6.283185307179586));
			}
			node60_out0 = (1.0 - ((node116_out0 / node110) / 2.0));
		}
		float node136 = clamp((((node65 - 1.0) + node66) / 15.0), 0.0, 1.0);
		bool node135 = (node136 < 0.5);
		float node134_out0;
		if (node135) {
			bool node145 = (node136 > 0.28575510787255326);
			float node144_out0;
			if (node145) {
				node144_out0 = ((node136 - 0.28575510787255326) + node90);
			} else {
				float node151 = ((node136 / 0.28575510787255326) / 2.0);
				node144_out0 = ((0.28575510787255326 * node151) - ((0.28575510787255326 * cos((((node151 - 0.25) * 3.141592653589793) * 2.0))) / 6.283185307179586));
			}
			node134_out0 = ((node144_out0 / node110) / 2.0);
		} else {
			float node165 = (1.0 - node136);
			bool node164 = (node165 > 0.28575510787255326);
			float node163_out0;
			if (node164) {
				node163_out0 = ((node165 - 0.28575510787255326) + node90);
			} else {
				float node171 = ((node165 / 0.28575510787255326) / 2.0);
				node163_out0 = ((0.28575510787255326 * node171) - ((0.28575510787255326 * cos((((node171 - 0.25) * 3.141592653589793) * 2.0))) / 6.283185307179586));
			}
			node134_out0 = (1.0 - ((node163_out0 / node110) / 2.0));
		}
		float node203 = ((node134_out0 + node60_out0) / 2.0);
		vec3 node198 = vec3(((((node203 * 4.0) + node205) + node206) + node211), node220, 0.0);
		vec3 node196 = vec3(node198.x, node198.y, node198.z);
		float node195 = node196.x;
		float node232 = node196.y;
		float node233 = node196.z;
		vec3 node270 = vec3((node203 * node272), node292, node286);
		vec3 node268 = vec3(node270.x, node270.y, node270.z);
		float node55 = (node56 + ((node60_out0 - node134_out0) * mix(pow((0.01 + ((((((gain(((ns_simplex3((vec3(node195, node232, node233) / 1.5)) * 0.5) + 0.5), 2.0) * 2.0) - 1.0) + (((gain(((ns_simplex3((vec3((node195 * 2.0), (node232 * 2.0), (node233 * 2.0)) / 1.5)) * 0.5) + 0.5), 2.0) * 2.0) - 1.0) * 0.5)) / 1.5) * 0.5) + 0.5)), node247), pow((0.001 + ((ns_simplex3((vec3(node268.x, node268.y, node268.z) / 1.5)) * 0.5) + 0.5)), 5.0), node331)));
		bool node334 = (node65 == node335);
		bool node351 = (!node334);
		float node333_out0;
		if (node334) {
			node333_out0 = node56;
		} else {
			node333_out0 = node352;
		}
		float node354_out0;
		if (node334) {
			node354_out0 = node55;
		} else {
			node354_out0 = node355;
		}
		node56 = node55;
		node352 = node333_out0;
		node355 = node354_out0;
	}
	vec2 node372 = vec2((node69 * 0.3), 21.0);
	vec2 node386 = vec2((node286 * 0.3), 31.0);
	float node49 = mix((node352 / node56), (node355 / node56), pow(fract(node336), pow(2.0, mix(((gain(((ns_simplex2((vec2(node372.x, node372.y) / 1.5)) * 0.5) + 0.5), 0.5) * 2.0) - 1.0), ((gain(((ns_simplex2((vec2(node386.x, node386.y) / 1.5)) * 0.5) + 0.5), 0.5) * 2.0) - 1.0), 1.0))));
	float node38 = mod(Clone_0.idx, 2.0);
	float node392 = min(float((Clone_1.idx == 2.0)), float((node38 == 1.0)));
	float node43 = ((((Clone_1.idx + mix(node49, clamp(pow(node49, 3.0), 0.0, 1.0), node392)) / 3.0) * 3.0) - 2.5);
	bool node37 = (node38 > 0.5);
	float node36_out0;
	if (node37) {
		node36_out0 = clamp(node43, -10.0, 0.0);
	} else {
		node36_out0 = node43;
	}
	float node410 = (node43 + (node38 * 0.5));
	float node409 = clamp(node410, -10.0, 0.5);
	vec4 node14 = vec4(n01((((((n11((node23 / 4.0)) + ((mix(0.1, 0.9, n01(cos(((node36_out0 * 3.141592653589793) * 2.0)))) * n11((node227 / 8.0))) / 2.0)) * 0.5249999999999999) * mix(1.0, 0.95, cos(((((node409 * 1.5) - 0.1) * 3.141592653589793) * 2.0)))) * mix(1.0, 0.83, cos(((((node409 * 0.25) + 0.15) * 3.141592653589793) * 2.0)))) * mix(0.9, 1.0, node410))), n01((n11(((node410 * 0.4) + 0.5)) * 1.5)), 0.0, 0.0);
	vec2 node12 = vec2(node14.x, node14.y);
	float node462 = (fract(node338_out0) * 17.0);
	float node461 = fract(node462);
	float node460 = fract(node461);
	vec2 node653 = vec2((node284 * (1.0 + ns_rand1(0.0))), 0.0);
	float node644 = mix(3.0, 6.0, gain(pow(((ns_simplex2((vec2(node653.x, node653.y) / 1.5)) * 0.5) + 0.5), 1.0), 2.0));
	vec2 node667 = vec2((node284 * (1.0 + ns_rand1(4.3152))), 4.3152);
	float node658 = (node294_out0 * gain(pow(((ns_simplex2((vec2(node667.x, node667.y) / 1.5)) * 0.5) + 0.5), 1.0), 2.0));
	float node680 = floor(node462);
	float node496 = 0.0;
	float node682 = 0.0;
	float node685 = 0.0;
	for (int node494 = 0; node494 < int(16.0); node494++) {
		float node505 = float(node494);
		float node502 = clamp(((node505 + node66) / 15.0), 0.0, 1.0);
		bool node501 = (node502 < 0.5);
		float node500_out0;
		if (node501) {
			bool node511 = (node502 > 0.28575510787255326);
			float node510_out0;
			if (node511) {
				node510_out0 = ((node502 - 0.28575510787255326) + node90);
			} else {
				float node517 = ((node502 / 0.28575510787255326) / 2.0);
				node510_out0 = ((0.28575510787255326 * node517) - ((0.28575510787255326 * cos((((node517 - 0.25) * 3.141592653589793) * 2.0))) / 6.283185307179586));
			}
			node500_out0 = ((node510_out0 / node110) / 2.0);
		} else {
			float node531 = (1.0 - node502);
			bool node530 = (node531 > 0.28575510787255326);
			float node529_out0;
			if (node530) {
				node529_out0 = ((node531 - 0.28575510787255326) + node90);
			} else {
				float node537 = ((node531 / 0.28575510787255326) / 2.0);
				node529_out0 = ((0.28575510787255326 * node537) - ((0.28575510787255326 * cos((((node537 - 0.25) * 3.141592653589793) * 2.0))) / 6.283185307179586));
			}
			node500_out0 = (1.0 - ((node529_out0 / node110) / 2.0));
		}
		float node548 = clamp((((node505 - 1.0) + node66) / 15.0), 0.0, 1.0);
		bool node547 = (node548 < 0.5);
		float node546_out0;
		if (node547) {
			bool node557 = (node548 > 0.28575510787255326);
			float node556_out0;
			if (node557) {
				node556_out0 = ((node548 - 0.28575510787255326) + node90);
			} else {
				float node563 = ((node548 / 0.28575510787255326) / 2.0);
				node556_out0 = ((0.28575510787255326 * node563) - ((0.28575510787255326 * cos((((node563 - 0.25) * 3.141592653589793) * 2.0))) / 6.283185307179586));
			}
			node546_out0 = ((node556_out0 / node110) / 2.0);
		} else {
			float node577 = (1.0 - node548);
			bool node576 = (node577 > 0.28575510787255326);
			float node575_out0;
			if (node576) {
				node575_out0 = ((node577 - 0.28575510787255326) + node90);
			} else {
				float node583 = ((node577 / 0.28575510787255326) / 2.0);
				node575_out0 = ((0.28575510787255326 * node583) - ((0.28575510787255326 * cos((((node583 - 0.25) * 3.141592653589793) * 2.0))) / 6.283185307179586));
			}
			node546_out0 = (1.0 - ((node575_out0 / node110) / 2.0));
		}
		float node614 = ((node546_out0 + node500_out0) / 2.0);
		vec3 node609 = vec3(((((node614 * 4.0) + node205) + node206) + node211), node220, 0.0);
		vec3 node607 = vec3(node609.x, node609.y, node609.z);
		float node606 = node607.x;
		float node618 = node607.y;
		float node619 = node607.z;
		vec3 node642 = vec3((node614 * node644), node658, node286);
		vec3 node640 = vec3(node642.x, node642.y, node642.z);
		float node495 = (node496 + ((node500_out0 - node546_out0) * mix(pow((0.01 + ((((((gain(((ns_simplex3((vec3(node606, node618, node619) / 1.5)) * 0.5) + 0.5), 2.0) * 2.0) - 1.0) + (((gain(((ns_simplex3((vec3((node606 * 2.0), (node618 * 2.0), (node619 * 2.0)) / 1.5)) * 0.5) + 0.5), 2.0) * 2.0) - 1.0) * 0.5)) / 1.5) * 0.5) + 0.5)), node247), pow((0.001 + ((ns_simplex3((vec3(node640.x, node640.y, node640.z) / 1.5)) * 0.5) + 0.5)), 5.0), node331)));
		bool node679 = (node505 == node680);
		bool node681 = (!node679);
		float node678_out0;
		if (node679) {
			node678_out0 = node496;
		} else {
			node678_out0 = node682;
		}
		float node684_out0;
		if (node679) {
			node684_out0 = node495;
		} else {
			node684_out0 = node685;
		}
		node496 = node495;
		node682 = node678_out0;
		node685 = node684_out0;
	}
	float node491 = (node685 / node496);
	float node687 = (node682 / node496);
	float node489 = ((node491 + node687) / 2.0);
	float node699 = (node286 * 0.25);
	vec2 node697 = vec2((node699 * (1.0 + ns_rand1(21.576))), 21.576);
	vec2 node717 = vec2((node699 * (1.0 + ns_rand1(25.891199999999998))), 25.891199999999998);
	vec2 node734 = vec2((node284 * (1.0 + ns_rand1(30.2064))), 30.2064);
	bool node748 = (Clone_0.size > 1.0);
	float node747_out0;
	if (node748) {
		node747_out0 = (node23 / (Clone_0.size - 1.0));
	} else {
		node747_out0 = 0.5;
	}
	vec2 node761 = vec2((node699 * (1.0 + ns_rand1(17.2608))), 17.2608);
	vec2 node776 = vec2((node284 * (1.0 + ns_rand1(34.5216))), 34.5216);
	vec2 node792 = vec2((node284 * (1.0 + ns_rand1(38.8368))), 38.8368);
	float node802 = (node491 - node687);
	vec2 node811 = vec2((node699 * (1.0 + ns_rand1(43.152))), 43.152);
	vec2 node827 = vec2((node699 * (1.0 + ns_rand1(47.4672))), 47.4672);
	float node839 = (u_off * 4.0);
	vec2 node848 = vec2((node699 * (1.0 + ns_rand1(51.782399999999996))), 51.782399999999996);
	vec3 node484 = ((vec3(((node489 * gain(pow(((ns_simplex2((vec2(node697.x, node697.y) / 1.5)) * 0.5) + 0.5), 1.0), 2.0)) + (mod(floor((node680 + (node68 * 16.0))), 2.0) * gain(pow(((ns_simplex2((vec2(node717.x, node717.y) / 1.5)) * 0.5) + 0.5), 1.0), 2.0))), (((node294_out0 * gain(pow(((ns_simplex2((vec2(node734.x, node734.y) / 1.5)) * 0.5) + 0.5), 1.0), 2.0)) + ((((abs(n11(node747_out0)) * gain(pow(((ns_simplex2((vec2(node761.x, node761.y) / 1.5)) * 0.5) + 0.5), 1.0), 2.0)) * -1.0) * gain(pow(((ns_simplex2((vec2(node776.x, node776.y) / 1.5)) * 0.5) + 0.5), 1.0), 2.0)) * 4.0)) + ((node219 * gain(pow(((ns_simplex2((vec2(node792.x, node792.y) / 1.5)) * 0.5) + 0.5), 1.0), 2.0)) * 4.0)), (((node294_out0 * 0.2) + (node802 * gain(pow(((ns_simplex2((vec2(node811.x, node811.y) / 1.5)) * 0.5) + 0.5), 1.0), 2.0))) + ((node212 * gain(pow(((ns_simplex2((vec2(node827.x, node827.y) / 1.5)) * 0.5) + 0.5), 1.0), 2.0)) * 0.2))) + (vec3(0.0, 0.0, (sin(((node839 * 3.141592653589793) * 2.0)) * gain(pow(((ns_simplex2((vec2(node848.x, node848.y) / 1.5)) * 0.5) + 0.5), 1.0), 2.0))) * 0.5)) * mix(0.25, 2.0, u_val4b));
	vec3 node861 = vec3(node484.x, node484.y, node484.z);
	vec2 node879 = vec2((node284 * (1.0 + ns_rand1(12.945599999999999))), 12.945599999999999);
	vec3 node481 = (((node484 + (ns_simplex3((vec3(node861.x, node861.y, node861.z) / 1.5)) * u_val4b)) + (vec3(0.0, (node294_out0 * gain(pow(((ns_simplex2((vec2(node879.x, node879.y) / 1.5)) * 0.5) + 0.5), 1.0), 2.0)), node286) * vec3(1.0, u_val4b, 1.0))) + vec3(node72, 0.0, 0.0));
	float node480 = node481.y;
	float node471 = (fract(((node286 * 0.25) + (ns_simplex2((vec2(float(node480), 0.0) / 1.5)) * 0.25))) * 5.0);
	float node469 = mod(floor(node471), 5.0);
	bool node468 = (node469 == 0.0);
	bool node889 = (node469 == 1.0);
	bool node891 = (node469 == 2.0);
	bool node893 = (node469 == 3.0);
	bool node895 = (node469 == 4.0);
	float node467_out0;
	if (node468) {
		node467_out0 = 0.001;
	} else if (node889) {
		node467_out0 = 0.1;
	} else if (node891) {
		node467_out0 = 0.1;
	} else if (node893) {
		node467_out0 = 4.0;
	} else if (node895) {
		node467_out0 = 0.01;
	}
	float node900 = mod((node469 + 1.0), 5.0);
	bool node899 = (node900 == 0.0);
	bool node902 = (node900 == 1.0);
	bool node903 = (node900 == 2.0);
	bool node904 = (node900 == 3.0);
	bool node905 = (node900 == 4.0);
	float node898_out0;
	if (node899) {
		node898_out0 = 0.001;
	} else if (node902) {
		node898_out0 = 0.1;
	} else if (node903) {
		node898_out0 = 0.1;
	} else if (node904) {
		node898_out0 = 4.0;
	} else if (node905) {
		node898_out0 = 0.01;
	}
	float node906 = smoothstep(0.0, 1.0, fract(node471));
	float node910_out0;
	if (node468) {
		node910_out0 = 0.001;
	} else if (node889) {
		node910_out0 = 0.1;
	} else if (node891) {
		node910_out0 = 4.0;
	} else if (node893) {
		node910_out0 = 0.2;
	} else if (node895) {
		node910_out0 = 1.0;
	}
	float node912_out0;
	if (node899) {
		node912_out0 = 0.001;
	} else if (node902) {
		node912_out0 = 0.1;
	} else if (node903) {
		node912_out0 = 4.0;
	} else if (node904) {
		node912_out0 = 0.2;
	} else if (node905) {
		node912_out0 = 1.0;
	}
	float node456 = ((mix(pcurve(node460, 0.01, 0.01), pcurve(node460, mix(node467_out0, node898_out0, node906), mix(node910_out0, node912_out0, node906)), 1.0) * mix(0.5, 1.0, 1.0)) * 0.2);
	vec3 node454 = (node7 * vec3(node456, node456, node456));
	bool node436 = (Clone_2.idx < 4.0);
	bool node443 = (Clone_3.size > 1.0);
	float node442_out0;
	if (node443) {
		node442_out0 = (float(Clone_3.idx) / (Clone_3.size - 1.0));
	} else {
		node442_out0 = 0.5;
	}
	bool node435 = (node436 || ((Clone_2.idx == 4.0) && (node442_out0 > 0.5)));
	vec3 node434_out0;
	if (node435) {
		node434_out0 = vec3((node454.x * -1.0), node454.y, node454.z);
	} else {
		node434_out0 = node454;
	}
	float node921 = mix(u_Channelshrinkjoint, 1.0, parabola(node489, 1.0));
	pos = (((((node7 + vec3(n11(node12.x), n11(node12.y), 0.0)) + (((node434_out0 + vec3((n11(node442_out0) * node456), 0.0, 0.0)) * 0.04) * vec3(node921, node921, node921))) * vec3(mix((0.5625 / (u_resx / u_resy)), 1.0, u_render), 1.0, 1.0)) * vec3(1.0, mix(1.0, 1.0, u_render), 1.0)) + vec3(0.0, mix(0.06, 0.0, u_render), 0.0));
	alpha = 1.0;
	float node959 = (((1.0 - parabola(node442_out0, 0.25)) * 0.5) + 0.5);
	float node952_out0;
	if (node436) {
		node952_out0 = (1.0 - node442_out0);
	} else {
		bool node957 = (Clone_2.idx != 4.0);
		float node956_out0;
		if (node957) {
			node956_out0 = node442_out0;
		} else {
			node956_out0 = node959;
		}
		node952_out0 = node956_out0;
	}
	float node950 = mix(node952_out0, node959, u_Channelsymmetry);
	weight = mix(1.0, 10.0, clamp(((0.5 * mix(0.5, 1.0, node456)) * (1.0 + ((1.0 - node950) * 0.5))), 0.0, 1.0));
	bool node969 = (((Clone_0.idx == 0.0) && node436) || ((Clone_0.idx == 4.0) && (Clone_2.idx > 4.0)));
	vec3 node968_out0;
	if (node969) {
		node968_out0 = node7;
	} else {
		float node1007 = (node69 * 0.2);
		float node1022 = pow(node461, pow(2.0, mix((ns_simplex2((vec2(float(node69), 0.0) / 1.5)) * 2.0), (ns_simplex2((vec2(float(node286), 0.0) / 1.5)) * 2.0), 1.0)));
		float node1056 = mix(4.0, pow(2.0, (((ns_simplex2((vec2(float(((u_val3a * 0.1) + 15.0)), 0.0) / 1.5)) * 0.5) + 0.5) * 3.0)), 1.0);
		float node1054 = (pow(node1022, 1.0) * node1056);
		bool node1072 = (mod(float(floor(node1054)), 2.0) == 0.0);
		float node1071_out0;
		if (node1072) {
			node1071_out0 = 1.0;
		} else {
			node1071_out0 = 0.0;
		}
		float node1042 = ((((gain(pow((1.0 - ((cos(((node1054 * 3.141592653589793) * 2.0)) * 0.5) + 0.5)), 1.0), 1.0) * mix(1.0, node1071_out0, mix(1.0, ((((gain(((ns_simplex2((vec2(float((u_val3a + 25.0)), 0.0) / 1.5)) * 0.5) + 0.5), 4.0) * 2.0) - 1.0) * 0.5) + 0.5), 1.0))) * (1.0 + parabola(clamp((fract(((((u_off * -1.0) * 8.0) + ns_rand1(node294_out0)) + node489)) * node1056), 0.0, 1.0), 2.0))) * parabola(node442_out0, 1.2)) * parabola(node1022, 1.0));
		vec3 node1015 = (vec3(((((node211 * 6.0) + node489) + (node1022 * node802)) - node839), (node222_out0 + (node207 * 5.0)), ((node802 * 3.0) + (node950 * 0.2))) + vec3(0.0, 0.0, (node1042 * 0.5)));
		float node1014 = node1015.x;
		float node1105 = node1015.y;
		float node1107 = node1015.z;
		vec3 node1013 = vec3(node1014, node1105, (node1107 + 200.0));
		vec3 node1123 = vec3(node1014, node1105, (node1107 + 400.0));
		vec3 node1005 = vec3((node1007 + (ns_simplex3((vec3(node1013.x, node1013.y, node1013.z) / 1.5)) * 0.1)), 0.8, (0.5 + (((gain(((ns_simplex3((vec3(node1123.x, node1123.y, node1123.z) / 1.5)) * 0.5) + 0.5), 0.5) * 2.0) - 1.0) * 0.5)));
		float node1139 = node1005.z;
		bool node1144 = (node1139 < 0.5);
		float node1143_out0;
		if (node1144) {
			node1143_out0 = node1139;
		} else {
			node1143_out0 = (1.0 - node1139);
		}
		float node1138 = (node1139 + (node1005.y * node1143_out0));
		float node1154 = ((2.0 * node1139) - node1138);
		float node1001 = ((fract(node1005.x) * 360.0) / 60.0);
		float node1000 = floor(node1001);
		bool node1134 = (node1000 == 5.0);
		bool node1133 = (node1000 == 4.0);
		bool node1132 = (node1000 == 3.0);
		bool node1131 = (node1000 == 2.0);
		bool node1130 = (node1000 == 1.0);
		bool node999 = (node1000 == 0.0);
		float node1632_out0;
		if ((node1134 || node1133 || node1132 || node1131 || node1130 || node999)) {
			node1632_out0 = (node1138 - (((node1138 - node1139) * 2.0) * abs((mod(node1001, 2.0) - 1.0))));
		}
		vec3 node998_out0;
		if (node999) {
			node998_out0 = vec3(node1138, node1632_out0, node1154);
		} else if (node1130) {
			node998_out0 = vec3(node1632_out0, node1138, node1154);
		} else if (node1131) {
			node998_out0 = vec3(node1154, node1138, node1632_out0);
		} else if (node1132) {
			node998_out0 = vec3(node1154, node1632_out0, node1138);
		} else if (node1133) {
			node998_out0 = vec3(node1632_out0, node1154, node1138);
		} else if (node1134) {
			node998_out0 = vec3(node1138, node1154, node1632_out0);
		} else {
			node998_out0 = vec3(node1154, node1154, node1154);
		}
		vec3 node1177 = vec3(node1014, node1105, node1107);
		float node1163 = gain((1.0 - pow(((((gain(((ns_simplex3((vec3(node1177.x, node1177.y, node1177.z) / 1.5)) * 0.5) + 0.5), 1.0) * 2.0) - 1.0) * 0.5) + 0.5), 3.0)), 1.7);
		vec3 node1201 = vec3(node1014, node1105, (node1107 + 300.0));
		float node1194 = (0.33 + (ns_simplex3((vec3(node1201.x, node1201.y, node1201.z) / 1.5)) * 0.2));
		vec3 node1192 = vec3((node1007 + node1194), 0.5, 0.5);
		float node1215 = node1192.z;
		bool node1220 = (node1215 < 0.5);
		float node1219_out0;
		if (node1220) {
			node1219_out0 = node1215;
		} else {
			node1219_out0 = (1.0 - node1215);
		}
		float node1214 = (node1215 + (node1192.y * node1219_out0));
		float node1230 = ((2.0 * node1215) - node1214);
		float node1188 = ((fract(node1192.x) * 360.0) / 60.0);
		float node1187 = floor(node1188);
		bool node1210 = (node1187 == 5.0);
		bool node1209 = (node1187 == 4.0);
		bool node1208 = (node1187 == 3.0);
		bool node1207 = (node1187 == 2.0);
		bool node1206 = (node1187 == 1.0);
		bool node1186 = (node1187 == 0.0);
		float node1629_out0;
		if ((node1210 || node1209 || node1208 || node1207 || node1206 || node1186)) {
			node1629_out0 = (node1214 - (((node1214 - node1215) * 2.0) * abs((mod(node1188, 2.0) - 1.0))));
		}
		vec3 node1185_out0;
		if (node1186) {
			node1185_out0 = vec3(node1214, node1629_out0, node1230);
		} else if (node1206) {
			node1185_out0 = vec3(node1629_out0, node1214, node1230);
		} else if (node1207) {
			node1185_out0 = vec3(node1230, node1214, node1629_out0);
		} else if (node1208) {
			node1185_out0 = vec3(node1230, node1629_out0, node1214);
		} else if (node1209) {
			node1185_out0 = vec3(node1629_out0, node1230, node1214);
		} else if (node1210) {
			node1185_out0 = vec3(node1214, node1230, node1629_out0);
		} else {
			node1185_out0 = vec3(node1230, node1230, node1230);
		}
		vec3 node1253 = vec3(node1014, node1105, (node1107 + 10.0));
		float node1239 = gain((1.0 - pow(((((gain(((ns_simplex3((vec3(node1253.x, node1253.y, node1253.z) / 1.5)) * 0.5) + 0.5), 1.0) * 2.0) - 1.0) * 0.5) + 0.5), 3.0)), 1.7);
		vec2 node1279 = vec2(node69, 0.0);
		vec3 node1266 = vec3((node1007 - node1194), (0.5 + (((gain(((ns_simplex2((vec2(node1279.x, node1279.y) / 1.5)) * 0.5) + 0.5), 0.25) * 2.0) - 1.0) * 0.5)), 0.0);
		float node1290 = node1266.z;
		bool node1295 = (node1290 < 0.5);
		float node1294_out0;
		if (node1295) {
			node1294_out0 = node1290;
		} else {
			node1294_out0 = (1.0 - node1290);
		}
		float node1289 = (node1290 + (node1266.y * node1294_out0));
		float node1305 = ((2.0 * node1290) - node1289);
		float node1262 = ((fract(node1266.x) * 360.0) / 60.0);
		float node1261 = floor(node1262);
		bool node1285 = (node1261 == 5.0);
		bool node1284 = (node1261 == 4.0);
		bool node1283 = (node1261 == 3.0);
		bool node1282 = (node1261 == 2.0);
		bool node1281 = (node1261 == 1.0);
		bool node1260 = (node1261 == 0.0);
		float node1626_out0;
		if ((node1285 || node1284 || node1283 || node1282 || node1281 || node1260)) {
			node1626_out0 = (node1289 - (((node1289 - node1290) * 2.0) * abs((mod(node1262, 2.0) - 1.0))));
		}
		vec3 node1259_out0;
		if (node1260) {
			node1259_out0 = vec3(node1289, node1626_out0, node1305);
		} else if (node1281) {
			node1259_out0 = vec3(node1626_out0, node1289, node1305);
		} else if (node1282) {
			node1259_out0 = vec3(node1305, node1289, node1626_out0);
		} else if (node1283) {
			node1259_out0 = vec3(node1305, node1626_out0, node1289);
		} else if (node1284) {
			node1259_out0 = vec3(node1626_out0, node1305, node1289);
		} else if (node1285) {
			node1259_out0 = vec3(node1289, node1305, node1626_out0);
		} else {
			node1259_out0 = vec3(node1305, node1305, node1305);
		}
		float node1314 = gain(1.0, 1.7);
		float node1328 = (u_val3a * 0.3);
		float node1337 = node481.x;
		float node1339 = node481.z;
		vec3 node1336 = vec3(node1337, node480, (node1339 + 14.0));
		float node1350 = (node1339 + 20.0);
		vec3 node1349 = vec3(node1337, node480, node1350);
		float node1345 = ns_simplex3((vec3(node1349.x, node1349.y, node1349.z) / 1.5));
		vec3 node1365 = vec3(node1337, node480, (node1339 + 10.0));
		vec3 node1326 = vec3((node1328 + (((ns_simplex3((vec3(node1336.x, node1336.y, node1336.z) / 1.5)) * 0.5) + 0.5) * 0.1)), ((node1345 * 0.5) + 0.5), (0.5 + (((gain(((ns_simplex3((vec3(node1365.x, node1365.y, node1365.z) / 1.5)) * 0.5) + 0.5), 1.0) * 2.0) - 1.0) * 0.5)));
		float node1378 = node1326.z;
		bool node1383 = (node1378 < 0.5);
		float node1382_out0;
		if (node1383) {
			node1382_out0 = node1378;
		} else {
			node1382_out0 = (1.0 - node1378);
		}
		float node1377 = (node1378 + (node1326.y * node1382_out0));
		float node1393 = ((2.0 * node1378) - node1377);
		float node1322 = ((fract(node1326.x) * 360.0) / 60.0);
		float node1321 = floor(node1322);
		bool node1373 = (node1321 == 5.0);
		bool node1372 = (node1321 == 4.0);
		bool node1371 = (node1321 == 3.0);
		bool node1370 = (node1321 == 2.0);
		bool node1369 = (node1321 == 1.0);
		bool node1320 = (node1321 == 0.0);
		float node1623_out0;
		if ((node1373 || node1372 || node1371 || node1370 || node1369 || node1320)) {
			node1623_out0 = (node1377 - (((node1377 - node1378) * 2.0) * abs((mod(node1322, 2.0) - 1.0))));
		}
		vec3 node1319_out0;
		if (node1320) {
			node1319_out0 = vec3(node1377, node1623_out0, node1393);
		} else if (node1369) {
			node1319_out0 = vec3(node1623_out0, node1377, node1393);
		} else if (node1370) {
			node1319_out0 = vec3(node1393, node1377, node1623_out0);
		} else if (node1371) {
			node1319_out0 = vec3(node1393, node1623_out0, node1377);
		} else if (node1372) {
			node1319_out0 = vec3(node1623_out0, node1393, node1377);
		} else if (node1373) {
			node1319_out0 = vec3(node1377, node1393, node1623_out0);
		} else {
			node1319_out0 = vec3(node1393, node1393, node1393);
		}
		vec3 node1415 = (node481 + vec3(0.0, 0.0, node1042));
		float node1414 = node1415.x;
		float node1417 = node1415.y;
		float node1418 = node1415.z;
		vec3 node1413 = vec3(node1414, node1417, node1418);
		float node1404 = gain(pow((1.0 - ((ns_simplex3((vec3(node1413.x, node1413.y, node1413.z) / 1.5)) * 0.5) + 0.5)), 2.0), 1.0);
		float node1402 = gain((1.0 - node1404), 1.7);
		float node1434 = (gain(u_val3b, 1.0) * 0.5);
		vec3 node1444 = vec3(node1337, node480, ((node1350 + u_val3a) + 20.0));
		float node1438 = ((ns_simplex3((vec3(node1444.x, node1444.y, node1444.z) / 1.5)) * 0.5) + 0.5);
		float node1459 = (((gain(((node1345 * 0.5) + 0.5), 1.0) * 2.0) - 1.0) * 0.2);
		vec3 node1432 = vec3((node1328 + node1434), pow(node1438, 2.0), (pow(((ns_simplex2((vec2(float((u_val3a + 30.0)), 0.0) / 1.5)) * 0.5) + 0.5), 1.0) + node1459));
		float node1474 = node1432.z;
		bool node1479 = (node1474 < 0.5);
		float node1478_out0;
		if (node1479) {
			node1478_out0 = node1474;
		} else {
			node1478_out0 = (1.0 - node1474);
		}
		float node1473 = (node1474 + (node1432.y * node1478_out0));
		float node1489 = ((2.0 * node1474) - node1473);
		float node1428 = ((fract(node1432.x) * 360.0) / 60.0);
		float node1427 = floor(node1428);
		bool node1469 = (node1427 == 5.0);
		bool node1468 = (node1427 == 4.0);
		bool node1467 = (node1427 == 3.0);
		bool node1466 = (node1427 == 2.0);
		bool node1465 = (node1427 == 1.0);
		bool node1426 = (node1427 == 0.0);
		float node1620_out0;
		if ((node1469 || node1468 || node1467 || node1466 || node1465 || node1426)) {
			node1620_out0 = (node1473 - (((node1473 - node1474) * 2.0) * abs((mod(node1428, 2.0) - 1.0))));
		}
		vec3 node1425_out0;
		if (node1426) {
			node1425_out0 = vec3(node1473, node1620_out0, node1489);
		} else if (node1465) {
			node1425_out0 = vec3(node1620_out0, node1473, node1489);
		} else if (node1466) {
			node1425_out0 = vec3(node1489, node1473, node1620_out0);
		} else if (node1467) {
			node1425_out0 = vec3(node1489, node1620_out0, node1473);
		} else if (node1468) {
			node1425_out0 = vec3(node1620_out0, node1489, node1473);
		} else if (node1469) {
			node1425_out0 = vec3(node1473, node1489, node1620_out0);
		} else {
			node1425_out0 = vec3(node1489, node1489, node1489);
		}
		vec3 node1508 = vec3(node1414, node1417, (node1418 + node1404));
		float node1498 = gain((1.0 - gain((1.0 - ((ns_simplex3((vec3(node1508.x, node1508.y, node1508.z) / 1.5)) * 0.5) + 0.5)), 1.0)), 1.7);
		vec3 node1521 = vec3((node1328 - node1434), pow(node1438, 1.0), (pow(((ns_simplex2((vec2(float((u_val3a + 40.0)), 0.0) / 1.5)) * 0.5) + 0.5), 2.0) + node1459));
		float node1542 = node1521.z;
		bool node1547 = (node1542 < 0.5);
		float node1546_out0;
		if (node1547) {
			node1546_out0 = node1542;
		} else {
			node1546_out0 = (1.0 - node1542);
		}
		float node1541 = (node1542 + (node1521.y * node1546_out0));
		float node1557 = ((2.0 * node1542) - node1541);
		float node1517 = ((fract(node1521.x) * 360.0) / 60.0);
		float node1516 = floor(node1517);
		bool node1537 = (node1516 == 5.0);
		bool node1536 = (node1516 == 4.0);
		bool node1535 = (node1516 == 3.0);
		bool node1534 = (node1516 == 2.0);
		bool node1533 = (node1516 == 1.0);
		bool node1515 = (node1516 == 0.0);
		float node1617_out0;
		if ((node1537 || node1536 || node1535 || node1534 || node1533 || node1515)) {
			node1617_out0 = (node1541 - (((node1541 - node1542) * 2.0) * abs((mod(node1517, 2.0) - 1.0))));
		}
		vec3 node1514_out0;
		if (node1515) {
			node1514_out0 = vec3(node1541, node1617_out0, node1557);
		} else if (node1533) {
			node1514_out0 = vec3(node1617_out0, node1541, node1557);
		} else if (node1534) {
			node1514_out0 = vec3(node1557, node1541, node1617_out0);
		} else if (node1535) {
			node1514_out0 = vec3(node1557, node1617_out0, node1541);
		} else if (node1536) {
			node1514_out0 = vec3(node1617_out0, node1557, node1541);
		} else if (node1537) {
			node1514_out0 = vec3(node1541, node1557, node1617_out0);
		} else {
			node1514_out0 = vec3(node1557, node1557, node1557);
		}
		vec3 node986 = clamp((((((clamp(((((node998_out0 * (1.0 - node1163)) + (((node1185_out0 * (1.0 - node1239)) + (node1259_out0 * node1239)) * node1163)) * (1.0 - node1314)) + (((node1319_out0 * (1.0 - node1402)) + (((node1425_out0 * (1.0 - node1498)) + (node1514_out0 * node1498)) * node1402)) * node1314)), 0.0, 1.0) * mix(0.0, 1.0, gain(parabola(node489, 0.5), 1.0))) * mix(1.0, smoothstep(1.0, 0.8, node489), node392)) * mix(1.0, gain(pow(node489, 1.0), 2.0), node392)) * mix(1.0, pow(node489, 0.75), node392)) * mix(0.0, 1.0, smoothstep(-1.3, -0.1, node7.y))), 0.0, 1.0);
		vec2 node985 = node986.yz;
		float node983 = gain(node985.y, 1.7);
		float node982 = (1.0 - node983);
		float node1584 = gain(node985.x, 1.7);
		float node1583 = (1.0 - node1584);
		float node1593 = gain(node986.x, 1.7);
		node968_out0 = ((((((node7 * node982) + (vec3(1.0, 1.0, 0.0) * node983)) * node1583) + (((vec3(1.0, 0.0, 0.0) * node982) + (vec3(1.0, 0.5, 0.0) * node983)) * node1584)) * (1.0 - node1593)) + (((((vec3(0.0, 0.0, 1.0) * node982) + (vec3(0.0, 0.5, 1.0) * node983)) * node1583) + (((vec3(1.0, 0.0, 1.0) * node982) + (vec3(1.0, 1.0, 1.0) * node983)) * node1584)) * node1593));
	}
	hue = node968_out0.r;
	sat = node968_out0.g;
	val = node968_out0.b;
	


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
}`,I=`
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
    }`,E=`
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
    `,c=[],u=512;for(let f=0;f<u;f++)c.push(.3),c.push(0),c.push(0),c.push(1);let D={mag:n.LINEAR,min:n.LINEAR,level:0,format:n.RGBA,internalFormat:n.RGBA16F,type:n.FLOAT,width:u,height:1,src:c};const T=twgl.createTexture(n,D);twgl.setTextureFromArray(n,T,c,D);let g=288360;var y=1024,z=Math.ceil(g/y);const M=twgl.createProgramInfo(n,[s,r]),_={position:[-1,-1,0,1,-1,0,-1,1,0,-1,1,0,1,-1,0,1,1,0]},C=twgl.createBufferInfoFromArrays(n,_),X=[{mag:n.NEAREST,min:n.NEAREST,level:0,format:n.RGBA,internalFormat:n.RGBA16F,type:n.FLOAT},{mag:n.NEAREST,min:n.NEAREST,level:0,format:n.RGBA,internalFormat:n.RGBA,type:n.UNSIGNED_BYTE}];let L=twgl.createFramebufferInfo(n,X,y,z);const R=twgl.createProgramInfo(n,[I,E]);let K=[];for(let f=0;f<g;f++)K.push(f);const Z={a_idx:{numComponents:1,data:K}},Q=twgl.createBufferInfoFromArrays(n,Z);let t=0,l=0,p=0;function k(f){let N=f-t;p+=e.speed*(N/1e3)*.1;const x=o.clientWidth,v=o.clientHeight,$=1080,H=1920;e.render?(x!==$||v!==H)&&(o.width=$,o.height=H):(x!==o.width||v!==o.height)&&(o.width=x,o.height=v),i=[o.width,o.height],n.viewport(0,0,n.canvas.width,n.canvas.height),n.disable(n.BLEND),n.useProgram(M.program),twgl.setBuffersAndAttributes(n,M,C),twgl.setUniforms(M,{res:[y,z],time:f*1e3,numPoints:g,u_seed:e.seed,u_off:p,u_offset:.1,u_resx:o.width,u_resy:o.height,u_mix1:1,u_mix2:0,u_move:0,u_seed:e.seed,u_speed:.5,u_reflect:0,u_weight_high:1,u_weight_low:1,u_tex0:T,u_tx:e.tx,u_ty:e.ty,u_val1a:e.val1a,u_val1b:e.val1b,u_val2a:e.val2a,u_val2b:e.val2b,u_val3a:e.val3a,u_val3b:e.val3b,u_val4a:e.val4a,u_val4b:e.val4b,u_render:1}),twgl.setUniforms(M,Me),twgl.bindFramebufferInfo(n,L),n.drawBuffers([n.COLOR_ATTACHMENT0,n.COLOR_ATTACHMENT1,n.NONE,n.NONE]),twgl.drawBufferInfo(n,C),twgl.bindFramebufferInfo(n,null),n.useProgram(R.program),n.clearColor(0,0,0,1),n.clear(n.COLOR_BUFFER_BIT),n.enable(n.BLEND),n.blendEquation(n.MAX),n.blendFunc(n.ONE,n.ONE),twgl.setBuffersAndAttributes(n,R,Q),twgl.setUniforms(R,{tex_size:[L.width,L.height],point_size:i[1]/1024*2,pos_tex:L.attachments[0],color_tex:L.attachments[1]}),twgl.drawBufferInfo(n,Q,n.POINTS),d(l),t=f,l+=1}return k};async function ke(o,e,d,i){o.getContext("webgl2");const n=async a=>{e(a),d.progress=0,requestAnimationFrame(n)};return requestAnimationFrame(n),d}async function Oe(){const o={avaliable:!1,inside:!1,latitude:0,longitude:0};if(navigator.geolocation){o.avaliable=!0,console.log("Geolocation avaliable");try{const e=await new Promise((I,E)=>{navigator.geolocation.getCurrentPosition(I,E)}),d=e.coords.latitude,i=e.coords.longitude;console.log(`Latitude: ${d}, Longitude: ${i}`);let n=B.center_x,a=B.center_y,s=B.radius,r=Math.sqrt((d-n)*(d-n)+(i-a)*(i-a))<s;o.inside=r,o.latitude=d,o.longitude=i,o.inside?(console.log("Inside THK area"),document.getElementById("text-info").innerHTML="LOCATION: INSIDE"):(console.log("Outside THK area"),document.getElementById("text-info").innerHTML="LOCATION: OUTSIDE")}catch(e){console.error("Error retrieving location:",e),o.avaliable=!1}}return o}function qe(){const o=document.getElementById("canvas-ui"),e=o.getContext("2d"),d=document.getElementById("canvas-thk"),i=document.getElementById("slider-color"),n=document.getElementById("slider-shape");function a(t,l){w.hijack1=!1}i.addEventListener("touchstart",t=>{a()}),n.addEventListener("touchstart",t=>{a()});function s(t){let l=t.clientX,p=t.clientY;t.touches&&(l=t.touches[0].clientX,p=t.touches[0].clientY);const k=o.getBoundingClientRect();return l-=k.left,p-=k.top,{x:l,y:p}}function r(t){let l=0,p=0;const k=t.id;k=="slider-color"?(l=2,p=0):k=="slider-shape"&&(l=3,p=1);let f=!1,N=!1,x=0,v=0,$=0,H=Math.random()*100,W=H,ce=Math.random(),J=ce;l==1?(H=.5,W=.5):(H=Math.random()*100,W=H);const Pe="val"+(l+1)+"a";P[Pe]=W;const Ie="val"+(l+1)+"b";P[Ie]=ce,o.getBoundingClientRect();let h=t.getBoundingClientRect().left,b=t.getBoundingClientRect().top;function ue(A){A.preventDefault(),f=!0,V(A)}function F(A){f&&(A.preventDefault(),f=!1)}function V(A){if(!f)return;const ee=s(A);x=ee.x,v=ee.y}function Ee(){let A=window.getComputedStyle(t).opacity;if(h=t.getBoundingClientRect().left+t.clientWidth/2,b=t.getBoundingClientRect().top+t.clientHeight/2,N=f,w.hijack1){N=!0;let q=parseFloat(w.x1);p&&(q=-q),q=(q*.25-.5)*Math.PI;let ne=parseFloat(w.y1);x=h+Math.cos(q)*(ne+.001),v=b+Math.sin(q)*(ne+.001)}let ee=d.width,Y=Math.sqrt((x-h)*(x-h)+(v-b)*(v-b)),_e=Y/ee,de=(x-h)/Y,ae=(v-b)/Y,pe=Math.atan2(ae,de),j=pe-$;j>Math.PI&&(j-=Math.PI*2),j<-Math.PI&&(j+=Math.PI*2),j*=Math.pow(_e,1.3)*3,N&&(W+=j,J=Math.min(Math.max(0,_e),1)),$=pe;let ve=W*2,Ce=ve-Math.min(1,J)*Math.PI*.9,Ne=ve+Math.min(1,J)*Math.PI*.9,me=t.clientWidth/2,oe=me*.1,G=me-oe/2+12,U=G*.75,O=A;e.lineWidth=oe,e.lineCap="round",e.strokeStyle="rgba(255, 255, 255, "+.6*O+")",e.beginPath(),e.arc(h,b,G,Ce,Ne),e.stroke(),e.lineWidth=1,e.strokeStyle="rgba(255, 255, 255, "+.2*O+")",e.beginPath(),e.arc(h,b,G+oe/2,0,Math.PI*2),e.stroke();let Be=.05,Te=.05;function xe(q,ne,Se){return q+(ne-q)*Se}const le="val"+(l+1)+"a",ge="val"+(l+1)+"b";P[le]=xe(P[le],W,Be),P[ge]=xe(P[ge],J,Te),l==1&&(P.speed=P[le]),N?(e.strokeStyle="rgba(255, 255, 255, "+.3*O+")",e.beginPath(),e.arc(h,b,Math.max(Y,G+oe/2),0,2*Math.PI),e.stroke(),e.strokeStyle="rgba(255, 255, 255, "+.3*O+")",e.beginPath(),e.moveTo(h+de*G,b+ae*G),e.lineTo(h+de*Y,b+ae*Y),e.stroke(),e.strokeStyle="rgba(255, 255, 255, "+.15*O+")",e.beginPath(),e.arc(x,v,U,0,2*Math.PI),e.globalCompositeOperation="destination-out",e.fillStyle="rgba(0, 0, 0, 1)",e.fill(),e.globalCompositeOperation="source-over",e.fillStyle="rgba(255, 255, 255, "+.1*O+")",e.beginPath(),e.arc(x,v,U,0,2*Math.PI),e.fill(),e.strokeStyle="rgba(255, 255, 255, "+.33*O+")",e.lineWidth=2,e.beginPath(),e.arc(x,v,U,0,2*Math.PI),e.stroke()):(e.beginPath(),e.arc(h,b,U,0,2*Math.PI),e.globalCompositeOperation="destination-out",e.fillStyle="rgba(0, 0, 0, 1)",e.fill(),e.globalCompositeOperation="source-over",e.fillStyle="rgba(255, 255, 255, "+.1*O+")",e.beginPath(),e.arc(h,b,U,0,2*Math.PI),e.fill(),e.strokeStyle="rgba(255, 255, 255, "+.25*O+")",e.lineWidth=2,e.beginPath(),e.arc(h,b,U,0,2*Math.PI),e.stroke())}return t.addEventListener("mousedown",ue,!1),t.addEventListener("mousemove",V,!1),t.addEventListener("mouseup",F,!1),o.addEventListener("mousemove",V,!1),o.addEventListener("mouseup",F,!1),t.addEventListener("touchstart",ue,!1),t.addEventListener("touchmove",V,!1),t.addEventListener("touchend",F,!1),t.addEventListener("touchcancel",F,!1),o.addEventListener("touchmove",V,!1),o.addEventListener("touchend",F,!1),o.addEventListener("touchcancel",F,!1),Ee}const I=r(i),E=r(n);let c=!1,u=0,D=0,T=0,g=0,y=0,z=0,M=.01;function _(t,l,p){return t+(l-t)*p}function C(t){t.preventDefault(),c=!0;let l=s(t);T=l.x,g=l.y,u=T,D=g,L(t)}function X(t){c&&(t.preventDefault(),c=!1)}function L(t){if(!c)return;t.preventDefault();const l=s(t);T=l.x,g=l.y}o.addEventListener("mousedown",C,!1),o.addEventListener("mousemove",L,!1),o.addEventListener("mouseup",X,!1),o.addEventListener("touchstart",C,!1),o.addEventListener("touchmove",L,!1),o.addEventListener("touchend",X,!1),o.addEventListener("touchcancel",X,!1);const R=document.getElementById("onb-arrow");let K=R.getBoundingClientRect().top,Z=0;function Q(){const t=d.clientWidth,l=d.clientHeight;(t!==o.width||l!==o.height)&&(o.width=t,o.height=l);let p=R.getBoundingClientRect().top;Z=K-p,K=p,w.hijack_arrow&&(z=-Z/o.height*.66*window.getComputedStyle(R).opacity),e.clearRect(0,0,o.width,o.height);let k=0;e.fillStyle=e.fillStyle="rgba(0, 0, 0, "+k*.5+")",e.fillRect(0,0,o.width,o.height),I(),E();let f=0,N=0;if(c){f=T-u,N=g-D;let v=o.height;f=f/v,N=N/v,y=_(y,f,1),z=_(z,N*.2,.5)}else y=_(y,0,M),z=_(z,0,M);P.tx+=y,P.ty+=z,u=T,D=g;let x=fe.progress;e.fillStyle="rgba(255, 255, 255, "+.5+")",e.fillRect(0,o.height-8,o.width*x,8)}return Q}function S(o){o.style.pointerEvents="all",o.style.opacity="1"}function m(o){o.style.pointerEvents="none",o.style.opacity="0"}function ye(o){o.style.opacity="1"}function se(o){o.style.opacity="0"}function De(o){let e=.66,d=10;o.style.transform=`translateY(-${d}%) scale(${e}) `,o.style.border="1px solid #666"}function he(o){let e=1,d=0;o.style.transform=`translateY(-${d}%) scale(${e}) `,o.style.border="1px solid #000"}function re(){const o=document.getElementById("canvas-thk"),e=document.getElementById("butt-info"),d=document.getElementById("butt-save"),i=document.getElementById("butt-sync"),n=document.getElementById("butt-continue"),a=document.getElementById("butt-download"),s=document.getElementById("onb-butt"),r=document.getElementById("textbox-onb"),I=document.getElementById("slider-color"),E=document.getElementById("slider-shape"),c=document.getElementById("onb-fade");B.show_time=null,document.getElementById("timer_text").style.opacity=0,m(s),se(r),m(n),m(a),S(e),S(d),S(i),S(I),S(E),se(c),he(o)}function Ae(o){const e=document.getElementById("canvas-thk"),d=document.getElementById("butt-info"),i=document.getElementById("butt-save"),n=document.getElementById("butt-sync"),a=document.getElementById("slider-color"),s=document.getElementById("slider-shape"),r=document.getElementById("onb-fade");m(d),m(i),m(n),m(a),m(s),se(r),De(e)}function Re(){const o=document.getElementById("canvas-thk"),e=document.getElementById("butt-info"),d=document.getElementById("butt-save"),i=document.getElementById("butt-sync"),n=document.getElementById("butt-continue"),a=document.getElementById("butt-download"),s=document.getElementById("onb-butt"),r=document.getElementById("textbox-onb"),I=document.getElementById("slider-color"),E=document.getElementById("slider-shape"),c=document.getElementById("onb-fade");B.show_time=null,document.getElementById("timer_text").style.opacity=0,S(s),ye(r),m(n),m(a),m(e),m(d),m(i),m(I),m(E),ye(c),he(o)}function be(){const o=document.getElementById("butt-continue"),e=document.getElementById("butt-download");S(o),S(e)}function He(){let o=B.show_time,e=document.getElementById("timer_text"),d="";if(o!=null){let i=new Date().getTime(),n=o-i,a=B.show_len;if(n>0){e.style.opacity=.75;let s=Math.floor(n/6e4),r=Math.floor(n%6e4/1e3);s.toString(),r.toString(),s<1?d=`Your entity will be displayed in THK tower in ${r}s`:d=`Your entity will be displayed in THK tower in ${s}m ${r}s`}else n>-a?(d="Your entity is being displayed now",e.style.opacity=1):(d="Your entity has been displayed",e.style.opacity=.5)}e.innerHTML=d}function ie(o){const e=document.getElementById("onb-butt");e.innerHTML=o}const We="TUTORIAL",Fe="NEXT",Ye="START";function je(){document.getElementById("onb-fade"),document.getElementById("butt-info"),document.getElementById("butt-save"),document.getElementById("butt-sync");const o=document.getElementById("onb-header"),e=document.getElementById("onb-body"),d=document.getElementById("onb-butt"),i="THK SYNC",n="CREATE THK DESIGN AND SEND IT TO THK TOWER",a="CREATE",s="DRAG & ROTATE CONTROLS TO ADJUST SHAPE & COLOR",r="EXPLORE",I="SCROLL TO FIND THE DESIGN THAT RESONATES WITH YOU",E="SEND",c="CLICK 'SYNC' AND WATCH YOUR DESIGN ON THE TOWER. DON'T FORGET TO FILM AND SHARE";let u=0;function D(_){switch(_){case 0:o.innerHTML=i,o.innerHTML=o.textContent.replace(/\S/g,"<span class='letter'>$&</span>"),e.innerHTML=n,e.innerHTML=e.textContent.replace(/\S/g,"<span class='letter'>$&</span>");break;case 1:o.innerHTML=a,o.innerHTML=o.textContent.replace(/\S/g,"<span class='letter'>$&</span>"),e.innerHTML=s,e.innerHTML=e.textContent.replace(/\S/g,"<span class='letter'>$&</span>");break;case 2:o.innerHTML=r,o.innerHTML=o.textContent.replace(/\S/g,"<span class='letter'>$&</span>"),e.innerHTML=I,e.innerHTML=e.textContent.replace(/\S/g,"<span class='letter'>$&</span>");break;case 3:o.innerHTML=E,o.innerHTML=o.textContent.replace(/\S/g,"<span class='letter'>$&</span>"),e.innerHTML=c,e.innerHTML=e.textContent.replace(/\S/g,"<span class='letter'>$&</span>");break}}function T(){re()}let g=anime({targets:w,y1:[0,200],easing:"easeInOutQuad",duration:1e3,delay:200}),y=anime({loop:!0,direction:"alternate",targets:w,x1:[0,1],y1:[200,150],easing:"easeInOutSine",duration:1e3,delay:0});function z(){if(console.log("next page",u),u==0&&ie(We),u>0&&u<3&&ie(Fe),u==3&&ie(Ye),u>3)T();else{if(D(u),u==1){let _=document.getElementById("slider-color"),C=document.getElementById("slider-shape");S(_),S(C),w.hijack1=!0,w.y1=0,w.x1=0,g.play(),setTimeout(()=>{y.play()},1200)}else w.hijack1=!1,g.restart(),y.restart(),g.pause(),y.pause();if(u==2){const _=document.getElementById("onb-arrow");_.style.opacity="0.5",w.hijack_arrow=!0,anime.timeline({loop:!0,direction:"alternate"}).add({targets:"#onb-arrow",translateY:[-100,100],easing:"easeInOutSine",duration:1e3,delay:0})}else{const _=document.getElementById("onb-arrow");_.style.opacity="0.0",w.hijack_arrow=!1}document.querySelectorAll(".letter").forEach(_=>{_.style.opacity="0"}),anime.timeline({loop:!1}).add({targets:"#onb-header .letter",opacity:[0,1],easing:"easeInOutQuad",duration:100,delay:(_,C)=>50*(C+1)}).add({targets:"#onb-body .letter",opacity:[0,1],easing:"easeInOutQuad",duration:100,delay:(_,C)=>30*(C+1)})}u+=1}function M(){u=0,Re(),z(),anime({targets:"#onb-butt",opacity:[0,1],easing:"easeInOutQuad",duration:1e3,delay:500})}return d.addEventListener("click",function(){z()}),M}const Ge=je();Oe();const we=document.getElementById("canvas-thk"),Ue=document.getElementById("butt-sync");Ue.addEventListener("click",function(){{const o=P;fetch(B.server,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)}).then(e=>e.json()).then(e=>{console.log("Success:",e);let d=e.time*1e3,i=e.length*1e3;B.show_time=d,B.show_len=i,te()}).catch(e=>{console.error("Error:",e),te()})}});const Xe=qe();function Ke(){Xe(),He()}const $e=Le(we,P,Ke);ke(we,$e,fe);const ze=document.getElementById("butt-save");ze.addEventListener("click",function(){te()});document.getElementById("butt-download");ze.addEventListener("click",function(){te()});const Ve=document.getElementById("butt-info");Ve.addEventListener("click",function(){Ge()});const Ze=document.getElementById("butt-continue");Ze.addEventListener("click",function(){re()});function Qe(){let o=new Date().getTime()+5e3;B.show_time=o,be()}function te(){fe.callback=Qe,Ae(),be()}re();
