import IDisplayContainer from '../interfaces/core/IDisplayContainer';
import IDisplayElement from '../interfaces/core/IDisplayElement';
import ILayoutElement from '../interfaces/core/ILayoutElement';
import ILayout from '../interfaces/layout/ILayout';
import DisplayElement from './DisplayElement';

export default class DisplayContainer extends DisplayElement implements IDisplayContainer {
    public constructor() {
        super();
        this.name = 'DisplayContainer';
        this.addEventListener('invalidate', this.childInvalid);
    }

    protected validate(): void {
        super.validate();
        console.log(this.name, 'validate()');
        this.invalidateInternalSize();
        this.resizeChildren();
        this.layoutChildren();
    }

    protected resizeChildren(): void {
        if (this.layout) {
            this.layout.resizeChildren(this, this.elements);
        }
    }

    protected layoutChildren(): void {
        if (this.layout) {
            this.layout.layoutChildren(this, this.elements);
            return;
        }
        this.layoutChildrenFromPadding();
    }

    protected layoutChildrenFromPadding(): void {
        for (const element of this.elements) {
            element.position(this.paddingLeft, this.paddingTop);
        }
    }

    protected updateInternalSize(): void {
        console.log(this.name, 'updateInternalSize()');
        if (this.layout) {
            this.setInternalSizeFromLayout(this.layout);
            return;
        }
        this.setInternalSizeFromChildren();
    }

    protected setInternalSizeFromLayout(layout: ILayout): void {
        const [width, height] = layout.getInternalSize(this, this.elements);
        this.internalSize(width, height);
    }

    protected setInternalSizeFromChildren(): void {
        let width = 0;
        let height = 0;
        for (const element of this.elements) {
            if (width < element.measuredWidth) {
                width = element.measuredWidth;
            }
            if (height < element.measuredHeight) {
                height = element.measuredHeight;
            }
        }
        width = this.paddingLeft + width + this.paddingRight;
        height = this.paddingTop + height + this.paddingBottom;
        this.internalSize(width, height);
    }

    protected updateInternalWidth(): void {
        if (this.layout) {
            this.internalWidth = this.layout.getInternalWidth(this, this.elements);
            return;
        }
        this.setInternalWidthFromChildren();
    }

    protected setInternalWidthFromChildren(): void {
        let width = 0;
        for (const element of this.elements) {
            if (width < element.measuredWidth) {
                width = element.measuredWidth;
            }
        }
        this.internalWidth = width;
    }

    protected updateInternalHeight(): void {
        if (this.layout) {
            this.internalHeight = this.layout.getInternalHeight(this, this.elements);
            return;
        }
        this.setInternalHeightFromChildren();
    }

    protected setInternalHeightFromChildren(): void {
        let height = 0;
        for (const element of this.elements) {
            if (height < element.measuredHeight) {
                height = element.measuredHeight;
            }
        }
        this.internalHeight = height;
    }

    protected childInvalid(e: Event): void {
        if (e.target === this) {
            return;
        }
        e.stopImmediatePropagation();
        this.invalidate();
    }

    protected elements: Array<ILayoutElement> = [];

    public addElement(element: IDisplayElement): void {
        this.elements.push(element as unknown as ILayoutElement);
        this.appendChild(element as unknown as Node);
        this.invalidate();
    }

    public addElements(elements: Array<IDisplayElement>): void {
        const frag: DocumentFragment = document.createDocumentFragment();
        for (const element of elements) {
            this.elements.push(element as unknown as ILayoutElement);
            frag.appendChild(element as unknown as Node);
        }
        this.appendChild(frag);
        this.invalidate();
    }

    private _layout: ILayout | null = null;

    public set layout(value: ILayout | null) {
        if (this._layout === value) {
            return;
        }
        if (this._layout) {
            this._layout.removeEventListener('invalidate', this.invalidate);
        }
        this._layout = value;
        if (this._layout) {
            this._layout.addEventListener('invalidate', this.invalidate);
        }
        this.invalidate();
    }

    public get layout(): ILayout | null {
        return this._layout;
    }

    private _padding = 0;

    public set padding(value: number) {
        if (isNaN(value) || value < 0) {
            this._padding = 0;
            this._paddingLeft = 0;
            this._paddingTop = 0;
            this._paddingRight = 0;
            this._paddingBottom = 0;
            this.invalidate();
            return;
        }
        this._padding = value;
        this._paddingTop = value;
        this._paddingRight = value;
        this._paddingBottom = value;
        this._paddingLeft = value;
        this.invalidate();
    }

    public get padding(): number {
        return this._padding;
    }

    private _paddingTop = 0;

    public set paddingTop(value: number) {
        if (this._paddingTop === value) {
            return;
        }
        if (isNaN(value) || value < 0) {
            if (this._paddingTop !== 0) {
                this._paddingTop = 0;
                this.invalidate();
            }
            return;
        }
        this._paddingTop = value;
        this.invalidate();
    }

    public get paddingTop(): number {
        return this._paddingTop;
    }

    private _paddingRight = 0;

    public set paddingRight(value: number) {
        if (isNaN(value) || value < 0) {
            if (this._paddingRight !== 0) {
                this._paddingRight = 0;
                this.invalidate();
            }
            return;
        }
        this._paddingRight = value;
        this.invalidate();
    }

    public get paddingRight(): number {
        return this._paddingRight;
    }

    private _paddingBottom = 0;

    public set paddingBottom(value: number) {
        if (isNaN(value) || value < 0) {
            if (this._paddingBottom !== 0) {
                this._paddingBottom = 0;
                this.invalidate();
            }
            return;
        }
        this._paddingBottom = value;
        this.invalidate();
    }

    public get paddingBottom(): number {
        return this._paddingBottom;
    }

    private _paddingLeft = 0;

    public set paddingLeft(value: number) {
        if (this._paddingLeft === value) {
            return;
        }
        if (isNaN(value) || value < 0) {
            if (this._paddingLeft !== 0) {
                this._paddingLeft = 0;
                this.invalidate();
            }
            return;
        }
        this._paddingLeft = value;
        this.invalidate();
    }

    public get paddingLeft(): number {
        return this._paddingLeft;
    }

    private _paddingX = 0;

    public set paddingX(value: number) {
        if (this._paddingX === value) {
            return;
        }
        if (isNaN(value) || value < 0) {
            if (this._paddingX !== 0) {
                this._paddingX = 0;
                this._paddingLeft = 0;
                this._paddingRight = 0;
                this.invalidate();
            }
            return;
        }
        this._paddingX = value;
        this._paddingLeft = value;
        this._paddingRight = value;
        this.invalidate();
    }

    public get paddingX(): number {
        return this._paddingX;
    }

    private _paddingY = 0;

    public set paddingY(value: number) {
        if (this._paddingY === value) {
            return;
        }
        if (isNaN(value) || value < 0) {
            if (this._paddingY !== 0) {
                this._paddingY = 0;
                this._paddingTop = 0;
                this._paddingBottom = 0;
                this.invalidate();
            }
            return;
        }
        this._paddingY = value;
        this._paddingTop = value;
        this._paddingBottom = value;
        this.invalidate();
    }

    public get paddingY(): number {
        return this._paddingY;
    }
}
customElements.define('display-container', DisplayContainer);
