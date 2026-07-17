import BrandsSection from "./sections/BrandsSection.ts";
import ContactSection from "./sections/ContactSection.ts";
import TopSection from "./sections/TopSection.ts";
import SupportSection from "./sections/SupportSection.ts";
import QuickLinkSection from "./sections/QuickLinkSection.ts";
import CopyRightSection from "./sections/CopyRightSection.ts";
import FooterMenuSection from "./sections/FooterMenuSection.ts";
import AppDownloadSection from "./sections/AppDownloadSection.ts";
import AboutSection from "./sections/AboutSection.ts";

export  async function footerTemplate(): Promise<string> {
    const AboutUsSection = await AboutSection();
    const QuickLinks = await QuickLinkSection();
    const Brands = await BrandsSection();
    const Support=await SupportSection();
    const applications=await AppDownloadSection();
    const Contact=await ContactSection();
    return `
    <div class="footer">
        <div class="container-7xl-w mx-auto">
            <div class="px-5">
                ${TopSection()}
                ${Contact}
                ${Support}
                ${QuickLinks}
                ${applications}
                ${AboutUsSection}
                ${CopyRightSection()}
                ${FooterMenuSection()}
            </div>
        </div>
        ${Brands}
    </div>
    `;
}