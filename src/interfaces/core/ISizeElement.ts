import IBaseElement from './IBaseElement';

export default interface ISizeElement extends IBaseElement {
    size(width: number, height: number): void;
    width: number;
    height: number;
}
