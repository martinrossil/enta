import { IColor } from '../../shared/Interfaces';
import IFilter from './IFilter';

export default interface IShadowFilter extends IFilter {
    x: number;
    y: number;
    blur: number;
    color: IColor;
}
