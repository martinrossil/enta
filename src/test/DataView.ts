import { Color, DataRenderer } from '..';
import ITest from './ITest';

export default class DataView extends DataRenderer<ITest> {
    public constructor() {
        super();
        this.height = 100;
        this.backgroundColor = new Color(212, 100, 50, 0.2);
    }
}
customElements.define('data-view', DataView);
