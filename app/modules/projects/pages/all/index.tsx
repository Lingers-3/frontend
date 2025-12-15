import { Link } from "react-router";
import { useState } from "react";
import { ProjectCard } from "./ProjectCard";
import { Button } from "~/components/ui/button";
import { PlusCircle, Search, FolderOpen } from "lucide-react";
import { ProjectsFilter, type ProjectFilterState } from "./ProjectsFilter";
import { useProjects } from "../../hooks/projects-hooks";
import ProjectDialog from "../forms/ProjectDialog";

export default function ProjectsIndex() {
  const { data: projects, isLoading, isError } = useProjects();

  const [filterState, setFilterState] = useState<ProjectFilterState>({
    search: "",
    state: "All",
  });

  const filteredProjects = projects?.filter((proj) => {
    // 1. Search Filter
    if (
      filterState.search &&
      !proj.name.toLowerCase().includes(filterState.search.toLowerCase())
    ) {
      return false;
    }

    // 2. State Filter
    if (filterState.state !== "All" && proj.state !== filterState.state) {
      return false;
    }

    return true;
  });

  // Sort projects by Updated At desc (newest changes first)
  const sortedProjects = filteredProjects?.sort(
    (a, b) =>
      new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
  );

  const NoProjects = () => (
    <div className="flex flex-col items-center justify-center h-full min-h-[60vh] w-full p-8 rounded-xl border-2 border-dashed border-dracula-current-line/50 bg-dracula-current-line/20">
      <FolderOpen className="w-16 h-16 text-dracula-purple mb-4 opacity-75" />
      <h2 className="text-xl font-semibold text-dracula-foreground mb-2">
        No projects yet
      </h2>
      <p className="text-dracula-foreground/80 mb-6 text-center max-w-sm">
        You haven't started any projects. Create one to start tracking your work
        and resources.
      </p>
      <ProjectDialog
        mode="create"
        trigger={
          <Button className="bg-dracula-purple hover:bg-dracula-purple/90 text-dracula-background font-bold shadow-lg gap-2 rounded-xl">
            <PlusCircle className="w-5 h-5" />
            Create first project
          </Button>
        }
      />
    </div>
  );

  const ProjectsList = () => (
    <>
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full mb-6 gap-4">
        <div className="flex items-center gap-4 text-dracula-foreground">
          <h1 className="ml-1 text-2xl font-bold">Projects</h1>
          <div className="text-dracula-current-line select-none">|</div>
          <p className="text-lg text-dracula-orange font-medium">
            {sortedProjects?.length}
            <span className="text-dracula-comment text-sm ml-1">
              / {projects?.length} Total
            </span>
          </p>
        </div>
        <ProjectDialog
          mode="create"
          trigger={
            <Button className="bg-dracula-purple hover:bg-dracula-purple/90 text-dracula-background font-bold shadow-md gap-2 rounded-xl w-full sm:w-auto">
              <PlusCircle className="w-5 h-5" />
              New Project
            </Button>
          }
        />
      </header>

      <ProjectsFilter state={filterState} onChange={setFilterState} />

      {sortedProjects?.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-dracula-comment">
          <Search className="w-12 h-12 mb-3 opacity-50" />
          <p className="text-lg">No projects match your filters.</p>
          <Button
            variant="link"
            onClick={() => setFilterState({ search: "", state: "All" })}
            className="text-dracula-purple mt-2"
          >
            Clear filters
          </Button>
        </div>
      ) : (
        <div className="pb-40 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedProjects?.map((proj) => (
            <Link key={proj.id} to={`${proj.id}`} className="block">
              <ProjectCard project={proj} />
            </Link>
          ))}
        </div>
      )}
    </>
  );

  return (
    <>
      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="bg-dracula-current-line rounded-3xl h-60 animate-pulse"
            />
          ))}
        </div>
      )}

      {isError && (
        <div className="flex flex-col items-center justify-center h-96 text-dracula-red">
          <p className="text-lg font-medium">Failed to load projects</p>
        </div>
      )}

      {!isLoading && !isError && (!projects || projects.length === 0) && (
        <NoProjects />
      )}

      {!isLoading && !isError && projects && projects.length > 0 && (
        <ProjectsList />
      )}
    </>
  );
}
