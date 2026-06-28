import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('vehicles')
export class Vehicle {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  brand: string;

  @Column()
  model: string;

  @Column()
  year: number;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column({ 
    type: 'enum', 
    enum: ['Gasoline', 'Diesel', 'Hybrid', 'Electric'],
    default: 'Gasoline'
  })
  fuelType: string;

  @Column({
    type: 'enum',
    enum: ['Available', 'Reserved', 'Sold'],
    default: 'Available'
  })
  status: string;

  @Column({
    type: 'enum',
    enum: ['New', 'Used'],
    default: 'New'
  })
  category: string;

  @CreateDateColumn()
  createdAt: Date;
}