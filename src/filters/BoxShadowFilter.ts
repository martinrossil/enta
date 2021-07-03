import Strings from '../consts/Strings';
import EventDispatcher from '../event/EventDispatcher';
import IBoxShadowFilter from '../interfaces/filters/IBoxShadowFilter';
import IColor from '../interfaces/vo/IColor';
import Color from '../vo/Color';

export default class BoxShadowFilter extends EventDispatcher implements IBoxShadowFilter {
    public constructor(x = 0, y = 4, blur = 8, spread = 0, color: IColor = new Color(0, 0, 0, 0.3), inset = false) {
        super();
        this.name = 'BoxShadowFilter';
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
        if (!isNaN(spread)) {
            this._spread = spread;
        }
        this._color = color;
        this._color.addEventListener(Strings.INVALIDATE, this.colorChanged);
        this._inset = inset;
    }

    private colorChanged(): void {
        this.notify();
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

    private _spread = 0;

    public set spread(value: number) {
        if (this._spread === value) {
            return;
        }
        if (isNaN(value)) {
            if (this._spread !== 0) {
                this._spread = value;
                this.notify();
            }
            return;
        }
        this._spread = value;
        this.notify();
    }

    public get spread(): number {
        return this._spread;
    }

    private _color: IColor;

    public set color(value: IColor) {
        if (this._color === value) {
            return;
        }
        this._color.removeEventListener(Strings.INVALIDATE, this.colorChanged);
        this._color = value;
        this._color.addEventListener(Strings.INVALIDATE, this.colorChanged);
        this.notify();
    }

    public get color(): IColor {
        return this._color;
    }

    private _inset = false;

    public set inset(value: boolean) {
        if (this._inset === value) {
            return;
        }
        this._inset = value;
        this.notify();
    }

    public get inset(): boolean {
        return this._inset;
    }

    public toString(): string {
        let shadow = '';
        if (this.inset) {
            shadow += 'inset ';
        }
        return shadow + this.x + 'px ' + this.y + 'px ' + this.blur + 'px ' + this.spread + 'px ' + this.color.toString();
    }

    private notify(): void {
        this.dispatch(Strings.INVALIDATE);
    }
}
