import EventDispatcher from '../event/EventDispatcher';
import IDisplayContainer from '../interfaces/core/IDisplayContainer';
import ILayoutElement from '../interfaces/core/ILayoutElement';
import IAnchorLayout from '../interfaces/layout/IAnchorLayout';
import IAnchorLayoutData from '../interfaces/layout/IAnchorLayoutData';
import AnchorLayoutData from './AnchorLayoutData';

export default class AnchorLayout extends EventDispatcher implements IAnchorLayout {
    public constructor() {
        super();
        this.name = 'AnchorLayout';
    }

    public resizeChildren(container: IDisplayContainer & ILayoutElement, elements: Array<ILayoutElement>): void {
        for (const element of elements) {
            if (element.layoutData instanceof AnchorLayoutData) {
                this.resizeElement(container, element, element.layoutData);
            }
        }
    }

    private resizeElement(container: IDisplayContainer & ILayoutElement, element: ILayoutElement, layoutData: IAnchorLayoutData): void {
        if (isNaN(element.width) && isNaN(element.height)) {
            this.resizeElementWidthHeight(container, element, layoutData);
            return;
        }
        if (isNaN(element.width) && !isNaN(element.height)) {
            this.resizeElementWidth(container, element, layoutData);
            return;
        }
        if (!isNaN(element.width) && isNaN(element.height)) {
            this.resizeElementHeight(container, element, layoutData);
        }
    }

    private resizeElementWidthHeight(container: IDisplayContainer & ILayoutElement, element: ILayoutElement, layoutData: IAnchorLayoutData): void {
        if (!isNaN(layoutData.left) && !isNaN(layoutData.right) && !isNaN(layoutData.top) && !isNaN(layoutData.bottom)) {
            this.resizeElementLeftRightTopBottom(container, element, layoutData);
            return;
        }
        if (!isNaN(layoutData.left) && !isNaN(layoutData.right)) {
            if (!isNaN(layoutData.percentHeight)) {
                this.resizeElementLeftRightPercentHeight(container, element, layoutData);
                return;
            }
            this.resizeElementLeftRight(container, element, layoutData);
            return;
        }
        if (!isNaN(layoutData.top) && !isNaN(layoutData.bottom)) {
            if (!isNaN(layoutData.percentWidth)) {
                this.resizeElementTopBottomPercentWidth(container, element, layoutData);
                return;
            }
            this.resizeElementTopBottom(container, element, layoutData);
            return;
        }
        if (!isNaN(layoutData.percentWidth) && !isNaN(layoutData.percentHeight)) {
            this.resizeElementPercentBoth(container, element, layoutData);
            return;
        }
        if (!isNaN(layoutData.percentWidth) && isNaN(layoutData.percentHeight)) {
            this.resizeElementPercentWidth(container, element, layoutData);
            return;
        }
        if (isNaN(layoutData.percentWidth) && !isNaN(layoutData.percentHeight)) {
            this.resizeElementPercentHeight(container, element, layoutData);
        }
    }

    private resizeElementWidth(container: IDisplayContainer & ILayoutElement, element: ILayoutElement, layoutData: IAnchorLayoutData): void {
        const insideWidth = container.measuredWidth - container.paddingLeft - container.paddingRight;
        if (!isNaN(layoutData.left) && !isNaN(layoutData.right)) {
            element.externalWidth = insideWidth - layoutData.left - layoutData.right;
            return;
        }
        if (!isNaN(layoutData.percentWidth)) {
            element.externalWidth = insideWidth / 100 * layoutData.percentWidth;
        }
    }

    private resizeElementHeight(container: IDisplayContainer & ILayoutElement, element: ILayoutElement, layoutData: IAnchorLayoutData): void {
        const insideHeight = container.measuredHeight - container.paddingTop - container.paddingBottom;
        if (!isNaN(layoutData.top) && !isNaN(layoutData.bottom)) {
            element.externalHeight = insideHeight - layoutData.top - layoutData.bottom;
            return;
        }
        if (!isNaN(layoutData.percentHeight)) {
            element.externalHeight = insideHeight / 100 * layoutData.percentHeight;
        }
    }

