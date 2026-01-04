import fs from 'fs';
import path from 'path';

const projectsDirectory = path.join(process.cwd(), 'src/content/projects');

export function getAllProjects() {
  // Ensure directory exists
  if (!fs.existsSync(projectsDirectory)) {
    return [];
  }

  const projectDirs = fs.readdirSync(projectsDirectory);

  const projects = projectDirs.map((dir) => {
    const filePath = path.join(projectsDirectory, dir, 'project.json');
    
    // Skip if not a directory or no json file
    if (!fs.existsSync(filePath)) return null;

    try {
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const projectData = JSON.parse(fileContents);

        return {
          slug: dir,
          ...projectData,
        };
    } catch (e) {
        console.error(`Error reading project ${dir}:`, e);
        return null;
    }
  }).filter(Boolean);

  return projects;
}
