import Link from "next/link";

export default function FollowMe() {
  return (
    <div className="space-y-10">
      <h1 className="text-gray-900 inline-block font-bold text-lg border-b-4 border-red-500">
        Follow Me
      </h1>
      <div className="space-y-3">
        <Link
          prefetch={false}
          href="/"
          className="facebookBtn block bg-[#79ADFF] hover:scale-105 transition duration-300 text-white  px-4 py-2  rounded-md"
        >
          <div className="flex justify-start items-center space-x-2">
            <i className="bi bi-facebook text-2xl font-bold"></i>
            <span className="text-base font-semibold"> Facebook</span>
          </div>
        </Link>

        <Link
          prefetch={false}
          href="/"
          className="linkedinBtn block bg-[#29B4FF] hover:scale-105 transition duration-300 text-white  px-4 py-2  rounded-md"
        >
          <div className="flex justify-start items-center space-x-2">
            <i className="bi bi-linkedin text-2xl font-bold"></i>
            <span className="text-base font-semibold"> Linkedin</span>
          </div>
        </Link>

        <Link
          prefetch={false}
          href="/"
          className="instagramBtn block bg-[#9E7CF7] hover:scale-105 transition duration-300 text-white  px-4 py-2  rounded-md"
        >
          <div className="flex justify-start items-center space-x-2">
            <i className="bi bi-instagram text-2xl font-bold"></i>
            <span className="text-base font-semibold"> Instagram</span>
          </div>
        </Link>

        <Link
          prefetch={false}
          href="/"
          className="youtubeBtn block bg-[#F44F54] hover:scale-105 transition duration-300 text-white   px-4 py-2  rounded-md"
        >
          <div className="flex justify-start items-center space-x-2">
            <i className="bi bi-youtube text-2xl font-bold"></i>
            <span className="text-base font-semibold"> Youtube</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
