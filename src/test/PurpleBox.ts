import DisplayElement from '../core/DisplayElement';
import Color from '../vo/Color';

export default class PurpleBox extends DisplayElement {
    public constructor() {
        super();
        this.name = 'PurpleBox';
        // this.percentWidth = 80;
        // this.height = 70;
        this.size(100, 28);
        this.backgroundColor = new Color(300, 100, 50, 0.5);
    }
}
customElements.define('purple-box', PurpleBox);
