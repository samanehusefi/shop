
export default function  FooterMenuSection(){
    return `
        <div class="fixed bottom-0 left-0 right-0 lg:hidden bg-white border-t z-[999]">
                <div class="block lg:hidden footer-contact-Quick px-5 py-3">
                    <div class="footer-Quick-app ">
                        <div class="footer-Quick-app-img">
                            <img src="./src/assets/logo/logo.png" alt="digikala">
                        </div>

                        <div class="flex flex-col mr-2">
                            <span class="block font-bold">اپلیکیشن دیجی‌کالا</span>
                            <span class="text-neutral-400 text-sm font-normal">تجربه خرید بهتر </span>
                        </div>
                    </div>
                    <div class="footer-call">
                        <button data-open="sheet">دانلود</button>
                    </div>
                </div>
                <div class="block lg:hidden footer-contact-Quick px-5 h-16">
                    <div class="container flex gap-2 items-center justify-between px-5">
                        <span>خانه</span>
                        <span>دسته بندی</span>
                        <span>مگنت</span>
                        <span>دیجی کالای من</span>
                    </div>
                </div>
            </div>`;
};