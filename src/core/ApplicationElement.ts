import DisplayContainer from './DisplayContainer';

export default class ApplicationElement extends DisplayContainer {
    public constructor() {
        super();
        this.name = 'ApplicationElement';
        this.clip = 'hidden';
        window.addEventListener('resize', this.resize.bind(this));
        this.injectGlobalStyles();
        this.resize();
    }

    private injectGlobalStyles(): void {
        document.body.style.setProperty('overflow', 'hidden');
        document.body.style.setProperty('height', '100vh');
        let innerHTMLString = '*{';
        innerHTMLString += '-webkit-overflow-scrolling: touch;';
        innerHTMLString += '-webkit-tap-highlight-color: transparent;';
        innerHTMLString += '-webkit-font-smoothing: antialiased;';
        innerHTMLString += '-moz-osx-font-smoothing: grayscale;';
        innerHTMLString += 'margin: 0;';
        innerHTMLString += 'position: absolute; box-sizing:border-box;';
        innerHTMLString += 'border:none; outline:none;';
        innerHTMLString += '}';
        const style: HTMLStyleElement = document.createElement('style');
        style.innerHTML = innerHTMLString;
        document.head.appendChild(style);
    }

    private resize(): void {
        const w = Math.max(window.innerWidth, document.documentElement.clientWidth);
        const h = Math.max(window.innerHeight, document.documentElement.clientHeight);
        this.size(w, h);
    }
}
