import DisplayElement from '../core/DisplayElement';
import Color from '../vo/Color';

export default class RedBox extends DisplayElement {
    public constructor() {
        super();
        this.name = 'RedBox';
        this.size(100, 100);
        this.backgroundColor = new Color(0, 100, 50, 0.5);
    }
}
customElements.define('red-box', RedBox);
