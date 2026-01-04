"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight, Monitor, Zap, Globe, Lightbulb, Code2, Rocket, Layout, Search, Layers } from "lucide-react";

// --- COMPONENTS ---

// 0. Timeline Component (Horizontal/Grid adapted)
const TimelineItem = ({ number, title, desc, icon: Icon, isLast }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: number * 0.1 }}
      viewport={{ once: true, margin: "-50px" }}
      className="relative flex flex-col gap-6 group"
    >
      {/* Top: Icon & Line */}
      <div className="flex items-center">
        <div className="w-16 h-16 rounded-full bg-white border-2 border-gray-100 flex items-center justify-center text-xl font-bold text-gray-300 group-hover:border-purple-600 group-hover:text-purple-600 transition-colors duration-500 z-10 relative bg-white shadow-sm shrink-0">
            <Icon size={24} className="group-hover:scale-110 transition-transform duration-300" />
        </div>
        {!isLast && (
            <div className="h-px w-full bg-gray-100 ml-4 group-hover:bg-purple-200 transition-colors duration-500 hidden md:block"></div>
        )}
      </div>

      {/* Content */}
      <div className="pr-4">
        <span className="text-sm font-mono text-purple-600 mb-2 block tracking-wider uppercase">Phase 0{number}</span>
        <h3 className="text-2xl font-bold mb-4 text-black group-hover:text-purple-900 transition-colors">{title}</h3>
        <p className="text-sm text-gray-500 leading-relaxed group-hover:text-gray-700 transition-colors">
            {desc}
        </p>
      </div>
    </motion.div>
  );
};

