import IDisplayContainer from '../interfaces/core/IDisplayContainer';
import ILayoutElement from '../interfaces/core/ILayoutElement';
import ILayoutData from '../interfaces/layout/ILayoutData';
import AnchorLayout from '../layout/AnchorLayout';
import AnchorLayoutData from '../layout/AnchorLayoutData';
import SizeElement from './SizeElement';

export default class LayoutElement extends SizeElement implements ILayoutElement {
    public constructor() {
        super();
        this.name = 'LayoutElement';
        this.layoutDataChanged = this.layoutDataChanged.bind(this);
    }

    protected invalidateInternalSize(): void {
        console.log(this.name, 'invalidateInternalSize()', this.parent.name);
        if (isNaN(this.width) && isNaN(this.height)) {
            this.testIfInternalSizeShouldBeCalculated();
            return;
        }
        if (isNaN(this.width) && !isNaN(this.height)) {
            this.testIfInternalWidthShouldBeCalculated();
            return;
        }
        if (!isNaN(this.width) && isNaN(this.height)) {
            this.testIfInternalHeightShouldBeCalculated();
        }
    }

    private testIfInternalSizeShouldBeCalculated(): void {
        let updateInternalWidth = true;
        let updateInternalHeight = true;
        if (this.layoutData instanceof AnchorLayoutData) {
            if (this.parent.layout instanceof AnchorLayout) {
                if (!isNaN(this.layoutData.left) && !isNaN(this.layoutData.right)) {
                    updateInternalWidth = false;
                }
                if (!isNaN(this.layoutData.top) && !isNaN(this.layoutData.bottom)) {
                    updateInternalHeight = false;
                }
                if (!isNaN(this.layoutData.percentWidth)) {
                    updateInternalWidth = false;
                }
                if (!isNaN(this.layoutData.percentHeight)) {
                    updateInternalHeight = false;
                }
            }
        }
        if (updateInternalWidth && updateInternalHeight) {
            this.updateInternalSize();
            return;
        }
        if (updateInternalWidth && !updateInternalHeight) {
            this.updateInternalWidth();
            return;
        }
        if (!updateInternalWidth && updateInternalHeight) {
            this.updateInternalHeight();
        }
    }

    private testIfInternalWidthShouldBeCalculated(): void {
        let updateInternalWidth = true;
        if (this.layoutData instanceof AnchorLayoutData) {
            if (this.parent.layout instanceof AnchorLayout) {
                if (!isNaN(this.layoutData.left) && !isNaN(this.layoutData.right)) {
                    updateInternalWidth = false;
                }
                if (!isNaN(this.layoutData.percentWidth)) {
                    updateInternalWidth = false;
                }
            }
        }
        if (updateInternalWidth) {
            this.updateInternalWidth();
        }
    }

    private testIfInternalHeightShouldBeCalculated(): void {
        let updateInternalHeight = true;
        if (this.layoutData instanceof AnchorLayoutData) {
            if (this.parent.layout instanceof AnchorLayout) {
                if (!isNaN(this.layoutData.top) && !isNaN(this.layoutData.bottom)) {
                    updateInternalHeight = false;
                }
                if (!isNaN(this.layoutData.percentHeight)) {
                    updateInternalHeight = false;
                }
            }
        }
        if (updateInternalHeight) {
            this.updateInternalHeight();
        }
    }

    protected layoutDataChanged(): void {
        this.dispatchEvent(new Event('invalidate', { bubbles: true }));
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

    public get parent(): IDisplayContainer {
        return this.parentNode as unknown as IDisplayContainer;
    }
}
customElements.define('layout-element', LayoutElement);
