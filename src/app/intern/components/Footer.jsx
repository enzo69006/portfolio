"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";

const Footer = () => {
    return (
        <div className="relative bg-white text-black pt-20 pb-10 overflow-hidden">
            {/* Animated Grid Background (Subtle) */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
                 <div 
                    className="absolute inset-0" 
                    style={{
                      backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px),
                                        linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)`,
                      backgroundSize: '4rem 4rem',
                      maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)'
                    }}
                  />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                
                {/* TOP SECTION: CTA + TITLE */}
                <div className="flex flex-col md:flex-row justify-between items-start mb-24 gap-12">
                    <div className="max-w-3xl relative">
                        <motion.h2 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="relative z-10 text-6xl md:text-9xl font-bold tracking-tighter leading-none mb-8"
                        >
                            LET'S WORK <br/>
                            <span className="text-purple-600">TOGETHER.</span>
                        </motion.h2>
                        
                        <motion.div
                             initial={{ opacity: 0, y: 20 }}
                             whileInView={{ opacity: 1, y: 0 }}
                             transition={{ duration: 0.6, delay: 0.2 }}
                             viewport={{ once: true }}
                        >
                            <Link href="/contact" className="inline-flex items-center gap-4 group cursor-pointer">
                                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-black text-white flex items-center justify-center group-hover:bg-purple-600 group-hover:scale-110 transition-all duration-300">
                                    <ArrowUpRight size={32} />
                                </div>
                                <span className="text-2xl md:text-4xl font-medium tracking-tight border-b-2 border-transparent group-hover:border-black transition-all duration-300">
                                    Démarrer un projet
                                </span>
                            </Link>
                        </motion.div>
                    </div>

                    {/* CONTACT INFO CARD */}
                    <div className="relative">
                        <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            viewport={{ once: true }}
                            className="bg-gray-50 p-8 rounded-3xl border border-gray-100 min-w-[300px] relative z-10"
                        >
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
                                <Mail size={18} />
                            </div>
                            <div>
                                <p className="text-xs text-gray-400 font-mono uppercase">Email</p>
                                <a href="mailto:contact@syntaax.io" className="text-lg font-bold hover:text-purple-600 transition-colors">contact@syntaax.io</a>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                                <Phone size={18} />
                            </div>
                            <div>
                                <p className="text-xs text-gray-400 font-mono uppercase">Téléphone</p>
                                <p className="text-lg font-bold">+33 6 12 34 56 78</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                                <MapPin size={18} />
                            </div>
                            <div>
                                <p className="text-xs text-gray-400 font-mono uppercase">Bureau</p>
                                <p className="text-lg font-bold">Paris, France</p>
                            </div>
                        </div>
                    </motion.div>
                    </div>
                </div>

                {/* DIVIDER */}
                <div className="w-full h-px bg-gray-200 mb-10"></div>

                {/* BOTTOM SECTION: LINKS & COPYRIGHT */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm font-medium text-gray-500">
                    
                    {/* Socials */}
                    <div className="flex gap-8">
                        {['Instagram', 'LinkedIn', 'Twitter', 'Behance'].map((social) => (
                            <a key={social} href="#" className="hover:text-black transition-colors uppercase tracking-wide">
                                {social}
                            </a>
                        ))}
                    </div>

                    {/* Copyright */}
                    <div className="flex flex-col md:flex-row items-center gap-6">
                         <p>© 2025 Syntaax. All rights reserved.</p>
                         <div className="flex gap-4">
                            <a href="#" className="hover:text-black transition-colors">Privacy</a>
                            <a href="#" className="hover:text-black transition-colors">Terms</a>
                         </div>
                    </div>

                </div>

                {/* BIG TEXT BACKGROUND */}
                <div className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none opacity-[0.03]">
                    <h1 className="text-[15vw] font-bold leading-none tracking-tighter text-center whitespace-nowrap">
                        SYNTAAX
                    </h1>
                </div>

            </div>
        </div>
    );
};

export default Footer;
