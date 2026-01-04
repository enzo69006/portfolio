// app/intern/components/PortfolioMobile.jsx
'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

import prodA from '../../assets/project/mobile/unlatch.png';
import prodB from '../../assets/project/mobile/unlatch.png';
import prodC from '../../assets/project/mobile/unlatch.png';

const cards = [
    { year: '2024', image: prodA, title: 'UNLATCH', tags: ['Webflow', 'Custom Code'] },
    { year: '2024', image: prodB, title: 'ECOMEAL', tags: ['Design', 'API'] },
    { year: '2023', image: prodC, title: 'OOTSIDE', tags: ['E-commerce', 'CMS'] },
    // …
];

export default function PortfolioMobile() {
    const scrollRef = useRef(null);        // ← plus de <HTMLDivElement>
    const [isDown, setIsDown]         = useState(false);
    const [startX, setStartX]         = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const handleMouseDown = e => {
        setIsDown(true);
        setStartX(e.pageX - scrollRef.current.offsetLeft);
        setScrollLeft(scrollRef.current.scrollLeft);
    };
    const handleMouseUp    = () => setIsDown(false);
    const handleMouseLeave = () => setIsDown(false);
    const handleMouseMove  = e => {
        if (!isDown) return;
        e.preventDefault();
        const x    = e.pageX - scrollRef.current.offsetLeft;
        const walk = (x - startX) * 2;
        scrollRef.current.scrollLeft = scrollLeft - walk;
    };

    const scrollByCard = delta => {
        if (!scrollRef.current) return;
        const container = scrollRef.current;
        const cardElem  = container.children[0];
        const gap       = 24; // gap-6 = 6*4px
        const step      = cardElem.offsetWidth + gap;
        container.scrollBy({ left: delta * step, behavior: 'smooth' });
    };

    return (
        <section className="py-10 bg-transparent">
            <h2 className="text-2xl font-bold mb-6 text-center">Nos productions</h2>
            <div className="relative w-[80vw] mx-auto">
                <button
                    onClick={() => scrollByCard(-1)}
                    className="absolute left-0 top-1/2 z-30 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100"
                >
                    <ChevronLeftIcon className="h-6 w-6 text-gray-700"/>
                </button>

                <div
                    ref={scrollRef}
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseLeave}
                    onMouseMove={handleMouseMove}
                    className="flex overflow-x-auto gap-6 px-6 snap-x snap-mandatory cursor-grab active:cursor-grabbing scrollbar-hide"
                    style={{ scrollBehavior: 'smooth' }}
                >
                    {cards.map((card, idx) => (
                        <div
                            key={idx}
                            className="snap-center relative flex-none w-[300px] sm:w-[350px] md:w-[400px] lg:w-[450px] h-[400px] rounded-2xl overflow-hidden shadow-lg"
                        >
                            <Image src={card.image} alt={card.title} fill className="object-cover" />
                            <div className="absolute inset-0 bg-black/30" />
                            <div className="absolute top-0 left-0 bg-white text-black px-4 py-1 rounded-br-xl font-semibold text-sm z-10">
                                {card.year}
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                                <h3 className="text-xl font-bold text-black mb-2">{card.title}</h3>
                                <div className="flex flex-wrap gap-2">
                                    {card.tags.map((tag, i) => (
                                        <span
                                            key={i}
                                            className="bg-white bg-opacity-80 text-gray-800 text-xs font-semibold px-3 py-1 rounded-full"
                                        >
                      {tag}
                    </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <button
                    onClick={() => scrollByCard(1)}
                    className="absolute right-0 top-1/2 z-30 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100"
                >
                    <ChevronRightIcon className="h-6 w-6 text-gray-700"/>
                </button>
            </div>
        </section>
    );
}
