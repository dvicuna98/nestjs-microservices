import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BuildingsService } from './buildings.service';
import { BuildingsController } from './buildings.controller';
import {Building} from "./entities/building.entity";
import { ClientsModule, Transport } from '@nestjs/microservices';
import { WORKFLOWS_SERVICE } from '../constants';
import * as process from "node:process";

@Module({
  imports: [
      TypeOrmModule.forFeature([Building]),
      ClientsModule.register([
        {
          name: WORKFLOWS_SERVICE,
          transport: Transport.RMQ,
          options: {
              urls: [process.env.RABBITMQ_URL],
              queue: 'workflows-service'
          },
        },
      ]),
  ],
  controllers: [BuildingsController],
  providers: [BuildingsService],
})
export class BuildingsModule {}
