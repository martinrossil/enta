import DisplayElement from '../core/DisplayElement';

export default class Square extends DisplayElement {
    public constructor() {
        super();
        this.name = 'Square';
        this.size(200, 200);
    }
}
customElements.define('square-element', Square);
