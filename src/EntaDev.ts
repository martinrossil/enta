import ApplicationElement from './core/ApplicationElement';
import LeftNavigation from './test/LeftNavigation';
import PurpleBox from './test/PurpleBox';

export default class EntaDev extends ApplicationElement {
    public static TAG = 'enta-dev';
    public constructor() {
        super();
        this.name = EntaDev.TAG;
        this.addElement(new LeftNavigation());
    }
}
customElements.define(EntaDev.TAG, EntaDev);
