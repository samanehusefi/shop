let resizeTimeout: ReturnType<typeof setTimeout> | undefined;

function getLoadingEl(): HTMLElement | null {
    return document.getElementById("loading");
}

function showLoading() {
    const el = getLoadingEl();
    if (!el) return;

    el.classList.remove("hidden");
    el.style.opacity = "1";
}

function hideLoading() {
    const el = getLoadingEl();
    if (!el) return;

    el.style.opacity = "0";

    window.setTimeout(() => {
        el.classList.add("hidden");
    }, 300);
}

window.addEventListener("resize", () => {
    showLoading();

    if (resizeTimeout) {
        clearTimeout(resizeTimeout);
    }

    resizeTimeout = setTimeout(() => {
        hideLoading();
    }, 300);
});

interface SliderModule {
    loadSlider: () => Promise<void>;
}

interface AmazingModule {
    loadAmazingProduct: () => Promise<void>;
}
interface FreshProModule {
    loadFreshProduct: () => Promise<void>;
}

interface PostsModule {
    loadPosts: () => Promise<void>;
}

interface HeroBannersModule {
    loadHeroBanners: () => Promise<void>;
}

interface CampaignBannersModule {
    loadCampaignBanners: () => Promise<void>;
}

interface PromoBannersModule {
    loadPromoBanners: () => Promise<void>;
}

type UpdateTextFn = () => void;

export const loadAppWithLoading = async (
    slider: SliderModule,
    amazingpro: AmazingModule,
    updateText: UpdateTextFn,
    posts: PostsModule,
    heroBanners: HeroBannersModule,
    campaignBanners: CampaignBannersModule,
    promoBanners: PromoBannersModule,
    freshPro: FreshProModule
): Promise<void> => {
    showLoading();
    await new Promise(requestAnimationFrame);
    try {
        await Promise.allSettled([
            slider.loadSlider(),
            amazingpro.loadAmazingProduct(),
            freshPro.loadFreshProduct(),
            heroBanners.loadHeroBanners(),
            campaignBanners.loadCampaignBanners(),
            promoBanners.loadPromoBanners(),
            posts.loadPosts(),
        ]);
        updateText();
    } catch (err) {
        console.error("Error loading app:", err);
    } finally {
        await new Promise(requestAnimationFrame);
        hideLoading();
    }
};