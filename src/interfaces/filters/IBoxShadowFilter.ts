import IColor from '../vo/IColor';
import IFilter from './IFilter';

export default interface IBoxShadowFilter extends IFilter {
    x: number;
    y: number;
    blur: number;
    spread: number;
    color: IColor;
    inset: boolean;
}
