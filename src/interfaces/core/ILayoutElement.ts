import ILayoutData from '../layout/ILayoutData';
import IPositionElement from './IPositionElement';
import ISizeElement from './ISizeElement';

export default interface ILayoutElement extends ISizeElement, IPositionElement {
    externalSize(width: number, height: number): void;
    externalWidth: number;
    externalHeight: number;
    layoutData: ILayoutData | null;
    readonly measuredWidth: number;
    readonly measuredHeight: number;
    readonly hasWidth: boolean;
    readonly hasHeight: boolean;
    readonly hasSize: boolean;
}
