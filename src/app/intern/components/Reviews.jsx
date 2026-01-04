"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const ReviewCard = ({ review, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="min-w-[350px] md:min-w-[400px] bg-gray-50 p-8 rounded-3xl border border-gray-100 flex flex-col justify-between h-full select-none hover:border-gray-200 transition-colors"
    >
      <div>
        <div className="flex gap-1 mb-6 text-purple-600">
            {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill={i < review.rating ? "currentColor" : "none"} className={i < review.rating ? "text-purple-600" : "text-gray-300"} />
            ))}
        </div>
        
        <div className="mb-6 relative">
            <Quote className="absolute -top-2 -left-2 text-gray-200 w-8 h-8 -z-10" />
            <p className="text-lg font-medium text-gray-800 leading-relaxed line-clamp-6">
                "{review.content}"
            </p>
        </div>
      </div>

      <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center font-bold text-gray-600">
            {review.author ? review.author.charAt(0).toUpperCase() : "?"}
        </div>
        <div>
            <p className="font-bold text-sm">{review.author || "Client"}</p>
            <p className="text-xs text-gray-400 font-mono line-clamp-1">{review.project || "Projet confidentiel"}</p>
        </div>
      </div>
    </motion.div>
  );
};

const Reviews = ({ reviews }) => {
  if (!reviews || reviews.length === 0) return null;

  return (
    <section className="py-24 px-6 md:px-12 max-w-[1800px] mx-auto overflow-hidden">
      <div className="mb-16 md:flex justify-between items-end">
        <div>
            <h2 className="text-sm font-bold tracking-widest uppercase text-gray-400 mb-4">Avis Clients</h2>
            <h3 className="text-4xl md:text-6xl font-bold tracking-tighter">CE QU'ILS DISENT<br/><span className="text-purple-600">DE NOUS.</span></h3>
        </div>
        <div className="hidden md:block text-right">
             <div className="flex items-center gap-2 justify-end mb-2">
                <span className="text-3xl font-bold">5.0</span>
                <div className="flex text-purple-600">
                    {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="currentColor" />)}
                </div>
             </div>
             <p className="text-gray-400 text-sm">Moyenne sur Codeur.com</p>
        </div>
      </div>

      <div className="flex overflow-x-auto gap-6 pb-12 -mx-6 px-6 scrollbar-hide snap-x">
        {reviews.map((review, index) => (
            <div key={review.id || index} className="snap-center">
                <ReviewCard review={review} index={index} />
            </div>
        ))}
        
        {/* Call to action card */}
        <div className="min-w-[300px] flex items-center justify-center bg-black rounded-3xl p-8 text-center text-white snap-center">
            <div>
                <h4 className="text-2xl font-bold mb-4">Prêt à collaborer ?</h4>
                <a href="/contact" className="inline-block bg-white text-black px-6 py-3 rounded-full font-bold hover:bg-purple-600 hover:text-white transition-colors">
                    Démarrer un projet
                </a>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
