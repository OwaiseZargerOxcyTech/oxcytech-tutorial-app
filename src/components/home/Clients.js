"use client";
import Image from "next/image";
import oh3 from "../../../public/oh3.jpeg";
import EA from "../../../public/EA.png";
import Amazon from "../../../public/Amazon.png";
import Slack from "../../../public/Slack.png";
import Airbnb from "../../../public/Airbnb.png";
import Intel from "../../../public/Intel.png";
import Walmart from "../../../public/Walmart.png";
import Linkedin from "../../../public/Linkedin.png";
import Google from "../../../public/Google.png";
import Lya from "../../../public/Lya.png";
import Spotify from "../../../public/Spotify.png";
import oh4 from "../../../public/oh4.jpeg";
import Tinder from "../../../public/Tinder.png";
import NationalGeographic from "../../../public/National_Geographic.png";
import { usePathname } from "next/navigation";

export default function Clients() {
  const pathname = usePathname();

  return (
    <div className="mx-auto max-w-2xl px-6 py-10 sm:px-12 sm:py-16 lg:max-w-7xl">
      <div className="flex flex-wrap justify-between gap-x-16  gap-y-10 ">
        {pathname === "/home2" ? (
          <Image
            src={oh3}
            alt="oh3"
            className="w-[130px] h-auto hover:scale-110 transition duration-300"
          />
        ) : (
          <Image
            src={Tinder}
            alt="Tinder"
            className="w-[125px] h-[50px] hover:scale-110 transition duration-300"
          />
        )}

        <Image
          src={EA}
          alt="EA"
          className="w-[125px] h-[50px] hover:scale-110 transition duration-300"
        />
        <Image
          src={Amazon}
          alt="Amazon"
          className="w-[125px] h-[50px] hover:scale-110 transition duration-300"
        />
        <Image
          src={Slack}
          alt="Slack"
          className="w-[125px] h-[50px] hover:scale-110 transition duration-300"
        />
        <Image
          src={Airbnb}
          alt="Airbnb"
          className="w-[125px] h-[50px] hover:scale-110 transition duration-300"
        />
        <Image
          src={Intel}
          alt="Intel"
          className="w-[125px] h-[50px] hover:scale-110 transition duration-300"
        />
        <Image
          src={Walmart}
          alt="Walmart"
          className="w-[125px] h-[50px] hover:scale-110 transition duration-300"
        />
        <Image
          src={Linkedin}
          alt="Linkedin"
          className="w-[125px] h-[50px] hover:scale-110 transition duration-300"
        />
        <Image
          src={Google}
          alt="Google"
          className="w-[125px] h-[50px] hover:scale-110 transition duration-300"
        />
        <Image
          src={Lya}
          alt="Lya"
          className="w-[125px] h-[50px] hover:scale-110 transition duration-300"
        />
        <Image
          src={Spotify}
          alt="Spotify"
          className="w-[125px] h-[50px] hover:scale-110 transition duration-300"
        />
        {pathname === "/home2" ? (
          <Image
            src={oh4}
            alt="oh4"
            className="w-[120px] h-auto hover:scale-110 transition duration-300"
          />
        ) : (
          <Image
            src={NationalGeographic}
            alt="NationalGeographic"
            className="w-[125px] h-[50px] hover:scale-110 transition duration-300"
          />
        )}
      </div>
    </div>
  );
}
