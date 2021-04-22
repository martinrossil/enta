import { Strings } from '../enums/Strings';
import BoxShadowFilter from '../filters/BoxShadowFilter';
import IDisplayElement from '../interfaces/core/IDisplayElement';
import IElement from '../interfaces/core/IElement';
import IFilter from '../interfaces/filters/IFilter';
import IColor from '../interfaces/vo/IColor';
import ILinearGradient from '../interfaces/vo/ILinearGradient';
import { ClipType } from '../types/ClipType';
import Color from '../vo/Color';
import LinearGradient from '../vo/LinearGradient';
import SizeElement from './SizeElement';

export default class DisplayElement extends SizeElement implements IDisplayElement, IElement {
    public constructor() {
        super();
        this.name = 'DisplayElement';
        this.backgroundColorChanged = this.backgroundColorChanged.bind(this);
        this.filtersChanged = this.filtersChanged.bind(this);
        this.style.border = Strings.NONE;
        this.style.outline = Strings.NONE;
        this.style.boxSizing = Strings.BORDER_BOX;
    }

    private filters: Array<IFilter> = [];

    public addFilter(value: IFilter): void {
        this.filters.push(value);
        value.addEventListener('invalidate', this.filtersChanged);
        this.filtersChanged();
    }

    private filtersChanged(): void {
        let filterString = '';
        let boxShadowString = '';
        if (this.filters.length === 0) {
            this.style.filter = filterString;
            this.style.boxShadow = boxShadowString;
            return;
        }
        for (const filter of this.filters) {
            if (filter instanceof BoxShadowFilter) {
                boxShadowString += filter.toString() + ', ';
            } else {
                filterString += filter.toString() + ' ';
            }
        }
        this.style.filter = filterString.substr(0, filterString.length - 2);
        this.style.boxShadow = boxShadowString.substr(0, boxShadowString.length - 2);
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
            this._backgroundColor.removeEventListener('invalidate', this.backgroundColorChanged);
        } else if (this._backgroundColor instanceof LinearGradient) {
            this._backgroundColor.removeEventListener(LinearGradient.COLOR_ADDED, this.backgroundColorChanged);
            this._backgroundColor.removeEventListener(LinearGradient.COLORS_ADDED, this.backgroundColorChanged);
            this._backgroundColor.removeEventListener(LinearGradient.COLOR_CHANGED, this.backgroundColorChanged);
            this._backgroundColor.removeEventListener(LinearGradient.DEGREES_CHANGED, this.backgroundColorChanged);
        }
        this._backgroundColor = value;
        if (this._backgroundColor instanceof Color) {
            this._backgroundColor.addEventListener('invalidate', this.backgroundColorChanged);
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
        this.style.borderRadius = this._cornerSize + Strings.PX;
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
}
customElements.define('display-element', DisplayElement);
