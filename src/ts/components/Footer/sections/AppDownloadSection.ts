import { BASE_URL } from '@/config';

export interface  appData { id: number; title: string; src: string; priority: number; alt: string;url:string; };
// ---------------- Sort Application ----------------
const sortByPriority = (items: appData[]): appData[] =>
    items
        .sort((a, b) => a.priority - b.priority)
        .map(item => ({
            ...item,
        }));

// ---------------- feach Application ----------------
const feachApp=async (): Promise<appData[]> => {
    const res=await fetch(`${BASE_URL}/data/Footer/applications.json`);
    if(!res.ok) throw new Error(`Failed to fetch Application.json`);
    const data=await res.json();
    return sortByPriority(data.applications);
}

export default async function AppDownloadSection(){
    const [application]=await Promise.all([feachApp()]);
    const renderApp=application.map(a=>`
       <a href="${a.url}">
                        <img src="${a.src}" alt="${a.alt} title="${a.title}">
                      </a>
    `)
    return `
    <div class="footer-app-download">
                <div class="footer-app-r-text">
                    <div class="footer-app-r-img">
                        <img src="./src/assets/application/footerlogo2.webp" alt="دیجی‌کالا">
                    </div>
                    <div class="footer-app-r-text">
                        <p>دانلود اپلیکیشن دیجی‌کالا</p>
                    </div>
                </div>
                <div class="footer-app-l-link">
                    <div class="footer-app-l-link-primary">
                       ${renderApp}
                    </div>
                    <div class="footer-link-more">
                        <a href="#">
                            <img src="./src/assets/application/More.svg" alt="More">
                        </a>
                    </div>
                </div>
            </div>
            `;
};