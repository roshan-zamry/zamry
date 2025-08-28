"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import samle from "../assets/bannerbg.jpg";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const myprojects = [
  {
    title: "Payoneer products demo",
    description:
      "I built this site using React, Next.js, and TypeScript to showcase Payoneer's global events. I focused on making event details easy to browse, adding filtering, and ensuring a smooth, responsive experience.",
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
      "Developed the CompanyName website to showcase businesses in the free zone, providing detailed company profiles and contacts.",
    tags: ["React", "Next.js", "TypeScript"],
    colors: ["#10B981", "#3B82F6"],
    link: "https://spiffy-treacle-b1736c.netlify.app/",
    image: samle,
  },
  {
    title: "NBF Art",
    description:
      "Developed using Next.js, React, and Tailwind CSS, this site showcases my expertise in building responsive, interactive web applications. The project emphasizes UI/UX design, responsive layouts, and performance optimization.",
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
      {/* Project Image with Zoom Effect */}
      <motion.div
        className="absolute inset-0"
        animate={{ scale: isHovered ? 1.05 : 1 }}
        transition={{ duration: 0.4 }}
      >
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
          quality={90}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 50%)`,
          }}
        />
      </motion.div>

      {/* Project Info - Slides Up */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 z-10"
        animate={{ y: isHovered ? 0 : 100, opacity: isHovered ? 1 : 0.9 }}
        transition={{ type: "spring", damping: 15 }}
      >
        <motion.div className="mb-3 sm:mb-4">
          <motion.h3
            className="text-xl sm:text-2xl font-bold text-white mb-1 break-words"
            animate={{ x: isHovered ? 0 : -10 }}
          >
            {project.title}
          </motion.h3>
          <motion.p
            className="text-white/90 mb-2 sm:mb-3 text-sm sm:text-base break-words"
            style={{ wordBreak: "break-word" }}
            animate={{ x: isHovered ? 0 : -20 }}
            transition={{ delay: 0.1 }}
          >
            {project.description}
          </motion.p>
        </motion.div>

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

      {/* Colorful Glow */}
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

export default function MyProjectPage() {
  return (
    <div className="bg-black min-h-screen">
      {/* Navbar on top */}
      <Navbar />

      {/* Page Content */}
      <div className="py-16 sm:py-20 px-4 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3 sm:mb-4">
            Featured Projects
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {myprojects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
