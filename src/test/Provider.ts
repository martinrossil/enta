import IProvider from './IProvider';

export default class Provider implements IProvider {
    public href: string;
    public id: number;
    public name: string;
    public constructor(href: string, id: number, name: string) {
        this.href = href;
        this.id = id;
        this.name = name;
    }
}
