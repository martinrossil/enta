import ItemRenderer from '../components/ItemRenderer';
import IPathElement from '../interfaces/svg/IPathElement';
import ILabelElement from '../interfaces/text/ILabelElement';
import IColor from '../interfaces/vo/IColor';
import HorizontalLayout from '../layout/HorizontalLayout';
import VerticalLayoutData from '../layout/VerticalLayoutData';
import PathElement from '../svg/PathElement';
import LabelElement from '../text/LabelElement';
import Color from '../vo/Color';
import TypeFace from '../vo/TypeFace';
import INavigationItem from './interfaces/vo/INavigationItem';
import Theme from './Theme';

export default class NavigationItemRenderer extends ItemRenderer<INavigationItem> {
    public constructor() {
        super();
        this.name = 'NavigationItemRenderer';
        this.width = 192;
        this.height = 40;
        this.paddingX = 8;
        this.cornerSize = 6;
        this.layout = new HorizontalLayout(16, 'left', 'middle');
        this.addElements([this.pathElement, this.labelElement]);
    }

    private teal700: IColor = new Color(175, 77, 26);
    private teal500: IColor = new Color(173, 80, 40);
    private teal200: IColor = new Color(168, 84, 78);
    private teal100: IColor = new Color(167, 85, 89);

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
            this._labelElement.fontWeight = 500;
            this._labelElement.textColor = Theme.blueGray400;
        }
        return this._labelElement;
    }

    protected dataChanged(): void {
        if (this.data) {
            this.labelElement.text = this.data.text;
            this.pathElement.pathData = this.data.icon;
        }
    }

    public initial(): void {
        if (!this.selected) {
            this.backgroundColor = null;
            this.pathElement.fillColor = Theme.blueGray400;
            this.labelElement.fontWeight = 500;
            this.labelElement.textColor = Theme.blueGray500;
        } else {
            this.backgroundColor = Theme.blueGray200;
            this.pathElement.fillColor = Theme.blueGray500;
            this.labelElement.fontWeight = 600;
            this.labelElement.textColor = Theme.blueGray500;
        }
    }

    public hover(): void {
        this.backgroundColor = Theme.blueGray200;
    }

    public pressed(point: [number, number]): void {
        this.backgroundColor = Theme.blueGray100;
    }

    protected selectedChanged(): void {
        if (this.selected) {
            this.backgroundColor = Theme.blueGray200;
            this.pathElement.fillColor = Theme.blueGray500;
            this.labelElement.fontWeight = 600;
            this.labelElement.textColor = Theme.blueGray500;
            return;
        }
        this.backgroundColor = null;
        this.pathElement.fillColor = Theme.blueGray400;
        this.labelElement.fontWeight = 500;
        this.labelElement.textColor = Theme.blueGray500;
    }
}
customElements.define('navigation-item-renderer', NavigationItemRenderer);
