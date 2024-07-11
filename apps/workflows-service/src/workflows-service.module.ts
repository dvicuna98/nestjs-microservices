import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkflowsModule } from './workflows/workflows.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
      TypeOrmModule.forRoot({
        type: 'postgres',
        host: process.env.POSTGRES_HOST,
        port: +process.env.POSTGRES_PORT,
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        autoLoadEntities: true,
        synchronize: true,
      }),
      WorkflowsModule,
      HealthModule
  ],
})
export class WorkflowsServiceModule {}
