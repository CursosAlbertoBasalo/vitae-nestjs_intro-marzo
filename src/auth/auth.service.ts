import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UtilsService } from 'src/utils/utils.service';
import { CredentialsDto } from './dto/credentials.dto';
import { LoginDto } from './dto/login.dto';
import { RegistrationDto } from './dto/registration.dto';
import { User } from './entities/user.entity';
@Injectable()
export class AuthService {
  private readonly users: User[] = [];
  private readonly logger = new Logger('Auth');
  constructor(
    private readonly jwtService: JwtService,
    private readonly utilsService: UtilsService,
  ) {}

  register(registration: RegistrationDto): CredentialsDto {
    const user: User = {
      id: this.utilsService.createGUID(),
      ...registration,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    // To do: use argon2 to hash the password
    this.users.push(user);
    this.logger.debug('Added:' + JSON.stringify(user));
    return this.buildCredentials(user);
  }
  login(login: LoginDto) {
    const user: User = this.users.find(
      (u) => u.email === login.email && u.password === login.password,
    );
    if (!user) throw new Error('Invalid credentials');
    return this.buildCredentials(user);
  }
  private buildCredentials(user: User): CredentialsDto {
    const credentials: CredentialsDto = {
      id: user.id,
      name: user.name,
      email: user.email,
      token: this.createToken(user),
    };
    return credentials;
  }
  private createToken(user: User): string {
    const payload = {
      sub: user.id,
    };
    return this.jwtService.sign(payload, { expiresIn: '5m', secret: 'secret' });
  }
}
