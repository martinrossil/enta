import Strings from '../consts/Strings';
import IPositionElement from '../interfaces/core/IPositionElement';
import BaseElement from './BaseElement';

export default class PositionElement extends BaseElement implements IPositionElement {
    public constructor() {
        super();
        this.name = 'PositionElement';
        this.style.position = Strings.ABSOLUTE;
    }

    public position(x: number, y: number): void {
        this.x = x;
        this.y = y;
    }

    private _x = 0;

    public set x(value: number) {
        if (this._x === value) {
            return;
        }
        if (isNaN(value)) {
            if (this._x !== 0) {
                this._x = 0;
                this.updateTransform();
            }
            return;
        }
        this._x = value;
        this.updateTransform();
    }

    public get x(): number {
        return this._x;
    }

    private _y = 0;

    public set y(value: number) {
        if (this._y === value) {
            return;
        }
        if (isNaN(value)) {
            if (this._y !== 0) {
                this._y = 0;
                this.updateTransform();
            }
            return;
        }
        this._y = value;
        this.updateTransform();
    }

    public get y(): number {
        return this._y;
    }

    private _zIndex = NaN;

    public set zIndex(value: number) {
        if (isNaN(this._zIndex) && isNaN(value)) {
            return;
        }
        if (this._zIndex === value) {
            return;
        }
        this._zIndex = value;
        if (isNaN(this._zIndex)) {
            this.style.zIndex = '';
        } else {
            this.style.zIndex = this._zIndex + '';
        }
    }

    public get zIndex(): number {
        return this._zIndex;
    }

    private _top = NaN;

    public set top(value: number) {
        if (isNaN(this._top) && isNaN(value)) {
            return;
        }
        if (this._top === value) {
            return;
        }
        this._top = value;
        this.notifyInvalid();
    }

    public get top(): number {
        return this._top;
    }

    private _right = NaN;

    public set right(value: number) {
        if (isNaN(this._right) && isNaN(value)) {
            return;
        }
        if (this._right === value) {
            return;
        }
        this._right = value;
        this.notifyInvalid();
    }

    public get right(): number {
        return this._right;
    }

    private _bottom = NaN;

    public set bottom(value: number) {
        if (isNaN(this._bottom) && isNaN(value)) {
            return;
        }
        if (this._bottom === value) {
            return;
        }
        this._bottom = value;
        this.notifyInvalid();
    }

    public get bottom(): number {
        return this._bottom;
    }

    private _left = NaN;

    public set left(value: number) {
        if (isNaN(this._left) && isNaN(value)) {
            return;
        }
        if (this._left === value) {
            return;
        }
        this._left = value;
        this.notifyInvalid();
    }

    public get left(): number {
        return this._left;
    }

    private _centerOffset = NaN;

    public set centerOffset(value: number) {
        if (isNaN(this._centerOffset) && isNaN(value)) {
            return;
        }
        if (this._centerOffset === value) {
            return;
        }
        this._centerOffset = value;
        this.notifyInvalid();
    }

    public get centerOffset(): number {
        return this._centerOffset;
    }

    private _middleOffset = NaN;

    public set middleOffset(value: number) {
        if (isNaN(this._middleOffset) && isNaN(value)) {
            return;
        }
        if (this._middleOffset === value) {
            return;
        }
        this._middleOffset = value;
        this.notifyInvalid();
    }

    public get middleOffset(): number {
        return this._middleOffset;
    }

    private updateTransform(): void {
        this.style.transform = 'translate(' + this.x + 'px, ' + this.y + 'px)';
    }
}
