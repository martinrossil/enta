import IEventDispatcher from '../event/IEventDispatcher';

export default interface IFilter extends IEventDispatcher {
    toString(): string;
}
