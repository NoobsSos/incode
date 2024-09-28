import { Module } from '@nestjs/common';
import { TaskController } from './controller/task/task.controller';
import { TaskService } from './service/task.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Task, TaskSchema } from './schemas/task.schema';
import { Table, TableSchema } from './schemas/table.schema';
import { TableController } from './controller/table/table.controller';
import { TableService } from './service/table.service';

@Module({
  imports: [MongooseModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      uri: configService.get<string>('DATABASE_URL'),
    }),
    inject: [ConfigService],
  }),
  MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
  MongooseModule.forFeature([{ name: Table.name, schema: TableSchema }]),
  ConfigModule.forRoot({ 
    envFilePath: '.dev.env',
    isGlobal: true 
  })],
  controllers: [TaskController, TableController],
  providers: [TaskService, TableService],
})
export class AppModule {}
