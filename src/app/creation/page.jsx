"use client";
import { useRef, useState } from "react";
import Spacer30 from "@/app/intern/components/spacer/Spacer30";
import FAQPage from "@/app/intern/components/FAQ";
import Footer from "@/app/intern/components/Footer";
import BeTouch from "@/app/intern/components/BeTouch";
import { ArrowRight } from "lucide-react";
import Head from "next/head";

const cards = [
    { year: "2024", color: "bg-red-400", title: "Project 1", tags: ["Webflow", "Custom Code"] },
    { year: "2024", color: "bg-green-400", title: "Project 2", tags: ["Design", "API"] },
    { year: "2023", color: "bg-blue-400", title: "Project 3", tags: ["E-commerce", "CMS"] },
    { year: "2024", color: "bg-yellow-400", title: "Project 4", tags: ["Animation", "SEO"] },
    { year: "2024", color: "bg-purple-400", title: "Project 5", tags: ["React", "Next.js"] },
    { year: "2024", color: "bg-pink-400", title: "Project 6", tags: ["Mobile", "UX"] },
];

const Creation = () => {
    const scrollRef = useRef(null);
    const [isDown, setIsDown] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const handleMouseDown = (e) => {
        setIsDown(true);
        setStartX(e.pageX - scrollRef.current.offsetLeft);
        setScrollLeft(scrollRef.current.scrollLeft);
    };

    const handleMouseLeave = () => setIsDown(false);
    const handleMouseUp = () => setIsDown(false);
    const handleMouseMove = (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = (x - startX) * 2;
        scrollRef.current.scrollLeft = scrollLeft - walk;
    };

    return (
        <section className="bg-white">
            <section
                className="bg-black text-white py-20"
                style={{ fontFamily: "'Roboto Mono', monospace" }}
            >
                <Head>
                    <link
                        href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;700&display=swap"
                        rel="stylesheet"
                    />
                </Head>

                <div className="w-[80vw] mx-auto text-center">
                    <h1 className="text-5xl sm:text-6xl font-extrabold uppercase leading-tight">
                        Créez des <span className="text-yellow-400">expériences uniques</span>
                    </h1>
                    <p className="mt-6 text-xl sm:text-2xl text-gray-400 max-w-2xl mx-auto">
                        Développement Mobile, Web et Cloud pour transformer vos idées en solutions performantes.
                    </p>
                    <div className="mt-10">
                        <a
                            href="#services"
                            className="inline-block bg-yellow-400 text-black font-semibold px-8 py-4 rounded-full hover:bg-yellow-300 transition-transform duration-300 transform hover:scale-105"
                        >
                            Découvrir mes expertises
                        </a>
                    </div>
                </div>
            </section>

            <section className="bg-white py-24">
                <div className="relative w-[80vw] mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                        {[
                            {
                                icon: 'w-12 h-12 bg-white rounded',
                                title: 'Développement Mobile',
                                desc: 'iOS, Android, React Native, Swift, Kotlin.',
                            },
                            {
                                icon: 'w-12 h-12 bg-white rounded',
                                title: 'Développement Web',
                                desc: 'Applications web, Next.js, API, performances.',
                            },
                            {
                                icon: 'w-12 h-12 bg-white rounded',
                                title: 'Cloud & DevOps',
                                desc: 'AWS, Docker, CI/CD, Kubernetes, scalabilité.',
                            },
                        ].map((item, idx) => (
                            <div
                                key={idx}
                                className="group bg-[#1f1133] rounded-2xl p-10 flex flex-col items-start transform transition-transform duration-300 hover:scale-105 hover:-translate-y-2 cursor-pointer"
                            >
                                <div className="mb-6 relative">
                                    <div className="absolute inset-0 bg-white/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <div className={`${item.icon} relative z-10`}></div>
                                </div>
                                <h3 className="text-2xl text-white font-extrabold uppercase mb-4 transition-colors duration-300 group-hover:text-yellow-400">
                                    {item.title}
                                </h3>
                                <p className="text-gray-300 text-lg leading-relaxed mb-6 transition-colors duration-300 group-hover:text-gray-200">
                                    {item.desc}
                                </p>

                                <div className="relative w-full">
                                    <button className="cursor-pointer relative z-10 w-full text-sm font-semibold text-black px-4 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-between">
                                        En savoir plus
                                        <ArrowRight className="ml-2 w-5 h-5" />
                                    </button>
                                    <div className="absolute inset-0 bg-yellow-400 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 rounded-full"></div>

                                    <div className="absolute right-0 bottom-0 mb-2 mr-2 group-hover:hidden w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center transition-opacity duration-300">
                                        <ArrowRight className="w-5 h-5 text-black" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-black py-10">
                <div className="relative w-[80vw] mx-auto overflow-hidden">
                    <div
                        ref={scrollRef}
                        onMouseDown={handleMouseDown}
                        onMouseLeave={handleMouseLeave}
                        onMouseUp={handleMouseUp}
                        onMouseMove={handleMouseMove}
                        className="flex overflow-x-auto gap-6 cursor-grab active:cursor-grabbing"
                        style={{ scrollBehavior: "smooth" }}
                    >
                        {cards.map((card, idx) => (
                            <div
                                key={idx}
                                className="relative flex-none w-[300px] sm:w-[350px] md:w-[400px] lg:w-[450px] h-[400px] rounded-2xl overflow-hidden bg-black"
                            >
                                <div className="absolute top-0 left-0 bg-black text-white px-4 py-1 rounded-br-xl font-semibold text-sm z-10">
                                    {card.year}
                                </div>
                                <div className={`w-full h-full ${card.color} flex flex-col justify-center items-center rounded-2xl mt-4 px-4 pb-4 relative`}>
                                    <div className="text-2xl font-bold text-white mb-auto mt-auto">{card.title}</div>
                                    <div className="absolute bottom-10 left-4 flex gap-2 flex-wrap">
                                        {card.tags.map((tag, tagIdx) => (
                                            <span key={tagIdx} className="bg-gray-200 text-gray-800 text-xs font-semibold px-3 py-1 rounded-full">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Spacer30 />
            <FAQPage />
            <Spacer30 />
            <BeTouch />
            <Spacer30 />
            <Footer />
        </section>
    );
};

export default Creation;
