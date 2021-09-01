import ApplicationElement from './core/ApplicationElement';
import Colors from './test/design/Colors';
import LeftNavigation from './test/LeftNavigation';

export default class EntaDev extends ApplicationElement {
    public constructor() {
        super();
        this.name = 'EntaDev';
        this.backgroundColor = Colors.BACKGROUND;
        this.padding = 32;
        this.addElement(new LeftNavigation());
    }
}
customElements.define('enta-dev', EntaDev);
