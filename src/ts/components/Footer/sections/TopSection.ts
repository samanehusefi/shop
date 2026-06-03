export default function TopSection() {
    return `
           <div class="footer_first_section">
                <div class="footer_logo">
                    <img class="footer_logo"
                         src="./src/assets/logo/full-horizontal.svg" alt="digikala - دیجی کالا"
                         title="digikala - دیجی کالا">
                </div>
                <div class="flex justify-center">
                    <div class="backtoUp">
                        <button class="flex items-center justify-center relative grow" id="scrollToTop">
                            <span class="hidden lg:block text-neutral-400 ml-2 text-sm">بازگشت به بالا</span>
                            <span class="block lg:hidden text-neutral-700 ml-2 text-xs">رفتن به بالا</span>
                            <div class="flex">
                                <svg class="w-4 h-4 lg:text-digikala-gray-300">
                                    <use xlink:href="./src/assets/icons/icons.svg#chevron-up"></use>
                                </svg>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
    `;
}
