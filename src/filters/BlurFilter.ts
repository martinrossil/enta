import Strings from '../consts/Strings';
import EventDispatcher from '../event/EventDispatcher';
import IBlurFilter from '../interfaces/filters/IBlurFilter';

export default class BlurFilter extends EventDispatcher implements IBlurFilter {
    public constructor(blur: number) {
        super();
        this.name = 'BlurFilter';
        if (!isNaN(blur) && blur > 0) {
            this._blur = blur;
        }
    }

    private _blur = 0;

    public set blur(value: number) {
        if (this._blur === value) {
            return;
        }
        if (isNaN(value) || value < 0) {
            if (this._blur !== 0) {
                this._blur = 0;
                this.notify();
            }
            return;
        }
        this._blur = value;
        this.notify();
    }

    public get blur(): number {
        return this._blur;
    }

    public toString(): string {
        return 'blur(' + this.blur + 'px)';
    }

    private notify(): void {
        this.dispatch(Strings.INVALIDATE);
    }
}
