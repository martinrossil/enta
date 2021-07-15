import IDisplayElement from '../core/IDisplayElement';

export default interface IItemRenderer<Item> extends IDisplayElement {
    data: Item | null;
    selected: boolean;
    initial(): void;
    hover(): void;
    pressed(x: number, y: number): void;
    clicked(): void;
}
