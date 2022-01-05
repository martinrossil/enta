import IDisplayElement from '../core/IDisplayElement';

export default interface IDataRenderer<Data> extends IDisplayElement {
    data: Data | null;
}
