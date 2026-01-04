import { getAllProjects } from "../../lib/projects";
import WorkList from "./WorkList";

export default function WorkPage() {
  const projects = getAllProjects();

  return <WorkList initialProjects={projects} />;
}
