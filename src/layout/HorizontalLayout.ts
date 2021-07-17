import Strings from '../consts/Strings';
import EventDispatcher from '../event/EventDispatcher';
import IHorizontalLayout from '../interfaces/layout/IHorizontalLayout';
import { HorizontalAlign } from '../types/HorizontalAlign';
import { VerticalAlign } from '../types/VerticalAlign';
import ISvgElement from '../interfaces/svg/ISvgElement';
import IDisplayContainer from '../interfaces/core/IDisplayContainer';
import IDisplayElement from '../interfaces/core/IDisplayElement';

export default class HorizontalLayout extends EventDispatcher implements IHorizontalLayout {
    public constructor(horizontalGap = 0, horizontalAlign: HorizontalAlign = Strings.LEFT, verticalAlign: VerticalAlign = Strings.TOP) {
        super();
        this.name = 'HorizontalLayout';
        this.horizontalGap = horizontalGap;
        this.horizontalAlign = horizontalAlign;
        this.verticalAlign = verticalAlign;
    }

        const h = container.actualHeight - container.paddingTop - container.paddingBottom;
        if (!isNaN(container.width)) {
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

    private getPixelPercentWidthRatio(container: IDisplayContainer, elements: Array<IDisplayElement | ISvgElement>): number {
        let widthSum = 0;
        let percentWidthSum = 0;
        for (const element of elements) {
            if (!isNaN(element.width)) {
                widthSum += element.width;
            } else if (!isNaN(element.percentWidth)) {
                percentWidthSum += element.percentWidth;
            } else {
                widthSum += element.actualWidth;
            }
        }
        const innerWidth = container.actualWidth - container.paddingLeft - container.paddingRight;
        const horizontalGapSumWidth = this.horizontalGap * (elements.length - 1);
        const widthLeftForPercentWidth = innerWidth - widthSum - horizontalGapSumWidth;
        if (percentWidthSum > 100) {
            return widthLeftForPercentWidth / percentWidthSum;
        } else {
            return widthLeftForPercentWidth / 100;
        }
    }

    public layoutChildren(container: IDisplayContainer, elements: Array<IDisplayElement | ISvgElement>): void {
        if (this.verticalAlign === Strings.TOP) {
            this.layoutElementsTop(container, elements);
        } else if (this.verticalAlign === Strings.BOTTOM) {
            this.layoutElementsBottom(container, elements);
        } else {
            this.layoutElementsMiddle(container, elements);
        }
    }

    private layoutElementsTop(container: IDisplayContainer, elements: Array<IDisplayElement | ISvgElement>): void {
        let x = this.getHorizontalXStartValue(container, elements);
        for (const element of elements) {
            element.position(x, container.paddingTop);
            x += element.actualWidth + this.horizontalGap;
        }
    }

    private layoutElementsBottom(container: IDisplayContainer, elements: Array<IDisplayElement | ISvgElement>): void {
        let x = this.getHorizontalXStartValue(container, elements);
        let y = 0;
        for (const element of elements) {
            y = container.actualHeight - container.paddingBottom - element.actualHeight;
            element.position(x, y);
            x += element.actualWidth + this.horizontalGap;
        }
    }

    private layoutElementsMiddle(container: IDisplayContainer, elements: Array<IDisplayElement | ISvgElement>): void {
        let x = this.getHorizontalXStartValue(container, elements);
        let y = 0;
        for (const element of elements) {
            y = container.actualHeight * 0.5 - element.actualHeight * 0.5;
            element.position(x, y);
            x += element.actualWidth + this.horizontalGap;
        }
    }

    private getHorizontalXStartValue(container: IDisplayContainer, elements: Array<IDisplayElement | ISvgElement>): number {
        if (isNaN(container.width)) {
            return container.paddingLeft;
        }
        let x = container.paddingLeft
        if (this.horizontalAlign === Strings.CENTER || this.horizontalAlign === Strings.RIGHT) {
            const w = container.actualWidth - container.paddingLeft - container.paddingRight;
            let elementsWidthSum = 0;
            for (const element of elements) {
                elementsWidthSum += element.actualWidth;
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

    public getInternalSize(container: IDisplayContainer, elements: Array<IDisplayElement | ISvgElement>): [number, number] {
        let width = 0;
        let height = 0;
        for (const element of elements) {
            if (height < element.actualHeight) {
                height = element.actualHeight;
            }
            width += element.actualWidth + this.horizontalGap;
        }
        width = container.paddingLeft + width - this.horizontalGap + container.paddingRight;
        height = container.paddingTop + height + container.paddingBottom;
        return [width, height];
    }

    public getInternalWidth(container: IDisplayContainer, elements: Array<IDisplayElement | ISvgElement>): number {
        let width = 0;
        for (const element of elements) {
            width += element.actualWidth + this.horizontalGap;
        }
        return container.paddingLeft + width - this.horizontalGap + container.paddingRight;
    }

    public getInternalHeight(container: IDisplayContainer, elements: Array<IDisplayElement | ISvgElement>): number {
        let height = 0;
        for (const element of elements) {
            if (height < element.actualHeight) {
                height = element.actualHeight;
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
