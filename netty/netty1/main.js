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
const simplexProgram = twgl.createProgramInfo(gl, [vertex_shader, simplex_shader]);
// const maskProgram = twgl.createProgramInfo(gl, [vertex_shader, mask_shader]);




// Initialize

let initialized = false;
let sourceTex;
let depthTex;

let time = 0;

Promise.all([
    loadTex(gl, "source.jpg"),
    loadTex(gl, "depth.jpg")
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
        res: [width, height]
    });

    draw(simplexProgram, displaceMapFbo, {
        tex: imageFbo.attachments[0],
        blur_tex: blurFbo.attachments[0],

        depth_tex: depthTex,
        source_tex: sourceTex,
        res: [width, height],
        uv_scale: 3.0,
        uv_weight: 0.7,
        depth_weight: 3.0,
        tex_weight: 1.0,
        offset: [0.0, 0.0, time*0.5]
    });

    draw(displaceProgram, displaceFbo, {
        displace_tex: displaceMapFbo.attachments[0],
        tex: imageFbo.attachments[0],
        source_tex: sourceTex,
        res: [width, height],
        strength: 2,
        time: time,
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
    requestAnimationFrame(update);
}

requestAnimationFrame(update);