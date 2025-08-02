import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskModule } from './task/task.module';
import { Task } from './entity/task.entity';
import { config } from './configs/env.config';

@Module({
    imports: [TypeOrmModule.forRoot({
    type: config.type_db,
    host: config.host_db,
    port: config.port_db,
    username: config.username_db,
    password: config.password_db,
    database: config.name_db,
    synchronize: true,
    entities: [Task],
  }), TaskModule],
    controllers: [],
    providers: [],
})
  
export class AppModule {}
