import IDisplayContainer from '../../interfaces/core/IDisplayContainer';
import ISellingPoint from './vo/ISellingPoint';

export default interface ISellingPointRenderer extends IDisplayContainer {
    sellingPoint: ISellingPoint | null;
}
