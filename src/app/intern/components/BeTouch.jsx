// components/BeTouch.jsx
'use client'

import React, { useState } from 'react'

export default function BeTouch() {
    const [email, setEmail] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        // TODO : gérer l’envoi de l’email
        console.log('Email soumis :', email)
    }

    return (
        <section
            className="
        bg-black text-white rounded-2xl
        p-12 w-[80vw] max-w-none mx-auto
        flex flex-col md:flex-row items-center justify-between
        gap-6
      "
        >
            {/* Titre */}
            <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-wide">
                VOUS SOUHAITEZ RESTER AU COURANT?
            </h2>

            {/* Formulaire d’inscription */}
            <form
                onSubmit={handleSubmit}
                className="
          flex w-full md:w-auto
          items-center
          space-x-3
        "
            >
                <input
                    type="email"
                    required
                    placeholder="email@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="
            flex-grow md:flex-none
            px-4 py-3
            rounded-full
            bg-white text-black
            placeholder-gray-400
            focus:outline-none focus:ring-2 focus:ring-purple-300
          "
                />
                <button
                    type="submit"
                    className="
            px-6 py-3
           bg-[#1f1133] hover:bg-purple-400
            rounded-full
            uppercase font-semibold
            transition-colors
          "
                >
                    S'abonner
                </button>
            </form>
        </section>
    )
}
