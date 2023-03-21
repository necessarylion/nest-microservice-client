import { basename } from 'path';
import { ClientsModule, ClientsModuleOptions, Transport } from '@nestjs/microservices';
import { globSync } from 'glob';

export function getGrpcModules() {
  const protoPath  = globSync(__dirname + '/**/*.proto')
  const modules = protoPath.map((file) => {
    const name = basename(file, '.proto')
    return {
      name,
      transport: Transport.GRPC,
      options: {
        package: name,
        protoPath: file,
      },
    }
  }) as ClientsModuleOptions
  return ClientsModule.register(modules);
}

