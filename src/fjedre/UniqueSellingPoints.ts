import { Icons } from '../components/Icons';
import DisplayContainer from '../core/DisplayContainer';
import BoxShadowFilter from '../filters/BoxShadowFilter';
import IDisplayElement from '../interfaces/core/IDisplayElement';
import AnchorLayoutData from '../layout/AnchorLayoutData';
import VerticalLayout from '../layout/VerticalLayout';
import Color from '../vo/Color';
import ISellingPointRenderer from './interfaces/ISellingPointRenderer';
import ISellingPoint from './interfaces/vo/ISellingPoint';
import SellingPointRenderer from './SellingPointRenderer';
import Theme from './Theme';
import SellingPoint from './vo/SellingPoint';

export default class UniqueSellingPoints extends DisplayContainer {
    public constructor() {
        super();
        this.name = 'UniqueSellingPoints';
        // this.size(400, 400);
        this.backgroundColor = Theme.white;
        this.cornerSize = 8;
        this.padding = 24;
        this.addFilter(new BoxShadowFilter(0, 1, 3, 0, new Color(0, 0, 0, 0.1)));
        this.addFilter(new BoxShadowFilter(0, 1, 2, 0, new Color(0, 0, 0, 0.06)));
        this.layoutData = new AnchorLayoutData(104, 32);
        this.layout = new VerticalLayout(16);
        this.addSellingPoints();
    }

    private addSellingPoints(): void {
        const sellingPointsRenderers: Array<ISellingPointRenderer> = [];
        for (const sellingPoint of this.sellingPoints) {
            const renderer: ISellingPointRenderer = new SellingPointRenderer();
            renderer.sellingPoint = sellingPoint;
            sellingPointsRenderers.push(renderer);
        }
        this.addElements(sellingPointsRenderers);
    }

    private _sellingPoints!: Array<ISellingPoint>;

    private get sellingPoints(): Array<ISellingPoint> {
        if (!this._sellingPoints) {
            this._sellingPoints = [
                new SellingPoint(Icons.STORE, 'Køb af fjedre online', 'Vores onlineshop er åben 24/7'),
                new SellingPoint(Icons.DELIVERY_DINING, 'Dag til dag levering', 'Du sparer lageromkostninger'),
                new SellingPoint(Icons.STARS, 'Danmark største udvalg', '10+ millioner standardfjedre på lager'),
                new SellingPoint(Icons.SAVINGS, 'Mængde efter behov', ' Ikke købe mere end nødvendigt'),
                new SellingPoint(Icons.ASSIGNMENT, 'Specialfjedre efter opgave', ' Du kan få alt i fjedre, ét sted'),
                new SellingPoint(Icons.SETTINGS_APPLICATIONS, 'Gasfjeder konfigurator', 'Sammensæt gasfjedre efter behov'),
                new SellingPoint(Icons.FONT_DOWNLOAD, 'Højeste kreditværdighed', 'AAA rating igennem mere end 12 år')
            ];
        }
        return this._sellingPoints;
    }
}
customElements.define('unique-selling-points', UniqueSellingPoints);
