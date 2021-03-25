import IDisplayElement from '../interfaces/core/IDisplayElement';
import LayoutElement from './LayoutElement';

export default class DisplayElement extends LayoutElement implements IDisplayElement {
    public constructor() {
        super();
        this.name = 'DisplayElement';
    }

    private _backgroundColor = '';

    public set backgroundColor(value: string) {
        if (this._backgroundColor === value) {
            return;
        }
        this.style.backgroundColor = value;
    }

    public get backgroundColor(): string {
        return this._backgroundColor;
    }
}
customElements.define('display-element', DisplayElement);
