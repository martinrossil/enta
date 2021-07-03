import Strings from '../consts/Strings';
import EventDispatcher from '../event/EventDispatcher';
import IColor from '../interfaces/vo/IColor';

export default class Color extends EventDispatcher implements IColor {
    public constructor(hue = 0, saturation = 0, lightness = 0, opacity = 1.0) {
        super();
        this.name = 'Color';
        if (this._hue !== hue) {
            if (isNaN(hue) || hue < 0 || hue >= 360) {
                this._hue = 0;
            } else {
                this._hue = hue;
            }
        }
        if (this._saturation !== saturation) {
            if (isNaN(saturation) || saturation < 0) {
                this._saturation = 0;
            } else if (saturation > 100) {
                this._saturation = 100;
            } else {
                this._saturation = saturation;
            }
        }
        if (this._lightness !== lightness) {
            if (isNaN(lightness) || lightness < 0) {
                this._lightness = 0;
            } else if (lightness > 100) {
                this._lightness = 100;
            } else {
                this._lightness = lightness;
            }
        }
        if (this._opacity !== opacity) {
            if (isNaN(opacity) || opacity > 1.0) {
                this._opacity = 1.0;
            } else if (opacity < 0) {
                this._opacity = 0;
            } else {
                this._opacity = opacity;
            }
        }
    }

    private _hue = 0;

    public set hue(value: number) {
        if (this._hue === value) {
            return;
        }
        if (isNaN(value) || value < 0 || value >= 360) {
            if (this._hue !== 0) {
                this._hue = 0;
                this.notify();
            }
            return;
        }
        this._hue = value;
        this.notify();
    }

    public get hue(): number {
        return this._hue;
    }

    private _saturation = 0;

    public set saturation(value: number) {
        if (this._saturation === value) {
            return;
        }
        if (isNaN(value) || value < 0) {
            if (this._saturation !== 0) {
                this._saturation = 0;
                this.notify();
            }
            return;
        }
        if (value > 100) {
            if (this._saturation !== 100) {
                this._saturation = 100;
                this.notify();
                return;
            }
        }
        this._saturation = value;
        this.notify();
    }

    public get saturation(): number {
        return this._saturation;
    }

    private _lightness = 0;

    public set lightness(value: number) {
        if (this._lightness === value) {
            return;
        }
        if (isNaN(value) || value < 0) {
            if (this._lightness !== 0) {
                this._lightness = 0;
                this.notify();
            }
            return;
        }
        if (value > 100) {
            if (this._lightness !== 100) {
                this._lightness = 100;
                this.notify();
            }
            return;
        }
        this._lightness = value;
        this.notify();
    }

    public get lightness(): number {
        return this._lightness;
    }

    private _opacity = 1.0;

    public set opacity(value: number) {
        if (this._opacity === value) {
            return;
        }
        if (isNaN(value) || value > 1.0) {
            if (this._opacity !== 1.0) {
                this._opacity = 1.0;
                this.notify();
            }
            return;
        }
        if (value < 0) {
            if (this._opacity !== 0.0) {
                this._opacity = 0.0;
                this.notify();
            }
            return;
        }
        this._opacity = value;
        this.notify();
    }

    public get opacity(): number {
        return this._opacity;
    }

    public toString(): string {
        return 'hsla(' + this.hue + ', ' + this.saturation + '%, ' + this.lightness + '%, ' + this.opacity + ')';
    }

    private notify(): void {
        this.dispatch(Strings.INVALIDATE, this);
    }
}
