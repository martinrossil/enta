import DisplayElement from '../core/DisplayElement';
import { Strings } from '../enums/Strings';
import IImageElement from '../interfaces/components/IImageElement';

export default class ImageElement extends DisplayElement implements IImageElement {
    public constructor() {
        super();
        this.name = 'Image';
        this.appendChild(this.img);
    }

    protected validate(): void {
        super.validate();
        this.img.width = this.measuredWidth;
        this.img.height = this.measuredHeight;
    }

    private _img!: HTMLImageElement;

    private get img(): HTMLImageElement {
        if (!this._img) {
            this._img = document.createElement('img');
            this._img.style.objectFit = Strings.COVER;
        }
        return this._img;
    }

    private _source = '';

    public set source(value: string) {
        if (this._source === value) {
            return;
        }
        this._source = value;
        this.img.src = value;
    }

    public get source(): string {
        return this._source;
    }

    private _alt = '';

    public set alt(value: string) {
        if (this._alt === value) {
            return;
        }
        this._alt = value;
        this.img.alt = value;
    }

    public get alt(): string {
        return this._alt;
    }
}
customElements.define('image-element', ImageElement);
