import { ILayoutElement } from '../..';
import BlurFilter from '../../filters/BlurFilter';
import ShadowFilter from '../../filters/ShadowFilter';
import IRectangle from '../vo/IRectangle';

export default interface ISvgElement extends ILayoutElement {
    viewBox: IRectangle | null;
    addFilter(filter: BlurFilter | ShadowFilter): void;
}
