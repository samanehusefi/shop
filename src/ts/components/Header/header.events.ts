export const initHeaderEvents = (container: HTMLElement) => {
    const mobileMenuBtn = container.querySelector("#mobileMenuBtn");
    const mobileDrawer = container.querySelector("#mobileMenuDrawer");
    const overlay = container.querySelector("#mobileMenuOverlay");
    const closeBtn = container.querySelector("#mobileMenuCloseBtn");

    const mobileTopbar = container.querySelector(".menu-mobile") as HTMLElement | null;
    const desktopMenu = container.querySelector(".menu-desktop") as HTMLElement | null;

    const mobileSpacer = container.querySelector("#mobileSpacer") as HTMLElement | null;
    const desktopSpacer = container.querySelector("#navbarSpacer") as HTMLElement | null;

    const targets: HTMLElement[] = [];
    const spacers: { el: HTMLElement; target: HTMLElement }[] = [];

    if (mobileTopbar) targets.push(mobileTopbar);
    if (desktopMenu) targets.push(desktopMenu);

    if (mobileTopbar && mobileSpacer) {
        spacers.push({ el: mobileSpacer, target: mobileTopbar });
    }

    if (desktopMenu && desktopSpacer) {
        spacers.push({ el: desktopSpacer, target: desktopMenu });
    }

    const close = () => {
        mobileDrawer?.classList.add("translate-x-full");
        overlay?.classList.add("opacity-0", "pointer-events-none");
    };

    const open = () => {
        mobileDrawer?.classList.remove("translate-x-full");
        overlay?.classList.remove("opacity-0", "pointer-events-none");
    };

    mobileMenuBtn?.addEventListener("click", open);
    closeBtn?.addEventListener("click", close);
    overlay?.addEventListener("click", close);

    if (targets.length === 0) return;

    const offsetTop = Math.min(...targets.map(t => t.offsetTop));

    let isFixed = false;

    const setFixed = (el: HTMLElement) => {
        if (el.classList.contains("fixed")) return;

        el.classList.add("fixed", "top-0", "left-0", "right-0", "z-50");
        el.classList.remove("py-5", "py-7");
        el.classList.add("py-3");
    };

    const unsetFixed = (el: HTMLElement) => {
        if (!el.classList.contains("fixed")) return;

        el.classList.remove("fixed", "top-0", "left-0", "right-0", "z-50");
        el.classList.remove("py-6", "py-7");
        el.classList.add("py-2");
    };

    const syncSpacers = (active: boolean) => {
        spacers.forEach(({ el, target }) => {
            el.style.height = active ? `${target.offsetHeight}px` : "0px";
        });
    };

    const onScroll = (): void => {
        const shouldFix = window.scrollY > offsetTop;

        if (shouldFix === isFixed) return;

        isFixed = shouldFix;

        targets.forEach(el => {
            if (shouldFix) setFixed(el);
            else unsetFixed(el);
        });

        syncSpacers(shouldFix);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
};