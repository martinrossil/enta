import ITest from './ITest';
import List from '../components/List';
import Color from '../vo/Color';
import TestView from './TestView';
import Test from './Test';
import ArrayCollection from '../data/ArrayCollection';
import ColumnLayout from '../layout/ColumnLayout';

export default class TestList extends List<ITest> {
    public constructor() {
        super();
        this.name = 'TestList';
        this.percentWidth = 100;
        this.percentHeight = 100;
        // this.width = 600;
        this.measureInternalSize = false;
        this.backgroundColor = new Color(0, 100, 50, 0.2);
        this.ItemRendererClass = TestView;
        this.layout = new ColumnLayout(100, 4, 24);
        const tva: Array<ITest> = [];
        this.padding = 24;
        for (let i = 0; i < 19; i++) {
            tva.push(new Test(''));
        }
        this.dataProvider = new ArrayCollection(tva);
    }
}
customElements.define('test-list', TestList);
