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

    // ---------------- Drawer ----------------
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

    // ---------------- FIX: no offsetTop ----------------
    const SCROLL_LIMIT = 80;

    let isFixed = false;
    let ticking = false;

    // ---------------- FIX STATE ONLY ----------------
    const applyState = (fixed: boolean) => {
        targets.forEach(el => {
            el.classList.toggle("is-fixed", fixed);
        });

        spacers.forEach(({ el, target }) => {
            el.style.height = fixed ? `${target.getBoundingClientRect().height}px` : "0px";
        });
    };

    const onScroll = () => {
        if (ticking) return;
        ticking = true;

        requestAnimationFrame(() => {
            const shouldFix = window.scrollY > SCROLL_LIMIT;

            if (shouldFix !== isFixed) {
                isFixed = shouldFix;
                applyState(isFixed);
            }

            ticking = false;
        });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", () => applyState(isFixed), { passive: true });

    // initial state
    applyState(false);
};