import ILayoutData from '../layout/ILayoutData';
import IDisplayContainer from './IDisplayContainer';
import IPositionElement from './IPositionElement';
import ISizeElement from './ISizeElement';

export default interface ILayoutElement extends ISizeElement, IPositionElement {
    externalSize(width: number, height: number): void;
    externalWidth: number;
    externalHeight: number;
    readonly measuredWidth: number;
    readonly measuredHeight: number;
    readonly parent: IDisplayContainer;
    layoutData: ILayoutData | null;
}
