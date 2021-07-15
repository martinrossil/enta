import ApplicationElement from './core/ApplicationElement';
import TestList from './test/TestList';

export default class EntaDev extends ApplicationElement {
    public static TAG = 'enta-dev';
    public constructor() {
        super();
        this.name = EntaDev.TAG;
        this.padding = 20;
        this.addElement(new TestList());
    }
}
customElements.define(EntaDev.TAG, EntaDev);
