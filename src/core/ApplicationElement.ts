import DisplayContainer from './DisplayContainer';

export default class ApplicationElement extends DisplayContainer {
    public constructor() {
        super();
        this.name = 'ApplicationElement';
        this.style.overflow = 'hidden';
        document.body.style.setProperty('overflow', 'hidden');
        document.body.style.setProperty('height', '100vh');
        document.body.style.setProperty('position', 'absolute');
        document.body.style.setProperty('-webkit-overflow-scrolling', 'touch');
        document.body.style.setProperty('-webkit-tap-highlight-color', 'transparent');
        document.body.style.setProperty('-moz-tap-highlight-color', 'transparent');
        document.body.style.setProperty('margin', '0');
        window.addEventListener('resize', this.resize.bind(this));
        this.resize();
    }

    private resize(): void {
        const w = Math.max(window.innerWidth, document.documentElement.clientWidth);
        const h = Math.max(window.innerHeight, document.documentElement.clientHeight);
        this.size(w, h);
    }
}
customElements.define('application-element', ApplicationElement);
