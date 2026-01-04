"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Check, Sparkles, Send } from "lucide-react";

// --- ANIMATED BACKGROUND ---
const Background = () => (
  <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-white">
    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-40"></div>
    <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-300 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob"></div>
    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-300 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-2000"></div>
    <div className="absolute bottom-0 left-20 w-[500px] h-[500px] bg-pink-300 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-4000"></div>
  </div>
);

// --- STEPS CONFIGURATION ---
const questions = [
  {
    id: "name",
    type: "text",
    question: "Commençons par les présentations.",
    placeholder: "Comment vous appelez-vous ?",
    subtext: "Promis, on ne mord pas."
  },
  {
    id: "email",
    type: "email",
    question: "Enchanté ! Où pouvons-nous vous répondre ?",
    placeholder: "votre@email.com",
    subtext: "Pas de spam, juste des projets incroyables."
  },
  {
    id: "phone",
    type: "tel",
    question: "Un numéro pour vous joindre ?",
    placeholder: "06 12 34 56 78",
    subtext: "Optionnel, mais pratique pour un appel direct."
  },
  {
    id: "services",
    type: "selection",
    question: "Quel type de magie cherchez-vous ?",
    options: ["Site Web / SaaS", "Application Mobile", "Design UI/UX", "Audit & Conseil", "Autre"],
    subtext: "Vous pouvez en choisir plusieurs."
  },
  {
    id: "budget",
    type: "radio",
    question: "Une idée du budget ?",
    options: ["< 5k€", "5k€ - 15k€", "15k€ - 50k€", "> 50k€"],
    subtext: "Pour qu'on puisse calibrer la solution idéale."
  },
  {
    id: "details",
    type: "textarea",
    question: "Dites-nous tout sur votre vision.",
    placeholder: "Parlez-nous de vos objectifs, vos délais...",
    subtext: "Plus on en sait, mieux c'est."
  }
];

