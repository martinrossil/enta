import ILinkContainer from '../interfaces/core/ILinkContainer';
import { AnchorTarget, ChildElement, Layout } from '../shared/Types';
import DisplayContainer from './DisplayContainer';
import DisplayElement from './DisplayElement';

export default class LinkContainer extends DisplayElement implements ILinkContainer {
    public constructor() {
        super();
        this.name = 'LinkContainer';
        this.addEventListener('invalidate', this.childInvalid);
        this.appendChild(this.anchorElement);
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
        this.updateInnerContainerSize();
    }

    protected updateInternalSize(): void {
        this.internalSize(this.innerContainer.actualWidth, this.innerContainer.actualHeight);
    }

    protected updateInternalWidth(): void {
        this.internalWidth = this.innerContainer.actualWidth;
    }

    protected updateInternalHeight(): void {
        this.internalHeight = this.innerContainer.actualHeight;
    }

    private updateInnerContainerSize(): void {
        let updateInnerContainerWidth = false;
        let updateInnerContainerHeight = false;
        if (!isNaN(this.width) || !isNaN(this.externalWidth)) {
            updateInnerContainerWidth = true;
        }
        if (!isNaN(this.height) || !isNaN(this.externalHeight)) {
            updateInnerContainerHeight = true;
        }
        if (updateInnerContainerWidth && updateInnerContainerHeight) {
            this.innerContainer.externalSize(this.actualWidth, this.actualHeight);
        } else if (updateInnerContainerWidth && !updateInnerContainerHeight) {
            this.innerContainer.externalWidth = this.actualWidth;
        } else if (!updateInnerContainerWidth && updateInnerContainerHeight) {
            this.innerContainer.externalHeight = this.actualHeight;
        }
    }

    private _anchorElement!: HTMLAnchorElement;
    private get anchorElement(): HTMLAnchorElement {
        if (!this._anchorElement) {
            this._anchorElement = document.createElement('a');
            this._anchorElement.rel = 'noopener';
            this._anchorElement.target = this.target;
            this._anchorElement.appendChild(this.innerContainer as unknown as Node);
        }
        return this._anchorElement;
    }

    private _innerContainer!: DisplayContainer;
    private get innerContainer(): DisplayContainer {
        if (!this._innerContainer) {
            this._innerContainer = new DisplayContainer();
        }
        return this._innerContainer;
    }

    private _target: AnchorTarget = '_self';
    public set target(value: AnchorTarget) {
        if (this._target === value) {
            return;
        }
        this._target = value;
        this.anchorElement.target = value;
    }

    public get target(): AnchorTarget {
        return this._target;
    }

    private _href = '';
    public set href(value: string) {
        if (this._href === value) {
            return;
        }
        this._href = value;
        this.anchorElement.href = value;
    }

    public get href(): string {
        return this._href;
    }

    public set layout(value: Layout) {
        this.innerContainer.layout = value;
    }

    public get layout(): Layout {
        return this.innerContainer.layout;
    }

    public addElement(element: ChildElement): void {
        this.innerContainer.addElement(element);
    }

    public addElementAt(element: ChildElement, index: number): void {
        this.innerContainer.addElementAt(element, index);
    }

    public addElements(elements: Array<ChildElement>): void {
        this.innerContainer.addElements(elements);
    }

    public removeElement(element: ChildElement): void {
        this.innerContainer.removeElement(element);
    }

    public removeElements(): void {
        this.innerContainer.removeElements();
    }

    public containsElement(element: ChildElement): boolean {
        return this.innerContainer.contains(element as unknown as Node);
    }

    public set padding(value: number) {
        this.innerContainer.padding = value;
    }

    public get padding(): number {
        return this.innerContainer.padding;
    }

    public set paddingLeft(value: number) {
        this.innerContainer.paddingLeft = value;
    }

    public get paddingLeft(): number {
        return this.innerContainer.paddingLeft;
    }

    public set paddingTop(value: number) {
        this.innerContainer.paddingTop = value;
    }

    public get paddingTop(): number {
        return this.innerContainer.paddingTop;
    }

    public set paddingRight(value: number) {
        this.innerContainer.paddingRight = value;
    }

    public get paddingRight(): number {
        return this.innerContainer.paddingRight;
    }

    public set paddingBottom(value: number) {
        this.innerContainer.paddingBottom = value;
    }

    public get paddingBottom(): number {
        return this.innerContainer.paddingBottom;
    }

    public set paddingX(value: number) {
        this.innerContainer.paddingX = value;
    }

    public get paddingX(): number {
        return this.innerContainer.paddingX;
    }

    public set paddingY(value: number) {
        this.innerContainer.paddingY = value;
    }

    public get paddingY(): number {
        return this.innerContainer.paddingY;
    }
}
customElements.define('link-container', LinkContainer);
