import ApplicationElement from './core/ApplicationElement';
import ColumnLayout from './layout/ColumnLayout';
import PurpleBox from './test/PurpleBox';

export default class EntaDev extends ApplicationElement {
    public static TAG = 'enta-dev';
    public constructor() {
        super();
        this.name = EntaDev.TAG;
        this.padding = 20;
        this.layout = new ColumnLayout(128, 5, 24, 1.5);
        const e: Array<PurpleBox> = [];
        for (let i = 0; i < 20; i++) {
            const p = new PurpleBox();
            // p.height = 128;
            e.push(p);
        }
        this.addElements(e);
    }
}
customElements.define(EntaDev.TAG, EntaDev);
