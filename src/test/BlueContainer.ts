import DisplayContainer from '../core/DisplayContainer';
import ColumnLayout from '../layout/ColumnLayout';
import Color from '../shared/Color';
import RedBox from './RedBox';

export default class BlueContainer extends DisplayContainer {
    public constructor() {
        super();
        this.name = 'BlueContainer';
        this.layout = new ColumnLayout(128, 5, 20);
        this.backgroundColor = new Color(240, 100, 50, 0.5);
        this.padding = 20;
        this.addElements([new RedBox(), new RedBox(), new RedBox(), new RedBox(), new RedBox(), new RedBox(), new RedBox(), new RedBox(), new RedBox(), new RedBox(), new RedBox(), new RedBox(), new RedBox(), new RedBox(), new RedBox(), new RedBox(), new RedBox(), new RedBox(), new RedBox(), new RedBox()]);
    }
}
customElements.define('blue-container', BlueContainer);
