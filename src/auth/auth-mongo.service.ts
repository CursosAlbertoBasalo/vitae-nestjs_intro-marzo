import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UtilsService } from 'src/utils/utils.service';
import { CredentialsDto } from './dto/credentials.dto';
import { LoginDto } from './dto/login.dto';
import { RegistrationDto } from './dto/registration.dto';
import { User } from './entities/user.entity';

@Injectable()
export class AuthMongoService {
  private readonly logger = new Logger('Auth');
  constructor(
    private readonly jwtService: JwtService,
    private readonly utilsService: UtilsService,
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async register(registration: RegistrationDto): Promise<CredentialsDto> {
    this.logger.debug('👶 Creating from...:' + JSON.stringify(registration));
    const user = await this.userModel.create({
      ...registration,
      id: this.utilsService.createGUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    // To do: use argon2 to hash the password
    this.logger.debug('🧔 Saving...:' + JSON.stringify(user));
    await user.save();
    this.logger.debug('👴 Saved:' + JSON.stringify(user));
    return this.buildCredentials(user);
  }

  async login(login: LoginDto): Promise<CredentialsDto> {
    const user = await this.userModel.create();
    return undefined;
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
