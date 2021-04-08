import ILayoutElement from '../interfaces/core/ILayoutElement';
import ILayoutData from '../interfaces/layout/ILayoutData';
import SizeElement from './SizeElement';

export default class LayoutElement extends SizeElement implements ILayoutElement {
    public constructor() {
        super();
        this.name = 'LayoutElement';
        this.layoutDataChanged = this.layoutDataChanged.bind(this);
    }

    public get hasWidth(): boolean {
        return !isNaN(this.width) || !isNaN(this.externalWidth);
    }

    public get hasHeight(): boolean {
        return !isNaN(this.height) || !isNaN(this.externalHeight);
    }

    public get hasSize(): boolean {
        return this.hasWidth && this.hasHeight;
    }

    protected invalidateInternalSize(): void {
        console.log(this.name, 'invalidateInternalSize()', this.name);
        if (this.hasSize) {
            return;
        }
        if (!this.hasWidth && !this.hasHeight) {
            this.updateInternalSize();
            return;
        }
        if (!this.hasWidth && this.hasHeight) {
            this.updateInternalWidth();
            return;
        }
        if (this.hasWidth && !this.hasHeight) {
            this.updateInternalHeight();
        }
    }

    protected layoutDataChanged(): void {
        this.dispatchEvent(new CustomEvent('invalidate', { bubbles: true }));
    }

    private _layoutData: ILayoutData | null = null;

    public set layoutData(value: ILayoutData | null) {
        if (this._layoutData === value) {
            return;
        }
        if (this._layoutData) {
            this._layoutData.removeEventListener('invalidate', this.layoutDataChanged);
        }
        this._layoutData = value;
        if (this._layoutData) {
            this._layoutData.addEventListener('invalidate', this.layoutDataChanged);
        }
        this.layoutDataChanged();
    }

    public get layoutData(): ILayoutData | null {
        return this._layoutData;
    }
}
customElements.define('layout-element', LayoutElement);
