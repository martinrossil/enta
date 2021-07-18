import { CornerShape } from '../../shared/Types';
import IPathElement from './IPathElement';

export default interface ISurfaceElement extends IPathElement {
    cornerSize: number;
    cornerShape: CornerShape;
}
