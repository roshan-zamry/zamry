"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Type for our refs

const ThreeScene = dynamic(() => import("./ThreeScene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gradient-to-br from-indigo-900/20 to-purple-900/20 rounded-3xl" />
  ),
});

const Hero = () => {
  // Initialize refs with proper types
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Check if refs are available
    if (!textRef.current?.children || !canvasRef.current || !heroRef.current)
      return;

    // Convert HTMLCollection to array for type safety
    const textChildren = Array.from(textRef.current.children);

    // Animated text entry
    const textTween = gsap.from(textChildren, {
      duration: 1.2,
      y: 40,
      opacity: 0,
      stagger: 0.15,
      ease: "power3.out",
      delay: 0.4,
    });

    // Floating animation for 3D container
    const canvasTween = gsap.to(canvasRef.current, {
      y: 20,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Background parallax effect
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

    // Cleanup animations
    return () => {
      textTween?.kill();
      canvasTween?.kill();
      parallaxTween?.scrollTrigger?.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen overflow-hidden text-white"
    >
      {/* WebGL Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src="/bannerbg.jpg"
          alt="Modern 3D background"
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

      {/* Floating particles */}
      <div className="absolute inset-0 z-1 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-indigo-400/10"
            style={{
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col-reverse md:flex-row items-center justify-center md:justify-between pt-32 pb-24 gap-12">
        {/* Text Content */}
        <div ref={textRef} className="w-full md:w-1/2 space-y-8">
          <div className="inline-flex items-center bg-indigo-500/10 px-4 py-2 rounded-full border border-indigo-400/30 backdrop-blur-sm">
            <span className="relative flex h-3 w-3 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
            </span>
            <span className="text-indigo-400 text-sm font-medium tracking-wider">
              NOW AVAILABLE
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold leading-tight tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-400 to-indigo-300 bg-[length:200%_200%] animate-gradient-shift">
              Next-Level
            </span>{" "}
            <br />
            Web Experiences
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 max-w-lg leading-relaxed">
            Powered by React 19, Three.js, and WebGL shaders for unparalleled
            performance and visuals.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <button className="relative group overflow-hidden bg-gradient-to-br from-indigo-600 to-purple-700 px-8 py-4 rounded-xl text-white font-medium transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-500/30">
              <span className="relative z-10 flex items-center gap-2">
                <span>Launch Experience</span>
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
              <span>View Demo</span>
            </button>
          </div>

          <div className="pt-8 flex items-center gap-6">
            <div className="flex -space-x-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full border-2 border-slate-800 bg-gray-700 overflow-hidden"
                >
                  {/* Placeholder for team avatars */}
                </div>
              ))}
            </div>
            <div className="text-sm text-gray-400">
              <p>Trusted by leading innovators</p>
              <p className="text-white font-medium">15,000+ developers</p>
            </div>
          </div>
        </div>

        {/* 3D Canvas */}
        <div
          ref={canvasRef}
          className="w-full md:w-1/2 h-[350px] sm:h-[450px] md:h-[550px] lg:h-[650px] relative"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 to-purple-900/20 rounded-3xl backdrop-blur-md border border-gray-700/50 shadow-2xl shadow-indigo-500/10 overflow-hidden">
            <ThreeScene />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="animate-bounce w-6 h-10 border-4 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-2 bg-gray-300 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
