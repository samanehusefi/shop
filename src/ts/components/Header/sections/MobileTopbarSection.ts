
import { mobileActionsSection } from "./ActionsSection.ts";


export const mobileTopbarSection = () => `
 
    <!-- Mobile Topbar -->
    <div class="navbar-start !w-full lg:hidden">

        <div class="flex w-full items-center justify-between px-0  mt-3 mb-3">

            <!-- Hamburger -->
            <button id="mobileMenuBtn" class="btn btn-ghost">
                <svg width="23" height="19" viewBox="0 0 23 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="1.1" y1="-1.1" x2="21.9" y2="-1.1"
                          transform="matrix(-1 0 0 1 23 3)"
                          stroke="#A6AFB9" stroke-width="2.2" stroke-linecap="round"/>
                    <line x1="1.1" y1="-1.1" x2="16.9" y2="-1.1"
                          transform="matrix(-1 0 0 1 23 11)"
                          stroke="#A6AFB9" stroke-width="2.2" stroke-linecap="round"/>
                    <line x1="1.1" y1="-1.1" x2="13.9" y2="-1.1"
                          transform="matrix(-1 0 0 1 23 19)"
                          stroke="#A6AFB9" stroke-width="2.2" stroke-linecap="round"/>
                </svg>
            </button>

            <!-- Logo -->
            <div class="flex-1 flex justify-center">
                         <img class="h-10 w-32" src="./src/assets/logo/full-horizontal.svg" alt="دیجی کالا" />

            </div>

            <!-- Actions -->
            <div>
                ${mobileActionsSection()}
            </div>

        </div>

    </div>
`;
