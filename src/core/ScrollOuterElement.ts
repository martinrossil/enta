import Strings from '../consts/Strings';
import IScrollOuterElement from '../interfaces/core/IScrollOuterElement';
import { ClipType } from '../types/ClipType';
import DisplayContainer from './DisplayContainer';
import SizeElement from './SizeElement';

export default class ScrollOuterElement extends SizeElement implements IScrollOuterElement {
    public constructor() {
        super();
        this.name = 'ScrollOuterElement';
        this.clip = Strings.SCROLL;
        this.appendChild(this.elementsContainer)
    }

    private _elementsContainer!: DisplayContainer;

    public get elementsContainer(): DisplayContainer {
        if (!this._elementsContainer) {
            this._elementsContainer = new DisplayContainer();
            // this will boost scroll performance, no repaints
            this._elementsContainer.style.willChange = Strings.TRANSFORM;
        }
        return this._elementsContainer;
    }

    private _clip: ClipType = Strings.VISIBLE;

    public set clip(value: ClipType) {
        if (this._clip === value) {
            return;
        }
        this._clip = value;
        this.style.overflow = this._clip;
    }

    public get clip(): ClipType {
        return this._clip;
    }

    private _clipX: ClipType = Strings.VISIBLE;

    public set clipX(value: ClipType) {
        if (this._clipX === value) {
            return;
        }
        this._clipX = value;
        this.style.overflowX = this._clipX;
    }

    public get clipX(): ClipType {
        return this._clipX;
    }

    private _clipY: ClipType = Strings.VISIBLE;

    public set clipY(value: ClipType) {
        if (this._clipY === value) {
            return;
        }
        this._clipY = value;
        this.style.overflowY = this._clipY;
    }

    public get clipY(): ClipType {
        return this._clipY;
    }
}
customElements.define('scroll-outer-element', ScrollOuterElement);
