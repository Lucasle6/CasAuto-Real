import { Footer } from '../components/Footer'
import { Navbar } from '../components/Navbar'

export function Unternehmen() {

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-4xl mx-auto px-8 py-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Über uns</h2>
        <p className="text-red-800 text-lg mb-12">Ihr Partner für hochwertige Fahrzeuge seit 2000</p>

        <div className="space-y-8 text-gray-600 leading-relaxed">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8">
            <div className="text-center">
              <p className="text-5xl font-bold text-red-800 mb-2">1.800+</p>
              <p className="text-gray-500 text-sm uppercase tracking-wider">Fahrzeuge</p>
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

          <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
        </div>
      </main>

      <Footer />

    </div>
  )
}