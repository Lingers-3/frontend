export enum ProjectState {
  Planning = "Planning",
  Active = "Active",
  Completed = "Completed",
  Canceled = "Canceled",
}

export enum ResourceType {
  Consumable = "Consumable",
  Instrument = "Instrument",
}

export interface ResourceReservation {
  id: number;
  item_description: string;
  item_id: number;
  reserved_quantity: number;
  resource_specification_id: number;
  used_quantity: number;
}

export interface ResourceSpecification {
  id: number;
  item_type_id: number;
  item_type_name: string;
  planned_quantity: number;
  resource_type: ResourceType;
}

export interface ResourceSpecificationFull extends ResourceSpecification {
  reservations: ResourceReservation[];
}

export interface Project {
  id: number;
  name: string;
  description: string;
  state: ProjectState;

  created_at: string;
  updated_at: string;
  started_at: string;
  finished_at: string;

  planned_deadline: string;
  actual_deadline: string;

  planned_income: number;
  actual_income: number;

  planned_work_time: number;
  actual_work_time: number;
}

export interface ProjectFull extends Project {
  specifications: ResourceSpecificationFull[];
}

export interface ProjectSearchQuery {
  query?: string;
  state?: ProjectState;
}

export interface ProjectCreateRequest {
  name: string;
  description?: string;
  planned_deadline?: string;
  planned_income?: number;
  planned_work_time?: number;
}

export interface ProjectUpdateRequest {
  name?: string;
  description?: string;
}

export interface ProjectActualMetricsRequest {
  actual_deadline?: string;
  actual_income?: number;
  actual_work_time?: number;
}

export interface CancelProjectRequest {
  return_items_to_inventory: boolean;
}

export interface CompleteProjectRequest {
  actual_revenue?: number;
  finalize_inventory?: boolean;
}

export interface ProjectPlanUpdateRequest {
  planned_deadline?: string;
  planned_income?: number;
  planned_work_time?: number;
}

export interface AddPlannedResourceRequest {
  item_type_id: number;
  planned_quantity: number;
  resource_type: ResourceType;
}

export interface ActiveResourceItemRequest {
  item_id: number;
  reserved: number;
  used?: number;
}

export interface AddActiveResourceRequest {
  item_type_id: number;
  resource_type: ResourceType;
  resources: ActiveResourceItemRequest[];
}

export interface UpdateResourceUsageRequest {
  used_quantity: number;
}

export interface AddReservationRequest {
  item_id: number;
  reserved: number;
  used?: number;
}

export interface UpdateReservationRequest {
  reserved?: number;
  used?: number;
}
