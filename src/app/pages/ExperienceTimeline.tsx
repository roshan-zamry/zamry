"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";

type Experience = {
  year: string;
  title: string;
  company: string;
  description: string[];
  stack: string[];
  impact?: string;
};

const experiences: Experience[] = [
  {
    year: "JULY 2023 - PRESENT ",
    title: "Web Developer ",
    company: "CX Unicorn l JLT, Dubai",
    description: [
      "Creating reusable components.",
      "Integration of APIs in React",
      "React Router for routing.",
      "Custom theme development and customization in WordPress Creating and customizing plugins.",
      "Familiarity with Elementor or other WordPress page builders.",
    ],
    stack: [
      "React",
      "TypeScript",
      "JavaScript",
      "PHP",
      "CodeIgniter",
      "WordPress",
      "Custom Plugins",
      "Data Table",
    ],
    impact:
      "Increased development efficiency and accelerated project delivery by implementing reusable components and optimizing workflows.",
  },
  {
    year: "SEP 2021 - MAY 2023",
    title: "Web Developer",
    company: "Brocrpt l Colombo, Sri lanka",
    description: [
      "Developed and maintained responsive websites using CMS like WordPress with HTML, CSS, and JavaScript",
      "Familiarity with Elementor or other WordPress page builders.",
      "Basic security and performance optimization in WordPress.",
      "Created SEO-friendly content ",
      "Improved speed and asset optimization.",
    ],
    stack: [
      "Trello",
      "JavaScript",
      "PHP",
      "Data Table",
      "CodeIgniter",
      "CMS",
      "WordPress",
      "Custom Plugins",
    ],
    impact:
      "Improved development workflow and project efficiency using Trello, PHP, and WordPress.",
  },
  {
    year: "SEP 2018 TO SEP 2021",
    title: "Data Analyst",
    company: "GLC Europe l Colombo, Sri Lanka",
    description: [
      "Created marketing materials such as banners, shipping labels,social media posts, and invoice forms",
      "Managed product website using Shopify and Wordpress ",
      "Photographed and edited apparels and accessories",
      "Pioneered neural design systems",
    ],
    stack: ["Excel", "Virtual Meeting Tools", "WordPress", "Custom Plugins"],
    impact:
      "Supported business growth by improving online store management and producing marketing materials that boosted customer engagement.",
  },
];

// ------------------- CARD COMPONENT -------------------
function ExperienceCard({ exp }: { exp: Experience }) {
  const { ref, inView } = useInView({ threshold: 0.6, triggerOnce: false });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9, y: 100 }}
      animate={
        inView
          ? {
              opacity: 1,
              scale: 1,
              y: 0,
              boxShadow: "0 0 40px rgba(59,130,246,0.8)",
            }
          : {
              opacity: 0,
              scale: 0.9,
              y: 100,
              boxShadow: "0 0 0 rgba(59,130,246,0)",
            }
      }
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative w-full max-w-3xl mx-auto p-6 sm:p-10 rounded-2xl border bg-gradient-to-br from-[#0d1120] to-[#1a1b3a] overflow-hidden"
      style={{
        borderColor: inView ? "rgba(59,130,246,0.5)" : "rgba(255,255,255,0.1)",
        borderWidth: inView ? "1.5px" : "1px",
      }}
    >
      {/* Grid overlay inside card */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />

      {/* Radial hologram glow */}
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, rgba(59,130,246,0.15) 0%, transparent 70%)",
          opacity: inView ? 0.4 : 0,
        }}
      />

      {/* Card Content */}
      <div className="relative z-10 space-y-4">
        {/* Year + Company */}
        <div className="flex justify-between items-center">
          <span
            className="text-blue-400 sm:text-sm text-[12px]"
            style={{
              textShadow: inView ? "0 0 8px rgba(59,130,246,0.7)" : "none",
            }}
          >
            {exp.year}
          </span>
          <span
            className="px-3 py-1 bg-blue-900/50 text-blue-300 rounded-full sm:text-sm text-[12px]"
            style={{
              boxShadow: inView ? "0 0 15px rgba(59,130,246,0.5)" : "none",
            }}
          >
            {exp.company}
          </span>
        </div>

        {/* Title */}
        <h3
          className="text-2xl font-bold text-white"
          style={{
            textShadow: inView ? "0 0 10px rgba(59,130,246,0.5)" : "none",
          }}
        >
          {exp.title}
        </h3>

        {/* Description */}
        <ul className="space-y-2 text-gray-300 text-sm">
          {exp.description.map((d, i) => (
            <motion.li
              key={i}
              className="flex gap-2"
              initial={{ opacity: 0, x: -10 }}
              animate={{
                opacity: inView ? 1 : 0,
                x: 0,
              }}
              transition={{ delay: i * 0.05 }}
            >
              <span className="text-blue-400">▹</span> {d}
            </motion.li>
          ))}
        </ul>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2">
          {exp.stack.map((s) => (
            <motion.span
              key={s}
              className="px-2 py-1 bg-blue-900/20 text-blue-300 rounded text-xs"
              whileHover={{
                scale: 1.1,
                boxShadow: "0 0 10px rgba(59,130,246,0.5)",
              }}
            >
              {s}
            </motion.span>
          ))}
        </div>

        {/* Impact */}
        <p
          className="text-sm text-blue-200"
          style={{
            textShadow: inView ? "0 0 5px rgba(59,130,246,0.5)" : "none",
          }}
        >
          <strong>Impact:</strong> {exp.impact}
        </p>
      </div>
    </motion.div>
  );
}

