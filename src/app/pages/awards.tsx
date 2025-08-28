"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import sampleAward from "../assets/bannerbg.jpg";
import { MotionValue } from "framer-motion";

const awards = [
  {
    title: "Best UI/UX Design 2024",
    description:
      "I built this award showcase to highlight intuitive interfaces and smooth interactions for multiple web projects.",
    tags: ["UI Design", "UX", "Frontend"],
    colors: ["#F59E0B", "#EF4444"],
    image: sampleAward,
  },
  {
    title: "Top Innovator 2023",
    description:
      "Showcasing innovative solutions and creative web development ideas through a dynamic awards layout.",
    tags: ["Innovation", "Web Development", "React"],
    colors: ["#10B981", "#3B82F6"],
    image: sampleAward,
  },
  {
    title: "Outstanding Frontend Dev 2022",
    description:
      "Highlighting performant and visually appealing frontend applications with stacked card animations.",
    tags: ["Frontend", "Next.js", "TypeScript"],
    colors: ["#8B5CF6", "#EC4899"],
    image: sampleAward,
  },
];

const AwardCard = ({
  award,
  progress,
}: {
  award: (typeof awards)[0];
  progress: MotionValue<number>;
}) => {
  const x = useTransform(progress, [0, 1], [-300, 0]);
  const opacity = useTransform(progress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <motion.div
      style={{ x, opacity }}
      className="absolute left-0 right-0 mx-auto w-full max-w-3xl h-80 rounded-2xl overflow-hidden"
    >
      <Image
        src={award.image}
        alt={award.title}
        fill
        className="object-cover rounded-2xl"
        quality={90}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent rounded-2xl" />
      <div className="absolute bottom-4 left-4 right-4 text-white z-10">
        <h3 className="text-xl font-bold mb-2">{award.title}</h3>
        <p className="text-sm mb-2">{award.description}</p>
        <div className="flex flex-wrap gap-2">
          {award.tags.map((tag: string, i: number) => (
            <span
              key={i}
              className="px-2 py-1 rounded-full text-xs backdrop-blur-sm"
              style={{
                background: `rgba(255,255,255,0.2)`,
                color: award.colors[0],
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div
        className="absolute inset-0 rounded-2xl"
        style={{
          boxShadow: `0 0 80px -20px ${award.colors[0]}`,
          background: `linear-gradient(45deg, ${award.colors[0]}, ${award.colors[1]})`,
          opacity: 0.2,
        }}
      />
    </motion.div>
  );
};

export default function AwardsPage() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Create progress transforms for each award at the top level
  const progress1 = useTransform(
    scrollYProgress,
    [0 / awards.length, 1 / awards.length],
    [0, 1]
  );
  const progress2 = useTransform(
    scrollYProgress,
    [1 / awards.length, 2 / awards.length],
    [0, 1]
  );
  const progress3 = useTransform(
    scrollYProgress,
    [2 / awards.length, 3 / awards.length],
    [0, 1]
  );

  const progressValues = [progress1, progress2, progress3];

  return (
    <div className="bg-black py-20 px-4 relative" ref={ref}>
      <div className="max-w-3xl mx-auto relative h-[200vh]">
        <h2 className="text-4xl font-bold text-white text-center mb-12">
          Awards & Recognition
        </h2>

        <div className="relative h-[80vh]">
          {awards.map((award, i) => (
            <AwardCard key={i} award={award} progress={progressValues[i]} />
          ))}
        </div>
      </div>
    </div>
  );
}
