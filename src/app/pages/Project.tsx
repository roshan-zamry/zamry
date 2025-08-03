"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import samle from "../assets/bannerbg.jpg";

const projects = [
  {
    title: "E-Commerce Platform",
    description:
      "Full-featured online store with Stripe payment integration and inventory management",
    tags: ["React", "Node.js", "MongoDB"],
    colors: ["#8B5CF6", "#EC4899"],
    link: "#",
    image: samle,
  },
  {
    title: "AI Dashboard",
    description:
      "Real-time analytics dashboard for machine learning model performance monitoring",
    tags: ["Python", "TensorFlow", "D3.js"],
    colors: ["#10B981", "#3B82F6"],
    link: "#",
    image: samle, // Replace with your image path
  },
  {
    title: "Fitness Tracker",
    description:
      "Mobile app with workout plans, progress tracking, and social features",
    tags: ["React Native", "Firebase", "Expo"],
    colors: ["#F59E0B", "#EF4444"],
    link: "#",
    image: samle, // Replace with your image path
  },
  {
    title: "Blockchain Explorer",
    description:
      "Interactive visualization tool for Ethereum blockchain transactions",
    tags: ["Web3.js", "Ethers.js", "Three.js"],
    colors: ["#6366F1", "#A78BFA"],
    link: "#",
    image: samle, // Replace with your image path
  },
];

const ProjectCard = ({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative rounded-2xl overflow-hidden h-96 w-full cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Project Image with Zoom Effect */}
      <motion.div
        className="absolute inset-0"
        animate={{
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{ duration: 0.4 }}
      >
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
          quality={90}
        />
        {/* Gradient Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 50%)`,
          }}
        />
      </motion.div>

      {/* Project Info - Slides Up on Hover */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 p-6 z-10"
        animate={{
          y: isHovered ? 0 : 100,
          opacity: isHovered ? 1 : 0.9,
        }}
        transition={{ type: "spring", damping: 15 }}
      >
        <div className="mb-4">
          <motion.h3
            className="text-2xl font-bold text-white mb-1"
            animate={{
              x: isHovered ? 0 : -10,
            }}
          >
            {project.title}
          </motion.h3>
          <motion.p
            className="text-white/90 mb-3"
            animate={{
              x: isHovered ? 0 : -20,
            }}
            transition={{ delay: 0.1 }}
          >
            {project.description}
          </motion.p>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag, i) => (
            <motion.span
              key={i}
              className="px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm"
              style={{
                background: `rgba(255,255,255,0.2)`,
                color: project.colors[0],
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: isHovered ? 1 : 0,
                y: isHovered ? 0 : 10,
              }}
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
            className="inline-flex items-center font-medium text-white hover:text-opacity-80 transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            View Case Study
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-1"
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

      {/* Colorful Glow Effect */}
      <motion.div
        className="absolute inset-0 opacity-0 rounded-2xl"
        style={{
          boxShadow: `0 0 80px -20px ${project.colors[0]}`,
          background: `linear-gradient(45deg, ${project.colors[0]}, ${project.colors[1]})`,
        }}
        animate={{
          opacity: isHovered ? 0.3 : 0,
        }}
      />
    </motion.div>
  );
};

export default function ProjectsShowcase() {
  return (
    <div className="bg-black py-20 px-4">
      <div className="max-w-7xl mx-auto ">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Featured Projects
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Selected works showcasing my skills in development and design
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>

        <motion.div
          className="flex justify-center mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <button className="px-8 py-3 rounded-full font-medium text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl">
            View Full Portfolio →
          </button>
        </motion.div>
      </div>
    </div>
  );
}
