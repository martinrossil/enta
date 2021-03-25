import IBaseElement from './IBaseElement';

export default interface IPositionElement extends IBaseElement {
    position(x: number, y: number): void;
    x: number;
    y: number;
}
