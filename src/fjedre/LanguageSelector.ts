import { Icons } from '../components/Icons';
import DisplayContainer from '../core/DisplayContainer';
import IPathElement from '../interfaces/svg/IPathElement';
import HorizontalLayout from '../layout/HorizontalLayout';
import PathElement from '../svg/PathElement';
import Color from '../vo/Color';
import Rectangle from '../vo/Rectangle';

export default class LanguageSelector extends DisplayContainer {
    public constructor() {
        super();
        this.name = 'LanguageSelector';
        this.layout = new HorizontalLayout(8, 'left', 'middle');
        this.addElement(this.flag);
        this.addElement(this.expand);
    }

    private _flag!: IPathElement;

    private get flag(): IPathElement {
        if (!this._flag) {
            this._flag = new PathElement();
            this._flag.size(20, 14);
            this._flag.viewBox = new Rectangle(0, 0, 20, 14);
            this._flag.pathData = Icons.FLAG;
            this._flag.fillColor = new Color(0, 100, 50);
        }
        return this._flag
    }

    private _expand!: IPathElement;

    private get expand(): IPathElement {
        if (!this._expand) {
            this._expand = new PathElement();
            this._expand.size(24, 24);
            this._expand.pathData = Icons.EXPAND_MORE;
            this._expand.fillColor = new Color(215, 16, 47); // blue gray 500
        }
        return this._expand;
    }
}
customElements.define('language-selector', LanguageSelector);
