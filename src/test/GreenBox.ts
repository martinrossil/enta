import DisplayElement from '../core/DisplayElement';
import Color from '../shared/Color';

export default class GreenBox extends DisplayElement {
    public constructor() {
        super();
        this.name = 'GreenBox';
        this.size(200, 200);
        this.backgroundColor = new Color(120, 100, 50);
        this.zIndex = 0;
        this.cursor = 'pointer';
        this.align = 'rightBottom';
    }
}
customElements.define('green-box', GreenBox);
