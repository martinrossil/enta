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
    public constructor() {
        super();
        this.name = 'EntaDev';
        this.addElement(new LeftNavigation());
    }

    private get self(): IDisplayContainer {
        return this;
    }
}
customElements.define('enta-dev', EntaDev);
