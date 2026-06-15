import {BASE_URL} from '@/config';

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
    top_banners: BannersData[];
};
/* ---------------- fetch Banners ---------------- */
const fetchBanner = async (): Promise<BannersData[]> => {
    const response = await fetch(`${BASE_URL}/data/BannersData/bann.json`);
debugger
    if (!response.ok) {
        throw new Error('Failed to fetch simple_banner.json');
    }

    const data: BannersResponse = await response.json();
    const banners: BannersData[] = data.top_banners ?? [];

    return banners
        .sort((a, b) => a.priority - b.priority)
   ;
};

/* ---------------- render Banners ---------------- */
const renderbanners = (banners: BannersData[]): string => {
    return banners
        .map((b) => `
            <li class="simple_banner">
                <a href="${b.url}">
                    <img
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

/* ---------------- load Banners ---------------- */
export const loadBanners = async (): Promise<void> => {
    const container = document.querySelector('.banner_list');

    if (!container) {
        console.error('Container ".banner_list" not found');
        return;
    }

    // show skeleton first
   // container.innerHTML = renderSkeleton();

    try {
        const banners = await fetchBanner();
        container.innerHTML = renderbanners(banners);
    } catch (error) {
        console.error('Failed to loadBanners:', error);
        container.innerHTML = 'Error loadBanners.';
    }
};

export default { loadBanners };