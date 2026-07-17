import { BASE_URL } from '@/config.ts';

export interface BrandsData {
    id: number;
    title_fa: string;
    title_en: string;
    visibility: boolean,
    is_premium: boolean,
    is_miscellaneous: boolean,
    is_name_similar: boolean,
    url: string;
    priority: number;
    src: string;
}

/* ---------------- fetch ---------------- */
const fetchBrands = async (): Promise<BrandsData[]> => {
    const response = await fetch(
        `${BASE_URL}/data/BerandsData/brands.json`
    );

    if (!response.ok) {
        throw new Error('Failed to fetch brands.json');
    }

    const data = await response.json();

    return (data.brands || [])
        .filter((item: BrandsData) => item.is_premium===true && item.visibility === true)
        .sort(
        (a: BrandsData, b: BrandsData) =>
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

const getPageSize = () => getCols() ;

/* ---------------- render ---------------- */
const createBrands = (items: BrandsData[]): string => {
    const pageSize = getPageSize();
    const cols = getCols();

    const gridClass =
        cols === 4
            ? 'grid-cols-4'
            : cols === 5
                ? 'grid-cols-5'
                : cols === 6
                    ? 'grid-cols-6'
                    : 'grid-cols-8';

    const slides: string[] = [];

    for (let i = 0; i < items.length; i += pageSize) {
        const page = items.slice(i, i + pageSize);

        slides.push(`
<swiper-slide class="!w-full">
  <div class="grid ${gridClass} divide-x  divide-gray-100 w-full">

    ${page.map(brand => `
      <a href="${brand.url}" class="flex flex-col items-center justify-center py-6 group">

        <img 
          src="${brand.src}" 
          loading="lazy"
          class="w-12 h-12 sm:w-14 sm:h-14 object-contain"
        />

        <span class="mt-2 text-[11px] sm:text-xs text-center text-gray-700 line-clamp-1">
          ${brand.title_fa}
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
export const initBrandsImages = (container: Element): void => {
    const images = container.querySelectorAll<HTMLImageElement>('.brands-image');

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
export const loadBrands = async (): Promise<void> => {
    const container = document.querySelector('swiper-container.brands-swiper') as any;
    if (!container) return;

    try {
        const Brands = await fetchBrands();

        await customElements.whenDefined('swiper-container');

        const firstInit = !container.initialized;

        container.innerHTML = createBrands(Brands);

        requestAnimationFrame(() => {
            if (firstInit) {
                container.initialize?.();
            }

            container.swiper?.update?.();
            container.swiper?.updateSize?.();
            container.swiper?.updateSlides?.();

            initBrandsImages(container);
        });
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);

            resizeTimer = setTimeout(async () => {
                const container = document.querySelector('swiper-container.brands-swiper') as any;
                if (!container) return;

                const brands = await fetchBrands();

                container.innerHTML = createBrands(brands);

                requestAnimationFrame(() => {
                    container.swiper?.update?.();
                    container.swiper?.updateSize?.();
                    container.swiper?.updateSlides?.();
                });

                initBrandsImages(container);
            }, 150);
        });
    } catch (e) {
        console.error(e);
    }
};

export default { loadBrands };