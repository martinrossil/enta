import HorizontalLayoutSpacer from '../components/HorizontalLayoutSpacer';
import DisplayContainer from '../core/DisplayContainer';
import BoxShadowFilter from '../filters/BoxShadowFilter';
import ILabelElement from '../interfaces/text/ILabelElement';
import AnchorLayout from '../layout/AnchorLayout';
import AnchorLayoutData from '../layout/AnchorLayoutData';
import HorizontalLayout from '../layout/HorizontalLayout';
import LabelElement from '../text/LabelElement';
import Color from '../vo/Color';
import LanguageSelector from './LanguageSelector';
import Logo from './Logo';
import Search from './Search';
import Theme from './Theme';

export default class TopBar extends DisplayContainer {
    public constructor() {
        super();
        this.name = 'TopBar';
        this.layoutData = new AnchorLayoutData(NaN, NaN, NaN, NaN, 100);
        this.paddingX = 32;
        this.height = 80;
        this.backgroundColor = Theme.white;
        this.addFilter(Theme.smallBoxShadow);
        this.layout = new AnchorLayout();
        this.addElement(this.labelElement);
        this.addElement(this.labelElement2);
        this.addElement(new Search());
        this.addElement(new LanguageSelector());
        // this.layout = new HorizontalLayout(0, 'fill', 'middle');
        // this.addElements([new Logo(), new HorizontalLayoutSpacer(), new Search(), new HorizontalLayoutSpacer(), new LanguageSelector()]);
    }

    private _labelElement!: ILabelElement;

    private get labelElement(): ILabelElement {
        if (!this._labelElement) {
            this._labelElement = new LabelElement();
            this._labelElement.enabled = false;
            this._labelElement.typeFace = Theme.inter;
            this._labelElement.fontSize = 31;
            this._labelElement.fontWeight = 800;
            this._labelElement.textColor = new Color(0, 100, 50);
            this._labelElement.layoutData = new AnchorLayoutData(20, NaN, NaN, 0);
            this._labelElement.letterSpacing = 0.9;
            this._labelElement.text = 'SODEMANN';
        }
        return this._labelElement;
    }

    private _labelElement2!: ILabelElement;

    private get labelElement2(): ILabelElement {
        if (!this._labelElement2) {
            this._labelElement2 = new LabelElement();
            this._labelElement2.enabled = false;
            this._labelElement2.typeFace = Theme.inter;
            this._labelElement2.fontSize = 16;
            this._labelElement2.fontWeight = 800;
            this._labelElement2.textColor = Theme.blueGray700;
            this._labelElement2.layoutData = new AnchorLayoutData(46, NaN, NaN, 0);
            this._labelElement2.letterSpacing = 1.2;
            this._labelElement2.text = 'INDUSTRIFJEDRE A/S';
        }
        return this._labelElement2;
    }
}
customElements.define('top-bar', TopBar);
