import IBaseElement from './IBaseElement';

export default interface IPositionElement extends IBaseElement {
    top: number;
    right: number;
    bottom: number;
    left: number;
    centerOffset: number;
    middleOffset: number;
    zIndex: number;
}
