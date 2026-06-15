import { BASE_URL } from "@/config.ts";

// =================== TYPES ===================
type Product = {
    id: number;
    title: string;
    description: string;
    category: string;
    tags: string[];
};

type ProductGroup = {
    id: number;
    title: string;
    url: { uri: string };
    image: string;
};

// =================== FETCH ===================
const fetchProducts = async (): Promise<Product[]> => {
    const response = await fetch(`${BASE_URL}/data/ProductData/products.json`);
    if (!response.ok) throw new Error("Failed products.json");

    const data = await response.json();
    return Array.isArray(data) ? data : (data ?? []);
};

const fetchProductGroups = async (): Promise<ProductGroup[]> => {
    const response = await fetch(`${BASE_URL}/data/ProductData/produc_group.json`);
    if (!response.ok) throw new Error("Failed produc_group.json");

    const data = await response.json();
    return data.categories ?? data.categories ?? [];
};

// =================== UTILS ===================
const normalize = (str: string = "") =>
    str.replace(/\s+/g, "").toLowerCase();

const highlightMatch = (text: string = "", query: string) => {
    const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`(${escaped})`, "gi");
    return text.replace(regex, "<mark>$1</mark>");
};

// =================== SAFE MATCH ===================
const getMatches = <T extends { title?: string; category?: string; category_fa?: string }>(
    items: T[],
    query: string,
    type: "group" | "product"
) => {
    const q = normalize(query);

    return items
        .filter(item => {
            const title = normalize(item.title ?? "");
            const catEn = normalize(item.category ?? "");
            const catFa = normalize(item.category_fa ?? "");

            return (
                title.includes(q) ||
                catEn.includes(q) ||
                catFa.includes(q)
            );
        })
        .map(item => ({ type, item }));
};
// =================== RENDER ===================
function renderResults(
    results: { type: "group" | "product"; item: any }[],
    query: string,
    resultsContainer: HTMLUListElement,
    input: HTMLInputElement
) {
    resultsContainer.innerHTML = "";

    if (!results.length) {
        resultsContainer.classList.remove("hidden");

        const li = document.createElement("li");
        li.className = "p-6 flex flex-col items-center justify-center text-center gap-2 md:p-0";

        li.innerHTML = `
            <img src="./src/assets/icon/SearchNotFound.svg"
                 class="w-60 h-60 opacity-70 md:p-0 md:mt-[-10%]"
                 alt="not found" />

            <p class="text-md text-red-500 absolute top-[300px] md:top-[110px] font-bold">
                نتیجه‌ای یافت نشد
            </p>
        `;

        resultsContainer.appendChild(li);
        return;
    }

    resultsContainer.classList.remove("hidden");
    const groups = results.filter(r => r.type === "group");
    const products = results.filter(r => r.type === "product");

    const createSection = (title: string, items: any[], type: "group" | "product") => {
        if (!items.length) return;

        const header = document.createElement("li");
        header.className = "px-3 py-2 text-md  font-bold text-red-500 bg-gray-50";
        header.textContent = title;

        resultsContainer.appendChild(header);
        items.forEach(({ item }) => {
            const li = document.createElement("li");

            const text = item.title ?? "";

            li.innerHTML = highlightMatch(text, query);
            li.className = "p-2 cursor-pointer hover:bg-gray-100";

            li.addEventListener("click", () => {
                if (type === "group") {
                    window.location.href = item.url?.uri ?? "#";
                } else {
                    window.location.href = `/product/${item.id}`;
                }

                input.value = "";
                resultsContainer.classList.add("hidden");
            });

            resultsContainer.appendChild(li);
        });
    };

    createSection("دسته‌بندی‌ها", groups, "group");
    createSection("محصولات", products, "product");
}
// =================== INIT ===================
export async function initSearch(root: HTMLElement) {
    const input = root.querySelector("#search") as HTMLInputElement;
    const resultsContainer = root.querySelector("#results") as HTMLUListElement;
    const searchIcon = root.querySelector("#searchIcon") as HTMLElement;

    const mobileInput = document.querySelector("#mobileSearchInput") as HTMLInputElement | null;
    const mobileResults = document.querySelector("#mobileResults") as HTMLUListElement | null;

    const mobileIcon = document.getElementById("mobileSearchBtn") as HTMLElement | null;

    const modal = document.getElementById("mobileSearchModal") as HTMLElement | null;
    const sheet = document.getElementById("mobileSearchSheet") as HTMLElement | null;
    const backdrop = document.getElementById("mobileSearchBackdrop") as HTMLElement | null;
    const clearBtn = document.getElementById("clearSearch") as HTMLButtonElement | null;
    const clearMobileBtn = document.getElementById("clearMobileSearch") as HTMLButtonElement | null;
    if (!input || !resultsContainer || !searchIcon) return;

    const [products, groups] = await Promise.all([
        fetchProducts(),
        fetchProductGroups()
    ]);

    let debounceTimeout: ReturnType<typeof setTimeout>;

    function runSearch(
        query: string,
        targetInput: HTMLInputElement,
        targetContainer: HTMLUListElement
    ) {
        if (query.length <= 1) {
            targetContainer.classList.add("hidden");
            return;
        }
        function forceCloseMobileSearch() {
            if (!modal || !sheet) return;

            sheet.classList.add("translate-y-full");

            modal.classList.add("hidden");

            document.body.style.overflow = "";

            mobileInput?.blur();
        }
        window.addEventListener("resize", () => {
            if (window.innerWidth >= 1024) {
                forceCloseMobileSearch();
            }
        });
        const groupMatches = getMatches(groups, query, "group");
        const productMatches = getMatches(products, query, "product");

        renderResults(
            [...groupMatches, ...productMatches],
            query,
            targetContainer,
            targetInput
        );
    }

    // ================= DESKTOP =================
    input.addEventListener("input", () => {
        clearBtn?.classList.toggle("hidden", !input.value);

        clearTimeout(debounceTimeout);
        searchIcon.classList.add("animate-spin");

        debounceTimeout = setTimeout(() => {
            runSearch(input.value.trim(), input, resultsContainer);
            searchIcon.classList.remove("animate-spin");

            if (mobileInput) mobileInput.value = input.value;
        }, 300);
    });

    root.addEventListener("click", (e) => {
        if (!(input.contains(e.target as Node) || resultsContainer.contains(e.target as Node))) {
            resultsContainer.classList.add("hidden");
        }
    });

    // ================= BODY LOCK =================
    function lockBody() {
        document.body.style.overflow = "hidden";
    }

    function unlockBody() {
        document.body.style.overflow = "";
    }

    // ================= MOBILE OPEN =================
    function openMobileSearch() {
        if (!modal || !sheet) return;

        modal.classList.remove("hidden");
        lockBody();

        requestAnimationFrame(() => {
            sheet.classList.remove("translate-y-full");
        });

        setTimeout(() => mobileInput?.focus(), 200);
    }

    // ================= MOBILE CLOSE =================
    function closeMobileSearch() {
        if (!modal || !sheet) return;

        sheet.classList.add("translate-y-full");

        setTimeout(() => {
            modal.classList.add("hidden");
            unlockBody();
        }, 250);
    }
    function clearSearch() {
        input.value = "";
        mobileInput && (mobileInput.value = "");

        resultsContainer.classList.add("hidden");
        mobileResults?.classList.add("hidden");

        clearBtn?.classList.add("hidden");
        clearMobileBtn?.classList.add("hidden");
    }
    // ================= EVENTS =================
    mobileIcon?.addEventListener("click", openMobileSearch);

    backdrop?.addEventListener("click", closeMobileSearch);

    document.getElementById("mobileSearchClose")
        ?.addEventListener("click", closeMobileSearch);

    clearBtn?.addEventListener("click", clearSearch);

    clearMobileBtn?.addEventListener("click", clearSearch);

    // ================= MOBILE SEARCH =================
    mobileInput?.addEventListener("input", () => {
        clearMobileBtn?.classList.toggle("hidden", !mobileInput.value);

        clearTimeout(debounceTimeout);

        debounceTimeout = setTimeout(() => {
            runSearch(
                mobileInput.value.trim(),
                mobileInput,
                mobileResults!
            );

            input.value = mobileInput.value;
        }, 300);
    });

    // ================= SWIPE CLOSE =================
    let startY = 0;
    let dragging = false;

    sheet?.addEventListener("touchstart", (e) => {
        startY = e.touches[0].clientY;
        dragging = true;
        sheet.style.transition = "none";
    });

    sheet?.addEventListener("touchmove", (e) => {
        if (!dragging) return;

        const diff = e.touches[0].clientY - startY;

        if (diff > 0) {
            sheet.style.transform = `translateY(${diff}px)`;
        }
    });

    sheet?.addEventListener("touchend", (e) => {
        dragging = false;

        sheet.style.transition = "";
        sheet.style.transform = "";

        const diff = (e.changedTouches?.[0]?.clientY ?? startY) - startY;

        if (diff > 120) closeMobileSearch();
    });
}