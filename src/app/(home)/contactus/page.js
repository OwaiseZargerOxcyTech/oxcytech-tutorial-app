import MapAndAddress from "@/components/common/MapAndAddress";
import Career from "./_components/Career";
import CareerSecondary from "./_components/CareerSecondary";
import Hero from "./_components/Hero";

export const metadata = {
  metadataBase: new URL("https://tutorials-fawn-omega.vercel.app/"),
  keywords: ["Hey Blog User", "Top Location Blogs", "Top Blogs", "Blogs"],
  title: {
    default: "Contact Page",
  },
  openGraph: {
    description: "Contact Page description",
  },
};

export default function Page() {
  return (
    <>
      <main>
        <div className="bg-[#E5E3DF] w-full">
          <div className="mx-auto max-w-2xl px-0 sm:px-6 sm:py-6 lg:max-w-7xl lg:px-8">
            <div className="bg-yellow-0 lg:py-24 grid grid-cols-1 lg:grid-cols-3 sm:gap-y-6 lg:gap-x-4">
              {/* Left section */}
              <div className="h-[400px] lg:h-full lg:col-span-2 bg-white rounded-none sm:rounded-lg">
                <iframe
                  className="rounded-none sm:rounded-lg w-full h-full"
                  title="Current Location"
                  src="https://maps.google.com/maps?width=800&height=500&hl=en&q=Office No 28 First Floor Amol Sagar State Poona College Road, Hidayatulla Rd, Agarwal Colony, Camp, Pune, Maharashtra 411001&t=&z=19&ie=UTF8&iwloc=B&output=embed"
                />
              </div>

              {/* Right section */}
              <div className="bg-gray-0">
                <div className="bg-white rounded-none sm:rounded-lg px-4  py-10 sm:p-10">
                  <div className="space-y-6">
                    <h6 className="mb-3 text-gray-900 text-lg font-bold flex justify-start">
                      Address
                    </h6>
                    <div className="mb-2 space-y-4">
                      <div className="text-gray-600 text-base">
                        <span className="text-gray-900  font-bold">
                          Barcelona
                        </span>
                        <div className=" leading-6">
                          365 Gran Via de Corts
                          <br />
                          Catalanes, BA 08015, Spain
                        </div>
                      </div>
                    </div>
                    <h6 className="mb-2 text-gray-900 text-lg font-bold flex justify-start">
                      Ph: +3.230.705.5448
                    </h6>
                    <div className="mb-3 space-y-1">
                      <h6 className="text-gray-900 text-base font-bold">
                        Assistance hours:
                      </h6>
                      <div className="text-gray-600 text-base">
                        <span> Monday – Friday.</span>
                        <div>6 am to 8 pm EST (toll free)</div>
                      </div>
                    </div>
                    <button className="bg-red-600 transition duration-500 hover:bg-blue-700 text-white text-lg font-semibold py-3 px-4 rounded">
                      Send Us an Email
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Career />
      </main>
      <main>
        <Hero />
        <MapAndAddress />
        <CareerSecondary />
      </main>
    </>
  );
}
