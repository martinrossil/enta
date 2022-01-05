import DisplayContainer from '../core/DisplayContainer';
import MouseTouchMachine from '../fsm/MouseTouchMachine';
import IItemRenderer from '../interfaces/components/IItemRenderer';

export default class ItemRenderer<Item> extends DisplayContainer implements IItemRenderer<Item> {
    public constructor() {
        super();
        this.name = 'ListItemRenderer';
    }

    private machine: MouseTouchMachine = new MouseTouchMachine(this);

    public initial(): void {
        // override
    }

    public hover(): void {
        // override
    }

    public pressed(x: number, y: number): void {
        // override
    }

    public clicked(): void {
        this.dispatch('itemRendererTriggered', this.data, true);
    }

    protected dataChanged(): void {
        // override
    }

    protected selectedChanged(): void {
        // override
    }

    private _data: Item | null = null;

    public set data(value: Item | null) {
        if (this._data === value) {
            return;
        }
        this._data = value;
        this.dataChanged();
    }

    public get data(): Item | null {
        return this._data;
    }

    private _selected = false;

    public set selected(value: boolean) {
        if (this._selected === value) {
            return;
        }
        this._selected = value;
        this.selectedChanged();
    }

    public get selected(): boolean {
        return this._selected;
    }
}
customElements.define('item-renderer', ItemRenderer);
