import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { JwtPayload } from './auth.types';

const cookieExtractor = (req: Request): string | null => {
  if (req?.cookies?.access_token) {
    return req.cookies.access_token as string;
  }
  return null;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        cookieExtractor,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: config.get<string>('JWT_ACCESS_SECRET') ?? 'fallback-secret',
    });
  }

  validate(payload: JwtPayload): JwtPayload {
    return { sub: payload.sub, email: payload.email };
  }
}
