import IMachine from '../interfaces/fsm/IMachine';
import IState from '../interfaces/fsm/IState';
import State from './State';

export default class Machine<Host> implements IMachine {
    protected host: Host;
    public currentState: IState;
    protected readonly initial: IState = new State('initial');
    public constructor(host: Host) {
        this.host = host;
        this.currentState = this.initial;
        this.send = this.send.bind(this);
    }

    public send(e: Event): void {
        this.changeState(this.currentState.getState(e.type), e);
    }

    private changeState(state: IState, e: Event) {
        if (this.currentState !== state) {
            if (this.currentState.exit) {
                this.currentState.exit.call(this, e);
            }
            this.currentState = state;
            if (this.currentState.entry) {
                this.currentState.entry.call(this, e);
            }
            if (this.currentState.on) {
                this.currentState.on.call(this, e);
            }
            if (this.currentState.next) {
                this.changeState(this.currentState.next, e);
            }
        }
    }
}
