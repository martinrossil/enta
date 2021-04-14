import DisplayElement from '../core/DisplayElement';
import HorizontalLayoutData from '../layout/HorizontalLayoutData';
import Color from '../vo/Color';

export default class HorizontalLayoutSpacer extends DisplayElement {
    public constructor(percentWidth = NaN, percentHeight = NaN) {
        super();
        this.name = 'HorizontalSpacer';
        this.layoutData = new HorizontalLayoutData(percentWidth, percentHeight);
    }
}
customElements.define('horizontal-layout-spacer', HorizontalLayoutSpacer);
