import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {   //Strategy come from parent class     passport-local
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',  
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string) {
 
    return this.authService.validateUser({ email , password });
  }
}