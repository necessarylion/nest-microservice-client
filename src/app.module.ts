import { AvatarMiddleware } from './avatar/avatar.middleware';
import { AvatarController } from './avatar/avatar.controller';
import { HeroController } from './hero/hero.controller';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { getGrpcModules } from './grpc.modules';

@Module({
  imports: [getGrpcModules()],
  controllers: [HeroController, AvatarController],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AvatarMiddleware).forRoutes('avatar');
  }
}
