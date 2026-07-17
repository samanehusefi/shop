import { BASE_URL } from '@/config';

export interface  linkGrouData { id: number; title: string; priority: number };
export interface  linksData  { id: number; title: string; url: string; priority: number; LinkGroupId: number };
export interface  socialData { id: number; title: string; src: string; url: string; priority: number; alt: string };
export interface  brandsData { id: number; title: string; src: string; priority: number; alt: string,url:string };
// ---------------- Sort ByPriority ----------------
const sortByPriority = <T extends { priority: number }>(items: T[]) => items.sort((a, b) => a.priority - b.priority);

// ---------------- Fetch ----------------
const fetchLinkGroups = async (): Promise<linkGrouData[]> => {
    const res = await fetch(`${BASE_URL}/data/Footer/footerLinkGroups.json`);
    if (!res.ok) throw new Error('Failed to fetch footerLinkGroups.json');
    const data = await res.json();
    return sortByPriority(data.linkgroups || []);
};

const fetchLinks = async (): Promise<linksData[]> => {
    const res = await fetch(`${BASE_URL}/data/Footer/footerLinks.json`);
    if (!res.ok) throw new Error('Failed to fetch footerLinks.json');
    const data = await res.json();
    return sortByPriority(data.links || []);
};

const fetchSocial = async (): Promise<socialData[]> => {
    const res = await fetch(`${BASE_URL}/data/Footer/social.json`);
    if (!res.ok) throw new Error('Failed to fetch social.json');
    const data = await res.json();
    return sortByPriority(data.social || []);
};
const fetchBrand = async (): Promise<brandsData[]> => {
    const res = await fetch(`${BASE_URL}/data/Footer/brands.json`);
    if (!res.ok) throw new Error('Failed to fetch brands.json');
    const data = await res.json();
    return sortByPriority(data.mobileBrands || []);
};
// ---------------- Render ----------------
const renderLinks = (links: linksData[]) =>
    links.map(link => `<a href="${link.url}">${link.title}</a>`).join('');

const renderLinkGroup = (group: linkGrouData, links: linksData[]) => {
    const groupLinks = links.filter(link => link.LinkGroupId === group.id);
    return `
        <div class="footer-Quick-Link-text">
            <details class="footer-Quick-details group lg:hidden">
                <summary class="footer-Quick-summery">
                    <h3 class="footer-Quick-Link-heading">${group.title}</h3>
                    <img class="footer-Queick-svg" src="./src/assets/icon/chevron.svg" alt="chevron">
                </summary>
                <div class="footer-Queick-Link-Box">${renderLinks(groupLinks)}</div>
            </details>
            <div class="footer-Quick-Link-Deskctop hidden lg:block">
                <h3 class="footer-Quick-Link-heading">${group.title}</h3>
                ${renderLinks(groupLinks)}
            </div>
        </div>
    `;
};

// ---------------- Email Form ----------------
export const setupEmailForm = (container: HTMLElement) => {
    const emailInput = container.querySelector<HTMLInputElement>('#mail');
    const sendBtn = container.querySelector<HTMLButtonElement>('#sendEmail');
    if (!emailInput || !sendBtn) return;
    const emailRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    // initial state
    sendBtn.disabled = true;
    sendBtn.style.backgroundColor = '#ccc';
    sendBtn.style.cursor = 'not-allowed';

    emailInput.addEventListener('input', () => {
        const hasValue = emailInput.value.trim().length > 0;
        sendBtn.disabled = !hasValue;
        sendBtn.style.backgroundColor = hasValue ? 'green' : '#ccc';
        sendBtn.style.cursor = hasValue ? 'pointer' : 'not-allowed';
    });

    sendBtn.addEventListener('click', () => {
        const email = emailInput.value.trim();
        if (!emailRegex.test(email)) {
            alert('ایمیل وارد شده معتبر نیست!');
            return;
        }

        const storedEmails: string[] = JSON.parse(localStorage.getItem('emails') || '[]');
        if (!storedEmails.includes(email)) {
            storedEmails.push(email);
            localStorage.setItem('emails', JSON.stringify(storedEmails));
            alert('ایمیل شما با موفقیت ثبت شد!');
        } else {
            alert('این ایمیل قبلاً ثبت شده است!');
        }

        emailInput.value = '';
        sendBtn.disabled = true;
        sendBtn.style.backgroundColor = '#ccc';
        sendBtn.style.cursor = 'not-allowed';
    });
};

// ---------------- Component ----------------
export default async function QuickLinkSection(): Promise<string> {
    const [groups, links, social,brand] = await Promise.all([fetchLinkGroups(), fetchLinks(), fetchSocial(),fetchBrand()]);

    const renderSocial = social.map(s => `<div class="footer-social-img"><a class="block" href="${s.url}"><img src="${s.src}" alt="${s.alt}"></a></div>`).join('');
    const renderBrand   = brand.map(b =>`
        
                                <a class="footer-brands-img-mobile"
                                   target="_blank" href="${b.url}">
                                    <img src="${b.src}"
                                         alt="${b.alt}" title="${b.title}">
                                </a>
        `
    ).join('');
    return `
        <div class="footer-Quick-Link">
            ${groups.map(g => renderLinkGroup(g, links)).join('')}
            <div class="footer-Quick-Link-text">
                       <!--footer-Quick-Link-Mobile -->
                    <details class="footer-Quick-details group">
                        <summary class="footer-Quick-summery">
                            <h3 class="footer-Quick-Link-heading">شرکای تجاری</h3>
                            <img class="footer-Queick-svg" src="./src/assets/icon/chevron-down.svg" alt="chevron">
                        </summary>

                        <div class="footer-brands-box-mobile">
                            <div class="footer-brands-container">
                              ${renderBrand}
                            </div>
                        </div>
                    </details>
                       <!--footer-Social-Deskctop -->
                <div class="!hidden lg:!block">
                    <h3 class="footer-Quick-Link-heading">همراه ما باشید!</h3>
                    <div class="footer-social-media">${renderSocial}</div>
                    <h3 class="footer-Quick-Link-heading !text-base lg:text-lg">
                        با ثبت ایمیل، از جدیدترین تخفیف‌ها باخبر شوید
                    </h3>
                    <div class="footer-register-email">
                        <input type="text" placeholder="ایمیل شما" id="mail" name="mail" />
                        <button id="sendEmail">ثبت</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}