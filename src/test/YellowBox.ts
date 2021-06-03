import DisplayElement from '../core/DisplayElement';
import Color from '../vo/Color';

export default class YellowBox extends DisplayElement {
    public constructor() {
        super();
        this.name = 'YellowBox';
        this.backgroundColor = new Color(50, 100, 50, 0.5);
    }
}
customElements.define('yellow-box', YellowBox);
