import DisplayContainer from '../../core/DisplayContainer';
import HorizontalLayout from '../../layout/HorizontalLayout';
import Color from '../../shared/Color';
import SignupForm from './SignupForm';
import UniqueSellingPoints from './UniqueSellingPoints';

export default class SignupFormUSPContainer extends DisplayContainer {
    public constructor() {
        super();
        this.name = 'SignupFormUSPContainer';
        this.percentWidth = 100;
        this.backgroundColor = new Color(0, 0, 0, 0.5);
        this.layout = new HorizontalLayout(24);
        this.addElements([new SignupForm(), new UniqueSellingPoints()]);
    }
}
customElements.define('signup-form-usp-container', SignupFormUSPContainer);
