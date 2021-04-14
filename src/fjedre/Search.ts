import DisplayContainer from '../core/DisplayContainer';
import IPathElement from '../interfaces/svg/IPathElement';
import ISurfaceElement from '../interfaces/svg/ISurfaceElement';
import AnchorLayoutData from '../layout/AnchorLayoutData';
import HorizontalLayoutData from '../layout/HorizontalLayoutData';
import PathElement from '../svg/PathElement';
import SurfaceElement from '../svg/SurfaceElement';
import Color from '../vo/Color';
import { Icons } from '../components/Icons';
import Rectangle from '../vo/Rectangle';
import ILabelElement from '../interfaces/text/ILabelElement';
import LabelElement from '../text/LabelElement';
import TypeFace from '../vo/TypeFace';
import AnchorLayout from '../layout/AnchorLayout';

export default class Search extends DisplayContainer {
    public constructor() {
        super();
        this.name = 'Search';
        this.height = 36;
        this.layout = new AnchorLayout();
        this.layoutData = new HorizontalLayoutData(50);
        this.addElement(this.surfaceElement);
        this.addElement(this.search);
        this.addElement(this.labelElement);
    }

    private _surfaceElement!: ISurfaceElement;

    private get surfaceElement(): ISurfaceElement {
        if (!this._surfaceElement) {
            this._surfaceElement = new SurfaceElement();
            this._surfaceElement.layoutData = new AnchorLayoutData(0.0, 0.0, 0.0, 0.0);
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
            this._search.fillColor = new Color(215, 16, 47); // blue gray 500
            this._search.layoutData = new AnchorLayoutData(6, NaN, NaN, 8);
        }
        return this._search;
    }

    private _labelElement!: ILabelElement;

    private get labelElement(): ILabelElement {
        if (!this._labelElement) {
            this._labelElement = new LabelElement();
            this._labelElement.text = 'Søg efter varer her...';
            this._labelElement.layoutData = new AnchorLayoutData(12, NaN, NaN, 40);
            this._labelElement.textColor = new Color(215, 16, 47); // blue gray 500
            this._labelElement.typeFace = new TypeFace('Inter', 0.727, 0.09, 0.0);
            // this._labelElement.fontWeight = 400;
        }
        return this._labelElement;
    }
}
customElements.define('search-element', Search);
