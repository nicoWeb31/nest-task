import { Req, UseGuards } from '@nestjs/common';
import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credential.dto';
// import { User } from './entity/user.entity';
// import { GetUser } from './get-user.decorator';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/signup')
    signup(@Body(ValidationPipe) credential: AuthCredentialDto): Promise<void> {
        console.log(credential);
        return this.authService.signup(credential);
    }

    @Post('/signin')
    signIn(
        @Body() credential: AuthCredentialDto,
    ): Promise<{ accessToken: string }> {
        return this.authService.signIn(credential);
    }

    // @Post('/test')
    // @UseGuards(AuthGuard())
    // test(@GetUser() user : User){
    //     console.log(user)
    // }
}
