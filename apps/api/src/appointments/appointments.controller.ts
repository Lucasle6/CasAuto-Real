import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AdminGuard } from '../auth/admin.guard';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Get()
  @UseGuards(AdminGuard)
  findAll() {
    return this.appointmentsService.findAll();
  }

  @Post()
  create(@Body() body: any) {
    return this.appointmentsService.create(body);
  }
}