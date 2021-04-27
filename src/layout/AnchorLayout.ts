import EventDispatcher from '../event/EventDispatcher';
import IDisplayContainer from '../interfaces/core/IDisplayContainer';
import ILayoutElement from '../interfaces/core/ILayoutElement';
import IAnchorLayout from '../interfaces/layout/IAnchorLayout';

export default class AnchorLayout extends EventDispatcher implements IAnchorLayout {
    public constructor() {
        super();
        this.name = 'AnchorLayout';
    }

    public resizeChildren(container: IDisplayContainer & ILayoutElement, elements: Array<ILayoutElement>): void {
        for (const element of elements) {
            this.resizeElement(container, element);
        }
    }

    private resizeElement(container: IDisplayContainer & ILayoutElement, element: ILayoutElement): void {
        if (isNaN(element.width) && isNaN(element.height)) {
            this.resizeElementWidthHeight(container, element);
            return;
        }
        if (isNaN(element.width) && !isNaN(element.height)) {
            this.resizeElementWidth(container, element);
            return;
        }
        if (!isNaN(element.width) && isNaN(element.height)) {
            this.resizeElementHeight(container, element);
        }
    }

    private resizeElementWidthHeight(container: IDisplayContainer & ILayoutElement, element: ILayoutElement): void {
        if (!isNaN(element.left) && !isNaN(element.right) && !isNaN(element.top) && !isNaN(element.bottom)) {
            this.resizeElementLeftRightTopBottom(container, element);
            return;
        }
        if (!isNaN(element.left) && !isNaN(element.right)) {
            if (!isNaN(element.percentHeight)) {
                this.resizeElementLeftRightPercentHeight(container, element);
                return;
            }
            this.resizeElementLeftRight(container, element);
            return;
        }
        if (!isNaN(element.top) && !isNaN(element.bottom)) {
            if (!isNaN(element.percentWidth)) {
                this.resizeElementTopBottomPercentWidth(container, element);
                return;
            }
            this.resizeElementTopBottom(container, element);
            return;
        }
        if (!isNaN(element.percentWidth) && !isNaN(element.percentHeight)) {
            this.resizeElementPercentBoth(container, element);
            return;
        }
        if (!isNaN(element.percentWidth) && isNaN(element.percentHeight)) {
            this.resizeElementPercentWidth(container, element);
            return;
        }
        if (isNaN(element.percentWidth) && !isNaN(element.percentHeight)) {
            this.resizeElementPercentHeight(container, element);
        }
    }

    private resizeElementWidth(container: IDisplayContainer & ILayoutElement, element: ILayoutElement): void {
        const insideWidth = container.measuredWidth - container.paddingLeft - container.paddingRight;
        if (!isNaN(element.left) && !isNaN(element.right)) {
            element.externalWidth = insideWidth - element.left - element.right;
            return;
        }
        if (!isNaN(element.percentWidth)) {
            element.externalWidth = insideWidth / 100 * element.percentWidth;
        }
    }

    private resizeElementHeight(container: IDisplayContainer & ILayoutElement, element: ILayoutElement): void {
        const insideHeight = container.measuredHeight - container.paddingTop - container.paddingBottom;
        if (!isNaN(element.top) && !isNaN(element.bottom)) {
            element.externalHeight = insideHeight - element.top - element.bottom;
            return;
        }
        if (!isNaN(element.percentHeight)) {
            element.externalHeight = insideHeight / 100 * element.percentHeight;
        }
    }

    private resizeElementLeftRightTopBottom(container: IDisplayContainer & ILayoutElement, element: ILayoutElement): void {
        const insideWidth = container.measuredWidth - container.paddingLeft - container.paddingRight;
        const insideHeight = container.measuredHeight - container.paddingTop - container.paddingBottom;
        const elementWidth = insideWidth - element.left - element.right;
        const elementHeight = insideHeight - element.top - element.bottom;
        element.externalSize(elementWidth, elementHeight);
    }

