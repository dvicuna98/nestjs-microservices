import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BuildingsService } from './buildings.service';
import { BuildingsController } from './buildings.controller';
import {Building} from "./entities/building.entity";
import { ClientsModule, Transport } from '@nestjs/microservices';
import { WORKFLOWS_SERVICE } from '../constants';

@Module({
  imports: [
      TypeOrmModule.forFeature([Building]),
      ClientsModule.register([
        {
          name: WORKFLOWS_SERVICE,
          transport: Transport.NATS,
          options: {
            servers: process.env.NATS_URL,
          },
        },
      ]),
  ],
  controllers: [BuildingsController],
  providers: [BuildingsService],
})
export class BuildingsModule {}
