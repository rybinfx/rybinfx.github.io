const canvas = document.getElementById("canvas");
const gl = canvas.getContext("webgl");


function loadTex(gl, src) {
    return new Promise((res, rej) => {
      const img = new Image();
      img.crossOrigin = "";
      img.onload = () => res(twgl.createTexture(gl, { src: img, mag: gl.LINEAR, min: gl.LINEAR }));
      img.onerror = rej;
      img.src = src;
    });
  }

function makeBufferInfo(gl) {
    const arrays = {
        position: [
            -1, -1,  0, 
             1, -1,  0, 
            -1,  1,  0, 
            -1,  1,  0, 
             1, -1,  0, 
             1,  1,  0 
        ],
    };
    const bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays);
    return bufferInfo;
}
const bufferInfo = makeBufferInfo(gl);


function makeFbo(gl, width, height) {
    const attachments = [
        {
            mag: gl.LINEAR,
            min: gl.LINEAR,
            level: 0,
            format: gl.RGBA,
            internalFormat: gl.RGBA,
            type: gl.UNSIGNED_BYTE,
            width: width,
            height: height,
        }
    ]
    const fbo = twgl.createFramebufferInfo(gl, attachments, width, height);
    return fbo;
}



function draw(program, fbo, uniforms) {
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.useProgram(program.program);
    twgl.setBuffersAndAttributes(gl, program, bufferInfo);
    twgl.setUniforms(program, uniforms);
    twgl.bindFramebufferInfo(gl, fbo);
    twgl.drawBufferInfo(gl, bufferInfo);
}



// Build

let width = 1024;
let height = 1024;

const imageFbo = makeFbo(gl, width, height);
const blurFbo = makeFbo(gl, width, height);
const displaceMapFbo = makeFbo(gl, width, height);
const displaceFbo = makeFbo(gl, width, height);

// const imageBlurFbo = makeFbo(gl, width, height);
// const maskMapFbo = makeFbo(gl, width, height);

const blitProgram = twgl.createProgramInfo(gl, [vertex_shader, blit_shader]);
const blurProgram = twgl.createProgramInfo(gl, [vertex_shader, blur_shader]);
const displaceProgram = twgl.createProgramInfo(gl, [vertex_shader, displace_shader]);
const mapProgram = twgl.createProgramInfo(gl, [vertex_shader, map_shader]);
// const maskProgram = twgl.createProgramInfo(gl, [vertex_shader, mask_shader]);




// Initialize

let initialized = false;
let sourceTex;
let depthTex;

let time = 0;
let seed = Math.random();

let tex_index = Math.floor(Math.random()*23)+1;
let index_str = tex_index.toString().padStart(5, '0');
let source_path = `./tex/source_${index_str}.jpg`;
let depth_path = `./tex/depth_${index_str}.jpg`;

Promise.all([
    loadTex(gl, source_path),
    loadTex(gl, depth_path)
  ]).then(([source, depth]) => {
    initialized = true;
    sourceTex = source;
    depthTex = depth;
    draw(blitProgram, imageFbo, { tex: source });
    requestAnimationFrame(update);
  });




function update() {
    if (!initialized) return;

    draw(blurProgram, blurFbo, {
        tex: imageFbo.attachments[0], 
        res: [width, height],
        size: 4.0,
    });

    draw(mapProgram, displaceMapFbo, {
        source: sourceTex,
        depth: depthTex,
        image: blurFbo.attachments[0],
        time: time*0.1 + seed*1000.0,
        uv_scale: [1.0, 1.0, 1.0],
        map_weight: 1.0,
        hard_level: 1.0,
        hard_contrast: 0.5,
        mask_level: 1.0,
        mask_contrast: 0.9,
    });

    draw(displaceProgram, displaceFbo, {
        source: sourceTex,
        image: imageFbo.attachments[0],
        map: displaceMapFbo.attachments[0],
        res: [width, height],
        hard_weight: 4.0,
        soft_weight: 4.0,
    });

    draw(blitProgram, imageFbo, {
        tex: displaceFbo.attachments[0]
    });

    draw(blitProgram, null, {
        tex: imageFbo.attachments[0]
    });


    // draw(blitProgram, null, {
    //     tex: displaceMapFbo.attachments[0]
    // });


    

    time += 1/60;
    setTimeout(update, 1000/60);
    // requestAnimationFrame(update);
}

requestAnimationFrame(update);