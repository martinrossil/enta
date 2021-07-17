import { ChildType } from '../../types/ChildType';
import { LayoutType } from '../../types/LayoutType';
import IDisplayElement from './IDisplayElement';

export default interface IDisplayContainer extends IDisplayElement {
    addElement(element: ChildType): void;
    addElementAt(element: ChildType, index: number): void;
    addElements(elements: Array<ChildType>): void;
    removeElement(element: ChildType): void;
    containsElement(element: ChildType): boolean;
    removeElements(): void;
    padding: number;
    paddingLeft: number;
    paddingTop: number;
    paddingRight: number;
    paddingBottom: number;
    paddingX: number;
    paddingY: number;
    layout: LayoutType;
}
