import { CornerShape } from '../shared/Types';
import ISurfaceElement from '../interfaces/svg/ISurfaceElement';
import PathElement from './PathElement';

export default class SurfaceElement extends PathElement implements ISurfaceElement {
    public constructor() {
        super();
        this.name = 'SurfaceElement';
        this.group.appendChild(this.path);
    }

    protected validate(): void {
        super.validate();
        this.updatePathData();
    }

    protected updatePathData(): void {
        if (this.cornerShape === 'round') {
            this.path.setAttribute('d', this.getRoundData());
            return;
        }
        this.path.setAttribute('d', this.getCutData());
    }

    private _cornerSize = 0;

    public set cornerSize(value: number) {
        if (this._cornerSize === value) {
            return;
        }
        if (isNaN(value) || value < 0) {
            this._cornerSize = 0;
            this.invalidate();
            return;
        }
        this._cornerSize = value;
        this.invalidate();
    }

    public get cornerSize(): number {
        return this._cornerSize;
    }

    private _cornerShape: CornerShape = 'round';

    public set cornerShape(value: CornerShape) {
        if (this._cornerShape === value) {
            return;
        }
        this._cornerShape = value;
        this.invalidate();
    }

    public get cornerShape(): CornerShape {
        return this._cornerShape;
    }

    private getCutData(): string {
        const tlc = this.cornerSize;
        const trc = tlc;
        const brc = tlc;
        const blc = tlc;
        const w = this.actualWidth;
        const h = this.actualHeight;
        let d = '';
        d += 'M ' + tlc + ' 0 ';
        d += 'L ' + (w - trc) + ' 0 ';
        d += 'L ' + w + ' ' + trc;
        d += 'L ' + w + ' ' + (h - brc);
        d += 'L ' + (w - brc) + ' ' + h;
        d += 'L ' + blc + ' ' + h;
        d += 'L 0 ' + (h - blc);
        d += 'L 0 ' + tlc;

        d += 'Z';
        return d;
    }

    private getRoundData(): string {
        const tlc = this.cornerSize;
        const trc = tlc;
        const brc = tlc;
        const blc = tlc;
        const w = this.actualWidth;
        const h = this.actualHeight;
        let d = '';
        // mov top left arc start
        d += 'M 0 ' + tlc + ' ';
        // tlc arc
        d += 'A ' + tlc + ' ' + tlc + ' 0 0 1 ' + tlc + ' 0 ';
        // line to topRightCorner
        d += 'L ' + (w - trc) + ' 0 ';
        // trc arc
        d += 'A ' + trc + ' ' + trc + ' 1 0 1 ' + w + ' ' + trc + ' ';
        // line to bottomRightCorner
        d += 'L ' + w + ' ' + (h - brc) + ' ';
        // brc arc
        d += 'A ' + brc + ' ' + brc + ' 1 0 1 ' + (w - brc) + ' ' + h + ' ';
        // line to bottomLeftCorner
        d += 'L ' + blc + ' ' + h + ' ';
        // blc arc
        d += 'A ' + blc + ' ' + blc + ' 0 0 1 ' + '0 ' + (h - blc) + ' ';
        // close path
        d += 'Z';
        return d;
    }
}
customElements.define('surface-element', SurfaceElement);
