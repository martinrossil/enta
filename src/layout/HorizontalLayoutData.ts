import EventDispatcher from '../event/EventDispatcher';
import IHorizontalLayoutData from '../interfaces/layout/IHorizontalLayoutData';

export default class HorizontalLayoutData extends EventDispatcher implements IHorizontalLayoutData {
    public constructor(percentWidth = NaN, percentHeight = NaN) {
        super();
        this.name = 'HorizontalLayoutData';
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

    private notify(): void {
        this.dispatchEvent(new Event('invalidate'));
    }
}
