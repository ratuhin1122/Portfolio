
import React from "react";
import { motion } from 'framer-motion';


// --- Placeholder for lucide-react ArrowRight ---
const ArrowRight = (props : any)  => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
);

// --- Placeholder for next/image ---
// Replaced Next.js Image with a standard img tag for environment compatibility
const PortfolioImage = ({ src, alt, width, height, className } : any) => (
  <img src={src} alt={alt} width={width} height={height} className={className} onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/120x120/5C2E91/ffffff?text=AVATAR"; }}/>
);

// --- Placeholder for "@/components/nurui/border-button" ---
// Modified to explicitly accept children to correctly embed the text and icon.
const BorderAnimationButton = ({ children, className = "" } : any) => {
  return (
    <motion.button 
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-lg font-medium text-white rounded-lg group bg-gradient-to-br from-cyan-500 to-violet-600 group-hover:from-cyan-500 group-hover:to-violet-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-cyan-800/50 transition-all duration-300 ${className}`}
    >
      <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-black/80 rounded-md group-hover:bg-opacity-0 flex items-center gap-1">
        {children}
      </span>
    </motion.button>
  );
};

// --- Placeholder for "@/components/nurui/button" (used for Contact button) ---
const Button = ({ children, className = "", variant = "default" } : any) => {
    const baseClasses = "rounded-lg text-lg font-medium px-6 py-2.5 transition-colors duration-300 shadow-lg";
    
    let variantClasses;
    if (variant === "outline") {
        variantClasses = "border border-white/30 text-white hover:bg-white/10 bg-transparent";
    } else {
        variantClasses = "bg-gradient-to-r from-cyan-400 to-violet-500 text-black hover:from-cyan-500 hover:to-violet-600";
    }

    return (
        <motion.button 
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            className={`${baseClasses} ${variantClasses} ${className} flex items-center justify-center`}
        >
            {children}
        </motion.button>
    );
};


const WavesHero = () => {
  return (
    <section className="relative flex min-h-screen w-full  items-center justify-center overflow-hidden pt-16 bg-black">
      {/* Animated Elements (No change) */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Curved Lines */}
        <svg
          className="absolute h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="grad1" x1="1" y1="0" x2="0" y2="0">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity="0" />
              <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="grad2" x1="1" y1="0" x2="0" y2="0">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0" />
              <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* Top Curves */}
          <motion.path
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
              repeatDelay: 1,
            }}
            d="M 100 100 Q 300 0 500 100 T 900 100"
            fill="none"
            stroke="url(#grad1)"
            strokeWidth="1"
          />
          <motion.path
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
              repeatDelay: 1,
              delay: 0.5,
            }}
            d="M 0 200 Q 200 100 400 200 T 800 200"
            fill="none"
            stroke="url(#grad2)"
            strokeWidth="1"
          />
          {/* Bottom Curves */}
          <motion.path
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
              repeatDelay: 1,
              delay: 1,
            }}
            d="M 100 600 Q 300 500 500 600 T 900 600"
            fill="none"
            stroke="url(#grad1)"
            strokeWidth="1"
          />
        </svg>

        {/* Straight Lines */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ x: "100%", opacity: 0 }}
              animate={{
                x: "-100%",
                opacity: [0, 0.7, 0.7, 0],
              }}
              transition={{
                duration: 2.5,
                delay: i * 0.2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                ease: "linear",
              }}
              className="absolute right-0"
              style={{
                top: `${15 + i * 10}%`,
                height: "3px",
                width: "100%",
                background: `linear-gradient(90deg, transparent, ${i % 2 === 0 ? "#22d3ee" : "#8b5cf6"}60, transparent)`,
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* Animated Background (No change) */}
      <div className="absolute inset-0 z-[1]">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="absolute -left-1/4 top-1/4 h-96 w-96 rounded-full bg-cyan-500/30 blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute -right-1/4 top-1/2 h-96 w-96 rounded-full bg-violet-500/30 blur-3xl"
        />
      </div>

      {/* Content Section - Updated */}
      <div className="container  items-center relative z-[3] px-4 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mx-auto max-w-3xl space-y-8"
        >
          {/* 1. Portfolio Photo/Avatar Section - Uncommented for placeholder */}
          {/* <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center"
          >
            <PortfolioImage
              // The path should be relative to the public directory, e.g., "/test.jpg" or "/images/test.jpg"
              src="/test.jpg" 
              alt="Your Portfolio Photo"
              width={120}
              height={120}
              className="rounded-full object-cover border-4 border-cyan-400/50 shadow-xl"
            />
          </motion.div> */}
          {/* End Photo Section */}

          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            Hi, I'm <br/> Hasanuzzaman Shawon <span className="text-cyan-400 ">Content </span> Creator
          </h1>
          <p className="mx-auto max-w-2xl text-gray-300 sm:text-xl">
            I build modern, performant, and delightful web applications using Next.js, React, and Tailwind CSS. Let's create something impactful.
          </p>
          
          <div className="flex justify-center space-x-4 cursor-pointer">
            <a href="https://www.youtube.com/@ShawonProduction">
            
            
            {/* FIX: Use BorderAnimationButton as a wrapper to contain both text and icon */}
            <BorderAnimationButton>
              View Channel
              <ArrowRight className="ml-2 h-5 w-5" />
            </BorderAnimationButton>
            
           </a>
            
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WavesHero;
