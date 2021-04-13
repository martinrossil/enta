import BlurFilter from '../../filters/BlurFilter';
import ShadowFilter from '../../filters/ShadowFilter';
import { CornerType } from '../../types/CornerType';
import ISizeElement from '../core/ISizeElement';
import IColor from '../vo/IColor';
import ILinearGradient from '../vo/ILinearGradient';

export default interface ISurfaceElement extends ISizeElement {
    cornerSize: number;
    cornerType: CornerType;
    strokeColor: IColor | ILinearGradient | null;
    fillColor: IColor | ILinearGradient | null;
    strokeWidth: number;
    addFilter(filter: BlurFilter | ShadowFilter): void;
}
