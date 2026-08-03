// One-off script to pad out the demo inventory with a larger set of plausible
// but entirely fictional vehicles, POSTed to the live /vehicles endpoint.
// Not real listings from any dealer or marketplace - brand/model/year/price
// combinations are generated, not scraped, to avoid the legal/ethical issues
// of republishing a third party's actual inventory as our own.
//
// Already run once on 2026-08-02 against the production backend, adding 120
// vehicles (136 total). Re-running adds MORE on top rather than replacing -
// there's no dedupe - so don't run it again without a reason.
//
// POST /vehicles now requires an admin JWT (see auth/admin.guard.ts) - pass
// one via ADMIN_TOKEN, e.g. copy the token out of localStorage after logging
// in as an admin in the browser.
//
// Usage: node scripts/seed-vehicles.mjs [count]
//   API_URL=http://localhost:3000 ADMIN_TOKEN=eyJ... node scripts/seed-vehicles.mjs 50

const API_URL = process.env.API_URL || 'http://3.77.123.218:3000'
const ADMIN_TOKEN = process.env.ADMIN_TOKEN
const COUNT = Number(process.argv[2]) || 120

if (!ADMIN_TOKEN) {
  console.error('Missing ADMIN_TOKEN env var - POST /vehicles requires an admin JWT now.')
  process.exit(1)
}

// tier drives the price band; ev models are always Electric.
const MODELS = [
  { brand: 'BMW', model: '1er', tier: 'compact' },
  { brand: 'BMW', model: '2er', tier: 'compact' },
  { brand: 'BMW', model: '3er', tier: 'mid' },
  { brand: 'BMW', model: '4er', tier: 'mid' },
  { brand: 'BMW', model: '5er', tier: 'large' },
  { brand: 'BMW', model: '7er', tier: 'lux' },
  { brand: 'BMW', model: 'X1', tier: 'mid' },
  { brand: 'BMW', model: 'X3', tier: 'large' },
  { brand: 'BMW', model: 'X5', tier: 'lux' },
  { brand: 'BMW', model: 'X6', tier: 'lux' },
  { brand: 'BMW', model: 'i4', tier: 'large', ev: true },
  { brand: 'BMW', model: 'iX', tier: 'lux', ev: true },
  { brand: 'Mercedes', model: 'A-Klasse', tier: 'compact' },
  { brand: 'Mercedes', model: 'C-Klasse', tier: 'mid' },
  { brand: 'Mercedes', model: 'E-Klasse', tier: 'large' },
  { brand: 'Mercedes', model: 'S-Klasse', tier: 'lux' },
  { brand: 'Mercedes', model: 'CLA', tier: 'mid' },
  { brand: 'Mercedes', model: 'GLA', tier: 'mid' },
  { brand: 'Mercedes', model: 'GLC', tier: 'large' },
  { brand: 'Mercedes', model: 'GLE', tier: 'lux' },
  { brand: 'Mercedes', model: 'EQA', tier: 'mid', ev: true },
  { brand: 'Mercedes', model: 'EQC', tier: 'large', ev: true },
  { brand: 'Audi', model: 'A1', tier: 'compact' },
  { brand: 'Audi', model: 'A3', tier: 'compact' },
  { brand: 'Audi', model: 'A4', tier: 'mid' },
  { brand: 'Audi', model: 'A6', tier: 'large' },
  { brand: 'Audi', model: 'A8', tier: 'lux' },
  { brand: 'Audi', model: 'Q2', tier: 'compact' },
  { brand: 'Audi', model: 'Q3', tier: 'mid' },
  { brand: 'Audi', model: 'Q5', tier: 'large' },
  { brand: 'Audi', model: 'Q7', tier: 'lux' },
  { brand: 'Audi', model: 'e-tron', tier: 'lux', ev: true },
  { brand: 'Volkswagen', model: 'Polo', tier: 'compact' },
  { brand: 'Volkswagen', model: 'Golf', tier: 'compact' },
  { brand: 'Volkswagen', model: 'Passat', tier: 'mid' },
  { brand: 'Volkswagen', model: 'Tiguan', tier: 'mid' },
  { brand: 'Volkswagen', model: 'Touareg', tier: 'large' },
  { brand: 'Volkswagen', model: 'T-Roc', tier: 'compact' },
  { brand: 'Volkswagen', model: 'Arteon', tier: 'large' },
  { brand: 'Volkswagen', model: 'ID.3', tier: 'mid', ev: true },
  { brand: 'Volkswagen', model: 'ID.4', tier: 'large', ev: true },
]

const PRICE_BANDS = {
  compact: [12000, 28000],
  mid: [20000, 42000],
  large: [32000, 65000],
  lux: [58000, 120000],
}

const NON_EV_FUEL_TYPES = ['Gasoline', 'Diesel', 'Hybrid']

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function buildVehicle() {
  const spec = pick(MODELS)
  const year = randInt(2016, 2026)
  const [lo, hi] = PRICE_BANDS[spec.tier]
  // Newer years skew toward the top of the band, older toward the bottom.
  const ageFactor = (year - 2016) / (2026 - 2016)
  const bandWidth = hi - lo
  const price = Math.round((lo + bandWidth * (0.3 + 0.6 * ageFactor + Math.random() * 0.2)) / 50) * 50

  return {
    brand: spec.brand,
    model: spec.model,
    year,
    price,
    fuelType: spec.ev ? 'Electric' : pick(NON_EV_FUEL_TYPES),
    category: year >= 2025 && Math.random() < 0.6 ? 'New' : 'Used',
    status: Math.random() < 0.85 ? 'Available' : 'Reserved',
  }
}

async function main() {
  console.log(`Seeding ${COUNT} vehicles against ${API_URL} ...`)
  let ok = 0
  for (let i = 0; i < COUNT; i++) {
    const vehicle = buildVehicle()
    const res = await fetch(`${API_URL}/vehicles`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${ADMIN_TOKEN}` },
      body: JSON.stringify(vehicle),
    })
    if (res.ok) {
      ok++
    } else {
      console.error(`Failed (${res.status}):`, vehicle, await res.text())
    }
  }
  console.log(`Done: ${ok}/${COUNT} vehicles created.`)
}

main()
