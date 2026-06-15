import { BASE_URL } from '@/config';
export interface  brandsData  { id: number; title: string; src: string; priority: number; alt: string,url:string };
// ---------------- Sort Brands ----------------
const sortByPriority = (items: brandsData[]): brandsData[] =>
    items
        .sort((a, b) => a.priority - b.priority)
        .map(item => ({
            ...item
        }));

const fetchBrand = async (): Promise<brandsData[]> => {
    const res = await fetch(`${BASE_URL}/data/Footer/brands.json`);
    if (!res.ok) throw new Error('Failed to fetch brands.json');
    const data = await res.json();
    return sortByPriority(data.brands || []);
};



export  default async function BrandsSection():Promise<string>  {
    const [brand] = await Promise.all([fetchBrand()]);
    const renderBrand   = brand.map(b =>`
        <a class="footer-brands-img" target="_blank" href="${b.url}">
                <img src="${b.src}" alt="${b.alt}" title="${b.title}">
            </a>
        `
        ).join('');

    return `
    <div class="footer-brands-box">
        <div class="footer-brands-container">
         ${renderBrand}
        </div>
    </div>
    `;
}
