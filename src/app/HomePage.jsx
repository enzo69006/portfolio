"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight, Globe, Smartphone, Palette, Cpu, Zap, Rocket } from "lucide-react";

import Reviews from "./intern/components/Reviews";

// Assets
import imageUnlatch from "./assets/project/mobile/unlatch.png";
import imageNdpj from "./assets/project/ndpj1.png";
import imageEcomeal from "./assets/project/ecomeal-presentation-1 .png"; // Note: filename has space based on LS

// --- COMPONENTS ---

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
      whileInView="visible"
      viewport={{ once: true }}
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
const GlowCard = ({ children, className, onClick }) => {
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
      onClick={onClick}
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
    <div className="relative flex overflow-hidden bg-black py-10">
      <div className="animate-marquee whitespace-nowrap flex gap-16">
        {items.map((item, i) => (
          <span key={i} className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-white opacity-80 uppercase">
            {item}
          </span>
        ))}
        {items.map((item, i) => (
          <span key={`dup-${i}`} className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-white opacity-80 uppercase">
            {item}
          </span>
        ))}
      </div>
      <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-white to-transparent z-10"></div>
      <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-white to-transparent z-10"></div>
    </div>
  );
};

// 4. Parallax Image
const ParallaxImage = ({ src, alt }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div ref={ref} className="relative w-full h-full overflow-hidden rounded-3xl">
      <motion.div style={{ y, height: "120%", width: "100%", position: "relative", top: "-10%" }}>
         {src ? (
            <Image 
                src={src} 
                alt={alt} 
                fill
                className="object-cover"
            />
         ) : (
            <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                <Rocket size={64} className="text-gray-700" />
            </div>
         )}
      </motion.div>
      <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
    </div>
  );
};

// 5. Animated Grid Background
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

// 6. 3D Tilt Composition (Laptop + Phone)
const TiltComposition = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-300, 300], [10, -10]);
  const rotateY = useTransform(x, [-300, 300], [-10, 10]);
  
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
      className="relative w-full h-[600px] flex items-center justify-center perspective-1000"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full max-w-[600px] h-[400px]"
      >
        {/* Laptop Base Layer */}
        <div className="absolute inset-0 bg-gray-900 rounded-xl shadow-2xl border-2 border-gray-800 transform translate-z-0 overflow-hidden">
             {/* Screen Content */}
             <div className="w-full h-full bg-white relative">
                <div className="h-6 bg-gray-100 border-b flex items-center gap-2 px-4">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="p-8 grid grid-cols-3 gap-4">
                    <div className="col-span-2 h-32 bg-gray-100 rounded-lg animate-pulse"></div>
                    <div className="h-32 bg-purple-100 rounded-lg animate-pulse delay-75"></div>
                    <div className="h-32 bg-gray-100 rounded-lg animate-pulse delay-100"></div>
                    <div className="col-span-2 h-32 bg-gray-100 rounded-lg animate-pulse delay-150"></div>
                </div>
             </div>
        </div>

        {/* Floating Phone Layer */}
        <motion.div 
            style={{ transform: "translateZ(50px)" }}
            className="absolute -right-10 -bottom-10 w-[180px] h-[350px] bg-black rounded-[2.5rem] border-4 border-gray-800 shadow-2xl overflow-hidden"
        >
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-6 bg-black rounded-b-xl z-20"></div>
             <div className="w-full h-full bg-white relative">
                 <div className="h-full w-full bg-gradient-to-b from-purple-500 to-purple-800 p-4 flex flex-col justify-between">
                    <div className="w-12 h-12 bg-white/20 rounded-full"></div>
                    <div className="space-y-2">
                        <div className="w-full h-20 bg-white/10 rounded-xl backdrop-blur-sm"></div>
                        <div className="w-full h-20 bg-white/10 rounded-xl backdrop-blur-sm"></div>
                    </div>
                 </div>
             </div>
        </motion.div>

        {/* Floating Elements */}
        <motion.div 
            style={{ transform: "translateZ(80px)" }}
            className="absolute -left-10 top-10 p-4 bg-white rounded-2xl shadow-xl flex items-center gap-3"
        >
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                <Zap size={20} />
            </div>
            <div>
                <p className="text-xs text-gray-400 font-bold">Performance</p>
                <p className="text-sm font-bold text-black">100/100</p>
            </div>
        </motion.div>

        <motion.div 
            style={{ transform: "translateZ(30px)" }}
            className="absolute -right-5 top-1/2 p-4 bg-white rounded-2xl shadow-xl flex items-center gap-3"
        >
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
                <Rocket size={20} />
            </div>
            <div>
                <p className="text-xs text-gray-400 font-bold">Growth</p>
                <p className="text-sm font-bold text-black">+240%</p>
            </div>
        </motion.div>

      </motion.div>
    </div>
  );
};


