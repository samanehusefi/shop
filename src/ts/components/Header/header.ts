import { headerTemplate } from "./headerTemplate";
import { initHeaderEvents } from "./header.events";
import menu from "./Menu/Menu";
import initLogoSection from "./sections/LogoSection";
import { initSearch } from "./Search/Search";
import { initNavbarScroll } from "./Menu/Menu";
export default class Header {

    async mount(root: HTMLElement) {

        // 1. render
        root.innerHTML = await headerTemplate();

        // 2. logo
        initLogoSection("logo-root");

        // 3. wait DOM settle
        await new Promise(requestAnimationFrame);

        // 4. load menus (MUST happen before events)
        await menu.loadDesktopMenu();
        await menu.loadMobileMenu();
        menu.initMobileDrawer();
        // 5. wait again for DOM commit
        await new Promise(requestAnimationFrame);
        const navbar = root.querySelector("#navbar") as HTMLElement;
        initSearch(navbar);
        initNavbarScroll();
        // 6. init events (LAST STEP)
        initHeaderEvents(root);
    }
}