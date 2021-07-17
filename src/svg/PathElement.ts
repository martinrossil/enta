import { StrokeLineCap } from '../types/StrokeLineCap';
import { StrokeLineJoin } from '../types/StrokeLineJoin';
import IEventListener from '../interfaces/event/IEventListener';
import IPathElement from '../interfaces/svg/IPathElement';
import IColor from '../interfaces/vo/IColor';
import ILinearGradient from '../interfaces/vo/ILinearGradient';
import Color from '../vo/Color';
import LinearGradient from '../vo/LinearGradient';
import SvgElement from './SvgElement';
import Strings from '../consts/Strings';

export default class PathElement extends SvgElement implements IPathElement {
    public constructor() {
        super();
        this.name = 'PathElement';
        this.strokeColorChanged = this.strokeColorChanged.bind(this);
        this.fillColorChanged = this.fillColorChanged.bind(this);
        this.strokeLinearGradientColorAdded = this.strokeLinearGradientColorAdded.bind(this);
        this.strokeLinearGradientColorsAdded = this.strokeLinearGradientColorsAdded.bind(this);
        this.strokeLinearGradientColorChanged = this.strokeLinearGradientColorChanged.bind(this);
        this.strokeLinearGradientDegreesChanged = this.strokeLinearGradientDegreesChanged.bind(this);
        this.fillLinearGradientColorAdded = this.fillLinearGradientColorAdded.bind(this);
        this.fillLinearGradientColorsAdded = this.fillLinearGradientColorsAdded.bind(this);
        this.fillLinearGradientColorChanged = this.fillLinearGradientColorChanged.bind(this);
        this.fillLinearGradientDegreesChanged = this.fillLinearGradientDegreesChanged.bind(this);
        this.group.appendChild(this.path);
    }

    protected validate(): void {
        super.validate();
        if (this.fillColor instanceof LinearGradient) {
            this.updateLinearGradientRotation(this.fillLinearGradient, this.fillColor.degrees);
        }
        if (this.strokeColor instanceof LinearGradient) {
            this.updateLinearGradientRotation(this.strokeLinearGradient, this.strokeColor.degrees);
        }
    }

    private _pathData = '';

    public set pathData(value: string) {
        if (this._pathData === value) {
            return;
        }
        this._pathData = value;
        this.path.setAttribute(Strings.D, value);
    }

    public get pathData(): string {
        return this._pathData;
    }

    private _path!: SVGPathElement;

    protected get path(): SVGPathElement {
        if (!this._path) {
            this._path = document.createElementNS(Strings.SVG_NS, 'path');
        }
        return this._path;
    }

    private strokeLinearGradientId = Math.random().toString();

    private _strokeLinearGradient!: SVGLinearGradientElement

    private get strokeLinearGradient(): SVGLinearGradientElement {
        if (!this._strokeLinearGradient) {
            this._strokeLinearGradient = this.getLinearGradient(this.strokeLinearGradientId);
        }
        return this._strokeLinearGradient;
    }

    private fillLinearGradientId = Math.random().toString();

    private _fillLinearGradient!: SVGLinearGradientElement

    private get fillLinearGradient(): SVGLinearGradientElement {
        if (!this._fillLinearGradient) {
            this._fillLinearGradient = this.getLinearGradient(this.fillLinearGradientId);
        }
        return this._fillLinearGradient;
    }

    private getLinearGradient(id: string): SVGLinearGradientElement {
        const linearGradient: SVGLinearGradientElement = document.createElementNS(Strings.SVG_NS, 'linearGradient');
        linearGradient.setAttribute(Strings.ID, id);
        linearGradient.setAttribute(Strings.GRADIENT_UNITS, Strings.USER_SPACE_ON_USE);
        return linearGradient;
    }

    private resetLinearGradient(linearGradient: SVGLinearGradientElement): void {
        while (linearGradient.firstChild) {
            linearGradient.removeChild(linearGradient.firstChild);
        }
        linearGradient.removeAttribute(Strings.GRADIENT_TRANSFORM);
    }

