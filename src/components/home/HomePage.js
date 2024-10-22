"use client";
import WhatWeDo from "@/components/home/WhatWeDo";
import Capabilities from "@/components/home/Capabilities";
import Showcase from "@/components/home/Showcase";
import WebAndMobile from "@/components/home/WebAndMobile";
import Careers from "@/components/home/Careers";
import CapabilitiesSecondary from "@/components/home/CapabilitiesSecondary";
import PlayVideo from "@/components/home/PlayVideo";
import Services from "@/components/home/Services";
import Awards from "@/components/home/Awards";
import Collaborate from "@/components/home/Collaborate";
import MapAndAddress from "../common/MapAndAddress";

const HomePage = () => {
 
  return (
    <main className="space-y-16">
      {/* Section 1: Introduction */}
      <section className="bg-[#111013]">
        <WhatWeDo />
      </section>

      {/* Section 2: Capabilities and Showcase */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Capabilities />
        <Showcase />
      </section>

      {/* Section 3: Web and Mobile Development */}
      <section>
        <WebAndMobile />
      </section>

      {/* Section 6: Map and Address */}
      <section>
        <MapAndAddress />
      </section>

      {/* Section 7: Careers */}
      <section>
        <Careers />
      </section>

      {/* Section 9: Awards */}
      <section>
        <Awards />
      </section>

      {/* Section 10: Collaboration */}
      <section>
        <Collaborate />
      </section>

      {/* Section 11: Services */}
      <section>
        <Services />
      </section>

      {/* Section 12: Secondary Capabilities and Video */}
      <section>
        <CapabilitiesSecondary />
        <PlayVideo />
      </section>
    </main>
  );
};

export default HomePage;
