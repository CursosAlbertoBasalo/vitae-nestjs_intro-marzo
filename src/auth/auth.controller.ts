import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegistrationDto } from './dto/registration.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Get()
  getToken() {
    return '';
  }

  @Post('registration')
  postRegistration(@Body() registration: RegistrationDto) {
    return this.authService.register(registration);
  }
  @Post('login')
  postLogin(@Body() login: LoginDto) {
    return this.authService.login(login);
  }
}
