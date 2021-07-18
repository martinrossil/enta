import ISizeElement from '../interfaces/core/ISizeElement';
import PositionElement from './PositionElement';

export default class SizeElement extends PositionElement implements ISizeElement {
    public constructor() {
        super();
        this.name = 'SizeElement';
    }

    public size(width: number, height: number): void {
        let widthChanged = false;
        if (isNaN(this._width) && !isNaN(width)) {
            this._width = width;
            this._externalWidth = NaN;
            this.actualWidth = width;
            widthChanged = true;
        } else if (!isNaN(this._width) && isNaN(width)) {
            this._width = NaN;
            this._externalWidth = NaN;
            widthChanged = true;
        } else if (this._width !== width) {
            this._width = width;
            this._externalWidth = NaN;
            this.actualWidth = width;
            widthChanged = true;
        }
        let heightChanged = false;
        if (isNaN(this._height) && !isNaN(height)) {
            this._height = height
            this._externalHeight = NaN;
            this.actualHeight = height;
            heightChanged = true;
        } else if (!isNaN(this._height) && isNaN(height)) {
            this._height = NaN;
            this._externalHeight = NaN;
            heightChanged = true;
        } else if (this._height !== height) {
            this._height = height;
            this._externalHeight = NaN;
            this.actualHeight = height;
            heightChanged = true;
        }
        if (widthChanged || heightChanged) {
            this.invalidate();
            this.notifyInvalid();
        }
    }

    public externalSize(width: number, height: number): void {
        let widthChanged = false;
        if (isNaN(this.width)) {
            if (isNaN(this.externalWidth) && !isNaN(width)) {
                this._externalWidth = width;
                this.actualWidth = width;
                widthChanged = true;
            } else if (!isNaN(this.externalWidth) && isNaN(width)) {
                this._externalWidth = width;
                this.actualWidth = 0;
                widthChanged = true;
            } else if (!isNaN(this.externalWidth) && !isNaN(width)) {
                if (this.externalWidth !== width) {
                    this._externalWidth = width;
                    this.actualWidth = width;
                    widthChanged = true;
                }
            }
        }
        let heightChanged = false;
        if (isNaN(this.height)) {
            if (isNaN(this.externalHeight) && !isNaN(height)) {
                this._externalHeight = height;
                this.actualHeight = height;
                heightChanged = true;
            } else if (!isNaN(this.externalHeight) && isNaN(height)) {
                this._externalHeight = height;
                this.actualHeight = 0;
                heightChanged = true;
            } else if (!isNaN(this.externalHeight) && !isNaN(height)) {
                if (this.externalHeight !== height) {
                    this._externalHeight = height;
                    this.actualHeight = height;
                    heightChanged = true;
                }
            }
        }
        if (widthChanged || heightChanged) {
            this.invalidate();
        }
    }

    protected internalSize(width: number, height: number): void {
        let widthChanged = false;
        if (isNaN(this.width) && this._internalWidth !== width) {
            this._internalWidth = width;
            this.actualWidth = width;
            widthChanged = true;
        }
        let heightChanged = false;
        if (isNaN(this.height) && this._internalHeight !== height) {
            this._internalHeight = height;
            this.actualHeight = height;
            heightChanged = true;
        }
        if (widthChanged || heightChanged) {
            this.notifyInvalid();
        }
    }

    private _width = NaN;

    public set width(value: number) {
        if (isNaN(this._width) && isNaN(value)) {
            return;
        }
        if (this._width === value) {
            return;
        }
        if (isNaN(value)) {
            this._width = NaN;
            this._externalWidth = NaN;
            this.invalidate();
            return;
        }
        this._width = value;
        this._externalWidth = NaN;
        this.actualWidth = value;
        this.invalidate();
        this.notifyInvalid();
    }

    public get width(): number {
        return this._width;
    }

    private _internalWidth = NaN;

    protected set internalWidth(value: number) {
        if (isNaN(this._internalWidth) && isNaN(value)) {
            return;
        }
        if (this._internalWidth === value) {
            return;
        }
        this._internalWidth = value;
        this._externalWidth = NaN;
        this.actualWidth = value;
        this.notifyInvalid();
    }

