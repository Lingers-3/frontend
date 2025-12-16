import { useState } from "react";
import { type ProjectFull } from "../../../services/project/types";
import { ResourceCard } from "./ResourceCard";
import { ResourceDetailsDialog } from "./ResourceDetailsDialog";

export const ResourceActiveList = ({ project }: { project: ProjectFull }) => {
  const [selectedSpecId, setSelectedSpecId] = useState<number | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const selectedSpec =
    project.specifications.find((s) => s.id === selectedSpecId) || null;

  const handleCardClick = (specId: number) => {
    setSelectedSpecId(specId);
    setDetailsOpen(true);
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-3">
        {project.specifications.map((spec) => (
          <ResourceCard
            key={spec.id}
            spec={spec}
            mode="active"
            projectId={project.id}
            onClick={() => handleCardClick(spec.id)}
          />
        ))}
      </div>

      <ResourceDetailsDialog
        projectId={project.id}
        spec={selectedSpec}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
      />
    </>
  );
};
