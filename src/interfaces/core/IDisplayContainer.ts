import ILayout from '../layout/ILayout';
import ISvgElement from '../svg/ISvgElement';
import IDisplayElement from './IDisplayElement';

export default interface IDisplayContainer extends IDisplayElement {
    addElement(element: IDisplayElement | ISvgElement): void;
    addElementAt(element: IDisplayElement | ISvgElement, index: number): void;
    addElements(elements: Array<IDisplayElement | ISvgElement>): void;
    removeElement(element: IDisplayElement | ISvgElement): void;
    containsElement(element: IDisplayElement | ISvgElement): boolean;
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
