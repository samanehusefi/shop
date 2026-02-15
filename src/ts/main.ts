import "@/css/main.css";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { register } from 'swiper/element/bundle';
import menu from "@/ts/components/Menu/Menu.ts";
import slider from "@/ts/components/Slider/Slider.ts";
import { loadAppWithLoading } from "@/ts/components/Loading/Loading.ts";
register()
window.addEventListener("DOMContentLoaded", () => {
    loadAppWithLoading(menu, slider);
});

