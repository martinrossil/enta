import Strings from '../consts/Strings';
import EventDispatcher from '../event/EventDispatcher';
import IDisplayContainer from '../interfaces/core/IDisplayContainer';
import ILayoutElement from '../interfaces/core/ILayoutElement';
import IHorizontalLayout from '../interfaces/layout/IHorizontalLayout';
import { HorizontalAlign } from '../types/HorizontalAlign';
import { VerticalAlign } from '../types/VerticalAlign';

export default class HorizontalLayout extends EventDispatcher implements IHorizontalLayout {
    public constructor(horizontalGap = 0, horizontalAlign: HorizontalAlign = Strings.LEFT, verticalAlign: VerticalAlign = Strings.TOP) {
        super();
        this.name = 'HorizontalLayout';
        this.horizontalGap = horizontalGap;
        this.horizontalAlign = horizontalAlign;
        this.verticalAlign = verticalAlign;
    }

    public resizeChildren(container: IDisplayContainer & ILayoutElement, elements: Array<ILayoutElement>): void {
        const h = container.measuredHeight - container.paddingTop - container.paddingBottom;
        if (container.hasWidth) {
            const ratio = this.getPixelPercentWidthRatio(container, elements);
            for (const element of elements) {
                if (!isNaN(element.percentWidth) && !isNaN(element.percentHeight)) {
                    element.externalSize(ratio * element.percentWidth, h * element.percentHeight / 100);
                } else if (!isNaN(element.percentWidth) && isNaN(element.percentHeight)) {
                    element.externalWidth = element.percentWidth * ratio;
                } else if (isNaN(element.percentWidth) && !isNaN(element.percentHeight)) {
                    element.externalHeight = h * element.percentHeight / 100;
                }
            }
        } else {
            for (const element of elements) {
                if (!isNaN(element.percentHeight)) {
                    element.externalHeight = h * element.percentHeight / 100;
                }
            }
        }
    }

    private getPixelPercentWidthRatio(container: IDisplayContainer & ILayoutElement, elements: Array<ILayoutElement>): number {
        let widthSum = 0;
        let percentWidthSum = 0;
        for (const element of elements) {
            if (!isNaN(element.width)) {
                widthSum += element.width;
            } else if (!isNaN(element.percentWidth)) {
                percentWidthSum += element.percentWidth;
            } else {
                widthSum += element.measuredWidth;
            }
        }
        const innerWidth = container.measuredWidth - container.paddingLeft - container.paddingRight;
        const horizontalGapSumWidth = this.horizontalGap * (elements.length - 1);
        const widthLeftForPercentWidth = innerWidth - widthSum - horizontalGapSumWidth;
        if (percentWidthSum > 100) {
            return widthLeftForPercentWidth / percentWidthSum;
        } else {
            return widthLeftForPercentWidth / 100;
        }
    }

    public layoutChildren(container: IDisplayContainer & ILayoutElement, elements: Array<ILayoutElement>): void {
        if (this.verticalAlign === Strings.TOP) {
            this.layoutElementsTop(container, elements);
        } else if (this.verticalAlign === Strings.BOTTOM) {
            this.layoutElementsBottom(container, elements);
        } else {
            this.layoutElementsMiddle(container, elements);
        }
    }

    private layoutElementsTop(container: IDisplayContainer & ILayoutElement, elements: Array<ILayoutElement>): void {
        let x = this.getHorizontalXStartValue(container, elements);
        for (const element of elements) {
            element.position(x, container.paddingTop);
            x += element.measuredWidth + this.horizontalGap;
        }
    }

    private layoutElementsBottom(container: IDisplayContainer & ILayoutElement, elements: Array<ILayoutElement>): void {
        let x = this.getHorizontalXStartValue(container, elements);
        let y = 0;
        for (const element of elements) {
            y = container.measuredHeight - container.paddingBottom - element.measuredHeight;
            element.position(x, y);
            x += element.measuredWidth + this.horizontalGap;
        }
    }

    private layoutElementsMiddle(container: IDisplayContainer & ILayoutElement, elements: Array<ILayoutElement>): void {
        let x = this.getHorizontalXStartValue(container, elements);
        let y = 0;
        for (const element of elements) {
            y = container.measuredHeight * 0.5 - element.measuredHeight * 0.5;
            element.position(x, y);
            x += element.measuredWidth + this.horizontalGap;
        }
    }

    private getHorizontalXStartValue(container: IDisplayContainer & ILayoutElement, elements: ILayoutElement[]): number {
        if (!container.hasWidth) {
            return container.paddingLeft;
        }
        let x = container.paddingLeft
        if (this.horizontalAlign === Strings.CENTER || this.horizontalAlign === Strings.RIGHT) {
            const w = container.measuredWidth - container.paddingLeft - container.paddingRight;
            let elementsWidthSum = 0;
            for (const element of elements) {
                elementsWidthSum += element.measuredWidth;
            }
            const horizontalGapSumWidth = this.horizontalGap * (elements.length - 1);
            if (this.horizontalAlign === Strings.CENTER) {
                x += (w - elementsWidthSum - horizontalGapSumWidth) * 0.5;
            } else {
                x += (w - elementsWidthSum - horizontalGapSumWidth);
            }
        }
        return x;
    }

    public getInternalSize(container: IDisplayContainer & ILayoutElement, elements: Array<ILayoutElement>): [number, number] {
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
        let width = 0;
        for (const element of elements) {
            width += element.measuredWidth + this.horizontalGap;
        }
        return container.paddingLeft + width - this.horizontalGap + container.paddingRight;
    }

    public getInternalHeight(container: IDisplayContainer & ILayoutElement, elements: Array<ILayoutElement>): number {
        let height = 0;
        for (const element of elements) {
            if (height < element.measuredHeight) {
                height = element.measuredHeight;
            }
        }
        return container.paddingTop + height + container.paddingBottom;
    }

    private _horizontalGap = 0;

    public set horizontalGap(value: number) {
        if (this._horizontalGap === value) {
            return;
        }
        if (isNaN(value) || value < 0) {
            if (this._horizontalGap !== 0) {
                this._horizontalGap = 0;
                this.notifyInvalid();
            }
            return;
        }
        this._horizontalGap = value;
        this.notifyInvalid();
    }

    public get horizontalGap(): number {
        return this._horizontalGap;
    }

    private _horizontalAlign: HorizontalAlign = Strings.LEFT;

    public set horizontalAlign(value: HorizontalAlign) {
        if (this._horizontalAlign === value) {
            return;
        }
        this._horizontalAlign = value;
        this.notifyInvalid();
    }

    public get horizontalAlign(): HorizontalAlign {
        return this._horizontalAlign;
    }

    private _verticalAlign: VerticalAlign = Strings.TOP;

    public set verticalAlign(value: VerticalAlign) {
        if (this._verticalAlign === value) {
            return;
        }
        this._verticalAlign = value;
        this.notifyInvalid();
    }

    public get verticalAlign(): VerticalAlign {
        return this._verticalAlign;
    }

    private notifyInvalid(): void {
        this.dispatch(Strings.INVALIDATE);
    }
}
