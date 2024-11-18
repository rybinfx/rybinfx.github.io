export default GIFEncoder;
export type GIFEncoderOptions = {
    maxColors?: number;
    quantizeOptions?: GIFEncoderQuantizeOptions;
    encoderOptions?: GIFEncoderEncoderOptions;
};
export type GIFEncoderQuantizeOptions = {
    format?: "rgb565" | "rgb444" | "rgba4444";
    oneBitAlpha?: boolean | number;
    clearAlpha?: boolean;
    clearAlphaThreshold?: number;
    clearAlphaColor?: number;
};
export type GIFEncoderEncoderOptions = {
    palette?: number[][];
    first?: boolean;
    transparent?: boolean;
    transparentIndex?: number;
    delay?: number;
    repeat?: number;
    dispose?: number;
};
/**
 * @typedef {object} GIFEncoderOptions
 * @property {number} [maxColors=256]
 * @property {GIFEncoderQuantizeOptions} [quantizeOptions]
 * @property {GIFEncoderEncoderOptions} [encoderOptions={}]
 */
/**
 * @typedef {object} GIFEncoderQuantizeOptions
 * @property {"rgb565" | "rgb444" | "rgba4444"} [format="rgb565"]
 * @property {boolean | number} [oneBitAlpha=false]
 * @property {boolean} [clearAlpha=true]
 * @property {number} [clearAlphaThreshold=0]
 * @property {number} [clearAlphaColor=0x00]
 * @see [QuantizeOptions]{@link https://github.com/mattdesl/gifenc#palette--quantizergba-maxcolors-options--}
 */
/**
 * @typedef {object} GIFEncoderEncoderOptions
 * @property {number[][]} [palette]
 * @property {boolean} [first=false]
 * @property {boolean} [transparent=0]
 * @property {number} [transparentIndex=0]
 * @property {number} [delay=0]
 * @property {number} [repeat=0]
 * @property {number} [dispose=-1]
 * @see [WriteFrameOpts]{@link https://github.com/mattdesl/gifenc#gifwriteframeindex-width-height-opts--}
 */
declare class GIFEncoder extends Encoder {
    static supportedExtensions: string[];
    static defaultOptions: {
        extension: string;
        frameMethod: string;
        maxColors: number;
        quantizeOptions: {
            format: string;
            oneBitAlpha: boolean;
            clearAlpha: boolean;
            clearAlphaThreshold: number;
            clearAlphaColor: number;
        };
    };
    /**
     * @param {GIFEncoderOptions} [options]
     */
    constructor(options?: GIFEncoderOptions);
    init(options: any): Promise<void>;
    encoder: any;
    start(): Promise<void>;
    encode(frame: any): void;
    stop(): any;
}
import Encoder from "./Encoder.js";
