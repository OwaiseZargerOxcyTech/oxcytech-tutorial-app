import Link from "next/link";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function SideNav() {
  const [userRole, setUserRole] = useState();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      setUserRole(session.user.name);
    }
  }, [session, status]);

  const handleSignOut = async () => {
    await signOut();
    window.location.href = "/login";
  };
  return (
    <div>
      <div className="space-y-2 ">
        {userRole === "admin" && (
          <Link
            href="/addemployeeadmin"
            className="block bg-[#8a8883] text-white px-4 py-2  rounded"
          >
            <span className="font-semibold">Add Author</span>
          </Link>
        )}
        {userRole === "admin" && (
          <Link
            href="/allemployeeadmin"
            className="block bg-[#8a8883] text-white px-4 py-2 rounded"
          >
            <span className="font-semibold">All Authors</span>
          </Link>
        )}
        <Link
          href="/addblog"
          className="block bg-[#8a8883] text-white px-4 py-2 rounded"
        >
          <span className="font-semibold">Add Blog</span>
        </Link>
        {userRole === "admin" && (
          <Link
            href="/allblogadmin"
            className="block bg-[#8a8883] text-white px-4 py-2 rounded"
          >
            <span className="font-semibold">All Blog</span>
          </Link>
        )}
        {userRole === "employee" && (
          <Link
            href="/allblogemployee"
            className="block bg-[#8a8883] text-white px-4 py-2 rounded"
          >
            <span className="font-semibold">All Blog</span>
          </Link>
        )}
        {userRole === "admin" && (
          <Link
            href="/addtutorialadmin"
            className="block bg-[#8a8883] text-white px-4 py-2 rounded"
          >
            <span className="font-semibold">Add Tutorial</span>
          </Link>
        )}
        {userRole === "admin" && (
          <Link
            href="/alltutorialadmin"
            className="block bg-[#8a8883] text-white px-4 py-2 rounded"
          >
            <span className="font-semibold">All Tutorial</span>
          </Link>
        )}
        {userRole === "employee" && (
          <Link
            href="/alltutorialemployee"
            className="block bg-[#8a8883] text-white px-4 py-2 rounded"
          >
            <span className="font-semibold">All Tutorial</span>
          </Link>
        )}
        {userRole === "admin" && (
          <Link
            href="/addcategoryadmin"
            className="block bg-[#8a8883] text-white px-4 py-2 rounded"
          >
            <span className="font-semibold">Add Category</span>
          </Link>
        )}
        {userRole === "admin" && (
          <Link
            href="/allcategoryadmin"
            className="block bg-[#8a8883] text-white px-4 py-2 rounded"
          >
            <span className="font-semibold">All Categories</span>
          </Link>
        )}
        {userRole === "admin" && (
          <Link
            href="/addfaviconadmin"
            className="block bg-[#8a8883] text-white  px-4 py-2 rounded"
          >
            <span className="font-semibold">Add Favicon</span>
          </Link>
        )}
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
