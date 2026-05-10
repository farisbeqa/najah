import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Heart, Ruler, Clock, MapPin, Scissors, Star } from 'lucide-react'

export const dynamic = 'force-dynamic'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'O nama',
  description: 'Saznajte više o NAJAH Activewear brendu — naša priča, vrijednosti i misija.',
}

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Hero */}
        <section className="relative h-[70vh] min-h-[450px] flex items-end overflow-hidden">
          <Image
            src="/images/img-22.jpg"
            alt="O nama"
            fill
            priority
            className="object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
            <p className="text-xs tracking-[0.5em] uppercase text-beige-300 mb-3">
              O brendu
            </p>
            <h1 className="font-serif text-4xl sm:text-6xl text-white max-w-xl leading-tight">
              Naša priča
            </h1>
          </div>
        </section>

        {/* Story */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="section-subtitle mb-4">Ko smo mi</p>
              <h2 className="section-title mb-6">
                Nastalo iz ljubavi prema sportu i stilu
              </h2>
              <div className="space-y-4 text-sm text-warm-gray leading-relaxed">
                <p>
                  NAJAH Activewear je nastao s jednom jednostavnom idejom: da
                  svaka žena koja želi biti aktivna može biti i udobna i
                  skromna i elegantna — u isto vrijeme.
                </p>
                <p>
                  Kao trenerica, osnivačica NAJAH-a znala je iz prve ruke
                  koliko je teško pronaći sportsku odjeću koja prati i dušu i
                  tijelo pokrivene žene. Svaka majica bila je ili previše kratka,
                  svake hlače previše tijesne. Rješenje? Sašiti sama.
                </p>
                <p>
                  Ono što je počelo kao osobna potreba, danas je brend koji
                  oblači žene širom Bosne i regije. Svaki komad se šije ručno,
                  s ljubavlju, po mjerama i željama svake kupice.
                </p>
              </div>
            </div>
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="/images/img-03.jpg"
                alt="NAJAH Activewear"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* Brand info card from Instagram */}
        <section className="bg-beige-200 py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {[
                {
                  icon: Heart,
                  title: 'Sa posebnom pažnjom',
                  desc: 'Svaki komad iz naše kolekcije nastaje s posebnom pažnjom jer vjerujemo da odjeća treba da prati tebe, a ne obrnuto.',
                },
                {
                  icon: Ruler,
                  title: 'Po mjerama kupca',
                  desc: 'Svi naši modeli izrađuju se po mjerama i željama kupca kako bi svaki detalj bio prilagođen upravo tebi, od kroja do završnih sitnica.',
                },
                {
                  icon: Clock,
                  title: '10–15 dana izrade',
                  desc: 'Vrijeme izrade je 10–15 dana jer kvalitet i posvećenost zahtijevaju svoj proces.',
                },
                {
                  icon: Scissors,
                  title: 'Tvoja ideja, savršen komad',
                  desc: 'Bilo da tražiš udobnost, eleganciju ili spoj oba, tu smo da tvoju ideju pretvorimo u savršen komad.',
                },
              ].map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="flex gap-5 bg-white p-6"
                >
                  <div className="w-12 h-12 bg-beige-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon size={20} className="text-charcoal" />
                  </div>
                  <div>
                    <h3 className="font-serif text-charcoal mb-2">{title}</h3>
                    <p className="text-sm text-warm-gray leading-relaxed">
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="section-subtitle mb-3">Naše vrijednosti</p>
            <h2 className="section-title">Što nas čini posebnim</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            {[
              {
                icon: Star,
                value: '100%',
                label: 'Handmade',
                desc: 'Svaki komad šijen ručno',
              },
              {
                icon: Ruler,
                value: '∞',
                label: 'Veličina',
                desc: 'Rađeno po Vašim mjerama',
              },
              {
                icon: MapPin,
                value: 'BiH',
                label: 'Made in Bosnia',
                desc: 'Ponosno lokalno porijeklo',
              },
            ].map(({ icon: Icon, value, label, desc }) => (
              <div key={label} className="space-y-3">
                <p className="font-serif text-5xl text-charcoal">{value}</p>
                <h3 className="text-xs tracking-widest uppercase text-charcoal">
                  {label}
                </h3>
                <p className="text-sm text-warm-gray">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Product images grid */}
        <section className="pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              '/images/img-10.jpg',
              '/images/img-27.jpg',
              '/images/img-13.jpg',
              '/images/img-35.jpg',
            ].map((src, i) => (
              <div
                key={i}
                className="relative aspect-[3/4] overflow-hidden"
              >
                <Image
                  src={src}
                  alt={`NAJAH Activewear ${i + 1}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-charcoal py-20 px-4 text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-beige-100 mb-4">
            Spremi za svoju prvu narudžbu?
          </h2>
          <p className="text-sm text-beige-400 mb-8 max-w-md mx-auto">
            Pogledaj kolekciju i pronađi komad koji je savršen za tebe — ili
            nam se javi pa zajedno dizajniramo tvoj idealni outfit.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/shop"
              className="btn-primary bg-beige-100 text-charcoal hover:bg-beige-200"
            >
              Pogledaj kolekciju
            </Link>
            <Link
              href="/contact"
              className="btn-secondary border-beige-600 text-beige-300 hover:bg-beige-100 hover:text-charcoal hover:border-beige-100"
            >
              Kontaktiraj nas
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
