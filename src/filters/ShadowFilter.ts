import EventDispatcher from '../event/EventDispatcher';
import IShadowFilter from '../interfaces/filters/IShadowFilter';
import IColor from '../interfaces/shared/IColor';
import Color from '../shared/Color';

export default class ShadowFilter extends EventDispatcher implements IShadowFilter {
    public constructor(x = 0, y = 4, blur = 8, color: IColor = new Color(0, 0, 0, 0.6)) {
        super();
        this.name = 'ShadowFilter';
        this.colorChanged = this.colorChanged.bind(this);
        if (!isNaN(x)) {
            this._x = x;
        }
        if (!isNaN(y)) {
            this._y = y;
        }
        if (!isNaN(blur) && blur > 0) {
            this._blur = blur;
        }
        this._color = color;
        this._color.addEventListener('invalidate', this.colorChanged);
    }

    private _x = 0;

    public set x(value: number) {
        if (this._x === value) {
            return;
        }
        if (isNaN(value)) {
            if (this._x !== 0) {
                this._x = value;
                this.notify();
            }
            return;
        }
        this._x = value;
        this.notify();
    }

    public get x(): number {
        return this._x;
    }

    private _y = 4;

    public set y(value: number) {
        if (this._y === value) {
            return;
        }
        if (isNaN(value)) {
            if (this._y !== 4) {
                this._y = value;
                this.notify();
            }
            return;
        }
        this._y = value;
        this.notify();
    }

    public get y(): number {
        return this._y;
    }

    private _blur = 8;

    public set blur(value: number) {
        if (this._blur === value) {
            return;
        }
        if (isNaN(value)) {
            if (this._blur !== 8) {
                this._blur = value;
                this.notify();
            }
            return;
        }
        this._blur = value;
        this.notify();
    }

    public get blur(): number {
        return this._blur;
    }

    private _color: IColor;

    public set color(value: IColor) {
        if (this._color === value) {
            return;
        }
        this._color.removeEventListener('invalidate', this.colorChanged);
        this._color = value;
        this._color.addEventListener('invalidate', this.colorChanged);
        this.notify();
    }

    public get color(): IColor {
        return this._color;
    }

    public toString(): string {
        return 'drop-shadow(' + this.x + 'px ' + this.y + 'px ' + this.blur + 'px ' + this.color.toString() + ')';
    }

    private colorChanged(): void {
        this.notify();
    }

    private notify(): void {
        this.dispatch('invalidate');
    }
}
