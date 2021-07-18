import { IColor, ILinearGradient } from '../../shared/Interfaces';
import { StrokeLineCap, StrokeLineJoin } from '../../shared/Types';
import ISvgElement from './ISvgElement';

export default interface IPathElement extends ISvgElement {
    pathData: string;
    strokeColor: IColor | ILinearGradient | null;
    fillColor: IColor | ILinearGradient | null;
    strokeWidth: number;
    strokeLineCap: StrokeLineCap;
    strokeLineJoin: StrokeLineJoin;
}
