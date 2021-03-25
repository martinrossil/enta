import ILayoutData from '../layout/ILayoutData';
import ISizeElement from './ISizeElement';

export default interface IDisplayElement extends ISizeElement {
    backgroundColor: string;
    layoutData: ILayoutData | null;
}
