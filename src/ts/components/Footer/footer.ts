import { footerTemplate } from "./footerTemplate";
import { initFooterEvents } from "./footer.events";

export default class Footer {
    private element: HTMLElement;

    constructor() {
        this.element = document.createElement("div");
        this.element.innerHTML = footerTemplate;
        initFooterEvents(this.element);
    }

    mount(container: HTMLElement) {
        container.appendChild(this.element);
        initFooterEvents(this.element);
    }
}


