import IEventDispatcher from '../event/IEventDispatcher';

export default interface IInteractive extends IEventDispatcher {
    initial(e: Event): void;
    hover(): void;
    pressed(x: number, y: number): void;
    getBoundingClientRect(): DOMRect;
}
