"use client";

import { motion, useTransform, MotionValue } from "framer-motion";
import { Experience } from "../types/Experience";

type ThreeDCardProps = {
  index: number;
  experience: Experience;
  scrollProgress: MotionValue<number>;
  isHologramActive: boolean;
  range: [number, number, number];
};

const ThreeDCard = ({
  index,
  experience,
  scrollProgress,
  isHologramActive,
  range,
}: ThreeDCardProps) => {
  const [start, midpoint, end] = range;

  const opacity = useTransform(
    scrollProgress,
    [start, start + 0.1, end - 0.1, end],
    [0, 1, 1, 0]
  );

  const y = useTransform(
    scrollProgress,
    [start, midpoint, end],
    [300, 0, -300]
  );
  const scale = useTransform(
    scrollProgress,
    [start, midpoint, end],
    [0.9, 1, 0.9]
  );
  const rotateY = useTransform(
    scrollProgress,
    [start, midpoint, end],
    [index % 2 ? -15 : 15, 0, index % 2 ? 15 : -15]
  );

  const glow = useTransform(
    scrollProgress,
    [start, midpoint, end],
    [
      "0 0 0 rgba(59,130,246,0)",
      isHologramActive
        ? "0 0 40px rgba(59,130,246,0.8)"
        : "0 0 20px rgba(59,130,246,0.3)",
      "0 0 0 rgba(59,130,246,0)",
    ]
  );

  return (
    <motion.div
      className="relative p-8 rounded-2xl border border-gray-800 bg-gradient-to-br from-[#0d1120] to-[#1a1b3a] overflow-hidden h-full w-full"
      style={{ opacity, y, scale, rotateY, boxShadow: glow }}
    >
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
      <div className="relative z-10 h-full flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <span className="text-blue-400 font-mono text-sm">
            {experience.year}
          </span>
          <span className="px-3 py-1 bg-blue-900/50 text-blue-300 rounded-full text-xs">
            {experience.company}
          </span>
        </div>
        <h3 className="text-2xl font-bold mb-3">{experience.title}</h3>
        <ul className="space-y-2 mb-6 flex-grow">
          {experience.description.map((item, i) => (
            <li key={i} className="flex items-start">
              <span className="text-blue-400 mr-2">▹</span>
              <span className="text-gray-300">{item}</span>
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-2 mb-4">
          {experience.stack.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 bg-blue-900/20 text-blue-300 rounded text-xs"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="text-sm text-blue-200">
          <strong>Impact:</strong> {experience.impact}
        </div>
      </div>
    </motion.div>
  );
};

export default ThreeDCard;
