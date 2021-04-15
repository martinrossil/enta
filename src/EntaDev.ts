import { Icons } from './components/Icons';
import List from './components/List';
import ApplicationElement from './core/ApplicationElement';
import DisplayElement from './core/DisplayElement';
import ScrollContainer from './core/ScrollContainer';
import BottomBar from './fjedre/BottomBar';
import INavigationItem from './fjedre/interfaces/vo/INavigationItem';
import LeftNavigationList from './fjedre/LeftNavigationList';
import Theme from './fjedre/Theme';
import TopBar from './fjedre/TopBar';
import UniqueSellingPoints from './fjedre/UniqueSellingPoints';
import IList from './interfaces/components/IList';
import IDisplayElement from './interfaces/core/IDisplayElement';
import ILayoutElement from './interfaces/core/ILayoutElement';
import IScrollContainer from './interfaces/core/IScrollContainer';
import IVerticalLayout from './interfaces/layout/IVerticalLayout';
import IPathElement from './interfaces/svg/IPathElement';
import AnchorLayout from './layout/AnchorLayout';
import AnchorLayoutData from './layout/AnchorLayoutData';
import VerticalLayout from './layout/VerticalLayout';
import PathElement from './svg/PathElement';
import Color from './vo/Color';
import Rectangle from './vo/Rectangle';

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
