

import { BASE_URL } from '@/config';

export interface ImageData {
    main: string;
    desktop: string;
    mobile: string;
}

export interface SliderData {
    id: number;
    title: string;
    description: string;
    priority: number;
    url: string;
    images: ImageData[];
    Active: boolean;
}

const sortSlider = (items: SliderData[]): SliderData[] =>
    items.sort((a, b) => a.priority - b.priority);

const fetchSlider = async (): Promise<SliderData[]> => {
    const response = await fetch(`${BASE_URL}/data/slider.json`);
    if (!response.ok) throw new Error('Failed to fetch slider.json');
    const data = await response.json();
    return sortSlider(data.slider || []);
};

const CreateSliderHTML = (items: SliderData[]): string => `
<div class="swiper">
  <div class="swiper-wrapper">
    ${items.filter(sl => sl.Active).map(sl => `
      <div class="swiper-slide relative">
        <img src="${sl.images[0].desktop}" class="w-full" />
        <div class="absolute top-0 left-0 p-4 text-white">
          <div class="title text-2xl font-bold" data-swiper-parallax="-300">${sl.title}</div>
          <div class="text" data-swiper-parallax="-100">
            <p>${sl.description}</p>
          </div>
        </div>
      </div>
    `).join('')}
  </div>
  <div class="swiper-button-next text-white"></div>
  <div class="swiper-button-prev text-white"></div>
  <div class="swiper-pagination"></div>
</div>
`;

export const loadSlider = async (): Promise<void> => {
    try {
        const sliderItems = await fetchSlider();
        const sliderBox = document.querySelector('.slider');
        if (!sliderBox) return;
        sliderBox.innerHTML = CreateSliderHTML(sliderItems);

    } catch (error) {
        console.error(error);
    }
};

export default { loadSlider };
