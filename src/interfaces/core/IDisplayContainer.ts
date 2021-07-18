import { ChildElement, Layout } from '../../shared/Types';
import IDisplayElement from './IDisplayElement';

export default interface IDisplayContainer extends IDisplayElement {
    addElement(element: ChildElement): void;
    addElementAt(element: ChildElement, index: number): void;
    addElements(elements: Array<ChildElement>): void;
    removeElement(element: ChildElement): void;
    containsElement(element: ChildElement): boolean;
    removeElements(): void;
    padding: number;
    paddingLeft: number;
    paddingTop: number;
    paddingRight: number;
    paddingBottom: number;
    paddingX: number;
    paddingY: number;
    layout: Layout;
}
