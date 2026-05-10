import Image from 'next/image'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ProductCard from '@/components/ProductCard'
import { Product } from '@/types'
import { Heart, Ruler, Clock, MapPin, ArrowRight } from 'lucide-react'

async function getFeaturedProducts(): Promise<Product[]> {
  const products = await prisma.product.findMany({
    where: { featured: true, inStock: true },
    orderBy: { sortOrder: 'asc' },
    take: 4,
  })
  return products.map((p) => ({
    ...p,
    sizes: JSON.parse(p.sizes),
    colors: JSON.parse(p.colors),
    images: JSON.parse(p.images),
    createdAt: p.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString(),
  }))
}

export default async function HomePage() {
  const featured = await getFeaturedProducts()

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
          <Image
            src="/images/img-09.jpg"
            alt="NAJAH Activewear"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/30 via-charcoal/10 to-charcoal/40" />
          <div className="relative z-10 text-center px-4 animate-fade-in">
            <p className="text-xs tracking-[0.5em] uppercase text-beige-100/80 mb-4 font-sans">
              Handmade · Made in Bosnia
            </p>
            <h1 className="font-serif text-6xl sm:text-8xl font-bold text-white tracking-[0.2em] leading-none mb-2">
              NAJAH
            </h1>
            <p className="text-xs sm:text-sm tracking-[0.5em] uppercase text-beige-100/70 mb-10 font-sans">
              activewear
            </p>
            <p className="text-base sm:text-lg text-beige-100/90 font-serif italic mb-10 max-w-md mx-auto">
              Aktivna odjeća za aktivnu ženu
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/shop" className="btn-primary bg-white text-charcoal hover:bg-beige-100">
                Pogledaj kolekciju
              </Link>
              <Link href="/about" className="btn-secondary border-white text-white hover:bg-white hover:text-charcoal">
                Saznaj više
              </Link>
            </div>
          </div>
          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50">
            <div className="w-px h-12 bg-white/30 animate-pulse" />
          </div>
        </section>

        {/* Brand intro strip */}
        <section className="bg-charcoal text-beige-100 py-4">
          <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-8 sm:gap-16">
            {[
              'Handmade',
              'Po mjerama',
              'Made in Bosnia',
              'Skromno & Elegantno',
            ].map((text) => (
              <span
                key={text}
                className="text-[10px] tracking-[0.4em] uppercase text-beige-400 font-sans"
              >
                {text}
              </span>
            ))}
          </div>
        </section>

        {/* Featured Products */}
        {featured.length > 0 && (
          <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <p className="section-subtitle mb-3">Nova kolekcija</p>
              <h2 className="section-title">Izdvojeno za tebe</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {featured.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className="text-center mt-12">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 text-sm tracking-widest uppercase text-charcoal hover:gap-4 transition-all duration-200"
              >
                Vidi cijelu kolekciju <ArrowRight size={16} />
              </Link>
            </div>
          </section>
        )}

        {/* About split section */}
        <section className="bg-beige-200">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2">
            <div className="relative aspect-square md:aspect-auto min-h-[400px]">
              <Image
                src="/images/img-03.jpg"
                alt="O nama"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-center p-10 sm:p-16 lg:p-20">
              <p className="section-subtitle mb-4">O brendu</p>
              <h2 className="section-title mb-6">
                Odjeća koja prati tebe,
                <br />
                <em>ne obrnuto</em>
              </h2>
              <p className="text-sm text-warm-gray leading-relaxed mb-4">
                NAJAH Activewear nastao je iz ljubavi prema sportu i vjere da svaka
                žena zaslužuje udobnu, elegantnu i skromnu sportsku odjeću.
              </p>
              <p className="text-sm text-warm-gray leading-relaxed mb-8">
                Svaki komad se šije ručno, po mjerama i željama kupca. Nije
                masovna proizvodnja — to je odjeća s dušom, napravljena posebno
                za tebe.
              </p>
              <Link href="/about" className="btn-secondary self-start">
                Naša priča
              </Link>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="section-subtitle mb-3">Zašto NAJAH?</p>
            <h2 className="section-title">Naše vrijednosti</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Heart,
                title: 'Sa ljubavlju',
                desc: 'Svaki komad se šije ručno, s posebnom pažnjom prema svakom detalju.',
              },
              {
                icon: Ruler,
                title: 'Po mjerama',
                desc: 'Sve se radi isključivo po Vašim mjerama i željama. Savršeno pristajanje, garantovano.',
              },
              {
                icon: Clock,
                title: '10–15 dana',
                desc: 'Rok izrade je 10 do 15 radnih dana jer kvalitet zahtijeva posvećenost.',
              },
              {
                icon: MapPin,
                title: 'Made in Bosnia',
                desc: 'Ponosno izrađeno u Bosni i Hercegovini. Lokalno, autentično, naše.',
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="text-center space-y-4">
                <div className="w-14 h-14 bg-beige-200 rounded-full flex items-center justify-center mx-auto">
                  <Icon size={22} className="text-charcoal" />
                </div>
                <h3 className="font-serif text-lg text-charcoal">{title}</h3>
                <p className="text-sm text-warm-gray leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How to order */}
        <section className="bg-charcoal py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center">
            <p className="text-[10px] tracking-[0.5em] uppercase text-beige-500 mb-3">
              Proces narudžbe
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-beige-100 mb-14">
              Kako naručiti?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
              {[
                {
                  step: '01',
                  title: 'Odaberi artikal',
                  desc: 'Pregledaj našu kolekciju i odaberi komad koji ti se dopao.',
                },
                {
                  step: '02',
                  title: 'Dodaj u korpu',
                  desc: 'Odaberi veličinu, boju i klikni "Dodaj u korpu".',
                },
                {
                  step: '03',
                  title: 'Narudžba via WhatsApp',
                  desc: 'Popuni podatke i narudžba se šalje direktno na naš WhatsApp.',
                },
              ].map(({ step, title, desc }) => (
                <div key={step} className="space-y-4">
                  <p className="font-serif text-4xl text-beige-700">{step}</p>
                  <h3 className="font-serif text-xl text-beige-100">{title}</h3>
                  <p className="text-sm text-beige-400 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-14">
              <Link href="/shop" className="btn-primary bg-beige-100 text-charcoal hover:bg-beige-200">
                Počni kupovinu
              </Link>
            </div>
          </div>
        </section>

        {/* Instagram gallery */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <p className="section-subtitle mb-3">@najah.activewear</p>
            <h2 className="section-title">Galerija</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
            {[
              '/images/img-22.jpg',
              '/images/img-10.jpg',
              '/images/img-27.jpg',
              '/images/img-13.jpg',
              '/images/img-04.jpg',
              '/images/img-35.jpg',
              '/images/img-15.jpg',
              '/images/img-03.jpg',
              '/images/img-16.jpg',
              '/images/img-29.jpg',
            ].map((src, i) => (
              <div key={i} className="relative aspect-square overflow-hidden group">
                <Image
                  src={src}
                  alt={`Gallery ${i + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/20 transition-colors duration-300" />
              </div>
            ))}
          </div>
        </section>

        {/* CTA banner */}
        <section className="bg-beige-200 py-16 px-4 text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-4">
            Imaš pitanje?
          </h2>
          <p className="text-sm text-warm-gray mb-8 max-w-md mx-auto">
            Slobodno nam se javi putem kontakt forme ili direktno na WhatsApp —
            tu smo da pomognemo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-primary">
              Kontaktiraj nas
            </Link>
            <Link href="/shop" className="btn-secondary">
              Kolekcija
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
