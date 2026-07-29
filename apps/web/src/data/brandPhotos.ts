// Representative photos per brand (CC0 / public domain, Wikimedia Commons -
// same host as the old brand-logo images, so no new domain to allow).
// Falls back to nothing (see onError handlers) if a brand isn't listed here.
export const BRAND_PHOTOS: Record<string, string> = {
  BMW: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/White_BMW_car_seen_from_front.jpg/500px-White_BMW_car_seen_from_front.jpg',
  Mercedes: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Mercedes-Benz_C350_AVANTGARDE_(W204)_front.JPG/500px-Mercedes-Benz_C350_AVANTGARDE_(W204)_front.JPG',
  Audi: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Audi_A6_hybrid_(C7)_front.JPG/500px-Audi_A6_hybrid_(C7)_front.JPG',
  Volkswagen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Volkswagen_Golf_VII_GTI_front.JPG/500px-Volkswagen_Golf_VII_GTI_front.JPG',
}
