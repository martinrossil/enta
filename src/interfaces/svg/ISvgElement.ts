import BlurFilter from '../../filters/BlurFilter';
import ShadowFilter from '../../filters/ShadowFilter';
import { CursorType } from '../../types/CursorType';
import ISizeElement from '../core/ISizeElement';
import IRectangle from '../vo/IRectangle';

export default interface ISvgElement extends ISizeElement {
    viewBox: IRectangle | null;
    visible: boolean;
    enabled: boolean;
    cursor: CursorType;
    addFilter(filter: BlurFilter | ShadowFilter): void;
}
