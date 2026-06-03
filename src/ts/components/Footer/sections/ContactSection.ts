export default function ContactSection() {
    return `
          <div class="footer-contact">
                <div class=" hidden lg:flex">
                    <p class="shrink-0">تلفن پشتیبانی ۶۱۹۳۰۰۰۰ - ۰۲۱</p>
                    <div class="px-5 text-neutral-400 hidden md:block">|</div>
                    <p class="shrink-0">۰۲۱-۹۱۰۰۰۱۰۰</p>
                    <div class="px-5 text-neutral-400 hidden md:block">|</div>
                    <p class="w-full mt-1 md:mt-0">۷ روز هفته، ۲۴ ساعته پاسخگوی شما هستیم</p>
                </div>
                <div class="block lg:hidden footer-contact-Quick">
                    <div class="footer-Quick-contact">
                        <div class="footer-Quick-contact-img">
                            <img src="./src/assets/icons/support.svg" alt="support">
                        </div>
                        <div class="flex flex-col mr-2">
                            <title class="block  font-bold">تماس با پشتیبانی</title>
                            <span class="text-neutral-400 text-sm font-normal">۷ روز هفته، ۲۴ ساعت</span>
                        </div>
                    </div>
                    <div class="footer-call ">
                        <a href="tel:02144601811">تماس</a>
                    </div>
                </div>
                <div class="block lg:hidden footer-contact-Quick">
                    <div class="footer-Quick-app">
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
                    <!-- Overlay -->
                    <div id="overlay"
                         class="fixed inset-0 bg-black/50 opacity-0 pointer-events-none transition-opacity duration-300 z-40 lg:hidden"></div>
                    <!-- Bottom Sheet -->
                    <div id="sheet" class="sheet fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl
         transform translate-y-full transition-transform duration-300 z-[9999] p-4 lg:hidden">
                        <div class="flex justify-between">
                            <h2 class="text-lg font-semibold mb-2">دانلود اپلیکیشن دیجی کالا</h2>
                            <div data-close class="cursor-pointer">
                                <img class="w-8 " src="./src/assets/icons/close.svg" alt="close">
                            </div>
                        </div>
                        <div class="w-full border-b bg-gray-300 rounded mx-auto mb-4"></div>

                        <div class="flex flex-col grow py-4 px-5 ">
                            <div class="grid grid-cols-2 gap-1">
                                <img class="w-full inline-block" src="./src/assets/application/coffe-bazzar-dark-.svg"
                                     alt="coffe-bazzar">
                                <img class="w-full inline-block" src="./src/assets/application/myket-dark.svg"
                                     alt="myket-dark.">
                                <img class="w-full inline-block" src="./src/assets/application/apk-badge-dark.svg"
                                     alt="apk-badge-dark">
                            </div>
                        </div>
                    </div>
                </div>

            </div>
    `;
}
