import { BASE_URL } from '@/config';

export interface ImageData {
    desktop: string;
    mobile: string;
    alt: string;
    title: string;
}

export interface LogoData {
    images: ImageData;
}

/* ---------------- fetchLogo ---------------- */
const fetchLogo = async (): Promise<ImageData> => {
    const response = await fetch(`${BASE_URL}/data/Header/header.json`);

    if (!response.ok) {
        throw new Error('Failed to fetch header.json');
    }

    const data = await response.json();
    return data.header.company.logo;
};

/* ---------------- getLogoImageHTML ---------------- */
const getLogoImageHTML = (images: ImageData, alt: string): string => {
    const isDesktop = window.innerWidth >= 1024;
    const src = isDesktop ? images.desktop : images.mobile;
    const style = isDesktop ? "h-full w-full" : "h-10 w-32";

    return `<img class="${style}" src="${src}" alt="${alt}" />`;
};

/* ---------------- render function (NEW) ---------------- */
const renderLogoSection = async (container: HTMLElement) => {
    const logo = await fetchLogo();

    const isDesktop = window.innerWidth >= 1024;
    const wrapperClass = isDesktop ? "lg:block lg:w-48" : "hidden";

    container.innerHTML = `
        <div class="${wrapperClass}">
            ${getLogoImageHTML(logo, logo.alt)}
        </div>
    `;
};

/* ---------------- default export ---------------- */
export default function initLogoSection(containerId: string): void {
    const container = document.getElementById(containerId);
    if (!container) return;

    let resizeTimeout: number;

    const render = () => renderLogoSection(container);

    // initial render
    render();

    // resize handling (debounced)
    window.addEventListener("resize", () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = window.setTimeout(() => {
            render();
        }, 150);
    });
}