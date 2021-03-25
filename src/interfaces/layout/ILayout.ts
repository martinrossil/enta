import ILayoutElement from '../core/ILayoutElement';
import IEventDispatcher from '../event/IEventDispatcher';

export default interface ILayout extends IEventDispatcher {
    resizeChildren(container: ILayoutElement, elements: Array<ILayoutElement>): void;
    layoutChildren(container: ILayoutElement, elements: Array<ILayoutElement>): void;
    getInternalSize(container: ILayoutElement, elements: Array<ILayoutElement>): [number, number];
    getInternalWidth(container: ILayoutElement, elements: Array<ILayoutElement>): number;
    getInternalHeight(container: ILayoutElement, elements: Array<ILayoutElement>): number;
}
