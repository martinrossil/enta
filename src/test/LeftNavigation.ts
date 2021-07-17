import List from '../components/List';
import ArrayCollection from '../data/ArrayCollection';
import IArrayCollection from '../interfaces/data/IArrayCollection';
import VerticalLayout from '../layout/VerticalLayout';
import Color from '../vo/Color';
import IProvider from './IProvider';
import LeftNavigationItemRenderer from './LeftNavigationItemRenderer';
import Provider from './Provider';

export default class LeftNavigation extends List<IProvider> {
    public constructor() {
        super();
        this.name = 'ProviderList';
        this.width = 168;
        // this.top = 72;
        this.padding = 16;
        this.paddingTop = 24;
        this.percentHeight = 100;
        this.backgroundColor = new Color(180, 100, 50, 0.2);
        this.ItemRendererClass = LeftNavigationItemRenderer;
        this.layout = new VerticalLayout(8);
        this.dataProvider = this.providers;
        this.selectedIndex = 6;
        this.zIndex = 1;
    }

    private _providers!: IArrayCollection<IProvider>;
    private get providers(): IArrayCollection<IProvider> {
        if (!this._providers) {
            this._providers = new ArrayCollection([
                new Provider('alle', 0, 'Alle Film'),
                new Provider('netflix', 8, 'Netflix'),
                new Provider('netflixboern', 175, 'Netflix Børn'),
                new Provider('disney', 337, 'Disney+'),
                new Provider('viaplay', 76, 'Viaplay'),
                new Provider('hbo', 118, 'HBO'),
                new Provider('prime', 119, 'Amazon Prime'),
                new Provider('appletv', 350, 'Apple TV+'),
                new Provider('itunes', 2, 'Apple Itunes'),
                new Provider('tv2', 383, 'TV 2'),
                new Provider('blockbuster', 423, 'Blockbuster')
            ]);
        }
        return this._providers;
    }
}
customElements.define('left-navigation', LeftNavigation);
