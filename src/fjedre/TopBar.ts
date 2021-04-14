import HorizontalLayoutSpacer from '../components/HorizontalLayoutSpacer';
import DisplayContainer from '../core/DisplayContainer';
import BoxShadowFilter from '../filters/BoxShadowFilter';
import AnchorLayoutData from '../layout/AnchorLayoutData';
import HorizontalLayout from '../layout/HorizontalLayout';
import Color from '../vo/Color';
import LanguageSelector from './LanguageSelector';
import Logo from './Logo';
import Search from './Search';

export default class TopBar extends DisplayContainer {
    public constructor() {
        super();
        this.name = 'TopBar';
        this.layoutData = new AnchorLayoutData(NaN, NaN, NaN, NaN, 100);
        this.paddingX = 16;
        this.height = 64;
        this.backgroundColor = new Color(0, 0, 100); // white
        this.addFilter(new BoxShadowFilter(0, 1, 1, NaN, new Color(0, 0, 0, 0.05)));
        this.layout = new HorizontalLayout(0, 'fill', 'middle');
        this.addElements([new Logo(), new HorizontalLayoutSpacer(), new Search(), new HorizontalLayoutSpacer(), new LanguageSelector()]);
    }
}
customElements.define('top-bar', TopBar);
