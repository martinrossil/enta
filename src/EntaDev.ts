import { IArrayCollection } from '.';
import List from './components/List';
import ApplicationElement from './core/ApplicationElement';
import ScrollContainer from './core/ScrollContainer';
import ArrayCollection from './data/ArrayCollection';
import IList from './interfaces/components/IList';
import IScrollContainer from './interfaces/core/IScrollContainer';
import VerticalLayout from './layout/VerticalLayout';
import GreenBox from './test/GreenBox';
import ITest from './test/ITest';
import Test from './test/Test';
import TestView from './test/TestView';
import Color from './vo/Color';

export default class EntaDev extends ApplicationElement {
    public constructor() {
        super();
        this.name = 'EntaDev2';
        this.padding = 20;
        this.addElement(this.list);
        window.addEventListener('resize', () => {
            console.log(window.innerWidth, window.innerHeight,
                        screen.width, screen.height,
                        screen.availWidth, screen.availHeight);
        });
    }

    private _list!: IList<ITest>;

    private get list(): IList<ITest> {
        if (!this._list) {
            this._list = new List();
            this._list.backgroundColor = new Color(0, 100, 50, 0.2);
            this._list.percentWidth = 50;
            this._list.percentHeight = 50;
            this._list.layout = new VerticalLayout(16);
            this._list.ItemRendererClass = TestView;
            this._list.dataProvider = this.testItems;
        }
        return this._list;
    }

    private _testItems!: IArrayCollection<ITest>;

    private get testItems(): IArrayCollection<ITest> {
        if (!this._testItems) {
            const tests: Array<ITest> = [];
            for (let i = 1; i < 10; i++) {
                tests.push(new Test(Math.random().toString()));
            }
            this._testItems = new ArrayCollection(tests);
        }
        return this._testItems;
    }

    private _scrollContainer!: IScrollContainer;

    private get scrollContainer(): IScrollContainer {
        if (!this._scrollContainer) {
            this._scrollContainer = new ScrollContainer();
            this._scrollContainer.layout = new VerticalLayout(16);
            this._scrollContainer.percentWidth = 100;
            this._scrollContainer.height = 500;
            this._scrollContainer.backgroundColor = new Color(0, 100, 50, 0.2);
            const boxes: Array<GreenBox> = [];
            for (let i = 0; i < 10; i++) {
                boxes.push(new GreenBox());
            }
            this._scrollContainer.addElements(boxes);
        }
        return this._scrollContainer;
    }

    private _scrollContainer2!: IScrollContainer;

    private get scrollContainer2(): IScrollContainer {
        if (!this._scrollContainer2) {
            this._scrollContainer2 = new ScrollContainer();
            this._scrollContainer2.layout = new VerticalLayout(16);
            this._scrollContainer2.percentWidth = 100;
            this._scrollContainer2.height = 500;
            this._scrollContainer2.backgroundColor = new Color(0, 100, 50, 0.2);
            const boxes: Array<GreenBox> = [];
            for (let i = 0; i < 10; i++) {
                boxes.push(new GreenBox());
            }
            this._scrollContainer2.addElements(boxes);
        }
        return this._scrollContainer2;
    }
}
customElements.define('enta-dev', EntaDev);
