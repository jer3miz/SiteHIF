import { Mail, Phone, MapPin, Send } from 'lucide-react'
import { ContactForm } from '@/components/ContactForm'

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-16 bg-black">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-950/20 to-black">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-primary-900/30 rounded-full border border-primary-500/30 backdrop-blur-sm mb-6">
              <Mail className="w-4 h-4 text-primary-400" />
              <span className="text-sm text-primary-300 font-semibold">Contactez-nous</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Donnons vie à
              <span className="block bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
                votre projet
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 leading-relaxed">
              Vous avez un projet en tête ? Notre équipe est là pour vous accompagner 
              de l'idée à la réalisation.
            </p>
          </div>

          {/* Contact Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            
            {/* Contact Form */}
            <div className="order-2 lg:order-1">
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-gray-800 p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Envoyez-nous un message</h2>
                <ContactForm />
              </div>
            </div>

            {/* Contact Info */}
            <div className="order-1 lg:order-2 space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">Informations de contact</h2>
                <p className="text-gray-400 mb-8">
                  N'hésitez pas à nous contacter pour discuter de votre projet. 
                  Nous vous répondrons dans les plus brefs délais.
                </p>
              </div>

              <div className="space-y-6">
                {/* Email */}
                <div className="flex items-start space-x-4 p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-gray-800 hover:border-primary-500/30 transition-colors">
                  <div className="w-12 h-12 bg-primary-900/30 rounded-lg flex items-center justify-center flex-shrink-0 border border-primary-500/30">
                    <Mail className="w-6 h-6 text-primary-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Email</h3>
                    <a href="mailto:contact@hif-studio.com" className="text-gray-400 hover:text-primary-400 transition-colors">
                      contact@hif-studio.com
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start space-x-4 p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-gray-800 hover:border-primary-500/30 transition-colors">
                  <div className="w-12 h-12 bg-primary-900/30 rounded-lg flex items-center justify-center flex-shrink-0 border border-primary-500/30">
                    <Phone className="w-6 h-6 text-primary-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Téléphone</h3>
                    <a href="tel:+33123456789" className="text-gray-400 hover:text-primary-400 transition-colors">
                      +33 1 23 45 67 89
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start space-x-4 p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-gray-800 hover:border-primary-500/30 transition-colors">
                  <div className="w-12 h-12 bg-primary-900/30 rounded-lg flex items-center justify-center flex-shrink-0 border border-primary-500/30">
                    <MapPin className="w-6 h-6 text-primary-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Adresse</h3>
                    <p className="text-gray-400">
                      123 Rue du Cinéma<br />
                      75001 Paris, France
                    </p>
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div className="p-6 bg-gradient-to-br from-primary-900/20 to-gray-900 rounded-xl border border-primary-500/30">
                <h3 className="text-white font-semibold mb-4">Horaires d'ouverture</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Lundi - Vendredi</span>
                    <span className="text-gray-300">9h00 - 18h00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Samedi</span>
                    <span className="text-gray-300">10h00 - 16h00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Dimanche</span>
                    <span className="text-gray-300">Fermé</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              Prêt à démarrer votre projet ?
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Prenez rendez-vous pour discuter de vos besoins et découvrir comment nous pouvons vous aider.
            </p>
            <a
              href="mailto:contact@hif-studio.com"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-primary-600 hover:bg-primary-500 text-white font-semibold rounded-xl transition-all hover:scale-105 hover:shadow-2xl hover:shadow-primary-600/50"
            >
              <Mail className="w-5 h-5" />
              <span>Planifier un rendez-vous</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export const metadata = {
  title: 'Contact - HIF Studio',
  description: 'Contactez HIF Studio pour vos projets de cinématographie',
}

