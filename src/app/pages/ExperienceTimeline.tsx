"use client";
import React, { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  MotionValue,
} from "framer-motion";

type Experience = {
  year: string;
  title: string;
  company: string;
  description: string[];
  stack: string[];
  impact: string;
};

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

  const borderGlow = useTransform(
    scrollProgress,
    [start, midpoint, end],
    [
      "0 0 0 rgba(59,130,246,0)",
      isHologramActive
        ? "0 0 15px rgba(59,130,246,0.5)"
        : "0 0 5px rgba(59,130,246,0.1)",
      "0 0 0 rgba(59,130,246,0)",
    ]
  );

  return (
    <motion.div
      className="relative p-4 sm:p-6 md:p-8 rounded-2xl border border-gray-800 bg-gradient-to-br from-[#0d1120] to-[#1a1b3a] overflow-hidden h-full w-full"
      style={{
        opacity,
        y,
        scale,
        rotateY,
        boxShadow: glow,
        borderColor: isHologramActive
          ? "rgba(59,130,246,0.5)"
          : "rgba(255,255,255,0.1)",
        borderWidth: isHologramActive ? "1.5px" : "1px",
      }}
    >
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
      <motion.div
        className="absolute inset-0"
        style={{
          opacity: useTransform(
            scrollProgress,
            [start, midpoint, end],
            [0, isHologramActive ? 0.3 : 0, 0]
          ),
          background:
            "radial-gradient(circle at center, rgba(59,130,246,0.2) 0%, transparent 70%)",
        }}
      />
      <div className="relative z-10 h-full flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <motion.span
            className="text-blue-400 font-mono text-sm"
            style={{
              textShadow: isHologramActive
                ? "0 0 8px rgba(59,130,246,0.7)"
                : "none",
            }}
          >
            {experience.year}
          </motion.span>
          <motion.span
            className="px-3 py-1 bg-blue-900/50 text-blue-300 rounded-full text-xs"
            style={{
              boxShadow: isHologramActive
                ? "0 0 15px rgba(59,130,246,0.5)"
                : "none",
              scale: isHologramActive ? 1.05 : 1,
            }}
          >
            {experience.company}
          </motion.span>
        </div>
        <motion.h3
          className="text-xl sm:text-2xl font-bold mb-3"
          style={{
            textShadow: isHologramActive
              ? "0 0 10px rgba(59,130,246,0.5)"
              : "none",
          }}
        >
          {experience.title}
        </motion.h3>
        <ul className="space-y-2 mb-6 flex-grow text-sm sm:text-base">
          {experience.description.map((item, i) => (
            <motion.li
              key={i}
              className="flex items-start"
              initial={{ opacity: 0, x: -10 }}
              animate={{
                opacity: isHologramActive ? 1 : 0.8,
                x: 0,
              }}
              transition={{ delay: i * 0.05 }}
            >
              <span className="text-blue-400 mr-2">▹</span>
              <span className="text-gray-300">{item}</span>
            </motion.li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-2 mb-4">
          {experience.stack.map((tech) => (
            <motion.span
              key={tech}
              className="px-2 py-1 bg-blue-900/20 text-blue-300 rounded text-xs"
              whileHover={{
                scale: 1.1,
                boxShadow: "0 0 10px rgba(59,130,246,0.5)",
              }}
            >
              {tech}
            </motion.span>
          ))}
        </div>
        <motion.div
          className="text-sm text-blue-200"
          style={{
            textShadow: isHologramActive
              ? "0 0 5px rgba(59,130,246,0.5)"
              : "none",
          }}
        >
          <strong>Impact:</strong> {experience.impact}
        </motion.div>
      </div>
    </motion.div>
  );
};

const experiences: Experience[] = [
  {
    year: "2025",
    title: "CTO",
    company: "NeuroLink",
    description: [
      "Directed team of 50 engineers building brain-computer interfaces",
      "Developed neural compression algorithms (83% efficiency)",
      "Created real-time thought visualization system",
      "Patented 7 neuro-adaptive algorithms",
    ],
    stack: ["Python", "CUDA", "TF", "React"],
    impact: "Enabled 500k+ neural augmentations",
  },
  {
    year: "2027",
    title: "Chief Singularity Engineer",
    company: "OmniMind",
    description: [
      "Developed first AGI system with consciousness transfer",
      "Created self-evolving architecture that improves 12% weekly",
      "Designed ethical constraint framework for autonomous AI",
      "Pioneered quantum-neural hybrid computing",
    ],
    stack: ["NeuroScript", "QNN", "Plasma", "TensorFlow 9.0"],
    impact: "Achieved Turing-level consciousness in synthetic systems",
  },
  {
    year: "2029",
    title: "Quantum UI Architect",
    company: "MetaVerse Inc.",
    description: [
      "Designed first quantum-powered user interfaces",
      "Developed emotion-responsive UI framework",
      "Created cross-dimensional navigation patterns",
      "Pioneered neural design systems",
    ],
    stack: ["QML", "React-Quantum", "EmotionJS", "Web4D"],
    impact: "Shaped UX for 10M+ cross-reality users",
  },
  {
    year: "2031",
    title: "Reality Curator",
    company: "OmniCorp",
    description: [
      "Orchestrated personalized reality streams",
      "Developed context-aware reality blending",
      "Created ethical reality modulation framework",
      "Designed adaptive consciousness interfaces",
    ],
    stack: ["RealityJS", "NeuroCSS", "Flow-Quantum", "TensorMind"],
    impact: "Curated 1B+ personalized reality experiences",
  },
];

export function HyperExperienceTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeHologram, setActiveHologram] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const cardYRange = [400, 0, -400];
  const opacityRange = [0, 2, 2, 0];

  const cardYs = [
    useTransform(scrollYProgress, [0, 0.2, 0.4], cardYRange),
    useTransform(scrollYProgress, [0.2, 0.4, 0.6], cardYRange),
    useTransform(scrollYProgress, [0.4, 0.6, 0.8], cardYRange),
    useTransform(scrollYProgress, [0.6, 0.8, 0.9], cardYRange),
  ];

  const cardOpacities = [
    useTransform(scrollYProgress, [0, 0.1, 0.3, 0.4], opacityRange),
    useTransform(scrollYProgress, [0.2, 0.3, 0.5, 0.6], opacityRange),
    useTransform(scrollYProgress, [0.4, 0.5, 0.7, 0.8], opacityRange),
    useTransform(scrollYProgress, [0.6, 0.7, 0.9, 0.9], opacityRange),
  ];

  const titleOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.2], [0, -50]);

  // Connection lines between cards
  const lineProgress = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const lineDashOffset = useTransform(lineProgress, (val) => `${100 - val}%`);

  useMotionValueEvent(scrollYProgress, "change", (latest: number) => {
    const index = experiences.findIndex((_, i) => {
      const start = i * 0.2;
      const end = start + 0.4;
      return latest >= start + 0.15 && latest <= end - 0.15;
    });
    setActiveHologram(index === -1 ? null : index);
  });
  const totalScrollHeight = 100 + experiences.length * 35;

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden bg-[#0a0c1a]"
      style={{ height: "=100vh" }} // Changed to fixed 300vh - adjust this as needed
    >
      {/* Neon Cyberpunk City Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* City Skyline Silhouette */}

        {/* Neon Grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
          linear-gradient(to right, rgba(138, 43, 226, 0.1) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(138, 43, 246, 0.1) 1px, transparent 1px)
        `,
            backgroundSize: "50px 50px",
            opacity: 0.3,
          }}
        />

        {/* Floating Neon Signs */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-[#8a2be2] font-bold text-xl md:text-3xl"
            style={{
              top: `${Math.random() * 70 + 10}%`,
              left: `${Math.random() * 80 + 10}%`,
              textShadow: "0 0 10px #8a2be2",
              opacity: useTransform(
                scrollYProgress,
                [i * 0.1, i * 0.1 + 0.2],
                [0, 0.7]
              ),
              rotate: Math.random() * 10 - 5,
            }}
          >
            {
              [
                "OPEN",
                "24/7",
                "TECH",
                "NEON",
                "CYBER",
                "FUTURE",
                "DIGITAL",
                "PUNK",
              ][i]
            }
          </motion.div>
        ))}

        {/* Animated Neon Lights */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1/3"
          style={{
            background: `linear-gradient(
          to top,
          rgba(138, 43, 226, 0.3) 0%,
          rgba(138, 43, 226, 0.1) 50%,
          transparent 100%
        )`,
            opacity: useTransform(scrollYProgress, [0, 1], [0.3, 0.5]),
          }}
        />
      </div>

      {/* Connection lines */}
      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <motion.path
          d="M50% 20% Q 50% 40%, 30% 50% T 50% 80% Q 70% 90%, 50% 100%"
          stroke="rgba(138, 43, 226, 0.3)"
          strokeWidth="2"
          fill="transparent"
          strokeDasharray="5 5"
          strokeDashoffset={lineDashOffset}
        />
      </svg>

      {/* Sticky Content with Cards */}
      <div className="sticky top-0 h-full w-full flex items-start justify-center pt-8">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
          <motion.h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center mb-16">
            <motion.span
              className="block bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-600"
              style={{ opacity: titleOpacity, y: titleY }}
            >
              Beyond The Timeline
            </motion.span>
          </motion.h2>

          <div className="w-full max-w-7xl mx-auto relative z-10 min-h-[50vh] flex flex-col items-center justify-center gap-0">
            {experiences.map((experience, i) => (
              <motion.div
                key={i}
                className={`w-full ${
                  i % 2 === 0
                    ? "lg:w-[calc(75%-48px)] lg:self-start"
                    : "lg:w-[calc(75%-48px)] lg:self-end"
                }`}
                style={{
                  y: cardYs[i],
                  opacity: cardOpacities[i],
                  zIndex: activeHologram === i ? 10 : 1,
                }}
              >
                <ThreeDCard
                  index={i}
                  experience={experience}
                  scrollProgress={scrollYProgress}
                  isHologramActive={activeHologram === i}
                  range={[i * 0.2, i * 0.2 + 0.2, i * 0.2 + 0.4]}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HyperExperienceTimeline;
