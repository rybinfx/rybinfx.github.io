import { Recorder, RecorderStatus, Encoders } from "canvas-record";
import { AVC } from "media-codecs";

// Get the WebGL canvas


export async function initRecorder(canvas, render, rec_param) {
    const gl = canvas.getContext("webgl2");
    let canvasRecorder = null;
    let recording = false;
    let frame = 0;
    let max_frame = 60*10;


    const tick = async (time) => {
      // console.log(rec_param);

      if (rec_param.recording) {
        recording = true;
        rec_param.recording = false;
        rec_param.progress = 0;
        if (typeof VideoEncoder === 'undefined') {
          alert("Looks like your user agent doesn't support VideoEncoder / WebCodecs API yet.");
          return;
        }
        canvas.width = 1080;
        canvas.height = 1920;
        
      }

      if (frame > max_frame) {
        recording = false;
        
      }

      if (recording && canvasRecorder == null) {

        console.log("Recording started");

        canvasRecorder = new Recorder(gl, {
          name: "thk",
          frameRate: 60, // Frames per second
          // duration: 10, // Recording duration in seconds
          // encoder: Encoders.H264MP4, // H.264 MP4 encoder
          encoderOptions: {
            codec: AVC.getCodec({ profile: "Main", level: "5.2" }), // H.264 codec options
          },
          download: true, // Automatically download the recorded video
        });
        await canvasRecorder.start();
        frame = 0;

      }

      if (!recording && canvasRecorder != null) {
        canvasRecorder.stop().then((videoBlob) => {
          const url = URL.createObjectURL(videoBlob);
          console.log("Video URL:", url);
          canvasRecorder = null;
        });
      }
      
      
      render(time);
      
      
      rec_param.progress = 0;
      if (canvasRecorder != null ) {
        if (canvasRecorder.status !== RecorderStatus.Recording) {
          
          
        } else {
          await canvasRecorder.step();        
          frame++;
          rec_param.progress = frame/max_frame;

        }

      };
      
      requestAnimationFrame(tick);

    };

    requestAnimationFrame(tick);
    return rec_param;
    
}
