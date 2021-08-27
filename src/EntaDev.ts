import ApplicationElement from './core/ApplicationElement';
import Colors from './test/design/Colors';
import GreenBox from './test/GreenBox';

export default class EntaDev extends ApplicationElement {
    public constructor() {
        super();
        this.name = 'EntaDev';
        this.backgroundColor = Colors.BACKGROUND;
        this.padding = 32;
        this.addElement(new GreenBox());
    }
}
customElements.define('enta-dev', EntaDev);
