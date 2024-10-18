import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";

export default function Footer() {
  const [activeFooters, setActiveFooters] = useState([]);
  const [activeAccounts, setActiveAccounts] = useState([]);
  const pathname = usePathname();

  useEffect(() => {
    const currentItem = activeFooters.find((item) => item.href === pathname);
    if (currentItem) {
      // Reset current status
      activeFooters.forEach((item) => (item.current = false));
      currentItem.current = true;
    }
  }, [pathname, activeFooters]);

  useEffect(() => {
    const fetchActiveFooters = async () => {
      try {
        const response = await fetch("/api/footer");
        if (!response.ok) {
          throw new Error("Failed to fetch footer");
        }
        const data = await response.json();
        const activeFooter = data
          .filter((footer) => footer.isActive)
          .map((footer) => ({
            label: footer.name,
            href: `/${footer.slug}`,
            current: false,
          }));
        setActiveFooters(activeFooter);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchActiveFooters();
  }, []);

  useEffect(() => {
    const currentItem = activeAccounts.find((item) => item.href === pathname);
    if (currentItem) {
      // Reset current status
      activeAccounts.forEach((item) => (item.current = false));
      currentItem.current = true;
    }
  }, [pathname, activeAccounts]);

  useEffect(() => {
    const fetchActiveAccounts = async () => {
      try {
        const response = await fetch("/api/socialmedia");
        if (!response.ok) {
          throw new Error("Failed to fetch accounts");
        }
        const data = await response.json();
        const activeAccount = data
          .filter((account) => account.isActive)
          .map((account) => ({
            label: account.name,
            href: account.link,
            current: false,
            icon: account.icon,
          }));
        setActiveAccounts(activeAccount);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchActiveAccounts();
  }, []);
  const getIcon = (icon) => {
    switch (icon.toLowerCase()) {
      case "facebook":
        return <FaFacebook size={24} />;
      case "twitter":
        return <FaTwitter size={24} />;
      case "instagram":
        return <FaInstagram size={24} />;
        case "linkedin":
        return <FaLinkedin size={24} />;
        case "youtube":
        return <FaYoutube size={24} />;
      default:
        return null;
    }
  };

  return (
    <footer className="bg-gray-800 text-gray-300 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-evenly">
          {/* Footer Links */}
          <div className="mb-6 md:mb-0">
            <h3 className="text-white text-lg font-semibold mb-2">Links</h3>
            <ul className="flex flex-col">
              {activeFooters.map((item, index) => (
                <li key={index} className="mr-6 mb-2">
                  <Link href={item.href} className="hover:text-white">
                    <b>{item.label}</b>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media Accounts */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-2">Follow Us</h3>
            <ul className="flex flex-col">
              {activeAccounts.map((item, index) => (
                <li key={index} className="mr-6 mb-4 flex items-center">
                  <Link
                    href={item.href}
                    target="_blank"
                    className="flex items-center hover:text-white"
                  >
                    {getIcon(item.icon)}
                    <b className="ml-2">{item.label}</b>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 pt-4 text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} Your Company Name. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
