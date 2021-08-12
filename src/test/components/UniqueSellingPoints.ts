import DisplayContainer from '../../core/DisplayContainer';
import Colors from '../design/Colors';

export default class UniqueSellingPoints extends DisplayContainer {
    public constructor() {
        super();
        this.name = 'UniqueSellingPoints';
        this.percentWidth = 100;
        this.height = 680;
        this.backgroundColor = Colors.WHITE;
    }
}
customElements.define('unique-selling-points', UniqueSellingPoints);
