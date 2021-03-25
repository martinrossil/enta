import DisplayContainer from './DisplayContainer';

export default class ApplicationElement extends DisplayContainer {
    public constructor() {
        super();
        this.name = 'ApplicationElement';
        this.style.overflow = 'hidden';
        document.body.style.setProperty('position', 'absolute');
        document.body.style.setProperty('-webkit-overflow-scrolling', 'touch');
        document.body.style.setProperty('-webkit-tap-highlight-color', 'transparent');
        document.body.style.setProperty('-moz-tap-highlight-color', 'transparent');
        document.body.style.setProperty('margin', '0');
        window.addEventListener('resize', this.resize.bind(this));
        this.resize();
    }

    private resize(): void {
        this.size(window.innerWidth, window.innerHeight);
    }
}
customElements.define('application-element', ApplicationElement);
