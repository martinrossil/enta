import DisplayContainer from '../../core/DisplayContainer';
import { ClipType } from '../../types/ClipType';
import ILayoutElement from './ILayoutElement';

export default interface IScrollOuterElement extends ILayoutElement {
    clip: ClipType;
    clipX: ClipType;
    clipY: ClipType;
    readonly offsetWidth: number;
    readonly offsetHeight: number;
    readonly clientWidth: number;
    readonly clientHeight: number;
    readonly elementsContainer: DisplayContainer;
}
