#define PI 3.1415926538

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



