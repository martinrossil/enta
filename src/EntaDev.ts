import { Icons } from './components/Icons';
import ApplicationElement from './core/ApplicationElement';
import DisplayElement from './core/DisplayElement';
import BottomBar from './fjedre/BottomBar';
import TopBar from './fjedre/TopBar';
import IDisplayElement from './interfaces/core/IDisplayElement';
import IPathElement from './interfaces/svg/IPathElement';
import AnchorLayout from './layout/AnchorLayout';
import AnchorLayoutData from './layout/AnchorLayoutData';
import PathElement from './svg/PathElement';
import Color from './vo/Color';
import Rectangle from './vo/Rectangle';

export default class EntaDev extends ApplicationElement {
    public constructor() {
        super();
        this.name = 'EntaDev';
        this.backgroundColor = new Color(220, 14, 96);
        this.layout = new AnchorLayout();
        window.addEventListener('load', () => {
            console.log('page loaded');
            this.addElement(new TopBar());
            this.addElement(new BottomBar());
            this.addElement(this.pathElement);
            this.addElement(this.box);
        });
    }

    private _box!: IDisplayElement;

    private get box(): IDisplayElement {
        if (!this._box) {
            this._box = new DisplayElement();
        }
        return this._box;
    }

    private _pathElement!: IPathElement;

    private get pathElement(): IPathElement {
        if (!this._pathElement) {
            this._pathElement = new PathElement();
            this._pathElement.viewBox = new Rectangle(-1, -1, 26, 26);
            this._pathElement.size(200, 200);
            this._pathElement.pathData = Icons.LOGO;
            this._pathElement.fillColor = new Color(0, 100, 45);
            this._pathElement.layoutData = AnchorLayoutData.centerMiddle();
        }
        return this._pathElement;
    }
}
customElements.define('enta-dev', EntaDev);
