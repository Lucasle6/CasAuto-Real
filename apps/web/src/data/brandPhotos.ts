// Representative photos per brand (CC0 / public domain, Wikimedia Commons -
// same host as the old brand-logo images, so no new domain to allow).
export const BRAND_PHOTOS: Record<string, string> = {
  BMW: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/White_BMW_car_seen_from_front.jpg/500px-White_BMW_car_seen_from_front.jpg',
  Mercedes: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Mercedes-Benz_C350_AVANTGARDE_(W204)_front.JPG/500px-Mercedes-Benz_C350_AVANTGARDE_(W204)_front.JPG',
  Audi: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Audi_A6_hybrid_(C7)_front.JPG/500px-Audi_A6_hybrid_(C7)_front.JPG',
  Volkswagen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Volkswagen_Golf_VII_GTI_front.JPG/500px-Volkswagen_Golf_VII_GTI_front.JPG',
}

// vehicle.brand is a free-text field in the backend (no enum, unlike
// fuelType/status/category) and the admin form is a plain text input - so
// "bmw", " BMW ", or an unlisted brand entirely (e.g. a Porsche someone
// adds later) are all real possibilities, not hypothetical. A raw
// BRAND_PHOTOS[brand] lookup would silently render no image for any of
// those. This normalizes casing/whitespace and falls back to one of the
// known photos instead of leaving an empty box.
const FALLBACK_PHOTO = BRAND_PHOTOS.Audi

export function getVehiclePhoto(brand: string): string {
  const key = Object.keys(BRAND_PHOTOS).find(
    b => b.toLowerCase() === brand.trim().toLowerCase()
  )
  return key ? BRAND_PHOTOS[key] : FALLBACK_PHOTO
}
