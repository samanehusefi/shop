import { BASE_URL } from '@/config';

export interface PhoneData {
    id: number;
    value: string;
    priority: number;
    typeId: number;
}

export interface PhoneTypeData {
    id: number;
    value: string;
    priority: number;
}

export interface ContactData {
    id: number;
    title: string;
    description: string;
    priority: number;
    content: string;
    url: string;
    supportPhones: PhoneData[];
    phoneTypes: PhoneTypeData[];
}
export interface  appData { id: number; title: string; src: string; priority: number; alt: string;url:string; };
// ---------------- Sort by Priority ----------------
const sortByPriority = <T extends { priority: number }>(items?: T[]) =>
    (items ?? []).sort((a, b) => a.priority - b.priority);

// ---------------- Fetch Contact ----------------
const fetchContact = async (): Promise<ContactData[]> => {
    const res = await fetch(`${BASE_URL}/data/Footer/contact.json`);
    if (!res.ok) throw new Error('Failed to fetch contact.json');

    const data = await res.json();

    const contacts = [data.contact];
    return sortByPriority(contacts);
};
// ---------------- feach Application ----------------
const feachApp=async (): Promise<appData[]> => {
    const res=await fetch(`${BASE_URL}/data/Footer/applications.json`);
    if(!res.ok) throw new Error(`Failed to fetch Application.json`);
    const data=await res.json();
    return sortByPriority(data.applicationsMobile);
}


// ---------------- Render Phone Types ----------------
const renderPhoneType = (group: PhoneTypeData, phones: PhoneData[]) => {
    const groupPhones = phones.filter(p => p.typeId === group.id);
    if (!groupPhones.length) return '';
    const firstPhone = groupPhones[0]?.value ?? '';
    const secondPhone = groupPhones[1]?.value ?? '';

    return `
        <p class="shrink-0">${group.value} <span dir="ltr">${firstPhone ? `  ${firstPhone}` : ''}</span></p>
        <div class="px-5 text-neutral-400 hidden md:block">|</div>
       <span dir="ltr" class="w-[200px]"> ${secondPhone ? ` ${secondPhone}` : ''}</span>
        <div class="px-5 text-neutral-400 hidden md:block">|</div>
    `;
};

// ---------------- Contact Section ----------------
export default async function ContactSection() {
    const[contacts,application]=await Promise.all([fetchContact(),feachApp()]);
    const contact = contacts[0];

    const phoneGroups = sortByPriority(contact.phoneTypes);
    const supportPhones = sortByPriority(contact.supportPhones);

    const renderApp=application.map(a=>`
     <a class='block' href="${a.url}">
                        <img class='w-full inline-block' src="${a.src}" alt='${a.alt}' title='${a.title}'>
                 </a>
    `).join('')


    return `
        <div class="footer-contact">
            <!-- Desktop -->
            <div class="hidden lg:flex">
                ${phoneGroups.map(group => renderPhoneType(group, supportPhones)).join('')}
                <p class="w-full mt-1 md:mt-0">${contact.description}</p>
            </div>

            <!-- Mobile Support -->
            <div class="block lg:hidden footer-contact-Quick">
                <div class="footer-Quick-contact">
                    <div class="footer-Quick-contact-img">
                        <img src="./src/assets/icon/support.svg" alt="support">
                    </div>
                    <div class="flex flex-col mr-2">
                        <span class="block font-bold">تماس با پشتیبانی</span>
                        <span class="text-neutral-400 text-sm font-normal">۷ روز هفته، ۲۴ ساعت</span>
                    </div>
                </div>
                <div class="footer-call">
                    <a href="tel:${contact.supportPhones[0].value.replace(" ","")}">تماس</a>
                </div>
            </div>

            <!-- Mobile App -->
            <div class="block lg:hidden footer-contact-Quick">
                <div class="footer-Quick-app">
                    <div class="footer-Quick-app-img">
                        <img src="./src/assets/logo/logo.png" alt="digikala">
                    </div>
                    <div class="flex flex-col mr-2">
                        <span class="block font-bold">اپلیکیشن دیجی‌کالا</span>
                        <span class="text-neutral-400 text-sm font-normal">تجربه خرید بهتر</span>
                    </div>
                </div>
                <div class="footer-call">
                    <button data-open="sheet">دانلود</button>
                </div>

                <!-- Overlay -->
                <div id="overlay"
                     class="fixed inset-0 bg-black/50 opacity-0 pointer-events-none transition-opacity duration-300 z-40 lg:hidden"></div>

                <!-- Bottom Sheet -->
                <div id="sheet" class="sheet fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl
                    transform translate-y-full transition-transform duration-300 z-[9999] p-4 lg:hidden">
                    <div class="flex justify-between">
                        <h2 class="text-lg font-semibold mb-2">دانلود اپلیکیشن دیجی کالا</h2>
                        <div data-close class="cursor-pointer">
                            <img class="w-8" src="./src/assets/icon/close.svg" alt="close">
                        </div>
                    </div>
                    <div class="w-full border-b bg-gray-300 rounded mx-auto mb-4"></div>
                    <div class="flex flex-col grow py-4 px-5">
                       <div class="grid grid-cols-2 gap-2">
                         ${renderApp}  
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}