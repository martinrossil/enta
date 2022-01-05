import { ArrayCollection, Color, ColumnLayout, DataContainer } from '..';
import DataView from './DataView';
import ITest from './ITest';
import Test from './Test';

export default class TestDataContainer extends DataContainer<ITest> {
    public constructor() {
        super();
        this.name = 'TestDataContainer';
        this.percentWidth = 100;
        this.percentHeight = 100;
        this.backgroundColor = new Color(0, 100, 50, 0.2);
        this.DataRendererClass = DataView;
        this.layout = new ColumnLayout(100, 4, 24);
        const tva: Array<ITest> = [];
        this.padding = 24;
        for (let i = 0; i < 19; i++) {
            tva.push(new Test(''));
        }
        this.dataProvider = new ArrayCollection(tva);
    }
}
customElements.define('test-data-container', TestDataContainer);
