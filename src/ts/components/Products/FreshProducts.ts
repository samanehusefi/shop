import { BASE_URL, ASSETS } from '@/config';

export interface ProductData {
    productId: number;
    title: string;
    title_fa: string;
    category: string;
    category_fa: string;
    brand: string;
    url: string;
    price: string;
    priority: number;
    discount: number;
    is_amazing: boolean;
    is_fresh: boolean;
    image: string;
    discount_amount: string;
}

/* ---------------- fetch ---------------- */
const fetchProduct = async (): Promise<ProductData[]> => {
    const response = await fetch(
        `${BASE_URL}/data/ProductData/products.json`
    );

    if (!response.ok) {
        throw new Error('Failed to fetch Products.json');
    }

    const data = await response.json();

    return (data || []).sort(
        (a: ProductData, b: ProductData) =>
            a.priority - b.priority
    );
};

/* ---------------- render ---------------- */
const createFreshProduct = (items: ProductData[]) =>
    items
        .filter((pro) => pro.is_fresh)
        .slice(0, 10)
        .map(
            (pro) => `
                <div class="relative">
<div class="relative h-20 w-20 overflow-hidden rounded-full bg-white flex items-center justify-center">
                 <a href="#" class=" h-full w-full flex items-center justify-center">
                        <img
                            src="${ASSETS.waitingImage}"
                            class="image-placeholder absolute inset-0 h-full w-full object-contain animate-pulse"
                            alt="Loading"
                        />
                         <img
                             data-src="${pro.image}"
                             class="product-image w-14 h-14 object-contain opacity-0 transition-opacity duration-300"
                             alt="${pro.title_fa}"/>
                    </div>
                    <span  class="absolute bottom-0 right-0 rounded-full bg-red-600 px-2 py-0.5 text-xs text-white">
                             ${pro.discount}%
                    </span>
</a>
                </div>
            `
        )
        .join('');

/* ---------------- init images ---------------- */
export const initProductImages = (
    container: Element
): void => {
    const images =
        container.querySelectorAll<HTMLImageElement>(
            '.product-image'
        );

    images.forEach((img) => {
        const placeholder =
            img.parentElement?.querySelector(
                '.image-placeholder'
            );

        const showImage = () => {
            img.classList.remove('opacity-0');
            placeholder?.remove();
        };

        const src = img.dataset.src;

        if (src) {
            img.src = src;
        }

        if (img.complete && img.naturalWidth > 0) {
            showImage();
        } else {
            img.addEventListener(
                'load',
                showImage,
                { once: true }
            );

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

/* ---------------- load ---------------- */
export const loadFreshProduct =
    async (): Promise<void> => {
        const container = document.querySelector(
            '.fresh_product-list'
        );

        if (!container) {
            console.error(
                'Container ".fresh_product-list" not found'
            );
            return;
        }

        try {
            const products = await fetchProduct();

            container.innerHTML =
                createFreshProduct(products);

            initProductImages(container);
        } catch (error) {
            console.error(
                'Failed to load products:',
                error
            );

            container.innerHTML =
                'Error loading products.';
        }
    };

export default { loadFreshProduct };