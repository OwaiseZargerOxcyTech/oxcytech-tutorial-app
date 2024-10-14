"use client";
import Hero from "@/components/home/Hero";
import TraficSources from "@/components/home/TraficSources";
import transactionImage from "../../../public/transaction.png";
import ExpectedFeatures from "@/components/home/ExpectedFeatures";
import Leads from "@/components/home/Leads";
import Pricing from "@/components/home/Pricing";
import FAQ from "@/components/home/FAQ";
import HeroSecondary from "@/components/home/HeroSecondary";
import WhatWeDo from "@/components/home/WhatWeDo";
import Capabilities from "@/components/home/Capabilities";
import Showcase from "@/components/home/Showcase";
import WebAndMobile from "@/components/home/WebAndMobile";
import Testimonial from "@/components/home/Testimonial";
import Careers from "@/components/home/Careers";
import CapabilitiesSecondary from "@/components/home/CapabilitiesSecondary";
import PlayVideo from "@/components/home/PlayVideo";
import Services from "@/components/home/Services";
import Breadcrumbs from "../common/Breadcrumbs";
import TestimonialSecondary from "@/components/home/TestimonialSecondary";
import Awards from "@/components/home/Awards";
import Collaborate from "@/components/home/Collaborate";
import MapAndAddress from "../common/MapAndAddress";
import Clients from "./Clients";

const HomePage = () => {
  const transactionTextContent = {
    mainHeading: "Insights & spam detection.",
    boldParaText: "Open stage API",
    remainingParaText:
      "Open stage API with a core feature of data occaecat cupidatat proident, taken possession of my entire soul, like these sweet mornings.",
  };
  return (
    <>
      <main>
        <Hero />
        <div className="bg-red-100">
          <TraficSources
            textContent={transactionTextContent}
            image={transactionImage}
          />
          <ExpectedFeatures />
          <Leads />
        </div>
        <div className="bg-indigo-900">
          <Pricing />
        </div>
        <div className="bg-indigo-950">
          <FAQ />
        </div>
      </main>
      <main>
        <HeroSecondary />
        <div className="bg-[#111013]">
          <WhatWeDo />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 ">
          <Capabilities />
          <Showcase />
        </div>

        <WebAndMobile />
        <Clients />
        <Testimonial />
        <MapAndAddress />
        <Careers />
      </main>
      <main>
        <Breadcrumbs />

        <div className="bg-[#1a191b]">
          <TestimonialSecondary />
        </div>
        <Awards />
        <Collaborate />
      </main>
      <main>
        <Breadcrumbs />
        <Services />
        <CapabilitiesSecondary />
        <PlayVideo />
      </main>
    </>
  );
};

export default HomePage;
