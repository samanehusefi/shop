import { BASE_URL, ASSETS } from '@/config';

export interface CategoriesData {
    id: number;
    title: string;
    url: string;
    priority: number;
    src: string;
}

/* ---------------- fetch ---------------- */
const fetchCategories = async (): Promise<CategoriesData[]> => {
    const response = await fetch(
        `${BASE_URL}/data/ProductData/produc_group.json`
    );

    if (!response.ok) {
        throw new Error('Failed to fetch produc_group.json');
    }

    const data = await response.json();

    return (data.categories || []).sort(
        (a: CategoriesData, b: CategoriesData) =>
            a.priority - b.priority
    );
};

/* ---------------- responsive config ---------------- */
const getCols = () => {
    const width = window.innerWidth;

    if (width < 640) return 4;
    if (width < 768) return 5;
    if (width < 1024) return 6;
    return 8;
};

const getPageSize = () => getCols() * 2;

/* ---------------- render ---------------- */
const createCategories = (items: CategoriesData[]): string => {
    const pageSize = getPageSize();
    const cols = getCols();

    const slides: string[] = [];

    for (let i = 0; i < items.length; i += pageSize) {
        const page = items.slice(i, i + pageSize);

        const gridClass =
            cols === 4
                ? 'grid-cols-4'
                : cols === 5
                    ? 'grid-cols-5'
                    : cols === 6
                        ? 'grid-cols-6'
                        : 'grid-cols-8';

        slides.push(`
<swiper-slide class="!w-full">
    <div class="grid ${gridClass} gap-y-6 gap-x-4 px-4 w-full">
        ${page.map(cat => `
            <a href="${cat.url}" class="flex flex-col items-center h-full">
                <div class="relative w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full bg-gray-100 border overflow-hidden flex-shrink-0">
                    <img src="${ASSETS.waitingImage}" class="image-placeholder absolute inset-0 w-full h-full object-contain animate-pulse" />
                    <img data-src="${cat.src}" class="cat-image w-full h-full object-contain opacity-0 transition-opacity duration-300" />
                </div>

                <span class="mt-2 text-[10px] sm:text-xs text-center leading-4 min-h-[32px] flex items-start justify-center">
                    ${cat.title}
                </span>
            </a>
        `).join('')}
    </div>
</swiper-slide>
        `);
    }

    return slides.join('');
};

/* ---------------- init images ---------------- */
export const initCategoriesImages = (container: Element): void => {
    const images = container.querySelectorAll<HTMLImageElement>('.cat-image');

    images.forEach(img => {
        const placeholder = img.parentElement?.querySelector('.image-placeholder');

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

            img.addEventListener('error', () => {
                placeholder?.remove();
                img.src = '/images/no-image.webp';
                img.classList.remove('opacity-0');
            }, { once: true });
        }
    });
};
let resizeTimer: any;
/* ---------------- load ---------------- */
export const loadCategories = async (): Promise<void> => {
    const container = document.querySelector('swiper-container.categories-swiper') as any;
    if (!container) return;

    try {
        const categories = await fetchCategories();

        await customElements.whenDefined('swiper-container');

        const firstInit = !container.initialized;

        container.innerHTML = createCategories(categories);

        requestAnimationFrame(() => {
            if (firstInit) {
                container.initialize?.();
            }

            container.swiper?.update?.();
            container.swiper?.updateSize?.();
            container.swiper?.updateSlides?.();

            initCategoriesImages(container);
        });
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);

            resizeTimer = setTimeout(async () => {
                const container = document.querySelector('swiper-container.categories-swiper') as any;
                if (!container) return;

                const categories = await fetchCategories();

                container.innerHTML = createCategories(categories);

                requestAnimationFrame(() => {
                    container.swiper?.update?.();
                    container.swiper?.updateSize?.();
                    container.swiper?.updateSlides?.();
                });

                initCategoriesImages(container);
            }, 150);
        });
    } catch (e) {
        console.error(e);
    }
};

export default { loadCategories };