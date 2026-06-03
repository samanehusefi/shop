import BrandsSection from "./sections/BrandsSection.ts";
import ContactSection from "./sections/ContactSection.ts";
import TopSection from "./sections/TopSection.ts";
import SupportSection from "./sections/SupportSection.ts";
import QuickLinkSection from "./sections/QuickLinkSection.ts";
import CopyRightSection from "./sections/CopyRightSection.ts";
import FooterMenuSection from "./sections/FooterMenuSection.ts";
import AppDownloadSection from "./sections/AppDownloadSection.ts";
import AboutSection from "./sections/AboutSection.ts";

export const footerTemplate = `
<div class="footer">
    <div class="container-4xl-w mx-auto">
        <div class="px-5">
            <!--topFooter -->
             ${TopSection()}
            <!--contactFooter -->
             ${ContactSection()}
            <!--support-Footer  -->
             ${SupportSection()}
            <!--footer-Quick-Link -->
             ${QuickLinkSection()}
            <!--application-Download-Link -->
             ${AppDownloadSection()}
            <!--footer-Namd And AboutUs -->
             ${AboutSection()}
            <!--footer-copy-right -->
              ${CopyRightSection()}
             <!--Menu -->
              ${FooterMenuSection()}

        </div>
    </div>
    <!--footer-brands-box -->
     ${BrandsSection()}
</div>

`;