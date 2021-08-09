import { AnchorTarget } from '../../shared/Types';
import IDisplayContainer from './IDisplayContainer';

export default interface ILinkContainer extends IDisplayContainer {
    href: string;
    target: AnchorTarget;
}
