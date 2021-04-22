import ILayout from '../layout/ILayout';
import IDisplayElement from './IDisplayElement';
import IElement from './IElement';

export default interface IDisplayContainer extends IDisplayElement {
    addElement(element: IElement): void;
    addElementAt(element: IElement, index: number): void;
    addElements(elements: Array<IElement>): void;
    removeElement(element: IElement): void;
    removeElements(): void;
    containsElement(element: IElement): boolean;
    padding: number;
    paddingLeft: number;
    paddingTop: number;
    paddingRight: number;
    paddingBottom: number;
    paddingX: number;
    paddingY: number;
    layout: ILayout;
}
