import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
@Injectable()
export class HasingService {
    async hashPassword(pass: string) {
        const saltOrRounds = 10;

        const hash = await bcrypt.hash(pass, saltOrRounds);
        console.log(hash)
        return hash;
    }
    
    async compare(password: string, hash: string) {

        const isMatch = await bcrypt.compare(password, hash);

        return isMatch ? true : false;

    }

}
