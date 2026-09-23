import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateContactDto } from './dto/contact.dto';

@Injectable()
export class ContactService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateContactDto) {
    return this.prisma.message.create({ data: dto });
  }

  async findAll(includeArchived = false) {
    return this.prisma.message.findMany({
      where: includeArchived ? {} : { isArchived: false },
      orderBy: { createdAt: 'desc' },
    });
  }

  async markRead(id: string, isRead: boolean) {
    await this.ensureExists(id);
    return this.prisma.message.update({
      where: { id },
      data: { isRead },
    });
  }

  async archive(id: string) {
    await this.ensureExists(id);
    return this.prisma.message.update({
      where: { id },
      data: { isArchived: true },
    });
  }

  private async ensureExists(id: string) {
    const message = await this.prisma.message.findUnique({ where: { id } });
    if (!message) {
      throw new NotFoundException('Message introuvable');
    }
    return message;
  }
}