    private strokeColorChanged(e: CustomEvent<IColor>): void {
        this.path.setAttribute(Strings.STROKE, e.detail.toString());
    }

    private fillColorChanged(e: CustomEvent<IColor>): void {
        this.path.setAttribute(Strings.FILL, e.detail.toString());
    }

    private strokeLinearGradientColorChanged(e: CustomEvent<Color>): void {
        const color: Color = e.detail;
        const stops: Array<SVGStopElement> | undefined = this.strokeColorStopMapping.get(color);
        if (stops) {
            for (const stop of stops) {
                stop.setAttribute(Strings.STOP_COLOR, color.toString());
            }
        }
    }

    private fillLinearGradientColorChanged(e: CustomEvent<Color>): void {
        const color: Color = e.detail;
        const stops: Array<SVGStopElement> | undefined = this.fillColorStopMapping.get(color);
        if (stops) {
            for (const stop of stops) {
                stop.setAttribute(Strings.STOP_COLOR, color.toString());
            }
        }
    }

    private fillLinearGradientColorAdded(e: CustomEvent<Color>): void {
        this.addStopColorToFillLinearGradient(e.detail);
        this.updateLinearGradientStopOffsets(this.fillLinearGradient);
    }

    private strokeLinearGradientColorAdded(e: CustomEvent<Color>): void {
        this.addStopColorToStrokeLinearGradient(e.detail);
        this.updateLinearGradientStopOffsets(this.strokeLinearGradient);
    }

    private fillLinearGradientColorsAdded(e: CustomEvent<Array<Color>>): void {
        this.addStopColorsToFillLinearGradient(e.detail);
        this.updateLinearGradientStopOffsets(this.fillLinearGradient);
    }

    private strokeLinearGradientColorsAdded(e: CustomEvent<Array<Color>>): void {
        this.addStopColorsToStrokeLinearGradient(e.detail);
        this.updateLinearGradientStopOffsets(this.strokeLinearGradient);
    }

    private fillLinearGradientDegreesChanged(e: CustomEvent<number>): void {
        this.updateLinearGradientRotation(this.fillLinearGradient, e.detail)
    }

    private strokeLinearGradientDegreesChanged(e: CustomEvent<number>): void {
        this.updateLinearGradientRotation(this.strokeLinearGradient, e.detail)
    }

    private _strokeColor: IColor | ILinearGradient | null = null;

    public set strokeColor(value: IColor | ILinearGradient | null) {
        if (this._strokeColor === value) {
            return;
        }
        if (this._strokeColor instanceof Color) {
            this._strokeColor.removeEventListener(Strings.INVALIDATE, this.strokeColorChanged as IEventListener);
        } else if (this._strokeColor instanceof LinearGradient) {
            this.defs.removeChild(this.strokeLinearGradient);
            this.resetLinearGradient(this.strokeLinearGradient);
            this.strokeColorStopMapping.clear();
            this.removeStrokeLinearGradientListeners(this._strokeColor);
        }
        this._strokeColor = value;
        if (this._strokeColor instanceof Color) {
            this._strokeColor.addEventListener(Strings.INVALIDATE, this.strokeColorChanged as IEventListener);
            this.path.setAttribute(Strings.STROKE, this._strokeColor.toString());
            return;
        }
        if (this._strokeColor instanceof LinearGradient) {
            this.updateLinearGradientRotation(this.strokeLinearGradient, this._strokeColor.degrees);
            if (this._strokeColor.colors.length) {
                this.addStopColorsToStrokeLinearGradient(this._strokeColor.colors);
                this.updateLinearGradientStopOffsets(this.strokeLinearGradient);
            }
            this.defs.appendChild(this.strokeLinearGradient);
            this.addStrokeLinearGradientListeners(this._strokeColor);
            this.path.setAttribute(Strings.STROKE, Strings.URL + "('#" + this.strokeLinearGradientId + "')");
            return;
        }
        this.path.removeAttribute(Strings.STROKE);
    }

    public get strokeColor(): IColor | ILinearGradient | null {
        return this._strokeColor;
    }

    private _fillColor: IColor | ILinearGradient | null = null;

