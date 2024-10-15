"use client";
import "../globals.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Montserrat } from "next/font/google";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import { useEffect, useState } from "react";
import { baseUrlDev } from "@/components/utils/CommonUrls";
import Head from "next/head";


const montserrat = Montserrat({
  weight: ["300", "400"],
  subsets: ["latin"],
});


export default function RootLayout({ children }) {
  const [faviconImageUrl, setFaviconImageUrl] = useState("");
  useEffect(() => {
    const getfaviconimage = async () => {
      try {
        const baseUrl = {baseUrlDev};
        const response = await fetch(baseUrl + "/api/combinedapi", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ apiName: "getfavicon" }),
        });

        const { result } = await response.json();
        setFaviconImageUrl(result?.image);
      } catch (error) {
        console.log("error", error);
      }
    };
    getfaviconimage();
  }, []);
  return (
    <html lang="en" className="h-full bg-white">
      <head>
        <link rel="icon" href={faviconImageUrl} sizes="any" />
      </head>
      <Head><script src="../../../cron" type="module"/></Head>

      <body className={montserrat.className} suppressHydrationWarning={true}>
          <Navbar />
          <section>{children}</section>
          <Footer />   
      </body>
      
    </html>
  );
}
