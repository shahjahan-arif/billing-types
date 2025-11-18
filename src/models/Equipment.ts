import { EquipmentType, EquipmentStatus } from '../enums';
import { UserPublic } from './User';

export interface Equipment {
  id: string;
  providerId: string;
  type: EquipmentType;
  name: string;
  model: string;
  serialNumber: string;
  status: EquipmentStatus;
  assignedTo: string | null;
  purchaseDate: Date | null;
  warrantyExpiry: Date | null;
  notes: string | null;
  purchaseCost: number | null;
  monthlyDepreciation: number | null;
  maintenanceCost: number;
  lastMaintenanceDate: Date | null;
  // Additional properties for frontend
  manufacturer?: string | null;
  currentValue?: number | null;
  description?: string | null;
  customerId?: string | null;
  assignmentDate?: Date | null;
  location?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface EquipmentWithRelations extends Equipment {
  provider: UserPublic;
  assignee?: UserPublic | null;
}

export interface CreateEquipmentInput {
  type: EquipmentType;
  name: string;
  model: string;
  serialNumber: string;
  purchaseDate?: Date;
  warrantyExpiry?: Date;
  notes?: string;
  purchaseCost?: number;
  monthlyDepreciation?: number;
  maintenanceCost?: number;
  manufacturer?: string;
  currentValue?: number;
  description?: string;
  location?: string;
}

export interface UpdateEquipmentInput {
  name?: string;
  model?: string;
  status?: EquipmentStatus;
  notes?: string;
  purchaseDate?: Date;
  warrantyExpiry?: Date;
  purchaseCost?: number;
  monthlyDepreciation?: number;
  maintenanceCost?: number;
  lastMaintenanceDate?: Date;
  manufacturer?: string;
  currentValue?: number;
  description?: string;
  location?: string;
}

export interface AssignEquipmentInput {
  id: string;
  userId: string;
}

export interface ReturnEquipmentInput {
  id: string;
}

export interface EquipmentListQuery {
  status?: EquipmentStatus;
  type?: EquipmentType;
  assignedTo?: string;
  page?: number;
  limit?: number;
}

export interface EquipmentListResponse {
  equipment: Equipment[];
  total: number;
  page: number;
  limit: number;
}

// Equipment Issue Types
export interface EquipmentIssue {
  id: string;
  equipmentId: string;
  customerId: string;
  type: string; // HARDWARE, SOFTWARE, PERFORMANCE, CONNECTIVITY, OTHER
  priority: string; // LOW, MEDIUM, HIGH
  title: string;
  description: string;
  status: string; // OPEN, IN_PROGRESS, RESOLVED, CLOSED
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string | null;
  resolvedBy?: string | null;
  resolution?: string | null;
}

export interface CreateEquipmentIssueInput {
  equipmentId: string;
  type: string;
  priority: string;
  title: string;
  description: string;
}

export interface UpdateEquipmentIssueInput {
  status?: string;
  resolution?: string;
  resolvedBy?: string;
}
