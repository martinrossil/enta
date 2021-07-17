import IEventDispatcher from '../event/IEventDispatcher';
import ILayoutContainer from '../../interfaces/core/ILayoutContainer';
import ILayoutElement from '../core/ILayoutElement';

export default interface ILayout extends IEventDispatcher {
    resizeChildren(container: ILayoutContainer, elements: Array<ILayoutElement>): void;
    layoutChildren(container: ILayoutContainer, elements: Array<ILayoutElement>): void;
    getInternalSize(container: ILayoutContainer, elements: Array<ILayoutElement>): [number, number];
    getInternalWidth(container: ILayoutContainer, elements: Array<ILayoutElement>): number;
    getInternalHeight(container: ILayoutContainer, elements: Array<ILayoutElement>): number;
}
