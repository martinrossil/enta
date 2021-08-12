import ScrollContainer from '../../core/ScrollContainer';
import HeroGraphics from './HeroGraphics';
import MainContent from './MainContent';

export default class AppScrollContainer extends ScrollContainer {
    public constructor() {
        super();
        this.name = 'AppScrollContainer';
        this.percentWidth = this.percentHeight = 100;
        this.addElements([new HeroGraphics(), new MainContent()]);
    }
}
customElements.define('app-scroll-container', AppScrollContainer);
