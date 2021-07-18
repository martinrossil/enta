import Strings from '../consts/Strings';
import IScrollOuterElement from '../interfaces/core/IScrollOuterElement';
import { Clip } from '../shared/Types';
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

    private _clip: Clip = Strings.VISIBLE;

    public set clip(value: Clip) {
        if (this._clip === value) {
            return;
        }
        this._clip = value;
        this.style.overflow = this._clip;
    }

    public get clip(): Clip {
        return this._clip;
    }

    private _clipX: Clip = Strings.VISIBLE;

    public set clipX(value: Clip) {
        if (this._clipX === value) {
            return;
        }
        this._clipX = value;
        this.style.overflowX = this._clipX;
    }

    public get clipX(): Clip {
        return this._clipX;
    }

    private _clipY: Clip = Strings.VISIBLE;

    public set clipY(value: Clip) {
        if (this._clipY === value) {
            return;
        }
        this._clipY = value;
        this.style.overflowY = this._clipY;
    }

    public get clipY(): Clip {
        return this._clipY;
    }
}
customElements.define('scroll-outer-element', ScrollOuterElement);
