export default MediaCaptureEncoder;
export type MediaCaptureEncoderOptions = {
    flushFrequency?: number;
    encoderOptions?: MediaCaptureEncoderEncoderOptions;
};
export type MediaCaptureEncoderEncoderOptions = MediaRecorderOptions;
/**
 * @typedef {object} MediaCaptureEncoderOptions
 * @property {number} [flushFrequency=10]
 * @property {MediaCaptureEncoderEncoderOptions} [encoderOptions={}]
 */
/**
 * @typedef {MediaRecorderOptions} MediaCaptureEncoderEncoderOptions
 * @see [MediaRecorder#options]{@link https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder/MediaRecorder#options}
 */
declare class MediaCaptureEncoder extends Encoder {
    static supportedExtensions: string[];
    static defaultOptions: {
        extension: string;
        frameMethod: string;
        flushFrequency: number;
    };
    /**
     * @param {MediaCaptureEncoderOptions} [options]
     */
    constructor(options?: MediaCaptureEncoderOptions);
    init(options: any): Promise<void>;
    chunks: any[];
    stream: any;
    recorder: MediaRecorder;
    encode(frame: any, number: any): Promise<void>;
    stop(): Promise<any[]>;
    q: Deferred;
    dispose(): Promise<void>;
}
import Encoder from "./Encoder.js";
import { Deferred } from "../utils.js";