    private resizeElementLeftRightTopBottom(container: IDisplayContainer & ILayoutElement, element: ILayoutElement, layoutData: IAnchorLayoutData): void {
        const insideWidth = container.measuredWidth - container.paddingLeft - container.paddingRight;
        const insideHeight = container.measuredHeight - container.paddingTop - container.paddingBottom;
        const elementWidth = insideWidth - layoutData.left - layoutData.right;
        const elementHeight = insideHeight - layoutData.top - layoutData.bottom;
        element.externalSize(elementWidth, elementHeight);
    }

    private resizeElementLeftRightPercentHeight(container: IDisplayContainer & ILayoutElement, element: ILayoutElement, layoutData: IAnchorLayoutData): void {
        const insideWidth = container.measuredWidth - container.paddingLeft - container.paddingRight;
        const insideHeight = container.measuredHeight - container.paddingTop - container.paddingBottom;
        const elementWidth = insideWidth - layoutData.left - layoutData.right;
        const elementHeight = insideHeight / 100 * layoutData.percentHeight;
        element.externalSize(elementWidth, elementHeight);
    }

    private resizeElementLeftRight(container: IDisplayContainer & ILayoutElement, element: ILayoutElement, layoutData: IAnchorLayoutData): void {
        const insideWidth = container.measuredWidth - container.paddingLeft - container.paddingRight;
        element.externalWidth = insideWidth - layoutData.left - layoutData.right;
    }

    private resizeElementTopBottom(container: IDisplayContainer & ILayoutElement, element: ILayoutElement, layoutData: IAnchorLayoutData): void {
        const insideHeight = container.measuredHeight - container.paddingTop - container.paddingBottom;
        element.externalHeight = insideHeight - layoutData.top - layoutData.bottom;
    }

    private resizeElementTopBottomPercentWidth(container: IDisplayContainer & ILayoutElement, element: ILayoutElement, layoutData: IAnchorLayoutData): void {
        const insideWidth = container.measuredWidth - container.paddingLeft - container.paddingRight;
        const insideHeight = container.measuredHeight - container.paddingTop - container.paddingBottom;
        const elementWidth = insideWidth / 100 * layoutData.percentWidth;
        const elementHeight = insideHeight - layoutData.top - layoutData.bottom;
        element.externalSize(elementWidth, elementHeight);
    }

    private resizeElementPercentBoth(container: IDisplayContainer & ILayoutElement, element: ILayoutElement, layoutData: IAnchorLayoutData): void {
        const insideWidth = container.measuredWidth - container.paddingLeft - container.paddingRight;
        const insideHeight = container.measuredHeight - container.paddingTop - container.paddingBottom;
        const elementWidth = insideWidth / 100 * layoutData.percentWidth;
        const elementHeight = insideHeight / 100 * layoutData.percentHeight;
        element.externalSize(elementWidth, elementHeight);
    }

    private resizeElementPercentWidth(container: IDisplayContainer & ILayoutElement, element: ILayoutElement, layoutData: IAnchorLayoutData): void {
        const insideWidth = container.measuredWidth - container.paddingLeft - container.paddingRight;
        const elementWidth = insideWidth / 100 * layoutData.percentWidth;
        element.externalWidth = elementWidth;
    }

    private resizeElementPercentHeight(container: IDisplayContainer & ILayoutElement, element: ILayoutElement, layoutData: IAnchorLayoutData): void {
        const insideHeight = container.measuredHeight - container.paddingTop - container.paddingBottom;
        const elementHeight = insideHeight / 100 * layoutData.percentHeight;
        element.externalHeight = elementHeight;
    }

    public layoutChildren(container: IDisplayContainer & ILayoutElement, elements: Array<ILayoutElement>): void {
        for (const element of elements) {
            if (element.layoutData instanceof AnchorLayoutData) {
                this.layoutElement(container, element, element.layoutData);
            } else {
                element.position(container.paddingLeft, container.paddingTop);
            }
        }
    }

