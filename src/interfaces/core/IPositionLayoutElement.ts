import IPositionElement from './IPositionElement';

export default interface IPositionLayoutElement {
    top: number;
    right: number;
    bottom: number;
    left: number;
    horizontalCenter: number;
    verticalMiddle: number;
    position(x: number, y: number): void;
    x: number;
    y: number;
}
