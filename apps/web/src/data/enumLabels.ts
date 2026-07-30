// The backend's enum columns (vehicles.fuelType/status/category,
// appointments.type/status - see apps/api/src/*/entities/*.entity.ts) are
// English, and that's also what's sent/received over the API - these maps
// are display-only translations, used wherever a raw enum value would
// otherwise be shown to the user. Falls back to the raw value itself if
// something new shows up on the backend that isn't listed here yet,
// rather than showing nothing.

export const FUEL_TYPE_LABELS: Record<string, string> = {
  Gasoline: 'Benzin',
  Diesel: 'Diesel',
  Hybrid: 'Hybrid',
  Electric: 'Elektro',
}

export const VEHICLE_STATUS_LABELS: Record<string, string> = {
  Available: 'Verfügbar',
  Reserved: 'Reserviert',
  Sold: 'Verkauft',
}

export const CATEGORY_LABELS: Record<string, string> = {
  New: 'Neu',
  Used: 'Gebraucht',
}

// Appointments have their own "status" enum (pending/confirmed/cancelled),
// distinct from a vehicle's status (Available/Reserved/Sold) - kept as a
// separate map rather than merged into VEHICLE_STATUS_LABELS so the two
// unrelated meanings of "status" can't be mixed up.
export const APPOINTMENT_STATUS_LABELS: Record<string, string> = {
  pending: 'Ausstehend',
  confirmed: 'Bestätigt',
  cancelled: 'Storniert',
}

export const APPOINTMENT_TYPE_LABELS: Record<string, string> = {
  test_drive: 'Probefahrt',
  service: 'Service',
  consultation: 'Beratung',
}

export function fuelTypeLabel(value: string): string {
  return FUEL_TYPE_LABELS[value] ?? value
}

export function vehicleStatusLabel(value: string): string {
  return VEHICLE_STATUS_LABELS[value] ?? value
}

export function categoryLabel(value: string): string {
  return CATEGORY_LABELS[value] ?? value
}

export function appointmentStatusLabel(value: string): string {
  return APPOINTMENT_STATUS_LABELS[value] ?? value
}

export function appointmentTypeLabel(value: string): string {
  return APPOINTMENT_TYPE_LABELS[value] ?? value
}
