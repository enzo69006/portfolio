'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { FiArrowRight } from 'react-icons/fi'

import ecomealPlans   from '../../../assets/project/ecomeal-plans.png'
import ecomealProfil  from '../../../assets/project/ecomeal-profil.png'
import ecomealRecette from '../../../assets/project/ecomeal-creation-recette.png'

import ndpj1 from '../../../assets/project/ndpj1.png'
import ndpj2 from '../../../assets/project/ndpj2.png'

const INTERVAL = 2000

function InteractiveBox({ contents, delay = 0, className = '' }) {
    const [index, setIndex] = useState(0)

    useEffect(() => {
        const timer = setTimeout(() => {
            setIndex(i => (i + 1) % contents.length)
            const interval = setInterval(
                () => setIndex(i => (i + 1) % contents.length),
                INTERVAL
            )
            return () => clearInterval(interval)
        }, delay)
        return () => clearTimeout(timer)
    }, [contents.length, delay])

    return (
        <div className={`${className} relative overflow-hidden`}>
            <AnimatePresence exitBeforeEnter>
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 w-full h-full flex items-center justify-center"
                >
                    {contents[index]}
                </motion.div>
            </AnimatePresence>
        </div>
    )
}

export default function ProjectsPage() {
    const box2 = [
        <h2 key="web"    className="text-white text-6xl font-bold">WEB</h2>,
        <h2 key="mobile" className="text-white text-6xl font-bold">MOBILE</h2>,
        <h2 key="backend"className="text-white text-6xl font-bold">BACK-END</h2>,
        <h2 key="cloud"  className="text-white text-6xl font-bold">CLOUD</h2>,
    ]

    const box3 = [
        <div key="d1" className="text-white/80 text-sm leading-snug p-4">
            Innovating urban spaces with sustainable, smart architecture.
        </div>,
        <div key="d2" className="text-white/80 text-sm leading-snug p-4">
            Designing tomorrow’s skylines through community-driven urban planning.
        </div>,
        <div key="d3" className="text-white/80 text-sm leading-snug p-4">
            Merging technology and green solutions for efficient city living.
        </div>,
    ]

    const box4 = [
        <div
            key="plans"
            className="flex items-center justify-center w-full h-full p-4 bg-white/20 backdrop-blur-sm rounded-2xl ring-1 ring-white/50"
        >
            <Image
                src={ecomealPlans}
                alt="Ecomela Plans"
                width={ecomealPlans.width}
                height={ecomealPlans.height}
                className="max-w-[180px] max-h-[360px] object-contain drop-shadow-lg"
            />
        </div>,
        <div
            key="profil"
            className="flex items-center justify-center w-full h-full p-4 bg-white/20 backdrop-blur-sm rounded-2xl ring-1 ring-white/50"
        >
            <Image
                src={ecomealProfil}
                alt="Ecomela Profil"
                width={ecomealProfil.width}
                height={ecomealProfil.height}
                className="max-w-[180px] max-h-[360px] object-contain drop-shadow-lg"
            />
        </div>,
        <div
            key="recette"
            className="flex items-center justify-center w-full h-full p-4 bg-white/20 backdrop-blur-sm rounded-2xl ring-1 ring-white/50"
        >
            <Image
                src={ecomealRecette}
                alt="Ecomela Création Recette"
                width={ecomealRecette.width}
                height={ecomealRecette.height}
                className="max-w-[180px] max-h-[360px] object-contain drop-shadow-lg"
            />
        </div>,
    ]

    const box5 = [
        <span key="b1" className="text-green-400 text-3xl">⏣</span>,
        <motion.span
            key="b2"
            className="text-green-400 text-3xl"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
        >
            ⏣
        </motion.span>,
    ]

    const box6 = [
        <div key="ndpj1" className="relative w-full h-full">
            <Image src={ndpj1} alt="NDJP 1" fill className="object-cover" />
        </div>,
        <div key="ndpj2" className="relative w-full h-full">
            <Image src={ndpj2} alt="NDJP 2" fill className="object-cover" />
        </div>,
    ]

    const box7 = [
        <p
            key="u1"
            className="text-black text-xl font-bold uppercase text-center leading-snug"
        >
            Urban Solutions<br/>Bold Creations
        </p>,
        <p
            key="u2"
            className="text-black text-xl font-bold uppercase text-center leading-snug"
        >
            Creative Cities<br/>Modern Design
        </p>,
    ]

    const box8 = [
        <div
            key="p1"
            className="w-full h-full"
            style={{
                background:
                    'repeating-linear-gradient(45deg, transparent, transparent 8px, black 8px, black 12px)',
            }}
        />,
        <div className="w-full h-full flex items-center justify-center text-black uppercase font-extrabold text-6xl">
            En création
        </div>,
    ]

    return (
        <main className="h-screen bg-white p-8 pt-40e">
            <div className="grid h-full grid-rows-[1fr_1fr] grid-cols-3 gap-4">
                {/* Entête */}
                <div className="bg-rose-600 rounded-lg flex items-center justify-center text-7xl uppercase font-bold text-white">
                    NOS PROJETS.
                </div>

                {/* Ligne 1 – Box2 with hover */}
                <div className="relative rounded-lg overflow-hidden group">
                    <InteractiveBox
                        contents={box2}
                        delay={1000}
                        className="bg-cyan-500 w-full h-full flex items-center justify-center rounded-lg"
                    />
                    <div className="absolute inset-0 bg-gray-900 bg-opacity-75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <a
                            href="/portfolio-web"
                            className="
                px-6 py-3 rounded-full inline-flex items-center space-x-2
                bg-white
                bg-gradient-to-r from-yellow-400 to-yellow-400
                bg-[length:0%_100%] bg-no-repeat bg-left
                hover:bg-[length:100%_100%]
                transition-all duration-500
                text-black
              "
                        >
                            <span>Visiter le portfolio</span>
                            <FiArrowRight className="w-5 h-5 text-black" />
                        </a>
                    </div>
                </div>

                {/* Ligne 1 – Box3 */}
                <InteractiveBox
                    contents={box3}
                    delay={2000}
                    className="bg-blue-500 rounded-lg flex items-center justify-center"
                />

                {/* Ligne 2 – Box4 with hover */}
                <div className="relative h-full rounded-lg overflow-hidden group bg-pink-600">
                    <InteractiveBox
                        contents={box4}
                        delay={3000}
                        className="w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gray-900 bg-opacity-75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <a
                            href="/portfolio-mobile"
                            className="
                px-6 py-3 rounded-full inline-flex items-center space-x-2
                bg-white
                bg-gradient-to-r from-yellow-400 to-yellow-400
                bg-[length:0%_100%] bg-no-repeat bg-left
                hover:bg-[length:100%_100%]
                transition-all duration-500
                text-black
              "
                        >
                            <span>Visiter le portfolio mobile</span>
                            <FiArrowRight className="w-5 h-5 text-black" />
                        </a>
                    </div>
                </div>

                {/* Ligne 2 – Colonne 2 */}
                <div className="flex flex-col col-start-2 col-end-3 gap-4">
                    <InteractiveBox
                        contents={box5}
                        delay={4000}
                        className="bg-yellow-400 hover:bg-amber-400 transition-colors rounded-lg flex items-center justify-center h-1/4"
                    />
                    <div className="relative h-3/4 rounded-lg overflow-hidden group bg-green-500">
                        <InteractiveBox
                            contents={box6}
                            delay={5000}
                            className="w-full h-full"
                        />
                        <div className="absolute inset-0 bg-gray-900 bg-opacity-75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <a
                                href="/portfolio-web"
                                className="
                  px-6 py-3 rounded-full inline-flex items-center space-x-2
                  bg-white
                  bg-gradient-to-r from-yellow-400 to-yellow-400
                  bg-[length:0%_100%] bg-no-repeat bg-left
                  hover:bg-[length:100%_100%]
                  transition-all duration-500
                  text-black
                "
                            >
                                <span>Visiter le portfolio web</span>
                                <FiArrowRight className="w-5 h-5 text-black" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Ligne 2 – Colonne 3 */}
                <div className="flex flex-col col-start-3 col-end-4 gap-4">
                    <InteractiveBox
                        contents={box7}
                        delay={6000}
                        className="bg-orange-500 rounded-lg flex items-center justify-center p-6 h-3/4"
                    />
                    <InteractiveBox
                        contents={box8}
                        delay={7000}
                        className="bg-indigo-400 rounded-lg overflow-hidden h-1/4"
                    />
                </div>
            </div>
        </main>
    )
}
