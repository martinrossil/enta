import SquareContainer from './components/SquareContainer';
import ApplicationElement from './core/ApplicationElement';
import AnchorLayout from './layout/AnchorLayout';

export default class EntaDev extends ApplicationElement {
    public constructor() {
        super();
        this.name = 'EntaDev';
        this.backgroundColor = '#F1F5F9';
        this.padding = 20;
        this.layout = new AnchorLayout();
        this.addElement(new SquareContainer());
        window.addEventListener('load', () => {
            //
        });
    }
}
customElements.define('enta-dev', EntaDev);
