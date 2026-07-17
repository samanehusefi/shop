import topBannerSection from "./sections/TopBannerSection";
import {searchSection} from "./sections/SearchSection";
import {actionsSection} from "./sections/ActionsSection.ts";
import {mobileTopbarSection} from "./sections/MobileTopbarSection";
import {mobileDrawerSection} from "./sections/MobileDrawerSection";
import {desktopMenuSection} from "./sections/DesktopMenuSection";
import { mobileSearchModal } from "./Search/MobileSearchModal.ts";
export async function headerTemplate(): Promise<string> {
    const Banner = await topBannerSection();

    return `
   <div class="w-full">
    ${Banner}
    <div class="bg-white shadow flex flex-wrap left-0 w-full z-40 transition-all duration-500 ease-in-out md:py-3"
         id="navbar">
        <div id="navbarTop"
             class="flex flex-wrap items-center justify-around !w-full px-4 transition-all duration-300 ">
            <div id="logo-root"></div>
            ${searchSection()}
            ${actionsSection()}
        </div>

        <div class="navbar bg-base-100 !w-full flex flex-wrap py-5">
          <div class="navbar-start !w-full lg:hidden menu-mobile">
            ${mobileTopbarSection()}
            ${mobileDrawerSection()}
        </div>
          <!-- Desktop Topbar -->
            ${desktopMenuSection()}
    </div>
</div>    
    ${mobileSearchModal()}
  <div id="navbarSpacer" class="h-0"></div>
   `
}

