import ILayout from '../layout/ILayout';
import IDisplayElement from './IDisplayElement';
import ILayoutElement from './ILayoutElement';

export default interface IDisplayContainer extends IDisplayElement {
    addElement(element: ILayoutElement): void;
    addElements(elements: Array<ILayoutElement>): void;
    removeElement(element: ILayoutElement): void;
    removeElements(): void;
    padding: number;
    paddingLeft: number;
    paddingTop: number;
    paddingRight: number;
    paddingBottom: number;
    paddingX: number;
    paddingY: number;
    layout: ILayout | null;
}
