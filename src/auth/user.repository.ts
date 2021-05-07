import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { User } from './entity/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async signup(credential: AuthCredentialDto) : Promise<void> {
        const { username, password } = credential;

        const user = new User();
        user.username = username;
        user.password = password;

        try{
            await user.save();
        }catch(err){
            if(err.code === '23505'){ //duplicade username
                throw new ConflictException('username already exists')
            }else{
                throw new InternalServerErrorException();
                
            }
        }

    }
}
