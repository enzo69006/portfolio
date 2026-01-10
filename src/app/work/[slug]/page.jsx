import React from "react";
import { notFound } from "next/navigation";
import { getProjectBySlug, getAllProjects } from "@/lib/projects";
import { getAppStoreData } from "@/lib/appStore";
import ProjectContent from "./content";

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

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  // Fetch App Store Data if ID exists
  let appStoreData = null;
  if (project.appStoreId) {
    appStoreData = await getAppStoreData(project.appStoreId);
  }

  return <ProjectContent project={project} appStoreData={appStoreData} />;
}
