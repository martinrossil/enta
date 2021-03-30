import { ClipType } from '../../types/ClipType';
import ILayoutData from '../layout/ILayoutData';
import ISizeElement from './ISizeElement';

export default interface IDisplayElement extends ISizeElement {
    backgroundColor: string;
    layoutData: ILayoutData | null;
    cornerSize: number;
    clip: ClipType;
    clipX: ClipType;
    clipY: ClipType;
    enabled: boolean;
}
