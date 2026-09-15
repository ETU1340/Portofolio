export type ProjectType = 'PERSONAL' | 'PROFESSIONAL' | 'OPEN_SOURCE';
export type ProjectStatus = 'LIVE' | 'IN_PROGRESS' | 'ARCHIVED';
export type SkillCategory = 'BACKEND' | 'FRONTEND' | 'DATABASE' | 'DEVOPS';

export interface Project {
  id: string;
  title: string;
  slug: string;
  summary: string;
  description: string;
  projectType: ProjectType;
  status: ProjectStatus;
  domainName: string | null;
  githubUrl: string | null;
  isGithubPublic: boolean;
  technologies: string[];
  highlights: string[];
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  order: number;
}

export interface Message {
  id: string;
  senderName: string;
  senderEmail: string;
  subject: string;
  content: string;
  isRead: boolean;
  isArchived: boolean;
  createdAt: string;
}

export interface Profile {
  id: string;
  fullName: string;
  title: string;
  bio: string;
  email: string;
  phone: string | null;
  location: string | null;
  avatarUrl: string | null;
  cvUrl: string | null;
  githubUrl: string | null;
  linkedinUrl: string | null;
  websiteUrl: string | null;
  yearsOfExperience: number;
  projectsDelivered: number;
  availableForHire: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  email: string;
  createdAt?: string;
}

export const PROJECT_TYPE_LABELS: Record<ProjectType, string> = {
  PERSONAL: 'Projet Personnel',
  PROFESSIONAL: 'Professionnel',
  OPEN_SOURCE: 'Open Source',
};

export const PROJECT_STATUS_LABELS: Record<ProjectStatus, string> = {
  LIVE: 'En Ligne',
  IN_PROGRESS: 'En développement',
  ARCHIVED: 'Archivé',
};

export const SKILL_CATEGORY_LABELS: Record<SkillCategory, string> = {
  BACKEND: 'Backend',
  FRONTEND: 'Frontend',
  DATABASE: 'Base de données',
  DEVOPS: 'Architecture & DevOps',
};
