import IColor from '../vo/IColor';
import IFilter from './IFilter';

export default interface IShadowFilter extends IFilter {
    x: number;
    y: number;
    blur: number;
    color: IColor;
}
