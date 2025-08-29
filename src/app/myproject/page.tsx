"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import samle from "../assets/bannerbg.jpg";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const myprojects = [
  {
    title: "Payoneer products demo",
    description:
      "Built with React, Next.js, and TypeScript to showcase Payoneer's global events with easy browsing, filtering, and a responsive experience.",
    tags: ["React.js", "Next.js", "TypeScript"],
    colors: ["#6366F1", "#A78BFA"],
    link: "https://payoneer-indol.vercel.app/",
    image: samle,
  },
  {
    title: "Fujairah Run",
    description:
      "I created this WordPress site using Elementor and custom plugins for event registration. It demonstrates my skills in CMS, custom functionality, and event management.",
    tags: ["WordPress", "Custom Plugin", "Elementor"],
    colors: ["#10B981", "#3B82F6"],
    link: "https://fujairahrun.com/",
    image: samle,
  },
  {
    title: "EvoRide",
    description:
      "I designed this platform on Wix Studio to showcase electric vehicles. It highlights my skills in e-commerce, UI design, and creating a smooth product showcase experience.",
    tags: ["Wix Studio", "JavaScript", "UI Design"],
    colors: ["#F59E0B", "#EF4444"],
    link: "https://www.evoride.us/",
    image: samle,
  },
  {
    title: "Payoneer Events",
    description:
      "I built this site using React, Next.js, and TypeScript to showcase Payoneer's global events. I focused on making event details easy to browse, adding filtering, and ensuring a smooth, responsive experience.",
    tags: ["React.js", "Next.js", "TypeScript"],
    colors: ["#6366F1", "#A78BFA"],
    link: "https://payoneerevents.com/",
    image: samle,
  },
  {
    title: "CompanyName",
    description:
      "Built the CompanyName website to showcase free zone businesses with profiles and contacts.",
    tags: ["React", "Next.js", "TypeScript"],
    colors: ["#10B981", "#3B82F6"],
    link: "https://spiffy-treacle-b1736c.netlify.app/",
    image: samle,
  },
  {
    title: "NBF Art",
    description:
      "Built with Next.js, React, and Tailwind CSS, showcasing responsive, interactive web apps with focus on UI/UX and performance.",
    tags: ["React", "Next.js", "TypeScript"],
    colors: ["#8B5CF6", "#EC4899"],
    link: "https://nbf-art.com/",
    image: samle,
  },
];

const ProjectCard = ({
  project,
  index,
}: {
  project: (typeof myprojects)[0];
  index: number;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Scaled motion offsets for mobile
  const titleX = isMobile ? -5 : -10;
  const descX = isMobile ? -8 : -15;
  const overlayY = isMobile ? 50 : 100;

  return (
    <motion.div
      className="relative rounded-2xl overflow-hidden cursor-pointer sm:h-80 h-96 w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={() => setIsHovered(!isHovered)} // mobile tap toggle
    >
      {/* Background Image */}
      <motion.div
        className="absolute inset-0"
        animate={{ scale: isHovered ? 1.05 : 1 }}
        transition={{ duration: 0.4 }}
      >
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover w-full h-full"
          quality={90}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 50%)`,
          }}
        />
      </motion.div>

      {/* Overlay Content */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 z-10"
        animate={{ y: isHovered ? 0 : overlayY, opacity: isHovered ? 1 : 0.9 }}
        transition={{ type: "spring", damping: 15 }}
      >
        <motion.div className="mb-3 sm:mb-4">
          <motion.h3
            className="text-lg sm:text-2xl font-bold text-white mb-1 break-words"
            animate={{ x: isHovered ? 0 : titleX }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            {project.title}
          </motion.h3>
          <motion.p
            className="text-white/90 mb-2 sm:mb-3 text-xs sm:text-base break-words"
            animate={{ x: isHovered ? 0 : descX }}
            transition={{ delay: 0.1, type: "spring", stiffness: 100 }}
          >
            {project.description}
          </motion.p>
        </motion.div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
          {project.tags.map((tag, i) => (
            <motion.span
              key={i}
              className="px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium backdrop-blur-sm"
              style={{
                background: `rgba(255,255,255,0.2)`,
                color: project.colors[0],
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
              transition={{ delay: 0.2 + i * 0.05 }}
            >
              {tag}
            </motion.span>
          ))}
        </div>

        {/* View Site Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ delay: 0.3 }}
        >
          <a
            href={project.link}
            target="_blank"
            className="inline-flex items-center font-medium text-white text-sm sm:text-base hover:text-opacity-80 transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            View Site
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 sm:h-5 sm:w-5 ml-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </motion.div>
      </motion.div>

      {/* Colored Glow */}
      <motion.div
        className="absolute inset-0 opacity-0 rounded-2xl"
        style={{
          boxShadow: `0 0 80px -20px ${project.colors[0]}`,
          background: `linear-gradient(45deg, ${project.colors[0]}, ${project.colors[1]})`,
        }}
        animate={{ opacity: isHovered ? 0.3 : 0 }}
      />
    </motion.div>
  );
};

export default function ProjectsShowcase() {
  return (
    <div id="projects" className="bg-black py-16 sm:py-20 px-4">
      <Navbar />

      <div className="max-w-7xl mx-auto pt-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3 sm:mb-4">
            Things I&apos;ve Built
          </h2>
          <p className="text-base sm:text-xl text-white/70 max-w-2xl mx-auto">
            Selected works showcasing my skills in development and design
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {myprojects.map((myprojects, index) => (
            <ProjectCard key={index} project={myprojects} index={index} />
          ))}
        </div>

        {/* View Projects Button */}
        <motion.div
          className="flex justify-center mt-12 sm:mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        ></motion.div>
      </div>
      <Footer />
    </div>
  );
}
