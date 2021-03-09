import IBaseElement from '../interfaces/core/IBaseElement';

export default class BaseElement extends HTMLElement implements IBaseElement {
    public constructor() {
        super();
        this.name = 'BaseElement';
        this.invalidate = this.invalidate.bind(this);
    }

    public dispatch<Item>(typeArg: string, payload: Item | null = null, bubbles = false): void {
        this.dispatchEvent(new CustomEvent<Item | null>(typeArg, { detail: payload, bubbles: bubbles }));
    }

    public connected = false;

    public name = '';

    private connectedCallback(): void {
        this.connected = true;
        this.validate();
    }

    private disconnectedCallback(): void {
        this.connected = false;
    }

    protected invalidate(): void {
        if (this.connected) {
            this.validate();
        }
    }

    protected validate(): void {
        // override
    }

    private _visible = true;

    public set visible(value: boolean) {
        if (this._visible === value) {
            return;
        }
        this._visible = value;
        if (this._visible) {
            this.style.visibility = '';
            return;
        }
        this.style.visibility = 'hidden';
    }

    public get visible(): boolean {
        return this._visible;
    }
}
customElements.define('base-element', BaseElement);
