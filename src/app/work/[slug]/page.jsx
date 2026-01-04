import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getProjectBySlug, getAllProjects } from "@/lib/projects";
import { MotionDiv, MotionH1, MotionP, MotionImg } from "@/lib/motion-client"; 

// --- STATIC GENERATION ---
export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

// --- METADATA ---
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Projet non trouvé | Syntaax",
    };
  }

  return {
    title: `${project.title} | Syntaax`,
    description: project.description,
  };
}

// --- COMPONENTS ---

const Background = () => (
  <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-white">
    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-40"></div>
  </div>
);

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white pb-24">
      <Background />
      
      {/* HEADER / HERO */}
      <header className="relative z-10 pt-32 md:pt-48 px-6 md:px-12 max-w-[1600px] mx-auto">
        <div className="mb-8 md:mb-12">
            <Link href="/work" className="inline-flex items-center gap-2 text-sm font-mono uppercase tracking-widest text-gray-500 hover:text-black transition-colors">
                <ArrowLeft size={16} /> Retour aux projets
            </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-24">
            <div className="md:col-span-8">
                <MotionH1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-none mb-8"
                >
                    {project.title}
                </MotionH1>
                <MotionP 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-2xl md:text-3xl font-light text-gray-600 max-w-2xl leading-relaxed"
                >
                    {project.description}
                </MotionP>
            </div>
            
            <MotionDiv 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="md:col-span-4 flex flex-col justify-end space-y-8"
            >
                <div className="grid grid-cols-2 gap-8 border-t border-gray-200 pt-8">
                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Client</h3>
                        <p className="text-lg font-medium">{project.client || "Confidentiel"}</p>
                    </div>
                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Année</h3>
                        <p className="text-lg font-medium">{project.year}</p>
                    </div>
                </div>
                <div className="border-t border-gray-200 pt-8">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Services</h3>
                    <div className="flex flex-wrap gap-2">
                        {project.services?.map((service, i) => (
                            <span key={i} className="px-3 py-1 rounded-full border border-gray-200 text-sm">{service}</span>
                        )) || <span className="text-gray-400">N/A</span>}
                    </div>
                </div>
                {project.link && (
                    <div className="pt-4">
                        <a 
                            href={project.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full font-bold hover:bg-purple-600 transition-colors"
                        >
                            Visiter le site <ArrowUpRight size={18} />
                        </a>
                    </div>
                )}
            </MotionDiv>
        </div>
      </header>

      {/* COVER IMAGE */}
      <MotionDiv 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative z-10 px-6 md:px-12 max-w-[1800px] mx-auto mb-32"
      >
        <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-gray-100">
            {project.coverImage ? (
                <Image 
                    src={project.coverImage} 
                    alt={`Cover ${project.title}`} 
                    fill 
                    className="object-cover"
                    priority
                />
            ) : (
                <div className="absolute inset-0 flex items-center justify-center text-gray-300">No Cover Image</div>
            )}
        </div>
      </MotionDiv>

      {/* CONTENT: CHALLENGE & SOLUTION */}
      <section className="relative z-10 px-6 md:px-12 max-w-[1600px] mx-auto mb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
            <div>
                <h2 className="text-4xl font-bold mb-8 tracking-tight">Le Challenge</h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                    {project.challenge || "Description du challenge à venir."}
                </p>
            </div>
            <div>
                <h2 className="text-4xl font-bold mb-8 tracking-tight">La Solution</h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                    {project.solution || "Description de la solution à venir."}
                </p>

                {/* TECH STACK */}
                <div className="mt-12">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">Stack Technique</h3>
                    <div className="flex flex-wrap gap-3">
                        {project.tech?.map((t, i) => (
                            <span key={i} className="px-4 py-2 bg-gray-100 rounded-lg font-mono text-sm">{t}</span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* GALLERY */}
      {project.gallery && project.gallery.length > 0 && (
          <section className="relative z-10 px-6 md:px-12 max-w-[1800px] mx-auto mb-32">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.gallery.map((img, index) => (
                    <div key={index} className={`relative rounded-xl overflow-hidden bg-gray-100 ${index % 3 === 0 ? 'md:col-span-2 aspect-[21/9]' : 'aspect-square'}`}>
                        <Image 
                            src={img} 
                            alt={`Gallery ${index}`} 
                            fill 
                            className="object-cover hover:scale-105 transition-transform duration-700"
                        />
                    </div>
                ))}
            </div>
          </section>
      )}

      {/* NEXT PROJECT (Simple Logic) */}
      <section className="relative z-10 px-6 md:px-12 max-w-[1600px] mx-auto pt-24 border-t border-gray-200 text-center">
        <p className="text-sm font-mono uppercase text-gray-400 mb-4">Projet Suivant</p>
        <Link href="/work" className="text-5xl md:text-8xl font-bold tracking-tighter hover:text-purple-600 transition-colors">
            Voir tous les projets
        </Link>
      </section>

    </div>
  );
}
