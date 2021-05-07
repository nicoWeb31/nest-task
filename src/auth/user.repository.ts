import {
    ConflictException,
    InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { User } from './entity/user.entity';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async signup(credential: AuthCredentialDto): Promise<void> {
        const { username, password } = credential;

        const user = new User();
        user.salt = await bcrypt.genSalt();
        user.username = username;
        user.password = await this.hashPass(password, user.salt);

        try {
            await user.save();
        } catch (err) {
            if (err.code === '23505') {
                //duplicade username
                throw new ConflictException('username already exists');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }

    private async hashPass(password: string, salt: string): Promise<string> {
        return await bcrypt.hash(password, salt);
    }

    async validateUserPassword(credential: AuthCredentialDto): Promise<string> {
        const { username, password } = credential;
        const user = await this.findOne({ username });

        if(user && await user.validateUserPassword(password)) {
            return user.username
        }else{
            return null;
        }


    }
}
