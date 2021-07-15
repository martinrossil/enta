import Strings from '../consts/Strings';
import EventDispatcher from '../event/EventDispatcher';
import IColomnLayout from '../interfaces/layout/IColumnLayout';
import ISvgElement from '../interfaces/svg/ISvgElement';
import IDisplayContainer from '../interfaces/core/IDisplayContainer';
import IDisplayElement from '../interfaces/core/IDisplayElement';

export default class ColumnLayout extends EventDispatcher implements IColomnLayout {
    public constructor(minColumnWidth = 128, maxColumns = 4, gap = 16) {
        super();
        this.name = 'ColumnLayout';
        this.minColumnWidth = minColumnWidth;
        this.maxColumns = maxColumns;
        this.gap = gap;
    }

    public resizeChildren(container: IDisplayContainer, elements: Array<IDisplayElement | ISvgElement>): void {
        const width = container.measuredWidth - container.paddingLeft - container.paddingRight;
        const [columnWidth] = this.getColumnWidthAndCount(width, this.minColumnWidth, this.maxColumns, this.horizontalGap);
        for (const element of elements) {
            element.externalWidth = columnWidth;
        }
    }

    private getColumnWidthAndCount(width: number, minColumnWidth: number, maxColumns: number, gap: number): [number, number] {
        if (maxColumns === 1) {
            return [width, 1];
        }
        const widthMinusGaps = width - (maxColumns - 1) * gap;
        const totalColumnsWidth = minColumnWidth * maxColumns;
        if (totalColumnsWidth <= widthMinusGaps) {
            return [widthMinusGaps / maxColumns, maxColumns];
        }
        return this.getColumnWidthAndCount(width, minColumnWidth, maxColumns - 1, gap);
    }

    public layoutChildren(container: IDisplayContainer, elements: Array<IDisplayElement | ISvgElement>): void {
        if (elements.length === 0) {
            return;
        }
        const width = container.measuredWidth - container.paddingLeft - container.paddingRight;
        const [columnWidth, columnCount] = this.getColumnWidthAndCount(width, this.minColumnWidth, this.maxColumns, this.horizontalGap);
        if (elements.length <= columnCount) {
            let currentX = container.paddingLeft;
            const currentY = container.paddingTop;
            for (const element of elements) {
                element.position(currentX, currentY);
                currentX += this.horizontalGap + columnWidth;
            }
            return;
        }
        let currentColumn = 1;
        let currentX = container.paddingLeft;
        let currentY = container.paddingTop;
        let elementHeight = 0;
        for (const element of elements) {
            if (elementHeight < element.measuredHeight) {
                elementHeight = element.measuredHeight;
            }
            element.position(currentX, currentY);
            if (currentColumn < columnCount) {
                currentColumn++;
                currentX += columnWidth + this.horizontalGap;
            } else {
                currentColumn = 1;
                currentX = container.paddingLeft;
                currentY += elementHeight + this.verticalGap;
                elementHeight = 0;
            }
        }
    }

    private noElementsSize(container: IDisplayContainer): [number, number] {
        return [container.paddingLeft + container.paddingRight, container.paddingTop + container.paddingBottom];
    }

    private oneRowSize(container: IDisplayContainer, elements: Array<IDisplayElement | ISvgElement>): [number, number] {
        const elementCount = elements.length;
        const totalElementsWidth = elementCount * this.minColumnWidth + (elementCount - 1) * this.horizontalGap;
        const calculatedWidth = container.paddingLeft + totalElementsWidth + container.paddingRight;
        const highestElementHeight = this.getHighestElementHeightValue(elements);
        const calculatedHeight = container.paddingTop + highestElementHeight + container.paddingBottom;
        return [calculatedWidth, calculatedHeight];
    }

