import Strings from '../consts/Strings';
import DisplayContainer from './DisplayContainer';

export default class ApplicationElement extends DisplayContainer {
    public constructor() {
        super();
        this.name = 'ApplicationElement';
        this.style.overflow = Strings.HIDDEN;
        document.body.style.setProperty(Strings.OVERFLOW, Strings.HIDDEN);
        document.body.style.setProperty(Strings.HEIGHT, Strings.HUNDRED_VH);
        document.body.style.setProperty(Strings.POSITION, Strings.ABSOLUTE);
        document.body.style.setProperty('-webkit-overflow-scrolling', Strings.TOUCH);
        document.body.style.setProperty('-webkit-tap-highlight-color', Strings.TRANSPARENT);
        document.body.style.setProperty('-moz-tap-highlight-color', Strings.TRANSPARENT);
        document.body.style.setProperty('-webkit-font-smoothing', Strings.ANTIALIASED);
        document.body.style.setProperty('-moz-osx-font-smoothing', Strings.GRAYSCALE);
        document.body.style.setProperty(Strings.MARGIN, Strings.ZERO);
        window.addEventListener(Strings.RESIZE, this.resize.bind(this));
        this.resize();
    }

    private resize(): void {
        const w = Math.max(window.innerWidth, document.documentElement.clientWidth);
        const h = Math.max(window.innerHeight, document.documentElement.clientHeight);
        this.size(w, h);
    }
}
