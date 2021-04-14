import { HorizontalAlign } from '../../types/HorizontalAlign';
import { VerticalAlign } from '../../types/VerticalAlign';
import ILayout from './ILayout';

export default interface IHorizontalLayout extends ILayout {
    horizontalGap: number;
    horizontalAlign: HorizontalAlign;
    verticalAlign: VerticalAlign;
}
