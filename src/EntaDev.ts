import ApplicationElement from './core/ApplicationElement';
import LeftNavigation from './test/LeftNavigation';
import IDisplayContainer from './interfaces/core/IDisplayContainer';
import ILabelElement from './interfaces/text/ILabelElement';
import LabelElement from './text/LabelElement';
import ITextElement from './interfaces/text/ITextElement';
import TextElement from './text/TextElement';
import IPathElement from './interfaces/svg/IPathElement';
import PathElement from './svg/PathElement';

export default class EntaDev extends ApplicationElement {
    public static TAG = 'enta-dev';
    public constructor() {
        super();
        this.name = EntaDev.TAG;
        this.addElement(new LeftNavigation());
        const labelElement: ILabelElement = new LabelElement();
        const textElement: ITextElement = new TextElement();
        const pathElement: IPathElement = new PathElement();
        console.log(labelElement.name, textElement.name, pathElement.name);
    }

    private get self(): IDisplayContainer {
        return this;
    }
}
customElements.define(EntaDev.TAG, EntaDev);
