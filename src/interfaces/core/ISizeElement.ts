import IPositionElement from './IPositionElement';

export default interface ISizeElement extends IPositionElement {
    size(width: number, height: number): void;
    externalSize(width: number, height: number): void;
    width: number;
    height: number;
    percentWidth: number;
    percentHeight: number;
    measureInternalSize: boolean;
    measureInternalWidth: boolean;
    measureInternalHeight: boolean;
    externalWidth: number;
    externalHeight: number;
    readonly measuredWidth: number;
    readonly measuredHeight: number;
}
