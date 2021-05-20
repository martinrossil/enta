import ApplicationElement from './core/ApplicationElement';
import BlueContainer from './test/BlueContainer';

export default class EntaDev extends ApplicationElement {
    public constructor() {
        super();
        this.name = 'EntaDev2';
        this.padding = 20;
        this.addElement(new BlueContainer());
    }
}
customElements.define('enta-dev', EntaDev);
