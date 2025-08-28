"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRouter } from "next/navigation";
import Bannerg from "../assets/bannerbg2.jpg";

// Dynamically import Three.js component with SSR disabled
const ThreeScene = dynamic(() => import("./ThreeScene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gradient-to-br from-indigo-900/20 to-purple-900/20 rounded-3xl" />
  ),
});

// Type for a floating dot
interface Dot {
  width: number;
  height: number;
  top: number;
  left: number;
  duration: number;
  delay: number;
}

const Hero = () => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [dots, setDots] = useState<Dot[]>([]);

  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);

    // Generate random dots on client
    const generatedDots: Dot[] = Array.from({ length: 20 }, () => ({
      width: Math.random() * 15,
      height: Math.random() * 15,
      top: Math.random() * 100,
      left: Math.random() * 100,
      duration: Math.random() * 20 + 5,
      delay: Math.random() * 5,
    }));
    setDots(generatedDots);

    gsap.registerPlugin(ScrollTrigger);

    return () => {
      // Cleanup GSAP
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      gsap.globalTimeline.clear();
    };
  }, []);

  useEffect(() => {
    if (
      !isMounted ||
      !textRef.current ||
      !canvasRef.current ||
      !heroRef.current
    )
      return;

    const textChildren = Array.from(textRef.current.children);

    // Text animation
    const textTween = gsap.from(textChildren, {
      duration: 1.2,
      y: 40,
      opacity: 0,
      stagger: 0.15,
      ease: "power3.out",
      delay: 0.4,
    });

    // Floating 3D canvas
    const canvasTween = gsap.to(canvasRef.current, {
      y: 20,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Background parallax
    const bgOverlay = heroRef.current.querySelector(".bg-overlay");
    const parallaxTween = bgOverlay
      ? gsap.to(bgOverlay, {
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
          y: 100,
          ease: "none",
        })
      : null;

    ScrollTrigger.refresh();

    const handleRouteChange = () => {
      ScrollTrigger.refresh();
      textTween.restart();
    };
    window.addEventListener("popstate", handleRouteChange);

    return () => {
      textTween.kill();
      canvasTween.kill();
      parallaxTween?.scrollTrigger?.kill();
      window.removeEventListener("popstate", handleRouteChange);
    };
  }, [isMounted, router]);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen overflow-hidden text-white"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src={Bannerg}
          alt="Hero Background"
          fill
          priority
          quality={100}
          className="object-cover"
        />
        <div className="bg-overlay absolute inset-0 bg-gradient-to-b from-slate-900/90 via-slate-900/50 to-slate-900/90" />

        {/* Animated grid overlay */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="grid"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </div>

      {/* Floating particles (client only) */}
      {isMounted && (
        <div className="absolute inset-0 z-1 overflow-hidden">
          {dots.map((dot, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-indigo-400/10"
              style={{
                width: `${dot.width}px`,
                height: `${dot.height}px`,
                top: `${dot.top}%`,
                left: `${dot.left}%`,
                animation: `float ${dot.duration}s linear infinite`,
                animationDelay: `${dot.delay}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col-reverse md:flex-row items-center justify-center md:justify-between pt-0 pb-24 gap-12">
        {/* Text */}
        <div ref={textRef} className="w-full md:w-1/2 space-y-8">
          <div
            className="inline-flex items-center bg-indigo-500/10 px-4 py-2 rounded-full backdrop-blur-sm"
            style={{
              border: "1.5px solid rgba(59,130,246,0.5)",
              boxShadow: "0 0 15px rgba(59,130,246,0.6)",
            }}
          >
            <span className="relative flex h-3 w-3 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
            </span>
            <span className="text-indigo-400 text-sm font-medium tracking-wider">
              Web Developer
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold leading-tight tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-400 to-indigo-300 bg-[length:200%_200%] animate-gradient-shift">
              Roshan Zamry
            </span>{" "}
            <br />
            Moulana
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 max-w-lg leading-relaxed">
            I&apos;m an experienced web developer with 4+ years of proven
            expertise in building responsive websites and web applications.
            Specialized in React.js, Next.js, TypeScript, and WordPress, I focus
            on delivering high-performance, user-friendly solutions.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <button
              onClick={() => {
                const el = document.getElementById("con-foot");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="relative group overflow-hidden bg-gradient-to-br from-indigo-600 to-purple-700 px-8 py-4 rounded-xl text-white font-medium transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-500/30"
            >
              <span className="relative z-10 flex items-center gap-2">
                <span>Let's Work Together</span>
                <svg
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </span>
              <span className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </button>

            <button className="px-8 py-4 rounded-xl font-medium transition-all duration-300 border-2 border-gray-600 hover:border-indigo-400 text-gray-300 hover:text-white hover:bg-gray-900/50 backdrop-blur-sm flex items-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              <a
                href="/cv/Roshan Zamry.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>Download CV</span>
              </a>
            </button>
          </div>
        </div>

        {/* 3D Canvas */}
        <div
          ref={canvasRef}
          className="w-full md:w-1/2 h-[350px] sm:h-[450px] md:h-[550px] lg:h-[550px] relative"
        >
          <div
            className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 to-purple-900/20 rounded-3xl backdrop-blur-md overflow-hidden"
            style={{
              border: "1.5px solid rgba(59,130,246,0.5)",
              boxShadow: "0 0 40px rgba(59,130,246,0.8)",
            }}
          >
            <ThreeScene scaleFactor={0.9} height="100%" />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        onClick={() => {
          const el = document.getElementById("timeline");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }}
      >
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <div className="animate-bounce w-6 h-10 border-4 border-gray-400 rounded-full flex justify-center">
            <div className="w-1 h-2 bg-gray-300 rounded-full mt-2"></div>
          </div>
        </div>
      </a>

      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes gradient-shift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animate-gradient-shift {
          animation: gradient-shift 4s ease infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;
