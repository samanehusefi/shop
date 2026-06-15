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
    const response = await fetch(`${BASE_URL}/data/ProductData/products.json`);
    if (!response.ok) throw new Error('Failed to fetch Products.json');

    const data = await response.json();
    return (data || []).sort(
        (a: ProductData, b: ProductData) => a.priority - b.priority
    );
};

/* ---------------- format Price ---------------- */
const formatPrice = (
    value: number | string
): string => {
    const num = Number(
        String(value).replace(/,/g, '')
    );

    if (isNaN(num)) return '';

    return `${num.toLocaleString('fa-IR')} تومان`;
};
const toFaNumber = (value: number | string): string =>
    Number(value).toLocaleString('fa-IR');

function calculateFinalPrice(
    price: number | string,
    discount: number
): number {
    const numericPrice = Number(
        String(price).replace(/,/g, '')
    );

    return Math.round(
        numericPrice -
        (numericPrice * discount) / 100
    );
}
/* ---------------- render Skeleton---------------- */
const createfreshSkeleton = (count = 10) =>
    Array.from({ length: count })
        .map(
            (_, index) => `
<swiper-slide class="h-full !bg-white ${
                index === 0 ? 'rounded-tr-xl rounded-br-xl' : ''
            }">
    <div class="h-[250px] flex flex-col items-center justify-center px-3 animate-pulse">

        <!-- image -->
        <div class="w-32 h-32 bg-gray-200 rounded-lg"></div>

        <!-- title -->
        <div class="mt-3 w-full space-y-2">
            <div class="h-3 bg-gray-200 rounded w-full"></div>
            <div class="h-3 bg-gray-200 rounded w-5/6 mx-auto"></div>
            <div class="h-3 bg-gray-200 rounded w-4/6 mx-auto"></div>
        </div>

        <!-- discount -->
        <div class="mt-4 h-5 w-12 bg-gray-200 rounded-full"></div>

        <!-- price -->
        <div class="mt-3 h-4 w-24 bg-gray-200 rounded"></div>

        <!-- old price -->
        <div class="mt-2 h-3 w-20 bg-gray-200 rounded"></div>

    </div>
</swiper-slide>
`
        )
        .join('');
/* ---------------- render ---------------- */
const createFreshProduct = (items: ProductData[]) =>
    items
        .filter(pro => pro.is_fresh)
        .slice(0, 10)
        .map((pro, index) => {
            return `
<swiper-slide class="h-full !bg-white ${
                index === 0 ? 'rounded-tr-xl rounded-br-xl' : ''
            }">

    <div class="h-[250px] flex flex-col items-center justify-center ">
    <div class="flex w-32 h-32 px-1 py-1">
        <img
    src="${ASSETS.waitingImage}"
    class="image-placeholder flex inset-0  w-full h-32 px-2 py-2 object-contain rounded-lg animate-pulse"
    alt="Waiting for image"
/>
            <img
                 src="${pro.image}"
                 class="productFresh-image w-full h-full object-fill px-1 py-1 opacity-0 
                        transition-opacity duration-300"
                 alt="${pro.brand}"
                 title="${pro.brand}">
    </div>

        <p class="mt-2 text-xs text-center line-clamp-3 h-40 md:h-56 px-2">
            ${pro.title}
        </p>

        <div class="h-[250px] md:h-[190px] mt-2  flex flex-col items-center justify-center">
            <span class="bg-red-500 text-white text-xs px-2 rounded-full">
                ${toFaNumber(pro.discount)}%
            </span>

            <span class="font-bold text-xs md:text-md mt-2">
                ${formatPrice(
                calculateFinalPrice(Number(pro.price), pro.discount)
            )}
            </span>
        </div>

        <del class="text-gray-400 text-xs mt-1">
            ${formatPrice(pro.price)}
        </del>

    </div>

</swiper-slide>
`;
        })
        .join('') +
    `<swiper-slide class="h-[250px] md:h-full rounded-tl-xl rounded-bl-2xl !bg-white ml-4 px-2">
        <a href="https://www.digikala.com/incredible-offers/"
           class="h-full flex items-center justify-center">
            مشاهده همه →
        </a>
    </swiper-slide>`;

/* ---------------- loader ---------------- */
type SwiperElement = HTMLElement & {
    swiper?: {
        update: () => void;
    };
};
/* ---------------- initProductImages ---------------- */
export const initProductImages = (container: Element) => {
    const images =
        container.querySelectorAll<HTMLImageElement>('.productFresh-image');

    images.forEach((img) => {
        const placeholder =
            img.parentElement?.querySelector('.image-placeholder');

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
/* ---------------- loadFreshProduct ---------------- */
export const loadFreshProduct = async (): Promise<void> => {
    const el = document.querySelector<SwiperElement>(
        'swiper-container.fresh-products'
    );
    if (!el) return;

    el.innerHTML = createfreshSkeleton();
    el.swiper?.update();

    await new Promise(requestAnimationFrame);

    try {
        const data = await fetchProduct();

        await new Promise(res => setTimeout(res, 250));

        el.innerHTML = createFreshProduct(data);

        initProductImages(el);

        el.swiper?.update();
    } catch (e) {
        console.error('Failed to load fresh products:', e);
    }
};
export default { loadFreshProduct };