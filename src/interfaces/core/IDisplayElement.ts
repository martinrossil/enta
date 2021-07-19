import { Clip, Cursor } from '../../shared/Types';
import IFilter from '../filters/IFilter';
import IColor from '../shared/IColor';
import ILinearGradient from '../shared/ILinearGradient';
import ISizeElement from './ISizeElement';

export default interface IDisplayElement extends ISizeElement {
    backgroundColor: IColor | ILinearGradient | null;
    cornerSize: number;
    cornerSizeTopLeft: number;
    cornerSizeTopRight: number;
    cornerSizeBottomLeft: number;
    cornerSizeBottomRight: number;
    clip: Clip;
    clipX: Clip;
    clipY: Clip;
    visible: boolean;
    enabled: boolean;
    cursor: Cursor;
    addFilter(filter: IFilter): void;
}
