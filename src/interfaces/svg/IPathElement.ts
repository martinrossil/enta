import { StrokeLineCap } from '../../types/StrokeLineCap';
import { StrokeLineJoin } from '../../types/StrokeLineJoin';
import IColor from '../vo/IColor';
import ILinearGradient from '../vo/ILinearGradient';
import ISvgElement from './ISvgElement';

export default interface IPathElement extends ISvgElement {
    pathData: string;
    strokeColor: IColor | ILinearGradient | null;
    fillColor: IColor | ILinearGradient | null;
    strokeWidth: number;
    strokeLineCap: StrokeLineCap;
    strokeLineJoin: StrokeLineJoin;
}