export default function ContactPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    services: [],
    budget: "",
    details: ""
  });
  const [isCompleted, setIsCompleted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRef = useRef(null);

  // Auto-focus input on step change
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentStep]);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
        await fetch("https://formsubmit.co/ajax/enzo.deshayes10@icloud.com", {
            method: "POST",
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        setIsCompleted(true);
    } catch (error) {
        console.error("Error submitting form:", error);
        alert("Une erreur est survenue. Veuillez réessayer.");
    } finally {
        setIsSubmitting(false);
    }
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      // Simple validation
      if (questions[currentStep].type === "text" && !formData.name) return;
      if (questions[currentStep].type === "email" && !formData.email) return;
      handleNext();
    }
  };

  const updateField = (value) => {
    setFormData(prev => ({ ...prev, [questions[currentStep].id]: value }));
  };

  const toggleSelection = (option) => {
    const currentSelections = formData.services;
    const newSelections = currentSelections.includes(option)
      ? currentSelections.filter(item => item !== option)
      : [...currentSelections, option];
    updateField(newSelections);
  };

  const progress = ((currentStep + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen flex flex-col relative font-sans text-black selection:bg-black selection:text-white">
      <Background />

      {/* HEADER SIMPLE */}
      <header className="fixed top-32 left-0 w-full px-6 md:px-12 flex justify-between items-center z-40 pointer-events-none">
        <div className="flex items-center gap-2">
           <div className="w-2 h-2 rounded-full bg-black"></div>
           <span className="font-bold tracking-tight text-sm uppercase text-black">Contact</span>
        </div>
        <div className="text-sm font-mono text-gray-500">
            {currentStep + 1} / {questions.length}
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col justify-center items-center px-6 relative z-10 w-full max-w-4xl mx-auto">
        
        {isCompleted ? (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
            >
                <div className="w-24 h-24 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-8">
                    <Sparkles size={40} />
                </div>
                <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tighter">Message reçu.</h1>
                <p className="text-xl text-gray-500 max-w-lg mx-auto mb-12">
                    Merci {formData.name}. On analyse tout ça et on revient vers vous très vite (sous 24h).
                </p>
                <a href="/" className="inline-flex items-center gap-2 text-black font-bold border-b-2 border-black pb-1 hover:text-purple-600 hover:border-purple-600 transition-colors">
                    <ArrowLeft size={16} /> Retour à l'accueil
                </a>
            </motion.div>
        ) : (
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -40 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full"
                >
                    {/* QUESTION NUMBER */}
                    <div className="text-purple-600 font-mono text-sm mb-4">
                        0{currentStep + 1} <span className="text-gray-300 mx-2">—</span> {questions[currentStep].subtext}
                    </div>

                    {/* QUESTION TITLE */}
                    <h2 className="text-4xl md:text-6xl font-bold mb-12 leading-tight tracking-tight">
                        {questions[currentStep].question}
                    </h2>

                    {/* INPUT AREA */}
                    <div className="relative">
                        {questions[currentStep].type === "text" && (
                            <input
                                ref={inputRef}
                                type="text"
                                value={formData.name}
                                onChange={(e) => updateField(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder={questions[currentStep].placeholder}
                                className="w-full bg-transparent text-3xl md:text-5xl border-b-2 border-gray-200 focus:border-black outline-none py-4 placeholder-gray-200 transition-colors"
                            />
                        )}

                        {questions[currentStep].type === "email" && (
                            <input
                                ref={inputRef}
                                type="email"
                                value={formData.email}
                                onChange={(e) => updateField(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder={questions[currentStep].placeholder}
                                className="w-full bg-transparent text-3xl md:text-5xl border-b-2 border-gray-200 focus:border-black outline-none py-4 placeholder-gray-200 transition-colors"
                            />
                        )}

                        {questions[currentStep].type === "tel" && (
                            <input
                                ref={inputRef}
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => updateField(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder={questions[currentStep].placeholder}
                                className="w-full bg-transparent text-3xl md:text-5xl border-b-2 border-gray-200 focus:border-black outline-none py-4 placeholder-gray-200 transition-colors"
                            />
                        )}

                        {questions[currentStep].type === "selection" && (
                            <div className="flex flex-wrap gap-4">
                                {questions[currentStep].options.map((option) => (
                                    <button
                                        key={option}
                                        onClick={() => toggleSelection(option)}
                                        className={`px-8 py-4 rounded-full text-xl md:text-2xl font-medium border-2 transition-all duration-300 ${
                                            formData.services.includes(option)
                                                ? "bg-black text-white border-black"
                                                : "bg-white text-gray-400 border-gray-200 hover:border-gray-400"
                                        }`}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        )}

                        {questions[currentStep].type === "radio" && (
                            <div className="flex flex-wrap gap-4">
                                {questions[currentStep].options.map((option) => (
                                    <button
                                        key={option}
                                        onClick={() => {
                                            updateField(option);
                                            setTimeout(handleNext, 300); // Auto advance for single choice
                                        }}
                                        className={`px-8 py-4 rounded-full text-xl md:text-2xl font-medium border-2 transition-all duration-300 ${
                                            formData.budget === option
                                                ? "bg-black text-white border-black"
                                                : "bg-white text-gray-400 border-gray-200 hover:border-gray-400"
                                        }`}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        )}

                        {questions[currentStep].type === "textarea" && (
                            <textarea
                                ref={inputRef}
                                rows={4}
                                value={formData.details}
                                onChange={(e) => updateField(e.target.value)}
                                placeholder={questions[currentStep].placeholder}
                                className="w-full bg-transparent text-2xl md:text-4xl border-b-2 border-gray-200 focus:border-black outline-none py-4 placeholder-gray-200 transition-colors resize-none"
                            />
                        )}
                    </div>

                    {/* NAVIGATION BUTTONS */}
                    <div className="flex items-center justify-between mt-16">
                        {currentStep > 0 ? (
                            <button 
                                onClick={handlePrev}
                                className="text-gray-400 hover:text-black transition-colors flex items-center gap-2"
                            >
                                <ArrowLeft size={20} /> Précédent
                            </button>
                        ) : (
                            <div></div>
                        )}

                        <button
                            onClick={handleNext}
                            disabled={isSubmitting}
                            className={`group flex items-center gap-4 text-2xl font-bold transition-all ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:gap-6'}`}
                        >
                            {isSubmitting ? "Envoi..." : (currentStep === questions.length - 1 ? "Envoyer" : "Suivant")}
                            <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center group-hover:bg-purple-600 transition-colors">
                                {isSubmitting ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    currentStep === questions.length - 1 ? <Send size={20} /> : <ArrowRight size={24} />
                                )}
                            </div>
                        </button>
                    </div>
                </motion.div>
            </AnimatePresence>
        )}
      </main>

      {/* PROGRESS BAR */}
      <div className="fixed bottom-0 left-0 w-full h-2 bg-gray-100">
        <motion.div 
            className="h-full bg-gradient-to-r from-purple-600 to-black"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
        />
      </div>

    </div>
  );
}
