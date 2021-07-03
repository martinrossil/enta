import { ClipType } from '../types/ClipType';
import { CornerType } from '../types/CornerType';
import { HorizontalAlign } from '../types/HorizontalAlign';
import { SvgNameSpace } from '../types/SvgNameSpace';
import { VerticalAlign } from '../types/VerticalAlign';

export default class Strings {
    public static get ABSOLUTE(): string { return 'absolute'; }
    public static get AUTO(): string { return 'auto'; }
    public static get BORDER_BOX(): string { return 'border-box'; }
    public static get BOTTOM(): VerticalAlign { return 'bottom'; }
    public static get CENTER(): HorizontalAlign { return 'center'; }
    public static get COLOR_ADDED(): string { return 'colorAdded'; }
    public static get COLORS_ADDED(): string { return 'colorsAdded'; }
    public static get COLOR_CHANGED(): string { return 'colorChanged'; }
    public static get COVER(): string { return 'cover'; }
    public static get D(): string { return 'd'; }
    public static get DEGREES_CHANGED(): string { return 'degreesChanged'; }
    public static get ELLIPSIS(): string { return 'ellipsis'; }
    public static get EMPTY(): string { return ''; }
    public static get FILL(): string { return 'fill'; }
    public static get GRADIENT_TRANSFORM(): string { return 'gradientTransform'; }
    public static get GRADIENT_UNITS(): string { return 'gradientUnits'; }
    public static get HEIGHT(): string { return 'height'; }
    public static get HIDDEN(): ClipType { return 'hidden'; }
    public static get HUNDRED_VH(): string { return '100vh'; }
    public static get ID(): string { return 'id'; }
    public static get INVALIDATE(): string { return 'invalidate'; }
    public static get ITEM_ADDED(): string { return 'itemAdded'; }
    public static get ITEMS_ADDED(): string { return 'itemsAdded'; }
    public static get ITEM_REMOVED(): string { return 'itemRemoved'; }
    public static get ITEM_RENDERER_TRIGGERED(): string { return 'itemRendererTriggered'; }
    public static get LEFT(): HorizontalAlign { return 'left'; }
    public static get LINEAR_GRADIENT(): string { return 'linearGradient'; }
    public static get MARGIN(): string { return 'margin'; }
    public static get MIDDLE(): VerticalAlign { return 'middle'; }
    public static get NO_WRAP(): string { return 'nowrap'; }
    public static get NONE(): string { return 'none'; }
    public static get OFFSET(): string { return 'offset'; }
    public static get OVERFLOW(): string { return 'overflow'; }
    public static get POSITION(): string { return 'position'; }
    public static get PRESERVE_ASPECT_RATIO(): string { return 'preserveAspectRatio'; }
    public static get PX(): string { return 'px'; }
    public static get RESET(): string { return 'reset'; }
    public static get RESIZE(): string { return 'resize'; }
    public static get RIGHT(): HorizontalAlign { return 'right'; }
    public static get ROTATE(): string { return 'rotate'; }
    public static get ROUND(): CornerType { return 'round'; }
    public static get SCROLL(): ClipType { return 'scroll'; }
    public static get SELECTED_ITEM_CHANGED(): string { return 'selectedItemChanged'; }
    public static get SELECTED_INDEX_CHANGED(): string { return 'selectedIndexChanged'; }
    public static get STOP_COLOR(): string { return 'stop-color'; }
    public static get STROKE(): string { return 'stroke'; }
    public static get STROKE_COLOR(): string { return 'stroke-color'; }
    public static get STROKE_LINECAP(): string { return 'stroke-linecap'; }
    public static get STROKE_LINEJOIN(): string { return 'stroke-linejoin'; }
    public static get STROKE_WIDTH(): string { return 'stroke-width'; }
    public static get SVG_NS(): SvgNameSpace { return 'http://www.w3.org/2000/svg'; }
    public static get TOP(): VerticalAlign { return 'top'; }
    public static get TOUCH(): string { return 'touch'; }
    public static get TRANSFORM(): string { return 'transform'; }
    public static get TRANSPARENT(): string { return 'transparent'; }
    public static get URL(): string { return 'url'; }
    public static get USER_SPACE_ON_USE(): string { return 'userSpaceOnUse'; }
    public static get VIEW_BOX(): string { return 'viewBox'; }
    public static get VISIBLE(): ClipType { return 'visible'; }
    public static get WIDTH(): string { return 'width'; }
    public static get ZERO(): string { return '0'; }
}
