import  "@/css/main.css";
import "../../node_modules/swiper/swiper-bundle.min.css"
import menu from "@/ts/components/Menu/Menu.ts";
import slider from "@/ts/components/Slider/Slider.ts";
(async () => {
    await menu.loadDesktopMenu();
    await menu.loadMobileMenu();
    await slider.loadSlider();
})();
//navbar
const navbar = document.querySelector<HTMLElement>('#navbar');

if (navbar) {

    const getInitialOffset = () => {
        return window.innerWidth >= 1024 ? 50 : 30;
    };

    const updateNavbarPosition = () => {
        if (window.scrollY > 50) {
            navbar.style.position = 'fixed';
            navbar.style.top = '0';
            navbar.classList.add('shadow-lg');
        } else {
            navbar.style.position = 'absolute';
            navbar.style.top = `${getInitialOffset()}px`;
            navbar.classList.remove('shadow-lg');
        }
    };

    // اجرای اولیه
    updateNavbarPosition();

    // هنگام scroll
    window.addEventListener('scroll', updateNavbarPosition);

    // هنگام resize ← این بخش مهم است
    window.addEventListener('resize', updateNavbarPosition);
}

//loading
let resizeTimeout: number | undefined;

function showLoading() {
    const loadingDiv = document.getElementById("mobileLoading");
    if (!loadingDiv) return;

    loadingDiv.classList.remove("hidden");
    loadingDiv.style.opacity = "1";
}

function hideLoading() {
    const loadingDiv = document.getElementById("mobileLoading");
    if (!loadingDiv) return;

    loadingDiv.style.opacity = "0";
    setTimeout(() => {
        loadingDiv.classList.add("hidden");
    }, 500);
}

window.addEventListener("resize", () => {
    showLoading();

    // debounce برای جلوگیری از اجرای زیاد
    if (resizeTimeout) {
        clearTimeout(resizeTimeout);
    }

    resizeTimeout = window.setTimeout(() => {

        // اگر Swiper دارید:
        const swiperEl = document.querySelector("swiper-container") as any;
        if (swiperEl && swiperEl.swiper) {
            swiperEl.swiper.update();
        }

        // اگر layout خاصی دارید می‌توانید اینجا recalculation انجام دهید

        hideLoading();

    }, 400); // بعد از توقف resize
});
