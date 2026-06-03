export function initFooterEvents(root: HTMLElement) {
    root.querySelector("#scrollToTop")?.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    root.querySelector("#toggleBtn")?.addEventListener("click", () => {
        root.querySelector(".seo")?.classList.toggle("expanded");
    });
}
