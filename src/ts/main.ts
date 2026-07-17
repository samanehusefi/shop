import "@/css/main.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { register } from "swiper/element/bundle";

import Header from "@/ts/components/Header/header";
import Footer from "@/ts/components/Footer/footer";
import slider from "@/ts/components/Slider/Slider";
import amazingpro from "@/ts/components/Products/AmazingProducts";
import freshpro from "@/ts/components/Products/FreshProducts";
import posts from "@/ts/components/Posts/PostCard";
import heroBanners from "@/ts/components/Banners/HeroBanners";
import campaign_banners from "@/ts/components/Banners/CampaignBanners";
import promo_banners from "@/ts/components/Banners/PromoBanners";
import categories from "@/ts/components/Products/Categories";
import brands from "@/ts/components/Brands/Brands";
import { loadAppWithLoading } from "@/ts/components/Loading/Loading";

import "@/ts/components/Header/Search/Search";

register();

/* ---------------- bootstrap ---------------- */
window.addEventListener("DOMContentLoaded", async () => {
    await mountHeader();
    await loadAppWithLoading(slider, amazingpro, updateText, posts,heroBanners,campaign_banners,promo_banners,freshpro,categories,brands);
    await mountFooter();
    initSheets();
});

/* -------------- Header ------------------ */
async function mountHeader() {
    const headerRoot = document.querySelector<HTMLElement>("#header");
    if (!headerRoot) return;
    await new Header().mount(headerRoot);
}

/* -------------- Footer ------------------ */
async function mountFooter() {
    const footerRoot = document.querySelector<HTMLElement>("#footer");
    if (!footerRoot) return;

    await new Footer().mount(footerRoot);

    initFooterToggle();
    initScrollToTop();
}

/* -------------- Footer Toggle ------------------ */
function initFooterToggle() {
    const aboutBox = document.querySelector<HTMLElement>(".footer-aboutUs");
    const toggleBtn = document.getElementById("toggleBtn");
    const toggleText = document.getElementById("toggleText");

    if (!aboutBox || !toggleBtn || !toggleText) return;

    let expanded = false;

    toggleBtn.addEventListener("click", () => {
        expanded = !expanded;

        aboutBox.classList.toggle("!h-auto", expanded);
        aboutBox.classList.toggle("before:hidden", expanded);
        aboutBox.classList.toggle("!h-32", !expanded);
        aboutBox.classList.toggle("overflow-hidden", !expanded);

        toggleText.textContent = expanded ? "بستن" : "مشاهده بیشتر";
    });
}

/* --------------- Scroll To Top ----------------- */
function initScrollToTop() {
    const scrollButton = document.getElementById("scrollToTop");
    if (!scrollButton) return;

    scrollButton.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });

    });
}

/* ---------------- Bottom Sheets ---------------- */
function initSheets() {
    const overlay = document.querySelector<HTMLDivElement>("#overlay");
    if (!overlay) return;

    const openSheet = (sheet: HTMLDivElement) => {
        sheet.classList.remove("translate-y-full");
        sheet.classList.add("translate-y-0");

        overlay.classList.remove("opacity-0", "pointer-events-none");
        overlay.classList.add("opacity-100");
    };

    const closeSheet = (sheet: HTMLDivElement) => {
        sheet.classList.add("translate-y-full");
        sheet.classList.remove("translate-y-0");

        overlay.classList.add("opacity-0", "pointer-events-none");
        overlay.classList.remove("opacity-100");
    };

    document.addEventListener("click", (e) => {
        const target = e.target as HTMLElement;

        const openBtn = target.closest<HTMLElement>("[data-open]");
        if (openBtn) {
            const sheetId = openBtn.getAttribute("data-open");
            if (!sheetId) return;

            const sheet = document.getElementById(sheetId) as HTMLDivElement | null;
            if (!sheet) return;

            openSheet(sheet);
            return;
        }

        const closeBtn = target.closest<HTMLElement>("[data-close]");
        if (closeBtn) {
            const sheet = closeBtn.closest<HTMLElement>(".sheet") as HTMLDivElement | null;
            if (!sheet) return;

            closeSheet(sheet);
        }
    });

    overlay.addEventListener("click", () => {
        const activeSheet = document.querySelector<HTMLDivElement>(".sheet:not(.translate-y-full)");
        if (activeSheet) closeSheet(activeSheet);
    });
}

/* ---------------- showAllBtn ---------------- */
function updateText() {
    const showAllPro = document.getElementById("showAllPro");
    const showAllPost = document.getElementById("showAllPost");
    if (!showAllPro || !showAllPost) return;

    showAllPro.textContent =
        window.innerWidth <= 768 ? "همه" : "مشاهده همه";
    showAllPost.textContent =
        window.innerWidth <= 768 ? "مشاهده همه" : "مطالب بیشتر در دیجی‌کالا مگ";
}

/* init */
updateText();

/* ---------------- resize (debounced) ---------------- */
let resizeTimeout: ReturnType<typeof setTimeout> | undefined;

window.addEventListener("resize", () => {
    if (resizeTimeout) clearTimeout(resizeTimeout);

    resizeTimeout = setTimeout(() => {
        updateText();
    }, 150);
});