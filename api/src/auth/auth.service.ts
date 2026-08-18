import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { JwtPayload } from './auth.types';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email.toLowerCase() },
    });

    if (!user) {
      throw new UnauthorizedException('Identifiants invalides');
    }

    const valid = await bcrypt.compare(dto.password, user.passwordHash);
    if (!valid) {
      throw new UnauthorizedException('Identifiants invalides');
    }

    const tokens = await this.issueTokens(user.id, user.email);
    return { user: { id: user.id, email: user.email }, ...tokens };
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token manquant');
    }

    let payload: JwtPayload;
    try {
      payload = this.jwtService.verify<JwtPayload>(refreshToken, {
        secret: this.config.get<string>('JWT_REFRESH_SECRET'),
      });
    } catch {
      throw new UnauthorizedException('Refresh token invalide');
    }

    const tokenHash = this.hashToken(refreshToken);
    const stored = await this.prisma.refreshToken.findFirst({
      where: {
        userId: payload.sub,
        tokenHash,
        expiresAt: { gt: new Date() },
      },
    });

    if (!stored) {
      throw new UnauthorizedException('Refresh token révoqué ou expiré');
    }

    await this.prisma.refreshToken.delete({ where: { id: stored.id } });

    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
    });
    if (!user) {
      throw new UnauthorizedException('Utilisateur introuvable');
    }

    return this.issueTokens(user.id, user.email);
  }

  async logout(refreshToken?: string) {
    if (refreshToken) {
      const tokenHash = this.hashToken(refreshToken);
      await this.prisma.refreshToken.deleteMany({ where: { tokenHash } });
    }
    return { success: true };
  }

  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, createdAt: true },
    });
    if (!user) {
      throw new UnauthorizedException('Utilisateur introuvable');
    }
    return user;
  }

  private async issueTokens(userId: string, email: string) {
    const payload: JwtPayload = { sub: userId, email };

    const accessToken = this.jwtService.sign(payload, {
      secret: this.config.get<string>('JWT_ACCESS_SECRET'),
      expiresIn: (this.config.get<string>('JWT_ACCESS_EXPIRES') ?? '15m') as `${number}${'s' | 'm' | 'h' | 'd'}`,
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.config.get<string>('JWT_REFRESH_SECRET'),
      expiresIn: (this.config.get<string>('JWT_REFRESH_EXPIRES') ?? '7d') as `${number}${'s' | 'm' | 'h' | 'd'}`,
    });

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await this.prisma.refreshToken.create({
      data: {
        userId,
        tokenHash: this.hashToken(refreshToken),
        expiresAt,
      },
    });

    return { accessToken, refreshToken };
  }

  private hashToken(token: string): string {
    return crypto.createHash('sha256').update(token).digest('hex');
  }
}
