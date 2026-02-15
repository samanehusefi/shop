let resizeTimeout: number | undefined;
function showLoading() {
    const loadingDiv = document.getElementById("loading");
    if (!loadingDiv) return;
    loadingDiv.classList.remove("hidden");
    loadingDiv.style.opacity = "1";
}
function hideLoading() {
    const loadingDiv = document.getElementById("loading");
    if (!loadingDiv) return;
    loadingDiv.style.opacity = "0";
    setTimeout(() => {
        loadingDiv.classList.add("hidden");
    }, 500);
}
window.addEventListener("resize", () => {
    showLoading();
    if (resizeTimeout) {
        clearTimeout(resizeTimeout);
    }
    resizeTimeout = window.setTimeout(() => {
        hideLoading();
    }, 400);
});

export const loadAppWithLoading = async (menu: any, slider: any) => {
    showLoading();
    try {
        await menu.loadDesktopMenu();
        await menu.loadMobileMenu();
        await slider.loadSlider();
    } catch (err) {
        console.error("Error loading app:", err);
    } finally {
        hideLoading();
    }
};
