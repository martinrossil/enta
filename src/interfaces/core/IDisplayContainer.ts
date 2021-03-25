import ILayout from '../layout/ILayout';
import IDisplayElement from './IDisplayElement';

export default interface IDisplayContainer extends IDisplayElement {
    addElement(element: IDisplayElement): void;
    addElements(elements: Array<IDisplayElement>): void;
    padding: number;
    paddingLeft: number;
    paddingTop: number;
    paddingRight: number;
    paddingBottom: number;
    paddingX: number;
    paddingY: number;
    layout: ILayout | null;
}
