import Strings from '../consts/Strings';
import EventDispatcher from '../event/EventDispatcher';
import IDisplayContainer from '../interfaces/core/IDisplayContainer';
import ILayoutElement from '../interfaces/core/ILayoutElement';
import IVerticalLayout from '../interfaces/layout/IVerticalLayout';
import { HorizontalAlign } from '../types/HorizontalAlign';
import { VerticalAlign } from '../types/VerticalAlign';

export default class VerticalLayout extends EventDispatcher implements IVerticalLayout {
    public constructor(verticalGap = 0, horizontalAlign: HorizontalAlign = Strings.LEFT, verticalAlign: VerticalAlign = Strings.TOP) {
        super();
        this.name = 'VerticalLayout';
        this.verticalGap = verticalGap;
        this.horizontalAlign = horizontalAlign;
        this.verticalAlign = verticalAlign;
    }

    public resizeChildren(container: IDisplayContainer & ILayoutElement, elements: Array<ILayoutElement>): void {
        const w = container.measuredWidth - container.paddingLeft - container.paddingRight;
        if (container.hasHeight) {
            const ratio = this.getPixelPercentHeightRatio(container, elements);
            for (const element of elements) {
                if (!isNaN(element.percentWidth) && !isNaN(element.percentHeight)) {
                    element.externalSize(w * element.percentWidth / 100, ratio * element.percentHeight);
                } else if (!isNaN(element.percentWidth) && isNaN(element.percentHeight)) {
                    element.externalWidth = w * element.percentWidth / 100;
                } else if (isNaN(element.percentWidth) && !isNaN(element.percentHeight)) {
                    element.externalHeight = element.percentHeight * ratio;
                }
            }
        } else {
            for (const element of elements) {
                if (!isNaN(element.percentWidth)) {
                    element.externalWidth = w * element.percentWidth / 100;
                }
            }
        }
    }

    private getPixelPercentHeightRatio(container: IDisplayContainer & ILayoutElement, elements: Array<ILayoutElement>): number {
        let heightSum = 0;
        let percentHeightSum = 0;
        for (const element of elements) {
            if (!isNaN(element.height)) {
                heightSum += element.height;
            } else if (!isNaN(element.percentHeight)) {
                percentHeightSum += element.percentHeight;
            } else {
                heightSum += element.measuredHeight;
            }
        }
        const innerHeight = container.measuredHeight - container.paddingTop - container.paddingBottom;
        const verticalGapSumHeight = this.verticalGap * (elements.length - 1);
        const heightLeftForPercentHeight = innerHeight - heightSum - verticalGapSumHeight;
        if (percentHeightSum > 100) {
            return heightLeftForPercentHeight / percentHeightSum;
        } else {
            return heightLeftForPercentHeight / 100;
        }
    }

    public layoutChildren(container: IDisplayContainer & ILayoutElement, elements: Array<ILayoutElement>): void {
        if (this.horizontalAlign === Strings.LEFT) {
            this.layoutElementsLeft(container, elements);
        } else if (this.horizontalAlign === Strings.RIGHT) {
            this.layoutElementsRight(container, elements);
        } else {
            this.layoutElementsCenter(container, elements);
        }
    }

    private layoutElementsLeft(container: IDisplayContainer & ILayoutElement, elements: Array<ILayoutElement>): void {
        let y = this.getVerticalYStartValue(container, elements);
        for (const element of elements) {
            element.position(container.paddingLeft, y);
            y += element.measuredHeight + this.verticalGap;
        }
    }

    private layoutElementsRight(container: IDisplayContainer & ILayoutElement, elements: Array<ILayoutElement>): void {
        let x = 0;
        let y = this.getVerticalYStartValue(container, elements);
        for (const element of elements) {
            x = container.measuredWidth - container.paddingRight - element.measuredWidth;
            element.position(x, y);
            y += element.measuredHeight + this.verticalGap;
        }
    }

    private layoutElementsCenter(container: IDisplayContainer & ILayoutElement, elements: Array<ILayoutElement>): void {
        let x = 0;
        let y = this.getVerticalYStartValue(container, elements);
        for (const element of elements) {
            x = container.measuredWidth * 0.5 - element.measuredWidth * 0.5;
            element.position(x, y);
            y += element.measuredHeight + this.verticalGap;
        }
    }

    private getVerticalYStartValue(container: IDisplayContainer & ILayoutElement, elements: ILayoutElement[]): number {
        if (!container.hasHeight) {
            return container.paddingTop;
        }
        let y = container.paddingTop;
        if (this.verticalAlign === Strings.MIDDLE || this.verticalAlign === Strings.BOTTOM) {
            const innerHeight = container.measuredHeight - container.paddingTop - container.paddingBottom;
            let elementsHeightSum = 0;
            for (const element of elements) {
                elementsHeightSum += element.measuredHeight;
            }
            const verticalGapSumHeight = this.verticalGap * (elements.length - 1);
            if (this.verticalAlign === Strings.MIDDLE) {
                y += (innerHeight - elementsHeightSum - verticalGapSumHeight) * 0.5;
            } else {
                y += (innerHeight - elementsHeightSum - verticalGapSumHeight);
            }
        }
        return y;
    }

    public getInternalSize(container: IDisplayContainer & ILayoutElement, elements: Array<ILayoutElement>): [number, number] {
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
        let width = 0;
        for (const element of elements) {
            if (width < element.measuredWidth) {
                width = element.measuredWidth;
            }
        }
        return container.paddingLeft + width + container.paddingRight;
    }

    public getInternalHeight(container: IDisplayContainer & ILayoutElement, elements: Array<ILayoutElement>): number {
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
                this.notifyInvalid();
            }
            return;
        }
        this._verticalGap = value;
        this.notifyInvalid();
    }

    public get verticalGap(): number {
        return this._verticalGap;
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
