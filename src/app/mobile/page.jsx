// app/mobile/page.jsx
'use client';

import { useState, useEffect, useRef } from 'react';
import Lottie from 'lottie-react';       // ← Import par défaut
import TextTicker from '@/app/intern/components/TextTicker';
import BeTouch from '@/app/intern/components/BeTouch';
import FAQPage from '@/app/intern/components/FAQ';
import Spacer10 from '@/app/intern/components/spacer/Spacer10';
import Spacer20 from '@/app/intern/components/spacer/Spacer20';
import Footer from '@/app/intern/components/Footer';
import PortfolioMobile from '@/app/intern/components/PortfolioMobile';

// Import du JSON Lottie pour chaque étape
import ideationAnimation from '@/app/assets/animation/lightbulb.json';
import figmaAnimation    from '@/app/assets/animation/Figma.json';
import typingAnimation   from '@/app/assets/animation/Typing.json';
import solutionAnimation from '@/app/assets/animation/Solution.json'
import analyticsAnimation from '@/app/assets/animation/analytics.json';

const processSteps = [
    {
        title: '1. Idéation',
        desc: "Atelier de brainstorming pour définir les fonctionnalités clés et l’expérience utilisateur."
    },
    {
        title: '2. Design',
        desc: "Wireframes et maquettes haute-fidélité, tests utilisateurs et itérations."
    },
    {
        title: '3. Développement',
        desc: "Intégration front-end et back-end, API, et optimisation des performances."
    },
    {
        title: '4. Lancement',
        desc: "Publication sur App Store & Google Play, suivi des KPIs et itérations post-lancement."
    },
    {
        title: '5. Optimisation',
        desc: "Analyse post-lancement, optimisation continue et mises à jour utilisateur."
    },
];

// Couleurs pour la partie intérieure de chaque carte (bas de carte)
const innerColors = [
    'bg-green-200',
    'bg-blue-200',
    'bg-red-200',
    'bg-yellow-200',
    'bg-purple-200',
];

