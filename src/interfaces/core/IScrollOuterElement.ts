import DisplayContainer from '../../core/DisplayContainer';
import { Clip } from '../../shared/Types';
import ILayoutElement from './ILayoutElement';

export default interface IScrollOuterElement extends ILayoutElement {
    clip: Clip;
    clipX: Clip;
    clipY: Clip;
    readonly offsetWidth: number;
    readonly offsetHeight: number;
    readonly clientWidth: number;
    readonly clientHeight: number;
    readonly elementsContainer: DisplayContainer;
}
