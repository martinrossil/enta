import Strings from '../consts/Strings';
import EventDispatcher from '../event/EventDispatcher';
import IDisplayContainer from '../interfaces/core/IDisplayContainer';
import ILayoutElement from '../interfaces/core/ILayoutElement';
import IColomnLayout from '../interfaces/layout/IColumnLayout';

export default class ColumnLayout extends EventDispatcher implements IColomnLayout {
    public constructor(minColumnWidth = 256, maxColumns = 4, gap = NaN, aspectRatio = NaN) {
        super();
        this.name = 'ColumnLayout';
        this.minColumnWidth = minColumnWidth;
        this.maxColumns = maxColumns;
        this.gap = gap;
        this.aspectRatio = aspectRatio;
    }

    private columns = 0;
    private elementWidth = 0;

    public resizeChildren(container: IDisplayContainer & ILayoutElement, elements: Array<ILayoutElement>): void {
        const insideWidth = container.measuredWidth - container.paddingLeft - container.paddingRight;
        this.columns = Math.floor(insideWidth / this.minColumnWidth);
        if (this.columns === 0) {
            this.columns = 1;
        }
        if (this.columns > this.maxColumns) {
            this.columns = this.maxColumns;
        }
        const insideMinusGaps = insideWidth - this.gap * (this.columns - 1);
        this.elementWidth = insideMinusGaps / this.columns;
        if (!isNaN(this.aspectRatio)) {
            for (const element of elements) {
                element.externalSize(this.elementWidth, this.elementWidth / this.aspectRatio);
            }
        } else {
            for (const element of elements) {
                element.externalWidth = this.elementWidth;
            }
        }
    }

    public layoutChildren(container: IDisplayContainer & ILayoutElement, elements: Array<ILayoutElement>): void {
        let currentColumn = 1;
        let currentX = container.paddingLeft;
        let currentY = container.paddingTop;
        let elementHeight = 0;
        for (const element of elements) {
            element.position(currentX, currentY);
            if (this.columns === 1) {
                currentY += this.verticalGap + element.measuredHeight;
            } else if (currentColumn % this.columns === 0) {
                currentColumn = 1;
                currentX = container.paddingLeft;
                currentY += this.verticalGap + elementHeight;
            } else {
                currentColumn++;
                currentX += this.horizontalGap + this.elementWidth;
            }
            if (elementHeight < element.measuredHeight) {
                elementHeight = element.measuredHeight;
            }
        }
    }

    public getInternalSize(container: IDisplayContainer & ILayoutElement, elements: Array<ILayoutElement>): [number, number] {
        return [0, 0];
    }

    public getInternalWidth(container: IDisplayContainer & ILayoutElement, elements: Array<ILayoutElement>): number {
        return 0;
    }

    public getInternalHeight(container: IDisplayContainer & ILayoutElement, elements: Array<ILayoutElement>): number {
        const insideWidth = container.measuredWidth - container.paddingLeft - container.paddingRight;
        this.columns = Math.floor(insideWidth / this.minColumnWidth);
        if (this.columns === 0) {
            this.columns = 1;
        }
        if (this.columns > this.maxColumns) {
            this.columns = this.maxColumns;
        }
        let currentColumn = 1;
        let currentY = container.paddingTop;
        let currentRowHeight = 0;
        const len = elements.length;
        let element: ILayoutElement;
        let i = 0;
        for (i; i < len; i++) {
            element = elements[i];
            if (currentRowHeight < element.measuredHeight) {
                currentRowHeight = element.measuredHeight;
            }
            if (currentColumn === this.columns) {
                currentColumn = 1;
                currentY = currentY + currentRowHeight + this.verticalGap;
                currentRowHeight = 0;
            } else {
                currentColumn++;
            }
        }
        if (i % this.columns !== 0) {
            return currentY + currentRowHeight + container.paddingBottom;
        }
        return currentY - this.verticalGap + container.paddingBottom;
    }

    private _minColumnWidth = 256;

    public set minColumnWidth(value: number) {
        if (this._minColumnWidth === value) {
            return;
        }
        if ((isNaN(value) || value <= 0)) {
            if (value !== 256) {
                this._minColumnWidth = 256;
                this.notifyInvalid();
            }
            return;
        }
        this._minColumnWidth = value;
        this.notifyInvalid();
    }

    public get minColumnWidth(): number {
        return this._minColumnWidth;
    }

    private _maxColumns = 4;

    public set maxColumns(value: number) {
        if (this._maxColumns === value) {
            return;
        }
        if ((isNaN(value) || value < 1)) {
            if (value !== 4) {
                this._maxColumns = 4;
                this.notifyInvalid();
            }
            return;
        }
        this._maxColumns = value;
        this.notifyInvalid();
    }

    public get maxColumns(): number {
        return this._maxColumns;
    }

    private _gap = 0;

    public set gap(value: number) {
        if (this._gap === value) {
            return;
        }
        if (isNaN(value) || value < 0) {
            if (this._gap !== 0) {
                this._gap = 0;
                this._horizontalGap = 0;
                this._verticalGap = 0;
                this.notifyInvalid();
            }
            return;
        }
        this._gap = value;
        this._horizontalGap = value;
        this._verticalGap = value;
        this.notifyInvalid();
    }

    public get gap(): number {
        return this._gap;
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

    private _aspectRatio = NaN;

    public set aspectRatio(value: number) {
        if (isNaN(this._aspectRatio) && isNaN(value)) {
            return;
        }
        if (this._aspectRatio === value) {
            return;
        }
        this._aspectRatio = value;
        this.notifyInvalid();
    }

    public get aspectRatio(): number {
        return this._aspectRatio;
    }

    private notifyInvalid(): void {
        this.dispatch(Strings.INVALIDATE);
    }
}
