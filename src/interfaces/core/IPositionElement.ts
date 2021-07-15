import IBaseElement from './IBaseElement';

export default interface IPositionElement extends IBaseElement {
    top: number;
    right: number;
    bottom: number;
    left: number;
    centerOffset: number;
    middleOffset: number;
    z: number;
    position(x: number, y: number): void;
}
