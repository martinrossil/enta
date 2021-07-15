import Strings from '../consts/Strings';
import IDisplayContainer from '../interfaces/core/IDisplayContainer';
import ILayout from '../interfaces/layout/ILayout';
import AnchorLayout from '../layout/AnchorLayout';
import IDisplayElement from '../interfaces/core/IDisplayElement';
import DisplayElement from '../core/DisplayElement';
import ISvgElement from '../interfaces/svg/ISvgElement';

export default class DisplayContainer extends DisplayElement implements IDisplayContainer {
    public constructor() {
        super();
        this.name = 'DisplayContainer';
        this.addEventListener(Strings.INVALIDATE, this.childInvalid);
    }

    protected validate(): void {
        super.validate();
        this.invalidateInternalSize();
        this.resizeChildren();
        this.layoutChildren();
    }

    protected resizeChildren(): void {
        this.layout.resizeChildren(this, this.elements);
    }

    protected layoutChildren(): void {
        this.layout.layoutChildren(this, this.elements);
    }

    protected updateInternalSize(): void {
        const [width, height] = this.layout.getInternalSize(this, this.elements);
        this.internalSize(width, height);
    }

    protected updateInternalWidth(): void {
        this.internalWidth = this.layout.getInternalWidth(this, this.elements);
    }

    protected updateInternalHeight(): void {
        this.internalHeight = this.layout.getInternalHeight(this, this.elements);
    }

    protected childInvalid(e: Event): void {
        if (e.target === this) {
            return;
        }
        e.stopImmediatePropagation();
        this.invalidate();
    }

    protected elements: Array<IDisplayElement | ISvgElement> = [];

    public addElement(element: IDisplayElement | ISvgElement): void {
        this.elements.push(element);
        this.appendChild(element as unknown as Node);
        this.invalidate();
    }

    public addElementAt(element: IDisplayElement | ISvgElement, index: number): void {
        if (this.elements[index]) {
            const beforeElement: Node = this.elements[index] as unknown as Node;
            this.elements.splice(index, 0, element);
            this.insertBefore(element as unknown as Node, beforeElement);
            this.invalidate();
            return;
        }
        this.elements.push(element);
        this.appendChild(element as unknown as Node);
        this.invalidate();
    }

    public addElements(elements: Array<IDisplayElement | ISvgElement>): void {
        const frag: DocumentFragment = document.createDocumentFragment();
        for (const element of elements) {
            this.elements.push(element);
            frag.appendChild(element as unknown as Node);
        }
        this.appendChild(frag);
        this.invalidate();
    }

    public removeElement(element: IDisplayElement | ISvgElement): void {
        const start: number = this.elements.indexOf(element);
        if (start !== -1) {
            this.elements.splice(start, 1);
            this.removeChild(element as unknown as Node);
            this.invalidate();
        }
    }

    public removeElements(): void {
        if (this.elements.length > 0) {
            this.elements.length = 0;
            while (this.firstChild) {
                this.removeChild(this.firstChild);
            }
            this.invalidate();
        }
    }

    public containsElement(element: IDisplayElement | ISvgElement): boolean {
        return this.contains(element as unknown as Node);
    }

    private _layout!: ILayout;

    public set layout(value: ILayout) {
        if (this._layout === value) {
            return;
        }
        if (this._layout) {
            this._layout.removeEventListener(Strings.INVALIDATE, this.invalidate);
        }
        this._layout = value;
        this._layout.addEventListener(Strings.INVALIDATE, this.invalidate);
        this.invalidate();
    }

    public get layout(): ILayout {
        if (!this._layout) {
            this._layout = new AnchorLayout();
            this._layout.addEventListener(Strings.INVALIDATE, this.invalidate);
        }
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
            this._paddingX = 0;
            this.paddingY = 0;
            this.invalidate();
            return;
        }
        this._padding = value;
        this._paddingTop = value;
        this._paddingRight = value;
        this._paddingBottom = value;
        this._paddingLeft = value;
        this._paddingX = value;
        this._paddingY = value;
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
customElements.define('enta-dc', DisplayContainer);
