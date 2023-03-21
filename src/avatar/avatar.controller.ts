import { Controller, Get, Inject, OnModuleInit, Param } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ClientGrpc } from '@nestjs/microservices';
import { AvatarServiceClient, AVATAR_SERVICE_NAME, AVATAR_PACKAGE_NAME} from './avatar';

@Controller('avatar')
export class AvatarController implements OnModuleInit {

  private service: AvatarServiceClient;

  constructor(@Inject(AVATAR_PACKAGE_NAME) private client: ClientGrpc) {}

  onModuleInit() {
    this.service = this.client.getService<AvatarServiceClient>(AVATAR_SERVICE_NAME);
  }

  @Get(':id')
  findHero(@Param('id') id: number): Observable<any> {
    return this.service.getBird({ id });
  }
}
