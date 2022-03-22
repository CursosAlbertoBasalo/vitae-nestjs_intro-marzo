import { Body, Controller, Get, Post, Req, UseFilters, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UnauthorizedErrorFilter } from 'src/core/filters/unauthorized-error.filter';
import { AuthMongoService } from './auth-mongo.service';
// import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegistrationDto } from './dto/registration.dto';
import { GetUser } from './user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthMongoService) {}
  @Get()
  @UseGuards(AuthGuard('jwt'))
  getToken(@Req() req) {
    return 'Todo va a salir bien' + JSON.stringify(req.user);
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  getCurrentUser(@GetUser() user: any) {
    return 'Todo va a salir bien' + JSON.stringify(user);
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
