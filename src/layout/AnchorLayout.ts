import EventDispatcher from '../event/EventDispatcher';
import ILayout from '../interfaces/layout/ILayout';
import IAnchorLayout from '../interfaces/layout/IAnchorLayout';
import ILayoutElement from '../interfaces/core/ILayoutElement';
import ILayoutContainer from '../interfaces/core/ILayoutContainer';

export default class AnchorLayout extends EventDispatcher implements IAnchorLayout, ILayout {
    public constructor() {
        super();
        this.name = 'AnchorLayout';
    }

    public resizeChildren(container: ILayoutContainer, elements: Array<ILayoutElement>): void {
        const w = container.actualWidth - container.paddingLeft - container.paddingRight;
        const h = container.actualHeight - container.paddingTop - container.paddingBottom;
        for (const element of elements) {
            if (isNaN(element.width) && isNaN(element.height)) {
                this.resizeElement(element, w, h);
            } else if (isNaN(element.width) && !isNaN(element.height)) {
                this.resizeElementWidth(element, w);
            } else if (!isNaN(element.width) && isNaN(element.height)) {
                this.resizeElementHeight(element, h);
            }
        }
    }

    private resizeElement(element: ILayoutElement, w: number, h: number): void {
        let width = NaN;
        let height = NaN;
        if (!isNaN(element.percentWidth)) {
            if (!isNaN(element.left) && !isNaN(element.right)) {
                width = (w - element.left - element.right) * element.percentWidth / 100;
            } else if (!isNaN(element.left) && isNaN(element.right)) {
                width = (w - element.left) * element.percentWidth / 100;
            } else if (isNaN(element.left) && !isNaN(element.right)) {
                width = (w - element.right) * element.percentWidth / 100;
            } else {
                width = w * element.percentWidth / 100;
            }
        }
        if (!isNaN(element.percentHeight)) {
            if (!isNaN(element.top) && !isNaN(element.bottom)) {
                height = (h - element.top - element.bottom) * element.percentHeight / 100;
            } else if (!isNaN(element.top) && isNaN(element.bottom)) {
                height = (h - element.top) * element.percentHeight / 100;
            } else if (isNaN(element.top) && !isNaN(element.bottom)) {
                height = (h - element.bottom) * element.percentHeight / 100;
            } else {
                height = h * element.percentHeight / 100;
            }
        }
        element.externalSize(width, height);
    }

    private resizeElementWidth(element: ILayoutElement, w: number): void {
        if (!isNaN(element.percentWidth)) {
            if (!isNaN(element.left) && !isNaN(element.right)) {
                element.externalWidth = (w - element.left - element.right) * element.percentWidth / 100;
            } else if (!isNaN(element.left) && isNaN(element.right)) {
                element.externalWidth = (w - element.left) * element.percentWidth / 100;
            } else if (isNaN(element.left) && !isNaN(element.right)) {
                element.externalWidth = (w - element.right) * element.percentWidth / 100;
            } else {
                element.externalWidth = w * element.percentWidth / 100;
            }
        }
    }

    private resizeElementHeight(element: ILayoutElement, h: number): void {
        if (!isNaN(element.percentHeight)) {
            if (!isNaN(element.top) && !isNaN(element.bottom)) {
                element.externalHeight = (h - element.top - element.bottom) * element.percentHeight / 100;
            } else if (!isNaN(element.top) && isNaN(element.bottom)) {
                element.externalHeight = (h - element.top) * element.percentHeight / 100;
            } else if (isNaN(element.top) && !isNaN(element.bottom)) {
                element.externalHeight = (h - element.bottom) * element.percentHeight / 100;
            } else {
                element.externalHeight = h * element.percentHeight / 100;
            }
        }
    }

    public layoutChildren(container: ILayoutContainer, elements: Array<ILayoutElement>): void {
        for (const element of elements) {
            this.layoutElement(container, element);
        }
    }

    private layoutElement(container: ILayoutContainer, element: ILayoutElement): void {
        let x = container.paddingLeft;
        if (!isNaN(element.left) && isNaN(element.right)) {
            x = x + element.left;
        } else if (isNaN(element.left) && !isNaN(element.right)) {
            x = container.actualWidth - container.paddingRight - element.right - element.actualWidth;
        } else if (!isNaN(element.left) && !isNaN(element.right)) {
            const insideWidth = container.actualWidth - container.paddingLeft - container.paddingRight;
            const insideWidthCenter = (insideWidth - element.left - element.right) * 0.5;
            const elementCenter = element.actualWidth * 0.5;
            x = insideWidthCenter - elementCenter + element.left + container.paddingLeft;
        } else if (!isNaN(element.centerOffset)) {
            const insideWidthCenter = (container.actualWidth - container.paddingLeft - container.paddingRight) * 0.5;
            const elementCenter = element.actualWidth * 0.5;
            x = insideWidthCenter - elementCenter + container.paddingLeft + element.centerOffset;
        }
        let y = container.paddingTop;
        if (!isNaN(element.top) && isNaN(element.bottom)) {
            y = y + element.top;
        } else if (isNaN(element.top) && !isNaN(element.bottom)) {
            y = container.actualHeight - container.paddingBottom - element.bottom - element.actualHeight;
        } else if (!isNaN(element.top) && !isNaN(element.bottom)) {
            const insideHeight = container.actualHeight - container.paddingTop - container.paddingBottom;
            const insideHeightMiddle = (insideHeight - element.top - element.bottom) * 0.5;
            const elementMiddle = element.actualHeight * 0.5;
            y = insideHeightMiddle - elementMiddle + element.top + container.paddingTop;
        } else if (!isNaN(element.middleOffset)) {
            const insideHeightMiddle = (container.actualHeight - container.paddingTop - container.paddingBottom) * 0.5;
            const elementMiddle = element.actualHeight * 0.5;
            y = insideHeightMiddle - elementMiddle + container.paddingTop + element.middleOffset;
        }
        element.position(x, y);
    }

    public getInternalSize(container: ILayoutContainer, elements: Array<ILayoutElement>): [number, number] {
        let width = 0;
        let height = 0;
        for (const element of elements) {
            if (!isNaN(element.left)) {
                if (width < (element.left + element.actualWidth)) {
                    width = element.left + element.actualWidth;
                }
            } else {
                if (width < element.actualWidth) {
                    width = element.actualWidth;
                }
            }
            if (!isNaN(element.top)) {
                if (height < (element.top + element.actualHeight)) {
                    height = (element.top + element.actualHeight);
                }
            } else {
                if (height < element.actualHeight) {
                    height = element.actualHeight;
                }
            }
        }
        width = container.paddingLeft + width + container.paddingRight;
        height = container.paddingTop + height + container.paddingBottom;
        return [width, height];
    }

    public getInternalWidth(container: ILayoutContainer, elements: Array<ILayoutElement>): number {
        let width = 0;
        for (const element of elements) {
            if (!isNaN(element.left)) {
                if (width < (element.left + element.actualWidth)) {
                    width = element.left + element.actualWidth;
                }
            } else {
                if (width < element.actualWidth) {
                    width = element.actualWidth;
                }
            }
        }
        return container.paddingLeft + width + container.paddingRight;
    }

    public getInternalHeight(container: ILayoutContainer, elements: Array<ILayoutElement>): number {
        let height = 0;
        for (const element of elements) {
            if (!isNaN(element.top)) {
                if (height < (element.top + element.actualHeight)) {
                    height = (element.top + element.actualHeight);
                }
            } else {
                if (height < element.actualHeight) {
                    height = element.actualHeight;
                }
            }
        }
        return container.paddingTop + height + container.paddingBottom;
    }
}
