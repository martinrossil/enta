import { IEventListener, IState, Machine, State } from '..';
import EntaDev from '../EntaDev';

export default class TestMachine extends Machine<EntaDev> {
    public constructor(host: EntaDev) {
        super(host);
        this.initial.addTransition('test', this.testState);
        host.addEventListener('click', () => { this.send(new CustomEvent('test', { detail: 42 })) });
    }

    private _testState!: IState;
    private get testState(): IState {
        if (!this._testState) {
            this._testState = new State('TestState');
            this._testState.on = this.testFunction as unknown as IEventListener;
        }
        return this._testState;
    }

    private testFunction(e: CustomEvent<number>): void {
        console.log(e.type, e.detail);
    }
}
