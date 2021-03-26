import EventDispatcher from '../event/EventDispatcher';
import IDisplayContainer from '../interfaces/core/IDisplayContainer';
import ILayoutElement from '../interfaces/core/ILayoutElement';
import IVerticalLayout from '../interfaces/layout/IVerticalLayout';
import { HorizontalAlign } from '../types/HorizontalAlign';
import { VerticalAlign } from '../types/VerticalAlign';

export default class VerticalLayout extends EventDispatcher implements IVerticalLayout {
    public constructor(verticalGap = 0, horizontalAlign: HorizontalAlign = 'left', verticalAlign: VerticalAlign = 'top') {
        super();
        this.name = 'VerticalLayout';
        this.verticalGap = verticalGap;
        this.horizontalAlign = horizontalAlign;
        this.verticalAlign = verticalAlign;
    }

    public resizeChildren(container: IDisplayContainer & ILayoutElement, elements: Array<ILayoutElement>): void {
        console.log(container.name, this.name, 'resizeChildren()');
        if (this.horizontalAlign === 'fill') {
            this.resizeElementsFill(container, elements);
            return;
        }
        this.resizeElements(container, elements);
    }

    private resizeElementsFill(container: IDisplayContainer & ILayoutElement, elements: Array<ILayoutElement>): void {
        console.log(container.name, this.name, 'resizeElementsFill()');
    }

    private resizeElements(container: IDisplayContainer & ILayoutElement, elements: Array<ILayoutElement>): void {
        console.log(container.name, this.name, 'resizeElements()');
    }

    public layoutChildren(container: IDisplayContainer & ILayoutElement, elements: Array<ILayoutElement>): void {
        console.log(container.name, this.name, 'layoutChildren()');
        if (this.horizontalAlign === 'left') {
            this.layoutElementsLeft(container, elements);
            return;
        }
        if (this.horizontalAlign === 'right') {
            this.layoutElementsRight(container, elements);
            return;
        }
        this.layoutElementsCenter(container, elements);
    }

    private layoutElementsLeft(container: IDisplayContainer & ILayoutElement, elements: Array<ILayoutElement>): void {
        console.log(container.name, this.name, 'layoutElementsLeft()');
        let y = this.getVerticalYStartValue(container, elements);
        for (const element of elements) {
            element.position(container.paddingLeft, y);
            y += element.measuredHeight + this.verticalGap;
        }
    }

    private layoutElementsCenter(container: IDisplayContainer & ILayoutElement, elements: Array<ILayoutElement>): void {
        console.log(container.name, this.name, 'layoutElementsCenter()');
        let x = 0;
        let y = this.getVerticalYStartValue(container, elements);
        for (const element of elements) {
            x = container.measuredWidth * 0.5 - element.measuredWidth * 0.5;
            element.position(x, y);
            y += element.measuredHeight + this.verticalGap;
        }
    }

    private layoutElementsRight(container: IDisplayContainer & ILayoutElement, elements: Array<ILayoutElement>): void {
        console.log(container.name, this.name, 'layoutElementsRight()');
        let x = 0;
        let y = this.getVerticalYStartValue(container, elements);
        for (const element of elements) {
            x = container.measuredWidth - container.paddingRight - element.measuredWidth;
            element.position(x, y);
            y += element.measuredHeight + this.verticalGap;
        }
    }

    private getVerticalYStartValue(container: IDisplayContainer & ILayoutElement, elements: ILayoutElement[]): number {
        let y = container.paddingTop;
        if (this.verticalAlign === 'middle' || this.verticalAlign === 'bottom') {
            const actualHeight = container.measuredHeight - container.paddingTop - container.paddingBottom;
            let elementsHeightSum = 0;
            for (const element of elements) {
                elementsHeightSum += element.measuredHeight;
            }
            const verticalGapSumHeight = this.verticalGap * (elements.length - 1);
            if (this.verticalAlign === 'middle') {
                y += (actualHeight - elementsHeightSum - verticalGapSumHeight) * 0.5;
            } else {
                y += (actualHeight - elementsHeightSum - verticalGapSumHeight);
            }
        }
        return y;
    }

    public getInternalSize(container: IDisplayContainer & ILayoutElement, elements: Array<ILayoutElement>): [number, number] {
        console.log(container.name, this.name, 'getInternalSize()');
        let width = 0;
        let height = 0;
        for (const element of elements) {
            if (width < element.measuredWidth) {
                width = element.measuredWidth;
            }
            height += element.measuredHeight + this.verticalGap;
        }
        width = container.paddingLeft + width + container.paddingRight;
        height = container.paddingTop + height - this.verticalGap + container.paddingBottom;
        return [width, height];
    }

    public getInternalWidth(container: IDisplayContainer & ILayoutElement, elements: Array<ILayoutElement>): number {
        console.log(container.name, this.name, 'getInternalWidth()');
        let width = 0;
        for (const element of elements) {
            if (width < element.measuredWidth) {
                width = element.measuredWidth;
            }
        }
        return container.paddingLeft + width + container.paddingRight;
    }

    public getInternalHeight(container: IDisplayContainer & ILayoutElement, elements: Array<ILayoutElement>): number {
        console.log(container.name, this.name, 'getInternalHeight()');
        let height = 0;
        for (const element of elements) {
            height += element.measuredHeight + this.verticalGap;
        }
        return container.paddingTop + height - this.verticalGap + container.paddingBottom;
    }

    private _verticalGap = 0;

    public set verticalGap(value: number) {
        if (this._verticalGap === value) {
            return;
        }
        if (isNaN(value) || value < 0) {
            if (this._verticalGap !== 0) {
                this._verticalGap = 0;
                this.notify();
            }
            return;
        }
        this._verticalGap = value;
        this.notify();
    }

    public get verticalGap(): number {
        return this._verticalGap;
    }

    private notify(): void {
        this.dispatch('invalidate');
    }

    private _horizontalAlign: HorizontalAlign = 'left';

    public set horizontalAlign(value: HorizontalAlign) {
        if (this._horizontalAlign === value) {
            return;
        }
        this._horizontalAlign = value;
        this.notify();
    }

    public get horizontalAlign(): HorizontalAlign {
        return this._horizontalAlign;
    }

    private _verticalAlign: VerticalAlign = 'top';

    public set verticalAlign(value: VerticalAlign) {
        if (this._verticalAlign === value) {
            return;
        }
        this._verticalAlign = value;
        this.notify();
    }

    public get verticalAlign(): VerticalAlign {
        return this._verticalAlign;
    }
}