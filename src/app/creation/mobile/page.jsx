"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight, Smartphone, Zap, Shield, Lightbulb, Code2, Rocket, RefreshCw } from "lucide-react";
import imageUnlatch from "../../assets/project/mobile/unlatch.png";

// --- COMPONENTS ---

// 0. Timeline Component
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
        {items.map((item, i) => (
          <span key={`dup2-${i}`} className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-white opacity-80 uppercase">
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
                <Smartphone size={64} className="text-gray-700" />
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

// 6. 3D Tilt Phone
const TiltPhone = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-300, 300], [15, -15]);
  const rotateY = useTransform(x, [-300, 300], [-15, 15]);
  
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
        className="relative w-[300px] h-[580px] bg-gray-900 rounded-[3rem] p-4 shadow-2xl border-4 border-gray-800"
      >
        {/* Phone Frame Details */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-7 bg-black rounded-b-2xl z-20"></div>
        <div className="absolute -right-[2px] top-24 w-[3px] h-16 bg-gray-700 rounded-r-md"></div>
        <div className="absolute -left-[2px] top-24 w-[3px] h-8 bg-gray-700 rounded-l-md"></div>
        <div className="absolute -left-[2px] top-36 w-[3px] h-16 bg-gray-700 rounded-l-md"></div>

        {/* Screen Content */}
        <div className="relative w-full h-full bg-white rounded-[2.5rem] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="h-14 bg-gray-50 flex items-end justify-center pb-2 border-b border-gray-100">
             <div className="w-20 h-4 bg-gray-200 rounded-full"></div>
          </div>
          
          {/* App Grid Mockup */}
          <div className="p-4 grid grid-cols-2 gap-4 flex-1 content-start bg-gradient-to-br from-gray-50 to-purple-50">
             <motion.div 
               animate={{ scale: [0.95, 1, 0.95] }}
               transition={{ duration: 4, repeat: Infinity }}
               className="aspect-square rounded-2xl bg-purple-500 shadow-lg shadow-purple-200" 
             />
             <div className="aspect-square rounded-2xl bg-white shadow-sm" />
             <div className="aspect-square rounded-2xl bg-white shadow-sm" />
             <div className="aspect-square rounded-2xl bg-black shadow-lg" />
             <div className="col-span-2 h-24 rounded-2xl bg-white shadow-sm mt-4 p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-100"></div>
                <div className="space-y-2 flex-1">
                   <div className="h-2 w-2/3 bg-gray-100 rounded"></div>
                   <div className="h-2 w-1/2 bg-gray-100 rounded"></div>
                </div>
             </div>
          </div>

          {/* Bottom Nav */}
          <div className="h-20 bg-white border-t border-gray-100 flex items-center justify-around px-6">
             <div className="w-8 h-8 rounded-full bg-gray-100"></div>
             <div className="w-8 h-8 rounded-full bg-purple-100"></div>
             <div className="w-8 h-8 rounded-full bg-gray-100"></div>
          </div>
          
          {/* Home Bar */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-gray-300 rounded-full"></div>
        </div>

        {/* Reflections */}
        <div className="absolute inset-0 rounded-[3rem] pointer-events-none bg-gradient-to-tr from-white/10 to-transparent z-30"></div>
      </motion.div>
    </div>
  );
};


const Page = () => {
  const apps = [
    {
      title: "Unlatch",
      category: "Immobilier",
      desc: "Réservation de lieux et événements, gestion des disponibilités pour influenceurs.",
      image: imageUnlatch,
      stats: "Note 4.8/5",
    },
    {
      title: "Health Hub",
      category: "Bien-être",
      desc: "Suivi santé complet avec objectifs personnalisés et graphiques.",
      stats: "10k+ Utilisateurs",
    },
    {
      title: "Social Studio",
      category: "Social",
      desc: "Réseau social pour créatifs, partagez vos œuvres et collaborez.",
      stats: "À la Une",
    },
  ];

  const techStack = ["SwiftUI", "Kotlin", "React Native", "Flutter", "Node.js", "Firebase", "AWS", "GraphQL", "ARKit", "Metal"];

  return (
    <div className="bg-white text-black min-h-screen font-sans selection:bg-purple-500 selection:text-white overflow-hidden">
      
      {/* HEADER / HERO */}
      <section className="relative pt-32 pb-32 px-6 max-w-[1600px] mx-auto min-h-[90vh] flex items-center overflow-hidden">
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
                  MOBILE
                </motion.h1>
             </div>
             <div className="overflow-hidden">
                <motion.h1 
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="text-[13vw] leading-[0.8] font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-black"
                >
                  FIRST.
                </motion.h1>
             </div>
             
             <div className="mt-12 max-w-xl">
                <RevealText 
                    text="Nous concevons des expériences mobiles d'exception. L'alliance parfaite entre esthétique et ingénierie." 
                    className="text-2xl text-gray-600 leading-relaxed font-medium"
                />
             </div>
             
             <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="mt-12 flex gap-6"
             >
                <div className="flex -space-x-4">
                    {[1,2,3].map(i => (
                        <div key={i} className="w-12 h-12 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500 overflow-hidden">
                           <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300"></div>
                        </div>
                    ))}
                </div>
                <div>
                    <p className="font-bold text-black">1M+ Utilisateurs</p>
                    <p className="text-sm text-gray-500">satisfaits par nos apps</p>
                </div>
             </motion.div>
          </div>

          {/* Phone Side */}
          <div className="lg:col-span-5 hidden lg:block relative h-full min-h-[600px]">
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[500px] h-[500px] bg-purple-200/30 rounded-full blur-3xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 animate-pulse"></div>
                <TiltPhone />
            </div>
          </div>
        </div>
      </section>

      {/* BENTO GRID FEATURES */}
      <section className="px-6 py-20 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-auto md:h-[700px]">
          
          {/* Main Feature - BLACK CARD */}
          <GlowCard className="md:col-span-2 md:row-span-2 bg-black text-white rounded-[2.5rem] p-12 border border-gray-800">
            <div className="absolute top-10 right-10 p-2 bg-white/10 rounded-full backdrop-blur-md border border-white/10">
              <ArrowUpRight size={32} className="text-white" />
            </div>
            <div className="h-full flex flex-col justify-between z-10 relative">
              <div className="mt-8">
                <motion.div
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   transition={{ delay: 0.2 }}
                >
                    <h3 className="text-5xl font-medium mb-6 tracking-tight">Performance<br/>Native</h3>
                    <p className="text-gray-400 max-w-md text-lg leading-relaxed">
                    Exploitant toute la puissance de Swift et Kotlin pour des interfaces ultra-fluides à 120fps qui prennent vie sous vos doigts.
                    </p>
                </motion.div>
              </div>
              <div className="mt-10 flex gap-4">
                <div className="bg-white/10 px-6 py-3 rounded-full text-white font-mono border border-white/20 hover:bg-white hover:text-black transition-colors cursor-default">SwiftUI</div>
                <div className="bg-white/10 px-6 py-3 rounded-full text-white font-mono border border-white/20 hover:bg-white hover:text-black transition-colors cursor-default">Jetpack Compose</div>
              </div>
            </div>
            {/* Background Gradient */}
            <div className="absolute -bottom-[20%] -right-[10%] w-[500px] h-[500px] bg-purple-900/30 rounded-full blur-[120px]"></div>
          </GlowCard>

          {/* Secondary Feature 1 */}
          <GlowCard className="bg-black text-white rounded-[2.5rem] p-10 flex flex-col justify-between border border-gray-800">
             <div className="w-14 h-14 bg-yellow-400/10 rounded-2xl flex items-center justify-center mb-6 text-yellow-400 border border-yellow-400/20">
                <Zap size={28} />
             </div>
             <div>
               <h4 className="text-2xl font-medium mb-3">Ultra Rapide</h4>
               <p className="text-sm text-gray-400 leading-relaxed">Temps de chargement instantanés et transitions sans latence.</p>
             </div>
          </GlowCard>

          {/* Secondary Feature 2 */}
          <GlowCard className="bg-black text-white rounded-[2.5rem] p-10 flex flex-col justify-between border border-gray-800">
             <div className="w-14 h-14 bg-green-400/10 rounded-2xl flex items-center justify-center mb-6 text-green-400 border border-green-400/20">
                <Shield size={28} />
             </div>
             <div>
               <h4 className="text-2xl font-medium mb-3">Sécurité Max</h4>
               <p className="text-sm text-gray-400 leading-relaxed">Architecture blindée, chiffrement bancaire et biométrie.</p>
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
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-black">DE CRÉATION</span>
            </motion.h2>
            <p className="text-xl text-gray-500 max-w-xl md:mx-0 mx-auto">De l'idée brute au top des charts, nous orchestrons chaque étape avec précision.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 relative">
            <TimelineItem 
                number="1"
                title="Idéation & Stratégie"
                desc="Ateliers de co-conception pour affiner la vision. Nous définissons les user stories, créons les wireframes et validons la faisabilité technique."
                icon={Lightbulb}
            />
            <TimelineItem 
                number="2"
                title="Développement Agile"
                desc="Architecture robuste et code propre. Nous travaillons par sprints itératifs de 2 semaines, vous donnant une visibilité constante sur l'avancement."
                icon={Code2}
            />
            <TimelineItem 
                number="3"
                title="Push to Stores"
                desc="Gestion complète de la bureaucratie des stores. Création des fiches, screenshots marketing, conformité Apple/Google et validation garantie."
                icon={Rocket}
            />
            <TimelineItem 
                number="4"
                title="Maintenance & Scale"
                desc="L'aventure commence au lancement. Nous assurons le monitoring, les mises à jour de sécurité et l'ajout de nouvelles features."
                icon={RefreshCw}
                isLast={true}
            />
        </div>
      </section>

      {/* SELECTED WORKS - PARALLAX */}
      <section className="px-6 py-32 max-w-[1600px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 border-b border-gray-200 pb-12">
          <motion.h2 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-8xl font-bold tracking-tighter text-black"
          >
            NOS<br/>PROJETS
          </motion.h2>
          <div className="mt-8 md:mt-0 text-right">
            <p className="text-xl text-gray-500 font-light">L'excellence mobile</p>
            <p className="text-xl text-black font-medium">en action</p>
          </div>
        </div>

        <div className="space-y-40">
          {apps.map((app, index) => (
            <div 
              key={index}
              className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 md:gap-32 items-center group`}
            >
              {/* Parallax Image Side */}
              <div className="w-full md:w-1/2 aspect-[4/5] md:aspect-[3/4] relative">
                  <ParallaxImage src={app.image} alt={app.title} />
              </div>

              {/* Text Side */}
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-full md:w-5/12"
              >
                <div className="flex items-center gap-4 mb-8">
                    <span className="text-purple-600 font-mono text-sm tracking-widest uppercase border border-purple-200 px-4 py-2 rounded-full bg-purple-50">{app.category}</span>
                </div>
                <h3 className="text-5xl md:text-7xl font-bold mb-8 text-black group-hover:text-purple-600 transition-colors duration-500">{app.title}</h3>
                <p className="text-xl text-gray-500 leading-relaxed mb-10 border-l-2 border-gray-200 pl-6">{app.desc}</p>
                
                <div className="flex items-center gap-8">
                    <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Stats</p>
                        <p className="text-lg font-bold">{app.stats}</p>
                    </div>
                    <a href="#" className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <ArrowUpRight size={24} />
                    </a>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </section>

      {/* INFINITE MARQUEE */}
      <section className="py-20 bg-white">
         <div className="mb-12 text-center">
            <span className="text-sm font-mono text-purple-600 uppercase tracking-[0.3em]">Technologies & Outils</span>
         </div>
         <Marquee items={techStack} />
      </section>

      {/* CTA SECTION - WOW EFFECT */}
      <section className="py-40 px-6 text-center relative overflow-hidden bg-black text-white">
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-7xl md:text-9xl font-bold mb-12 tracking-tighter"
          >
            PRÊT À <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">CRÉER ?</span>
          </motion.h2>
          <p className="text-2xl text-gray-400 mb-16 max-w-2xl mx-auto font-light">
            Votre vision, notre expertise technique. Créons l'application qui changera votre industrie.
          </p>
          
          <motion.a 
             href="mailto:contact@syntaax.io" 
             whileHover={{ scale: 1.05 }}
             whileTap={{ scale: 0.95 }}
             className="relative inline-flex items-center justify-center px-12 py-6 bg-white text-black rounded-full font-bold text-xl overflow-hidden group"
          >
             <span className="relative z-10 group-hover:text-white transition-colors duration-300">Démarrer le projet</span>
             <div className="absolute inset-0 bg-purple-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
          </motion.a>
        </div>
        
        {/* Dynamic Background Glow */}
        <motion.div 
            animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3] 
            }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/20 rounded-full blur-[150px] pointer-events-none"
        />
      </section>
      
      {/* GLOBAL STYLES FOR MARQUEE */}
      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>

    </div>
  );
};

export default Page;
