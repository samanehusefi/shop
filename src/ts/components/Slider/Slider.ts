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

const sortSlider = (items: SliderData[]): SliderData[] =>
    items.sort((a, b) => a.priority - b.priority);

const fetchSlider = async (): Promise<SliderData[]> => {
    const response = await fetch(`${BASE_URL}/data/slider.json`);
    if (!response.ok) throw new Error('Failed to fetch slider.json');
    const data = await response.json();
    return sortSlider(data || []);
};
const getSlideImageHTML = (images: ImageData, alt: string): string => {
    const isDesktop = window.innerWidth >= 1024;
    const src = isDesktop ? images.desktop : images.mobile;

    return `<img class="w-full h-full object-cover" src="${src}" alt="${alt}" />`;
};
const CreateSliderElements = (items: SliderData[]): string =>

    items.filter(sl => sl.active)
        .map(
            sl => `
        <swiper-slide class="relative w-full h-full">
          <div class="h-full w-full">
         ${getSlideImageHTML(sl.images, sl.alt)}
          </div>
          <div class="hidden h-40 lg:block absolute right-4 top-1/4 w-1/3 rounded-2xl p-3 bg-gray-700 text-white">
            <div class="title" data-swiper-parallax="-300">${sl.title}</div>
            <div class="text" data-swiper-parallax="-100">${sl.description}</div>
          </div>
        </swiper-slide>
      `
        )
        .join('');

export const loadSlider = async (): Promise<void> => {
    try {
        const sliderItems = await fetchSlider();
        const sliderBox = document.querySelector('.mySwiper');
        if (!sliderBox) return;
        sliderBox.innerHTML = CreateSliderElements(sliderItems);
        const swiperEl = sliderBox as unknown as HTMLElement & { autoplay?: any };
        swiperEl.setAttribute('autoplay', 'true');
        swiperEl.setAttribute('autoplay-delay', '2500');
        swiperEl.setAttribute('loop', 'true');
        swiperEl.setAttribute('centered-slides', 'true');
        swiperEl.setAttribute('space-between', '30');

        // force Swiper to update after dynamic slides
        setTimeout(() => {
            (sliderBox as any).initialize();
        }, 0);
    } catch (error) {
        console.error(error);
    }
};

export default { loadSlider };
