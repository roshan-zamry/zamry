"use client";

import { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setOpen(!open);

  // Handle scroll for sticky effect with blur
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <nav
      className={`fixed top-0 left-0 right-0 z-50 p-4 transition-all duration-300 ${
        isScrolled
          ? "bg-slate-900/80 backdrop-blur-md shadow-lg"
          : "bg-slate-900"
      }`}
    >
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
            <Link
              href="/#hero"
              className="hover:text-indigo-400 transition-colors duration-300"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/#timeline"
              className="hover:text-indigo-400 transition-colors duration-300"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/#projects"
              className="hover:text-indigo-400 transition-colors duration-300"
            >
              Projects
            </Link>
          </li>
          <li>
            <Link
              href="/#con-foot"
              className="hover:text-indigo-400 transition-colors duration-300"
            >
              Get in Touch
            </Link>
          </li>
        </ul>

        {/* Mobile Toggle */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 rounded-lg hover:bg-slate-800 transition-colors"
          aria-label="Toggle menu"
        >
          {open ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden mt-4 bg-slate-800/95 backdrop-blur-lg rounded-xl p-4 border border-slate-700">
          <ul className="flex flex-col gap-3">
            <li>
              <Link
                href="/#hero"
                onClick={toggleMenu}
                className="block py-2 px-4 rounded-lg hover:bg-slate-700/50 transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/#timeline"
                onClick={toggleMenu}
                className="block py-2 px-4 rounded-lg hover:bg-slate-700/50 transition-colors"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/#projects"
                onClick={toggleMenu}
                className="block py-2 px-4 rounded-lg hover:bg-slate-700/50 transition-colors"
              >
                Projects
              </Link>
            </li>
            <li>
              <Link
                href="/#con-foot"
                onClick={toggleMenu}
                className="block py-2 px-4 rounded-lg hover:bg-slate-700/50 transition-colors"
              >
                Get in Touch
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
