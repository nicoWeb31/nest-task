import { Req, UseGuards } from '@nestjs/common';
import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credential.dto';

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

    @Post('/test')
    @UseGuards(AuthGuard())
    test(@Req() req) {
        console.log(req);
    }
}
