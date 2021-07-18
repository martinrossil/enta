import ApplicationElement from './core/ApplicationElement';
import LeftNavigation from './test/LeftNavigation';
import IDisplayContainer from './interfaces/core/IDisplayContainer';

export default class EntaDev extends ApplicationElement {
    public static TAG = 'enta-dev';
    public constructor() {
        super();
        this.name = EntaDev.TAG;
        this.addElement(new LeftNavigation());
    }

    private get self(): IDisplayContainer {
        return this;
    }
}
customElements.define(EntaDev.TAG, EntaDev);
