"use client";

import React from "react";
import { motion, Variants, Transition } from "framer-motion";

// 1. Define the type for the transition property within Framer Motion
// We extend the Transition type from framer-motion to ensure all properties are valid.
interface AnimationSettings extends Transition {
    duration: number;
    delay?: number;
    repeat: number;
    repeatType: 'loop' | 'reverse' | 'mirror'; // Explicitly define valid repeat types
    repeatDelay?: number;
    ease: string;
}

// Defines the About component as a TypeScript Functional Component (React.FC)
const About: React.FC = () => {
  // 2. Define the main animation type structure
  interface BounceAnimationType{
      y: number[];
      transition: AnimationSettings;
  }
  
  // Animation for the image (slow, infinite bounce)
  // 3. Explicitly type the bounceAnimation object using the defined interface
  const bounceAnimation: BounceAnimationType = {
    y: [0, -20, 0], // Keyframes: Start, move up 20px, return
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
      repeatType: "loop",
    } as AnimationSettings, // Type assertion for the transition object
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
    <div className="min-h-screen  text-white flex items-center justify-center p-8 font-sans">
      <motion.div
        className="container mx-auto max-w-6xl p-6  rounded-xl shadow-2xl  "
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center mb-12 bg-clip-text text-white">
          About Me
        </h1>

        <div className="flex flex-col lg:flex-row items-center lg:items-start lg:space-x-16">
          
          {/* Left Side: Biodata/Text Content */}
          <motion.div 
            className="lg:w-1/2 space-y-6 order-2 lg:order-1 mt-10 lg:mt-0"
            variants={itemVariants}
          >
            <motion.p className="text-lg text-gray-300" variants={itemVariants}>
              Hello! I'm Hasanuzzaman Shawon, a dedicated YouTube Content Creator. From a clean mix in FL Studio to the final cut in Premiere Pro, I handle every step of the content pipeline. My goal is to deliver excellence that resonates with viewers.
            </motion.p>
            
            <motion.h2 className="text-2xl font-semibold text-cyan-400 pt-4" variants={itemVariants}>
              My Creator Toolkit
            </motion.h2>

            <motion.ul className="list-disc list-inside space-y-2 text-gray-300 pl-4" variants={containerVariants}>
              <motion.li variants={itemVariants}>Music & Audio Production.</motion.li>
              <motion.li variants={itemVariants}>Video Editing.</motion.li>
              <motion.li variants={itemVariants}>Thumbnail Design.</motion.li>
              <motion.li variants={itemVariants}>Audience Engagement.</motion.li>
            </motion.ul>

            <motion.p className="text-lg text-gray-300 pt-4" variants={itemVariants}>
             
            </motion.p>
          </motion.div>

          {/* Right Side: Image with Bouncing Animation */}
          <div className="lg:w-1/2 flex justify-center items-center order-1 lg:order-2">
            <motion.div
              className="p-4 border-4 border-violet-500/50 rounded-full shadow-2xl bg-gray-700"
              animate={bounceAnimation}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {/* Dummy Image - Use a square placeholder for a good avatar fit */}
              <img
                src="https://placehold.co/300x300/4F46E5/ffffff?text=Creator+Avatar"
                alt="Hasanuzzaman Shawon Avatar"
                className="rounded-full object-cover w-64 h-64 sm:w-80 sm:h-80"
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
