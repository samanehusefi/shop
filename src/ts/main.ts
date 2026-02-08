import  "@/css/main.css";
import menu from "@/ts/components/Menu/Menu.ts";

(async () => {
    await menu.loadDesktopMenu();
    await menu.loadMobileMenu();
})();