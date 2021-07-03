import Strings from '../consts/Strings';
import EventDispatcher from '../event/EventDispatcher';
import IEventListener from '../interfaces/event/IEventListener';
import IColor from '../interfaces/vo/IColor';
import ILinearGradient from '../interfaces/vo/ILinearGradient';

export default class LinearGradient extends EventDispatcher implements ILinearGradient {
    public constructor(degrees = 0, colors: Array<IColor> = []) {
        super();
        this.name = 'LinearGradient';
        this.colorChanged = this.colorChanged.bind(this);
        if (this._degrees !== degrees) {
            if (isNaN(degrees) || degrees < 0 || degrees > 360) {
                if (this._degrees !== 0) {
                    this._degrees = 0;
                }
            } else {
                this._degrees = degrees;
            }
        }
        for (const color of colors) {
            this.colors.push(color);
            color.addEventListener(Strings.INVALIDATE, this.colorChanged as IEventListener);
        }
    }

    private colorChanged(e: CustomEvent<IColor>): void {
        this.dispatch(Strings.COLOR_CHANGED, e.detail)
    }

    readonly colors: Array<IColor> = [];

    public addColor(value: IColor): void {
        this.colors.push(value);
        value.addEventListener(Strings.INVALIDATE, this.colorChanged as IEventListener);
        this.dispatch(Strings.COLOR_ADDED, value);
    }

    public addColors(value: Array<IColor>): void {
        for (const color of value) {
            this.colors.push(color);
            color.addEventListener(Strings.INVALIDATE, this.colorChanged as IEventListener);
        }
        if (value.length > 0) {
            this.dispatch(Strings.COLORS_ADDED, value);
        }
    }

    private _degrees = 0;

    public set degrees(value: number) {
        if (this._degrees === value) {
            return;
        }
        if (isNaN(value) || value < 0 || value >= 360) {
            if (this._degrees !== 0) {
                this._degrees = 0;
                this.dispatch(Strings.DEGREES_CHANGED, 0);
                return;
            }
        }
        this._degrees = value;
        this.dispatch(Strings.DEGREES_CHANGED, this._degrees);
    }

    public get degrees(): number {
        return this._degrees;
    }

    public toString(): string {
        if (this.colors.length === 0) {
            return '';
        }
        let linearGradient = 'linear-gradient(' + this.degrees + 'deg, ';
        for (const color of this.colors) {
            linearGradient += color.toString() + ', '
        }
        return linearGradient.substr(0, linearGradient.length - 2) + ')';
    }
}
