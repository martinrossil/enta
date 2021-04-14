import DisplayElement from '../core/DisplayElement';
import { Strings } from '../enums/Strings';
import ITextRenderer from '../interfaces/text/ITextRenderer';
import IColor from '../interfaces/vo/IColor';
import { FontWeight } from '../types/FontWeight';
import { TextAlign } from '../types/TextAlign';

export default class TextRenderer extends DisplayElement implements ITextRenderer {
    public constructor() {
        super();
        this.name = 'TextRenderer';
        this.fontFamily = 'Arial';
        this.fontSize = 16;
        this.lineHeight = 1.2;
    }

    private _text = '';

    public set text(value: string) {
        if (this._text === value) {
            return;
        }
        this._text = value;
        this.innerText = value;
    }

    public get text(): string {
        return this._text;
    }

    private _textColor: IColor | null = null;

    public set textColor(value: IColor | null) {
        if (this._textColor === value) {
            return;
        }
        this._textColor = value;
        if (this._textColor) {
            this.style.color = this._textColor.toString();
        } else {
            this.style.color = '';
        }
    }

    public get textColor(): IColor | null {
        return this._textColor;
    }

    private _fontFamily = '';

    public set fontFamily(value: string) {
        if (this._fontFamily === value) {
            return;
        }
        this._fontFamily = value;
        this.style.fontFamily = this._fontFamily;
    }

    public get fontFamily(): string {
        return this._fontFamily;
    }

    private _fontSize = NaN;

    public set fontSize(value: number) {
        if (this._fontSize === value) {
            return;
        }
        if (isNaN(value) || value < 0) {
            if (this._fontSize !== 16) {
                this._fontSize = 16;
                this.style.fontSize = this._fontSize + Strings.PX;
            }
            return;
        }
        this._fontSize = value;
        this.style.fontSize = this._fontSize + Strings.PX;
    }

    public get fontSize(): number {
        return this._fontSize;
    }

    private _fontWeight: FontWeight = 400;

    public set fontWeight(value: FontWeight) {
        if (this._fontWeight === value) {
            return;
        }
        this._fontWeight = value;
        this.style.fontWeight = this._fontWeight.toString();
    }

    public get fontWeight(): FontWeight {
        return this._fontWeight;
    }

    private _letterSpacing = 0.0;

    public set letterSpacing(value: number) {
        if (this._letterSpacing === value) {
            return;
        }
        if (isNaN(value)) {
            if (this._letterSpacing !== 0) {
                this._letterSpacing = 0;
                this.style.letterSpacing = this._letterSpacing + Strings.PX;
            }
            return;
        }
        this._letterSpacing = value;
        this.style.letterSpacing = this._letterSpacing + Strings.PX;
    }

    public get letterSpacing(): number {
        return this._letterSpacing;
    }

    private _lineHeight = NaN;

    public set lineHeight(value: number) {
        if (this._lineHeight === value) {
            return;
        }
        if (isNaN(value) || value < 0) {
            this._lineHeight = 1.2;
            this.style.lineHeight = this._lineHeight.toString();
            return;
        }
        this._lineHeight = value;
        this.style.lineHeight = this._lineHeight.toString();
    }

    public get lineHeight(): number {
        return this._lineHeight;
    }

    private _textAlign: TextAlign ='left';

    public set textAlign(value: TextAlign) {
        if (this._textAlign === value) {
            return;
        }
        this._textAlign = value;
        this.style.textAlign = this._textAlign;
    }

    public get textAlign(): TextAlign {
        return this._textAlign;
    }
}
customElements.define('text-renderer', TextRenderer);