export default function Mobile() {
    const CARD_W = 350;
    const CARD_HEADER_H = 400;
    const CARD_H = 600;
    const GAP = 24;
    const AUTO_MS = 2500;
    const TRANS_MS = 1000;
    const total = processSteps.length;

    const [current, setCurrent] = useState(0);
    const [animating, setAnimating] = useState(false);

    // On pré-calcule 4 indices (3 visibles + buffer)
    const slides = [
        current,
        (current + 1) % total,
        (current + 2) % total,
        (current + 3) % total,
    ];
    const distance = CARD_W + GAP;

    // Fonction de slide suivant
    const slideNext = () => {
        if (animating) return;
        setAnimating(true);
        setTimeout(() => {
            setCurrent(c => (c + 1) % total);
            setAnimating(false);
        }, TRANS_MS);
    };

    // Défilement automatique toutes les AUTO_MS ms
    useEffect(() => {
        const iv = setInterval(slideNext, AUTO_MS);
        return () => clearInterval(iv);
    }, [current]);

    // Wrapper commun pour centrer le contenu
    const sectionWrapper = 'w-[80vw] max-w-none mx-auto';

    return (
        <div>
            <div className="bg-white min-h-screen space-y-16 py-12">

                {/* ---------------- Hero ---------------- */}
                <section
                    className={`${sectionWrapper} bg-black text-white rounded-2xl p-12 md:grid md:grid-cols-2 gap-12`}
                >
                    <div className="space-y-6">
                        <p className="text-base md:text-lg">Création mobile</p>
                        <h1 className="text-6xl md:text-7xl font-bold leading-tight">
              <span className="inline-block">
                <span className="underline decoration-white decoration-4 underline-offset-8">N</span>otre Processus
              </span>
                            <br/>
                            <span className="inline-block">
                <span className="underline decoration-white decoration-4 underline-offset-8">C</span>réation Mobile
              </span>
                        </h1>
                        <p className="text-base md:text-lg">
                            Un parcours en 5 étapes pour passer de l’idée à l’application prête à conquérir vos
                            utilisateurs.
                        </p>
                    </div>
                    <div className="bg-gray-300 rounded-2xl" style={{ minHeight: CARD_HEADER_H }} />
                </section>

                {/* ---------------- Ticker ---------------- */}
                <TextTicker />

                {/* ---------------- Section Produits Mobile ---------------- */}
                <Spacer10 />

                {/* -------- Carousel -------- */}
                <section id="process" className={`${sectionWrapper} space-y-8`}>
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* Légende */}
                        <div className="lg:col-span-1 space-y-6">
                            <h2 className="text-[2.7rem] font-bold leading-tight text-black">
                                Une idée ?<br/>
                                On s'en occupe.<br/>
                            </h2>
                            <p className="text-base leading-relaxed text-black">
                                A space where children discover sports through movement, play, and teamwork.
                                Our clubs help kids grow stronger, more confident, and active—all in a fun and
                                supportive environment.
                            </p>
                        </div>

                        {/* Slides */}
                        <div className="lg:col-span-3 flex justify-center">
                            <div
                                className="relative overflow-hidden"
                                style={{ width: CARD_W * 3 + GAP * 2, height: CARD_H }}
                            >
                                {slides.map((idx, pos) => {
                                    const left = pos * distance;
                                    let transform = 'none';
                                    let opacity = 1;
                                    let width = CARD_W;
                                    let height = CARD_H;
                                    let delay = '0ms';

                                    if (animating) {
                                        if (pos === 0) {
                                            // Sortante : rétrécit et fade
                                            transform = 'scale(0.8)';
                                            opacity = 0.5;
                                            width = CARD_W * 0.8;
                                            height = CARD_H * 0.8;
                                            delay = '100ms';
                                        } else {
                                            // Les autres glissent vers la gauche
                                            transform = `translateX(-${distance}px)`;
                                        }
                                    }

                                    const bgColor = 'bg-[#F3F3F3]'; // gris clair pour la carte de fond

                                    return (
                                        <div
                                            key={`${idx}-${pos}`}
                                            className={`${bgColor} text-black rounded-2xl flex flex-col shadow transition-all ease-in-out`}
                                            style={{
                                                position: 'absolute',
                                                top: 0,
                                                left,
                                                width,
                                                height,
                                                transform,
                                                opacity,
                                                transitionDuration: `${TRANS_MS}ms`,
                                                transitionDelay: delay,
                                            }}
                                        >
                                            {/* Contenu principal de la carte */}
                                            <div className="p-8 flex-1 flex flex-col justify-between">
                                                <div>
                                                    <h3 className="text-xl font-semibold mb-2">
                                                        {processSteps[idx].title}
                                                    </h3>
                                                    <p className="text-base">
                                                        {processSteps[idx].desc}
                                                    </p>
                                                </div>
                                                <span className="text-xs uppercase opacity-70">
                          Étape {idx + 1}
                        </span>
                                            </div>

                                            {/* Inner box colorée (bas de la carte) */}
                                            <div
                                                className={`${innerColors[idx % innerColors.length]} w-full h-1/2 rounded-b-2xl
                                    flex justify-center items-center`}
                                            >
                                                {/*
                          On affiche l’animation Lottie correspondante selon l’indice :
                          - idx === 0 → ideationAnimation
                          - idx === 1 → figmaAnimation
                          - idx === 2 → typingAnimation
                          Pour idx 3 et 4, on ne rend rien (juste la couleur)
                        */}
                                                {idx === 0 && (
                                                    <Lottie
                                                        animationData={ideationAnimation}
                                                        loop
                                                        autoplay
                                                        style={{ width: 150, height: 150 }}
                                                    />
                                                )}
                                                {idx === 1 && (
                                                    <Lottie
                                                        animationData={figmaAnimation}
                                                        loop
                                                        autoplay
                                                        style={{ width: 150, height: 150 }}
                                                    />
                                                )}
                                                {idx === 2 && (
                                                    <Lottie
                                                        animationData={typingAnimation}
                                                        loop
                                                        autoplay
                                                        style={{ width: 150, height: 150 }}
                                                    />
                                                )}
                                                {idx === 3 && (
                                                    <Lottie
                                                        animationData={solutionAnimation}
                                                        loop
                                                        autoplay
                                                        style={{ width: 150, height: 150 }}
                                                    />
                                                )}
                                                {idx === 4 && (
                                                    <Lottie
                                                        animationData={analyticsAnimation}
                                                        loop
                                                        autoplay
                                                        style={{ width: 150, height: 150 }}
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </section>

                <Spacer10 />

                {/* ---------------- Nos productions ---------------- */}
                <div>
                    <h2
                        className="
              text-4xl sm:text-5xl md:text-6xl
              font-extrabold uppercase tracking-wide leading-snug
              text-black text-center
              drop-shadow-md
            "
                    >
                        Nos productions
                    </h2>
                    <PortfolioMobile />
                </div>

                <Spacer10 />

                {/* ---------------- FAQ - Questions Mobile Apps ---------------- */}
                <section className={`${sectionWrapper} space-y-8 pb-12`}>
                    <h2
                        className="
              text-4xl sm:text-5xl md:text-6xl
              font-extrabold uppercase tracking-wide leading-snug
              text-black text-center
              drop-shadow-md
            "
                    >
                        FAQ Application Mobile
                    </h2>

                    {[
                        {
                            q: "Quel est le coût moyen de développement d'une application mobile ?",
                            a: "Le coût varie selon la complexité, les plateformes (iOS/Android) et les fonctionnalités : comptez entre 10 000€ et 80 000€ en général."
                        },
                        {
                            q: "Sur quelles plateformes publiez-vous l'application ?",
                            a: "Nous prenons en charge la publication sur l'App Store d'Apple et le Google Play Store, y compris la configuration des comptes développeur."
                        },
                        {
                            q: "Proposez-vous la maintenance et les mises à jour post-lancement ?",
                            a: "Oui ! Nous offrons un contrat de maintenance mensuelle avec mises à jour, corrections de bugs et monitoring des performances."
                        },
                        {
                            q: "Combien de temps dure le développement d'une application mobile ?",
                            a: "En moyenne, le développement prend entre 8 et 16 semaines, en fonction du nombre d'écrans et des intégrations API nécessaires."
                        },
                        {
                            q: "Peut-on ajouter de nouvelles fonctionnalités après le lancement ?",
                            a: "Absolument ! Nous travaillons en mode itératif pour prioriser et développer de nouvelles fonctionnalités selon vos retours utilisateurs."
                        }
                    ].map(({ q, a }, i) => (
                        <AccordionItem key={i} title={q}>
                            {a}
                        </AccordionItem>
                    ))}
                </section>

                <Spacer10 />

                {/* ---------------- Footer sections ---------------- */}
                <BeTouch />
                <FAQPage />
                <Spacer10 />
            </div>
        </div>
    );
}


function AccordionItem({ title, children }) {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef(null);
    const [maxH, setMaxH] = useState('0px');

    useEffect(() => {
        if (isOpen) setMaxH(`${ref.current.scrollHeight}px`);
        else setMaxH('0px');
    }, [isOpen]);

    return (
        <div className="border-b border-gray-300">
            <button
                className="w-full flex justify-between items-center py-4 text-black text-lg md:text-xl focus:outline-none"
                onClick={() => setIsOpen(o => !o)}
                aria-expanded={isOpen}
            >
                <span>{title}</span>
                <span className={`text-2xl transform transition-transform duration-200 ${isOpen ? 'rotate-45' : 'rotate-0'}`}>
          +
        </span>
            </button>
            <div
                ref={ref}
                style={{ maxHeight: maxH }}
                className="overflow-hidden transition-all duration-500 ease-in-out"
            >
                <div className="mt-2 text-gray-700 text-base md:text-lg">
                    {children}
                </div>
            </div>
        </div>
    );
}
