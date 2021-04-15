import DisplayContainer from '../core/DisplayContainer';
import IDisplayContainer from '../interfaces/core/IDisplayContainer';
import IPathElement from '../interfaces/svg/IPathElement';
import ILabelElement from '../interfaces/text/ILabelElement';
import AnchorLayout from '../layout/AnchorLayout';
import AnchorLayoutData from '../layout/AnchorLayoutData';
import PathElement from '../svg/PathElement';
import LabelElement from '../text/LabelElement';
import ISellingPointRenderer from './interfaces/ISellingPointRenderer';
import ISellingPoint from './interfaces/vo/ISellingPoint';
import Theme from './Theme';

export default class SellingPointRenderer extends DisplayContainer implements ISellingPointRenderer {
    public constructor() {
        super();
        this.name = 'SellingPointRenderer';
        this.size(320, 40);
        // this.backgroundColor = Theme.blueGray200;
        this.layout = new AnchorLayout();
        this.addElement(this.iconBlock);
        this.addElement(this.labelElement);
        this.addElement(this.description);
    }

    private _iconBlock!: IDisplayContainer;

    private get iconBlock(): IDisplayContainer {
        if (!this._iconBlock) {
            this._iconBlock = new DisplayContainer();
            this._iconBlock.padding = 8;
            this._iconBlock.cornerSize = 6;
            this._iconBlock.backgroundColor = Theme.blueGray200;
            this._iconBlock.size(40, 40);
            this._iconBlock.addElement(this.pathElement);
        }
        return this._iconBlock;
    }

    private _pathElement!: IPathElement;

    private get pathElement(): IPathElement {
        if (!this._pathElement) {
            this._pathElement = new PathElement();
            this._pathElement.size(24, 24);
            this._pathElement.fillColor = Theme.blueGray400;
        }
        return this._pathElement;
    }

    private _labelElement!: ILabelElement;

    private get labelElement(): ILabelElement {
        if (!this._labelElement) {
            this._labelElement = new LabelElement();
            this._labelElement.enabled = false;
            this._labelElement.typeFace = Theme.inter;
            this._labelElement.fontSize = 14;
            this._labelElement.fontWeight = 600;
            this._labelElement.textColor = Theme.blueGray500;
            this._labelElement.layoutData = new AnchorLayoutData(6, 16, NaN, 64);
            this._labelElement.letterSpacing = 0.4;
        }
        return this._labelElement;
    }

    private _description!: ILabelElement;

    private get description(): ILabelElement {
        if (!this._description) {
            this._description = new LabelElement();
            this._description.enabled = false;
            this._description.typeFace = Theme.inter;
            this._description.fontSize = 14;
            this._description.fontWeight = 400;
            this._description.textColor = Theme.blueGray400;
            this._description.layoutData = new AnchorLayoutData(24, 16, NaN, 64);
        }
        return this._description;
    }

    private _sellingPoint: ISellingPoint | null = null;

    public set sellingPoint(value: ISellingPoint | null) {
        if (value) {
            this.pathElement.pathData = value.icon;
            this.labelElement.text = value.title;
            this.description.text = value.description;
        }
    }

    public get sellingPoint(): ISellingPoint | null {
        return this._sellingPoint;
    }
}
customElements.define('selling-point-renderer', SellingPointRenderer);