// 1. Text Reveal Animation
const RevealText = ({ text, className }) => {
  const letters = Array.from(text);
  
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: 0.04 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      style={{ overflow: "hidden", display: "flex", flexWrap: "wrap" }}
      variants={container}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {letters.map((letter, index) => (
        <motion.span variants={child} key={index}>
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.div>
  );
};

// 2. Card with Mouse Glow Effect
const GlowCard = ({ children, className }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={`relative overflow-hidden group ${className}`}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(147, 51, 234, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
};

// 3. Infinite Marquee
const Marquee = ({ items }) => {
  return (
    <div className="relative flex overflow-hidden bg-white py-10 border-y border-gray-100">
      <div className="animate-marquee whitespace-nowrap flex gap-16">
        {items.map((item, i) => (
          <span key={i} className="text-4xl md:text-6xl font-bold text-gray-200 uppercase hover:text-purple-600 transition-colors cursor-default">
            {item}
          </span>
        ))}
        {items.map((item, i) => (
          <span key={`dup-${i}`} className="text-4xl md:text-6xl font-bold text-gray-200 uppercase hover:text-purple-600 transition-colors cursor-default">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

// 4. Animated Grid Background
const AnimatedGrid = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <div 
        className="absolute inset-0" 
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)`,
          backgroundSize: '4rem 4rem',
          maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)'
        }}
      />
      <motion.div
        animate={{ 
          backgroundPosition: ["0% 0%", "100% 100%"]
        }}
        transition={{ 
          duration: 40, 
          repeat: Infinity, 
          ease: "linear" 
        }}
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'radial-gradient(circle at center, rgba(147, 51, 234, 0.1) 0%, transparent 50%)',
          backgroundSize: '100% 100%'
        }}
      />
    </div>
  );
};

// 5. 3D Tilt Browser Window
const TiltBrowser = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-300, 300], [10, -10]);
  const rotateY = useTransform(x, [-300, 300], [-10, 10]);
  
  // Smooth out the rotation
  const springConfig = { damping: 25, stiffness: 150 };
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);

  function handleMouseMove(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <div 
      className="relative w-full h-[500px] flex items-center justify-center perspective-1000"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative w-[90%] md:w-[600px] h-[350px] md:h-[400px] bg-white rounded-xl shadow-2xl border border-gray-200/50"
      >
        {/* Browser Header */}
        <div className="h-10 bg-gray-50 border-b border-gray-100 rounded-t-xl flex items-center px-4 gap-2">
            <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
            </div>
            <div className="flex-1 ml-4 h-6 bg-white border border-gray-200 rounded-md flex items-center px-3 text-[10px] text-gray-400 font-mono">
                syntaax.io
            </div>
        </div>

        {/* Browser Content */}
        <div className="relative w-full h-[calc(100%-40px)] bg-white rounded-b-xl overflow-hidden p-6 flex flex-col gap-4">
             {/* Mockup Content */}
             <div className="w-full h-40 bg-gray-50 rounded-lg flex items-center justify-center overflow-hidden relative">
                 <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10"></div>
                 <motion.div 
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="w-24 h-24 bg-white shadow-lg rounded-full flex items-center justify-center z-10"
                 >
                     <Globe size={40} className="text-purple-600" />
                 </motion.div>
             </div>
             
             <div className="grid grid-cols-3 gap-4">
                 <div className="h-20 bg-gray-50 rounded-lg"></div>
                 <div className="h-20 bg-gray-50 rounded-lg"></div>
                 <div className="h-20 bg-gray-50 rounded-lg"></div>
             </div>
             
             {/* Floating Elements */}
             <motion.div 
                animate={{ x: [0, 20, 0], y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-20 right-10 w-16 h-16 bg-black rounded-lg shadow-xl z-20 flex items-center justify-center text-white font-bold"
             >
                 JS
             </motion.div>
             <motion.div 
                animate={{ x: [0, -15, 0], y: [0, 15, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-10 left-10 w-12 h-12 bg-purple-600 rounded-full shadow-xl z-20 flex items-center justify-center text-white"
             >
                 <Zap size={20} />
             </motion.div>
        </div>

        {/* Reflections/Glow */}
        <div className="absolute inset-0 rounded-xl pointer-events-none bg-gradient-to-tr from-purple-500/5 to-transparent z-30"></div>
      </motion.div>
    </div>
  );
};


const Page = () => {
  const techStack = ["Next.js", "React", "TypeScript", "Tailwind", "Node.js", "Supabase", "Vercel", "Stripe", "Framer Motion", "Three.js"];

  return (
    <div className="bg-white text-black min-h-screen font-sans selection:bg-purple-500 selection:text-white overflow-hidden">
      
      {/* HEADER / HERO */}
      <section className="relative pt-48 pb-32 px-6 max-w-[1600px] mx-auto min-h-[90vh] flex items-center overflow-hidden">
        {/* Animated Background */}
        <AnimatedGrid />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full relative z-10">
          {/* Text Side */}
          <div className="lg:col-span-7 relative">
             <div className="overflow-hidden">
                <motion.h1 
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="text-[13vw] leading-[0.8] font-bold tracking-tighter text-black mb-4"
                >
                  WEB
                </motion.h1>
             </div>
             <div className="overflow-hidden">
                <motion.h1 
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="text-[13vw] leading-[0.8] font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-black"
                >
                  BEYOND.
                </motion.h1>
             </div>
             
             <div className="mt-12 max-w-xl">
                <RevealText 
                    text="Des sites web immersifs qui convertissent. Nous repoussons les limites du navigateur pour créer des expériences inoubliables." 
                    className="text-2xl text-gray-600 leading-relaxed font-medium"
                />
             </div>
             
             <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="mt-12 flex gap-6"
             >
                <div className="flex items-center gap-4">
                    <div className="px-6 py-3 rounded-full bg-black text-white font-bold flex items-center gap-2">
                        Start Project <ArrowUpRight size={18} />
                    </div>
                    <div className="px-6 py-3 rounded-full border border-gray-200 font-bold hover:bg-gray-50 transition-colors cursor-pointer">
                        View Portfolio
                    </div>
                </div>
             </motion.div>
          </div>

          {/* Browser Side */}
          <div className="lg:col-span-5 hidden lg:block relative h-full min-h-[600px]">
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[500px] h-[500px] bg-blue-200/30 rounded-full blur-3xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 animate-pulse"></div>
                <TiltBrowser />
            </div>
          </div>
        </div>
      </section>

      {/* TECH STACK MARQUEE */}
      <Marquee items={techStack} />

      {/* BENTO GRID FEATURES */}
      <section className="px-6 py-20 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-auto md:h-[700px]">
          
          {/* Main Feature - BLACK CARD */}
          <GlowCard className="md:col-span-2 md:row-span-2 bg-black text-white rounded-[2.5rem] p-12 border border-gray-800">
            <div className="absolute top-10 right-10 p-2 bg-white/10 rounded-full backdrop-blur-md border border-white/10">
              <Layers size={32} className="text-white" />
            </div>
            <div className="h-full flex flex-col justify-between z-10 relative">
              <div className="mt-8">
                <motion.div
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   transition={{ delay: 0.2 }}
                >
                    <h3 className="text-5xl font-medium mb-6 tracking-tight">Next.js<br/>Powerhouse</h3>
                    <p className="text-gray-400 max-w-md text-lg leading-relaxed">
                    Le framework React pour la production. Rendu hybride, optimisation automatique des images et performance inégalée pour un SEO en béton.
                    </p>
                </motion.div>
              </div>
              <div className="mt-10 flex gap-4">
                <div className="bg-white/10 px-6 py-3 rounded-full text-white font-mono border border-white/20 hover:bg-white hover:text-black transition-colors cursor-default">Server Components</div>
                <div className="bg-white/10 px-6 py-3 rounded-full text-white font-mono border border-white/20 hover:bg-white hover:text-black transition-colors cursor-default">Edge Functions</div>
              </div>
            </div>
            {/* Background Gradient */}
            <div className="absolute -bottom-[20%] -right-[10%] w-[500px] h-[500px] bg-blue-900/30 rounded-full blur-[120px]"></div>
          </GlowCard>

          {/* Secondary Feature 1 */}
          <GlowCard className="bg-white text-black rounded-[2.5rem] p-10 flex flex-col justify-between border border-gray-100 shadow-xl shadow-gray-100/50">
             <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 text-purple-600">
                <Search size={28} />
             </div>
             <div>
               <h4 className="text-2xl font-medium mb-3">SEO First</h4>
               <p className="text-sm text-gray-500 leading-relaxed">Structure sémantique, Core Web Vitals au vert et indexation instantanée.</p>
             </div>
          </GlowCard>

          {/* Secondary Feature 2 */}
          <GlowCard className="bg-white text-black rounded-[2.5rem] p-10 flex flex-col justify-between border border-gray-100 shadow-xl shadow-gray-100/50">
             <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 text-blue-600">
                <Layout size={28} />
             </div>
             <div>
               <h4 className="text-2xl font-medium mb-3">Responsive</h4>
               <p className="text-sm text-gray-500 leading-relaxed">Une expérience fluide et adaptée, du mobile 4" à l'écran 5K.</p>
             </div>
          </GlowCard>
        </div>
      </section>

      {/* TIMELINE SECTION */}
      <section className="px-6 py-20 max-w-[1600px] mx-auto">
        <div className="mb-24 text-center md:text-left">
            <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-5xl md:text-7xl font-bold tracking-tighter text-black mb-6"
            >
                PROCESSUS <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-black">WEB</span>
            </motion.h2>
            <p className="text-xl text-gray-500 max-w-xl md:mx-0 mx-auto">Une méthodologie éprouvée pour des lancements sans friction.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 relative">
            <TimelineItem 
                number="1"
                title="Discovery"
                desc="Analyse de votre marché et définition des objectifs. Nous établissons l'architecture de l'information pour une conversion optimale."
                icon={Lightbulb}
            />
            <TimelineItem 
                number="2"
                title="UI/UX Design"
                desc="Création de maquettes haute fidélité interactives. Nous validons le parcours utilisateur avant de coder."
                icon={Layout}
            />
            <TimelineItem 
                number="3"
                title="Développement"
                desc="Intégration pixel-perfect avec React & Next.js. Animations fluides, CMS headless et code optimisé."
                icon={Code2}
            />
            <TimelineItem 
                number="4"
                title="Déploiement"
                desc="Mise en ligne sur infrastructure Edge (Vercel). Configuration du domaine, SSL et analytics."
                icon={Rocket}
                isLast={true}
            />
        </div>
      </section>

    </div>
  );
};

export default Page;
