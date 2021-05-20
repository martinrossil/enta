import IEventListener from './IEventListener';

export default interface IEventDispatcher {
    dispatchEvent(event: Event): boolean;
    dispatch<Item>(typeArg: string, payload: Item | null, bubbles: boolean): void;
    addEventListener(type: string, listener: IEventListener, options?: { passive: boolean }): void;
    removeEventListener(type: string, listener: IEventListener): void;
    name: string;
}
