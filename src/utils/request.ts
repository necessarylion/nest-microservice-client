import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Request = createParamDecorator(
  (data: any, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const { body, query, headers } = request;
    const requestData = { ...query, ...body };
    return {
      ...requestData,
      headers : () => {
        headers
      },
      all: () => {
        return requestData;
      },
    };
  },
);


export class RequestInterface {
    headers: () => object;
    all: () => object;
}