    private resizeElementLeftRightPercentHeight(container: IDisplayContainer & ILayoutElement, element: ILayoutElement): void {
        const insideWidth = container.measuredWidth - container.paddingLeft - container.paddingRight;
        const insideHeight = container.measuredHeight - container.paddingTop - container.paddingBottom;
        const elementWidth = insideWidth - element.left - element.right;
        const elementHeight = insideHeight / 100 * element.percentHeight;
        element.externalSize(elementWidth, elementHeight);
    }

    private resizeElementLeftRight(container: IDisplayContainer & ILayoutElement, element: ILayoutElement): void {
        const insideWidth = container.measuredWidth - container.paddingLeft - container.paddingRight;
        element.externalWidth = insideWidth - element.left - element.right;
    }

    private resizeElementTopBottom(container: IDisplayContainer & ILayoutElement, element: ILayoutElement): void {
        const insideHeight = container.measuredHeight - container.paddingTop - container.paddingBottom;
        element.externalHeight = insideHeight - element.top - element.bottom;
    }

    private resizeElementTopBottomPercentWidth(container: IDisplayContainer & ILayoutElement, element: ILayoutElement): void {
        const insideWidth = container.measuredWidth - container.paddingLeft - container.paddingRight;
        const insideHeight = container.measuredHeight - container.paddingTop - container.paddingBottom;
        const elementWidth = insideWidth / 100 * element.percentWidth;
        const elementHeight = insideHeight - element.top - element.bottom;
        element.externalSize(elementWidth, elementHeight);
    }

    private resizeElementPercentBoth(container: IDisplayContainer & ILayoutElement, element: ILayoutElement): void {
        const insideWidth = container.measuredWidth - container.paddingLeft - container.paddingRight;
        const insideHeight = container.measuredHeight - container.paddingTop - container.paddingBottom;
        const elementWidth = insideWidth / 100 * element.percentWidth;
        const elementHeight = insideHeight / 100 * element.percentHeight;
        element.externalSize(elementWidth, elementHeight);
    }

    private resizeElementPercentWidth(container: IDisplayContainer & ILayoutElement, element: ILayoutElement): void {
        const insideWidth = container.measuredWidth - container.paddingLeft - container.paddingRight;
        const elementWidth = insideWidth / 100 * element.percentWidth;
        element.externalWidth = elementWidth;
    }

    private resizeElementPercentHeight(container: IDisplayContainer & ILayoutElement, element: ILayoutElement): void {
        const insideHeight = container.measuredHeight - container.paddingTop - container.paddingBottom;
        const elementHeight = insideHeight / 100 * element.percentHeight;
        element.externalHeight = elementHeight;
    }

    public layoutChildren(container: IDisplayContainer & ILayoutElement, elements: Array<ILayoutElement>): void {
        for (const element of elements) {
            this.layoutElement(container, element);
        }
    }

    private layoutElement(container: IDisplayContainer & ILayoutElement, element: ILayoutElement): void {
        if (!isNaN(element.left) && isNaN(element.right)) {
            this.layoutElementLeft(container, element);
            return;
        }
        if (!isNaN(element.left) && !isNaN(element.right)) {
            this.layoutElementLeftRight(container, element);
            return;
        }
        if (isNaN(element.left) && !isNaN(element.right)) {
            this.layoutElementRight(container, element);
            return;
        }
        if (!isNaN(element.top) && isNaN(element.bottom)) {
            this.layoutElementTop(container, element);
            return;
        }
        if (!isNaN(element.top) && !isNaN(element.bottom)) {
            this.layoutElementTopBottom(container, element);
            return;
        }
        if (isNaN(element.top) && !isNaN(element.bottom)) {
            this.layoutElementBottom(container, element);
            return;
        }
        if (!isNaN(element.horizontalCenter) && !isNaN(element.verticalMiddle)) {
            this.layoutElementHorizontalVertical(container, element);
            return;
        }
        if (!isNaN(element.horizontalCenter) && isNaN(element.verticalMiddle)) {
            this.layoutElementHorizontalCenter(container, element);
            return;
        }
        if (isNaN(element.horizontalCenter) && !isNaN(element.verticalMiddle)) {
            this.layoutElementVertical(container, element);
            return;
        }
        element.position(container.paddingLeft, container.paddingTop);
    }

