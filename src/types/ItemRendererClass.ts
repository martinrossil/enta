import IItemRenderer from '../interfaces/components/IItemRenderer';

export type ItemRendererClass<Item> = new () => IItemRenderer<Item>;
