import { Clip, Cursor } from '../shared/Types';
import BoxShadowFilter from '../filters/BoxShadowFilter';
import IDisplayElement from '../interfaces/core/IDisplayElement';
import IFilter from '../interfaces/filters/IFilter';
import Color from '../shared/Color';
import LinearGradient from '../shared/LinearGradient';
import SizeElement from './SizeElement';
import IColor from '../interfaces/shared/IColor';
import ILinearGradient from '../interfaces/shared/ILinearGradient';

export default class DisplayElement extends SizeElement implements IDisplayElement {
    public constructor() {
        super();
        this.name = 'DisplayElement';
        this.backgroundColorChanged = this.backgroundColorChanged.bind(this);
        this.filtersChanged = this.filtersChanged.bind(this);
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
            this._backgroundColor.removeEventListener('colorAdded', this.backgroundColorChanged);
            this._backgroundColor.removeEventListener('colorsAdded', this.backgroundColorChanged);
            this._backgroundColor.removeEventListener('colorChanged', this.backgroundColorChanged);
            this._backgroundColor.removeEventListener('degreesChanged', this.backgroundColorChanged);
        }
        this._backgroundColor = value;
        if (this._backgroundColor instanceof Color) {
            this._backgroundColor.addEventListener('invalidate', this.backgroundColorChanged);
            this.style.background = '';
            this.style.backgroundColor = this._backgroundColor.toString();
            return;
        }
        if (this._backgroundColor instanceof LinearGradient) {
            this._backgroundColor.addEventListener('colorAdded', this.backgroundColorChanged);
            this._backgroundColor.addEventListener('colorsAdded', this.backgroundColorChanged);
            this._backgroundColor.addEventListener('colorChanged', this.backgroundColorChanged);
            this._backgroundColor.addEventListener('degreesChanged', this.backgroundColorChanged);
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
                this._cornerSizeTopLeft = 0;
                this._cornerSizeTopRight = 0;
                this._cornerSizeBottomLeft = 0;
                this._cornerSizeBottomRight = 0;
                this.style.borderRadius = '0';
            }
            return;
        }
        this._cornerSize = value;
        this._cornerSizeTopLeft = value;
        this._cornerSizeTopRight = value;
        this._cornerSizeBottomLeft = value;
        this._cornerSizeBottomRight = value;
        this.style.borderRadius = this._cornerSize + 'px';
    }

    public get cornerSize(): number {
        return this._cornerSize;
    }

    private _cornerSizeTopLeft = 0;

    public set cornerSizeTopLeft(value: number) {
        if (this._cornerSizeTopLeft === value) {
            return;
        }
        if (isNaN(value) || value < 0) {
            if (this._cornerSizeTopLeft !== 0) {
                this._cornerSizeTopLeft = 0;
                this.style.borderTopLeftRadius = '0';
            }
            return;
        }
        this._cornerSizeTopLeft = value;
        this.style.borderTopLeftRadius = this._cornerSizeTopLeft + 'px';
    }

    public get cornerSizeTopLeft(): number {
        return this._cornerSizeTopLeft;
    }

    private _cornerSizeTopRight = 0;

    public set cornerSizeTopRight(value: number) {
        if (this._cornerSizeTopRight === value) {
            return;
        }
        if (isNaN(value) || value < 0) {
            if (this._cornerSizeTopRight !== 0) {
                this._cornerSizeTopRight = 0;
                this.style.borderTopRightRadius = '0';
            }
            return;
        }
        this._cornerSizeTopRight = value;
        this.style.borderTopRightRadius = this._cornerSizeTopRight + 'px';
    }

    public get cornerSizeTopRight(): number {
        return this._cornerSizeTopRight;
    }

    private _cornerSizeBottomLeft = 0;

    public set cornerSizeBottomLeft(value: number) {
        if (this._cornerSizeBottomLeft === value) {
            return;
        }
        if (isNaN(value) || value < 0) {
            if (this._cornerSizeBottomLeft !== 0) {
                this._cornerSizeBottomLeft = 0;
                this.style.borderBottomLeftRadius = '0';
            }
            return;
        }
        this._cornerSizeBottomLeft = value;
        this.style.borderBottomLeftRadius = this._cornerSizeBottomLeft + 'px';
    }

    public get cornerSizeBottomLeft(): number {
        return this._cornerSizeBottomLeft;
    }

    private _cornerSizeBottomRight = 0;

    public set cornerSizeBottomRight(value: number) {
        if (this._cornerSizeBottomRight === value) {
            return;
        }
        if (isNaN(value) || value < 0) {
            if (this._cornerSizeBottomRight !== 0) {
                this._cornerSizeBottomRight = 0;
                this.style.borderBottomRightRadius = '0';
            }
            return;
        }
        this._cornerSizeBottomRight = value;
        this.style.borderBottomRightRadius = this._cornerSizeBottomRight + 'px';
    }

    public get cornerSizeBottomRight(): number {
        return this._cornerSizeBottomRight;
    }

    private _clip: Clip = 'visible';

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

    private _clipX: Clip = 'visible';

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

    private _clipY: Clip = 'visible';

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

    private _visible = true;

    public set visible(value: boolean) {
        if (this._visible === value) {
            return;
        }
        this._visible = value;
        if (this._visible) {
            this.style.visibility = '';
            return;
        }
        this.style.visibility = 'hidden';
    }

    public get visible(): boolean {
        return this._visible;
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

    private _cursor: Cursor = '';

    public set cursor(value: Cursor) {
        if (this._cursor === value) {
            return;
        }
        this._cursor = value;
        this.style.cursor = value;
    }

    public get cursor(): Cursor {
        return this._cursor;
    }
}
customElements.define('display-element', DisplayElement);
