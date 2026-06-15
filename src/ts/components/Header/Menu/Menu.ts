import { BASE_URL } from '@/config.ts';

export interface DataMenu {
    id: number;
    title: string;
    priority: number;
    url: string;
    type: 'normalMenu' | 'subMenu';
    submenu: DataMenu[];
    mega: boolean;
}

// ---------------- Sort Menu ----------------
const sortMenu = (items: DataMenu[]): DataMenu[] =>
    items
        .sort((a, b) => a.priority - b.priority)
        .map(item => ({
            ...item,
            submenu: sortMenu(item.submenu || [])
        }));

// ---------------- Fetch Menu ----------------
const fetchMenu = async (): Promise<DataMenu[]> => {
    const response = await fetch(`${BASE_URL}/data/Header/menu.json`);
    if (!response.ok) throw new Error('Failed to fetch menu.json');

    const data = await response.json();
    return sortMenu(data.menu || []);
};

// ---------------- Desktop HTML ----------------
const createDesktopMenuHTML = (items: DataMenu[]): string =>
    items.map(item => {

        const submenu = Array.isArray(item.submenu) ? item.submenu : [];
        const hasSubmenu = submenu.length > 0;

        const chevron = hasSubmenu
            ? `<svg class="w-3 h-3 inline-block ml-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"></path>
               </svg>`
            : '';

        if (!hasSubmenu) {
            return `
                <li class="desktop-item">
                    <a href="${item.url}" class="px-4 py-2 hover:text-red-600 hover:bg-transparent">
                        ${item.title}
                    </a>
                </li>
            `;
        }

        if (item.mega) {
            return `
                <li class="relative group desktop-item">
                    <a class="cursor-pointer px-4 py-2 hover:text-red-600">
                        ${item.title} ${chevron}
                    </a>

                    <div class="hidden lg:absolute lg:top-full lg:right-0 lg:w-[80vw] lg:max-h-[70vh] lg:overflow-auto lg:group-hover:block bg-base-100 shadow-lg p-4 z-50">

                        <ul class="flex flex-wrap gap-3">

                            ${submenu.map(sub => {

                const subSubmenu = Array.isArray(sub.submenu) ? sub.submenu : [];

                return `
                                    <li class="w-[24%] flex flex-col">

                                        <a href="${sub.url}" class="bg-gray-200 p-2 rounded mb-2 hover:text-red-600">
                                            ${sub.title}
                                        </a>

                                        <ul class="bg-gray-100 rounded p-2">
                                            ${subSubmenu.map(subSub => `
                                                <li>
                                                    <a href="${subSub.url}" class="block py-1 hover:text-red-600">
                                                        ${subSub.title}
                                                    </a>
                                                </li>
                                            `).join('')}
                                        </ul>

                                    </li>
                                `;
            }).join('')}

                        </ul>

                    </div>
                </li>
            `;



        }

        return `
            <li class="desktop-item">
                <details class="group">
                    <summary class="cursor-pointer px-4 py-2 hover:text-red-600 hover:bg-transparent">
                        ${item.title} ${chevron}
                    </summary>

                    <ul class="p-2 bg-base-100 w-40 z-10 list-none !border-0">
                        ${createDesktopMenuHTML(submenu)}
                    </ul>
                </details>
            </li>
        `;
    }).join('');
// ---------------- Mobile HTML ----------------
const createMobileMenuHTML = (items: DataMenu[]): string =>
    items.map(item => {

        const hasSubmenu = item.submenu?.length > 0;

        if (hasSubmenu) {
            return `
                <li class="mobile-item w-full">
                    <details>
                        <summary class="hover:text-red-600">
                            ${item.title}
                        </summary>

                        <ul class="pl-4">
                            ${createMobileMenuHTML(item.submenu)}
                        </ul>
                    </details>
                </li>
            `;
        }

        return `
            <li class="mobile-item w-full">
                <a href="${item.url}" class="hover:text-red-600">
                    ${item.title}
                </a>
            </li>
        `;
    }).join('');

// ---------------- Drawer ----------------
export const initMobileDrawer = () => {
    const drawer = document.getElementById("mobileMenuDrawer");
    const overlay = document.getElementById("mobileMenuOverlay");
    const btnOpen = document.getElementById("mobileMenuBtn");
    const btnClose = document.getElementById("mobileMenuCloseBtn");

    if (!drawer || !overlay || !btnOpen || !btnClose) return;

    const open = () => {
        drawer.classList.remove("translate-x-full");
        overlay.classList.remove("opacity-0", "pointer-events-none");
    };

    const close = () => {
        drawer.classList.add("translate-x-full");
        overlay.classList.add("opacity-0", "pointer-events-none");
    };

    btnOpen.addEventListener("click", open);
    btnClose.addEventListener("click", close);
    overlay.addEventListener("click", close);

    window.addEventListener("resize", () => {
        if (window.innerWidth >= 1024) close();
    });
};

// ---------------- Navbar Scroll ----------------
export const initNavbarScroll = () => {

    const navbar = document.querySelector<HTMLElement>('#navbar');
    const topBanner = document.querySelector<HTMLElement>('#topBanner');
    const navbarTop = document.querySelector<HTMLElement>('#navbarTop');
    const spacer = document.querySelector<HTMLElement>('#navbarSpacer');

    if (!navbar || !spacer) return;

    const SCROLL_LIMIT = 80;

    const update = () => {

        const height = navbar.offsetHeight + 120;

        if (window.scrollY > SCROLL_LIMIT) {

            spacer.style.height = `${height}px`;

            navbar.classList.add('fixed', 'top-0', 'left-0', 'w-full', 'navbar-scrolled');

            topBanner?.classList.add('section-collapse');
            navbarTop?.classList.add('section-collapse');

        } else {

            spacer.style.height = '0px';

            navbar.classList.remove('fixed', 'top-0', 'left-0', 'w-full', 'navbar-scrolled');

            topBanner?.classList.remove('section-collapse');
            navbarTop?.classList.remove('section-collapse');
        }
    };

    update();

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
};

// ---------------- Load Menus ----------------
export const loadDesktopMenu = async (): Promise<void> => {

    const menus = await fetchMenu();

    const container = document.getElementById('desktopMenuList');
    if (!container) return;
    container.innerHTML = createDesktopMenuHTML(menus);
};

export const loadMobileMenu = async (): Promise<void> => {

    const menus = await fetchMenu();

    const container = document.getElementById('mobileMenuList');
    if (!container) return;
    container.innerHTML = createMobileMenuHTML(menus);

};

// ---------------- Export ----------------
export default {
    loadDesktopMenu,
    loadMobileMenu,
    initMobileDrawer,
    initNavbarScroll
};