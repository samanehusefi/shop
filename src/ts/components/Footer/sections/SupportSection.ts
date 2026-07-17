import { BASE_URL } from '@/config';
export interface  supportData  { id: number; text: string; src: string; priority: number; alt: string;url:string; };
// ---------------- Sort Support ----------------
const sortByPriority = (items: supportData[]): supportData[] =>
    items
        .sort((a, b) => a.priority - b.priority)
        .map(item => ({
            ...item,
        }));
// ---------------- feach Support ----------------
const feachSupports=async (): Promise<supportData[]> => {
    const res=await fetch (`${BASE_URL}/data/Footer/supports.json`);
    if(!res.ok) throw new Error('Failed to fetch supports.json');
    const data=await res.json();
    return sortByPriority(data.supports);
}
export default async function BrandsSection() {
    const [support] = await Promise.all([feachSupports()]);
    const renderSupport = support.map(s=>`   
     <a href="${s.url}" class="footer-support-box"><img src="${s.src}" alt="${s.alt}"><p class="footer-support-text">${s.text}</p></a>`).join('');
    return ` <div class=" w-full footer-support"> ${renderSupport} </div> `;
}
