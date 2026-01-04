// components/TextTicker.jsx
'use client'

import React from 'react'

export default function TextTicker() {
    // Les éléments à faire défiler (duplicated pour la boucle)
    const items = [
        'LETS TALK', '→',
        'CONTACT@SYNTAAX.FR', '→',
        'LETS TALK', '→',
        'CONTACT@SYNTAAX.FR', '→',
        'LETS TALK', '→',
        'CONTACT@SYNTAAX.FR', '→',
        'LETS TALK', '→',
        'CONTACT@SYNTAAX.FR', '→',
        'LETS TALK', '→',
        'CONTACT@SYNTAAX.FR', '→',
        'LETS TALK', '→',
        'CONTACT@SYNTAAX.FR', '→',
        'LETS TALK', '→',
        'CONTACT@SYNTAAX.FR', '→'
    ]
    const content = [...items, ...items]

    return (
        <div className="w-full bg-yellow-500 overflow-hidden py-12">
            <div className="flex whitespace-nowrap animate-marquee">
                {content.map((item, idx) => (
                    <span
                        key={idx}
                        className={`inline-block mx-8 ${
                            item === '→'
                                ? 'text-pink-400 text-3xl'
                                : 'text-white uppercase font-bold text-2xl'
                        }`}
                    >
            {item}
          </span>
                ))}
            </div>

            <style jsx>{`
                @keyframes marquee {
                    0%   { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                    animation: marquee 15s linear infinite;
                }
            `}</style>
        </div>
    )
}
