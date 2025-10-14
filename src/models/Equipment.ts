import { EquipmentType, EquipmentStatus } from '../enums';
import { UserPublic } from './User';

export interface Equipment {
  id: string;
  providerId: string;
  type: EquipmentType;
  name: string;
  serialNumber: string;
  status: EquipmentStatus;
  assignedTo: string | null;
  purchaseDate: Date | null;
  warrantyExpiry: Date | null;
  notes: string | null;
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
  serialNumber: string;
  purchaseDate?: Date;
  warrantyExpiry?: Date;
  notes?: string;
}

export interface UpdateEquipmentInput {
  name?: string;
  status?: EquipmentStatus;
  notes?: string;
  purchaseDate?: Date;
  warrantyExpiry?: Date;
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
