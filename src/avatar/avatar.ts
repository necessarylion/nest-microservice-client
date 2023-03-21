/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "avatar";

export interface BirdById {
  id: number;
}

export interface Bird {
  id: number;
  name: string;
}

export const AVATAR_PACKAGE_NAME = "avatar";

export interface AvatarServiceClient {
  getBird(request: BirdById): Observable<Bird>;
}

export interface AvatarServiceController {
  getBird(request: BirdById): Promise<Bird> | Observable<Bird> | Bird;
}

export function AvatarServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["getBird"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("AvatarService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("AvatarService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const AVATAR_SERVICE_NAME = "AvatarService";
