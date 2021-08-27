import { Align, HorizontalAlign, VerticalAlign } from '../../shared/Types';
import IBaseElement from './IBaseElement';

export default interface IPositionElement extends IBaseElement {
    align: Align;
    alignHorizontal: HorizontalAlign;
    alignVertical: VerticalAlign;
    top: number;
    right: number;
    bottom: number;
    left: number;
    zIndex: number;
}
