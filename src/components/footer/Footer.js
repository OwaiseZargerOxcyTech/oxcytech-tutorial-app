import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

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
        const response = await fetch("/api/admin/footer");
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
        const response = await fetch("/api/admin/socialmedia");
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
          }));
        setActiveAccounts(activeAccount);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchActiveAccounts();
  }, []);

  return (
    <footer className="bg-gray-50 border-t border-gray-700 mt-4 pt-4 w-full">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Footer Links */}
          <ul className="flex flex-wrap gap-2 justify-center md:justify-start">
            {activeFooters.map((item, index) => (
              <li key={index} className="flex">
                <Link
                  href={`/ft/${item.label
                    .replace(/[^\w\s-]/g, "")
                    .trim()
                    .replace(/\s+/g, "-")
                    .replace(/-+/g, "-")}`}
                >
                  <p className="text-sm md:text-base">{item.label} /</p>
                </Link>
              </li>
            ))}
          </ul>

          {/* Social Media Accounts */}
          <ul className="flex flex-wrap gap-2 justify-center md:justify-start">
            {activeAccounts.map((item, index) => (
              <li key={index} className="flex items-center">
                <Link
                  href={item.href}
                  target="_blank"
                  className="flex items-center "
                >
                  <p className="text-sm md:text-base">{item.label} /</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
