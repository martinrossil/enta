import ApplicationElement from './core/ApplicationElement';

export default class EntaDev extends ApplicationElement {
    public constructor() {
        super();
        this.name = 'EntaDev';
    }
}
customElements.define('enta-dev', EntaDev);
