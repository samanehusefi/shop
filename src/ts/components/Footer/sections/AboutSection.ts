import { BASE_URL } from '@/config';

export interface  Certificate  {
    id: number;
    title: string;
    image: string;
    url: string;
};

export interface  AboutUs  {
    id: number;
    title: string;
    content: string;
};

// --- Fetch AboutUs ---
async function fetchAboutUs(): Promise<AboutUs> {
    const res = await fetch(`${BASE_URL}/data/Footer/about.json`);
    if (!res.ok) throw new Error('Failed to fetch about.json');
    return res.json();
}
// --- Fetch Certificates ---
async function fetchCertificates(): Promise<Certificate[]> {
    const res = await fetch(`${BASE_URL}/data/Footer/certificates.json`);
    if (!res.ok) throw new Error('Failed to fetch certificates.json');
    const data = await res.json();
    return data.certificates || [];
}

// --- Render Certificates ---
function renderCertificates(certificates: Certificate[]): string {
    if (!certificates.length) return '';
    return certificates
        .map(c => `
            <a target="_blank" href="${c.url}">
                <img
                    class="w-full inline-block"
                    src="${c.image || ''}"
                    width="75"
                    height="75"
                    alt="${c.title || 'certificate'}"
                >
            </a>
        `)
        .join('');
}

// --- Main component ---
export default async function AboutSection(): Promise<string> {
    const about = await fetchAboutUs();
    const certificates = await fetchCertificates();
    const certificatesHtml = renderCertificates(certificates);

    return `
        <div class="footer-about-digikala">
            <div class="grow">

                <div class="footer-aboutUs seo">
                    <h1>${about.title}</h1>
                    ${about.content}
                </div>

                <button  type="button" id="toggleBtn" class="footer-show-more">
                    <span id="toggleText">مشاهده بیشتر</span>
                    <div id="toggleIcon" class="footer-show-more-icon">
                        <img src="./src/assets/icon/chevron-left.svg" alt="chevron-left">
                    </div>
                </button >

            </div>

            <div class="footer-namad">
                ${certificatesHtml}
            </div>
        </div>
    `;
}
