import IPositionLayoutElement from './IPositionLayoutElement';
import ISizeElement from './ISizeElement';

export default interface ISizeLayoutElement extends IPositionLayoutElement {
    size(width: number, height: number): void;
    width: number;
    height: number;
    percentWidth: number;
    percentHeight: number;
    externalSize(width: number, height: number): void;
    externalWidth: number;
    externalHeight: number;
    readonly hasWidth: boolean;
    readonly hasHeight: boolean;
    readonly hasSize: boolean;
    readonly measuredWidth: number;
    readonly measuredHeight: number;
}
