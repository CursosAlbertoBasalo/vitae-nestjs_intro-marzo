import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator(getUser);

function getUser(data: unknown, ctx: ExecutionContext) {
  return ctx.switchToHttp().getRequest().user;
}
