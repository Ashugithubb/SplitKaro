import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { AuthJwtPayload } from '../type/auth.payload';


@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(Strategy, 'refresh-jwt') {
  constructor() {
    super({
      jwtFromRequest: (req: Request) => {
        if (!req.cookies || !req.cookies['refresh_token']) {
          throw new UnauthorizedException('Refresh token not found in cookies');
        }
        return req.cookies['refresh_token'];
      },
      secretOrKey: process.env.REFRESH_JWT_SECRET ?? '',
      ignoreExpiration: false,
    });
  }

  validate(payload: AuthJwtPayload) {
    return payload; 
  }
}