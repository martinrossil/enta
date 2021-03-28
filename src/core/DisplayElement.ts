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

    private _cornerSize = 0;

    public set cornerSize(value: number) {
        if (this._cornerSize === value) {
            return;
        }
        if (isNaN(value) || value < 0) {
            if (this._cornerSize !== 0) {
                this._cornerSize = 0;
                this.style.borderRadius = '0';
            }
            return;
        }
        this._cornerSize = value;
        this.style.borderRadius = this._cornerSize + 'px';
    }

    public get cornerSize(): number {
        return this._cornerSize;
    }
}
customElements.define('display-element', DisplayElement);
