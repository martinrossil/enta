export default class UID {
    public static get(length = 21): string {
        let unique = '';
        const random = crypto.getRandomValues(new Uint8Array(length));
        for (;length--;) {
            const number = 63 & random[length];
            unique += number < 36 ? number.toString(36) : number < 62 ? (number - 26).toString(36).toUpperCase() : number < 63 ? '_' : '-';
        }
        return unique;
    }
}
