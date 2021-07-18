import { ItemRendererClass } from '../../shared/Types';
import IScrollContainer from '../core/IScrollContainer';
import IArrayCollection from '../data/IArrayCollection';

export default interface IList<Item> extends IScrollContainer {
    dataProvider: IArrayCollection<Item> | null;
    selectedIndex: number;
    ItemRendererClass: ItemRendererClass<Item>;
}
