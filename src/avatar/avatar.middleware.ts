import { ServerResponse, IncomingMessage } from 'http';
import { HttpException, HttpStatus, ImATeapotException, Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AvatarMiddleware implements NestMiddleware {
  use(req: IncomingMessage, res: ServerResponse, done: () => void) {
    if(req.headers.authorization) {
        throw new ImATeapotException('Invalid token');
    }
    done();
  }
}
