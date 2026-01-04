"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from "framer-motion";
import { ArrowUpRight, Heart, Zap, Award, Instagram, Linkedin, Twitter } from "lucide-react";

// --- COMPONENTS ---

// 1. Noise Texture Overlay
const NoiseOverlay = () => (
  <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.04] mix-blend-overlay">
    <div className="absolute inset-0 bg-repeat w-full h-full" style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }}></div>
  </div>
);

// 2. Spotlight Hero
const SpotlightHero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  const maskSize = isHovered ? 400 : 40;

  return (
    <section 
      className="relative h-screen bg-black flex flex-col items-center justify-center overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />

      {/* Main Text (Hidden by default, revealed by mask) */}
      <div className="relative z-20">
        <h1 
            className="text-[15vw] font-bold tracking-tighter leading-[0.8] text-white mix-blend-difference"
        >
          SYNTAAX
        </h1>
      </div>

      {/* The Mask Layer - This reveals the colored version */}
      <motion.div 
        className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none"
        animate={{
          maskPosition: `${mousePosition.x - maskSize / 2}px ${mousePosition.y - maskSize / 2}px`,
          maskSize: `${maskSize}px`,
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.2 }}
        style={{
          maskImage: "url('/mask.svg')", // Fallback or SVG shape
          maskRepeat: "no-repeat",
          WebkitMaskImage: `radial-gradient(circle ${maskSize}px at ${mousePosition.x}px ${mousePosition.y}px, black 100%, transparent 100%)`,
        }}
      >
         <div className="absolute inset-0 flex items-center justify-center bg-white">
            <h1 className="text-[15vw] font-bold tracking-tighter leading-[0.8] text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600 animate-gradient-x">
                SYNTAAX
            </h1>
         </div>
      </motion.div>

      {/* Subtitle */}
      <div className="absolute bottom-12 left-6 md:left-12 z-40 mix-blend-difference text-white">
        <p className="font-mono text-sm uppercase tracking-widest mb-2 opacity-50">EST. 2024</p>
        <p className="text-xl font-medium max-w-md">L'agence qui transforme le code en émotion.</p>
      </div>
    </section>
  );
};

