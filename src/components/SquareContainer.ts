import DisplayContainer from '../core/DisplayContainer';
import DisplayElement from '../core/DisplayElement';
import IDisplayElement from '../interfaces/core/IDisplayElement';
// import AnchorLayout from '../layout/AnchorLayout';
import IVerticalLayout from '../interfaces/layout/IVerticalLayout';
import AnchorLayoutData from '../layout/AnchorLayoutData';
import VerticalLayout from '../layout/VerticalLayout';
import VerticalLayoutData from '../layout/VerticalLayoutData';

export default class SquareContainer extends DisplayContainer {
    public constructor() {
        super();
        this.name = 'SquareContainer';
        console.log(this.name, 'constructor()');
        this.padding = 20;
        this.backgroundColor = 'white'; // '#EAB308';
        this.cornerSize = 24;
        // this.layout = new AnchorLayout();
        const v: IVerticalLayout = new VerticalLayout();
        v.horizontalAlign = 'fill';
        v.verticalAlign = 'fill';
        v.verticalGap = 16;
        this.layout = v;
        // this.size(400, 400);
        // this.width = 400;
        this.layoutData = new AnchorLayoutData(NaN, 0, NaN, 0, NaN, 75, 0, 0);
        this.addElements([this.blue, this.red, this.black]);
        window.addEventListener('click', () => {
            // this.blue.width += 5;
            // v.verticalGap += 16;
        });
    }

    private _blue!: IDisplayElement;

    private get blue(): IDisplayElement {
        if (!this._blue) {
            this._blue = new DisplayElement();
            this._blue.name = 'blue';
            // this._blue.width = 300;
            this._blue.size(300, 50);
            // this._blue.height = 100;
            // this._blue.layoutData = new AnchorLayoutData(NaN, NaN, NaN, NaN, 100);
            this._blue.backgroundColor = '#3B82F6';
            this._blue.cornerSize = 16;
        }
        return this._blue;
    }

    private _red!: IDisplayElement;

    private get red(): IDisplayElement {
        if (!this._red) {
            this._red = new DisplayElement();
            this._red.name = 'red';
            this._red.layoutData = new VerticalLayoutData(75, 50);
            // this._red.layoutData = new AnchorLayoutData(NaN, 0, 0);
            // this._red.size(350, 100);
            // this._red.height = 200;
            // this._red.width = 300;
            this._red.cornerSize = 16;
            this._red.backgroundColor = '#EF4444';
        }
        return this._red;
    }

    private _black!: IDisplayElement;

    private get black(): IDisplayElement {
        if (!this._black) {
            this._black = new DisplayElement();
            this._black.name = 'black';
            // this._black.size(400, 150);
            // this._black.width = 400;
            // this._black.layoutData = new AnchorLayoutData(NaN, NaN, NaN, NaN, NaN, 100);
            this._black.backgroundColor = 'black';
            this._black.cornerSize = 16;
        }
        return this._black;
    }
}
customElements.define('square-container', SquareContainer);
