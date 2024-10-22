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
      href: "/admin/authors/add",
      label: "Add Author",
      roles: ["admin"],
    },
    {
      href: "/admin/authors/all",
      label: "All Authors",
      roles: ["admin"],
    },
    {
      href: "/admin/blogs/add",
      label: "Add Blog",
      roles: ["admin", "employee"],
    },
    {
      href: "/admin/blogs/all",
      label: "All Blog",
      roles: ["admin"],
    },
    {
      href: "/authors/blogs/all",
      label: "All Blog",
      roles: ["employee"],
    },
    {
      href: "/admin/tutorials/add",
      label: "Add Tutorial",
      roles: ["admin"],
    },
    {
      href: "/admin/tutorials/all",
      label: "All Tutorial",
      roles: ["admin"],
    },
    {
      href: "/authors/tutorials/all",
      label: "All Tutorial",
      roles: ["employee"],
    },
    {
      href: "/admin/categories/add",
      label: "Add Category",
      roles: ["admin"],
    },
    {
      href: "/admin/categories/all",
      label: "All Categories",
      roles: ["admin"],
    },
    {
      href: "/admin/footer/add",
      label: "Add Footer",
      roles: ["admin"],
    },
    {
      href: "/admin/footer/all",
      label: "All Footer",
      roles: ["admin"],
    },
    {
      href: "/admin/social-media/add",
      label: "Add Social Media",
      roles: ["admin"],
    },
    {
      href: "/admin/social-media/all",
      label: "All Social Media",
      roles: ["admin"],
    },
    {
      href: "/admin/favicon/add",
      label: "Add Favicon",
      roles: ["admin"],
    },
    {
      href: "/admin/logo/add",
      label: "Add Logo Text",
      roles: ["admin"],
    },
    {
      href: "/admin/sidebar-image/add",
      label: "Add Side Image",
      roles: ["admin"],
    },
  ];

  return (
    <div>
      <div className="space-y-2">
        {navItems
          .filter((item) => item.roles.includes(userRole))
          .map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="block bg-[#8a8883] text-white px-4 py-2 rounded"
            >
              <span className="font-semibold">{item.label}</span>
            </Link>
          ))}
        <button
          onClick={handleSignOut}
          className="w-full block bg-red-500 text-white px-4 py-2 rounded"
        >
          <span className="font-bold">Sign Out</span>
        </button>
      </div>
    </div>
  );
}
