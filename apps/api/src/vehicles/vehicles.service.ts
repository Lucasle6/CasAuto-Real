import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehicle } from './entities/vehicle.entity';

interface Filters {
  brand?: string;
  category?: string;
  fuelType?: string;
  status?: string;
  minPrice?: string;
  maxPrice?: string;
  minYear?: string;
  maxYear?: string;
}

@Injectable()
export class VehiclesService {
  constructor(
    @InjectRepository(Vehicle)
    private vehicleRepo: Repository<Vehicle>
  ) {}

findAll(filters: Filters) {
  const qb = this.vehicleRepo.createQueryBuilder('v');

  if (filters.brand) qb.andWhere('v.brand = :brand', { brand: filters.brand });
  if (filters.category) qb.andWhere('v.category = :category', { category: filters.category });
  if (filters.fuelType) qb.andWhere('v.fuelType = :fuelType', { fuelType: filters.fuelType });
  if (filters.status) qb.andWhere('v.status = :status', { status: filters.status });
  if (filters.minPrice) qb.andWhere('v.price >= :min', { min: Number(filters.minPrice) });
  if (filters.maxPrice) qb.andWhere('v.price <= :max', { max: Number(filters.maxPrice) });
  if (filters.minYear) qb.andWhere('v.year >= :minYear', { minYear: Number(filters.minYear) });
  if (filters.maxYear) qb.andWhere('v.year <= :maxYear', { maxYear: Number(filters.maxYear) });

  return qb.getMany();
}
  findOne(id: string) {
    return this.vehicleRepo.findOne({ where: { id } });
  }

  create(data: Partial<Vehicle>) {
    const vehicle = this.vehicleRepo.create(data);
    return this.vehicleRepo.save(vehicle);
  }

  async update(id: string, data: Partial<Vehicle>) {
    await this.vehicleRepo.update(id, data);
    return this.vehicleRepo.findOne({ where: { id } });
  }

  remove(id: string) {
    return this.vehicleRepo.delete(id);
  }
}