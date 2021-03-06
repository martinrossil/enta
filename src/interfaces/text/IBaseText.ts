import { FontWeight, TextAlign } from '../../shared/Types';
import IDisplayElement from '../core/IDisplayElement';
import IColor from '../shared/IColor';
import ITypeFace from './ITypeFace';

export default interface IBaseText extends IDisplayElement {
    text: string;
    typeFace: ITypeFace;
    fontSize: number;
    fontWeight: FontWeight;
    letterSpacing: number;
    textAlign: TextAlign;
    textColor: IColor | null;
}
