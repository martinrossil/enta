import IEventDispatcher from '../event/IEventDispatcher';

export default interface IColor extends IEventDispatcher {
    hue: number;
    saturation: number;
    lightness: number;
    opacity: number;
    toString(): string;
}
