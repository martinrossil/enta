import { Strings } from '../enums/Strings';
import IDisplayElement from '../interfaces/core/IDisplayElement';
import IColor from '../interfaces/vo/IColor';
import ILinearGradient from '../interfaces/vo/ILinearGradient';
import { ClipType } from '../types/ClipType';
import Color from '../vo/Color';
import LinearGradient from '../vo/LinearGradient';
import LayoutElement from './LayoutElement';

export default class DisplayElement extends LayoutElement implements IDisplayElement {
    public constructor() {
        super();
        this.name = 'DisplayElement';
        this.backgroundColorChanged = this.backgroundColorChanged.bind(this);
        this.style.border = Strings.NONE;
        this.style.outline = Strings.NONE;
        this.style.boxSizing = Strings.BORDER_BOX;
    }

    private backgroundColorChanged(): void {
        if (this.backgroundColor) {
            if (this.backgroundColor instanceof Color) {
                this.style.background = '';
                this.style.backgroundColor = this.backgroundColor.toString();
                return;
            }
            if (this.backgroundColor instanceof LinearGradient) {
                this.style.backgroundColor = '';
                this.style.background = this.backgroundColor.toString();
                return;
            }
        }
        this.style.backgroundColor = '';
        this.style.background = '';
    }

    private _backgroundColor: IColor | ILinearGradient | null = null;

    public set backgroundColor(value: IColor | ILinearGradient | null) {
        if (this._backgroundColor === value) {
            return;
        }
        if (this._backgroundColor instanceof Color) {
            this._backgroundColor.removeEventListener(Color.CHANGED, this.backgroundColorChanged);
        } else if (this._backgroundColor instanceof LinearGradient) {
            this._backgroundColor.removeEventListener(LinearGradient.COLOR_ADDED, this.backgroundColorChanged);
            this._backgroundColor.removeEventListener(LinearGradient.COLORS_ADDED, this.backgroundColorChanged);
            this._backgroundColor.removeEventListener(LinearGradient.COLOR_CHANGED, this.backgroundColorChanged);
            this._backgroundColor.removeEventListener(LinearGradient.DEGREES_CHANGED, this.backgroundColorChanged);
        }
        this._backgroundColor = value;
        if (this._backgroundColor instanceof Color) {
            this._backgroundColor.addEventListener(Color.CHANGED, this.backgroundColorChanged);
            this.style.background = '';
            this.style.backgroundColor = this._backgroundColor.toString();
            return;
        }
        if (this._backgroundColor instanceof LinearGradient) {
            this._backgroundColor.addEventListener(LinearGradient.COLOR_ADDED, this.backgroundColorChanged);
            this._backgroundColor.addEventListener(LinearGradient.COLORS_ADDED, this.backgroundColorChanged);
            this._backgroundColor.addEventListener(LinearGradient.COLOR_CHANGED, this.backgroundColorChanged);
            this._backgroundColor.addEventListener(LinearGradient.DEGREES_CHANGED, this.backgroundColorChanged);
            this.style.backgroundColor = '';
            this.style.background = this._backgroundColor.toString();
            return;
        }
        this.style.backgroundColor = '';
        this.style.background = '';
    }

    public get backgroundColor(): IColor | ILinearGradient | null {
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
