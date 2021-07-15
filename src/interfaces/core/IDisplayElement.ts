import { ClipType } from '../../types/ClipType';
import IFilter from '../filters/IFilter';
import IColor from '../vo/IColor';
import ILinearGradient from '../vo/ILinearGradient';
import ISizeElement from './ISizeElement';

export default interface IDisplayElement extends ISizeElement {
    backgroundColor: IColor | ILinearGradient | null;
    cornerSize: number;
    cornerSizeTopLeft: number;
    cornerSizeTopRight: number;
    cornerSizeBottomLeft: number;
    cornerSizeBottomRight: number;
    clip: ClipType;
    clipX: ClipType;
    clipY: ClipType;
    visible: boolean;
    enabled: boolean;
    cursor: string;
    addFilter(filter: IFilter): void;
}
