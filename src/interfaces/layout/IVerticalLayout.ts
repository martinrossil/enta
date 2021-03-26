import { HorizontalAlign } from '../../types/HorizontalAlign';
import { VerticalAlign } from '../../types/VerticalAlign';
import ILayout from './ILayout';

export default interface IVerticalLayout extends ILayout {
    verticalGap: number;
    horizontalAlign: HorizontalAlign;
    verticalAlign: VerticalAlign;
}
