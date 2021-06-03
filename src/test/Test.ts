import ITest from './ITest'

export default class Test implements ITest {
    public text;
    public constructor(text: string) {
        this.text = text;
    }
}
