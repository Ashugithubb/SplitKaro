import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { Request } from 'express';
import { HasingService } from 'src/hasing/hasing.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthJwtPayload } from './type/auth.payload';
import { CreateAuthDto } from './dto/auth.dto';
import refreshJwtConfig from './config/refresh-jwt.config';
import { Auth } from './entities/auth.entity';
import { UsersService } from 'src/users/users.service';


@Injectable()
export class AuthService {
    constructor(private userService: UsersService,
        private hasingService: HasingService,
        private jwtService: JwtService,
        @Inject(refreshJwtConfig.KEY) private refreshTokenConfig: ConfigType<typeof refreshJwtConfig>,
        private configService: ConfigService,
        @InjectRepository(Auth) private readonly signuprepo: Repository<Auth>
    ) { }
    async validateUser({ email, password }: { email: string, password: string }) {
        
        const user = await this.signuprepo.findOneBy({ email });
        if (!user) throw new UnauthorizedException("User email not found");
        const matched = this.hasingService.compare(password, user.password );
        if (!matched) throw new UnauthorizedException("Invalid password");

        const payload = { sub: user.email };

        return { email: user.email }
    }

    async login(email: string, res: Response) {
        const payload = { sub: email };
        const token = this.jwtService.sign(payload)
        const refreshtoken = this.jwtService.sign(payload, this.refreshTokenConfig)

        res.cookie('access_token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 60 * 1000,
        });

        res.cookie('refresh_token', refreshtoken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 15 * 60 * 1000,
        });

        return {
            "msg": "Loged In Successfully"
        }
    }



    async refreshAccessTokenFromGuard(user: AuthJwtPayload, res: Response) {
        const email = user.sub;

        const newAccessToken = this.jwtService.sign({ sub: email });

        res.cookie('access_token', newAccessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 15 * 60 * 1000,
        });

        return { message: 'Access token refreshed' };
    }

    async SignUpUser(dto: CreateAuthDto) {
        dto.password = await this.hasingService.hashPassword(dto.password);
        await this.signuprepo.save(dto);
        return {"msg": "Signed up SuccessFully" }
    }



}