// 7. Horizontal Scroll Carousel
const HorizontalScrollCarousel = ({ items }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-75%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-black">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="absolute top-12 left-6 md:left-20 z-10 pointer-events-none">
             <h2 className="text-5xl md:text-8xl font-bold text-white tracking-tighter opacity-20">SELECTED<br/>WORKS</h2>
        </div>
        <motion.div style={{ x }} className="flex gap-8 pl-6 md:pl-20">
          {items.map((project, index) => (
             <div key={index} className="group relative h-[60vh] w-[85vw] md:w-[60vw] overflow-hidden rounded-[2.5rem] bg-neutral-900 border border-white/10">
                <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
                    <Image 
                    src={project.image} 
                    alt={project.title} 
                    fill 
                    className="object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-500" 
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                
                <div className="absolute bottom-0 left-0 w-full p-8 md:p-12">
                   <div className="flex items-center gap-4 mb-4">
                      <span className="px-4 py-2 rounded-full border border-white/20 text-white/80 text-xs font-mono uppercase tracking-widest backdrop-blur-md bg-white/5">{project.category}</span>
                      <span className="text-white/40 font-mono text-sm">{project.year}</span>
                   </div>
                   <h3 className="text-4xl md:text-7xl font-bold text-white mb-6 leading-none">{project.title}</h3>
                   <p className="text-gray-300 text-lg md:text-xl max-w-lg leading-relaxed mb-8 border-l-2 border-purple-500 pl-6">{project.desc}</p>
                   
                   <div className="flex items-center gap-4 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                        <span className="text-white font-bold">Voir le projet</span>
                        <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center">
                            <ArrowUpRight size={20} />
                        </div>
                   </div>
                </div>
             </div>
          ))}
          
          {/* Call to Action Card in the scroll */}
           <div className="relative h-[60vh] w-[85vw] md:w-[40vw] flex flex-col items-center justify-center bg-purple-600 rounded-[2.5rem] p-8 text-center">
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-8">Plus de<br/>projets ?</h3>
              <a href="#work" className="w-24 h-24 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition-transform duration-300">
                 <ArrowUpRight size={40} />
              </a>
           </div>
        </motion.div>
      </div>
    </section>
  );
};