    private layoutElementTop(container: IDisplayContainer & ILayoutElement, element: ILayoutElement): void {
        const y = container.paddingTop + element.top;
        element.position(container.paddingLeft, y);
    }

    private layoutElementTopBottom(container: IDisplayContainer & ILayoutElement, element: ILayoutElement): void {
        const y = container.paddingTop + element.top;
        element.position(container.paddingLeft, y);
    }

    private layoutElementBottom(container: IDisplayContainer & ILayoutElement, element: ILayoutElement): void {
        // TODO
        const insideHeight = container.measuredHeight - container.paddingTop - container.paddingBottom;
        const y = container.paddingTop + insideHeight - element.measuredHeight - element.bottom;
        element.position(container.paddingLeft, y);
    }

    private layoutElementLeft(container: IDisplayContainer & ILayoutElement, element: ILayoutElement): void {
        if (!isNaN(element.top) && isNaN(element.bottom)) {
            this.layoutElementLeftTop(container, element);
            return;
        }
        if (!isNaN(element.top) && !isNaN(element.bottom)) {
            this.layoutElementLeftTopBottom(container, element);
            return;
        }
        if (isNaN(element.top) && !isNaN(element.bottom)) {
            this.layoutElementLeftBottom(container, element);
            return;
        }
        element.position(container.paddingLeft + element.left, container.paddingTop);
    }

    private layoutElementLeftTop(container: IDisplayContainer & ILayoutElement, element: ILayoutElement): void {
        element.position(container.paddingLeft + element.left, container.paddingTop + element.top);
    }

    private layoutElementLeftTopBottom(container: IDisplayContainer & ILayoutElement, element: ILayoutElement): void {
        const insideHeight = container.measuredHeight - container.paddingTop - container.paddingBottom;
        const insideHeightMiddle = (insideHeight - element.top - element.bottom) * 0.5;
        const elementMiddle = element.measuredHeight * 0.5;
        const y = insideHeightMiddle - elementMiddle + element.top + container.paddingTop;
        element.position(container.paddingLeft + element.left, y);
    }

    private layoutElementLeftBottom(container: IDisplayContainer & ILayoutElement, element: ILayoutElement): void {
        const insideHeight = container.measuredHeight - container.paddingTop - container.paddingBottom;
        const y = container.paddingTop + insideHeight - element.measuredHeight - element.bottom;
        element.position(container.paddingLeft + element.left, y);
    }

    private layoutElementLeftRight(container: IDisplayContainer & ILayoutElement, element: ILayoutElement): void {
        if (!isNaN(element.top) && isNaN(element.bottom)) {
            this.layoutElementLeftRightTop(container, element);
            return;
        }
        if (!isNaN(element.top) && !isNaN(element.bottom)) {
            this.layoutElementLeftRightTopBottom(container, element);
            return;
        }
        if (isNaN(element.top) && !isNaN(element.bottom)) {
            this.layoutElementLeftRightBottom(container, element);
            return;
        }
        if (!isNaN(element.verticalMiddle)) {
            this.layoutElementLeftRightMiddle(container, element);
            return;
        }
        const insideWidth = container.measuredWidth - container.paddingLeft - container.paddingRight;
        const insideWidthCenter = (insideWidth - element.left - element.right) * 0.5;
        const elementCenter = element.measuredWidth * 0.5;
        const x = insideWidthCenter - elementCenter + element.left + container.paddingLeft;
        element.position(x, container.paddingTop);
    }

    private layoutElementLeftRightTop(container: IDisplayContainer & ILayoutElement, element: ILayoutElement): void {
        const insideWidth = container.measuredWidth - container.paddingLeft - container.paddingRight;
        const insideWidthCenter = (insideWidth - element.left - element.right) * 0.5;
        const elementCenter = element.measuredWidth * 0.5;
        const x = insideWidthCenter - elementCenter + element.left + container.paddingLeft;
        element.position(x, container.paddingTop + element.top);
    }