    public set fillColor(value: IColor | ILinearGradient | null) {
        if (this._fillColor === value) {
            return;
        }
        if (this._fillColor instanceof Color) {
            this._fillColor.removeEventListener(Strings.INVALIDATE, this.fillColorChanged as IEventListener);
        } else if (this._fillColor instanceof LinearGradient) {
            this.defs.removeChild(this.fillLinearGradient);
            this.resetLinearGradient(this.fillLinearGradient);
            this.fillColorStopMapping.clear();
            this.removeFillLinearGradientListeners(this._fillColor);
        }
        this._fillColor = value;
        if (this._fillColor instanceof Color) {
            this._fillColor.addEventListener(Strings.INVALIDATE, this.fillColorChanged as IEventListener);
            this.path.setAttribute(Strings.FILL, this._fillColor.toString());
            return;
        }
        if (this._fillColor instanceof LinearGradient) {
            this.updateLinearGradientRotation(this.fillLinearGradient, this._fillColor.degrees);
            if (this._fillColor.colors.length) {
                this.addStopColorsToFillLinearGradient(this._fillColor.colors);
                this.updateLinearGradientStopOffsets(this.fillLinearGradient);
            }
            this.defs.appendChild(this.fillLinearGradient);
            this.addFillLinearGradientListeners(this._fillColor);
            this.path.setAttribute(Strings.FILL, Strings.URL + "('#" + this.fillLinearGradientId + "')");
            return;
        }
        this.path.removeAttribute(Strings.FILL);
    }

    public get fillColor(): IColor | ILinearGradient | null {
        return this._fillColor;
    }

    private removeStrokeLinearGradientListeners(linearGradient: LinearGradient): void {
        linearGradient.removeEventListener(Strings.COLOR_ADDED, this.strokeLinearGradientColorAdded as IEventListener);
        linearGradient.removeEventListener(Strings.COLORS_ADDED, this.strokeLinearGradientColorsAdded as IEventListener);
        linearGradient.removeEventListener(Strings.COLOR_CHANGED, this.strokeLinearGradientColorChanged as IEventListener);
        linearGradient.removeEventListener(Strings.DEGREES_CHANGED, this.strokeLinearGradientDegreesChanged as IEventListener);
    }

    private addStrokeLinearGradientListeners(linearGradient: LinearGradient): void {
        linearGradient.addEventListener(Strings.COLOR_ADDED, this.strokeLinearGradientColorAdded as IEventListener);
        linearGradient.addEventListener(Strings.COLORS_ADDED, this.strokeLinearGradientColorsAdded as IEventListener);
        linearGradient.addEventListener(Strings.COLOR_CHANGED, this.strokeLinearGradientColorChanged as IEventListener);
        linearGradient.addEventListener(Strings.DEGREES_CHANGED, this.strokeLinearGradientDegreesChanged as IEventListener);
    }

    private removeFillLinearGradientListeners(linearGradient: LinearGradient): void {
        linearGradient.removeEventListener(Strings.COLOR_ADDED, this.fillLinearGradientColorAdded as IEventListener);
        linearGradient.removeEventListener(Strings.COLORS_ADDED, this.fillLinearGradientColorsAdded as IEventListener);
        linearGradient.removeEventListener(Strings.COLOR_CHANGED, this.fillLinearGradientColorChanged as IEventListener);
        linearGradient.removeEventListener(Strings.DEGREES_CHANGED, this.fillLinearGradientDegreesChanged as IEventListener);
    }

    private addFillLinearGradientListeners(linearGradient: LinearGradient): void {
        linearGradient.addEventListener(Strings.COLOR_ADDED, this.fillLinearGradientColorAdded as IEventListener);
        linearGradient.addEventListener(Strings.COLORS_ADDED, this.fillLinearGradientColorsAdded as IEventListener);
        linearGradient.addEventListener(Strings.COLOR_CHANGED, this.fillLinearGradientColorChanged as IEventListener);
        linearGradient.addEventListener(Strings.DEGREES_CHANGED, this.fillLinearGradientDegreesChanged as IEventListener);
    }

