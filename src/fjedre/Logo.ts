import { Icons } from '../components/Icons';
import PathElement from '../svg/PathElement';
import Color from '../vo/Color';
import Rectangle from '../vo/Rectangle';

export default class Logo extends PathElement {
    public constructor() {
        super();
        this.name = 'Logo';
        this.viewBox = new Rectangle(-1, -1, 26, 26);
        this.size(56, 56);
        this.pathData = Icons.LOGO;
        this.fillColor = new Color(173, 80, 40); // Teal 500
    }
}
customElements.define('logo-element', Logo);