// 3. Editorial Team Section
const EditorialTeam = () => {
  const [activeMember, setActiveMember] = useState(0);
  const containerRef = useRef(null);

  const team = [
    { name: "Alexandre", role: "CEO & Founder", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80" },
    { name: "Sarah", role: "Creative Director", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=1200&q=80" },
    { name: "Thomas", role: "Lead Developer", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=1200&q=80" },
    { name: "Emma", role: "UX Researcher", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1200&q=80" },
    { name: "David", role: "3D Artist", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=1200&q=80" },
  ];

  return (
    <section className="py-32 px-6 md:px-12 bg-white text-black min-h-screen flex flex-col md:flex-row gap-12 max-w-[1600px] mx-auto">
      {/* Left: Names List */}
      <div className="w-full md:w-1/2 flex flex-col justify-center space-y-8 z-10">
        <h2 className="text-sm font-bold tracking-widest uppercase text-gray-400 mb-8">L'ÉQUIPE</h2>
        {team.map((member, index) => (
          <motion.div 
            key={index}
            className="group cursor-pointer relative"
            onMouseEnter={() => setActiveMember(index)}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <h3 className={`text-5xl md:text-7xl font-bold tracking-tighter transition-colors duration-300 ${activeMember === index ? "text-black" : "text-gray-200 group-hover:text-gray-400"}`}>
              {member.name}
            </h3>
            <p className={`text-lg font-mono mt-2 transition-all duration-300 ${activeMember === index ? "text-purple-600 opacity-100 translate-x-2" : "text-gray-400 opacity-0 -translate-y-2 h-0 overflow-hidden"}`}>
              {member.role}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Right: Image Preview */}
      <div className="w-full md:w-1/2 relative h-[50vh] md:h-[80vh] rounded-[2rem] overflow-hidden">
        {team.map((member, index) => (
           <motion.div
             key={index}
             className="absolute inset-0 w-full h-full"
             initial={{ opacity: 0, scale: 1.1 }}
             animate={{ 
               opacity: activeMember === index ? 1 : 0,
               scale: activeMember === index ? 1 : 1.1,
               zIndex: activeMember === index ? 10 : 0
             }}
             transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
           >
              <Image 
                src={member.image} 
                alt={member.name} 
                fill 
                className="object-cover"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-black/20"></div>
           </motion.div>
        ))}
      </div>
    </section>
  );
};

// 4. Sticky Manifesto 2.0
const Manifesto = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const text = "Nous ne sommes pas juste une agence. Nous sommes des architectes numériques. Obsédés par le détail, guidés par l'innovation, et amoureux du code bien fait.";
  const words = text.split(" ");

  return (
    <div ref={containerRef} className="py-48 px-6 md:px-12 bg-white max-w-[1400px] mx-auto min-h-[80vh] flex items-center justify-center">
      <p className="text-4xl md:text-7xl font-bold leading-[1.1] tracking-tight text-center max-w-6xl flex flex-wrap justify-center gap-x-4 gap-y-2">
        {words.map((word, i) => {
          const start = i / words.length;
          const end = start + (1 / words.length);
          const opacity = useTransform(scrollYProgress, [start, end], [0.1, 1]);
          const y = useTransform(scrollYProgress, [start, end], [20, 0]);
          const blur = useTransform(scrollYProgress, [start, end], [10, 0]);
          
          return (
            <motion.span 
                key={i} 
                style={{ opacity, y, filter: useMotionTemplate`blur(${blur}px)` }} 
                className="transition-colors duration-200 inline-block"
            >
              {word}
            </motion.span>
          );
        })}
      </p>
    </div>
  );
};

// 5. Values with refined design (Interactive Accordion)
const Pillars = () => {
  const [activeId, setActiveId] = useState("02"); // Default middle one active for visual balance
  
  const pillars = [
    {
      id: "01",
      title: "Passion",
      desc: "Le feu qui nous anime. Chaque pixel est placé avec intention et dévouement.",
      icon: Heart,
      gradient: "from-rose-500 to-red-600"
    },
    {
      id: "02",
      title: "Innovation",
      desc: "Nous ne suivons pas les tendances, nous les créons pour façonner le futur.",
      icon: Zap,
      gradient: "from-amber-400 to-orange-500"
    },
    {
      id: "03",
      title: "Excellence",
      desc: "L'art de la perfection dans chaque ligne de code, sans compromis.",
      icon: Award,
      gradient: "from-violet-500 to-purple-600"
    }
  ];

  return (
    <section className="py-24 px-6 md:px-12 max-w-[1600px] mx-auto">
      <div className="mb-16">
        <h2 className="text-sm font-bold tracking-widest uppercase text-gray-400 mb-4">NOS VALEURS</h2>
        <h3 className="text-4xl md:text-6xl font-bold tracking-tighter">CE QUI NOUS DÉFINIT</h3>
      </div>
      
      <div className="flex flex-col md:flex-row h-[600px] gap-4">
        {pillars.map((pillar) => {
            const isActive = activeId === pillar.id;
            return (
                <motion.div
                    key={pillar.id}
                    layout
                    onMouseEnter={() => setActiveId(pillar.id)}
                    className={`relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${isActive ? 'md:flex-[3] flex-[3]' : 'md:flex-[1] flex-[1]'}`}
                >
                    {/* Backgrounds */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${pillar.gradient} transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`} />
                    <div className={`absolute inset-0 bg-gray-50 transition-opacity duration-500 ${isActive ? 'opacity-0' : 'opacity-100'}`} />
                    
                    {/* Content */}
                    <div className="relative z-10 h-full p-8 md:p-12 flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                            <span className={`text-xl font-mono ${isActive ? 'text-white/80' : 'text-gray-300'}`}>{pillar.id}</span>
                            <div className={`p-4 rounded-full transition-colors duration-300 ${isActive ? 'bg-white/20 text-white backdrop-blur-md' : 'bg-white text-black shadow-sm'}`}>
                                <pillar.icon size={24} />
                            </div>
                        </div>

                        <div className="relative overflow-hidden">
                            <motion.h3 
                                layout="position"
                                className={`text-3xl md:text-5xl font-bold tracking-tighter mb-4 transition-colors duration-300 ${isActive ? 'text-white' : 'text-black'}`}
                            >
                                {pillar.title}
                            </motion.h3>
                            <motion.p 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
                                transition={{ duration: 0.3, delay: 0.1 }}
                                className={`text-lg md:text-xl leading-relaxed max-w-lg ${isActive ? 'text-white/90 block' : 'hidden'}`}
                            >
                                {pillar.desc}
                            </motion.p>
                        </div>
                    </div>
                </motion.div>
            );
        })}
      </div>
    </section>
  );
};



const AboutPage = () => {
  return (
    <div className="bg-white text-black min-h-screen font-sans selection:bg-purple-500 selection:text-white overflow-x-hidden">
      <NoiseOverlay />
      
      <SpotlightHero />
      
      <Manifesto />
      
      <Pillars />

      <EditorialTeam />
    </div>
  );
};

export default AboutPage;

