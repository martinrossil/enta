import ILayoutData from './ILayoutData';

export default interface IAnchorLayoutData extends ILayoutData {
    top: number;
    right: number;
    bottom: number;
    left: number;
    percentWidth: number;
    percentHeight: number;
    horizontalCenter: number;
    verticalMiddle: number;
}
