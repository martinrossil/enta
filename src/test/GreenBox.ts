import DisplayElement from '../core/DisplayElement';
import Color from '../vo/Color';

export default class GreenBox extends DisplayElement {
    public constructor() {
        super();
        this.name = 'GreenBox';
        this.size(100, 100);
        this.backgroundColor = new Color(120, 100, 50, 0.5);
    }
}
customElements.define('green-box', GreenBox);
