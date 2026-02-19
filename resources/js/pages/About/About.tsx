"use client";

import React from "react";
import { motion, Variants, Transition } from "framer-motion";

// 1. Define the type for the transition property within Framer Motion
// We extend the Transition type from framer-motion to ensure all properties are valid.
interface AnimationSettings {
    duration: number;
    delay?: number;
    repeat: number;
    repeatType: 'loop' | 'reverse' | 'mirror'; // Explicitly define valid repeat types
    repeatDelay?: number;
    ease: string;
}

import { CheckCircle } from "lucide-react";

// Defines the About component as a TypeScript Functional Component (React.FC)
const About: React.FC = () => {
  
  // Animation for the image (slow, infinite bounce)
  // 3. Explicitly type the bounceAnimation object using the defined interface
  const bounceAnimation = {
    y: [0, -20, 0], // Keyframes: Start, move up 20px, return
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
      repeatType: "loop" as "loop" | "reverse" | "mirror",
    }, 
  };

  // Explicitly define Variants type for Framer Motion containers
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  // Explicitly define Variants type for Framer Motion items
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen text-white flex items-center justify-center p-8 font-sans">
      <motion.div
        className="container mx-auto max-w-6xl p-6 rounded-xl shadow-2xl "
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center mb-12 lg:mb-36 bg-clip-text text-white">
          About Me
        </h1>

        <div className="flex flex-col lg:flex-row items-center lg:items-start lg:space-x-16">
          
          {/* Left Side: Biodata/Text Content */}
          <motion.div 
            className="lg:w-1/2 space-y-6 order-2 lg:order-1 mt-12 lg:mt-0"
            variants={itemVariants}
          >
            <motion.p className="text-lg text-gray-300 leading-relaxed" variants={itemVariants}>
              Hello! I'm <span className="text-cyan-400 font-semibold">Hasanuzzaman Shawon</span>, a dedicated YouTube Music Composer. From a clean mix in FL Studio to the final cut in Premiere Pro, I handle every step of the content pipeline. My goal is to deliver excellence that resonates with viewers.
            </motion.p>
            
            <motion.h2 className="text-2xl font-semibold text-cyan-400 pt-4" variants={itemVariants}>
              My Creator Toolkit
            </motion.h2>

            <motion.ul className="space-y-3 text-gray-300" variants={containerVariants}>
              {[
                "Music & Audio Production",
                "Video Editing",
                "Thumbnail Design",
                "Audience Engagement"
              ].map((item, index) => (
                <motion.li key={index} variants={itemVariants} className="flex items-center space-x-3">
                  <CheckCircle className="text-violet-500" size={20} />
                  <span>{item}</span>
                </motion.li>
              ))}
            </motion.ul>

            <motion.p className="text-lg text-gray-300 pt-4" variants={itemVariants}>
             
            </motion.p>
          </motion.div>

          {/* Right Side: Image with Bouncing Animation */}
          <div className="lg:w-1/2 flex justify-center items-center order-1 lg:order-2">
            <motion.div
              className="p-2 border-4 border-violet-500/50 rounded-full shadow-2xl bg-gray-700/50 backdrop-blur-sm"
              animate={bounceAnimation}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {/* Dummy Image - Use a square placeholder for a good avatar fit */}
              <img
                src="/images/My.jpg"
                alt="Hasanuzzaman Shawon Avatar"
                loading="lazy"
                className="rounded-full object-cover w-64 h-64 sm:w-80 sm:h-80 shadow-inner"
                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => { 
                    e.currentTarget.onerror = null; 
                    e.currentTarget.src="https://placehold.co/300x300/4F46E5/ffffff?text=AVATAR"; 
                }}
              />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default About;
