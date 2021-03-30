import IDisplayElement from '../interfaces/core/IDisplayElement';
import { ClipType } from '../types/ClipType';
import LayoutElement from './LayoutElement';

export default class DisplayElement extends LayoutElement implements IDisplayElement {
    public constructor() {
        super();
        this.name = 'DisplayElement';
    }

    private _backgroundColor = '';

    public set backgroundColor(value: string) {
        if (this._backgroundColor === value) {
            return;
        }
        this.style.backgroundColor = value;
    }

    public get backgroundColor(): string {
        return this._backgroundColor;
    }

    private _cornerSize = 0;

    public set cornerSize(value: number) {
        if (this._cornerSize === value) {
            return;
        }
        if (isNaN(value) || value < 0) {
            if (this._cornerSize !== 0) {
                this._cornerSize = 0;
                this.style.borderRadius = '0';
            }
            return;
        }
        this._cornerSize = value;
        this.style.borderRadius = this._cornerSize + 'px';
    }

    public get cornerSize(): number {
        return this._cornerSize;
    }

    private _clip: ClipType = 'visible';

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

    private _clipX: ClipType = 'visible';

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

    private _clipY: ClipType = 'visible';

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

    private _enabled = true;

    public set enabled(value: boolean) {
        if (this._enabled === value) {
            return;
        }
        this._enabled = value;
        if (value) {
            this.style.pointerEvents = '';
            this.style.userSelect = 'auto';
        } else {
            this.style.pointerEvents = 'none';
            this.style.userSelect = 'none';
        }
    }

    public get enabled(): boolean {
        return this._enabled;
    }
}
customElements.define('display-element', DisplayElement);
