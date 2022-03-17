import { Body, Controller, Get, Post, UseFilters } from '@nestjs/common';
import { UnauthorizedErrorFilter } from 'src/core/filters/unauthorized-error.filter';
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
  @UseFilters(UnauthorizedErrorFilter)
  postLogin(@Body() login: LoginDto) {
    return this.authService.login(login);
  }
}
