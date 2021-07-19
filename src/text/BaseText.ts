import DisplayElement from '../core/DisplayElement';
import IBaseText from '../interfaces/text/IBaseText';
import { FontWeight, TextAlign } from '../shared/Types';
import TypeFace from './TypeFace';
import TextRenderer from './TextRenderer';
import ITypeFace from '../interfaces/text/ITypeFace';
import IColor from '../interfaces/shared/IColor';

export default class BaseText extends DisplayElement implements IBaseText {
    public constructor() {
        super();
        this.name = 'BaseText';
        this.appendChild(this.textRenderer as unknown as Node);
    }

    private _textRenderer!: TextRenderer;

    protected get textRenderer(): TextRenderer {
        if (!this._textRenderer) {
            this._textRenderer = new TextRenderer();
        }
        return this._textRenderer;
    }

    public set text(value: string) {
        this.textRenderer.text = value;
        this.invalidate();
    }

    public get text(): string {
        return this.textRenderer.text;
    }

    public set fontWeight(value: FontWeight) {
        this.textRenderer.fontWeight = value;
        this.invalidate();
    }

    public get fontWeight(): FontWeight {
        return this.textRenderer.fontWeight;
    }

    private _typeFace!: ITypeFace;

    public set typeFace(value: ITypeFace) {
        if (this._typeFace === value) {
            return;
        }
        this._typeFace = value;
        this.textRenderer.fontFamily = this._typeFace.fontFamily;
        this.invalidate();
    }

    public get typeFace(): ITypeFace {
        if (!this._typeFace) {
            this._typeFace = new TypeFace();
        }
        return this._typeFace;
    }

    public set fontSize(value: number) {
        this.textRenderer.fontSize = value;
        this.invalidate();
    }

    public get fontSize(): number {
        return this.textRenderer.fontSize;
    }

    public set textColor(value: IColor | null) {
        this.textRenderer.textColor = value;
    }

    public get textColor(): IColor | null {
        return this.textRenderer.textColor;
    }

    public set letterSpacing(value: number) {
        this.textRenderer.letterSpacing = value;
        this.invalidate();
    }

    public get letterSpacing(): number {
        return this.textRenderer.letterSpacing;
    }

    public set lineHeight(value: number) {
        this.textRenderer.lineHeight = value;
        this.invalidate();
    }

    public get lineHeight(): number {
        return this.textRenderer.lineHeight
    }

    public set textAlign(value: TextAlign) {
        this.textRenderer.textAlign = value;
    }

    public get textAlign(): TextAlign {
        return this.textRenderer.textAlign;
    }

    protected resetTextRendererStyles(): void {
        this.textRenderer.style.width = '';
        this.textRenderer.style.height = '';
    }

    protected get actualFontSize(): number {
        return Math.ceil(this.fontSize * this.typeFace.capHeight);
    }

    protected get topPadding(): number {
        return (this.fontSize * this.lineHeight - this.actualFontSize) * 0.5;
    }

    protected get actualRendererWidth(): number {
        return Math.ceil(this.textRenderer.clientWidth - this.typeFace.offsetX * 2 * this.fontSize - this.letterSpacing);
    }

    protected get actualRendererHeight(): number {
        return Math.ceil(this.textRenderer.clientHeight - this.topPadding * 2)
    }

    protected updateTextRendererPosition(): void {
        this.textRenderer.x = -this.typeFace.offsetX * this.fontSize;
        this.textRenderer.y = -this.topPadding + this.typeFace.offsetY * this.fontSize;
    }
}
