import { Module } from '@nestjs/common';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from './report.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Report])], // Here we will add our actual entity of reports.
  controllers: [ReportsController],
  providers: [ReportsService]
})
export class ReportsModule {}
