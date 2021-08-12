import DisplayContainer from '../../core/DisplayContainer';
import Colors from '../design/Colors';

export default class HeroGraphics extends DisplayContainer {
    public constructor() {
        super();
        this.name = 'HeroGraphics';
        this.percentWidth = 100;
        this.height = 403;
        this.backgroundColor = Colors.PRIMARY_GREEN;
    }
}
customElements.define('hero-graphics', HeroGraphics);
