import DisplayContainer from '../core/DisplayContainer';
import ColumnLayout from '../layout/ColumnLayout';
import Color from '../vo/Color';
import GreenBox from './GreenBox';
import PurpleBox from './PurpleBox';
import RedBox from './RedBox';
import YellowBox from './YellowBox';

export default class BlueContainer extends DisplayContainer {
    public constructor() {
        super();
        this.name = 'BlueContainer';
        this.layout = new ColumnLayout(200, 2, 200, 20);
        this.percentWidth = 100;
        this.verticalMiddle = 0;
        this.backgroundColor = new Color(240, 100, 50, 0.5);
        this.addElements([new RedBox(), new GreenBox(), new PurpleBox(), new YellowBox()]);
    }
}
customElements.define('blue-container', BlueContainer);
