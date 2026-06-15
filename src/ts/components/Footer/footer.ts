import { footerTemplate } from "./footerTemplate";
import { setupEmailForm } from "./sections/QuickLinkSection";

export default class Footer {
    private element: HTMLElement;
    private eventsInitialized = false;

    constructor() {
        this.element = document.createElement("div");
    }

    async mount(container: HTMLElement) {
        const html = await footerTemplate();
        this.element.innerHTML = html;

        if (!container.contains(this.element)) {
            container.appendChild(this.element);
        }

        this.initEvents();
    }

    private initEvents() {
        if (this.eventsInitialized) return;

        // mount email form
        const emailContainer = this.element.querySelector<HTMLElement>('.footer-Quick-Link');
        if (emailContainer) setupEmailForm(emailContainer);

        this.eventsInitialized = true;
    }
}