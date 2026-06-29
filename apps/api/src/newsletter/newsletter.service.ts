import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscriber } from './entities/subscriber.entity';

@Injectable()
export class NewsletterService {
  constructor(
    @InjectRepository(Subscriber)
    private subscriberRepo: Repository<Subscriber>
  ) {}

  async subscribe(email: string, name?: string) {
    const existing = await this.subscriberRepo.findOne({ where: { email } });
    if (existing) throw new ConflictException('Email bereits registriert');

    const subscriber = this.subscriberRepo.create({ email, name });
    return this.subscriberRepo.save(subscriber);
  }

  findAll() {
    return this.subscriberRepo.find();
  }
}