import BlurFilter from '../../filters/BlurFilter';
import ShadowFilter from '../../filters/ShadowFilter';
import { Cursor } from '../../shared/Types';
import ISizeElement from '../core/ISizeElement';
import IViewBox from './IViewBox';

export default interface ISvgElement extends ISizeElement {
    viewBox: IViewBox | null;
    visible: boolean;
    enabled: boolean;
    cursor: Cursor;
    addFilter(filter: BlurFilter | ShadowFilter): void;
}
