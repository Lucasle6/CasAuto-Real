import { Footer } from '../components/Footer'
import { Navbar } from '../components/Navbar'
import { useVehicleCount } from '../hooks/useVehicleCount'

export function Unternehmen() {
  const vehicleCount = useVehicleCount()

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="max-w-4xl mx-auto px-8 py-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Über uns</h2>
        <p className="text-red-800 text-lg mb-12">Ihr Partner für hochwertige Fahrzeuge seit 2000</p>

        <div className="space-y-8 text-gray-600 leading-relaxed">
          <p>CasAuto wurde im Jahr 2000 in Berlin gegründet – mit dem Ziel, den Autokauf einfacher und transparenter zu machen. Aus einem einzelnen Standort ist über die Jahre einer der größeren unabhängigen Fahrzeughändler im Berliner Raum geworden, mit Standorten in Berlin, Schönefeld und Ludwigsfelde.</p>
          <p>Unser Bestand umfasst Neu- und Gebrauchtwagen aller führenden Hersteller – von BMW über Mercedes-Benz bis Audi und Volkswagen. Jedes Fahrzeug wird vor dem Verkauf technisch geprüft, damit Sie sich auf das verlassen können, was Sie sehen.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8">
            <div className="text-center">
              <p className="text-5xl font-bold text-red-800 mb-2">{vehicleCount === null ? '…' : vehicleCount}</p>
              <p className="text-gray-500 text-sm uppercase tracking-wider">Fahrzeuge im Bestand</p>
            </div>
            <div className="text-center">
              <p className="text-5xl font-bold text-red-800 mb-2">24+</p>
              <p className="text-gray-500 text-sm uppercase tracking-wider">Jahre Erfahrung</p>
            </div>
            <div className="text-center">
              <p className="text-5xl font-bold text-red-800 mb-2">6x</p>
              <p className="text-gray-500 text-sm uppercase tracking-wider">AutoBild Award</p>
            </div>
          </div>

          <p>Am wichtigsten ist uns dabei die persönliche Beratung: Unser Verkaufsteam nimmt sich Zeit, Ihre Anforderungen zu verstehen, statt Ihnen einfach das nächstbeste Fahrzeug vom Hof zu verkaufen. Mit einer sorgfältig kuratierten Fahrzeugauswahl, mehr als 24 Jahren Erfahrung und sechsfacher Auszeichnung als AutoBild Top-Händler stehen wir für Kontinuität und Vertrauen in einer Branche, in der beides nicht selbstverständlich ist.</p>
        </div>
      </main>

      <Footer />

    </div>
  )
}