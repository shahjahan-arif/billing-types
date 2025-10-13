import { UserGroupType } from '../enums';
import { UserPublic } from './User';

export interface UserGroup {
  id: string;
  providerId: string;
  name: string;
  description?: string | null;
  type: UserGroupType;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserGroupWithMembers extends UserGroup {
  members: UserPublic[];
  memberCount: number;
}

export interface UserGroupMember {
  id: string;
  userId: string;
  groupId: string;
  joinedAt: Date;
}

export interface CreateUserGroupInput {
  name: string;
  description?: string;
  type: UserGroupType;
}

export interface UpdateUserGroupInput {
  name?: string;
  description?: string;
}

export interface AddMembersInput {
  groupId: string;
  userIds: string[];
}

export interface RemoveMembersInput {
  groupId: string;
  userIds: string[];
}

export interface UserGroupListResponse {
  groups: UserGroup[];
  total: number;
}
