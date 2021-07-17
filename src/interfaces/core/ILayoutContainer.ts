import ILayoutElement from './ILayoutElement';

export default interface ILayoutContainer extends ILayoutElement {
    paddingLeft: number;
    paddingTop: number;
    paddingRight: number;
    paddingBottom: number;
}
