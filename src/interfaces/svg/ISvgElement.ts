import BlurFilter from '../../filters/BlurFilter';
import ShadowFilter from '../../filters/ShadowFilter';
import { IRectangle } from '../../shared/Interfaces';
import { Cursor } from '../../shared/Types';
import ISizeElement from '../core/ISizeElement';

export default interface ISvgElement extends ISizeElement {
    viewBox: IRectangle | null;
    visible: boolean;
    enabled: boolean;
    cursor: Cursor;
    addFilter(filter: BlurFilter | ShadowFilter): void;
}
