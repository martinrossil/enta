import IInteractive from '../interfaces/fsm/IInteractive';
import IState from '../interfaces/fsm/IState';
import Machine from './Machine';
import State from './State';

export default class TouchMachine extends Machine<IInteractive> {
    public constructor(host: IInteractive) {
        super(host);
        this.initial.addTransition('mouseover', this.hover);
        this.initial.addTransition('touchstart', this.pressed);
        this.initial.entry = this.initialEntry.bind(this);
        this.initial.on = this.host.initial.bind(this.host);
        this.host.addEventListener('mouseover', this.send);
        this.host.addEventListener('mousedown', this.send);
        this.host.addEventListener('mouseup', this.send);
        this.host.addEventListener('mouseleave', this.send);
        this.host.addEventListener('touchstart', this.send);
        this.host.addEventListener('touchend', this.send);
        this.host.addEventListener('click', this.host.triggered);
    }

    private initialEntry(e: Event): void {
        if (!window.TouchEvent) {
            return;
        }
        if (e instanceof TouchEvent) {
            e.preventDefault();
            if (e.changedTouches && e.changedTouches.length > 0) {
                const touch: Touch = e.changedTouches[0];
                const px = touch.pageX;
                const py = touch.pageY;
                const rect = this.host.getBoundingClientRect();
                if (px > rect.x && px < rect.x + rect.width) {
                    if (py > rect.y && py < rect.y + rect.height) {
                        this.host.triggered();
                    }
                }
            }
        }
    }

    private _hover!: IState;

    private get hover(): IState {
        if (!this._hover) {
            this._hover = new State('hover');
            this._hover.addTransition('mouseleave', this.initial);
            this._hover.addTransition('mousedown', this.pressed);
            this._hover.on = this.host.hover.bind(this.host);
        }
        return this._hover
    }

    private _pressed!: IState;

    private get pressed(): IState {
        if (!this._pressed) {
            this._pressed = new State('pressed');
            this._pressed.addTransition('mouseleave', this.initial);
            this._pressed.addTransition('mouseup', this.hover);
            this._pressed.addTransition('touchend', this.initial);
            this._pressed.on = this.onPressed.bind(this);
        }
        return this._pressed;
    }

    private onPressed(e: Event) {
        this.host.pressed(this.getTouchPoint(e));
    }

    private getTouchPoint(e: Event): [number, number] {
        if (!window.TouchEvent) {
            return [0, 0];
        }
        if (e instanceof TouchEvent) {
            if (e.changedTouches && e.changedTouches.length > 0) {
                const touch: Touch = e.changedTouches[0];
                const rect: DOMRect = this.host.getBoundingClientRect();
                return [touch.pageX - rect.x, touch.pageY - rect.y];
            }
        }
        if (e instanceof MouseEvent) {
            return [e.offsetX, e.offsetY];
        }
        return [0, 0];
    }
}
