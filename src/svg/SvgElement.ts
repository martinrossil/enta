import BlurFilter from '../filters/BlurFilter';
import ShadowFilter from '../filters/ShadowFilter';
import ISvgElement from '../interfaces/svg/ISvgElement';
import SizeElement from '../core/SizeElement';
import { Cursor, SvgNameSpace } from '../shared/Types';
import { IRectangle } from '../shared/Interfaces';

export default class SvgElement extends SizeElement implements ISvgElement {
    protected SVG_NS: SvgNameSpace = 'http://www.w3.org/2000/svg';
    public constructor() {
        super();
        this.name = 'SvgElement';
        this.enabled = false;
        this.appendChild(this.svg);
    }

    protected validate(): void {
        super.validate();
        this.updateSvgAttributes();
    }

    private updateSvgAttributes(): void {
        this.svg.setAttribute('width', this.actualWidth.toString());
        this.svg.setAttribute('height', this.actualWidth.toString());
    }

    public addFilter(value: BlurFilter | ShadowFilter): void {
        console.log(this.name, value);
    }

    private _svg!: SVGSVGElement;

    private get svg(): SVGSVGElement {
        if (!this._svg) {
            this._svg = document.createElementNS(this.SVG_NS, 'svg');
            this._svg.style.position = 'absolute';
            this._svg.style.overflow = 'visible';
            this._svg.appendChild(this.defs);
            this._svg.appendChild(this.group);
            this._svg.setAttribute('preserveAspectRatio', 'none');
        }
        return this._svg;
    }

    private _defs!: SVGDefsElement;

    protected get defs(): SVGDefsElement {
        if (!this._defs) {
            this._defs = document.createElementNS(this.SVG_NS, 'defs');
        }
        return this._defs;
    }

    private _group!: SVGElement;

    protected get group(): SVGElement {
        if (!this._group) {
            this._group = document.createElementNS(this.SVG_NS, 'g');
        }
        return this._group;
    }

    private _viewBox: IRectangle | null = null;

    public set viewBox(value: IRectangle | null) {
        if (this._viewBox === value) {
            return;
        }
        this._viewBox = value;
        if (this._viewBox) {
            const box = this._viewBox;
            this.svg.setAttribute('viewBox', box.x + ' ' + box.y + ' ' + box.width + ' ' + box.height);
            return;
        }
        this.svg.removeAttribute('viewBox');
    }

    public get viewBox(): IRectangle | null {
        return this._viewBox;
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

    private _enabled = true;

    public set enabled(value: boolean) {
        if (this._enabled === value) {
            return;
        }
        this._enabled = value;
        if (value) {
            this.style.pointerEvents = '';
            this.style.userSelect = 'auto';
        } else {
            this.style.pointerEvents = 'none';
            this.style.userSelect = 'none';
        }
    }

    public get enabled(): boolean {
        return this._enabled;
    }

    private _cursor: Cursor = '';

    public set cursor(value: Cursor) {
        if (this._cursor === value) {
            return;
        }
        this._cursor = value;
        this.style.cursor = value;
    }

    public get cursor(): Cursor {
        return this._cursor;
    }
}
