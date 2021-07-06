import ApplicationElement from './core/ApplicationElement';
import ColumnLayout from './layout/ColumnLayout';
import GreenBox from './test/GreenBox';
import PurpleBox from './test/PurpleBox';
import RedBox from './test/RedBox';

export default class EntaDev extends ApplicationElement {
    public static TAG = 'enta-dev';
    public constructor() {
        super();
        this.name = EntaDev.TAG;
        this.addElements([new PurpleBox(), new RedBox(), new GreenBox()]);
    }
}
customElements.define(EntaDev.TAG, EntaDev);