// ------------------- PAGE COMPONENT -------------------
export default function HyperExperienceTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [windowHeight, setWindowHeight] = useState(0);

  const [floatingItems, setFloatingItems] = useState<
    { top: string; left: string; rotate: number }[]
  >([]);

  useEffect(() => {
    setWindowHeight(window.innerHeight);
    const handleResize = () => setWindowHeight(window.innerHeight);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Generate floating positions AFTER mount (hydration safe)
  useEffect(() => {
    const items = Array.from({ length: 12 }).map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      rotate: Math.random() * 20 - 10,
    }));
    setFloatingItems(items);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const parallaxY1 = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -windowHeight * 0.2]
  );
  const parallaxY2 = useTransform(
    scrollYProgress,
    [0, 1],
    [0, windowHeight * 0.2]
  );
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  return (
    <section
      id="timeline"
      ref={containerRef}
      className="relative min-h-screen bg-[#0a0c1a] text-white overflow-hidden"
    >
      {/* Animated Cyberpunk Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Main grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(138,43,226,0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(138,43,226,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
            opacity: 0.3,
          }}
        />

        {/* Animated gradient orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(59,130,246,0.4) 0%, transparent 70%)",
            y: parallaxY1,
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-20 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(138,43,226,0.4) 0%, transparent 70%)",
            y: parallaxY2,
          }}
        />

        {/* Floating cyberpunk elements */}
        {floatingItems.map((item, i) => (
          <motion.div
            key={i}
            className="absolute text-[#3b82f680] font-bold text-lg md:text-2xl"
            style={{
              top: item.top,
              left: item.left,
              textShadow: "0 0 10px #8a2be2",
              opacity: 0.7,
              rotate: item.rotate,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.4, 0.8, 0.4],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {
              [
                "React.js",
                "Next.js",
                "HTML",
                "CSS",
                "JavaScript",
                "TypeScript",
                "Tailwind",
                "Chakra-UI",
                "GIT,GITHUB",
                "Azure-DevOps",
                "WordPress",
              ][i]
            }
          </motion.div>
        ))}
      </div>

      {/* Sticky Title */}
      <motion.div
        className="sticky top-10 z-20 text-center"
        style={{ opacity, scale }}
      >
        <h2 className="text-5xl sm:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-600">
          Beyond
          <br />
          The Timeline
        </h2>
      </motion.div>

      {/* Cards Container */}
      <div className="relative z-10 flex flex-col gap-40 py-40">
        {experiences.map((exp, i) => (
          <ExperienceCard exp={exp} key={i} />
        ))}
      </div>

      {/* Global Grid Pattern */}
      <style jsx global>{`
        .bg-grid-pattern {
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(59 130 246 / 0.1)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e");
        }
      `}</style>
    </section>
  );
}
