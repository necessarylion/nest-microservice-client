import {
  Controller,
  Get,
  Inject,
  OnModuleInit,
  Param,
  Post,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { ClientGrpc } from '@nestjs/microservices';
import {
  HeroServiceClient,
  HERO_SERVICE_NAME,
  HERO_PACKAGE_NAME,
} from './hero';
import { Request, RequestInterface } from 'src/utils/request';

interface Payload {
  id: number;
}

@Controller('hero')
export class HeroController implements OnModuleInit {
  private service: HeroServiceClient;

  constructor(@Inject(HERO_PACKAGE_NAME) private client: ClientGrpc) {}

  onModuleInit() {
    this.service = this.client.getService<HeroServiceClient>(HERO_SERVICE_NAME);
  }

  @Get(':id')
  getBird(@Param('id') id: number): Observable<any> {
    return this.service.findHero({ id });
  }

  @Post()
  showHome(@Request() request: RequestInterface & Payload) {
    return this.service.findHero({ id: request.id });
  }
}
