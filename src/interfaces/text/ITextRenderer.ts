import { IColor } from '../../shared/Interfaces';
import { TextAlign } from '../../shared/Types';
import IDisplayElement from '../core/IDisplayElement';

export default interface ITextRenderer extends IDisplayElement {
    text: string;
    fontFamily: string;
    fontSize: number;
    fontWeight: number;
    letterSpacing: number;
    lineHeight: number;
    textAlign: TextAlign;
    textColor: IColor | null;
    readonly clientWidth: number;
    readonly clientHeight: number;
}
