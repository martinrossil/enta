import DisplayContainer from '../../core/DisplayContainer';
import Colors from '../design/Colors';

export default class SignupForm extends DisplayContainer {
    public constructor() {
        super();
        this.name = 'SignupForm';
        this.percentWidth = 100;
        this.height = 680;
        this.backgroundColor = Colors.WHITE;
    }
}
customElements.define('signup-form', SignupForm);
