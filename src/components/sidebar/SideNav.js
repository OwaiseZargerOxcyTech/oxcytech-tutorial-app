import Link from "next/link";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function SideNav() {
  const [userRole, setUserRole] = useState();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      setUserRole(session.user.name); // Assuming 'name' contains the role
    }
  }, [session, status]);

  const handleSignOut = async () => {
    await signOut();
    window.location.href = "/login";
  };

  const navItems = [
    {
      href: "/admin/authors/all",
      label: "Authors",
      roles: ["admin"],
    },
    {
      href: "/admin/categories/all",
      label: "Categories",
      roles: ["admin"],
    },
    {
      href: "/admin/blogs/all",
      label: "Blogs",
      roles: ["admin"],
    },
    {
      href: "/authors/blogs/all",
      label: "Blogs",
      roles: ["employee"],
    },

    {
      href: "/admin/pagecontent/all",
      label: "Pages",
      roles: ["admin"],
    },
    {
      href: "/admin/tutorials/all",
      label: "Tutorials",
      roles: ["admin"],
    },
    {
      href: "/authors/tutorials/all",
      label: "Tutorials",
      roles: ["employee"],
    },  
    {
      href: "/admin/logo/add",
      label: "Logo Text",
      roles: ["admin"],
    },
    {
      href: "/admin/featuredapp/add",
      label: "Featured app",
      roles: ["admin"],
    },
    {
      href: "/admin/sidebar-image/add",
      label: "Image in Sidebar",
      roles: ["admin"],
    },
    {
      href: "/admin/social-media/all",
      label: "Social Media",
      roles: ["admin"],
    },
    {
      href: "/admin/footer/all",
      label: "Footers",
      roles: ["admin"],
    },

    {
      href: "/admin/favicon/add",
      label: "Favicon",
      roles: ["admin"],
    },
  ];

  return (
    <div className="">
      {navItems
        .filter((item) => item.roles.includes(userRole))
        .map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className="block bg-[#3f4244] text-white mb-0.5 px-4 py-2 rounded-lg transition-transform hover:scale-105"
          >
            <span className="font-semibold">{item.label}</span>
          </Link>
        ))}
      <button
        onClick={handleSignOut}
        className="w-full block bg-red-500 text-white px-4 py-2 rounded transition-transform hover:scale-110"
      >
        <span className="font-bold ">Sign Out</span>
      </button>
    </div>
  );
}
