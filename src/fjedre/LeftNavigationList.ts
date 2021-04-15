import { Icons } from '../components/Icons';
import List from '../components/List';
import ArrayCollection from '../data/ArrayCollection';
import IArrayCollection from '../interfaces/data/IArrayCollection';
import AnchorLayoutData from '../layout/AnchorLayoutData';
import VerticalLayout from '../layout/VerticalLayout';
import Color from '../vo/Color';
import INavigationItem from './interfaces/vo/INavigationItem';
import NavigationItemRenderer from './NavigationItemRenderer';
import NavigationItem from './vo/NavigationItem';

export default class LeftNavigationList extends List<INavigationItem> {
    public constructor() {
        super();
        this.name = 'LeftNavigationList';
        this.ItemRendererClass = NavigationItemRenderer;
        this.width = 192;
        this.layoutData = new AnchorLayoutData(104, NaN, 0, 32);
        this.dataProvider = this.navigationItems;
        this.layout = new VerticalLayout(16);
        this.selectedIndex = 0;
    }

    private _navigationItems!: IArrayCollection<INavigationItem>;

    private get navigationItems(): IArrayCollection<INavigationItem> {
        if (!this._navigationItems) {
            const items: Array<INavigationItem> = [
                new NavigationItem(Icons.LOGO, 'Produkter', '/produkter'),
                new NavigationItem(Icons.THREE_D_ROTATION, '3D CAD', '/produkter'),
                new NavigationItem(Icons.SCHEDULE, 'Hurtig køb', '/produkter'),
                new NavigationItem(Icons.HELP_OUTLINE, 'Spørgsmål', '/produkter'),
                new NavigationItem(Icons.INFO, 'Information', '/produkter'),
                new NavigationItem(Icons.CONTACT_PHONE, 'Kontakt', '/produkter'),
                new NavigationItem(Icons.BUSINESS, 'Firmaprofil', '/produkter')
            ];
            this._navigationItems = new ArrayCollection(items);
        }
        return this._navigationItems;
    }
}
customElements.define('left-navigation-list', LeftNavigationList);