    protected get internalWidth(): number {
        return this._internalWidth;
    }

    private _externalWidth = NaN;

    public set externalWidth(value: number) {
        if (!isNaN(this.width)) {
            return;
        }
        if (isNaN(this._externalWidth) && isNaN(value)) {
            return;
        }
        if (this._externalWidth === value) {
            return;
        }
        this._externalWidth = value;
        this.actualWidth = value;
        this.invalidate();
    }

    public get externalWidth(): number {
        return this._externalWidth;
    }

    private _actualWidth = 0;

    public set actualWidth(value: number) {
        if (isNaN(value)) {
            return;
        }
        this._actualWidth = value;
        this.style.width = this._actualWidth + 'px';
    }

    public get actualWidth(): number {
        return this._actualWidth;
    }

    private _height = NaN;

    public set height(value: number) {
        if (isNaN(this._height) && isNaN(value)) {
            return;
        }
        if (this._height === value) {
            return;
        }
        if (isNaN(value)) {
            this._height = NaN;
            this._externalHeight = NaN;
            this.invalidate();
            return;
        }
        this._height = value;
        this._externalHeight = NaN;
        this.actualHeight = value;
        this.invalidate();
        this.notifyInvalid();
    }

    public get height(): number {
        return this._height;
    }

    private _internalHeight = NaN;

    protected set internalHeight(value: number) {
        if (isNaN(this._internalHeight) && isNaN(value)) {
            return;
        }
        if (this._internalHeight === value) {
            return;
        }
        this._internalHeight = value;
        this._externalHeight = NaN;
        this.actualHeight = value;
        this.notifyInvalid();
    }

    protected get internalHeight(): number {
        return this._internalHeight;
    }

    private _externalHeight = NaN;

    public set externalHeight(value: number) {
        if (!isNaN(this.height)) {
            return;
        }
        if (isNaN(this._externalHeight) && isNaN(value)) {
            return;
        }
        if (this._externalHeight === value) {
            return;
        }
        this._externalHeight = value;
        this.actualHeight = value;
        this.invalidate();
    }

    public get externalHeight(): number {
        return this._externalHeight;
    }

    private _actualHeight = 0;

    public set actualHeight(value: number) {
        if (isNaN(value)) {
            return;
        }
        this._actualHeight = value;
        this.style.height = this._actualHeight + 'px';
    }

    public get actualHeight(): number {
        return this._actualHeight;
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
            this.notifyInvalid();
            return;
        }
        if (value < 0) {
            if (this._percentWidth !== 0) {
                this._percentWidth = 0;
                this.notifyInvalid();
            }
            return;
        }
        if (value > 100) {
            if (this._percentWidth !== 100) {
                this._percentWidth = 100;
                this.notifyInvalid();
            }
            return;
        }
        this._percentWidth = value;
        this.notifyInvalid();
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
            this.notifyInvalid();
            return;
        }
        if (value < 0) {
            if (this._percentHeight !== 0) {
                this._percentHeight = 0;
                this.notifyInvalid();
            }
            return;
        }
        if (value > 100) {
            if (this._percentHeight !== 100) {
                this._percentHeight = 100;
                this.notifyInvalid();
            }
            return;
        }
        this._percentHeight = value;
        this.notifyInvalid();
    }

    public get percentHeight(): number {
        return this._percentHeight;
    }

    protected invalidateInternalSize(): void {
        if (!isNaN(this.width) && !isNaN(this.height)) {
            return;
        }
        let updateWidth = false;
        let updateHeight = false;
        if (isNaN(this.width) && isNaN(this.externalWidth)) {
            updateWidth = true;
        }
        if (isNaN(this.height) && isNaN(this.externalHeight)) {
            updateHeight = true;
        }
        if (updateWidth && updateHeight) {
            this.updateInternalSize();
            return;
        }
        if (updateWidth && !updateHeight) {
            this.updateInternalWidth();
            return;
        }
        if (!updateWidth && updateHeight) {
            this.updateInternalHeight();
        }
    }

    protected updateInternalSize(): void {
        // override
    }

    protected updateInternalWidth(): void {
        // override
    }

    protected updateInternalHeight(): void {
        // override
    }
}
