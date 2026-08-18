import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/contact.dto';
import { MarkReadDto } from './dto/mark-read.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('contact')
@Controller()
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post('contact')
  @Throttle({ default: { limit: 3, ttl: 60000 } })
  @ApiOperation({ summary: 'Envoyer un message de contact (public)' })
  create(@Body() dto: CreateContactDto) {
    return this.contactService.create(dto);
  }

  @Get('messages')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Liste des messages (admin)' })
  findAll(@Query('archived') archived?: string) {
    return this.contactService.findAll(archived === 'true');
  }

  @Patch('messages/:id/read')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Marquer un message lu/non lu (admin)' })
  markRead(@Param('id') id: string, @Body() dto: MarkReadDto) {
    return this.contactService.markRead(id, dto.isRead);
  }

  @Patch('messages/:id/archive')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Archiver un message (admin)' })
  archive(@Param('id') id: string) {
    return this.contactService.archive(id);
  }
}
