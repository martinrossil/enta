import ILabelElement from '../interfaces/text/ILabelElement';
import BaseText from './BaseText';

export default class LabelElement extends BaseText implements ILabelElement {
    public constructor() {
        super();
        this.name = 'LabelElement';
        this.lineHeight = 2;
        this.textRenderer.style.whiteSpace = 'nowrap';
        this.textRenderer.style.textOverflow = 'ellipsis';
        this.textRenderer.clip = 'hidden';
    }

    protected validate(): void {
        super.validate();
        this.invalidateInternalSize();
        this.updateTextRendererWidth();
        this.updateTextRendererPosition();
    }

    protected updateInternalSize(): void {
        this.resetTextRendererStyles();
        this.internalSize(this.actualRendererWidth, this.actualFontSize);
    }

    protected updateInternalWidth(): void {
        this.resetTextRendererStyles();
        this.internalWidth = this.actualRendererWidth;
    }

    protected updateInternalHeight(): void {
        this.resetTextRendererStyles();
        this.internalHeight = this.actualFontSize;
    }

    protected updateTextRendererWidth(): void {
        this.textRenderer.width = Math.ceil(this.actualWidth + Math.ceil(this.typeFace.offsetX * 2 * this.fontSize * 2) + this.letterSpacing * 2);
    }
}
customElements.define('label-element', LabelElement);