    private layoutElementLeftRightTopBottom(container: IDisplayContainer & ILayoutElement, element: ILayoutElement): void {
        const insideWidth = container.measuredWidth - container.paddingLeft - container.paddingRight;
        const insideHeight = container.measuredHeight - container.paddingTop - container.paddingBottom;
        const insideWidthCenter = (insideWidth - element.left - element.right) * 0.5;
        const insideHeightMiddle = (insideHeight - element.top - element.bottom) * 0.5;
        const elementCenter = element.measuredWidth * 0.5;
        const elementMiddle = element.measuredHeight * 0.5;
        const x = insideWidthCenter - elementCenter + element.left + container.paddingLeft;
        const y = insideHeightMiddle - elementMiddle + element.top + container.paddingTop;
        element.position(x, y);
    }

    private layoutElementLeftRightBottom(container: IDisplayContainer & ILayoutElement, element: ILayoutElement): void {
        const insideWidth = container.measuredWidth - container.paddingLeft - container.paddingRight;
        const insideHeight = container.measuredHeight - container.paddingTop - container.paddingBottom;
        const insideWidthCenter = (insideWidth - element.left - element.right) * 0.5;
        const elementCenter = element.measuredWidth * 0.5;
        const x = insideWidthCenter - elementCenter + element.left + container.paddingLeft;
        const y = container.paddingTop + insideHeight - element.bottom - element.measuredHeight;
        element.position(x, y);
    }

    private layoutElementLeftRightMiddle(container: IDisplayContainer & ILayoutElement, element: ILayoutElement): void {
        /* const insideWidthCenter = (container.measuredWidth - container.paddingLeft - container.paddingRight) * 0.5;
        const insideHeightMiddle = (container.measuredHeight - container.paddingTop - container.paddingBottom) * 0.5;
        const elementCenter = element.measuredWidth * 0.5;
        const elementMiddle = element.measuredHeight * 0.5;
        const x = insideWidthCenter - elementCenter + layoutData.left + container.paddingLeft;
        const y = insideHeightMiddle - elementMiddle + layoutData.verticalMiddle + container.paddingTop; */
        const insideHeightMiddle = (container.measuredHeight - container.paddingTop - container.paddingBottom) * 0.5;
        const elementMiddle = element.measuredHeight * 0.5;
        const x = container.paddingLeft + element.left;
        const y = insideHeightMiddle - elementMiddle + element.verticalMiddle + container.paddingTop;
        element.position(x, y);
    }

    private layoutElementRight(container: IDisplayContainer & ILayoutElement, element: ILayoutElement): void {
        if (!isNaN(element.top) && isNaN(element.bottom)) {
            this.layoutElementRightTop(container, element);
            return;
        }
        if (!isNaN(element.top) && !isNaN(element.bottom)) {
            this.layoutElementRightMiddle(container, element);
            return;
        }
        if (isNaN(element.top) && !isNaN(element.bottom)) {
            this.layoutElementRightBottom(container, element);
            return;
        }
        const insideWidth = container.measuredWidth - container.paddingLeft - container.paddingRight;
        const x = container.paddingLeft + insideWidth - element.right - element.measuredWidth;
        element.position(x, container.paddingTop);
    }

    private layoutElementRightTop(container: IDisplayContainer & ILayoutElement, element: ILayoutElement): void {
        const insideWidth = container.measuredWidth - container.paddingLeft - container.paddingRight;
        const x = container.paddingLeft + insideWidth - element.right - element.measuredWidth;
        const y = container.paddingTop + element.top;
        element.position(x, y);
    }

