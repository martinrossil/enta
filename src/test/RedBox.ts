import DisplayElement from '../core/DisplayElement';
import Color from '../shared/Color';

export default class RedBox extends DisplayElement {
    public constructor() {
        super();
        this.name = 'RedBox';
        // this.percentWidth = 100;
        // this.size(200, 200);
        this.height = 128; // Math.random() * 100 + 100;
        // this.measureInternalSize = false;
        this.backgroundColor = new Color(0, 100, 50);
        // this.left = 150;
        // this.top = 150;
        // this.z = 2;
    }
}
customElements.define('red-box', RedBox);
