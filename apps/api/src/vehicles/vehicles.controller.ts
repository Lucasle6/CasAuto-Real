import { Controller, Get, Post, Patch, Delete, Body, Query, Param, UseGuards } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { AdminGuard } from '../auth/admin.guard';

@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

@Get()
  findAll(
    @Query('brand') brand?: string,
    @Query('category') category?: string,
    @Query('fuelType') fuelType?: string,
    @Query('status') status?: string,
    @Query('minPrice') minPrice?: string,
    @Query('maxPrice') maxPrice?: string,
    @Query('minYear') minYear?: string,
    @Query('maxYear') maxYear?: string,
  ) {
    return this.vehiclesService.findAll({ brand, category, fuelType, status, minPrice, maxPrice, minYear, maxYear });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vehiclesService.findOne(id);
  }

  @Post()
  @UseGuards(AdminGuard)
  create(@Body() body: any) {
    return this.vehiclesService.create(body);
  }

  @Patch(':id')
  @UseGuards(AdminGuard)
  update(@Param('id') id: string, @Body() body: any) {
    return this.vehiclesService.update(id, body);
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  remove(@Param('id') id: string) {
    return this.vehiclesService.remove(id);
  }
}