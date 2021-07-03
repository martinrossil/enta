import IInteractive from '../interfaces/fsm/IInteractive';
import IState from '../interfaces/fsm/IState';
import Machine from './Machine';
import State from './State';

export default class InteractiveMachine extends Machine<IInteractive> {
    public constructor(host: IInteractive) {
        super(host);
        host.addEventListener('mouseover', this.send);
        host.addEventListener('touchstart', this.send);
        this.initial.on = host.initial.bind(host);
        this.initial.addTransition('mouseover', this.mouseOver);
        /*
        this.initial.addTransition('mousedown', this.pressed);
        this.initial.addTransition('touchstart', this.touchStart);
        host.addEventListener('mouseover', this.send);
        host.addEventListener('mouseover', this.send);
        host.addEventListener('mouseup', this.send);
         */
    }

    private _mouseOver!: IState;
    private get mouseOver(): IState {
        if (!this._mouseOver) {
            this._mouseOver = new State('MouseOver');
            this._mouseOver.addTransition('mouseleave', this.initial);
            this._mouseOver.addTransition('mousedown', this.pressed);
            this._mouseOver.entry = this.mouseOverEntry.bind(this);
        }
        return this._mouseOver;
    }

    private mouseOverEntry(e: Event): void {
        this.host.removeEventListener('touchstart', this.send);
        this.host.addEventListener('mouseleave', this.send);
        this.host.addEventListener('mousedown', this.send);
        this.host.hover();
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
        const [x, y] = this.getTouchPoint(e);
        this.host.pressed(x, y);
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
