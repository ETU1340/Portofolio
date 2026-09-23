import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { Prisma, ProjectStatus, ProjectType } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto, UpdateProjectDto } from './dto/project.dto';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(filters: {
    type?: ProjectType;
    status?: ProjectStatus;
    tech?: string;
    publishedOnly?: boolean;
  }) {
    const where: Prisma.ProjectWhereInput = {};

    if (filters.publishedOnly) {
      where.isPublished = true;
    }
    if (filters.type) {
      where.projectType = filters.type;
    }
    if (filters.status) {
      where.status = filters.status;
    }
    if (filters.tech) {
      where.technologies = { has: filters.tech };
    }

    return this.prisma.project.findMany({
      where,
      orderBy: [{ createdAt: 'desc' }],
    });
  }

  async findBySlug(slug: string, publishedOnly = true) {
    const project = await this.prisma.project.findUnique({ where: { slug } });
    if (!project || (publishedOnly && !project.isPublished)) {
      throw new NotFoundException('Projet introuvable');
    }
    return project;
  }

  async create(dto: CreateProjectDto) {
    const existing = await this.prisma.project.findUnique({
      where: { slug: dto.slug },
    });
    if (existing) {
      throw new ConflictException('Ce slug existe déjà');
    }
    return this.prisma.project.create({ data: dto });
  }

  async update(id: string, dto: UpdateProjectDto) {
    await this.ensureExists(id);
    if (dto.slug) {
      const conflict = await this.prisma.project.findFirst({
        where: { slug: dto.slug, NOT: { id } },
      });
      if (conflict) {
        throw new ConflictException('Ce slug existe déjà');
      }
    }
    return this.prisma.project.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.ensureExists(id);
    await this.prisma.project.delete({ where: { id } });
    return { success: true };
  }

  private async ensureExists(id: string) {
    const project = await this.prisma.project.findUnique({ where: { id } });
    if (!project) {
      throw new NotFoundException('Projet introuvable');
    }
    return project;
  }
}
