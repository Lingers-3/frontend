import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { unwrap } from "~/lib/result";
import { project } from "../services";
import type {
  ProjectSearchQuery,
  ProjectCreateRequest,
  ProjectUpdateRequest,
  ProjectActualMetricsRequest,
  CancelProjectRequest,
  CompleteProjectRequest,
  ProjectPlanUpdateRequest,
  AddPlannedResourceRequest,
  AddActiveResourceRequest,
  UpdateResourceUsageRequest,
  AddReservationRequest,
  UpdateReservationRequest,
} from "../services/types";

export const PROJECT_KEYS = {
  all: ["projects"] as const,
  lists: () => [...PROJECT_KEYS.all, "list"] as const,
  list: (params?: ProjectSearchQuery) =>
    [...PROJECT_KEYS.lists(), params] as const,
  details: () => [...PROJECT_KEYS.all, "detail"] as const,
  detail: (id: number) => [...PROJECT_KEYS.details(), id] as const,
};

export const useProjects = (params?: ProjectSearchQuery) => {
  return useQuery({
    queryKey: PROJECT_KEYS.list(params),
    queryFn: () => unwrap(project.search(params)),
  });
};

export const useProject = (id: number) => {
  return useQuery({
    queryKey: PROJECT_KEYS.detail(id),
    queryFn: () => unwrap(project.get(id)),
    enabled: !!id,
  });
};

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ProjectCreateRequest) =>
      unwrap(project.create(payload)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROJECT_KEYS.lists() });
    },
  });
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => unwrap(project.delete(id)),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: PROJECT_KEYS.lists() });
      queryClient.removeQueries({ queryKey: PROJECT_KEYS.detail(id) });
    },
  });
};

export const useUpdateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: ProjectUpdateRequest;
    }) => unwrap(project.update(id, payload)),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: PROJECT_KEYS.detail(data.id) });
      queryClient.invalidateQueries({ queryKey: PROJECT_KEYS.lists() });
    },
  });
};

export const useUpdateProjectActualMetrics = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: ProjectActualMetricsRequest;
    }) => unwrap(project.updateActualMetrics(id, payload)),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: PROJECT_KEYS.detail(data.id) });
      queryClient.invalidateQueries({ queryKey: PROJECT_KEYS.lists() });
    },
  });
};

export const useCancelProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: CancelProjectRequest;
    }) => unwrap(project.cancel(id, payload)),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: PROJECT_KEYS.detail(data.id) });
      queryClient.invalidateQueries({ queryKey: PROJECT_KEYS.lists() });
    },
  });
};

export const useCompleteProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: CompleteProjectRequest;
    }) => unwrap(project.complete(id, payload)),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: PROJECT_KEYS.detail(data.id) });
      queryClient.invalidateQueries({ queryKey: PROJECT_KEYS.lists() });
    },
  });
};

export const useUpdateProjectPlan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: ProjectPlanUpdateRequest;
    }) => unwrap(project.updatePlan(id, payload)),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: PROJECT_KEYS.detail(data.id) });
      queryClient.invalidateQueries({ queryKey: PROJECT_KEYS.lists() });
    },
  });
};

export const useStartProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => unwrap(project.start(id)),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: PROJECT_KEYS.detail(data.id) });
      queryClient.invalidateQueries({ queryKey: PROJECT_KEYS.lists() });
    },
  });
};

export const useAddPlannedResource = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: AddPlannedResourceRequest;
    }) => unwrap(project.addPlannedResource(id, payload)),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: PROJECT_KEYS.detail(variables.id),
      });
    },
  });
};

export const useRemovePlannedResource = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, specId }: { id: number; specId: number }) =>
      unwrap(project.removePlannedResource(id, specId)),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: PROJECT_KEYS.detail(variables.id),
      });
    },
  });
};

export const useAddActiveResource = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: AddActiveResourceRequest;
    }) => unwrap(project.addActiveResource(id, payload)),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: PROJECT_KEYS.detail(data.id) });
    },
  });
};

export const useUpdateResourceUsage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      resId,
      payload,
    }: {
      id: number;
      resId: number;
      payload: UpdateResourceUsageRequest;
    }) => unwrap(project.updateResourceUsage(id, resId, payload)),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: PROJECT_KEYS.detail(variables.id),
      });
    },
  });
};

export const useAddReservation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      specId,
      payload,
    }: {
      id: number;
      specId: number;
      payload: AddReservationRequest;
    }) => unwrap(project.addReservation(id, specId, payload)),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: PROJECT_KEYS.detail(variables.id),
      });
    },
  });
};

export const useDeleteReservation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      specId,
      resId,
    }: {
      id: number;
      specId: number;
      resId: number;
    }) => unwrap(project.deleteReservation(id, specId, resId)),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: PROJECT_KEYS.detail(variables.id),
      });
    },
  });
};

export const useUpdateReservation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      specId,
      resId,
      payload,
    }: {
      id: number;
      specId: number;
      resId: number;
      payload: UpdateReservationRequest;
    }) => unwrap(project.updateReservation(id, specId, resId, payload)),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: PROJECT_KEYS.detail(variables.id),
      });
    },
  });
};