    private layoutElementRightMiddle(container: IDisplayContainer & ILayoutElement, element: ILayoutElement): void {
        const insideWidth = container.measuredWidth - container.paddingLeft - container.paddingRight;
        const insideHeight = container.measuredHeight - container.paddingTop - container.paddingBottom;
        const insideHeightMiddle = (insideHeight - element.top - element.bottom) * 0.5;
        const elementMiddle = element.measuredHeight * 0.5;
        const x = container.paddingLeft + insideWidth - element.right - element.measuredWidth;
        const y = insideHeightMiddle - elementMiddle + element.top + container.paddingTop;
        element.position(x, y);
    }

    private layoutElementRightBottom(container: IDisplayContainer & ILayoutElement, element: ILayoutElement): void {
        const insideWidth = container.measuredWidth - container.paddingLeft - container.paddingRight;
        const insideHeight = container.measuredHeight - container.paddingTop - container.paddingBottom;
        const x = container.paddingLeft + insideWidth - element.right - element.measuredWidth;
        const y = container.paddingTop + insideHeight - element.bottom - element.measuredHeight;
        element.position(x, y);
    }

    private layoutElementHorizontalVertical(container: IDisplayContainer & ILayoutElement, element: ILayoutElement): void {
        const insideWidthCenter = (container.measuredWidth - container.paddingLeft - container.paddingRight) * 0.5;
        const insideHeightMiddle = (container.measuredHeight - container.paddingTop - container.paddingBottom) * 0.5;
        const elementCenter = element.measuredWidth * 0.5;
        const elementMiddle = element.measuredHeight * 0.5;
        const x = insideWidthCenter - elementCenter + element.horizontalCenter + container.paddingLeft;
        const y = insideHeightMiddle - elementMiddle + element.verticalMiddle + container.paddingTop;
        element.position(x, y);
    }

    private layoutElementHorizontalCenter(container: IDisplayContainer & ILayoutElement, element: ILayoutElement): void {
        if (isNaN(element.top) && isNaN(element.bottom)) {
            this.layoutElementHorizontalCenterPaddingTop(container, element);
        } else if (!isNaN(element.top) && isNaN(element.bottom)) {
            this.layoutElementHorizontalCenterTop(container, element);
        } else if (isNaN(element.top) && !isNaN(element.bottom)) {
            this.layoutElementHorizontalCenterBottom(container, element);
        } else {
            this.layoutElementHorizontalCenterTopBottom(container, element);
        }
    }

    private layoutElementHorizontalCenterTop(container: IDisplayContainer & ILayoutElement, element: ILayoutElement): void {
        // TODO
    }

    private layoutElementHorizontalCenterBottom(container: IDisplayContainer & ILayoutElement, element: ILayoutElement): void {
        const insideWidth = container.measuredWidth - container.paddingLeft - container.paddingRight;
        const insideHeight = container.measuredHeight - container.paddingTop - container.paddingBottom;
        const insideWidthCenter = insideWidth * 0.5;
        const elementCenter = element.measuredWidth * 0.5;
        const x = insideWidthCenter - elementCenter + element.horizontalCenter + container.paddingLeft;
        const y = container.paddingTop + insideHeight - element.bottom - element.measuredHeight;
        element.position(x, y);
    }

    private layoutElementHorizontalCenterTopBottom(container: IDisplayContainer & ILayoutElement, element: ILayoutElement): void {
        // TODO
    }

    private layoutElementHorizontalCenterPaddingTop(container: IDisplayContainer & ILayoutElement, element: ILayoutElement): void {
        const insideWidthCenter = (container.measuredWidth - container.paddingLeft - container.paddingRight) * 0.5;
        const elementCenter = element.measuredWidth * 0.5;
        const x = insideWidthCenter - elementCenter + element.horizontalCenter + container.paddingLeft;
        element.position(x, container.paddingTop);
    }

    private layoutElementVertical(container: IDisplayContainer & ILayoutElement, element: ILayoutElement): void {
        const insideHeightMiddle = (container.measuredHeight - container.paddingTop - container.paddingBottom) * 0.5;
        const elementMiddle = element.measuredHeight * 0.5;
        const y = insideHeightMiddle - elementMiddle + element.verticalMiddle + container.paddingTop;
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
