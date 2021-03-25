import IPositionElement from '../interfaces/core/IPositionElement';
import BaseElement from './BaseElement';

export default class PositionElement extends BaseElement implements IPositionElement {
    public constructor() {
        super();
        this.name = 'PositionElement';
        this.style.position = 'absolute';
    }

    public position(x: number, y: number): void {
        this.x = x;
        this.y = y;
    }

    private _x = 0;

    public set x(value: number) {
        if (this._x === value) {
            return;
        }
        if (isNaN(value)) {
            if (this._x !== 0) {
                this._x = 0;
                this.updateTransform();
            }
            return;
        }
        this._x = value;
        this.updateTransform();
    }

    public get x(): number {
        return this._x;
    }

    private _y = 0;

    public set y(value: number) {
        if (this._y === value) {
            return;
        }
        if (isNaN(value)) {
            if (this._y !== 0) {
                this._y = 0;
                this.updateTransform();
            }
            return;
        }
        this._y = value;
        this.updateTransform();
    }

    public get y(): number {
        return this._y;
    }

    private updateTransform(): void {
        this.style.transform = 'translate(' + this.x + 'px, ' + this.y + 'px)';
    }
}
customElements.define('position-element', PositionElement);
