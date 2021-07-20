import IViewBox from '../interfaces/svg/IViewBox';

export default class ViewBox implements IViewBox {
    public constructor(x = 0, y = 0, width = 0, height = 0) {
        this.name = 'ViewBox';
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    public name = '';

    private _x = 0;

    public set x(value: number) {
        if (this._x === value) {
            return;
        }
        if (isNaN(value)) {
            if (this._x !== 0) {
                this._x = 0;
            }
            return;
        }
        this._x = value;
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
            }
            return;
        }
        this._y = value;
    }

    public get y(): number {
        return this._y;
    }

    private _width = 0;

    public set width(value: number) {
        if (this._width === value) {
            return;
        }
        if (isNaN(value) || value < 0) {
            if (this._width !== 0) {
                this._width = 0;
            }
            return;
        }
        this._width = value;
    }

    public get width(): number {
        return this._width;
    }

    private _height = 0;

    public set height(value: number) {
        if (this._height === value) {
            return;
        }
        if (isNaN(value) || value < 0) {
            if (this._height !== 0) {
                this._height = 0;
            }
            return;
        }
        this._height = value;
    }

    public get height(): number {
        return this._height;
    }
}
