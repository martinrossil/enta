import IDisplayContainer from '../core/IDisplayContainer';

export default interface IItemRenderer<Item> extends IDisplayContainer {
    data: Item | null;
    selected: boolean;
    initial(): void;
    hover(): void;
    pressed(point: [number, number]): void;
    triggered(): void;
}
