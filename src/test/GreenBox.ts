import DisplayElement from '../core/DisplayElement';
import Color from '../vo/Color';

export default class GreenBox extends DisplayElement {
    public constructor() {
        super();
        this.name = 'GreenBox';
        this.size(200, 200);
        this.left = 200;
        this.top = 200;
        this.backgroundColor = new Color(120, 100, 50);
        this.zIndex = 0;
    }
}
customElements.define('green-box', GreenBox);
