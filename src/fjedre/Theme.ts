import BoxShadowFilter from '../filters/BoxShadowFilter';
import IFilter from '../interfaces/filters/IFilter';
import IColor from '../interfaces/vo/IColor';
import ITypeFace from '../interfaces/vo/ITypeFace';
import Color from '../vo/Color';
import TypeFace from '../vo/TypeFace';

export default class Theme {
    public static teal50: IColor = new Color(166, 76, 97);
    public static teal100: IColor = new Color(167, 85, 89);
    public static teal200: IColor =new Color(168, 84, 78);
    public static teal500: IColor = new Color(176, 80, 40);
    public static teal700: IColor = new Color(175, 77, 26);
    public static white: IColor = new Color(0, 0, 100); // white
    public static blueGray100: IColor = new Color(210, 40, 96);
    public static blueGray200: IColor = new Color(214, 32, 91);
    public static blueGray400: IColor = new Color(215, 20, 65);
    public static blueGray500: IColor = new Color(215, 16, 47);
    public static blueGray700: IColor = new Color(215, 25, 27);
    public static blueGray900: IColor = new Color(222, 47, 11);
    public static inter: ITypeFace = new TypeFace('Inter', 0.727, 0.09, 0.0);
    public static smallBoxShadow: IFilter = new BoxShadowFilter(0, 1, 2, NaN, new Color(0, 0, 0, 0.05))
}
