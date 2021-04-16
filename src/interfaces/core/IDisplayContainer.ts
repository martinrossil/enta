import ILayout from '../layout/ILayout';
import IDisplayElement from './IDisplayElement';
import IElement from './IElement';

export default interface IDisplayContainer extends IDisplayElement {
    addElement(element: IElement): void;
    addElements(elements: Array<IElement>): void;
    removeElement(element: IElement): void;
    removeElements(): void;
    padding: number;
    paddingLeft: number;
    paddingTop: number;
    paddingRight: number;
    paddingBottom: number;
    paddingX: number;
    paddingY: number;
    layout: ILayout;
}
