export function mobileSearchModal(): string {
    return `
<div id="mobileSearchModal"
     class="fixed inset-0 z-[9999] hidden">

    <!-- backdrop -->
    <div id="mobileSearchBackdrop"
         class="absolute inset-0 bg-black/40"></div>

    <!-- sheet (90% height) -->
    <div id="mobileSearchSheet"
         class="absolute bottom-0 left-0 w-full h-[90vh] bg-white rounded-t-2xl shadow-xl transform translate-y-full transition-transform duration-300 will-change-transform">

        <div class="p-3 px-7 border-b flex items-center gap-2 relative">
       <svg id="searchIcon"
             class="h-5 w-5 absolute right-12 top-1/2 -translate-y-1/2 text-gray-400"
             fill="none"
             viewBox="0 0 24 24"
             stroke="currentColor">

            <path stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"/>
        </svg>
            <input id="mobileSearchInput"
                   type="text"
                   class="w-full md:w-2/3 h-10 bg-gray-100 rounded-4xl pr-10 border-none focus:ring-0 outline-none"
                   placeholder="جستجو..." />
        <button id="clearMobileSearch"
            class="absolute left-10 top-1/2 -translate-y-1/2 hidden text-gray-400">✕</button>
            
           
        </div>

        <ul id="mobileResults" class="max-h-[75vh] overflow-auto"></ul>
    </div>
</div>
`;
}
// <button id="mobileSearchClose" class=" text-transparent px-2">✕</button>