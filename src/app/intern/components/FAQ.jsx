// app/Project.jsx
'use client'

import { useState, useRef, useEffect } from 'react'

export default function FAQPage() {
    const items = [
        {
            title: 'Quels services proposons nous ?',
            content:
                'We offer a full stack of web services : conseil, design UI/UX, développement frontend & backend, et maintenance.',
        },
        {
            title: 'Quel est le processus pour démarrer un projet ?',
            content:
                'Après un premier entretien, on établit un cahier des charges, on propose un devis et on démarre la phase de design.',
        },
        {
            title: 'Syntaax peut-il réaliser votre site web ?',
            content:
                'Oui ! Nous proposons un service de maintenance mensuelle incluant mises à jour, sauvegardes et monitoring.',
        },
        {
            title: 'Et les applications mobile alors ?',
            content:
                'En général entre 4 et 8 semaines, selon la complexité et le nombre de pages.',
        },
    ]

    return (
        <section className="bg-[#1f1133] text-white rounded-2xl p-12 md:grid md:grid-cols-2 gap-12 w-[80vw] max-w-none mx-auto">
            {/* Heading agrandi */}
            <div className="space-y-6">
                <p className="text-base md:text-lg">Information</p>
                <h2 className="text-6xl md:text-7xl font-bold leading-tight">
          <span className="inline-block">
            <span className="underline decoration-white decoration-4 underline-offset-8">
              Q
            </span>
            UESTION
          </span>{' '}
                    <span className="inline-block">
            <span className="underline decoration-white decoration-4 underline-offset-8">
              S
            </span>
            OUVENT
          </span>{' '}
                    <span className="inline-block">
            <span className="underline decoration-white decoration-4 underline-offset-8">
              D
            </span>
            EMANDÉES
          </span>
                </h2>
            </div>

            {/* Accordions agrandis */}
            <div className="space-y-4">
                {items.map(({ title, content }) => (
                    <AccordionItem key={title} title={title}>
                        {content}
                    </AccordionItem>
                ))}
            </div>
        </section>
    )
}

function AccordionItem({ title, children }) {
    const [isOpen, setIsOpen] = useState(false)
    const contentRef = useRef(null)
    const [maxHeight, setMaxHeight] = useState('0px')

    // Quand isOpen change, on met à jour maxHeight
    useEffect(() => {
        if (isOpen) {
            setMaxHeight(`${contentRef.current.scrollHeight}px`)
        } else {
            setMaxHeight('0px')
        }
    }, [isOpen])

    return (
        <div className="border-b border-white/30">
            <button
                type="button"
                onClick={() => setIsOpen(o => !o)}
                aria-expanded={isOpen}
                className="w-full flex justify-between items-center text-white text-xl md:text-2xl py-6 focus:outline-none"
            >
                <span>{title}</span>
                <span
                    className={`text-3xl md:text-4xl transform transition-transform duration-200 ${
                        isOpen ? 'rotate-45' : 'rotate-0'
                    }`}
                >
          +
        </span>
            </button>

            {/* Conteneur animé */}
            <div
                ref={contentRef}
                style={{ maxHeight }}
                className="
          overflow-hidden
          transition-all duration-500 ease-in-out
        "
            >
                <div className="mt-3 text-gray-300 text-base md:text-lg">
                    {children}
                </div>
            </div>
        </div>
    )
}
