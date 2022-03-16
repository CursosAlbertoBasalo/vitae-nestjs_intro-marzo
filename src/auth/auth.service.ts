import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  createToken() {
    return 'token';
  }
}