    public getInternalSize(container: IDisplayContainer, elements: Array<IDisplayElement | ISvgElement>): [number, number] {
        if (elements.length === 0) {
            return this.noElementsSize(container);
        }
        if (elements.length <= this.maxColumns) {
            return this.oneRowSize(container, elements);
        }
        const width = container.measuredWidth - container.paddingLeft - container.paddingRight;
        const [columnWidth, columnCount] = this.getColumnWidthAndCount(width, this.minColumnWidth, this.maxColumns, this.horizontalGap);
        const lastElementIndex = elements.length - 1;
        let currentColumn = 1;
        let currentY = container.paddingTop;
        let elementHeight = 0;
        for (const element of elements) {
            if (elementHeight < element.measuredHeight) {
                elementHeight = element.measuredHeight;
            }
            if (currentColumn < columnCount) {
                currentColumn++;
            } else {
                currentColumn = 1;
                if (elements.indexOf(element) !== lastElementIndex) {
                    currentY += elementHeight + this.verticalGap;
                    elementHeight = 0;
                }
            }
        }
        const totalElementsWidth = this.maxColumns * this.minColumnWidth + (this.maxColumns - 1) * this.horizontalGap;
        const calculatedWidth = container.paddingLeft + totalElementsWidth + container.paddingRight;
        const totalElementsHeight = currentY + elementHeight - container.paddingTop;
        const calculatedHeight = container.paddingTop + totalElementsHeight + container.paddingBottom;
        return [calculatedWidth, calculatedHeight];
    }

    public getInternalHeight(container: IDisplayContainer, elements: Array<IDisplayElement | ISvgElement>): number {
        const lastElementIndex = elements.length - 1;
        let currentColumn = 1;
        let currentY = container.paddingTop;
        let elementHeight = 0;
        const width = container.measuredWidth - container.paddingLeft - container.paddingRight;
        const [columnWidth, columnCount] = this.getColumnWidthAndCount(width, this.minColumnWidth, this.maxColumns, this.horizontalGap);
        for (const element of elements) {
            if (elementHeight < element.measuredHeight) {
                elementHeight = element.measuredHeight;
            }
            if (currentColumn < columnCount) {
                currentColumn++;
            } else {
                currentColumn = 1;
                if (elements.indexOf(element) !== lastElementIndex) {
                    currentY += elementHeight + this.verticalGap;
                    elementHeight = 0;
                }
            }
        }
        const totalElementsHeight = currentY + elementHeight - container.paddingTop;
        return container.paddingTop + totalElementsHeight + container.paddingBottom;
    }

    public getInternalWidth(container: IDisplayContainer, elements: Array<IDisplayElement | ISvgElement>): number {
        if (elements.length === 0) {
            return container.paddingLeft + container.paddingRight;
        }
        if (elements.length <= this.maxColumns) {
            return this.oneRowWidth(container, elements);
        }
        const totalElementsWidth = this.maxColumns * this.minColumnWidth + (this.maxColumns - 1) * this.horizontalGap;
        return container.paddingLeft + totalElementsWidth + container.paddingRight;
    }

    private oneRowWidth(container: IDisplayContainer, elements: Array<IDisplayElement | ISvgElement>): number {
        const elementCount = elements.length;
        const totalElementsWidth = elementCount * this.minColumnWidth + (elementCount - 1) * this.horizontalGap;
        return container.paddingLeft + totalElementsWidth + container.paddingRight;
    }

    private getHighestElementHeightValue(elements: Array<IDisplayElement | ISvgElement>): number {
        let height = 0;
        for (const element of elements) {
            if (height < element.measuredHeight) {
                height = element.measuredHeight;
            }
        }
        return height;
    }

    private _minColumnWidth = 128;

    public set minColumnWidth(value: number) {
        if (this._minColumnWidth === value) {
            return;
        }
        if ((isNaN(value) || value <= 0)) {
            if (value !== 128) {
                this._minColumnWidth = 128;
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

    private _gap = 16;

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

    private _horizontalGap = 16;

    public set horizontalGap(value: number) {
        if (this._horizontalGap === value) {
            return;
        }
        if (isNaN(value) || value < 0) {
            if (this._horizontalGap !== 16) {
                this._horizontalGap = 16;
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

    private _verticalGap = 16;

    public set verticalGap(value: number) {
        if (this._verticalGap === value) {
            return;
        }
        if (isNaN(value) || value < 0) {
            if (this._verticalGap !== 16) {
                this._verticalGap = 16;
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

    private notifyInvalid(): void {
        this.dispatch(Strings.INVALIDATE);
    }
}
