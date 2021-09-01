import IScrollContainer from '../interfaces/core/IScrollContainer';
import { ChildElement, Layout } from '../shared/Types';
import DisplayContainer from './DisplayContainer';
import DisplayElement from './DisplayElement';

export default class ScrollContainer extends DisplayElement implements IScrollContainer {
    public constructor() {
        super();
        this.name = 'ScrollContainer';
        this.verticalScrollEnabled = true;
        this.clip = 'hidden';
        this.addEventListener('invalidate', this.childInvalid);
        this.appendChild(this.outerElement as unknown as Node);
    }

    protected childInvalid(e: Event): void {
        if (e.target === this) {
            return;
        }
        e.stopImmediatePropagation();
        this.invalidate();
    }

    protected validate(): void {
        super.validate();
        this.invalidateInternalSize();
        this.updateChildrenSizes();
    }

    private updateChildrenSizes(): void {
        this.outerElement.externalSize(this.actualWidth + this.scrollBarWidth, this.actualHeight + this.scrollBarHeight);
        if (!this.horizontalScrollEnabled && !this.verticalScrollEnabled) {
            this.elementsContainer.externalSize(this.actualWidth, this.actualHeight);
            return;
        }
        if (!this.horizontalScrollEnabled && this.verticalScrollEnabled) {
            this.elementsContainer.externalWidth = this.actualWidth;
            return;
        }
        if (this.horizontalScrollEnabled && !this.verticalScrollEnabled) {
            this.elementsContainer.externalHeight = this.actualHeight;
        }
    }

    private get scrollBarWidth(): number {
        const width = this.outerElement.offsetWidth - this.outerElement.clientWidth;
        // Just to be sure, we check if clientWidth is above 17, look below for IE11 bug
        if (width > 17) {
            return 17;
        }
        return width;
    }

    private get scrollBarHeight(): number {
        const height = this.outerElement.offsetHeight - this.outerElement.clientHeight;
        // IE11 has a bug that will return a wrong clientHeight, so we check if it'< above 17 here
        if (height > 17) {
            return 17;
        }
        return height;
    }

    protected updateInternalSize(): void {
        this.internalSize(this.elementsContainer.actualWidth, this.elementsContainer.actualHeight);
    }

    protected updateInternalWidth(): void {
        this.internalWidth = this.elementsContainer.actualWidth;
    }

    protected updateInternalHeight(): void {
        this.internalHeight = this.elementsContainer.actualHeight;
    }

    private _outerElement!: DisplayElement;

    private get outerElement(): DisplayElement {
        if (!this._outerElement) {
            this._outerElement = new DisplayElement();
            this._outerElement.name = 'ScrollOuterElement';
            this._outerElement.clip = 'scroll';
            this._outerElement.appendChild(this.elementsContainer)
        }
        return this._outerElement;
    }

    private _elementsContainer!: DisplayContainer;

    public get elementsContainer(): DisplayContainer {
        if (!this._elementsContainer) {
            this._elementsContainer = new DisplayContainer();
            // this will boost scroll performance, no repaints
            this._elementsContainer.style.willChange = 'transform';
        }
        return this._elementsContainer;
    }

    public addElement(element: ChildElement): void {
        this.elementsContainer.addElement(element);
    }

    public addElementAt(element: ChildElement, index: number): void {
        this.elementsContainer.addElementAt(element, index);
    }

    public addElements(elements: Array<ChildElement>): void {
        this.elementsContainer.addElements(elements);
    }

    public removeElement(element: ChildElement): void {
        this.elementsContainer.removeElement(element);
    }

    public removeElements(): void {
        this.elementsContainer.removeElements();
    }

    public containsElement(element: ChildElement): boolean {
        return this.elementsContainer.containsElement(element);
    }

    private _scrollEnabled = false;

    public set scrollEnabled(value: boolean) {
        if (this._scrollEnabled === value) {
            return;
        }
        this._scrollEnabled = value;
        this._horizontalScrollEnabled = value;
        this._verticalScrollEnabled = value;
        this.outerElement.clip = this.scrollEnabled ? 'scroll' : 'hidden';
        this.invalidate();
    }

    public get scrollEnabled(): boolean {
        return this._scrollEnabled;
    }

    private _horizontalScrollEnabled = false;

    public set horizontalScrollEnabled(value: boolean) {
        if (this._horizontalScrollEnabled === value) {
            return;
        }
        this._horizontalScrollEnabled = value;
        this._scrollEnabled = value && this.verticalScrollEnabled;
        this.outerElement.clipX = this.horizontalScrollEnabled ? 'scroll' : 'hidden';
        this.invalidate();
    }

    public get horizontalScrollEnabled(): boolean {
        return this._horizontalScrollEnabled;
    }

    private _verticalScrollEnabled = false;

    public set verticalScrollEnabled(value: boolean) {
        if (this._verticalScrollEnabled === value) {
            return;
        }
        this._verticalScrollEnabled = value;
        this._scrollEnabled = value && this.horizontalScrollEnabled;
        this.outerElement.clipY = this.verticalScrollEnabled ? 'scroll' : 'hidden';
        this.invalidate();
    }

    public get verticalScrollEnabled(): boolean {
        return this._verticalScrollEnabled;
    }

    public set layout(value: Layout) {
        this.elementsContainer.layout = value;
    }

    public get layout(): Layout {
        return this.elementsContainer.layout;
    }

    public set padding(value: number) {
        this.elementsContainer.padding = value;
    }

    public get padding(): number {
        return this.elementsContainer.padding;
    }

    public set paddingLeft(value: number) {
        this.elementsContainer.paddingLeft = value;
    }

    public get paddingLeft(): number {
        return this.elementsContainer.paddingLeft;
    }

    public set paddingTop(value: number) {
        this.elementsContainer.paddingTop = value;
    }

    public get paddingTop(): number {
        return this.elementsContainer.paddingTop;
    }

    public set paddingRight(value: number) {
        this.elementsContainer.paddingRight = value;
    }

    public get paddingRight(): number {
        return this.elementsContainer.paddingRight;
    }

    public set paddingBottom(value: number) {
        this.elementsContainer.paddingBottom = value;
    }

    public get paddingBottom(): number {
        return this.elementsContainer.paddingBottom;
    }

    public set paddingX(value: number) {
        this.elementsContainer.paddingX = value;
    }

    public get paddingX(): number {
        return this.elementsContainer.paddingX;
    }

    public set paddingY(value: number) {
        this.elementsContainer.paddingY = value;
    }

    public get paddingY(): number {
        return this.elementsContainer.paddingY;
    }
}
