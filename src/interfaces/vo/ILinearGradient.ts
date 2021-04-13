import IEventDispatcher from '../event/IEventDispatcher';
import IColor from './IColor';

export default interface ILinearGradient extends IEventDispatcher {
    degrees: number;
    readonly colors: Array<IColor>;
    addColor(color: IColor): void;
    addColors(colors: Array<IColor>): void;
    toString(): string;
}
