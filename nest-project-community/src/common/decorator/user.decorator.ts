import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// custom decorator
export const CurrentUser = createParamDecorator(
  (data, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
