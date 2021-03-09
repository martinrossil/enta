import IEventDispatcher from '../event/IEventDispatcher';

export default interface IBaseElement extends IEventDispatcher {
    dispatch<Item>(typeArg: string, payload: Item | null, bubbles: boolean): void;
    name: string;
    connected: boolean;
    visible: boolean;
}
