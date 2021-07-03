import DisplayContainer from '../core/DisplayContainer';
import HorizontalLayout from '../layout/HorizontalLayout';
import Color from '../vo/Color';
import GreenBox from './GreenBox';
import RedBox from './RedBox';
import YellowBox from './YellowBox';

export default class BlueContainer extends DisplayContainer {
    public constructor() {
        super();
        this.name = 'BlueContainer';
        this.layout = new HorizontalLayout(32);
        this.percentWidth = 100;
        this.verticalMiddle = 0;
        this.backgroundColor = new Color(240, 100, 50, 0.5);
        this.addElements([new RedBox(), new GreenBox(), new YellowBox()]);
    }
}
customElements.define('blue-container', BlueContainer);
