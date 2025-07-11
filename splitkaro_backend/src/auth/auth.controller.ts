import { Body, Controller, HttpCode, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';

import { AuthJwtPayload } from './type/auth.payload';
import { CreateAuthDto } from './dto/auth.dto';
import { RefreshJwtAuthGuard } from './guard/refresh-auth';
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard('local'))
    @Post('login')
    login(@Body() { email, password }, @Res({ passthrough: true }) res: Response) {
        return this.authService.login(email, res);
    }


    @UseGuards(RefreshJwtAuthGuard)
    @Post('refresh')
    refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
        return this.authService.refreshAccessTokenFromGuard(req.user as AuthJwtPayload, res);
    }

    @Post('logout')
    logout(@Res({ passthrough: true }) res: Response) {
        res.clearCookie('access_token', {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            path: '/',
        });

        res.clearCookie('refresh_token', {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            path: '/',
        });

        return { "msg": "Loged out succesfully" }
    }

    @Post('signup')
    async singup (@Body() dto:CreateAuthDto){
        console.log(dto);
        return this.authService.SignUpUser(dto)
    }



}