import EventDispatcher from '../event/EventDispatcher';
import IDisplayContainer from '../interfaces/core/IDisplayContainer';
import ILayoutElement from '../interfaces/core/ILayoutElement';
import IHorizontalLayout from '../interfaces/layout/IHorizontalLayout';
import { HorizontalAlign } from '../types/HorizontalAlign';
import { VerticalAlign } from '../types/VerticalAlign';
import HorizontalLayoutData from './HorizontalLayoutData';

export default class HorizontalLayout extends EventDispatcher implements IHorizontalLayout {
    public constructor(horizontalGap = 0, horizontalAlign: HorizontalAlign = 'left', verticalAlign: VerticalAlign = 'top') {
        super();
        this.name = 'HorizontalLayout';
        this.horizontalGap = horizontalGap;
        this.horizontalAlign = horizontalAlign;
        this.verticalAlign = verticalAlign;
    }

    public resizeChildren(container: IDisplayContainer & ILayoutElement, elements: Array<ILayoutElement>): void {
        console.log(container.name, this.name, 'resizeChildren()');
        if (container.hasWidth) {
            console.log(this.name, 'resizeChildren hasWidth');
            if (this.horizontalAlign === 'fill') {
                if (this.verticalAlign === 'fill') {
                    this.resizeElementsHorizontalVerticalFill(container, elements);
                    return;
                }
                if (this.verticalAlign === 'middle') {
                    this.resizeElementsHorizontalFillVerticalMiddle(container, elements);
                }
            }
        }
    }

    private resizeElementsHorizontalVerticalFill(container: IDisplayContainer & ILayoutElement, elements: Array<ILayoutElement>): void {
        console.log(this.name, 'resizeElementsHorizontalVerticalFill()');
    }

    private resizeElementsHorizontalFillVerticalMiddle(container: IDisplayContainer & ILayoutElement, elements: Array<ILayoutElement>): void {
        console.log(this.name, 'resizeElementsHorizontalFillVerticalMiddle()');
        const [widthSum, percentWidthSum, fillCount] = this.getElementsPercentWidthValues(elements);
        console.log(widthSum, percentWidthSum, fillCount);
        const innerWidth = container.measuredWidth - container.paddingLeft - container.paddingRight;
        const horizontalGapSumWidth = this.horizontalGap * (elements.length - 1);
        const widthLeftForPercentWidth = innerWidth - widthSum - horizontalGapSumWidth;
        let pixelPercentRatio;
        let widthLeftForFillWidth;
        let fillWidth = 0;
        if (percentWidthSum > 100) {
            pixelPercentRatio = widthLeftForPercentWidth / percentWidthSum;
            widthLeftForFillWidth = 0;
        } else {
            pixelPercentRatio = widthLeftForPercentWidth / 100;
            widthLeftForFillWidth = widthLeftForPercentWidth - (widthLeftForPercentWidth / 100 * percentWidthSum);
            fillWidth = widthLeftForFillWidth / fillCount;
        }
        for (const element of elements) {
            if (element.layoutData instanceof HorizontalLayoutData) {
                if (!isNaN(element.layoutData.percentWidth)) {
                    element.externalWidth = pixelPercentRatio * element.layoutData.percentWidth;
                } else {
                    element.externalWidth = fillWidth;
                }
            }
        }
    }

    private getElementsPercentWidthValues(elements: Array<ILayoutElement>): [number, number, number] {
        let widthSum = 0;
        let percentWidthSum = 0;
        let fillCount = 0;
        for (const element of elements) {
            if (!isNaN(element.width)) {
                widthSum += element.width;
            } else if (element.layoutData instanceof HorizontalLayoutData) {
                if (!isNaN(element.layoutData.percentWidth)) {
                    percentWidthSum += element.layoutData.percentWidth;
                } else {
                    fillCount++;
                }
            } else {
                widthSum += element.measuredWidth;
            }
        }
        return [widthSum, percentWidthSum, fillCount];
    }

    public layoutChildren(container: IDisplayContainer & ILayoutElement, elements: Array<ILayoutElement>): void {
        console.log(container.name, this.name, 'layoutChildren()');
        if (this.verticalAlign === 'top') {
            console.log(this.name, 'layoutElementsTop()');
            // this.layoutElementsTop(container, elements);
            return;
        }
        if (this.verticalAlign === 'bottom') {
            console.log(this.name, 'layoutElementsBottom()');
            // this.layoutElementsBottom(container, elements);
            return;
        }
        this.layoutElementsMiddle(container, elements);
    }

    private layoutElementsMiddle(container: IDisplayContainer & ILayoutElement, elements: Array<ILayoutElement>): void {
        console.log(this.name, 'layoutElementsMiddle()');
        let x = this.getHorizontalXStartValue(container, elements);
        let y = 0;
        for (const element of elements) {
            y = container.measuredHeight * 0.5 - element.measuredHeight * 0.5;
            element.position(x, y);
            x += element.measuredWidth + this.horizontalGap;
        }
    }

    private getHorizontalXStartValue(container: IDisplayContainer & ILayoutElement, elements: ILayoutElement[]): number {
        let x = container.paddingLeft;
        if (this.horizontalAlign === 'center' || this.horizontalAlign === 'right') {
            const innerWidth = container.measuredWidth - container.paddingLeft - container.paddingRight;
            let elementsWidthSum = 0;
            for (const element of elements) {
                elementsWidthSum += element.measuredWidth;
            }
            const horizontalGapSumWidth = this.horizontalGap * (elements.length - 1);
            if (this.horizontalAlign === 'center') {
                x += (innerWidth - elementsWidthSum - horizontalGapSumWidth) * 0.5;
            } else {
                x += (innerWidth - elementsWidthSum - horizontalGapSumWidth);
            }
        }
        return x;
    }

    public getInternalSize(container: IDisplayContainer & ILayoutElement, elements: Array<ILayoutElement>): [number, number] {
        console.log(container.name, this.name, 'getInternalSize()');
        let width = 0;
        let height = 0;
        for (const element of elements) {
            if (height < element.measuredHeight) {
                height = element.measuredHeight;
            }
            width += element.measuredWidth + this.horizontalGap;
        }
        width = container.paddingLeft + width - this.horizontalGap + container.paddingRight;
        height = container.paddingTop + height + container.paddingBottom;
        return [width, height];
    }

    public getInternalWidth(container: IDisplayContainer & ILayoutElement, elements: Array<ILayoutElement>): number {
        console.log(container.name, this.name, 'getInternalWidth()');
        return 0;
    }

    public getInternalHeight(container: IDisplayContainer & ILayoutElement, elements: Array<ILayoutElement>): number {
        console.log(container.name, this.name, 'getInternalHeight()');
        return 0;
    }

    private _horizontalGap = 0;

    public set horizontalGap(value: number) {
        if (this._horizontalGap === value) {
            return;
        }
        if (isNaN(value) || value < 0) {
            if (this._horizontalGap !== 0) {
                this._horizontalGap = 0;
                this.notify();
            }
            return;
        }
        this._horizontalGap = value;
        this.notify();
    }

    public get horizontalGap(): number {
        return this._horizontalGap;
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

    private notify(): void {
        this.dispatch('invalidate');
    }
}
