import DisplayContainer from '../core/DisplayContainer';
import IDataRenderer from '../interfaces/components/IDataRenderer';

export default class DataRenderer<Data> extends DisplayContainer implements IDataRenderer<Data> {
    public constructor() {
        super();
        this.name = 'DataRenderer';
    }

    protected dataChanged(): void {
        // override
    }

    private _data: Data | null = null;

    public set data(value: Data | null) {
        if (this._data === value) {
            return;
        }
        this._data = value;
        this.dataChanged();
    }

    public get data(): Data | null {
        return this._data;
    }
}
customElements.define('data-renderer', DataRenderer);
