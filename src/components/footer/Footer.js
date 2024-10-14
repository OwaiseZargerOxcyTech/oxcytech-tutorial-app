import Link from "next/link";
import FooterInputEmail from "./FooterInputEmail";
import Copyright from "./Copyright";

export default function Footer() {
  return (
    <>
      {/* Footer container */}
      <div className="bg-gray-100 bg-opacity-50 text-center lg:text-left">
        {/* Main container div: holds the entire content of the footer */}
        <div className="mx-auto max-w-2xl px-4 py-2 sm:px-2 sm:py-4 lg:max-w-7xl lg:px-4">
          {/* <div className="py-10 text-center md:text-left">
            <div className="grid-1 grid gap-8 md:grid-cols-2 lg:grid-cols-4"> */}
          {/* Link section */}
          {/* <div className="space-y-6 ">
                <h6 className="mb-4 text-gray-900 font-bold flex items-center justify-center md:justify-start space-x-3">
                  <Link prefetch={false} href="/">
                    Fb.
                  </Link>
                  <Link prefetch={false} href="/">
                    / Ig.
                  </Link>
                  <Link prefetch={false} href="/">
                    / Tw.
                  </Link>
                  <Link prefetch={false} href="/">
                    / Be.
                  </Link>
                </h6>
              </div> */}

          {/* Branches section */}
          {/* <div className="space-y-6">
                <h6 className="mb-4 text-gray-900 text-sm font-bold flex justify-center  md:justify-start">
                  Rotterdam
                </h6>
                <div className="mb-4 space-y-4">
                  <div className="text-gray-500 ">
                    <span className="text-gray-900 font-bold">
                      Ohio Digital Media LTD
                    </span>
                    <div className="text-gray-500 text-sm leading-6">
                      Graaf Florisstraat 22A,
                      <br />
                      3021 CH Rotterdam
                      <br />
                      Netherlands
                    </div>
                  </div>
                </div>
                <div className="mb-4 space-y-4">
                  <h6 className="text-gray-900 text-sm font-bold">Barcelona</h6>
                  <div className="text-gray-600">
                    <span className="text-gray-900 font-bold">
                      {" "}
                      Ohio Digital LTD.
                    </span>
                    <div className="text-gray-500 text-sm leading-6">
                      365 Gran Via de Corts
                      <br />
                      Catalanes, BA 08015
                    </div>
                  </div>
                </div>
              </div> */}

          {/* inquiries & career section */}
          {/* <div className="space-y-6">
                <h6 className="mb-4 text-gray-900 text-sm font-bold flex justify-center md:justify-start">
                  Work inquiries
                </h6>
                <div className="mb-4">
                  <p className="text-gray-500 text-sm leading-6">
                    Interested in working with us?
                  </p>
                  <h6 className="text-gray-900 font-bold hover:text-red-600 hover:underline">
                    <Link prefetch={false} href="/">
                      hello@clbthemes.com
                    </Link>
                  </h6>
                </div>
                <h6 className="mb-4 text-gray-900 text-sm flex justify-center font-semibold  md:justify-start">
                  Career
                </h6>
                <div className="mb-4">
                  <p className="text-gray-500 text-sm leading-6">
                    Looking for a job opportunity? s
                  </p>
                  <h6 className="text-gray-900 font-bold hover:text-red-600 hover:underline">
                    <Link prefetch={false} href="/">
                      See open position
                    </Link>
                  </h6>
                </div>
              </div> */}

          {/* Contact section */}
          {/* <div>
                <h6 className="mb-4 text-gray-900 text-sm flex justify-center font-semibold md:justify-start">
                  Sign up for the newsletter
                </h6>
                <FooterInputEmail />
              </div>
            </div>
          </div> */}

          {/*Copyright section*/}
          <Copyright />
        </div>
      </div>
    </>
  );
}
