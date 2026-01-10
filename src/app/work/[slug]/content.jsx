"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Star, Layers, HardDrive, Smartphone, Globe, Share, Zap, Shield, Download } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

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

// 3. Animated Grid Background
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

export default function ProjectContent({ project, appStoreData }) {
  // Merge data
  const displayData = {
    title: appStoreData?.name || project.title,
    subtitle: appStoreData?.seller || project.client || "Syntaax",
    icon: appStoreData?.icon || project.coverImage || "/placeholder-icon.png",
    description: appStoreData?.description || project.description,
    rating: appStoreData?.averageRating || "4.8",
    ratingCount: appStoreData?.ratingCount || "120",
    age: appStoreData?.rating || "4+",
    version: appStoreData?.version || "1.0.0",
    releaseNotes: appStoreData?.releaseNotes || "Mise à jour de performance et corrections de bugs.",
    updated: appStoreData?.updated,
    size: appStoreData?.size ? (appStoreData.size / 1024 / 1024).toFixed(1) + " MB" : "45 MB",
    screenshots: appStoreData?.screenshots?.length > 0 ? appStoreData.screenshots : project.gallery,
    url: appStoreData?.url || project.link,
    category: appStoreData?.genres?.[0] || project.category,
    price: appStoreData?.price || "Gratuit",
    seller: appStoreData?.seller || project.client,
    compatibility: appStoreData?.compatibility ? `iOS ${appStoreData.compatibility}+` : "iOS 15.0+",
  };

  return (
    <div className="bg-white text-black min-h-screen font-sans selection:bg-purple-500 selection:text-white overflow-hidden">
      


      {/* HEADER / HERO */}
      <section className="relative pt-40 pb-20 px-6 max-w-[1600px] mx-auto min-h-[60vh] flex flex-col justify-center">
        <AnimatedGrid />
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-24 h-24 md:w-32 md:h-32 rounded-[2rem] overflow-hidden border border-gray-100 shadow-xl mb-8"
            >
                <Image src={displayData.icon} alt={displayData.title} width={128} height={128} className="object-cover w-full h-full" />
            </motion.div>

            <div className="overflow-hidden mb-6">
                <motion.h1 
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="text-6xl md:text-9xl font-bold tracking-tighter text-black"
                >
                  {displayData.title}
                </motion.h1>
            </div>
            
            <RevealText 
                text={displayData.subtitle} 
                className="text-2xl md:text-3xl text-gray-500 font-medium mb-10"
            />

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="flex flex-wrap gap-4"
            >
                {displayData.url ? (
                    <a 
                        href={displayData.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-black text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-purple-600 transition-colors flex items-center gap-2"
                    >
                        Obtenir l'App <ArrowUpRight size={20} />
                    </a>
                ) : (
                    <span className="bg-gray-100 text-gray-400 px-8 py-4 rounded-full font-bold text-lg cursor-not-allowed">
                        Bientôt disponible
                    </span>
                )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* STATS GRID (BENTO) */}
      <section className="px-6 py-20 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <GlowCard className="bg-black text-white rounded-[2rem] p-8 flex flex-col justify-between aspect-square md:aspect-auto md:h-64">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-yellow-400">
                    <Star size={24} fill="currentColor" />
                </div>
                <div>
                    <h3 className="text-4xl font-bold mb-1">{displayData.rating}</h3>
                    <p className="text-gray-400 text-sm uppercase tracking-wider">{displayData.ratingCount} avis</p>
                </div>
            </GlowCard>

            <GlowCard className="bg-gray-100 text-black rounded-[2rem] p-8 flex flex-col justify-between aspect-square md:aspect-auto md:h-64">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-purple-600 shadow-sm">
                    <Download size={24} />
                </div>
                <div>
                    <h3 className="text-4xl font-bold mb-1">{displayData.size}</h3>
                    <p className="text-gray-500 text-sm uppercase tracking-wider">Taille</p>
                </div>
            </GlowCard>

            <GlowCard className="bg-gray-100 text-black rounded-[2rem] p-8 flex flex-col justify-between aspect-square md:aspect-auto md:h-64">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-blue-600 shadow-sm">
                    <Layers size={24} />
                </div>
                <div>
                    <h3 className="text-2xl font-bold mb-1 truncate">{displayData.category}</h3>
                    <p className="text-gray-500 text-sm uppercase tracking-wider">Catégorie</p>
                </div>
            </GlowCard>

            <GlowCard className="bg-black text-white rounded-[2rem] p-8 flex flex-col justify-between aspect-square md:aspect-auto md:h-64">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-green-400">
                    <Shield size={24} />
                </div>
                <div>
                    <h3 className="text-4xl font-bold mb-1">{displayData.age}</h3>
                    <p className="text-gray-400 text-sm uppercase tracking-wider">Âge requis</p>
                </div>
            </GlowCard>
        </div>
      </section>

      {/* SCREENSHOTS */}
      {displayData.screenshots && displayData.screenshots.length > 0 && (
        <section className="pt-20 pb-8 bg-gray-50">
            <div className="max-w-[1600px] mx-auto px-6 mb-12">
                <h2 className="text-4xl font-bold tracking-tight">Aperçu</h2>
            </div>
            <div className="flex overflow-x-auto gap-8 px-6 pb-12 scrollbar-hide snap-x">
                {displayData.screenshots.map((img, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="relative flex-shrink-0 h-[500px] md:h-[600px] aspect-[9/19] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white snap-center"
                    >
                        <Image src={img} alt={`Screenshot ${i}`} fill className="object-cover" />
                    </motion.div>
                ))}
            </div>
        </section>
      )}

      {/* INFO & UPDATES */}
      <section className="px-6 py-20 max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-20">
         <div>
            <h3 className="text-sm font-mono text-purple-600 uppercase tracking-widest mb-6">À Propos</h3>
            <p className="text-xl text-gray-600 leading-relaxed whitespace-pre-wrap">
                {displayData.description}
            </p>
         </div>

         <div>
            <h3 className="text-sm font-mono text-purple-600 uppercase tracking-widest mb-6">Nouveautés</h3>
            <div className="bg-gray-50 rounded-[2rem] p-10 border border-gray-100">
                <div className="flex justify-between items-baseline mb-4">
                    <span className="text-2xl font-bold">v{displayData.version}</span>
                    {displayData.updated && (
                        <span className="text-gray-400">{format(new Date(displayData.updated), 'd MMM yyyy', { locale: fr })}</span>
                    )}
                </div>
                <p className="text-gray-600 leading-relaxed">{displayData.releaseNotes}</p>
            </div>

            <div className="mt-12">
                <h3 className="text-sm font-mono text-gray-400 uppercase tracking-widest mb-6">Informations</h3>
                <div className="space-y-4">
                    <div className="flex justify-between py-3 border-b border-gray-100">
                        <span className="text-gray-500">Vendeur</span>
                        <span className="font-medium">{displayData.seller}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-gray-100">
                        <span className="text-gray-500">Compatibilité</span>
                        <span className="font-medium">{displayData.compatibility}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-gray-100">
                        <span className="text-gray-500">Langues</span>
                        <span className="font-medium">Français, Anglais</span>
                    </div>
                </div>
            </div>
         </div>
      </section>

      {/* CTA / NEXT PROJECT */}
      <section className="py-32 bg-black text-white text-center relative overflow-hidden">
        <div className="relative z-10">
            <p className="text-gray-500 uppercase tracking-widest mb-4">Prêt pour la suite ?</p>
            <Link href="/work" className="text-6xl md:text-8xl font-bold tracking-tighter hover:text-purple-500 transition-colors">
                PROJET SUIVANT
            </Link>
        </div>
        {/* Glow Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-900/30 rounded-full blur-[100px] pointer-events-none"></div>
      </section>

    </div>
  );
}
