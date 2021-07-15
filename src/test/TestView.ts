import ItemRenderer from '../components/ItemRenderer'
import ILabelElement from '../interfaces/text/ILabelElement';
import LabelElement from '../text/LabelElement';
import Color from '../vo/Color';
import ITest from './ITest';

export default class TestView extends ItemRenderer<ITest> {
    public constructor() {
        super();
        // this.percentWidth = 100;
        this.measureInternalSize = false;
        // this.height = Math.random() * 100 + 100;
        // this.padding = 16;
        this.height = 100; // Math.random() * 200 + 100;
        this.backgroundColor = new Color(212, 100, 50, 0.2);
        // this.addElement(this.nameLabel);
    }

    /* private _nameLabel!: ILabelElement;

    private get nameLabel(): ILabelElement {
        if (!this._nameLabel) {
            this._nameLabel = new LabelElement();
            // this._nameLabel.left = 72;
            // this._nameLabel.top = 12;
        }
        return this._nameLabel;
    }

    protected dataChanged(): void {
        if (this.data) {
            this.nameLabel.text = this.data.text;
        }
    } */
}
customElements.define('test-view', TestView);
