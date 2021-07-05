import ILayout from './ILayout';

export default interface IColomnLayout extends ILayout {
    gap: number;
    horizontalGap: number;
    verticalGap: number;
    minColumnWidth: number;
    maxColumns: number;
    aspectRatio: number;
}
