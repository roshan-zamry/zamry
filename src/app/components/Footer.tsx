"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// Seeded random number generator (consistent between server and client)
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

const PersonalFooter = () => {
  const name = "Alex Johnson";
  const title = "Senior Developer";
  const email = "alex.johnson@example.com";
  const phone = "+1 (555) 123-4567";

  // Generate a single random seed that will be used for all random values
  const [seed] = useState(() => Math.floor(Math.random() * 1000000));

  // Symbiote tendrils data
  const [tendrils, setTendrils] = useState<
    Array<{
      id: number;
      path: string;
      opacity: number;
      scale: number;
      x: number;
      y: number;
      rotate: number;
      animateX: number;
      animateY: number;
      animateRotate: number;
      duration: number;
    }>
  >([]);

  // Pre-calculate blob data using seeded random
  const blobs = Array.from({ length: 3 }).map((_, i) => {
    const blobSeed = seed + i * 100; // Different seed for each blob
    return {
      id: i,
      x: seededRandom(blobSeed) * 100,
      y: seededRandom(blobSeed + 1) * 100,
      width: 100 + seededRandom(blobSeed + 2) * 200,
      height: 100 + seededRandom(blobSeed + 3) * 200,
      color: i % 2 === 0 ? "bg-purple-900/30" : "bg-black/40",
      animateX: seededRandom(blobSeed + 4) * 2 - 1,
      animateY: seededRandom(blobSeed + 5) * 2 - 1,
      duration: 30 + seededRandom(blobSeed + 6) * 20,
    };
  });

  useEffect(() => {
    // Generate tendril paths using seeded random
    const generateTendrilPath = (tendrilSeed: number) => {
      const complexity = 5 + Math.floor(seededRandom(tendrilSeed) * 3);
      let path = "M0,0";
      for (let i = 1; i <= complexity; i++) {
        const x = i * (30 + seededRandom(tendrilSeed + i) * 20);
        const y = (seededRandom(tendrilSeed + i + 1) - 0.5) * 100;
        path += ` Q${x - 15},${y} ${x},${y}`;
      }
      return path;
    };

    // Generate 3-5 tendrils with consistent random values
    const tendrilCount = 3 + Math.floor(seededRandom(seed) * 2);
    setTendrils(
      Array.from({ length: tendrilCount }, (_, i) => {
        const tendrilSeed = seed + i * 50; // Different seed for each tendril
        return {
          id: i,
          path: generateTendrilPath(tendrilSeed),
          opacity: 0.03 + seededRandom(tendrilSeed + 2) * 0.02,
          scale: 0.8 + seededRandom(tendrilSeed + 3) * 0.4,
          x: seededRandom(tendrilSeed + 4) * 100,
          y: seededRandom(tendrilSeed + 5) * 100,
          rotate: seededRandom(tendrilSeed + 6) * 360,
          animateX: seededRandom(tendrilSeed + 7) * 2 - 1,
          animateY: seededRandom(tendrilSeed + 8) * 2 - 1,
          animateRotate: seededRandom(tendrilSeed + 9) * 10 - 5,
          duration: 20 + seededRandom(tendrilSeed + 10) * 10,
        };
      })
    );
  }, [seed]);

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 to-slate-950 overflow-hidden py-16 px-4 md:px-8 border-t border-slate-800">
      {/* Venom-like symbiote tendrils */}
      {tendrils.map((tendril) => (
        <motion.svg
          key={tendril.id}
          initial={{
            x: `${tendril.x}%`,
            y: `${tendril.y}%`,
            opacity: 0,
            rotate: tendril.rotate,
            scale: tendril.scale,
          }}
          animate={{
            x: [`${tendril.x}%`, `${tendril.x + tendril.animateX}%`],
            y: [`${tendril.y}%`, `${tendril.y + tendril.animateY}%`],
            rotate: [tendril.rotate, tendril.rotate + tendril.animateRotate],
            opacity: [0, tendril.opacity, 0],
            scale: [tendril.scale * 0.9, tendril.scale * 1.1],
          }}
          transition={{
            duration: tendril.duration,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          className="absolute pointer-events-none"
        >
          <path
            d={tendril.path}
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            className="text-purple-900/80"
          />
        </motion.svg>
      ))}

      {/* Subtle organic blobs */}
      {blobs.map((blob) => (
        <motion.div
          key={`blob-${blob.id}`}
          initial={{
            x: `${blob.x}%`,
            y: `${blob.y}%`,
            opacity: 0,
          }}
          animate={{
            x: [`${blob.x}%`, `${blob.x + blob.animateX}%`],
            y: [`${blob.y}%`, `${blob.y + blob.animateY}%`],
            opacity: [0, 0.03, 0],
          }}
          transition={{
            duration: blob.duration,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className={`absolute rounded-full ${blob.color}`}
          style={{
            width: `${blob.width}px`,
            height: `${blob.height}px`,
            filter: "blur(60px)",
          }}
        />
      ))}

      {/* Your content */}
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-12">
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg flex items-center justify-center mb-4">
              <span className="text-4xl font-bold text-white">3D</span>
            </div>
            <h2 className="text-xl font-bold text-white">{name}</h2>
            <p className="text-sm text-slate-400">{title}</p>
          </div>

          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
                Contact
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <svg
                    className="w-5 h-5 text-slate-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <a
                    href={`mailto:${email}`}
                    className="text-slate-300 hover:text-white transition-colors"
                  >
                    {email}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <svg
                    className="w-5 h-5 text-slate-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <a
                    href={`tel:${phone.replace(/\D/g, "")}`}
                    className="text-slate-300 hover:text-white transition-colors"
                  >
                    {phone}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
                Connect
              </h3>
              <div className="flex gap-4">
                {["LinkedIn", "GitHub", "Twitter", "Dribbble"].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="w-10 h-10 rounded-full bg-slate-800/50 hover:bg-slate-800/80 transition-colors flex items-center justify-center border border-slate-700/50"
                    aria-label={social}
                  >
                    <span className="text-slate-300 text-sm">{social[0]}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800/50 mt-12 pt-6 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} {name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default PersonalFooter;
