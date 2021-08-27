import { Align, HorizontalAlign, VerticalAlign } from '../../shared/Types';

export default interface ILayoutElement {
    position(x: number, y: number): void;
    x: number;
    y: number;
    top: number;
    right: number;
    bottom: number;
    left: number;
    align: Align;
    alignHorizontal: HorizontalAlign;
    alignVertical: VerticalAlign;
    externalSize(width: number, height: number): void;
    externalWidth: number;
    externalHeight: number;
    width: number;
    height: number;
    percentWidth: number;
    percentHeight: number;
    actualWidth: number;
    actualHeight: number;
}
