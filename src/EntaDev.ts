import SquareContainer from './components/SquareContainer';
import ApplicationElement from './core/ApplicationElement';
import AnchorLayout from './layout/AnchorLayout';
import Color from './vo/Color';

export default class EntaDev extends ApplicationElement {
    public constructor() {
        super();
        this.name = 'EntaDev';
        this.backgroundColor = new Color(210, 40, 96);
        this.padding = 20;
        this.layout = new AnchorLayout();
        window.addEventListener('load', () => {
            console.log('page loaded');
            this.addElement(new SquareContainer());
        });
    }
}
customElements.define('enta-dev', EntaDev);
