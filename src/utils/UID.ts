export default class UID {
    public static get(): string {
        return Math.random() + '';
    }
}
