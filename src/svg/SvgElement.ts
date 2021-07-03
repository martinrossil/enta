import { ILayoutElement } from '..';
import Strings from '../consts/Strings';
import SizeElement from '../core/SizeElement';
import BlurFilter from '../filters/BlurFilter';
import ShadowFilter from '../filters/ShadowFilter';
import ISvgElement from '../interfaces/svg/ISvgElement';
import IRectangle from '../interfaces/vo/IRectangle';

export default class SvgElement extends SizeElement implements ISvgElement, ILayoutElement {
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
        this.svg.setAttribute(Strings.WIDTH, this.measuredWidth.toString());
        this.svg.setAttribute(Strings.HEIGHT, this.measuredHeight.toString());
    }

    public addFilter(value: BlurFilter | ShadowFilter): void {
        console.log(this.name, value);
    }

    private _svg!: SVGSVGElement;

    private get svg(): SVGSVGElement {
        if (!this._svg) {
            this._svg = document.createElementNS(Strings.SVG_NS, 'svg');
            this._svg.style.position = Strings.ABSOLUTE;
            this._svg.style.overflow = Strings.VISIBLE;
            this._svg.appendChild(this.defs);
            this._svg.appendChild(this.group);
            this._svg.setAttribute(Strings.PRESERVE_ASPECT_RATIO, Strings.NONE);
        }
        return this._svg;
    }

    private _defs!: SVGDefsElement;

    protected get defs(): SVGDefsElement {
        if (!this._defs) {
            this._defs = document.createElementNS(Strings.SVG_NS, 'defs');
        }
        return this._defs;
    }

    private _group!: SVGElement;

    protected get group(): SVGElement {
        if (!this._group) {
            this._group = document.createElementNS(Strings.SVG_NS, 'g');
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
            this.svg.setAttribute(Strings.VIEW_BOX, box.x + ' ' + box.y + ' ' + box.width + ' ' + box.height);
            return;
        }
        this.svg.removeAttribute(Strings.VIEW_BOX);
    }

    public get viewBox(): IRectangle | null {
        return this._viewBox;
    }
}
