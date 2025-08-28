"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useMemo, useCallback } from "react";

const testimonials = [
  {
    name: "Sajad Jaward",
    title: "Software Engineer",
    quote:
      "I highly endorse Zamry as an accomplished WordPress CMS web developer. Proficient in HTML, CSS, PHP, and WordPress. He crafts captivating and user-centric websites. Their meticulousness, adept problem-solving abilities, and aptitude for customizing WordPress themes contribute to their invaluable expertise. Zamry's unwavering commitment to delivering superior outcomes truly distinguishes them in the field.",
    image: "",
  },
  {
    name: "Shadeer",
    title: "CEO of Happymatch.lk & Global Study Path",
    quote:
      "I highly recommend Zamry as a WordPress and web developer. With his expertise in both areas, he possesses a unique skill set that allows him to create dynamic and user-friendly websites. Zamry consistently delivers high-quality work, paying meticulous attention to detail. His technical proficiency, problem-solving abilities, and strong work ethic make them a valuable asset to any team.",
    image: "",
  },
  {
    name: "Zaid",
    title: "Lead Web Developer at Cosmopole Consultancy",
    quote:
      "I highly recommend Zamry as a WordPress and web developer. His expertise in creating dynamic and user-friendly websites is impressive. Zamry consistently delivers high-quality work with great attention to detail. His technical skills, problem-solving abilities, and professionalism make him a valuable asset to any project or team.",
    image: "",
  },
];

// Predefined positions and sizes for the background elements
const BACKGROUND_ELEMENTS = [
  { width: 179.05, height: 196.92, top: 63.39, left: 10.35, x: 10, y: -5 },
  { width: 159.07, height: 130.57, top: 7.74, left: 91.26, x: -15, y: 10 },
  { width: 135.01, height: 175.68, top: 85.58, left: 87.76, x: 5, y: -8 },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [rotationInterval] = useState(5000); // 5 seconds

  const next = useCallback(
    () => setIndex((index + 1) % testimonials.length),
    [index]
  );
  const prev = useCallback(
    () => setIndex((index - 1 + testimonials.length) % testimonials.length),
    [index]
  );

  // Generate stable animation durations
  const durations = useMemo(() => [20, 25, 30], []);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (autoRotate) {
      intervalId = setInterval(() => {
        next();
      }, rotationInterval);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [autoRotate, next, rotationInterval]);

  const handleInteraction = (action: () => void) => {
    setAutoRotate(false);
    action();
    setTimeout(() => setAutoRotate(true), rotationInterval * 2);
  };

  return (
    <div className="bg-slate-950 py-24 px-4" style={{ overflow: "hidden" }}>
      {" "}
      <motion.h2
        className="text-center text-4xl font-bold mb-16 text-white"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Client Testimonials
      </motion.h2>
      <div className="max-w-4xl mx-auto relative h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-white/5 backdrop-blur-lg rounded-3xl shadow-xl border border-white/10 overflow-hidden"
          >
            {/* Subtle abstract shapes with fixed values */}
            <div className="absolute inset-0 opacity-10">
              {BACKGROUND_ELEMENTS.map((el, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-white/10 mix-blend-lighten blur-3xl"
                  style={{
                    width: `${el.width}px`,
                    height: `${el.height}px`,
                    top: `${el.top}%`,
                    left: `${el.left}%`,
                  }}
                  animate={{
                    x: [0, el.x],
                    y: [0, el.y],
                  }}
                  transition={{
                    duration: durations[i],
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "linear",
                  }}
                />
              ))}
            </div>

            <div className="relative z-10 h-full flex flex-col items-center justify-center p-8 text-center">
              {/* <motion.div
                className="w-20 h-20 rounded-full border-2 border-white/20 mb-6 overflow-hidden relative"
                whileHover={{ scale: 1.05 }}
              >
                <Image
                  src={testimonials[index].image}
                  alt={testimonials[index].name}
                  fill
                  className="object-cover"
                />
              </motion.div> */}

              <motion.blockquote
                className="text-sm md:text-xl font-medium text-white mb-6 max-w-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                “{testimonials[index].quote}”
              </motion.blockquote>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <p className="text-base font-semibold text-white">
                  {testimonials[index].name}
                </p>
                <p className="text-sm text-white/70">
                  {testimonials[index].title}
                </p>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4 z-20">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => handleInteraction(() => setIndex(i))}
              className={`w-3 h-3 rounded-full transition-all ${
                index === i ? "bg-white scale-125" : "bg-white/30"
              }`}
              aria-label={`View testimonial ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={() => handleInteraction(prev)}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-2 rounded-full backdrop-blur-sm z-20"
          aria-label="Previous testimonial"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          onClick={() => handleInteraction(next)}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-2 rounded-full backdrop-blur-sm z-20"
          aria-label="Next testimonial"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
