type Product = { id: number; name: string; groupId: number };
type ProductGroup = { id: number; name: string };

const productGroups: ProductGroup[] = [
    { id: 1, name: "گوشی" },
    { id: 2, name: "لپ‌تاپ" },
    { id: 3, name: "تبلت" },
];

const products: Product[] = [
    { id: 1, name: "آیفون 14", groupId: 1 },
    { id: 2, name: "گلکسی S23", groupId: 1 },
    { id: 3, name: "مک‌بوک پرو", groupId: 2 },
    { id: 4, name: "آیپد پرو", groupId: 3 },
];

// =================== Utility ===================
const normalize = (str: string) => str.replace(/\s+/g, "").toLowerCase();

const highlightMatch = (text: string, query: string) => {
    const regex = new RegExp(`(${query})`, "gi");
    return text.replace(regex, "<mark>$1</mark>");
};

const getMatches = <T extends { name: string }>(
    items: T[],
    query: string,
    type: "group" | "product"
) => items
    .filter(item => normalize(item.name).includes(normalize(query)))
    .map(item => ({ type, item }));

// =================== DOM ===================
document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("search") as HTMLInputElement;
    const resultsContainer = document.getElementById("results") as HTMLUListElement;
    const searchIcon = document.getElementById("searchIcon");

    if (!input || !resultsContainer || !searchIcon) return;

    let debounceTimeout: number | undefined;

    // =================== Render ===================
    function renderResults(
        results: { type: "group" | "product"; item: ProductGroup | Product }[],
        query: string
    ) {
        resultsContainer.innerHTML = "";
        if (!results.length) {
            resultsContainer.classList.add("hidden");
            return;
        }

        resultsContainer.classList.remove("hidden");

        results.forEach(({ type, item }) => {
            const li = document.createElement("li");
            li.innerHTML = `${type === "group" ? "گروه" : "محصول"}: ${highlightMatch(item.name, query)}`;
            li.className = "p-2 cursor-pointer hover:bg-gray-100";

            li.addEventListener("click", () => {
                alert(`رفتن به ${type}: ${item.name}`);
                input.value = "";
                resultsContainer.classList.add("hidden");
            });

            resultsContainer.appendChild(li);
        });
    }

    // =================== Search ===================
    function search(query: string) {
        if (query.length <=2) {
            resultsContainer.classList.add("hidden");
            return;
        }

        const groupMatches = getMatches(productGroups, query, "group");
        const productMatches = getMatches(products, query, "product");

        renderResults([...groupMatches, ...productMatches], query);
    }

    // =================== Event Listeners ===================
    input.addEventListener("input", () => {
        clearTimeout(debounceTimeout);
        searchIcon.classList.add("animate-spin");

        debounceTimeout = window.setTimeout(() => {
            search(input.value.trim());
            searchIcon.classList.remove("animate-spin");
        }, 500);
    });

    document.addEventListener("click", (e) => {
        if (!(input.contains(e.target as Node) || resultsContainer.contains(e.target as Node))) {
            resultsContainer.classList.add("hidden");
        }
    });
});