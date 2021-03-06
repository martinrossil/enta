import EventDispatcher from '../event/EventDispatcher';
import IArrayCollection from '../interfaces/data/IArrayCollection';

export default class ArrayCollection<Item> extends EventDispatcher implements IArrayCollection<Item> {
    public constructor(source: Item[] | null = null) {
        super();
        this.name = 'ArrayCollection';
        if (source) {
            this._source = source;
            return;
        }
        this._source = [];
    }

    public addItem(item: Item): void {
        this.source.push(item);
        this.dispatch('itemAdded', item);
    }

    public addItems(items: Item[]): void {
        this._source = this.source.concat(items);
        this.dispatch('itemsAdded', items);
    }

    public getItemIndex(item: Item): number {
        const index = this.source.indexOf(item);
        if (index === -1) {
            return NaN;
        }
        return index;
    }

    public getItemAt(index: number): Item | null {
        if (isNaN(index) || index < 0) {
            return null;
        }
        if (index < this.source.length) {
            return this.source[index];
        }
        return null;
    }

    public removeItem(item: Item): void {
        const index = this.source.indexOf(item);
        if (index > -1) {
            this.source.splice(index, 1);
            this.dispatch('itemRemoved', item);
        }
    }

    public removeItemAt(index: number): void {
        const item = this.getItemAt(index);
        if (item) {
            this.source.splice(index, 1);
            this.dispatch('itemRemoved', item);
        }
    }

    public removeAll(): void {
        if (this.length > 0) {
            this.source.length = 0;
            this.dispatch('reset');
        }
    }

    public get length(): number {
        return this.source.length;
    }

    private _source: Item[];

    public get source(): Item[] {
        return this._source;
    }
}
