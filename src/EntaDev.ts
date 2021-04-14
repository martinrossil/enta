import { Icons } from './components/Icons';
import ApplicationElement from './core/ApplicationElement';
import DisplayElement from './core/DisplayElement';
import ScrollContainer from './core/ScrollContainer';
import BottomBar from './fjedre/BottomBar';
import TopBar from './fjedre/TopBar';
import IDisplayElement from './interfaces/core/IDisplayElement';
import ILayoutElement from './interfaces/core/ILayoutElement';
import IScrollContainer from './interfaces/core/IScrollContainer';
import IVerticalLayout from './interfaces/layout/IVerticalLayout';
import IPathElement from './interfaces/svg/IPathElement';
import AnchorLayout from './layout/AnchorLayout';
import AnchorLayoutData from './layout/AnchorLayoutData';
import VerticalLayout from './layout/VerticalLayout';
import PathElement from './svg/PathElement';
import Color from './vo/Color';
import Rectangle from './vo/Rectangle';

export default class EntaDev extends ApplicationElement {
    public constructor() {
        super();
        this.name = 'EntaDev';
        this.backgroundColor = new Color(210, 40, 96); // blue gray 100
        this.layout = new AnchorLayout();
        window.addEventListener('load', () => {
            console.log('page loaded');
            this.addElement(new TopBar());
            /*
            this.addElement(new BottomBar());
            this.addElement(this.pathElement);
            this.addElement(this.box); */
            // this.addElement(this.scrollContainer);
        });
        window.addEventListener('click', () => {
            // this.removeElements();
        });
    }

    private _scrollContainer!: IScrollContainer;

    private get scrollContainer(): IScrollContainer {
        if (!this._scrollContainer) {
            this._scrollContainer = new ScrollContainer();
            this._scrollContainer.padding = 16;
            this._scrollContainer.backgroundColor = new Color(0, 80, 75);
            this._scrollContainer.layoutData = new AnchorLayoutData(0, NaN, 0);
            this._scrollContainer.width = 300;
            const v: IVerticalLayout = new VerticalLayout(16);
            const elements:Array<ILayoutElement> = [];
            for (let i = 0; i < 10; i++) {
                const d: IDisplayElement = new DisplayElement();
                d.backgroundColor = new Color(0, 0, 100);
                d.size(250, 40);
                elements.push(d);
            }
            this._scrollContainer.addElements(elements);
            this._scrollContainer.layout = v;
        }
        return this._scrollContainer;
    }
}
customElements.define('enta-dev', EntaDev);
