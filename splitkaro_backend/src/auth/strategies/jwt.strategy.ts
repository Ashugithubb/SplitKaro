import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

import { ConfigService } from '@nestjs/config';
import { AuthJwtPayload } from '../type/auth.payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: (req: Request) => {
        if (!req.cookies || !req.cookies['access_token']) {
          throw new UnauthorizedException('Access token not found in cookies');
        }
        return req.cookies['access_token'];
      },
      secretOrKey: configService.get<string>('JWT_SECRET') ?? '',
      ignoreExpiration: false,
    });
  }

  validate(payload: AuthJwtPayload) {
    return payload; 
  }
}