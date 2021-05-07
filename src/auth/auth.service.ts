import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private readonly userRepository: UserRepository,
    ) {}

    async signup(credential: AuthCredentialDto):Promise<void> {
        return this.userRepository.signup(credential);
    }

    async signIn(credential: AuthCredentialDto): Promise<string | void> {
        const username = await this.userRepository.validateUserPassword(credential);
        if(!username) {
            throw new UnauthorizedException('Invalid credential')
        }
    }


}
