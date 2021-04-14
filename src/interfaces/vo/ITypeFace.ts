import IEventDispatcher from '../event/IEventDispatcher';

export default interface ITypeFace extends IEventDispatcher {
    fontFamily: string;
    capHeight: number;
    offsetX: number;
    offsetY: number;
}
