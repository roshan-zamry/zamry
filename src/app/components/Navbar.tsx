"use client";

import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => setOpen(!open);

  return (
    <nav className="bg-slate-900 text-white p-4">
      <div className="flex items-center justify-between max-w-8xl mx-auto">
        {/* Logo with gradient hover effect */}
        <h1 className="text-2xl font-bold relative group">
          <span className="group-hover:opacity-0 transition-opacity duration-300">
            MyPortfolio
          </span>
          <span className="absolute inset-0 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 opacity-0 group-hover:opacity-100 hover:animate-gradient-x">
            MyPortfolio
          </span>
        </h1>

        {/* Rest of your navbar code remains the same */}
        <ul className="hidden md:flex gap-6">
          <li>
            <a href="#home" className="hover:text-orange-400">
              Home
            </a>
          </li>
          <li>
            <a href="#about" className="hover:text-orange-400">
              About
            </a>
          </li>
          <li>
            <a href="#skills" className="hover:text-orange-400">
              Skills
            </a>
          </li>
          <li>
            <a href="#projects" className="hover:text-orange-400">
              Projects
            </a>
          </li>
          <li>
            <a href="#contact" className="hover:text-orange-400">
              Get in Touch
            </a>
          </li>
        </ul>

        <button onClick={toggleMenu} className="md:hidden">
          {open ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {open && (
        <ul className="md:hidden mt-4 flex flex-col gap-4 text-center">
          <li>
            <a href="#home" onClick={toggleMenu}>
              Home
            </a>
          </li>
          <li>
            <a href="#about" onClick={toggleMenu}>
              About
            </a>
          </li>
          <li>
            <a href="#skills" onClick={toggleMenu}>
              Skills
            </a>
          </li>
          <li>
            <a href="#projects" onClick={toggleMenu}>
              Projects
            </a>
          </li>
          <li>
            <a href="#contact" onClick={toggleMenu}>
              Get in Touch
            </a>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
