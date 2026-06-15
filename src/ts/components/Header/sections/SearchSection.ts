export const searchSection = () => `
<div class="lg:flex flex-1 mx-2 md:mx-4 relative">

    <div id="searchBox"
         class="hidden lg:flex relative w-full">

        <svg id="searchIcon"
             class="h-5 w-5 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
             fill="none"
             viewBox="0 0 24 24"
             stroke="currentColor">

            <path stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"/>
        </svg>

        <input id="search"
               placeholder="جستجو..."
               class="w-full md:w-2/3 h-10 bg-gray-100 rounded-4xl pr-8 border-none focus:ring-0 outline-none"/>
    <button id="clearSearch"

            class="absolute left-105 top-1/2 -translate-y-1/2 hidden text-gray-400">✕</button>
            
        <ul id="results"
            class="absolute top-full mt-1 w-full md:w-2/3 z-[999999999] md:mt-0 bg-white border shadow h-48 max-h-52 overflow-y-auto rounded hidden">
        </ul>

    </div>
</div>
`;




