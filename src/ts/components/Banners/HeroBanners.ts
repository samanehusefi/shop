import { BASE_URL, ASSETS } from '@/config';

export interface BannersData {
    id: number,
    image: string,
    webp_image: string,
    title: string,
    is_ad: boolean,
    url: string,
    is_smart_ads: boolean,
    priority: number
}
type BannersResponse = {
    hero_banners: BannersData[];
};
/* ---------------- fetch Banners ---------------- */
const fetchBanner = async (): Promise<BannersData[]> => {
    const response = await fetch(`${BASE_URL}/data/BannersData/banners.json`);
    if (!response.ok) {
        throw new Error('Failed to fetch banners.json');
    }

    const data: BannersResponse = await response.json();
    const hero_banners: BannersData[] = data.hero_banners ?? [];

    return hero_banners
        .sort((a, b) => a.priority - b.priority)
   ;
};

/* ---------------- render Banners ---------------- */
const renderbanners = (hero_banners: BannersData[]): string => {
    return hero_banners
        .map((b) => `
            <li class="simple_banner">
                <a href="${b.url}">
                       <img
    src="${ASSETS.waitingImage}"
    class="image-placeholder flex inset-0  w-full h-32 px-2 py-2 object-contain rounded-lg animate-pulse"
    alt="Waiting for image"
/>
                    <img class="banner-img"
                        src="${b.webp_image}"
                        alt="${b.title}"
                        loading="lazy"
                        fetchpriority="low"
                    />
                </a>
            </li>
        `)
        .join('');
};
/* ---------------- initBannerImages ---------------- */
const initBannerImages = (container: Element) => {
    const images =
        container.querySelectorAll<HTMLImageElement>('.banner-img');

    images.forEach((img) => {
        const placeholder =
            img.parentElement?.querySelector('.image-placeholder') as HTMLImageElement | null;

        const showImage = () => {
            img.classList.remove('opacity-0');
            placeholder?.remove();
        };

        const src = img.dataset.src;
        if (src) img.src = src;

        if (img.complete && img.naturalWidth > 0) {
            showImage();
        } else {
            img.addEventListener('load', showImage, { once: true });

            img.addEventListener(
                'error',
                () => {
                    placeholder?.remove();
                    img.src = '/images/no-image.webp';
                    img.classList.remove('opacity-0');
                },
                { once: true }
            );
        }
    });
};
/* ---------------- load Banners ---------------- */
export const loadHeroBanners = async (): Promise<void> => {
    const container = document.querySelector('#hero_banner_list');

    if (!container) {
        console.error('Container ".banner_list" not found');
        return;
    }

    // show skeleton first
   // container.innerHTML = renderSkeleton();

    try {
        const hero_banners = await fetchBanner();
        container.innerHTML = renderbanners(hero_banners);
        initBannerImages(container);
    } catch (error) {
        console.error('Failed to loadHeroBanners:', error);
        container.innerHTML = 'Error loadHeroBanners.';
    }
};

export default { loadHeroBanners };