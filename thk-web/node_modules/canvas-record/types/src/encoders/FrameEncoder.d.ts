export default FrameEncoder;
/** @class */
declare class FrameEncoder extends Encoder {
    static supportedExtensions: string[];
    static supportedTargets: string[];
    static defaultOptions: {
        extension: string;
        frameMethod: string;
    };
    constructor(options: any);
    init(options: any): Promise<void>;
    directoryHandle: any;
    writeFile(frameFileName: any, blob: any): Promise<void>;
    encode(frame: any, frameNumber: any): Promise<void>;
}
import Encoder from "./Encoder.js";
