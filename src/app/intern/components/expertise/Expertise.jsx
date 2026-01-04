// components/Expertise.jsx
'use client'

import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FiMonitor } from 'react-icons/fi'
import { GiPaintBrush, GiConcentricCrescents } from 'react-icons/gi'
import { HiOutlineCode } from 'react-icons/hi'
import { MdStars } from 'react-icons/md'

// Enregistrement des plugins GSAP
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger)
}

export default function Expertise() {
    const scrollRef = useRef(null)
    const itemsRef = useRef([])
    const containerRef = useRef(null)

    const items = [
        {
            title: 'UI/UX Design',
            desc: 'Website design ? Apps Design ? We care all of it. We love launch a website from scratch !',
            icon: <FiMonitor className="w-12 h-12 text-pink-500" />,
        },
        {
            title: 'Illustration',
            desc: 'We create customize Illustrations from scratch that achieve business goals and make users happy.',
            icon: <GiPaintBrush className="w-12 h-12 text-sky-500" />,
        },
        {
            title: 'Animation',
            desc: 'We make 2D or 3D Animation according to your wishes and it all can be customized.',
            icon: <GiConcentricCrescents className="w-12 h-12 text-purple-500" />,
        },
        {
            title: 'Development',
            desc: 'We provide end-to-end project from scratch until development phase, just tell us and we can do that !',
            icon: <HiOutlineCode className="w-12 h-12 text-yellow-500" />,
        },
    ]

    useEffect(() => {
        if (!scrollRef.current) return
        let locoScroll
        let ctx

        const initScrollAndAnimations = async () => {
            try {
                // 1. D'abord initialiser GSAP et ScrollTrigger
                gsap.registerPlugin(ScrollTrigger)

                // 2. Configurer les animations de base SANS LocomotiveScroll
                ctx = gsap.context(() => {
                    itemsRef.current.forEach((item, index) => {
                        gsap.from(item, {
                            opacity: 0,
                            y: 50,
                            duration: 0.8,
                            ease: "power2.out",
                            scrollTrigger: {
                                trigger: item,
                                start: "top 80%",
                                end: "top 30%",
                                toggleActions: "play none none none",
                                markers: true, // Activez pour voir les triggers
                                id: `item-${index}`
                            }
                        })
                    })
                }, containerRef)

                // 3. Initialiser LocomotiveScroll APRÈS les animations GSAP
                const LocomotiveScroll = (await import('locomotive-scroll')).default
                locoScroll = new LocomotiveScroll({
                    el: scrollRef.current,
                    smooth: true,
                    lerp: 0.1,
                    multiplier: 0.8,
                    smartphone: {
                        smooth: true
                    },
                    tablet: {
                        smooth: true
                    }
                })

                // 4. Lier LocomotiveScroll avec ScrollTrigger
                locoScroll.on('scroll', ScrollTrigger.update)

                ScrollTrigger.scrollerProxy(scrollRef.current, {
                    scrollTop(value) {
                        return arguments.length
                            ? locoScroll.scrollTo(value, { duration: 0, disableLerp: true })
                            : locoScroll.scroll.instance.scroll.y
                    },
                    getBoundingClientRect() {
                        return {
                            top: 0,
                            left: 0,
                            width: window.innerWidth,
                            height: window.innerHeight
                        }
                    },
                    pinType: scrollRef.current.style.transform ? "transform" : "fixed"
                })

                ScrollTrigger.addEventListener('refresh', () => {
                    locoScroll.update()
                })

                // 5. Rafraîchir après tout est configuré
                ScrollTrigger.refresh()

            } catch (error) {
                console.error("Initialization error:", error)
            }
        }

        initScrollAndAnimations()

        return () => {
            if (ctx) ctx.revert()
            if (locoScroll) locoScroll.destroy()
            ScrollTrigger.clearMatchMedia()
        }
    }, [])

    return (
        <div
            ref={scrollRef}
            data-scroll-container
            className="min-h-screen w-full overflow-hidden"
        >
            <section
                ref={containerRef}
                data-scroll-section
                className="bg-black text-white px-4 md:px-8 lg:px-16 py-16 min-h-screen"
            >
                {/* TITRE */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-center md:text-left mb-12">
                    WE ARE THE EXPERTS, LET US
                    <br />
                    SHOW YOU OUR{' '}
                    <span className="text-sky-400">EXPERTISE</span>{' '}
                    <MdStars className="inline-block w-8 h-8 text-yellow-400 align-middle ml-2" />
                </h1>

                {/* GRILLE 2×2 */}
                <div className="grid grid-cols-1 md:grid-cols-2 border-t border-b border-gray-700 divide-y divide-gray-700 md:divide-y-0 md:divide-x">
                    {items.map((item, idx) => (
                        <div
                            key={idx}
                            ref={el => (itemsRef.current[idx] = el)}
                            className="p-8 flex items-start opacity-0 min-h-[300px]"
                            data-scroll
                        >
                            {item.icon}
                            <div className="ml-6">
                                <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                                <p className="text-gray-300">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}
