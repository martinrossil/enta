import ApplicationElement from './core/ApplicationElement';
import BottomBar from './fjedre/BottomBar';
import TopBar from './fjedre/TopBar';
import AnchorLayout from './layout/AnchorLayout';
import Color from './vo/Color';

export default class EntaDev extends ApplicationElement {
    public constructor() {
        super();
        this.name = 'EntaDev';
        this.backgroundColor = new Color(220, 14, 96);
        this.layout = new AnchorLayout();
        window.addEventListener('load', () => {
            console.log('page loaded');
            this.addElement(new TopBar());
            this.addElement(new BottomBar());
        });
    }
}
customElements.define('enta-dev', EntaDev);