    private layoutElement(container: IDisplayContainer & ILayoutElement, element: ILayoutElement, layoutData: IAnchorLayoutData): void {
        if (!isNaN(layoutData.left) && isNaN(layoutData.right)) {
            this.layoutElementLeft(container, element, layoutData);
            return;
        }
        if (!isNaN(layoutData.left) && !isNaN(layoutData.right)) {
            this.layoutElementLeftRight(container, element, layoutData);
            return;
        }
        if (isNaN(layoutData.left) && !isNaN(layoutData.right)) {
            this.layoutElementRight(container, element, layoutData);
            return;
        }
        if (!isNaN(layoutData.horizontalCenter) && !isNaN(layoutData.verticalMiddle)) {
            this.layoutElementHorizontalVertical(container, element, layoutData);
            return;
        }
        if (!isNaN(layoutData.horizontalCenter) && isNaN(layoutData.verticalMiddle)) {
            this.layoutElementHorizontal(container, element, layoutData);
            return;
        }
        if (isNaN(layoutData.horizontalCenter) && !isNaN(layoutData.verticalMiddle)) {
            this.layoutElementVertical(container, element, layoutData);
            return;
        }
        element.position(container.paddingLeft, container.paddingTop);
    }

    private layoutElementLeft(container: IDisplayContainer & ILayoutElement, element: ILayoutElement, layoutData: IAnchorLayoutData): void {
        if (!isNaN(layoutData.top) && isNaN(layoutData.bottom)) {
            this.layoutElementLeftTop(container, element, layoutData);
            return;
        }
        if (!isNaN(layoutData.top) && !isNaN(layoutData.bottom)) {
            this.layoutElementLeftTopBottom(container, element, layoutData);
            return;
        }
        if (isNaN(layoutData.top) && !isNaN(layoutData.bottom)) {
            this.layoutElementLeftBottom(container, element, layoutData);
            return;
        }
        element.position(container.paddingLeft + layoutData.left, container.paddingTop);
    }

    private layoutElementLeftTop(container: IDisplayContainer & ILayoutElement, element: ILayoutElement, layoutData: IAnchorLayoutData): void {
        element.position(container.paddingLeft + layoutData.left, container.paddingTop + layoutData.top);
    }

    private layoutElementLeftTopBottom(container: IDisplayContainer & ILayoutElement, element: ILayoutElement, layoutData: IAnchorLayoutData): void {
        const insideHeight = container.measuredHeight - container.paddingTop - container.paddingBottom;
        const insideHeightMiddle = (insideHeight - layoutData.top - layoutData.bottom) * 0.5;
        const elementMiddle = element.measuredHeight * 0.5;
        const y = insideHeightMiddle - elementMiddle + layoutData.top + container.paddingTop;
        element.position(container.paddingLeft + layoutData.left, y);
    }

    private layoutElementLeftBottom(container: IDisplayContainer & ILayoutElement, element: ILayoutElement, layoutData: IAnchorLayoutData): void {
        const insideHeight = container.measuredHeight - container.paddingTop - container.paddingBottom;
        const y = container.paddingTop + insideHeight - element.measuredHeight - layoutData.bottom;
        element.position(container.paddingLeft + layoutData.left, y);
    }

    private layoutElementLeftRight(container: IDisplayContainer & ILayoutElement, element: ILayoutElement, layoutData: IAnchorLayoutData): void {
        if (!isNaN(layoutData.top) && isNaN(layoutData.bottom)) {
            this.layoutElementLeftRightTop(container, element, layoutData);
            return;
        }
        if (!isNaN(layoutData.top) && !isNaN(layoutData.bottom)) {
            this.layoutElementLeftRightTopBottom(container, element, layoutData);
            return;
        }
        if (isNaN(layoutData.top) && !isNaN(layoutData.bottom)) {
            this.layoutElementLeftRightBottom(container, element, layoutData);
            return;
        }
        if (!isNaN(layoutData.verticalMiddle)) {
            this.layoutElementLeftRightMiddle(container, element, layoutData);
            return;
        }
        const insideWidth = container.measuredWidth - container.paddingLeft - container.paddingRight;
        const insideWidthCenter = (insideWidth - layoutData.left - layoutData.right) * 0.5;
        const elementCenter = element.measuredWidth * 0.5;
        const x = insideWidthCenter - elementCenter + layoutData.left + container.paddingLeft;
        element.position(x, container.paddingTop);
    }

