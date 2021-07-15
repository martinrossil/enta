import { CornerType } from '../../types/CornerType';
import IPathElement from './IPathElement';

export default interface ISurfaceElement extends IPathElement {
    cornerSize: number;
    cornerType: CornerType;
}
