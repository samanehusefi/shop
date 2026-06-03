export function mobileSearchModal(): string {
    return `
<div id="mobileSearchModal"
     class="fixed inset-0 z-50 hidden">

    <!-- backdrop -->
    <div id="mobileSearchBackdrop"
         class="absolute inset-0 bg-black/40"></div>

    <!-- sheet -->
    <div id="mobileSearchSheet"
     class="absolute bottom-0 left-0 w-full bg-white rounded-t-2xl shadow-xl transform translate-y-full transition-transform duration-300 will-change-transform">
        <div class="p-3 border-b flex items-center gap-2">
            <input id="mobileSearchInput"
                   type="text"
                   class="w-full p-2 border rounded"
                   placeholder="Search..." />

            <button id="mobileSearchClose" class="text-xl px-2">✕</button>
        </div>

        <ul id="mobileResults" class="max-h-[60vh] overflow-auto"></ul>
    </div>
</div>
`;
}