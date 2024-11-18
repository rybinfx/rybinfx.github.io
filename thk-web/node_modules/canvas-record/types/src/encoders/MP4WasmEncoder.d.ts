export default MP4WasmEncoder;
export type MP4WasmEncoderOptions = {
    groupOfPictures?: number;
    flushFrequency?: number;
    encoderOptions?: MP4WasmEncoderEncoderOptions;
};
export type MP4WasmEncoderEncoderOptions = VideoEncoderConfig;
declare class MP4WasmEncoder extends Encoder {
    static supportedExtensions: string[];
    static supportedTargets: string[];
    static defaultOptions: {
        extension: string;
        groupOfPictures: number;
        flushFrequency: number;
    };
    /**
     * @param {MP4WasmEncoderOptions} [options]
     */
    constructor(options?: MP4WasmEncoderOptions);
    get frameMethod(): string;
    init(options: any): Promise<void>;
    encoder: any;
    encode(frame: any): Promise<void>;
    stop(): Promise<any>;
    dispose(): Promise<void>;
}
import Encoder from "./Encoder.js";
