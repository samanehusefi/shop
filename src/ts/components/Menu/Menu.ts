export interface DataMenu {
    id: number;
    title: string;
    priority: number;
    url: string;
    type: "normalMenu" | "subMenu";
    submenu: DataMenu[];
    mega: boolean;
}

// ----------SortMenu ----------
const sortMenu = (items: DataMenu[]): DataMenu[] => {
    return items
        .sort((a, b) => a.priority - b.priority)
        .map(item => ({
            ...item,
            submenu: sortMenu(item.submenu)
        }));
};

// ----------Desktop ----------
export const createDesktopMenuHTML = (items: DataMenu[]): string => {
    return items.map(item => {
        if (item.submenu && item.submenu.length > 0) {
            if (item.mega) {
                return `
                <li class="relative group">
                    <a class="cursor-pointer px-4 py-2 hover:text-red-600 hover:bg-transparent">${item.title}</a>
          <div class="hidden lg:absolute lg:top-full lg:right-0 lg:w-[80vw] lg:max-h-[80vh] lg:overflow-auto lg:group-hover:block bg-base-100 shadow-lg p-4 z-50">
             <ul class="flex flex-wrap gap-3 list-none p-0 m-0 !border-0 hover:border-0">
                            ${item.submenu.map(sub => `
                                <li class="w-[24%] flex flex-col">
                                    <a href="${sub.url}" class="bg-gray-200  p-2 rounded mb-2 hover:text-red-600">${sub.title}</a>
                                    <ul class="flex flex-col gap-1 bg-gray-100 list-none p-0 m-0 !border-0 rounded">
                                        ${sub.submenu.map(subSub => `
                                            <li>
                                                <a href="${subSub.url}" class="block px-2 py-1 hover:text-red-600">${subSub.title}</a>
                                            </li>
                                        `).join("")}
                                    </ul>
                                </li>
                            `).join("")}
                        </ul>
                    </div>
                </li>
                `;
            } else {
                return `
                <li>
                    <details class="group">
                        <summary class="cursor-pointer px-4 py-2 hover:text-red-600 hover:bg-transparent">${item.title}</summary>
                        <ul class="p-2 bg-base-100 w-40 z-10 list-none !border-0">
                            ${createDesktopMenuHTML(item.submenu)}
                        </ul>
                    </details>
                </li>
                `;
            }
        } else {
            return `<li><a href="${item.url}" class="px-4 py-2 hover:text-red-600 hover:bg-transparent">${item.title}</a></li>`;
        }
    }).join("");
};

export const createMobileMenuHTML = (items: DataMenu[]): string => {
    return items.map(item => {
        if (item.submenu && item.submenu.length > 0) {
            return `
            <li class="w-full">
                <details>
                    <summary class="px-4 py-2 hover:text-red-600">
                        ${item.title}
                    </summary>
                    <ul class="pl-4 w-full">
                        ${createMobileMenuHTML(item.submenu)}
                    </ul>
                </details>
            </li>
            `;
        } else {
            return `
            <li class="w-full">
                <a href="${item.url}" class="px-4 py-2 hover:text-red-600">
                    ${item.title}
                </a>
            </li>
            `;
        }
    }).join("");
};

const btnClose = document.getElementById("mobileMenuCloseBtn");

btnClose?.addEventListener("click", () => {
    drawer?.classList.add("translate-x-full");
    overlay?.classList.add("opacity-0", "pointer-events-none");
});

export const loadDesktopMenu = async (): Promise<void> => {
    try {
        const response = await fetch("/data/menu.json");
        if (!response.ok) throw new Error("Failed to fetch menu.json");

        const res = await response.json();
        const menus: DataMenu[] = sortMenu(res.menu);

        const container = document.querySelector(".menu-desktop ul");
        if (!container) throw new Error("Desktop menu container not found");

        container.innerHTML = createDesktopMenuHTML(menus);
    } catch (error) {
        console.error(error);
    }
};

export const loadMobileMenu = async (): Promise<void> => {
    try {
        const response = await fetch("/data/menu.json");
        if (!response.ok) throw new Error("Failed to fetch menu.json");

        const res = await response.json();
        const menus: DataMenu[] = sortMenu(res.menu);

        const container = document.querySelector(".menu-mobile ul");
        if (!container) throw new Error("Mobile menu container not found");

        container.insertAdjacentHTML("beforeend", createMobileMenuHTML(menus));
    } catch (error) {
        console.error(error);
    }
};

export default { loadDesktopMenu, loadMobileMenu };
const btn = document.getElementById("mobileMenuBtn");
const drawer = document.getElementById("mobileMenuDrawer");
const overlay = document.getElementById("mobileMenuOverlay");

btn?.addEventListener("click", () => {
    drawer?.classList.remove("translate-x-full");
    overlay?.classList.remove("opacity-0", "pointer-events-none");
});

overlay?.addEventListener("click", () => {
    drawer?.classList.add("translate-x-full");
    overlay?.classList.add("opacity-0", "pointer-events-none");
});
