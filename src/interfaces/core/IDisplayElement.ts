import { ILayoutElement } from '../..';
import { ClipType } from '../../types/ClipType';
import IFilter from '../filters/IFilter';
import IColor from '../vo/IColor';
import ILinearGradient from '../vo/ILinearGradient';

export default interface IDisplayElement extends ILayoutElement {
    backgroundColor: IColor | ILinearGradient | null;
    cornerSize: number;
    clip: ClipType;
    clipX: ClipType;
    clipY: ClipType;
    addFilter(filter: IFilter): void;
}