    private updateLinearGradientRotation(linearGradientElement: SVGLinearGradientElement, degrees: number): void {
        let transform = Strings.ROTATE + '(' + degrees + ' ';
        if (this.viewBox) {
            transform += this.viewBox.width * 0.5 + ' ' + this.viewBox.height * 0.5 + ')';
        } else {
            transform += this.actualWidth * 0.5 + ' ' + this.actualHeight * 0.5 + ')';
        }
        linearGradientElement.setAttribute(Strings.GRADIENT_TRANSFORM, transform);
    }

    private addStopColorsToStrokeLinearGradient(colors: Array<IColor>): void {
        for (const color of colors) {
            this.addStopColorToStrokeLinearGradient(color);
        }
    }

    private addStopColorToStrokeLinearGradient(color: IColor): void {
        const stop: SVGStopElement = this.getStopFromColor(color);
        let stops: Array<SVGStopElement> | undefined = this.strokeColorStopMapping.get(color);
        if (!stops) {
            stops = [];
        }
        stops.push(stop);
        this.strokeColorStopMapping.set(color, stops);
        this.strokeLinearGradient.appendChild(stop);
    }

    private addStopColorsToFillLinearGradient(colors: Array<IColor>): void {
        for (const color of colors) {
            this.addStopColorToFillLinearGradient(color);
        }
    }

    private addStopColorToFillLinearGradient(color: IColor): void {
        const stop: SVGStopElement = this.getStopFromColor(color);
        let stops: Array<SVGStopElement> | undefined = this.fillColorStopMapping.get(color);
        if (!stops) {
            stops = [];
        }
        stops.push(stop);
        this.fillColorStopMapping.set(color, stops);
        this.fillLinearGradient.appendChild(stop);
    }

    private getStopFromColor(color: IColor): SVGStopElement {
        const stop: SVGStopElement = document.createElementNS(Strings.SVG_NS, 'stop');
        stop.setAttribute(Strings.STOP_COLOR, color.toString());
        return stop;
    }

    private updateLinearGradientStopOffsets(linearGradientElement: SVGLinearGradientElement): void {
        if (linearGradientElement.childNodes.length) {
            let offset = 0.0;
            const offsetStep = 1 / (linearGradientElement.childNodes.length - 1);
            for (const child of linearGradientElement.childNodes) {
                const stop: SVGStopElement = child as SVGStopElement;
                stop.setAttribute(Strings.OFFSET, offset.toString());
                offset = offset + offsetStep;
            }
        }
    }

    private strokeColorStopMapping: Map<IColor, Array<SVGStopElement>> = new Map();

    private fillColorStopMapping: Map<IColor, Array<SVGStopElement>> = new Map();

    private _strokeWidth = 0;

    public set strokeWidth(value: number) {
        if (this._strokeWidth === value) {
            return;
        }
        if (isNaN(value) || value < 0) {
            if (this._strokeWidth !== 0) {
                this._strokeWidth = 0;
                this.path.removeAttribute(Strings.STROKE_WIDTH);
            }
            return;
        }
        this._strokeWidth = value;
        this.path.setAttribute(Strings.STROKE_WIDTH, this._strokeWidth.toString());
    }

    public get strokeWidth(): number {
        return this._strokeWidth;
    }

    private _strokeLineCap: StrokeLineCap = '';

    public set strokeLineCap(value: StrokeLineCap) {
        if (this._strokeLineCap === value) {
            return;
        }
        this._strokeLineCap = value;
        this.path.setAttribute(Strings.STROKE_LINECAP, this._strokeLineCap);
    }

    public get strokeLineCap(): StrokeLineCap {
        return this._strokeLineCap;
    }

    private _strokeLineJoin: StrokeLineJoin = '';

    public set strokeLineJoin(value: StrokeLineJoin) {
        if (this._strokeLineJoin === value) {
            return;
        }
        this._strokeLineJoin = value;
        this.path.setAttribute(Strings.STROKE_LINEJOIN, this._strokeLineJoin);
    }

    public get strokeLineJoin(): StrokeLineJoin {
        return this._strokeLineJoin;
    }
}
customElements.define('path-element', PathElement);
