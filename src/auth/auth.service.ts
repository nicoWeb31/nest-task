import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { JwtPayload } from './jwt-payload.interface';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private  userRepository: UserRepository,
        private  jwtServ: JwtService,
    ) {}

    async signup(credential: AuthCredentialDto):Promise<void> {
        return this.userRepository.signup(credential);
    }

    async signIn(credential: AuthCredentialDto): Promise<{accessToken : string}> {
        const username = await this.userRepository.validateUserPassword(credential);
        if(!username) {
            throw new UnauthorizedException('Invalid credential')
        }

        //token
        const payload : JwtPayload = { username };
        const accessToken = this.jwtServ.sign(payload);
        return {accessToken};
    }


}
