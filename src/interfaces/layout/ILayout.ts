import IEventDispatcher from '../event/IEventDispatcher';
import IDisplayContainer from '../../interfaces/core/IDisplayContainer';
import IDisplayElement from '../../interfaces/core/IDisplayElement';
import ISvgElement from '../svg/ISvgElement';

export default interface ILayout extends IEventDispatcher {
    resizeChildren(container: IDisplayContainer, elements: Array<IDisplayElement | ISvgElement>): void;
    layoutChildren(container: IDisplayContainer, elements: Array<IDisplayElement | ISvgElement>): void;
    getInternalSize(container: IDisplayContainer, elements: Array<IDisplayElement | ISvgElement>): [number, number];
    getInternalWidth(container: IDisplayContainer, elements: Array<IDisplayElement | ISvgElement>): number;
    getInternalHeight(container: IDisplayContainer, elements: Array<IDisplayElement | ISvgElement>): number;
}
