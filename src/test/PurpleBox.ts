import DisplayElement from '../core/DisplayElement';
import Color from '../shared/Color';
import IMouseTouch from '../interfaces/fsm/IMouseTouch';
import MouseTouchMachine from '../fsm/MouseTouchMachine';

export default class PurpleBox extends DisplayElement implements IMouseTouch {
    public static get observedAttributes(): Array<string> {
        return [...DisplayElement.observedAttributes, 'a'];
    }

    public constructor() {
        super();
        this.name = 'PurpleBox';
        this.size(200, 200);
        this.cursor = 'pointer';
        this.backgroundColor = new Color(300, 100, 50);
    }

    private machine: MouseTouchMachine = new MouseTouchMachine(this);

    public initial(): void {
        console.log('initial()');
        this.backgroundColor = new Color(300, 100, 50);
    }

    public hover(): void {
        console.log('hover()');
        this.backgroundColor = new Color(180, 100, 50);
    }

    public pressed(x: number, y: number): void {
        console.log('pressed()', x, y);
        this.backgroundColor = new Color(230, 100, 50);
    }

    public clicked(): void {
        console.log('clicked()');
    }

    public attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void {
        console.log(name, oldValue, newValue);
    }
}
customElements.define('purple-box', PurpleBox);
