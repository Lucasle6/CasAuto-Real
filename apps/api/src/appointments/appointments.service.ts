import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from './entities/appointment.entity';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentRepo: Repository<Appointment>
  ) {}

  findAll() {
    return this.appointmentRepo.find();
  }

  create(data: Partial<Appointment>) {
    const appointment = this.appointmentRepo.create(data);
    return this.appointmentRepo.save(appointment);
  }
}