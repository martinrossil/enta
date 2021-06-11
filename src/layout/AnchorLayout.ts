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
        const w = container.measuredWidth - container.paddingLeft - container.paddingRight;
        const h = container.measuredHeight - container.paddingTop - container.paddingBottom;
        for (const element of elements) {
            if (isNaN(element.width) && isNaN(element.height)) {
                this.resizeElement(container, element, w, h);
            } else if (isNaN(element.width) && !isNaN(element.height)) {
                this.resizeElementWidth(container, element, w);
            } else if (!isNaN(element.width) && isNaN(element.height)) {
                this.resizeElementHeight(container, element, h);
            }
        }
    }

    private resizeElement(container: IDisplayContainer & ILayoutElement, element: ILayoutElement, w: number, h: number): void {
        let width = NaN;
        let height = NaN;
        if (!isNaN(element.percentWidth)) {
            width = w * element.percentWidth / 100;
        }
        if (!isNaN(element.percentHeight)) {
            height = h * element.percentHeight / 100;
        }
        element.externalSize(width, height);
    }

    private resizeElementWidth(container: IDisplayContainer & ILayoutElement, element: ILayoutElement, w: number): void {
        if (!isNaN(element.percentWidth)) {
            element.externalWidth = w * element.percentWidth / 100;
        }
    }

    private resizeElementHeight(container: IDisplayContainer & ILayoutElement, element: ILayoutElement, h: number): void {
        if (!isNaN(element.percentHeight)) {
            element.externalHeight = h * element.percentHeight / 100;
        }
    }

    public layoutChildren(container: IDisplayContainer & ILayoutElement, elements: Array<ILayoutElement>): void {
        for (const element of elements) {
            this.layoutElement(container, element);
        }
    }

    private layoutElement(container: IDisplayContainer & ILayoutElement, element: ILayoutElement): void {
        let x = container.paddingLeft;
        if (!isNaN(element.left) && isNaN(element.right)) {
            x = x + element.left;
        } else if (isNaN(element.left) && !isNaN(element.right)) {
            x = container.measuredWidth - container.paddingRight - element.right - element.measuredWidth;
        } else if (!isNaN(element.left) && !isNaN(element.right)) {
            const insideWidth = container.measuredWidth - container.paddingLeft - container.paddingRight;
            const insideWidthCenter = (insideWidth - element.left - element.right) * 0.5;
            const elementCenter = element.measuredWidth * 0.5;
            x = insideWidthCenter - elementCenter + element.left + container.paddingLeft;
        } else if (!isNaN(element.horizontalCenter)) {
            const insideWidthCenter = (container.measuredWidth - container.paddingLeft - container.paddingRight) * 0.5;
            const elementCenter = element.measuredWidth * 0.5;
            x = insideWidthCenter - elementCenter + container.paddingLeft + element.horizontalCenter;
        }
        let y = container.paddingTop;
        if (!isNaN(element.top) && isNaN(element.bottom)) {
            y = y + element.top;
        } else if (isNaN(element.top) && !isNaN(element.bottom)) {
            y = container.measuredHeight - container.paddingBottom - element.bottom - element.measuredHeight;
        } else if (!isNaN(element.top) && !isNaN(element.bottom)) {
            const insideHeight = container.measuredHeight - container.paddingTop - container.paddingBottom;
            const insideHeightMiddle = (insideHeight - element.top - element.bottom) * 0.5;
            const elementMiddle = element.measuredHeight * 0.5;
            y = insideHeightMiddle - elementMiddle + element.top + container.paddingTop;
        } else if (!isNaN(element.verticalMiddle)) {
            const insideHeightMiddle = (container.measuredHeight - container.paddingTop - container.paddingBottom) * 0.5;
            const elementMiddle = element.measuredHeight * 0.5;
            y = insideHeightMiddle - elementMiddle + container.paddingTop + element.verticalMiddle;
        }
        element.position(x, y);
    }

    public getInternalSize(container: IDisplayContainer & ILayoutElement, elements: Array<ILayoutElement>): [number, number] {
        let width = 0;
        let height = 0;
        for (const element of elements) {
            if (!isNaN(element.left)) {
                if (width < (element.left + element.measuredWidth)) {
                    width = element.left + element.measuredWidth;
                }
            } else {
                if (width < element.measuredWidth) {
                    width = element.measuredWidth;
                }
            }
            if (!isNaN(element.top)) {
                if (height < (element.top + element.measuredHeight)) {
                    height = (element.top + element.measuredHeight);
                }
            } else {
                if (height < element.measuredHeight) {
                    height = element.measuredHeight;
                }
            }
        }
        width = container.paddingLeft + width + container.paddingRight;
        height = container.paddingTop + height + container.paddingBottom;
        return [width, height];
    }

    public getInternalWidth(container: IDisplayContainer & ILayoutElement, elements: Array<ILayoutElement>): number {
        let width = 0;
        for (const element of elements) {
            if (!isNaN(element.left)) {
                if (width < (element.left + element.measuredWidth)) {
                    width = element.left + element.measuredWidth;
                }
            } else {
                if (width < element.measuredWidth) {
                    width = element.measuredWidth;
                }
            }
        }
        return container.paddingLeft + width + container.paddingRight;
    }

    public getInternalHeight(container: IDisplayContainer & ILayoutElement, elements: Array<ILayoutElement>): number {
        let height = 0;
        for (const element of elements) {
            if (!isNaN(element.top)) {
                if (height < (element.top + element.measuredHeight)) {
                    height = (element.top + element.measuredHeight);
                }
            } else {
                if (height < element.measuredHeight) {
                    height = element.measuredHeight;
                }
            }
        }
        return container.paddingTop + height + container.paddingBottom;
    }
}
