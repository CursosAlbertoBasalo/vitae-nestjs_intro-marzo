import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilsService {
  private readonly STRING_BASE = 36;
  createGUID(): string {
    const timeStamp = Date.now();
    const head = timeStamp.toString(this.STRING_BASE);
    const random = Math.random();
    const decimalPosition = 2;
    const tail = random.toString(this.STRING_BASE).substring(decimalPosition);
    return head + tail;
  }
}
