import DisplayContainer from '../core/DisplayContainer';
import HorizontalLayout from '../layout/HorizontalLayout';
import VerticalLayout from '../layout/VerticalLayout';
import Color from '../vo/Color';
import GreenBox from './GreenBox';
import PurpleBox from './PurpleBox';
import RedBox from './RedBox';

export default class BlueContainer extends DisplayContainer {
    public constructor() {
        super();
        this.name = 'BlueContainer';
        this.layout = new HorizontalLayout(20, 'right', 'bottom');
        this.padding = 20;
        // this.percentWidth = 100;
        // this.percentHeight = 100;
        this.horizontalCenter = 0;
        this.verticalMiddle = 0;
        this.backgroundColor = new Color(240, 100, 50, 0.5);
        this.addElements([new RedBox(), new GreenBox(), new PurpleBox()]);
        window.addEventListener('click', () => {
            if (this.layout instanceof HorizontalLayout) {
                this.layout = new VerticalLayout(20);
            } else {
                this.layout = new HorizontalLayout(20);
            }
        });
    }
}
customElements.define('blue-container', BlueContainer);