    private layoutElementLeftRightTop(container: IDisplayContainer & ILayoutElement, element: ILayoutElement, layoutData: IAnchorLayoutData): void {
        const insideWidth = container.measuredWidth - container.paddingLeft - container.paddingRight;
        const insideWidthCenter = (insideWidth - layoutData.left - layoutData.right) * 0.5;
        const elementCenter = element.measuredWidth * 0.5;
        const x = insideWidthCenter - elementCenter + layoutData.left + container.paddingLeft;
        element.position(x, container.paddingTop + layoutData.top);
    }

    private layoutElementLeftRightTopBottom(container: IDisplayContainer & ILayoutElement, element: ILayoutElement, layoutData: IAnchorLayoutData): void {
        const insideWidth = container.measuredWidth - container.paddingLeft - container.paddingRight;
        const insideHeight = container.measuredHeight - container.paddingTop - container.paddingBottom;
        const insideWidthCenter = (insideWidth - layoutData.left - layoutData.right) * 0.5;
        const insideHeightMiddle = (insideHeight - layoutData.top - layoutData.bottom) * 0.5;
        const elementCenter = element.measuredWidth * 0.5;
        const elementMiddle = element.measuredHeight * 0.5;
        const x = insideWidthCenter - elementCenter + layoutData.left + container.paddingLeft;
        const y = insideHeightMiddle - elementMiddle + layoutData.top + container.paddingTop;
        element.position(x, y);
    }

    private layoutElementLeftRightBottom(container: IDisplayContainer & ILayoutElement, element: ILayoutElement, layoutData: IAnchorLayoutData): void {
        const insideWidth = container.measuredWidth - container.paddingLeft - container.paddingRight;
        const insideHeight = container.measuredHeight - container.paddingTop - container.paddingBottom;
        const insideWidthCenter = (insideWidth - layoutData.left - layoutData.right) * 0.5;
        const elementCenter = element.measuredWidth * 0.5;
        const x = insideWidthCenter - elementCenter + layoutData.left + container.paddingLeft;
        const y = container.paddingTop + insideHeight - layoutData.bottom - element.measuredHeight;
        element.position(x, y);
    }

    private layoutElementLeftRightMiddle(container: IDisplayContainer & ILayoutElement, element: ILayoutElement, layoutData: IAnchorLayoutData): void {
        const insideWidthCenter = (container.measuredWidth - container.paddingLeft - container.paddingRight) * 0.5;
        const insideHeightMiddle = (container.measuredHeight - container.paddingTop - container.paddingBottom) * 0.5;
        const elementCenter = element.measuredWidth * 0.5;
        const elementMiddle = element.measuredHeight * 0.5;
        const x = insideWidthCenter - elementCenter + layoutData.left + container.paddingLeft;
        const y = insideHeightMiddle - elementMiddle + layoutData.verticalMiddle + container.paddingTop;
        element.position(x, y);
    }

    private layoutElementRight(container: IDisplayContainer & ILayoutElement, element: ILayoutElement, layoutData: IAnchorLayoutData): void {
        if (!isNaN(layoutData.top) && isNaN(layoutData.bottom)) {
            this.layoutElementRightTop(container, element, layoutData);
            return;
        }
        if (!isNaN(layoutData.top) && !isNaN(layoutData.bottom)) {
            this.layoutElementRightMiddle(container, element, layoutData);
            return;
        }
        if (isNaN(layoutData.top) && !isNaN(layoutData.bottom)) {
            this.layoutElementRightBottom(container, element, layoutData);
            return;
        }
        const insideWidth = container.measuredWidth - container.paddingLeft - container.paddingRight;
        const x = container.paddingLeft + insideWidth - layoutData.right - element.measuredWidth;
        element.position(x, container.paddingTop);
    }

