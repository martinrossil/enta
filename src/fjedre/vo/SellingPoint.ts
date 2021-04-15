import ISellingPoint from '../interfaces/vo/ISellingPoint';

export default class SellingPoint implements ISellingPoint {
    public icon: string;
    public title: string;
    public description: string;
    public constructor(icon: string, title: string, description: string) {
        this.icon = icon;
        this.title = title;
        this.description = description;
    }

    public toString(): string {
        return 'title: ' + this.title + ', description: ' + this.description;
    }
}
