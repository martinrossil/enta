import IColor from '../../interfaces/shared/IColor';
import Color from '../../shared/Color';

export default class Colors {
    public static WHITE: IColor = new Color(0, 100, 100);
    public static BLACK: IColor = new Color(0, 0, 0);
    public static BACKGROUND: IColor = new Color(44, 30, 93);
    public static PRIMARY_GREEN: IColor = new Color(161, 100, 33);
}
