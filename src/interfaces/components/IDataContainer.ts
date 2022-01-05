import { DataRendererClass } from '../../shared/Types';
import IArrayCollection from '../data/IArrayCollection';
import IScrollContainer from '../core/IScrollContainer';

export default interface IDataContainer<Data> extends IScrollContainer {
    dataProvider: IArrayCollection<Data> | null;
    DataRendererClass: DataRendererClass<Data>;
}
