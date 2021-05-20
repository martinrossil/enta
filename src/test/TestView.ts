import ItemRenderer from '../components/ItemRenderer'
import Color from '../vo/Color';
import ITest from './ITest';

export default class TestView extends ItemRenderer<ITest> {
    public constructor() {
        super();
        this.height = 64;
        this.backgroundColor = new Color(212, 100, 50);
    }
}
customElements.define('test-view', TestView);
