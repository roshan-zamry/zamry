"use client";

import { motion, MotionValue } from "framer-motion";

type Particle = {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  xTransform: MotionValue<number>;
  yTransform: MotionValue<number>;
};

type ParticleFieldProps = {
  particles: Particle[];
};

const ParticleField = ({ particles }: ParticleFieldProps) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-blue-400"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            x: particle.xTransform,
            y: particle.yTransform,
          }}
        />
      ))}
    </div>
  );
};

export default ParticleField;
