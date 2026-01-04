"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

// Assets
import imageUnlatch from "../assets/project/mobile/unlatch.png";
import imageNdpj from "../assets/project/ndpj1.png";
import imageEcomeal from "../assets/project/ecomeal-presentation-1 .png";

const projects = [
  {
    id: 1,
    title: "Notre Dame de Paris",
    category: "Expérience Web",
    type: "web",
    year: "2024",
    image: imageNdpj,
    tags: "WebGL / 3D / React"
  },
  {
    id: 2,
    title: "Ecomeal",
    category: "Application Mobile",
    type: "mobile",
    year: "2023",
    image: imageEcomeal,
    tags: "React Native / AI / Node"
  },
  {
    id: 3,
    title: "Unlatch",
    category: "SaaS Immobilier",
    type: "saas",
    year: "2023",
    image: imageUnlatch,
    tags: "Next.js / Stripe / PostgreSQL"
  },
  {
    id: 4,
    title: "Future Bank",
    category: "Fintech",
    type: "web",
    year: "2024",
    image: imageNdpj,
    tags: "Security / Blockchain"
  },
  {
    id: 5,
    title: "Nike Air Max",
    category: "E-commerce",
    type: "web",
    year: "2022",
    image: imageEcomeal,
    tags: "Shopify / 3D / Motion"
  },
];

const categories = [
  { id: 'all', label: 'Tous' },
  { id: 'web', label: 'Web' },
  { id: 'mobile', label: 'Mobile' },
  { id: 'saas', label: 'SaaS' }
];

export default function WorkPage() {
  const [activeProject, setActiveProject] = useState(null);
  const [filter, setFilter] = useState('all');
  
  // Mouse position for floating image
  const mouse = {
    x: useMotionValue(0),
    y: useMotionValue(0)
  };

  const smoothOptions = { damping: 20, stiffness: 300, mass: 0.5 };
  const smoothX = useSpring(mouse.x, smoothOptions);
  const smoothY = useSpring(mouse.y, smoothOptions);

  // Use a fixed value for server-side rendering, update on client
  const [windowSize, setWindowSize] = useState({ w: 1000, h: 800 });

  useEffect(() => {
    setWindowSize({ w: window.innerWidth, h: window.innerHeight });
    const handleResize = () => setWindowSize({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const rotate = useTransform(smoothX, [0, windowSize.w], [-5, 5]);
  const imageParallaxX = useTransform(smoothX, [0, windowSize.w], [-20, 20]);
  const imageParallaxY = useTransform(smoothY, [0, windowSize.h], [-20, 20]);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    mouse.x.set(clientX);
    mouse.y.set(clientY);
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Time for header
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const filteredProjects = projects.filter(p => filter === 'all' || p.type === filter);

  useEffect(() => {
    setActiveProject(null);
  }, [filter]);

  return (
    <div className="min-h-screen bg-white text-black selection:bg-purple-500 selection:text-white pt-40 pb-20">
      
      <div className="container mx-auto px-6">
        
        {/* HEADER */}
        <div className="mb-24 flex flex-col md:flex-row justify-between items-end gap-8">
            <div>
                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-6xl md:text-9xl font-bold tracking-tighter leading-none mb-6"
                >
                    WORK<span className="text-purple-600">.</span>
                </motion.h1>
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-gray-500 text-lg md:text-xl max-w-md flex flex-col gap-2"
                >
                    <span>Une sélection de nos projets les plus ambitieux, alliant technique, stratégie et esthétique.</span>
                    <span className="text-xs font-mono uppercase tracking-widest text-gray-400 mt-4 pt-4 border-t border-gray-100 block w-full">
                        Paris, France — {time}
                    </span>
                </motion.p>
            </div>

            {/* FILTERS */}
            <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-wrap gap-2"
            >
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => setFilter(cat.id)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                            filter === cat.id 
                            ? "bg-black text-white" 
                            : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                        }`}
                    >
                        {cat.label}
                    </button>
                ))}
            </motion.div>
        </div>

        {/* LIST */}
        <div className="flex flex-col">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 pb-4 border-b border-gray-200 text-xs font-mono uppercase text-gray-400 tracking-widest px-4 mb-4">
                <div className="col-span-8 md:col-span-5 flex items-center gap-2">
                    Projet <span className="bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full text-[10px]">{filteredProjects.length}</span>
                </div>
                <div className="col-span-3 hidden md:block">Services</div>
                <div className="col-span-2 hidden md:block">Année</div>
                <div className="col-span-4 md:col-span-2 text-right">Lien</div>
            </div>

            {/* Rows */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={filter}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                >
                    {filteredProjects.map((project, index) => (
                        <motion.div 
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            onMouseEnter={() => setActiveProject(index)}
                            onMouseLeave={() => setActiveProject(null)}
                            className={`group relative grid grid-cols-12 gap-4 items-center py-8 md:py-12 border-b border-gray-100 hover:border-gray-300 transition-all duration-300 cursor-pointer px-4 ${
                                activeProject !== null && activeProject !== index ? "opacity-30 blur-[1px]" : "opacity-100"
                            }`}
                        >
                            {/* Background Hover Effect */}
                            <div className="absolute inset-0 bg-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 mx-[-1rem] px-[1rem] rounded-lg"></div>

                            <div className="col-span-8 md:col-span-5 flex flex-col md:flex-row md:items-center gap-2">
                                <h2 className="text-2xl md:text-5xl font-bold tracking-tight group-hover:translate-x-2 transition-transform duration-300">
                                    {project.title}
                                </h2>
                                <span className="md:hidden text-xs text-gray-400 font-mono uppercase">{project.category}</span>
                            </div>
                            
                            <div className="col-span-3 hidden md:block text-gray-500 font-mono text-sm">
                                {project.tags}
                            </div>

                            <div className="col-span-2 hidden md:block text-gray-500 font-mono text-sm">
                                {project.year}
                            </div>

                            <div className="col-span-4 md:col-span-2 flex justify-end">
                                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-black group-hover:text-white group-hover:scale-110 transition-all duration-300 bg-white">
                                    <ArrowUpRight size={18} className="md:w-5 md:h-5" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </AnimatePresence>
        </div>

      </div>

      {/* FLOATING IMAGE PREVIEW */}
      <AnimatePresence>
        {activeProject !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{
                left: smoothX,
                top: smoothY,
                rotate: rotate,
                translateX: "-50%",
                translateY: "-50%"
            }}
            className="fixed top-0 left-0 w-[300px] h-[220px] md:w-[450px] md:h-[320px] rounded-xl overflow-hidden pointer-events-none z-50 hidden md:block shadow-2xl"
          >
            <div className="relative w-full h-full bg-gray-100">
                {filteredProjects.map((project, index) => (
                    <div
                        key={project.id}
                        className={`absolute inset-0 transition-opacity duration-300 ${
                            activeProject === index ? "opacity-100" : "opacity-0"
                        }`}
                    >
                        <motion.div 
                            style={{ x: imageParallaxX, y: imageParallaxY, scale: 1.1 }}
                            className="relative w-full h-full"
                        >
                            <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                className="object-cover"
                            />
                        </motion.div>
                        {/* Overlay gradient */}
                        <div className="absolute inset-0 bg-black/10 pointer-events-none" />
                    </div>
                ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
