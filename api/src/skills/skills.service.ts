import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateSkillDto,
  UpdateSkillDto,
  ReorderSkillDto,
} from './dto/skill.dto';

@Injectable()
export class SkillsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.skill.findMany({
      orderBy: [{ category: 'asc' }, { order: 'asc' }],
    });
  }

  async create(dto: CreateSkillDto) {
    return this.prisma.skill.create({ data: dto });
  }

  async update(id: string, dto: UpdateSkillDto) {
    await this.ensureExists(id);
    return this.prisma.skill.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.ensureExists(id);
    await this.prisma.skill.delete({ where: { id } });
    return { success: true };
  }

  async reorder(items: ReorderSkillDto[]) {
    await this.prisma.$transaction(
      items.map((item) =>
        this.prisma.skill.update({
          where: { id: item.id },
          data: { order: item.order },
        }),
      ),
    );
    return this.findAll();
  }

  private async ensureExists(id: string) {
    const skill = await this.prisma.skill.findUnique({ where: { id } });
    if (!skill) {
      throw new NotFoundException('Compétence introuvable');
    }
    return skill;
  }
}
