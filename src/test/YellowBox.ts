import DisplayElement from '../core/DisplayElement';

export default class YellowBox extends DisplayElement {
    public constructor() {
        super();
        this.name = 'YellowBox';
    }
}
customElements.define('yellow-box', YellowBox);
