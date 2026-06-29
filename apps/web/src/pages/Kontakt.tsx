import { useState } from 'react'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'

export function Kontakt() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [sent, setSent] = useState(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit() {
    setSent(true)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar/>

      <main className="max-w-4xl mx-auto px-8 py-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Kontakt</h2>
        <p className="text-red-800 text-lg mb-12">Wir freuen uns von Ihnen zu hören</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
            {sent ? (
              <div className="text-center py-8">
                <p className="text-green-700 text-xl font-medium mb-2">Nachricht gesendet</p>
                <p className="text-gray-500 text-sm">Wir melden uns so schnell wie möglich.</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block">Name</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2 text-gray-900 focus:outline-none focus:border-red-800 text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block">Email</label>
                  <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2 text-gray-900 focus:outline-none focus:border-red-800 text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block">Telefon</label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2 text-gray-900 focus:outline-none focus:border-red-800 text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block">Nachricht</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2 text-gray-900 focus:outline-none focus:border-red-800 text-sm"
                  />
                </div>
                <button
                  onClick={handleSubmit}
                  className="w-full bg-red-800 hover:bg-red-700 text-white py-2 rounded font-medium transition-colors"
                >
                  Nachricht senden
                </button>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Adresse</p>
              <p className="text-gray-700">Bessemerstraße 42A</p>
              <p className="text-gray-700">12103 Berlin</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Telefon</p>
              <p className="text-gray-700">+49 30 800 935 833</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Email</p>
              <p className="text-gray-700">verkauf@autohaus-royal.de</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Öffnungszeiten</p>
              <p className="text-gray-700">Mo–Fr: 09:00 – 19:00 Uhr</p>
              <p className="text-gray-700">Sa: 09:00 – 16:00 Uhr</p>
              <p className="text-gray-500">So: geschlossen</p>
            </div>
          </div>

          
        </div>
      </main>

      <Footer />  
      
    </div>
  )
}