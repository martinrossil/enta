import ApplicationElement from './core/ApplicationElement';
import PurpleBox from './test/PurpleBox';

export default class EntaDev extends ApplicationElement {
    public static TAG = 'enta-dev';
    public constructor() {
        super();
        this.name = EntaDev.TAG;
        this.addElement(new PurpleBox());
    }
}
customElements.define(EntaDev.TAG, EntaDev);
