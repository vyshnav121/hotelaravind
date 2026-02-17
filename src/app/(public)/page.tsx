import Hero from '@/components/Hero';
import Link from 'next/link';
import { ArrowRight, Utensils, Award, Clock } from 'lucide-react';
import Image from 'next/image';

// import dbConnect from '@/lib/db';
// import { Category } from '@/models/Schemas';

export default function Home() {
  return (
    <div className="min-h-screen bg-kerala-cream">
      <Hero />

      {/* Philosophy / Story Section */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 relative">
              {/* Image Placeholder */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-500">
                <div className="aspect-[4/3] bg-gray-200 relative">
                  {/* Replace with actual chef/kitchen image */}
                  <Image src="https://recipesaresimple.com/wp-content/uploads/2020/10/parotta-paratha-recipe.jpeg" alt="Chef Cooking" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" unoptimized={true} />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                  <div className="text-white">
                    <p className="font-serif text-2xl italic">"Cooking is an act of love."</p>
                  </div>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -z-10 -top-8 -left-8 w-24 h-24 bg-kerala-gold pattern-dots rounded-full opacity-20"></div>
              <div className="absolute -z-10 -bottom-8 -right-8 w-32 h-32 bg-kerala-green rounded-full opacity-10 blur-2xl"></div>
            </div>

            <div className="lg:w-1/2 space-y-8">
              <div>
                <span className="text-kerala-green font-bold tracking-widest uppercase text-sm mb-2 block">Our Philosophy</span>
                <h2 className="text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-6">Serving Tradition <br />Since 1983</h2>
                <div className="w-20 h-1 bg-kerala-gold"></div>
              </div>

              <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                <p>
                  For over four decades, Aravind Hotel has been more than just a restaurant in massive Sulthan Bathery. It's a place where memories are made over steaming plates of Biriyani and hot cups of tea.
                </p>
                <p>
                  We take pride in preserving the authentic recipes passed down through generations. We believe in using only the freshest local ingredients, hand-ground spices, and traditional cooking methods to bring you the true taste of Malabar.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-green-50 text-kerala-green rounded-full">
                    <Utensils className="w-6 h-6" />
                  </div>
                  <span className="font-medium text-gray-800">Authentic Taste</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-orange-50 text-orange-600 rounded-full">
                    <Award className="w-6 h-6" />
                  </div>
                  <span className="font-medium text-gray-800">Premium Quality</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-full">
                    <Clock className="w-6 h-6" />
                  </div>
                  <span className="font-medium text-gray-800">Fast Service</span>
                </div>
              </div>

              <div className="pt-6">
                <Link href="/about" className="text-gray-900 font-bold hover:text-kerala-green transition-colors flex items-center group">
                  <span>Read Our Full Story</span>
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Preview */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <span className="text-kerala-green font-bold tracking-widest uppercase text-sm mb-2 block">Discover Our Menu</span>
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">Curated Delights</h2>
            <p className="text-gray-600">Explore our wide range of dishes, from traditional Kerala breakfasts to exotic dinner specials.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {/* Dynamic Cards */}
            {[
              { name: 'Biriyani', sub: 'Aromatic & Spicy', img: 'https://www.maggi.in/sites/default/files/styles/srh_recipes/public/srh_recipes/83100cde6b3045cdce27048211f14019.jpg?h=4f5b30f1&itok=hrD4cQhe' },
              { name: 'Meals', sub: 'Traditional Sadya', img: 'https://www.theraviz.com/wp-content/uploads/2024/08/onam.jpg' },
              { name: 'Starters', sub: 'Crispy & Delicious', img: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800&auto=format&fit=crop' },
              { name: 'Beverages', sub: 'Cool & Refreshing', img: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?q=80&w=800&auto=format&fit=crop' }
            ].map((cat, idx) => (
              <Link href={`/menu?category=${cat.name}`} key={idx} className="group relative h-80 rounded-2xl overflow-hidden block shadow-lg">
                <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110">
                  <Image
                    src={cat.img}
                    alt={cat.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 25vw"
                    unoptimized={true}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>

                <div className="absolute bottom-0 left-0 p-6 w-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-white font-serif text-2xl font-bold mb-1">{cat.name}</h3>
                  <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">{cat.sub}</p>
                </div>

                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowRight className="w-5 h-5 text-white" />
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/menu" className="inline-flex items-center space-x-2 px-8 py-3 border border-gray-300 rounded-full hover:border-kerala-green hover:text-kerala-green transition-all font-medium">
              <span>View Full Menu</span>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden bg-kerala-green">
        <div className="absolute inset-0 bg-kerala-pattern opacity-10"></div>
        {/* Decorative circles */}
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-kerala-gold/10 rounded-full blur-3xl"></div>

        <div className="max-w-4xl mx-auto text-center px-4 relative z-10">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">Ready to savor the taste?</h2>
          <p className="mb-10 text-xl text-gray-200 font-light">Order online for quick delivery or visit us for a memorable dining experience.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/menu" className="px-10 py-4 bg-kerala-gold text-kerala-green font-bold rounded-full shadow-lg hover:bg-white transition-all transform hover:-translate-y-1">
              Order Now
            </Link>
            <Link href="/contact" className="px-10 py-4 bg-transparent border-2 border-white/30 text-white font-bold rounded-full hover:bg-white hover:text-kerala-green transition-all">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
