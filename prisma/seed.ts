import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const products = [
  {
    name: 'Active Sport Top',
    slug: 'active-sport-top',
    description:
      'Naša najpopularnija sport majica, dostupna u četiri boje. Dugih rukava, visoki ovratnik i udoban kroj koji prati svaki pokret. Izrađena od kvalitetnog, brzosušećeg materijala — savršena za svaki trening. Sve po Vašim mjerama.',
    price: 70.0,
    category: 'majice',
    sizes: JSON.stringify(['XS', 'S', 'M', 'L', 'XL', 'XXL', 'Po mjerama']),
    colors: JSON.stringify(['Roza', 'Crna', 'Siva', 'Bež / Kremasta']),
    images: JSON.stringify([
      '/images/img-22.jpg',
      '/images/img-29.jpg',
      '/images/img-35.jpg',
      '/images/img-30.jpg',
    ]),
    inStock: true,
    featured: true,
    sortOrder: 1,
  },
  {
    name: 'Bež Zip Sport Top',
    slug: 'bez-zip-sport-top',
    description:
      'Elegantni sport top s patentnim zatvaračem na vratu. Duži kroj pruža potpunu pokrivenost i savršeno se kombinira s crnim pantalonama. Izrađen od mekanog, rastezljivog materijala idealnog za jogu, pilates i svakodnevni trening.',
    price: 75.0,
    category: 'majice',
    sizes: JSON.stringify(['XS', 'S', 'M', 'L', 'XL', 'XXL', 'Po mjerama']),
    colors: JSON.stringify(['Bež / Kremasta', 'Crna']),
    images: JSON.stringify([
      '/images/img-27.jpg',
      '/images/img-28.jpg',
      '/images/img-16.jpg',
    ]),
    inStock: true,
    featured: true,
    sortOrder: 2,
  },
  {
    name: 'Kremasta Sport Majica',
    slug: 'kremasta-sport-majica',
    description:
      'Blago rastezljiva sport majica s uzicom za podešavanje. Mekan i udoban materijal za svakodnevne treninge. Izvrsno se slaže s pantalonama bilo koje boje. Namijenjena ženama koje cijene udobnost bez kompromisa.',
    price: 60.0,
    category: 'majice',
    sizes: JSON.stringify(['XS', 'S', 'M', 'L', 'XL', 'XXL', 'Po mjerama']),
    colors: JSON.stringify(['Bež / Kremasta']),
    images: JSON.stringify(['/images/img-13.jpg', '/images/img-14.jpg']),
    inStock: true,
    featured: false,
    sortOrder: 3,
  },
  {
    name: 'Hoodie Haljina',
    slug: 'hoodie-haljina',
    description:
      'Naš ikonični dugi hoodie — spoj udobnosti i elegancije. Doseže do ispod koljena, s kapuljačom i džepovima. Savršen za trening, ali i svakodnevni izlazak. Dostupan u crnoj i bordo boji. Rađen po mjerama.',
    price: 100.0,
    category: 'duksevi',
    sizes: JSON.stringify(['XS', 'S', 'M', 'L', 'XL', 'XXL', 'Po mjerama']),
    colors: JSON.stringify(['Crna', 'Bordo']),
    images: JSON.stringify([
      '/images/img-03.jpg',
      '/images/img-04.jpg',
      '/images/img-05.jpg',
    ]),
    inStock: true,
    featured: true,
    sortOrder: 4,
  },
  {
    name: 'Crni Dukserica sa Printom',
    slug: 'crni-dukserica-sa-printom',
    description:
      'Oversized crni hoodie s prepoznatljivim NAJAH arabskim printom. Mekan i topao, savršen za hladnije dane. Kombinira se s crnim ili bež pantalonama. Poseban i jedinstven komad koji ćete uvijek željeti nositi.',
    price: 75.0,
    category: 'duksevi',
    sizes: JSON.stringify(['XS', 'S', 'M', 'L', 'XL', 'XXL', 'Po mjerama']),
    colors: JSON.stringify(['Crna']),
    images: JSON.stringify([
      '/images/img-10.jpg',
      '/images/img-11.jpg',
      '/images/img-12.jpg',
    ]),
    inStock: true,
    featured: false,
    sortOrder: 5,
  },
  {
    name: 'Bež Sweat Komplet',
    slug: 'bez-sweat-komplet',
    description:
      'Kompletni sweat set u toploj kremastoj boji — oversized hoodie s natpisom NAJAH i široke udobne pantalone. Savršen za trening i opuštene dane. Dolazi s odgovarajućom torbicom i bojicom. Rađen isključivo po Vašim mjerama.',
    price: 130.0,
    category: 'setovi',
    sizes: JSON.stringify(['XS', 'S', 'M', 'L', 'XL', 'XXL', 'Po mjerama']),
    colors: JSON.stringify(['Bež / Kremasta']),
    images: JSON.stringify([
      '/images/img-09.jpg',
      '/images/img-06.jpg',
      '/images/img-07.jpg',
      '/images/img-08.jpg',
    ]),
    inStock: true,
    featured: true,
    sortOrder: 6,
  },
  {
    name: 'Crne Joger Pantalone',
    slug: 'crne-joger-pantalone',
    description:
      'Klasične crne joger pantalone s elastičnim pojasom. Udobne, rastezljive i savršene za svaki sport. Kombiniraju se s bilo kojim topom iz naše kolekcije. Izrađene od kvalitetnog materijala koji je prijatan na koži.',
    price: 55.0,
    category: 'pantalone',
    sizes: JSON.stringify(['XS', 'S', 'M', 'L', 'XL', 'XXL', 'Po mjerama']),
    colors: JSON.stringify(['Crna']),
    images: JSON.stringify([
      '/images/img-15.jpg',
      '/images/img-16.jpg',
      '/images/img-01.jpg',
    ]),
    inStock: true,
    featured: false,
    sortOrder: 7,
  },
]

async function main() {
  console.log('Seeding database...')

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: product,
      create: product,
    })
  }

  console.log(`Seeded ${products.length} products.`)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
