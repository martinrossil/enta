import ScrollContainer from '../core/ScrollContainer';
import IItemRenderer from '../interfaces/components/IItemRenderer';
import IList from '../interfaces/components/IList';
import IArrayCollection from '../interfaces/data/IArrayCollection';
import IEventListener from '../interfaces/event/IEventListener';
import { ItemRendererClass } from '../types/ItemRendererClass';
import ItemRenderer from './ItemRenderer';

export default class List<Item> extends ScrollContainer implements IList<Item> {
    private itemRenderCache: Array<IItemRenderer<Item>> = [];
    private listItemRendererLookup: Map<Item, IItemRenderer<Item> | undefined> = new Map();
    public constructor() {
        super();
        this.name = 'List';
        this.itemAdded = this.itemAdded.bind(this);
        this.itemsAdded = this.itemsAdded.bind(this);
        this.itemRemoved = this.itemRemoved.bind(this);
        this.reset = this.reset.bind(this);
        this.addEventListener('itemRendererTriggered', this.itemRenderTriggered as IEventListener);
    }

    private itemRenderTriggered(e: CustomEvent<Item>): void {
        e.stopImmediatePropagation();
        if (this.dataProvider) {
            this.selectedIndex = this.dataProvider.getItemIndex(e.detail);
            this.dispatch('selectedItemChanged', e.detail);
            this.dispatch('selectedIndexChanged', this.selectedIndex);
        }
    }

    private addItemRenderers(items: Item[]): void {
        const listItemRenderers: IItemRenderer<Item>[] = [];
        for (const item of items) {
            let listItemRenderer: IItemRenderer<Item>;
            if (this.itemRenderCache.length) {
                listItemRenderer = this.itemRenderCache.splice(0, 1)[0];
            } else {
                listItemRenderer = new this.ItemRendererClass();
            }
            listItemRenderer.data = item;
            this.listItemRendererLookup.set(item, listItemRenderer);
            listItemRenderers.push(listItemRenderer);
        }
        this.addElements(listItemRenderers);
        this.updateSelectedItemRenderer();
    }

    private itemAdded(e: CustomEvent<Item>): void {
        let itemRenderer: IItemRenderer<Item>
        if (this.itemRenderCache.length) {
            itemRenderer = this.itemRenderCache.splice(0, 1)[0];
        } else {
            itemRenderer = new this.ItemRendererClass();
        }
        itemRenderer.data = e.detail;
        this.listItemRendererLookup.set(e.detail, itemRenderer);
        this.addElement(itemRenderer);
        this.updateSelectedItemRenderer();
    }

    private itemsAdded(e: CustomEvent<Item[]>): void {
        this.addItemRenderers(e.detail);
    }

    private itemRemoved(e: CustomEvent<Item>): void {
        const itemRenderer: IItemRenderer<Item> | undefined = this.listItemRendererLookup.get(e.detail);
        if (itemRenderer) {
            itemRenderer.selected = false;
            itemRenderer.data = null;
            this.itemRenderCache.push(itemRenderer);
            this.removeElement(itemRenderer);
        }
        this.updateSelectedItemRenderer();
    }

    private reset(): void {
        this._selectedIndex = NaN;
        this.listItemRendererLookup.forEach((itemRenderer) => {
            if (itemRenderer) {
                itemRenderer.selected = false;
                itemRenderer.data = null;
                this.itemRenderCache.push(itemRenderer);
            }
        });
        this.removeElements();
        this.listItemRendererLookup.clear();
        if (this.dataProvider) {
            this.addItemRenderers(this.dataProvider.source);
        }
    }

    private updateSelectedItemRenderer(): void {
        if (this.selectedItem) {
            const itemRenderer: IItemRenderer<Item> | undefined = this.listItemRendererLookup.get(this.selectedItem);
            if (itemRenderer) {
                this.selectedItemRenderer = itemRenderer;
                return;
            }
            this.selectedItemRenderer = undefined;
            return;
        }
        this.selectedItemRenderer = undefined;
    }

    private _ItemRendererClass!: ItemRendererClass<Item>;

    public set ItemRendererClass(value: ItemRendererClass<Item>) {
        if (this._ItemRendererClass === value) {
            return;
        }
        this._ItemRendererClass = value;
        this.reset();
    }

    public get ItemRendererClass(): ItemRendererClass<Item> {
        if (!this._ItemRendererClass) {
            this._ItemRendererClass = ItemRenderer;
        }
        return this._ItemRendererClass;
    }

    private _dataProvider: IArrayCollection<Item> | null = null;

    public set dataProvider(value: IArrayCollection<Item> | null) {
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

    public get dataProvider(): IArrayCollection<Item> | null {
        return this._dataProvider;
    }

    private get selectedItem(): Item | null {
        if (this.dataProvider) {
            return this.dataProvider.getItemAt(this.selectedIndex);
        }
        return null;
    }

    private _selectedItemRenderer: IItemRenderer<Item> | undefined = undefined;

    private set selectedItemRenderer(value: IItemRenderer<Item> | undefined) {
        if (this._selectedItemRenderer === value) {
            return;
        }
        if (this._selectedItemRenderer) {
            this._selectedItemRenderer.selected = false;
        }
        this._selectedItemRenderer = value;
        if (this._selectedItemRenderer) {
            this._selectedItemRenderer.selected = true;
        }
    }

    private get selectedItemRenderer(): IItemRenderer<Item> | undefined {
        return this._selectedItemRenderer;
    }

    private _selectedIndex = NaN;

    public set selectedIndex(value: number) {
        if (isNaN(this._selectedIndex) && isNaN(value)) {
            return;
        }
        if (this._selectedIndex === value) {
            return;
        }
        this._selectedIndex = value;
        this.updateSelectedItemRenderer();
    }

    public get selectedIndex(): number {
        return this._selectedIndex;
    }
}
customElements.define('list-element', List);
