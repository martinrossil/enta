import EventDispatcher from '../event/EventDispatcher';
import ITypeFace from '../interfaces/text/ITypeFace';

/**
 * Verdana 400 capHeight = 0.73, verticalOffset = 0.044, horizontalOffset = 0.13;
 * Montserrat 400 capHeight = 0.7, verticalOffset = -0.013, horizontalOffset = 0.163;
 * SegoeUI 400 capHeight = 0.7, verticalOffset = -0.091, horizontalOffset = 0.13;
 * SegoeUI 600 capHeight = 0.7, verticalOffset = -0.091, horizontalOffset = 0.123;
 *
 * new TypeFace('Arial', FontWeight.REGULAR_400, 0.715, 0.11, 0.015);
 * new TypeFace('Arial', FontWeight.MEDIUM_500, 0.715, 0.11, 0.015);
 * new TypeFace('Arial', FontWeight.BOLD_700, 0.715, 0.11, 0.015);
 *
 * new TypeFace('Inter', 400, 0.727, 0.09, 0.0);
 * new TypeFace('Inter', 500, 0.727, 0.09, 0.0);
 * new TypeFace('Inter', 700, 0.727, 0.09, 0.0);
 *
 * new TypeFace('Bitter', 400, 0.71, 0.03, 0.02);
 *
 * new TypeFace('Eurostile', FontWeight.REGULAR_400, 0.67, 0.1, 0.01);
 * new TypeFace('Eurostile', FontWeight.BOLD_700, 0.67, 0.09, -0.003);
 */

export default class TypeFace extends EventDispatcher implements ITypeFace {
    public static CHANGED = 'TypeFace.CHANGED';
    public constructor(fontFamily = 'Arial', capHeight = 0.715, offsetX = 0.09, offsetY = 0.015) {
        super();
        this.name = 'TypeFace';
        if (this._fontFamily !== fontFamily) {
            this._fontFamily = fontFamily;
        }
        if (this._capHeight !== capHeight) {
            if (!isNaN(capHeight) && capHeight > 0) {
                this._capHeight = capHeight;
            }
        }
        if (this._offsetX !== offsetX) {
            if (!isNaN(offsetX)) {
                this._offsetX = offsetX;
            }
        }
        if (this._offsetY !== offsetY) {
            if (!isNaN(offsetY)) {
                this._offsetY = offsetY;
            }
        }
    }

    private _fontFamily = 'Arial';

    public set fontFamily(value: string) {
        if (this._fontFamily === value) {
            return;
        }
        this._fontFamily = value;
        this.notifyChange();
    }

    public get fontFamily(): string {
        return this._fontFamily;
    }

    private _capHeight = 0.715;

    public set capHeight(value: number) {
        if (this._capHeight === value) {
            return;
        }
        if (isNaN(value) || value < 0) {
            if (this._capHeight !== 0.715) {
                this._capHeight = 0.715;
                this.notifyChange();
            }
            return;
        }
        this._capHeight = value;
        this.notifyChange();
    }

    public get capHeight(): number {
        return this._capHeight;
    }

    private _offsetX = 0.11;

    public set offsetX(value: number) {
        if (this._offsetX === value) {
            return;
        }
        if (isNaN(value)) {
            if (this._offsetX !== 0.11) {
                this._offsetX = 0.11;
                this.notifyChange();
            }
            return;
        }
        this._offsetX = value;
        this.notifyChange();
    }

    public get offsetX(): number {
        return this._offsetX;
    }

    private _offsetY = 0.015;

    public set offsetY(value: number) {
        if (this._offsetY === value) {
            return;
        }
        if (isNaN(value)) {
            if (this._offsetY !== 0.015) {
                this._offsetY = 0.015;
                this.notifyChange();
            }
            return;
        }
        this._offsetY = value;
        this.notifyChange();
    }

    public get offsetY(): number {
        return this._offsetY;
    }

    private notifyChange(): void {
        this.dispatch(TypeFace.CHANGED, this);
    }
}
