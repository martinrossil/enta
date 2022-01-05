import { DataRendererClass } from '../shared/Types';
import IDataRenderer from '../interfaces/components/IDataRenderer';
import ScrollContainer from '../core/ScrollContainer';
import IDataContainer from '../interfaces/components/IDataContainer';
import IArrayCollection from '../interfaces/data/IArrayCollection';
import DataRenderer from './DataRenderer';
import IEventListener from '../interfaces/event/IEventListener';

export default class DataContainer<Data> extends ScrollContainer implements IDataContainer<Data> {
    protected dataRendererCache: Array<IDataRenderer<Data>> = [];
    protected dataRendererLookup: Map<Data, IDataRenderer<Data> | undefined> = new Map();
    public constructor() {
        super();
        this.name = 'DataContainer';
        this.itemAdded = this.itemAdded.bind(this);
        this.itemsAdded = this.itemsAdded.bind(this);
        this.itemRemoved = this.itemRemoved.bind(this);
        this.reset = this.reset.bind(this);
    }

    private addItemRenderers(items: Data[]): void {
        const dataRenderers: IDataRenderer<Data>[] = [];
        for (const item of items) {
            let dataRenderer: IDataRenderer<Data>;
            if (this.dataRendererCache.length) {
                dataRenderer = this.dataRendererCache.splice(0, 1)[0];
            } else {
                dataRenderer = new this.DataRendererClass();
            }
            dataRenderer.data = item;
            this.dataRendererLookup.set(item, dataRenderer);
            dataRenderers.push(dataRenderer);
        }
        this.addElements(dataRenderers);
    }

    private itemAdded(e: CustomEvent<Data>): void {
        let dataRenderer: IDataRenderer<Data>
        if (this.dataRendererCache.length) {
            dataRenderer = this.dataRendererCache.splice(0, 1)[0];
        } else {
            dataRenderer = new this.DataRendererClass();
        }
        dataRenderer.data = e.detail;
        this.dataRendererLookup.set(e.detail, dataRenderer);
        this.addElement(dataRenderer);
    }

    private itemsAdded(e: CustomEvent<Data[]>): void {
        this.addItemRenderers(e.detail);
    }

    private itemRemoved(e: CustomEvent<Data>): void {
        const dataRenderer: IDataRenderer<Data> | undefined = this.dataRendererLookup.get(e.detail);
        if (dataRenderer) {
            dataRenderer.data = null;
            this.dataRendererCache.push(dataRenderer);
            this.removeElement(dataRenderer);
        }
    }

    private reset(): void {
        this.dataRendererLookup.forEach((dataRenderer) => {
            if (dataRenderer) {
                dataRenderer.data = null;
                this.dataRendererCache.push(dataRenderer);
            }
        });
        this.removeElements();
        this.dataRendererLookup.clear();
        if (this.dataProvider) {
            this.addItemRenderers(this.dataProvider.source);
        }
    }

    private _DataRendererClass!: DataRendererClass<Data>;

    public set DataRendererClass(value: DataRendererClass<Data>) {
        if (this._DataRendererClass === value) {
            return;
        }
        this._DataRendererClass = value;
        this.reset();
    }

    public get DataRendererClass(): DataRendererClass<Data> {
        if (!this._DataRendererClass) {
            this._DataRendererClass = DataRenderer;
        }
        return this._DataRendererClass;
    }

    private _dataProvider: IArrayCollection<Data> | null = null;

    public set dataProvider(value: IArrayCollection<Data> | null) {
        if (this._dataProvider === value) {
            return;
        }
        if (this._dataProvider) {
            this._dataProvider.removeEventListener('itemAdded', this.itemAdded as IEventListener);
            this._dataProvider.removeEventListener('itemsAdded', this.itemsAdded as IEventListener);
            this._dataProvider.removeEventListener('itemRemoved', this.itemRemoved as IEventListener);
            this._dataProvider.removeEventListener('reset', this.reset as IEventListener);
        }
        this._dataProvider = value;
        if (this._dataProvider) {
            this._dataProvider.addEventListener('itemAdded', this.itemAdded as IEventListener);
            this._dataProvider.addEventListener('itemsAdded', this.itemsAdded as IEventListener);
            this._dataProvider.addEventListener('itemRemoved', this.itemRemoved as IEventListener);
            this._dataProvider.addEventListener('reset', this.reset as IEventListener);
        }
        this.reset();
    }

    public get dataProvider(): IArrayCollection<Data> | null {
        return this._dataProvider;
    }
}
customElements.define('data-container', DataContainer);
