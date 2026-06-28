export interface Vehicle {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  fuelType: 'Gasoline' | 'Diesel' | 'Hybrid' | 'Electric';
  status: 'Available' | 'Reserved' | 'Sold';
  category: 'New' | 'Used';
}

export interface Appointment {
  vehicleId: string
  customerName: string
  customerEmail: string
  customerPhone: string
  date: string
  type: 'test_drive' | 'service' | 'consultation'
  notes?: string
}