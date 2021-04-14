import DisplayContainer from '../core/DisplayContainer';
import Color from '../vo/Color';

export default class LanguageSelector extends DisplayContainer {
    public constructor() {
        super();
        this.name = 'LanguageSelector';
        this.size(100, 40);
        this.backgroundColor = new Color(215, 16, 47); // blue gray 500
    }
}
customElements.define('language-selector', LanguageSelector);
