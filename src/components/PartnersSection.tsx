import { motion } from 'framer-motion';

const partners = Array.from({ length: 21 }, (_, i) => ({
  id: i + 1,
  src: `/partners/logo-${i + 1}.png`,
  alt: `Parceiro ${i + 1}`,
}));

export default function PartnersSection() {
  return (
    <section className="py-20 bg-zinc-950 overflow-hidden border-t border-zinc-900">
      <div className="container mx-auto px-6 mb-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white">Nossos Parceiros</h2>
      </div>
      
      <div className="relative flex overflow-x-hidden">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 40,
            ease: "linear",
            repeat: Infinity,
          }}
          className="flex gap-12 whitespace-nowrap"
        >
          {[...partners, ...partners].map((partner, index) => (
            <div
              key={`${partner.id}-${index}`}
              className="flex-shrink-0 w-40 h-24 flex items-center justify-center bg-zinc-900 rounded-xl border border-zinc-800 hover:border-emerald-500/50 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] overflow-hidden"
            >
              <img
                src={partner.src}
                alt={partner.alt}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
