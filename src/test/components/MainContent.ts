import DisplayContainer from '../../core/DisplayContainer';
import VerticalLayout from '../../layout/VerticalLayout';
import SignupFormUSPContainer from './SignupFormUSPContainer';

export default class MainContent extends DisplayContainer {
    public constructor() {
        super();
        this.name = 'MainContent';
        this.percentWidth = 100;
        this.paddingTop = 300;
        this.layout = new VerticalLayout();
        this.addElements([new SignupFormUSPContainer()]);
    }
}
customElements.define('main-content', MainContent);
