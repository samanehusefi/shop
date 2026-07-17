

export const mobileDrawerSection = () => `

    <!-- Overlay -->
    <div
        id="mobileMenuOverlay"
        class="fixed inset-0 bg-black/40 opacity-0 pointer-events-none transition-opacity duration-300 z-40">
    </div>

    <!-- Drawer -->
    <aside
        id="mobileMenuDrawer"
        class="fixed top-0 right-0 h-full w-72 bg-white shadow-lg transform translate-x-full
         transition-transform duration-300 z-[999] ">

        <!-- Header -->
        <div class="p-4 border-b flex justify-between items-center">
          <img class="w-24 lg:block lg:w-48" src="./src/assets/logo/full-horizontal.svg" alt="دیجی کالا" />

            <button
                id="mobileMenuCloseBtn"
                class="text-gray-700 hover:text-red-600 text-2xl font-bold">
                &times;
            </button>
        </div>

        <!-- Menu -->
        <div class="overflow-y-auto h-[calc(100%-64px)]">
            <ul
                id="mobileMenuList"
                class="menu menu-sm flex flex-col w-full p-2">
                <!-- JS injects menu items here -->
            </ul>
        </div>

    </aside>
`;