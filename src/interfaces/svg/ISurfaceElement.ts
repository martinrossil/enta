import BlurFilter from '../../filters/BlurFilter';
import ShadowFilter from '../../filters/ShadowFilter';
import { CornerType } from '../../types/CornerType';
import IColor from '../vo/IColor';
import ILinearGradient from '../vo/ILinearGradient';
import IPathElement from './IPathElement';

export default interface ISurfaceElement extends IPathElement {
    cornerSize: number;
    cornerType: CornerType;
    strokeColor: IColor | ILinearGradient | null;
    fillColor: IColor | ILinearGradient | null;
    strokeWidth: number;
    addFilter(filter: BlurFilter | ShadowFilter): void;
}
