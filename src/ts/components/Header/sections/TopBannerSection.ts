import {BASE_URL} from '@/config';
export interface ImageData {
    desktop: string;
    mobile: string;
}
export interface BannerData {
    id: number;
    title: string;
    priority: number;
    url: string;
    alt: string;
    images: ImageData;
    active: boolean;
}

/* ---------------- sortBanner ---------------- */
const sortBanner = (items: BannerData[]): BannerData[] =>
    items.sort((a, b) => a.priority - b.priority);
/* ---------------- fetchBanner ---------------- */
const fetchBanner = async (): Promise<BannerData[]> => {
    const response = await fetch(`${BASE_URL}/data/Header/banner.json`);
    if (!response.ok) throw new Error('Failed to fetch banner.json');
    const data = await response.json();
    return sortBanner(data.banner || []);
};
/* ---------------- getBannerImageHTML ---------------- */
const getBannerImageHTML = (images: ImageData, alt: string): string => {
    const isDesktop = window.innerWidth >= 1024;
    const src = isDesktop ? images.desktop : images.mobile;
    return `<img class="w-full h-full object-cover" src="${src}" alt="${alt}" />`;
};



export  default async function topBannerSection():Promise<string>  {
    const banner = await fetchBanner();
    const renderBanner   = banner.filter(sl => sl.active).map(b =>`
   <div id="topBanner"
     class="top-nav bg-gray-200 z-40 relative transition-all duration-300 overflow-hidden">
            ${getBannerImageHTML(b.images, b.alt)}
        </div>
        `
    ).join('');
   return`
       ${renderBanner}
     `;
}


