import DisplayContainer from '../core/DisplayContainer';
import BoxShadowFilter from '../filters/BoxShadowFilter';
import AnchorLayoutData from '../layout/AnchorLayoutData';
import Color from '../vo/Color';

export default class TopBar extends DisplayContainer {
    public constructor() {
        super();
        this.name = 'TopBar';
        this.layoutData = new AnchorLayoutData(NaN, NaN, NaN, NaN, 100);
        this.height = 56;
        this.backgroundColor = new Color(0, 0, 100);
        this.addFilter(new BoxShadowFilter(0, 1, 1, NaN, new Color(0, 0, 0, 0.05)));
    }
}
customElements.define('top-bar', TopBar);
