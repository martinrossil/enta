import DisplayContainer from '../core/DisplayContainer';
import Color from '../vo/Color';
import PurpleBox from './PurpleBox';

export default class YellowBox extends DisplayContainer {
    public constructor() {
        super();
        this.name = 'YellowBox';
        this.percentWidth = 100;
        // this.height = 56;
        this.backgroundColor = new Color(50, 100, 50, 0.5);
        this.addElement(new PurpleBox());
    }
}
// customElements.define('yellow-box', YellowBox);
