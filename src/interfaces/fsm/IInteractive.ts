import IEventDispatcher from '../event/IEventDispatcher';

export default interface IInteractive extends IEventDispatcher {
    initial(e: Event): void;
    hover(e: Event): void;
    pressed(point: [number, number]): void;
    triggered(): void;
    getBoundingClientRect(): DOMRect;
}
