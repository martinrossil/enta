type ElementClass = new () => HTMLElement;
export default function registerElement(tag: string, ElementClass: ElementClass): void {
    const element: HTMLElement | undefined = customElements.get(tag);
    if (element === undefined) {
        customElements.define(tag, ElementClass);
    }
}
