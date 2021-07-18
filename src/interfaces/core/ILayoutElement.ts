export default interface ILayoutElement {
    position(x: number, y: number): void;
    x: number;
    y: number;
    top: number;
    right: number;
    bottom: number;
    left: number;
    centerOffset: number;
    middleOffset: number;
    externalSize(width: number, height: number): void;
    externalWidth: number;
    externalHeight: number;
    width: number;
    height: number;
    percentWidth: number;
    percentHeight: number;
    actualWidth: number;
    actualHeight: number;
}
