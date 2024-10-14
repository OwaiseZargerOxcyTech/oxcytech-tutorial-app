export default function Services() {
  return (
    <div className="bg-[#F9F8FA]">
      <div className="mx-auto max-w-2xl px-4 sm:px-12 py-10 sm:py-16 lg:max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 sm:gap-x-4 space-y-4">
          <div className="space-y-4">
            <h3 className="text-gray-500 uppercase font-medium">
              our services
            </h3>
            <h1 className="text-gray-800 text-3xl sm:text-4xl pb-4  font-bold">
              We&apos;re a team of creatives who
              <br />
              are excited about new ideas
              <br />
              and unique mutual
              <br />
              opportunities.
            </h1>
          </div>

          <div className="space-y-10">
            <p className="text-gray-600  text-lg font-normal leading-6">
              Our clients describe us as a product team which{" "}
              <b>creates amazing UI/UX</b> experiences,{" "}
              <b>by crafting top-notch</b> user experience.
            </p>

            <div className="grid grid-cols-2 ">
              <p className="text-gray-700 text-base font-bold">
                — Art Direction
              </p>
              <p className="text-gray-700 text-base font-bold">— Packaging</p>
              <p className="text-gray-700 text-base font-bold">
                — Brand Identities
              </p>
              <p className="text-gray-700 text-base font-bold">— Typography</p>
              <p className="text-gray-700 text-base font-bold">— Campaigns</p>
              <p className="text-gray-700 text-base font-bold ">
                — UX/UI Design
              </p>
              <p className="text-gray-700 text-base font-bold ">
                — Creative Direction
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
