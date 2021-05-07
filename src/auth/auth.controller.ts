import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credential.dto';

@Controller('auth')
export class AuthController {


    constructor(
        private authService: AuthService,
    ) {

    }

    @Post('/signup')
    signup(@Body(ValidationPipe) credential: AuthCredentialDto) : Promise<void>{
        console.log(credential);
        return this.authService.signup(credential);
    }
}
