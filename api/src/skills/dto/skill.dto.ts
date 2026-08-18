import { IsString, IsNotEmpty, IsEnum, IsInt, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { SkillCategory } from '@prisma/client';

export class CreateSkillDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ enum: SkillCategory })
  @IsEnum(SkillCategory)
  category: SkillCategory;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  order?: number;
}

export class UpdateSkillDto extends CreateSkillDto {}

export class ReorderSkillDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsInt()
  order: number;
}
