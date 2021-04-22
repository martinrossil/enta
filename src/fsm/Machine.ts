import IState from '../interfaces/fsm/IState';
import State from './State';

export default class Machine<Host> {
    protected host: Host;
    protected current: IState;
    protected readonly initial: IState = new State('initial');
    public constructor(host: Host) {
        this.host = host;
        this.current = this.initial;
        this.send = this.send.bind(this);
    }

    protected send(e: Event): void {
        this.changeState(this.current.getState(e.type), e);
    }

    private changeState(state: IState, e: Event) {
        if (this.current !== state) {
            if (this.current.exit) {
                this.current.exit.call(this.host, e);
            }
            // console.log(e.type, this.current.name, '-->', state.name);
            this.current = state;
            if (this.current.entry) {
                this.current.entry.call(this.host, e);
            }
            if (this.current.on) {
                this.current.on.call(this.host, e);
            }
            if (this.current.next) {
                this.changeState(this.current.next, e);
            }
        }
    }
}
