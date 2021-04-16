import ApplicationElement from './core/ApplicationElement';
import LeftNavigationList from './fjedre/LeftNavigationList';
import Theme from './fjedre/Theme';
import TopBar from './fjedre/TopBar';
import UniqueSellingPoints from './fjedre/UniqueSellingPoints';
import AnchorLayout from './layout/AnchorLayout';

export default class EntaDev extends ApplicationElement {
    public constructor() {
        super();
        this.name = 'EntaDev';
        this.backgroundColor = Theme.blueGray100;
        this.layout = new AnchorLayout();
        window.addEventListener('load', () => {
            this.addElement(new TopBar());
            this.addElement(new LeftNavigationList());
            this.addElement(new UniqueSellingPoints());
        });
    }
}
customElements.define('enta-dev', EntaDev);
