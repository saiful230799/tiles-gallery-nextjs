"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { usePathname, useRouter } from "next/navigation"; 
import {
  FiHome,
  FiGrid,
  FiUser,
  FiLogOut,
} from "react-icons/fi";
import { HiOutlineChevronDown } from "react-icons/hi";

const Navbar = () => {
  const [mounted, setMounted] = useState(false);
  const { data: session, isPending } = authClient.useSession();
  const pathname = usePathname();
  const router = useRouter(); 

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/login"); 
            router.refresh(); 
          },
        },
      });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const navLinkStyle = (path) =>
    `flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all duration-300 ${
      pathname === path
        ? "bg-primary text-white shadow-md shadow-primary/20"
        : "text-gray-600 hover:bg-gray-100 hover:text-primary"
    }`;

  if (!mounted) {
    return <nav className="sticky top-0 z-[100] bg-white border-b h-[72px]"></nav>;
  }

  return (
    <nav className="sticky top-0 z-[100] bg-white/90 backdrop-blur-md border-b border-gray-100 px-4 md:px-12 py-3">
      <div className="navbar max-w-7xl mx-auto p-0 flex justify-between items-center">


        <div className="flex-none">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-to-tr from-primary to-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:rotate-6 transition-transform">
              <FiGrid size={22} />
            </div>
            <span className="text-2xl font-black tracking-tighter text-gray-800">
              Tiles<span className="text-primary">Gallery</span>
            </span>
          </Link>
        </div>

        <div className="hidden lg:flex flex-1 justify-center">
          <ul className="flex items-center gap-3">
            <li>
              <Link href="/" className={navLinkStyle("/")}>
                <FiHome /> Home
              </Link>
            </li>
            <li>
              <Link href="/all-tiles" className={navLinkStyle("/all-tiles")}>
                <FiGrid /> All Tiles
              </Link>
            </li>
            {session && (
              <li>
                <Link href="/my-profile" className={navLinkStyle("/my-profile")}>
                  <FiUser /> My Profile
                </Link>
              </li>
            )}
          </ul>
        </div>

        <div className="flex-none">
          {isPending ? (
            <div className="w-24 h-9 bg-gray-100 animate-pulse rounded-xl"></div>
          ) : !session ? (
            <Link
              href="/login"
              className="btn btn-primary btn-md rounded-xl px-8 text-white border-none shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
            >
              Login
            </Link>
          ) : (
            <div className="dropdown dropdown-end">

              <div
                tabIndex={0}
                role="button"
                className="flex items-center gap-2 p-1.5 pr-3 rounded-full border border-gray-200 hover:bg-gray-50 transition-all cursor-pointer"
              >
                <div className="w-9 h-9 rounded-full overflow-hidden ring-2 ring-primary/10 bg-primary flex items-center justify-center text-white font-bold">
                  {session.user.image ? (
                    <img
                      alt="User"
                      src={session.user.image}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="uppercase">{session.user.name?.charAt(0)}</span>
                  )}
                </div>
                <span className="hidden md:block text-sm font-bold text-gray-700">
                  {session.user.name?.split(" ")[0]}
                </span>
                <HiOutlineChevronDown className="text-gray-400" />
              </div>
              <ul
                tabIndex={0}
                className="mt-4 z-[100] p-2 shadow-2xl menu menu-sm dropdown-content bg-base-100 rounded-2xl w-64 border border-gray-100 right-0"
              >
                <li className="px-4 py-3 bg-gray-50/50 rounded-xl mb-2">
                  <p className="text-[10px] text-primary font-black uppercase tracking-widest">Logged in as</p>
                  <p className="text-sm font-bold text-gray-800 truncate">{session.user.email}</p>
                </li>
                
                <div className="divider my-1 opacity-50"></div>
                
                <li>
                  <button 
                    onClick={handleLogout} 
                    className="py-3 text-red-500 font-bold flex items-center gap-3 hover:bg-red-50 rounded-lg w-full text-left"
                  >
                    <FiLogOut /> Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;