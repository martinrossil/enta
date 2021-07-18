import { ObjectFit } from '../../shared/Types';
import IDisplayElement from '../core/IDisplayElement';

export default interface IImageElement extends IDisplayElement {
    source: string;
    alt: string;
    objectFit: ObjectFit;
}
