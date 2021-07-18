import IEventDispatcher from '../interfaces/event/IEventDispatcher';

export interface ITypeFace extends IEventDispatcher {
    fontFamily: string;
    capHeight: number;
    offsetX: number;
    offsetY: number;
}

export interface IColor extends IEventDispatcher {
    hue: number;
    saturation: number;
    lightness: number;
    opacity: number;
    toString(): string;
}

export interface IRectangle {
    name: string;
    x: number;
    y: number;
    width: number;
    height: number;
}

export interface ILinearGradient extends IEventDispatcher {
    degrees: number;
    readonly colors: Array<IColor>;
    addColor(color: IColor): void;
    addColors(colors: Array<IColor>): void;
    toString(): string;
}
