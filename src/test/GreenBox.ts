import DisplayContainer from '../core/DisplayContainer';
import HorizontalLayout from '../layout/HorizontalLayout';
import Color from '../vo/Color';
import PurpleBox from './PurpleBox';
import RedBox from './RedBox';

export default class GreenBox extends DisplayContainer {
    public constructor() {
        super();
        this.name = 'GreenBox';
        this.percentWidth = 100;
        this.height = 56;
        // this.size(100, 100);
        this.layout = new HorizontalLayout(16);
        this.backgroundColor = new Color(120, 100, 50, 0.5);
        this.addElements([new PurpleBox(), new RedBox()]);
    }
}
// customElements.define('green-box', GreenBox);
