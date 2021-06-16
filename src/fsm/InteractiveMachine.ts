import IInteractive from '../interfaces/fsm/IInteractive';
import IState from '../interfaces/fsm/IState';
import Machine from './Machine';
import State from './State';

export default class InteractiveMachine extends Machine<IInteractive> {
    public constructor(host: IInteractive) {
        super(host);
        this.initial.addTransition('mouseover', this.mouseOver);
        this.initial.addTransition('mousedown', this.pressed);
        // this.initial.addTransition('touchstart', this.touchStart);
        this.initial.on = this.host.initial.bind(this.host);
        // host.addEventListener('touchstart', this.send, { passive: true });
        host.addEventListener('mouseover', this.send);
        host.addEventListener('mouseover', this.send);
        host.addEventListener('mousedown', this.send);
        host.addEventListener('mouseup', this.send);
        host.addEventListener('mouseleave', this.send);
        // host.addEventListener('touchstart', this.send, { passive: true });
        host.addEventListener('click', this.send);
    }

    private _mouseOver!: IState;
    private get mouseOver(): IState {
        if (!this._mouseOver) {
            this._mouseOver = new State('MouseOver');
            this._mouseOver.addTransition('mouseleave', this.initial);
            this._mouseOver.addTransition('mousedown', this.pressed);
            this._mouseOver.addTransition('click', this.clicked)
            this._mouseOver.on = this.host.hover.bind(this.host);
        }
        return this._mouseOver;
    }

    private _pressed!: IState;
    private get pressed(): IState {
        if (!this._pressed) {
            this._pressed = new State('Pressed');
            this._pressed.addTransition('mouseleave', this.initial);
            this._pressed.addTransition('mouseup', this.mouseOver);
            this._pressed.on = this.onPressed.bind(this);
        }
        return this._pressed;
    }

    private onPressed(e: Event) {
        this.host.pressed(this.getTouchPoint(e));
    }

    private _clicked!: IState;
    private get clicked(): IState {
        if (!this._clicked) {
            this._clicked = new State('Clicked');
            // this._clicked.on = this.host.clicked.bind(this.host);
            this._clicked.next = this.mouseOver;
        }
        return this._clicked;
    }

    /* private _touchStart!: IState;
    private get touchStart(): IState {
        if (!this._touchStart) {
            this._touchStart = new State('TouchStart');
            this._touchStart.addTransition('touchend', this.initial);
            this._touchStart.entry = this.entryTouchStart.bind(this);
            this._touchStart.on = this.onPressed.bind(this);
        }
        return this._touchStart;
    }

    private entryTouchStart(): void {
        console.log('entryTouchStart()');
        window.addEventListener('touchend', this.send, { passive: true, once: true });
    } */

    private getTouchPoint(e: Event): [number, number] {
        console.log(e);
        if (e instanceof MouseEvent) {
            return [e.offsetX, e.offsetY];
        }
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
        return [0, 0];
    }
}
