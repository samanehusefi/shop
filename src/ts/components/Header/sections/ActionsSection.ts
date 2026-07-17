export const actionsSection = () => `
<div class="hidden lg:block">

    <button class="relative p-2 hover:bg-gray-100 rounded-full">
        <img class="header-icon"
             src="./src/assets/icon/user.svg">
    </button>

    <button class="relative p-2 hover:bg-gray-100 rounded-full">
        <img class="header-icon"
             src="./src/assets/icon/basket.svg">
    </button>

</div>
`;

export const mobileActionsSection = () => `
<div class="block lg:hidden md:w-32 flex items-center justify-end ">

    <!-- SEARCH BUTTON (FIXED) -->
    <button id="mobileSearchBtn"
            data-action="open-search"
            class="p-1 rounded-full hover:bg-gray-100">

        <svg xmlns="http://www.w3.org/2000/svg"
             class="h-5 w-5 text-gray-500"
             fill="none" viewBox="0 0 24 24"
             stroke="currentColor">
            <path stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"/>
        </svg>

    </button>

    <button class="relative p-1 hover:bg-gray-100 rounded-full">
        <img class="header-icon"
             src="./src/assets/icon/user.svg"
             alt="digikala - دیجی کالا"
             title="digikala - دیجی کالا">
    </button>

    <button class="relative p-2 hover:bg-gray-100 rounded-full">
        <img class="header-icon"
             src="./src/assets/icon/basket.svg"
             alt="digikala - دیجی کالا"
             title="digikala - دیجی کالا">
    </button>

</div>
`;