export default function Home({ reviews }) {
  const projects = [
    {
      title: "Notre Dame de Paris",
      category: "Site Expérientiel",
      desc: "Immersion digitale au cœur de la reconstruction.",
      image: imageNdpj,
      year: "2024"
    },
    {
      title: "Ecomeal",
      category: "App Mobile & Web",
      desc: "Plateforme de planification de repas éco-responsable.",
      image: imageEcomeal,
      year: "2023"
    },
    {
      title: "Unlatch",
      category: "SaaS Immobilier",
      desc: "Digitalisation complète du processus de vente immobilière.",
      image: imageUnlatch,
      year: "2023"
    }
  ];

  const techStack = ["React", "Next.js", "TypeScript", "Node.js", "AWS", "Flutter", "SwiftUI", "GraphQL", "Three.js", "AI Integration"];

  return (
    <div className="bg-white text-black min-h-screen font-sans selection:bg-purple-500 selection:text-white">
      
      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
         <AnimatedGrid />
         
         <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
            <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 border border-purple-100 text-purple-600 text-sm font-medium mb-8">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                    </span>
                    Agence Digitale Créative
                </div>
                
                <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] mb-8">
                    WE BUILD<br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-black">DIGITAL</span><br/>
                    FUTURES.
                </h1>
                
                <p className="text-xl text-gray-500 max-w-lg mb-12 leading-relaxed">
                    Syntaax transforme vos idées en expériences digitales exceptionnelles. Web, Mobile, et Innovation technique.
                </p>

                <div className="flex flex-wrap gap-4">
                    <a href="/contact" className="px-8 py-4 bg-black text-white rounded-full font-bold hover:bg-gray-800 transition-colors">
                        Démarrer un projet
                    </a>
                    <a href="#work" className="px-8 py-4 bg-white text-black border border-gray-200 rounded-full font-bold hover:bg-gray-50 transition-colors">
                        Voir nos réalisations
                    </a>
                </div>
            </div>

            <div className="hidden lg:block">
                <TiltComposition />
            </div>
         </div>

         {/* Scroll Indicator */}
         <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-400"
         >
            <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center p-1">
                <div className="w-1 h-2 bg-gray-400 rounded-full"></div>
            </div>
         </motion.div>
      </section>

      {/* SERVICES - BENTO GRID */}
      <section className="py-32 px-6 bg-gray-50/50">
        <div className="container mx-auto max-w-6xl">
            <div className="mb-20">
                <RevealText text="Notre Expertise" className="text-sm font-mono text-purple-600 uppercase tracking-widest mb-4" />
                <h2 className="text-4xl md:text-6xl font-bold tracking-tight">Tout ce dont vous avez besoin<br/>pour réussir en ligne.</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-auto md:h-[600px]">
                {/* Large Card */}
                <GlowCard className="md:col-span-2 md:row-span-2 bg-black text-white rounded-[2.5rem] p-10 flex flex-col justify-between border border-gray-800">
                    <div className="flex justify-between items-start">
                        <div className="bg-white/10 p-3 rounded-2xl">
                            <Globe size={32} className="text-purple-400" />
                        </div>
                        <ArrowUpRight size={32} className="text-gray-500" />
                    </div>
                    <div>
                        <h3 className="text-4xl font-bold mb-4">Développement Web & SaaS</h3>
                        <p className="text-gray-400 text-lg max-w-md">
                            Des plateformes robustes, scalables et ultra-rapides. Next.js, React, Node.js. 
                            Nous construisons l'infrastructure de votre croissance.
                        </p>
                    </div>
                    <div className="absolute right-0 bottom-0 opacity-20 w-64 h-64">
                         <div className="w-full h-full bg-gradient-to-tl from-purple-500 to-transparent rounded-tl-full"></div>
                    </div>
                </GlowCard>

                {/* Tall Card */}
                <GlowCard className="md:row-span-2 bg-white text-black rounded-[2.5rem] p-10 border border-gray-200 flex flex-col justify-between group hover:border-purple-200 transition-colors">
                     <div>
                        <div className="bg-purple-50 p-3 rounded-2xl w-fit mb-8 text-purple-600">
                            <Smartphone size={32} />
                        </div>
                        <h3 className="text-3xl font-bold mb-4">Mobile First</h3>
                        <p className="text-gray-500">
                            iOS & Android. Des applications natives qui engagent vos utilisateurs dès la première seconde.
                        </p>
                     </div>
                     <div className="mt-8 flex gap-2">
                        <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-bold">SwiftUI</span>
                        <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-bold">Kotlin</span>
                     </div>
                </GlowCard>

                {/* Small Card 1 */}
                <GlowCard className="bg-white text-black rounded-[2.5rem] p-8 border border-gray-200 flex flex-col justify-center gap-4 hover:border-purple-200 transition-colors">
                     <div className="flex items-center gap-4">
                        <div className="bg-blue-50 p-3 rounded-xl text-blue-600"><Palette size={24} /></div>
                        <h3 className="text-xl font-bold">UI/UX Design</h3>
                     </div>
                     <p className="text-sm text-gray-500 pl-14">Interfaces intuitives et design system cohérents.</p>
                </GlowCard>

                {/* Small Card 2 */}
                <GlowCard className="bg-black text-white rounded-[2.5rem] p-8 border border-gray-800 flex flex-col justify-center gap-4">
                     <div className="flex items-center gap-4">
                        <div className="bg-yellow-400/10 p-3 rounded-xl text-yellow-400"><Cpu size={24} /></div>
                        <h3 className="text-xl font-bold">IA & Data</h3>
                     </div>
                     <p className="text-sm text-gray-400 pl-14">Intégration intelligente et automatisation.</p>
                </GlowCard>
            </div>
        </div>
      </section>

      {/* HORIZONTAL SCROLL PROJECTS */}
      <div id="work" className="mb-24">
        <HorizontalScrollCarousel items={projects} />
      </div>

      {/* REVIEWS SECTION */}
      <Reviews reviews={reviews} />

      {/* MARQUEE */}
      <div className="py-48">
        <Marquee items={techStack} />
      </div>

      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
}
