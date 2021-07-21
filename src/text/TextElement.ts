import ITextElement from '../interfaces/text/ITextElement';
import BaseText from './BaseText';

export default class TextElement extends BaseText implements ITextElement {
    public constructor() {
        super();
        this.name = 'TextElement';
        this.lineHeight = 1.2;
    }

    protected validate(): void {
        super.validate();
        this.invalidateInternalSize();
        this.textRenderer.width = this.actualWidth;
        this.updateTextRendererPosition();
    }

    protected updateInternalSize(): void {
        this.resetTextRendererStyles();
        this.internalSize(this.actualRendererWidth, this.actualRendererHeight);
    }

    protected updateInternalWidth(): void {
        this.resetTextRendererStyles();
        this.internalWidth = this.actualRendererWidth;
    }

    protected updateInternalHeight(): void {
        this.resetTextRendererStyles();
        this.internalHeight = this.actualRendererHeight;
    }
}
