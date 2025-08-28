"use client";

import { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setOpen(!open);

  // Smooth scroll on hash navigation
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleHash = () => {
        if (window.location.hash) {
          const el = document.querySelector(window.location.hash);
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
          }
        }
      };

      // run when hash changes
      window.addEventListener("hashchange", handleHash);
      // run on first load if page already has a hash
      handleHash();

      return () => window.removeEventListener("hashchange", handleHash);
    }
  }, [pathname]);

  return (
    <nav className="bg-slate-900 text-white p-4">
      <div className="flex items-center justify-between max-w-8xl mx-auto">
        {/* Logo */}
        <Link href="/">
          <h1 className="text-2xl font-bold relative group cursor-pointer">
            <span className="group-hover:opacity-0 transition-opacity duration-300">
              {"<rz />"}
            </span>
            <span className="absolute inset-0 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 hover:animate-gradient-x">
              {"<rz />"}
            </span>
          </h1>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-6">
          <li>
            <Link href="/#hero" className="hover:text-indigo-600">
              Home
            </Link>
          </li>
          <li>
            <Link href="/#timeline" className="hover:text-indigo-600">
              About
            </Link>
          </li>
          <li>
            <Link href="/#projects" className="hover:text-indigo-600">
              Projects
            </Link>
          </li>
          <li>
            <Link href="/#con-foot" className="hover:text-indigo-600">
              Get in Touch
            </Link>
          </li>
        </ul>

        {/* Mobile Toggle */}
        <button onClick={toggleMenu} className="md:hidden">
          {open ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <ul className="md:hidden mt-4 flex flex-col gap-4 text-center">
          <li>
            <Link href="/#hero" onClick={toggleMenu}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/#timeline" onClick={toggleMenu}>
              About
            </Link>
          </li>
          <li>
            <Link href="/#projects" onClick={toggleMenu}>
              Projects
            </Link>
          </li>
          <li>
            <Link href="/#con-foot" onClick={toggleMenu}>
              Get in Touch
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
