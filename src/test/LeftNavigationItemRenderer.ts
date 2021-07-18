import ItemRenderer from '../components/ItemRenderer';
import IProvider from './IProvider';
import Color from '../shared/Color';

export default class LeftNavigationItemRenderer extends ItemRenderer<IProvider> {
    public constructor() {
        super();
        this.name = 'LeftNavigationItemRenderer';
        this.backgroundColor = new Color(0, 100, 50, 0.2)
        this.percentWidth = 100;
        this.height = 40;
    }
}
customElements.define('left-navigation-item-renderer', LeftNavigationItemRenderer);
