import DisplayContainer from '../core/DisplayContainer';
import BoxShadowFilter from '../filters/BoxShadowFilter';
import AnchorLayoutData from '../layout/AnchorLayoutData';
import Color from '../vo/Color';

export default class BottomBar extends DisplayContainer {
    public constructor() {
        super();
        this.name = 'BottomBar';
        this.layoutData = new AnchorLayoutData(NaN, NaN, 0, NaN, 100);
        this.height = 56;
        this.backgroundColor = new Color(0, 0, 100);
        this.addFilter(new BoxShadowFilter(0, -1, 1, NaN, new Color(0, 0, 0, 0.05)));
    }
}
customElements.define('bottom-bar', BottomBar);
