import DisplayElement from '../core/DisplayElement';
import Color from '../shared/Color';
import IInteractive from '../interfaces/fsm/IInteractive';
import InteractiveMachine from '../fsm/InteractiveMachine';

export default class PurpleBox extends DisplayElement implements IInteractive {
    public static TAG = 'purple-box';
    public constructor() {
        super();
        this.name = PurpleBox.TAG;
        this.size(200, 200);
        this.cursor = 'pointer';
        this.backgroundColor = new Color(300, 100, 50);
        this.centerOffset = 0;
        this.middleOffset = 0;
    }

    private machine: InteractiveMachine = new InteractiveMachine(this);

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
}
customElements.define(PurpleBox.TAG, PurpleBox);
