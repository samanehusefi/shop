import { BASE_URL } from '@/config';

export interface ImageData {
    desktop: string;
    mobile: string;
}

export interface SliderData {
    id: number;
    title: string;
    description: string;
    priority: number;
    url: string;
    alt: string;
    images: ImageData;
    active: boolean;
}

type SwiperContainerEl = HTMLElement & {
    swiper?: any;
    initialize?: () => void;
};

const sliderConfig = {
    loop: true,
    centeredSlides: true,
    spaceBetween: 30,
    observer: true,
    observeParents: true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    pagination: {
        clickable: true,
    },
};

/* ---------------- state ---------------- */
let sliderItems: SliderData[] = [];
let resizeTimeout: number;
let resizeBound = false;

/* ---------------- fetch only once ---------------- */
const fetchSlider = async (): Promise<SliderData[]> => {
    const response = await fetch(`${BASE_URL}/data/SliderData/slider.json`);
    if (!response.ok) throw new Error('Failed to fetch slider.json');

    const data = await response.json();
    return (data || []).sort((a: SliderData, b: SliderData) => a.priority - b.priority);
};

/* ---------------- image ---------------- */
const getSlideImageHTML = (images: ImageData, alt: string): string => {
    const isDesktop = window.innerWidth >= 1024;
    const src = isDesktop ? images.desktop : images.mobile;

    return `<img class="w-full h-full object-cover" src="${src}" alt="${alt}" />`;
};

/* ---------------- slides ---------------- */
const createSlides = (items: SliderData[]) =>
    items
        .filter(sl => sl.active)
        .map(sl => `
            <swiper-slide class="relative w-full h-full">
                <div class="h-full w-full overflow-hidden">
                    ${getSlideImageHTML(sl.images, sl.alt)}
                </div>

                <div class="hidden lg:block absolute right-4 top-1/4 opacity-80 w-1/3 rounded-2xl p-3 bg-gray-700 text-white">
                    <div>${sl.title}</div>
                    <div>${sl.description}</div>
                </div>
            </swiper-slide>
        `)
        .join('');

/* ---------------- render ---------------- */
const renderSlider = (slider: SwiperContainerEl) => {
    slider.innerHTML = createSlides(sliderItems);

    if (slider.swiper) {
        slider.swiper.destroy(true, true);
    }

    Object.assign(slider, sliderConfig);

    requestAnimationFrame(() => {
        slider.initialize?.();
    });
};

/* ---------------- reinit only ---------------- */
const reinitSlider = () => {
    const slider = document.querySelector<SwiperContainerEl>('.mySwiper');
    if (!slider) return;

    renderSlider(slider);
};

/* ---------------- main ---------------- */
export const loadSlider = async (): Promise<void> => {
    try {
        sliderItems = await fetchSlider();

        const slider = document.querySelector<SwiperContainerEl>('.mySwiper');
        if (!slider) return;

        renderSlider(slider);

        // bind resize once
        if (!resizeBound) {
            resizeBound = true;

            window.addEventListener("resize", () => {
                clearTimeout(resizeTimeout);

                resizeTimeout = window.setTimeout(() => {
                    reinitSlider();
                }, 200);
            });
        }

    } catch (err) {
        console.error(err);
    }
};

export default { loadSlider };