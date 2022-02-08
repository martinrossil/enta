import ApplicationElement from './core/ApplicationElement';
import Colors from './test/design/Colors';
import PurpleBox from './test/PurpleBox';
import TestMachine from './test/TestMachine';

export default class EntaDev extends ApplicationElement {
    public constructor() {
        super();
        this.name = 'EntaDev';
        this.backgroundColor = Colors.BACKGROUND;
        this.padding = 32;
        this.addElement(new PurpleBox());
    }
}
customElements.define('enta-dev', EntaDev);
