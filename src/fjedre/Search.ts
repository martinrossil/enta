import DisplayContainer from '../core/DisplayContainer';
import IPathElement from '../interfaces/svg/IPathElement';
import ISurfaceElement from '../interfaces/svg/ISurfaceElement';
import PathElement from '../svg/PathElement';
import SurfaceElement from '../svg/SurfaceElement';
import Color from '../vo/Color';
import { Icons } from '../components/Icons';
import Rectangle from '../vo/Rectangle';
import ILabelElement from '../interfaces/text/ILabelElement';
import LabelElement from '../text/LabelElement';
import AnchorLayout from '../layout/AnchorLayout';
import Theme from './Theme';

export default class Search extends DisplayContainer {
    public constructor() {
        super();
        this.name = 'Search';
        this.height = 40;
        this.layout = new AnchorLayout();
        this.addElement(this.surfaceElement);
        this.addElement(this.search);
        this.addElement(this.labelElement);
        this.right = 400;
        this.left = 224;
        this.verticalMiddle = 0;
    }

    private _surfaceElement!: ISurfaceElement;

    private get surfaceElement(): ISurfaceElement {
        if (!this._surfaceElement) {
            this._surfaceElement = new SurfaceElement();
            this._surfaceElement.percentWidth = 100;
            this._surfaceElement.percentHeight = 100;
            this._surfaceElement.fillColor = new Color(0, 0, 0, 0.0);
            this._surfaceElement.strokeColor = new Color(213, 27, 84); // blue gray 300
            this._surfaceElement.strokeWidth = 1;
            this._surfaceElement.cornerSize = 4;
        }
        return this._surfaceElement;
    }

    private _search!: IPathElement;

    private get search(): IPathElement {
        if (!this._search) {
            this._search = new PathElement();
            this._search.size(24, 24);
            this._search.viewBox = new Rectangle(0, 0, 24, 24);
            this._search.pathData = Icons.SEARCH;
            this._search.fillColor = Theme.blueGray400;
            this._search.top = 8;
            this._search.left = 8;
        }
        return this._search;
    }

    private _labelElement!: ILabelElement;

    private get labelElement(): ILabelElement {
        if (!this._labelElement) {
            this._labelElement = new LabelElement();
            this._labelElement.fontSize = 14;
            this._labelElement.text = 'Søg efter varer her...';
            this._labelElement.top = 14;
            this._labelElement.left = 40;
            this._labelElement.textColor = Theme.blueGray400;
            this._labelElement.typeFace = Theme.inter;
            this._labelElement.fontWeight = 500;
        }
        return this._labelElement;
    }
}
customElements.define('search-element', Search);
