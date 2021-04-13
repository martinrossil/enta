import { ClipType } from '../../types/ClipType';
import IFilter from '../filters/IFilter';
import ILayoutData from '../layout/ILayoutData';
import IColor from '../vo/IColor';
import ILinearGradient from '../vo/ILinearGradient';
import ISizeElement from './ISizeElement';

export default interface IDisplayElement extends ISizeElement {
    backgroundColor: IColor | ILinearGradient | null;
    layoutData: ILayoutData | null;
    cornerSize: number;
    clip: ClipType;
    clipX: ClipType;
    clipY: ClipType;
    enabled: boolean;
    addFilter(filter: IFilter): void;
}
