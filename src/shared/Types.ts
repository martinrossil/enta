import IItemRenderer from '../interfaces/components/IItemRenderer';
import IDisplayElement from '../interfaces/core/IDisplayElement';
import IAnchorLayout from '../interfaces/layout/IAnchorLayout';
import IColomnLayout from '../interfaces/layout/IColumnLayout';
import IHorizontalLayout from '../interfaces/layout/IHorizontalLayout';
import IVerticalLayout from '../interfaces/layout/IVerticalLayout';
import ISvgElement from '../interfaces/svg/ISvgElement';

export type Align = 'topLeft' | 'topCenter' | 'topRight' | 'leftMiddle' | 'centerMiddle' | 'rightMiddle' | 'bottomLeft' | 'bottomCenter' | 'bottomRight' | 'none';
export type AnchorTarget = '_self' | '_blank' | '_parent' | '_top';
export type ChildElement = IDisplayElement | ISvgElement;
export type Clip = 'visible' | 'hidden' | 'scroll';
export type Cursor = '' | 'pointer';
export type CornerShape = 'round' | 'cut';
export type FontWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950;
export type HorizontalAlign = 'left' | 'center' | 'right' | 'none';
export type ItemRendererClass<Item> = new () => IItemRenderer<Item>;
export type Layout = IAnchorLayout | IHorizontalLayout | IVerticalLayout | IColomnLayout;
export type ObjectFit = 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
export type StrokeLineCap = '' | 'butt' | 'round' | 'square';
export type StrokeLineJoin = '' | 'miter' | 'round' | 'bevel' | 'miter-clip' | 'arcs';
export type SvgNameSpace = 'http://www.w3.org/2000/svg';
/**
 * 'left': The inline contents are aligned to the left edge of the line box.
 *
 * 'center': The inline contents are centered within the line box.
 *
 * 'right': The inline contents are aligned to the right edge of the line box.
 *
 * 'justify': The inline contents are justified. Text should be spaced to line up its left and right edges to the left and right edges of the line box, except for the last line.
 */
 export type TextAlign = 'left' | 'center' | 'right'| 'justify';
 export type VerticalAlign = 'top' | 'middle' | 'bottom' | 'none';
