import DisplayElement from '../core/DisplayElement';
import Color from '../vo/Color';

export default class PurpleBox extends DisplayElement {
    public constructor() {
        super();
        this.name = 'PurpleBox';
        this.size(100, 100);
        this.backgroundColor = new Color(300, 100, 50, 0.5);
    }
}
customElements.define('purple-box', PurpleBox);
