import ApplicationElement from './core/ApplicationElement';
import LeftNavigation from './test/LeftNavigation';

export default class EntaDev extends ApplicationElement {
    public static TAG = 'enta-dev';
    public constructor() {
        super();
        this.name = EntaDev.TAG;
        // this.padding = 20;
        this.addElement(new LeftNavigation());
    }
}
customElements.define(EntaDev.TAG, EntaDev);
