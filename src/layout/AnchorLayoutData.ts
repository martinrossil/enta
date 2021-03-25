import EventDispatcher from '../event/EventDispatcher';
import IAnchorLayoutData from '../interfaces/layout/IAnchorLayoutData';

export default class AnchorLayoutData extends EventDispatcher implements IAnchorLayoutData {
    public constructor(top = NaN, right = NaN, bottom = NaN, left = NaN, percentWidth = NaN, percentHeight = NaN, horizontalCenter = NaN, verticalMiddle = NaN) {
        super();
        this.name = 'AnchorLayoutData';
        if (!isNaN(top)) {
            this._top = top;
        }
        if (!isNaN(right)) {
            this._right = right;
        }
        if (!isNaN(bottom)) {
            this._bottom = bottom;
        }
        if (!isNaN(left)) {
            this._left = left;
        }
        if (!isNaN(percentWidth)) {
            if (percentWidth >= 0 && percentWidth <= 100) {
                this._percentWidth = percentWidth;
            } else if (percentWidth < 0) {
                this._percentWidth = 0;
            } else if (percentWidth > 100) {
                this._percentWidth = 100;
            }
        }
        if (!isNaN(percentHeight)) {
            if (percentHeight >= 0 && percentHeight <= 100) {
                this._percentHeight = percentHeight;
            } else if (percentHeight < 0) {
                this._percentHeight = 0;
            } else if (percentHeight > 100) {
                this._percentHeight = 100;
            }
        }
        if (!isNaN(horizontalCenter)) {
            this._horizontalCenter = horizontalCenter;
        }
        if (!isNaN(verticalMiddle)) {
            this._verticalMiddle = verticalMiddle;
        }
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
        this.notify();
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
        this.notify();
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
        this.notify();
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
        this.notify();
    }

    public get left(): number {
        return this._left;
    }

    private _percentWidth = NaN;

    public set percentWidth(value: number) {
        if (isNaN(this._percentWidth) && isNaN(value)) {
            return;
        }
        if (this._percentWidth === value) {
            return;
        }
        if (isNaN(value)) {
            this._percentWidth = NaN;
            this.notify();
            return;
        }
        if (value < 0) {
            if (this._percentWidth !== 0) {
                this._percentWidth = 0;
                this.notify();
            }
            return;
        }
        if (value > 100) {
            if (this._percentWidth !== 100) {
                this._percentWidth = 100;
                this.notify();
            }
            return;
        }
        this._percentWidth = value;
        this.notify();
    }

    public get percentWidth(): number {
        return this._percentWidth;
    }

    private _percentHeight = NaN;

    public set percentHeight(value: number) {
        if (isNaN(this._percentHeight) && isNaN(value)) {
            return;
        }
        if (this._percentHeight === value) {
            return;
        }
        if (isNaN(value)) {
            this._percentHeight = NaN;
            this.notify();
            return;
        }
        if (value < 0) {
            if (this._percentHeight !== 0) {
                this._percentHeight = 0;
                this.notify();
            }
            return;
        }
        if (value > 100) {
            if (this._percentHeight !== 100) {
                this._percentHeight = 100;
                this.notify();
            }
            return;
        }
        this._percentHeight = value;
        this.notify();
    }

    public get percentHeight(): number {
        return this._percentHeight;
    }

    private _horizontalCenter = NaN;

    public set horizontalCenter(value: number) {
        if (isNaN(this._horizontalCenter) && isNaN(value)) {
            return;
        }
        if (this._horizontalCenter === value) {
            return;
        }
        this._horizontalCenter = value;
        this.notify();
    }

    public get horizontalCenter(): number {
        return this._horizontalCenter;
    }

    private _verticalMiddle = NaN;

    public set verticalMiddle(value: number) {
        if (isNaN(this._verticalMiddle) && isNaN(value)) {
            return;
        }
        if (this._verticalMiddle === value) {
            return;
        }
        this._verticalMiddle = value;
        this.notify();
    }

    public get verticalMiddle(): number {
        return this._verticalMiddle;
    }

    private notify(): void {
        this.dispatchEvent(new Event('invalidate'));
    }
}
