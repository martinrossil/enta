import ApplicationElement from './core/ApplicationElement';
import AppScrollContainer from './test/components/AppScrollContainer';
import Colors from './test/design/Colors';

export default class EntaDev extends ApplicationElement {
    public constructor() {
        super();
        this.name = 'EntaDev';
        this.backgroundColor = Colors.BACKGROUND;
        this.addElement(new AppScrollContainer());
    }
}
customElements.define('enta-dev', EntaDev);
