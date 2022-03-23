import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthMongoService } from './auth-mongo.service';

@Injectable()
export class JwtStrategyService extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthMongoService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: 'secret',
    });
  }

  async validate(payload: any) {
    const userId = payload.sub;
    const user = await this.authService.findById(userId);
    // appended to req.user property
    return user;
    // return { userId: payload.sub };
  }
}
