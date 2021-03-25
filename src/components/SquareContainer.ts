import DisplayContainer from '../core/DisplayContainer';
import DisplayElement from '../core/DisplayElement';
import IDisplayElement from '../interfaces/core/IDisplayElement';
import AnchorLayout from '../layout/AnchorLayout';
import AnchorLayoutData from '../layout/AnchorLayoutData';

export default class SquareContainer extends DisplayContainer {
    public constructor() {
        super();
        this.name = 'SquareContainer';
        this.padding = 20;
        this.backgroundColor = '#EAB308';
        this.layout = new AnchorLayout();
        // this.size(400, 400);
        // this.width = 400;
        this.layoutData = new AnchorLayoutData(0, 0, 0, 0);
        this.addElements([this.blue, this.red, this.black]);
        window.addEventListener('click', () => {
            // this.blue.width += 5;
        });
    }

    private _blue!: IDisplayElement;

    private get blue(): IDisplayElement {
        if (!this._blue) {
            this._blue = new DisplayElement();
            this._blue.name = 'blue';
            // this._blue.height = 50;
            this._blue.layoutData = new AnchorLayoutData(0, 0, NaN, 0, NaN, 50, NaN, 0);
            this._blue.backgroundColor = '#3B82F6';
        }
        return this._blue;
    }

    private _red!: IDisplayElement;

    private get red(): IDisplayElement {
        if (!this._red) {
            this._red = new DisplayElement();
            this._red.name = 'red';
            this._red.layoutData = new AnchorLayoutData(NaN, NaN, NaN, NaN, NaN, 100, 0);
            this._red.width = 50;
            this._red.backgroundColor = '#EF4444';
        }
        return this._red;
    }

    private _black!: IDisplayElement;

    private get black(): IDisplayElement {
        if (!this._black) {
            this._black = new DisplayElement();
            this._black.name = 'black';
            this._black.size(100, 100);
            this._black.layoutData = new AnchorLayoutData(NaN, 0, 0, NaN);
            this._black.backgroundColor = 'black';
        }
        return this._black;
    }
}
customElements.define('square-container', SquareContainer);