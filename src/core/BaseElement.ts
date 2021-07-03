import Cursor from '../consts/Cursor';
import Strings from '../consts/Strings';
import IBaseElement from '../interfaces/core/IBaseElement';

export default class BaseElement extends HTMLElement implements IBaseElement {
    public name = '';
    protected connected = false;

    public constructor() {
        super();
        this.name = 'BaseElement';
        this.invalidate = this.invalidate.bind(this);
    }

    public dispatch<Item>(typeArg: string, payload: Item | null = null, bubbles = false): void {
        this.dispatchEvent(new CustomEvent<Item | null>(typeArg, { detail: payload, bubbles: bubbles }));
    }

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

    protected notifyInvalid(): void {
        if (!this.connected) {
            return;
        }
        this.dispatchEvent(new CustomEvent('invalidate', { bubbles: true }));
    }

    private _visible = true;

    public set visible(value: boolean) {
        if (this._visible === value) {
            return;
        }
        this._visible = value;
        if (this._visible) {
            this.style.visibility = Strings.EMPTY;
            return;
        }
        this.style.visibility = Strings.HIDDEN;
    }

    public get visible(): boolean {
        return this._visible;
    }

    private _enabled = true;

    public set enabled(value: boolean) {
        if (this._enabled === value) {
            return;
        }
        this._enabled = value;
        if (value) {
            this.style.pointerEvents = Strings.EMPTY;
            this.style.userSelect = Strings.AUTO;
        } else {
            this.style.pointerEvents = Strings.NONE;
            this.style.userSelect = Strings.NONE;
        }
    }

    public get enabled(): boolean {
        return this._enabled;
    }

    private _cursor: string = Cursor.NONE;

    public set cursor(value: string) {
        if (this._cursor === value) {
            return;
        }
        this._cursor = value;
        this.style.cursor = value;
    }

    public get cursor(): string {
        return this._cursor;
    }
}
