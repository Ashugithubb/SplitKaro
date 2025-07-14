import { ConflictException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
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
import { Gender } from 'src/users/entities/user.entity';


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
        const matched = await this.hasingService.compare(password, user.password);
        if (!matched) throw new UnauthorizedException("Invalid password");
        return { email: user.email,id:user.id}
    }

    async login(payload:AuthJwtPayload, res: Response) {
        const token = this.jwtService.sign(payload)
        // const refreshtoken = this.jwtService.sign(payload, this.refreshTokenConfig)

        res.cookie('access_token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 2*60 * 1000,
        });

        // res.cookie('refresh_token', refreshtoken, {
        //     httpOnly: true,
        //     secure: true,
        //     sameSite: 'strict',
        //     maxAge: 15 * 60 * 1000,
        // });

        return {
            "msg": "Loged In Successfully"
        }
    }



    // async refreshAccessTokenFromGuard(user: AuthJwtPayload, res: Response) {
    //     const email = user.email;

    //     const newAccessToken = this.jwtService.sign({ sub: email });

    //     res.cookie('access_token', newAccessToken, {
    //         httpOnly: true,
    //         secure: true,
    //         sameSite: 'strict',
    //         maxAge: 15 * 60 * 1000,
    //     });

    //     return { message: 'Access token refreshed' };
    // }

    async SignUpUser(dto: CreateAuthDto) {
    const email=dto.email
    const existing = await this.signuprepo.findOne({ where: {email} });
    if (existing) throw new ConflictException('Email already in use');
        dto.password = await this.hasingService.hashPassword(dto.password);
        const savedUser = await this.userService.create({
            first_name: '',
            last_name: '',
            email:email,
            age: 0,
            gender: Gender.MALE,
            mob: '',
            avatar: '',
            bio: '',
        });
        await this.signuprepo.save({
            email: dto.email,
            password: dto.password,
            user: savedUser,
        });

        return { msg: "Signed up Successfully" };
    }



}