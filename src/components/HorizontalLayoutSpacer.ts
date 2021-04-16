import SizeElement from '../core/SizeElement';

export default class HorizontalLayoutSpacer extends SizeElement {
    public constructor(percentWidth = NaN, percentHeight = NaN) {
        super();
        this.name = 'HorizontalSpacer';
        this.percentWidth = percentWidth;
        this.percentHeight = percentHeight
    }
}
customElements.define('horizontal-layout-spacer', HorizontalLayoutSpacer);
