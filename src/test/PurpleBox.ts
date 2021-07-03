import DisplayElement from '../core/DisplayElement';
import Color from '../vo/Color';
import Cursor from '../consts/Cursor';
import IInteractive from '../interfaces/fsm/IInteractive';
import InteractiveMachine from '../fsm/InteractiveMachine';

export default class PurpleBox extends DisplayElement implements IInteractive {
    public static TAG = 'purple-box';
    public constructor() {
        super();
        this.name = PurpleBox.TAG;
        this.horizontalCenter = 0;
        this.verticalMiddle = 0;
        this.size(200, 200);
        this.cursor = Cursor.POINTER;
        this.backgroundColor = new Color(300, 100, 50, 0.5);
    }

    private machine: InteractiveMachine = new InteractiveMachine(this);

    public pressed(x: number, y: number): void {
        console.log('pressed()', x, y);
    }

    public initial(): void {
        console.log('initial()');
    }

    public hover(): void {
        console.log('hover()');
    }

    public triggered(): void {
        //
    }
}
customElements.define(PurpleBox.TAG, PurpleBox);
