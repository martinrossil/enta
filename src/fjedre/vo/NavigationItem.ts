import INavigationItem from '../interfaces/vo/INavigationItem';

export default class NavigationItem implements INavigationItem {
    public icon: string;
    public text: string;
    public href: string;
    public constructor(icon: string, text: string, href: string) {
        this.icon = icon;
        this.text = text;
        this.href = href;
    }
}
