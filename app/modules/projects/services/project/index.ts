import axios, { type AxiosError } from "axios";
import api, { type ApiError } from "~/lib/api";
import { type Result, Ok, Err } from "~/lib/result";
import type {
  Project,
  ProjectFull,
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
  ResourceSpecification,
  ResourceReservation,
  ProjectSearchQuery,
} from "./types";

export class project {
  static async search(
    params?: ProjectSearchQuery
  ): Promise<Result<Project[], ApiError>> {
    try {
      const response = await api.get<Project[]>("/projects", { params });
      return Ok(response.data);
    } catch (e) {
      return Err(project.error(e));
    }
  }

  static async create(
    payload: ProjectCreateRequest
  ): Promise<Result<Project, ApiError>> {
    try {
      const response = await api.post<Project>("/projects", payload);
      return Ok(response.data);
    } catch (e) {
      return Err(project.error(e));
    }
  }

  static async get(id: number): Promise<Result<ProjectFull, ApiError>> {
    try {
      const response = await api.get<ProjectFull>(`/projects/${id}`);
      return Ok(response.data);
    } catch (e) {
      return Err(project.error(e));
    }
  }

  static async delete(id: number): Promise<Result<void, ApiError>> {
    try {
      await api.delete(`/projects/${id}`);
      return Ok(undefined);
    } catch (e) {
      return Err(project.error(e));
    }
  }

  static async update(
    id: number,
    payload: ProjectUpdateRequest
  ): Promise<Result<Project, ApiError>> {
    try {
      const response = await api.patch<Project>(`/projects/${id}`, payload);
      return Ok(response.data);
    } catch (e) {
      return Err(project.error(e));
    }
  }

  static async updateActualMetrics(
    id: number,
    payload: ProjectActualMetricsRequest
  ): Promise<Result<Project, ApiError>> {
    try {
      const response = await api.patch<Project>(
        `/projects/${id}/actual`,
        payload
      );
      return Ok(response.data);
    } catch (e) {
      return Err(project.error(e));
    }
  }

  static async cancel(
    id: number,
    payload: CancelProjectRequest
  ): Promise<Result<Project, ApiError>> {
    try {
      const response = await api.post<Project>(
        `/projects/${id}/cancel`,
        payload
      );
      return Ok(response.data);
    } catch (e) {
      return Err(project.error(e));
    }
  }

  static async complete(
    id: number,
    payload: CompleteProjectRequest
  ): Promise<Result<Project, ApiError>> {
    try {
      const response = await api.post<Project>(
        `/projects/${id}/complete`,
        payload
      );
      return Ok(response.data);
    } catch (e) {
      return Err(project.error(e));
    }
  }

  static async updatePlan(
    id: number,
    payload: ProjectPlanUpdateRequest
  ): Promise<Result<Project, ApiError>> {
    try {
      const response = await api.patch<Project>(`/projects/${id}/plan`, payload);
      return Ok(response.data);
    } catch (e) {
      return Err(project.error(e));
    }
  }

  static async addPlannedResource(
    id: number,
    payload: AddPlannedResourceRequest
  ): Promise<Result<ResourceSpecification, ApiError>> {
    try {
      const response = await api.post<ResourceSpecification>(
        `/projects/${id}/plan/resources`,
        payload
      );
      return Ok(response.data);
    } catch (e) {
      return Err(project.error(e));
    }
  }

  static async removePlannedResource(
    id: number,
    specId: number
  ): Promise<Result<void, ApiError>> {
    try {
      await api.delete(`/projects/${id}/plan/resources/${specId}`);
      return Ok(undefined);
    } catch (e) {
      return Err(project.error(e));
    }
  }

  static async addActiveResource(
    id: number,
    payload: AddActiveResourceRequest
  ): Promise<Result<ProjectFull, ApiError>> {
    try {
      const response = await api.post<ProjectFull>(
        `/projects/${id}/resources`,
        payload
      );
      return Ok(response.data);
    } catch (e) {
      return Err(project.error(e));
    }
  }

  static async updateResourceUsage(
    id: number,
    resId: number,
    payload: UpdateResourceUsageRequest
  ): Promise<Result<ResourceReservation, ApiError>> {
    try {
      const response = await api.patch<ResourceReservation>(
        `/projects/${id}/resources/${resId}`,
        payload
      );
      return Ok(response.data);
    } catch (e) {
      return Err(project.error(e));
    }
  }

  static async addReservation(
    id: number,
    specId: number,
    payload: AddReservationRequest
  ): Promise<Result<ResourceReservation, ApiError>> {
    try {
      const response = await api.post<ResourceReservation>(
        `/projects/${id}/resources/${specId}/reservations`,
        payload
      );
      return Ok(response.data);
    } catch (e) {
      return Err(project.error(e));
    }
  }

  static async deleteReservation(
    id: number,
    specId: number,
    resId: number
  ): Promise<Result<void, ApiError>> {
    try {
      await api.delete(
        `/projects/${id}/resources/${specId}/reservations/${resId}`
      );
      return Ok(undefined);
    } catch (e) {
      return Err(project.error(e));
    }
  }

  static async updateReservation(
    id: number,
    specId: number,
    resId: number,
    payload: UpdateReservationRequest
  ): Promise<Result<ResourceReservation, ApiError>> {
    try {
      const response = await api.patch<ResourceReservation>(
        `/projects/${id}/resources/${specId}/reservations/${resId}`,
        payload
      );
      return Ok(response.data);
    } catch (e) {
      return Err(project.error(e));
    }
  }

  static async start(id: number): Promise<Result<ProjectFull, ApiError>> {
    try {
      const response = await api.post<ProjectFull>(`/projects/${id}/start`);
      return Ok(response.data);
    } catch (e) {
      return Err(project.error(e));
    }
  }

  static error(err: unknown): ApiError {
    if (axios.isAxiosError(err)) {
      const axiosError = err as AxiosError<{ error?: string }>;

      return {
        status: axiosError.response?.status,
        message:
          axiosError.response?.data?.error ||
          axiosError.message ||
          "An unknown error occurred",
      };
    }

    if (err instanceof Error) {
      return {
        message: err.message,
      };
    }

    return {
      message: "A totally unknown error occurred",
    };
  }
}