    private layoutElementRightTop(container: IDisplayContainer & ILayoutElement, element: ILayoutElement, layoutData: IAnchorLayoutData): void {
        const insideWidth = container.measuredWidth - container.paddingLeft - container.paddingRight;
        const x = container.paddingLeft + insideWidth - layoutData.right - element.measuredWidth;
        const y = container.paddingTop + layoutData.top;
        element.position(x, y);
    }

    private layoutElementRightMiddle(container: IDisplayContainer & ILayoutElement, element: ILayoutElement, layoutData: IAnchorLayoutData): void {
        const insideWidth = container.measuredWidth - container.paddingLeft - container.paddingRight;
        const insideHeight = container.measuredHeight - container.paddingTop - container.paddingBottom;
        const insideHeightMiddle = (insideHeight - layoutData.top - layoutData.bottom) * 0.5;
        const elementMiddle = element.measuredHeight * 0.5;
        const x = container.paddingLeft + insideWidth - layoutData.right - element.measuredWidth;
        const y = insideHeightMiddle - elementMiddle + layoutData.top + container.paddingTop;
        element.position(x, y);
    }

    private layoutElementRightBottom(container: IDisplayContainer & ILayoutElement, element: ILayoutElement, layoutData: IAnchorLayoutData): void {
        const insideWidth = container.measuredWidth - container.paddingLeft - container.paddingRight;
        const insideHeight = container.measuredHeight - container.paddingTop - container.paddingBottom;
        const x = container.paddingLeft + insideWidth - layoutData.right - element.measuredWidth;
        const y = container.paddingTop + insideHeight - layoutData.bottom - element.measuredHeight;
        element.position(x, y);
    }

    private layoutElementHorizontalVertical(container: IDisplayContainer & ILayoutElement, element: ILayoutElement, layoutData: IAnchorLayoutData): void {
        const insideWidthCenter = (container.measuredWidth - container.paddingLeft - container.paddingRight) * 0.5;
        const insideHeightMiddle = (container.measuredHeight - container.paddingTop - container.paddingBottom) * 0.5;
        const elementCenter = element.measuredWidth * 0.5;
        const elementMiddle = element.measuredHeight * 0.5;
        const x = insideWidthCenter - elementCenter + layoutData.horizontalCenter + container.paddingLeft;
        const y = insideHeightMiddle - elementMiddle + layoutData.verticalMiddle + container.paddingTop;
        element.position(x, y);
    }

    private layoutElementHorizontal(container: IDisplayContainer & ILayoutElement, element: ILayoutElement, layoutData: IAnchorLayoutData): void {
        const insideWidthCenter = (container.measuredWidth - container.paddingLeft - container.paddingRight) * 0.5;
        const elementCenter = element.measuredWidth * 0.5;
        const x = insideWidthCenter - elementCenter + layoutData.horizontalCenter + container.paddingLeft;
        element.position(x, container.paddingTop);
    }

    private layoutElementVertical(container: IDisplayContainer & ILayoutElement, element: ILayoutElement, layoutData: IAnchorLayoutData): void {
        const insideHeightMiddle = (container.measuredHeight - container.paddingTop - container.paddingBottom) * 0.5;
        const elementMiddle = element.measuredHeight * 0.5;
        const y = insideHeightMiddle - elementMiddle + layoutData.verticalMiddle + container.paddingTop;
        element.position(container.paddingLeft, y);
    }

    public getInternalSize(container: IDisplayContainer & ILayoutElement, elements: Array<ILayoutElement>): [number, number] {
        let width = 0;
        let height = 0;
        for (const element of elements) {
            if (width < element.measuredWidth) {
                width = element.measuredWidth;
            }
            if (height < element.measuredHeight) {
                height = element.measuredHeight;
            }
        }
        width = container.paddingLeft + width + container.paddingRight;
        height = container.paddingTop + height + container.paddingBottom;
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
            if (height < element.measuredHeight) {
                height = element.measuredHeight;
            }
        }
        return container.paddingTop + height + container.paddingBottom;
    }
}
