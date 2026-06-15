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
    campaign_banners: BannersData[];
};
/* ---------------- fetch Banners ---------------- */
const fetchBanner = async (): Promise<BannersData[]> => {
    const response = await fetch(`${BASE_URL}/data/BannersData/banners.json`);
    if (!response.ok) {
        throw new Error('Failed to fetch banners.json');
    }

    const data: BannersResponse = await response.json();
    const campaign_banners: BannersData[] = data.campaign_banners ?? [];

    return campaign_banners
        .sort((a, b) => a.priority - b.priority)
        ;
};

/* ---------------- render Banners ---------------- */
const renderbanners = (campaign_banners: BannersData[]): string => {
    return campaign_banners
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
export const loadCampaignBanners = async (): Promise<void> => {
    const container = document.querySelector('#campaign_banner_list');

    if (!container) {
        console.error('Container ".banner_list" not found');
        return;
    }

    // show skeleton first
    // container.innerHTML = renderSkeleton();

    try {
        const campaign_banners = await fetchBanner();
        container.innerHTML = renderbanners(campaign_banners);

        initBannerImages(container);
    } catch (error) {
        console.error('Failed to loadCampaignBanners:', error);
        container.innerHTML = 'Error loadCampaignBanners.';
    }
};

export default { loadCampaignBanners };