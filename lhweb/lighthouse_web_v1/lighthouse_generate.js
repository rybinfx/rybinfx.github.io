
async function computeRMSLevels(audioUrl) {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const response = await fetch(audioUrl);
  const audioData = await response.arrayBuffer();
  const audioBuffer = await audioContext.decodeAudioData(audioData);

  const sampleRate = audioBuffer.sampleRate;
  const samplesPerSegment = Math.floor(audioBuffer.length / 512);
  const rmsArray = new Float32Array(512);

  for (let i = 0; i < 512; i++) {
    const startSample = i * samplesPerSegment;
    const endSample = startSample + samplesPerSegment;
    let sumSquares = 0;

    for (let j = startSample; j < endSample; j++) {
      const sample = audioBuffer.getChannelData(0)[j]; // Assuming mono audio for simplicity
      sumSquares += sample * sample;
    }

    const rms = Math.sqrt(sumSquares / samplesPerSegment);
    rmsArray[i] = rms;
  }

  // Normalize the RMS values to the range [0, 1]
  const maxRMS = Math.max(...rmsArray);
  for (let i = 0; i < rmsArray.length; i++) {
    rmsArray[i] /= maxRMS;
  }

  return rmsArray;
}

const lighthouse_generate = async (canvas, audioUrl, callback) => {

    const RMSLevels = await computeRMSLevels(audioUrl);

    const params = {
      seed: Math.random()
    }

    let res = [canvas.width, canvas.height];

    function rand(seed){return (Math.abs(Math.sin(seed) * 43758.5453123)%1);}
    
    const gl = canvas.getContext("webgl2", { antialias: true });
    if (!gl) { alert("Please use browser with WebGL2 support"); }
    var floatTextures = gl.getExtension("EXT_color_buffer_float");
    if (!floatTextures) { alert('Please use browser with Floating Point support'); }
    
    const vertex_shader = `
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
    `;
    
    const fragment_shader = `#version 300 es
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
uniform float u_seed;
uniform float u_var;
uniform float u_invert;
uniform float u_offset;
uniform float u_special;


#define PI 3.1415926538

float rand(float n){return fract(sin(n) * 43758.5453123);}
float rand2(float x, float y){return fract(sin(dot(vec2(x,y), vec2(12.9898,78.233))) * 43758.5453123);}


////////////////////////////////////////////////////////////////////////////////////
// Random
////////////////////////////////////////////////////////////////////////////////////
float ns_rand1(float n){return fract(sin(n) * 43758.5453123);}
float ns_rand2(float x, float y){return fract(sin(dot(vec2(x,y), vec2(12.9898,78.233))) * 43758.5453123);}
////////////////////////////////////////////////////////////////////////////////////


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


vec3 hsv2rgb(vec3 c)
{
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}
vec3 hsv_to_rgb(vec3 color) {
    // Translates HSV color to RGB color
    // H: 0.0 - 360.0, S: 0.0 - 100.0, V: 0.0 - 100.0
    // R, G, B: 0.0 - 1.0

    float hue = color.x;
    float saturation = color.y;
    float value = color.z;

    float c = (value/100.0) * (saturation/100.0);
    float x = c * (1.0 - abs(mod(hue/60.0, 2.0) - 1.0));
    float m = (value/100.0) - c;

    float r = 0.0;
    float g = 0.0;
    float b = 0.0;
    
    if (hue >= 0.0 && hue < 60.0) {
        r = c;
        g = x;
        b = 0.0;
    } else if (hue >= 60.0 && hue < 120.0) {
        r = x;
        g = c;
        b = 0.0;
    } else if (hue >= 120.0 && hue < 180.0) {
        r = 0.0;
        g = c;
        b = x;
    } else if (hue >= 180.0 && hue < 240.0) {
        r = 0.0;
        g = x;
        b = c;
    } else if (hue >= 240.0 && hue < 300.0) {
        r = x;
        g = 0.0;
        b = c;
    } else if (hue >= 300.0 && hue < 360.0) {
        r = c;
        g = 0.0;
        b = x;
    }

    r += m;
    g += m;
    b += m;

    return vec3(r, g, b);
}

vec3 rgb_to_hsv(vec3 color) {
    // Translates RGB to HSV
    // R, G, B: 0.0 - 1.0
    // H: 0.0 - 360.0, S: 0.0 - 100.0, V: 0.0 - 100.0

    float cmax = max(color.r, max(color.g, color.b));
    float cmin = min(color.r, min(color.g, color.b));
    float delta = cmax - cmin;

    float hue = 0.0;
    float saturation = 0.0;
    float value = 0.0;

    // Hue calculation
    if (delta == 0.0) {
        hue = 0.0;
    } else if (cmax == color.r) {
        hue = 60.0 * mod((color.g - color.b)/delta, 6.0);
    } else if (cmax == color.g) {
        hue = 60.0 * ((color.b - color.r)/delta + 2.0);
    } else {
        hue = 60.0 * ((color.r - color.b)/delta + 4.0);
    }

    // Saturation calculation
    if (cmax == 0.0) {
        saturation = 0.0;
    } else {
        saturation = delta/cmax;
    }

    // Value
    value = cmax;

    return vec3(hue, saturation, value);
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
	Seg Clone_0 = seg_even(float(point), float(npoints), float(2));
	Seg Clone_1 = seg_even(float(Clone_0.point), float(Clone_0.npoints), float(1));
	Seg Clone_2 = seg_even(float(Clone_1.point), float(Clone_1.npoints), float(256));
	Seg Clone_3 = seg_even(float(Clone_2.point), float(Clone_2.npoints), float(32));
	

	// Main Code Defs
	float node23 = (float(((u_off * 0.1) * 4.0)) * Clone_2.size);
	float node19 = float((Clone_2.idx + fract(node23)));
	bool node14 = (Clone_2.size > 1.0);
	bool node17 = (!node14);
	float node13_out0;
	if (node14) {
		node13_out0 = (node19 / Clone_2.size);
	} else {
		node13_out0 = fract((node19 + 0.5));
	}
	float node46 = float((Clone_2.idx - floor(node23)));
	float node44_out0;
	if (node14) {
		node44_out0 = (node46 / Clone_2.size);
	} else {
		node44_out0 = fract((node46 + 0.5));
	}
	float node58 = float(Clone_1.idx);
	bool node54 = (Clone_1.size > 1.0);
	float node53_out0;
	if (node54) {
		node53_out0 = (node58 / (Clone_1.size - 1.0));
	} else {
		node53_out0 = 0.5;
	}
	float node42 = (node44_out0 + (node53_out0 * 0.3));
	float node38 = texture(u_tex0, vec2(node42, 0.0)).x;
	vec3 node37 = vec3(node38, texture(u_tex0, vec2((node42 - 0.5), 0.0)).x, node38);
	float node36 = node37.x;
	bool node69 = (Clone_3.size > 1.0);
	float node68_out0;
	if (node69) {
		node68_out0 = (float(Clone_3.idx) / (Clone_3.size - 1.0));
	} else {
		node68_out0 = 0.5;
	}
	float node80 = node37.y;
	vec3 node8 = (vec3(0.0, n11(node13_out0), 0.0) + (vec3((node36 * pow(node68_out0, 0.5)), (((n11(node80) * -1.0) * node68_out0) * 0.3), 0.0) * parabola(node13_out0, 2.0)));
	vec2 node6 = rot2(node8.xz, (node80 * n11(node68_out0)));
	vec3 node4 = vec3(node6.x, node8.y, node6.y);
	bool node94 = (Clone_0.size > 1.0);
	float node93_out0;
	if (node94) {
		node93_out0 = (float(Clone_0.idx) / (Clone_0.size - 1.0));
	} else {
		node93_out0 = 0.5;
	}
	node4.x = (node4.x * ((node93_out0 * 2.0) - 1.0));
	pos = (node4 * 0.8);
	alpha = min(smoothstep(0.0, 0.05, node13_out0), smoothstep(1.0, 0.95, node13_out0));
	weight = 2.0;
	hue = ((1.0 - (pow(node80, 0.5) * 0.2)) + ns_rand1(u_seed));
	sat = (1.0 - pow(node36, 0.5));
	val = ((pow(node68_out0, 1.0) * mix(0.5, 2.0, node36)) * (1.0 - (node58 / Clone_1.size)));
	


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

	vec3 color = hsv2rgb(pdata.hsv);
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
}`;
    
    const vertex_shader2 = `
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
        color.a *= 0.5;
        color.a = min(color.a, 1.0);
        v_color = color;
        gl_Position = pos;
        gl_PointSize = ps;
    }`;
    
    const fragment_shader2 = `
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
        float u_fade = 1.0;
        float fade = mix(0.001, 1.0, clamp(u_fade, 0.0, 1.0));
        float mask = smoothstep(1.0, 1.0-fade, dist);
        color.a *= mask;
        FragColor = color;
    }
    `;
    
    // Array for input texture
    const intex = [];
    const intexs = RMSLevels.length;
    for (let i = 0; i < intexs; i++) {
      intex.push(RMSLevels[i]);
      intex.push(0);
      intex.push(0);
      intex.push(1);
    }
    // Input texture
    let inTexInfo = {
      mag: gl.LINEAR,
      min: gl.LINEAR,
      level: 0,
      format: gl.RGBA,
      internalFormat: gl.RGBA16F,
      type: gl.FLOAT,
      width: intexs,
      height: 1,
      src: intex,
    };
    const inTex = twgl.createTexture(gl, inTexInfo);
    twgl.setTextureFromArray(gl, inTex, intex, inTexInfo);
    // 'Generate' program
    let numPoints = 16384;
    var fboWidth = 256;
    var fboHeight = Math.ceil(numPoints/fboWidth);
    const programInfo = twgl.createProgramInfo(gl, [vertex_shader, fragment_shader]);
    const arrays = {
      position: [
        -1, -1, 0, 
        1, -1, 0, 
        -1, 1, 0, 
        -1, 1, 0, 
        1, -1, 0, 
        1, 1, 0],
    };
    const bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays);
    const attachments = [
    {
      mag: gl.NEAREST,
      min: gl.NEAREST,
      level: 0,
      format: gl.RGBA,
      internalFormat: gl.RGBA16F,
      type: gl.FLOAT
    },
    {
      mag: gl.NEAREST,
      min: gl.NEAREST,
      level: 0,
      format: gl.RGBA,
      internalFormat: gl.RGBA16F,
      type: gl.FLOAT
    },
    ]
    let fbo = twgl.createFramebufferInfo(gl, attachments, fboWidth, fboHeight);
    // 'Render' program
    const programInfo2 = twgl.createProgramInfo(gl, [vertex_shader2, fragment_shader2]);
    let indices = [];
    for (let i = 0; i < numPoints; i++) {
      indices.push(i);
    }
    const arrays2 = {
      a_idx: { numComponents: 1, data: indices},
    };
    const bufferInfo2 = twgl.createBufferInfoFromArrays(gl, arrays2);

        
    // Render loop
    
    let time0 = 0;
    let frame = 0;

    function render(time) {
      
      let tpassed = (time-time0);
      if (tpassed >= 1000/61) {
          let fps = Math.floor((1000/tpassed));
          // console.log(fps);
          gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

          // Render positions
          gl.disable(gl.BLEND);
          gl.useProgram(programInfo.program);
          twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo);
          twgl.setUniforms(programInfo, {
            res: [fboWidth, fboHeight],
            time: time*1000,
            numPoints: numPoints,
            u_seed: params.seed,
            u_off: frame/60,
            u_offset: 0.1,
            u_var: 0.0,
            u_tex0: inTex,
          });
          twgl.bindFramebufferInfo(gl, fbo);
          gl.drawBuffers([
            gl.COLOR_ATTACHMENT0,
            gl.COLOR_ATTACHMENT1,
            gl.NONE,
            gl.NONE,
          ]);
          twgl.drawBufferInfo(gl, bufferInfo);
    
          // Draw points
          twgl.bindFramebufferInfo(gl, null);
          gl.useProgram(programInfo2.program);
          gl.clearColor(0.0, 0.0, 0.0, 1.0);
          gl.clear(gl.COLOR_BUFFER_BIT);
          gl.enable(gl.BLEND);
          gl.blendEquation(gl.MAX);
          gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
          twgl.setBuffersAndAttributes(gl, programInfo2, bufferInfo2);
          twgl.setUniforms(programInfo2, {
            tex_size: [fbo.width, fbo.height],
            point_size: res[0]/1024*2,
            pos_tex: fbo.attachments[0],
            color_tex: fbo.attachments[1]
          });
          twgl.drawBufferInfo(gl, bufferInfo2, gl.POINTS);

          callback(frame);
          
          // Update time
          time0 = time;
          frame += 1;
        }
    
        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
}

