import IPositionElement from './IPositionElement';

export default interface ISizeElement extends IPositionElement {
    size(width: number, height: number): void;
    width: number;
    height: number;
    percentWidth: number;
    percentHeight: number;
}
