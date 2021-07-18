import EventDispatcher from '../event/EventDispatcher';
import IHorizontalLayout from '../interfaces/layout/IHorizontalLayout';
import { HorizontalAlign, VerticalAlign } from '../shared/Types';
import ILayoutContainer from '../interfaces/core/ILayoutContainer';
import ILayoutElement from '../interfaces/core/ILayoutElement';

export default class HorizontalLayout extends EventDispatcher implements IHorizontalLayout {
    public constructor(horizontalGap = 0, horizontalAlign: HorizontalAlign = 'left', verticalAlign: VerticalAlign = 'top') {
        super();
        this.name = 'HorizontalLayout';
        this.horizontalGap = horizontalGap;
        this.horizontalAlign = horizontalAlign;
        this.verticalAlign = verticalAlign;
    }

    public resizeChildren(container: ILayoutContainer, elements: Array<ILayoutElement>): void {
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

    private getPixelPercentWidthRatio(container: ILayoutContainer, elements: Array<ILayoutElement>): number {
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

    public layoutChildren(container: ILayoutContainer, elements: Array<ILayoutElement>): void {
        if (this.verticalAlign === 'top') {
            this.layoutElementsTop(container, elements);
        } else if (this.verticalAlign === 'bottom') {
            this.layoutElementsBottom(container, elements);
        } else {
            this.layoutElementsMiddle(container, elements);
        }
    }

    private layoutElementsTop(container: ILayoutContainer, elements: Array<ILayoutElement>): void {
        let x = this.getHorizontalXStartValue(container, elements);
        for (const element of elements) {
            element.position(x, container.paddingTop);
            x += element.actualWidth + this.horizontalGap;
        }
    }

    private layoutElementsBottom(container: ILayoutContainer, elements: Array<ILayoutElement>): void {
        let x = this.getHorizontalXStartValue(container, elements);
        let y = 0;
        for (const element of elements) {
            y = container.actualHeight - container.paddingBottom - element.actualHeight;
            element.position(x, y);
            x += element.actualWidth + this.horizontalGap;
        }
    }

    private layoutElementsMiddle(container: ILayoutContainer, elements: Array<ILayoutElement>): void {
        let x = this.getHorizontalXStartValue(container, elements);
        let y = 0;
        for (const element of elements) {
            y = container.actualHeight * 0.5 - element.actualHeight * 0.5;
            element.position(x, y);
            x += element.actualWidth + this.horizontalGap;
        }
    }

    private getHorizontalXStartValue(container: ILayoutContainer, elements: Array<ILayoutElement>): number {
        if (isNaN(container.width)) {
            return container.paddingLeft;
        }
        let x = container.paddingLeft
        if (this.horizontalAlign === 'center' || this.horizontalAlign === 'right') {
            const w = container.actualWidth - container.paddingLeft - container.paddingRight;
            let elementsWidthSum = 0;
            for (const element of elements) {
                elementsWidthSum += element.actualWidth;
            }
            const horizontalGapSumWidth = this.horizontalGap * (elements.length - 1);
            if (this.horizontalAlign === 'center') {
                x += (w - elementsWidthSum - horizontalGapSumWidth) * 0.5;
            } else {
                x += (w - elementsWidthSum - horizontalGapSumWidth);
            }
        }
        return x;
    }

    public getInternalSize(container: ILayoutContainer, elements: Array<ILayoutElement>): [number, number] {
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

    public getInternalWidth(container: ILayoutContainer, elements: Array<ILayoutElement>): number {
        let width = 0;
        for (const element of elements) {
            width += element.actualWidth + this.horizontalGap;
        }
        return container.paddingLeft + width - this.horizontalGap + container.paddingRight;
    }

    public getInternalHeight(container: ILayoutContainer, elements: Array<ILayoutElement>): number {
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

    private _horizontalAlign: HorizontalAlign = 'left';

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

    private _verticalAlign: VerticalAlign = 'top';

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
        this.dispatch('invalidate');
    }
}
