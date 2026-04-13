import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Printer, Wrench, Truck, CreditCard, QrCode, Link as LinkIcon, ChevronDown, Smartphone } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const graficaData = [
  { name: "Xerox Preto", price: "R$ 0,25" },
  { name: "Impressão Preto", price: "R$ 0,49" },
  { name: "Xerox Colorida", price: "R$ 0,49" },
  { name: "Impressão Colorida", price: "R$ 0,99" },
  { name: "Playback (faixa)", price: "R$ 1,99" },
  { name: "Impressão Papel Foto (a partir)", price: "R$ 2,49" },
  { name: "Impressão Papel Adesivo (a partir)", price: "R$ 2,49" },
  { name: "Hinário Econômico Livreto (a partir de)", price: "R$ 3,00" },
  { name: "Encadernação (a partir de)", price: "R$ 4,99" },
  { name: "Plastificação (a partir de)", price: "R$ 4,99" },
  { name: "Playback s/ Back Vocal (faixa)", price: "R$ 4,99" },
  { name: "Hinário Econômico Encadernado (a partir de)", price: "R$ 5,00" },
  { name: "Criação de Arte (a partir de)", price: "R$ 9,99" },
  { name: "Filtro p/ Instagram (a partir de)", price: "R$ 9,99" },
  { name: "Hinário Vinil Encadernado (a partir de)", price: "R$ 9,99" },
  { name: "Caderno de chamada Anual c/Cadastro (a partir de)", price: "R$ 45,00" },
  { name: "Cartões de visita (1000un)", price: "R$ 149,99" },
  { name: "TAG Verniz total UV + Furo (1000un)", price: "R$ 159,99" },
  { name: "Panfletos 10x14 (2500un)", price: "R$ 179,99" },
  { name: "Marcadores de Página 5x18 (1000un)", price: "R$ 259,99" },
];

const consultoriaData = [
  { name: "Suporte Remoto", price: "R$ 24,99" },
  { name: "Instalação de Programa", price: "R$ 29,99" },
  { name: "Instalação de Periféricos", price: "R$ 39,99" },
  { name: "Manutenção Preventiva", price: "R$ 49,99" },
  { name: "VPN por máquina adicional", price: "R$ 49,99" },
  { name: "Visita técnica (a partir de)", price: "R$ 60,00" },
  { name: "Desbloqueio de Impressora Epson", price: "R$ 69,99" },
  { name: "Treinamento On-line (por hora)", price: "R$ 69,99" },
  { name: "Formatação de Pc e Notebook", price: "R$ 99,99" },
  { name: "Criação de VPN (1 Servidor + 1 dispositivo)", price: "R$ 149,99" },
  { name: "Treinamento presencial (3 horas) a partir de", price: "R$ 450,00" },
  { name: "Configuração de Rede Wifi ou Cabeada (a partir de)", price: "R$ 600,00" },
  { name: "Criação de Site (a partir de)", price: "R$ 1.200,00" },
];

const eletronicosData = [
  { name: "Smartphones", price: "Sob Consulta" },
  { name: "Smartwatches", price: "Sob Consulta" },
  { name: "Tablets", price: "Sob Consulta" },
  { name: "Impressoras", price: "Sob Consulta" },
  { name: "Desktops e Notebooks", price: "Sob Consulta" },
  { name: "Perfumes Importados", price: "Sob Consulta" },
];

export function Pricing() {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    grafica: false,
    consultoria: false,
    eletronicos: false,
  });

  const toggleSection = (id: string) => {
    setOpenSections(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const categories = [
    { id: 'grafica', title: 'Gráfica', icon: Printer, data: graficaData, footer: "CD's, Marcadores de Página, Cartões de Visita, Talões, Blocos, e muitos outros materiais personalizados!" },
    { id: 'consultoria', title: 'Consultoria', icon: Wrench, data: consultoriaData },
    { id: 'eletronicos', title: 'Eletrônicos / Importados', icon: Smartphone, data: eletronicosData }
  ];

  return (
    <section id="pricing" className="py-24 bg-zinc-950 relative overflow-hidden">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1/3 h-2/3 bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-white mb-6"
          >
            Alguns de nossos <span className="text-emerald-500">Valores</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-zinc-400 max-w-2xl mx-auto"
          >
            Transparência e preço justo para todos os nossos serviços. Clique nas categorias abaixo para ver os detalhes.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-16 items-start">
          {categories.map((cat, index) => {
            const isOpen = openSections[cat.id];
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-zinc-900/50 border border-zinc-800 rounded-3xl overflow-hidden shadow-xl"
              >
                <button 
                  onClick={() => toggleSection(cat.id)}
                  className="w-full flex items-center justify-between p-6 hover:bg-zinc-800/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center shrink-0">
                      <cat.icon className="text-emerald-400" size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-white text-left">{cat.title}</h3>
                  </div>
                  <ChevronDown className={cn("text-zinc-400 transition-transform duration-300", isOpen ? "rotate-180" : "")} />
                </button>
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="p-6 pt-0 border-t border-zinc-800/50">
                        <div className="space-y-4 mt-6">
                          {cat.data.map((item, i) => (
                            <div key={i} className="flex items-end justify-between text-sm group">
                              <span className="text-zinc-300 bg-zinc-900/50 pr-2 group-hover:text-white transition-colors text-left">{item.name}</span>
                              <div className="flex-1 border-b-2 border-dotted border-zinc-700 mx-2 mb-1.5 opacity-40 group-hover:border-emerald-500/50 transition-colors"></div>
                              <span className="font-bold text-emerald-400 bg-zinc-900/50 pl-2 whitespace-nowrap">{item.price}</span>
                            </div>
                          ))}
                        </div>
                        
                        {cat.footer && (
                          <div className="mt-8 pt-6 border-t border-zinc-800 text-xs text-zinc-400 italic text-center">
                            {cat.footer}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Delivery & Payment */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-6"
        >
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6 flex items-center gap-6">
            <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center shrink-0">
              <Truck className="text-emerald-400" size={32} />
            </div>
            <div>
              <h4 className="text-xl font-bold text-white mb-1">Fazemos Entrega</h4>
              <p className="text-emerald-200/80">Via Uber Flash e 99! <br className="hidden sm:block" />Favor consultar taxa.</p>
            </div>
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 flex items-center gap-6">
            <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center shrink-0">
              <CreditCard className="text-zinc-400" size={32} />
            </div>
            <div className="w-full">
              <h4 className="text-xl font-bold text-white mb-3">Formas de Pagamento</h4>
              <div className="flex flex-wrap items-center gap-4 text-zinc-400 text-sm font-medium">
                <span className="flex items-center gap-1"><QrCode size={16} className="text-emerald-400"/> Pix</span>
                <span className="flex items-center gap-1"><CreditCard size={16}/> Cartões (Elo, Visa, Master, Amex)</span>
                <span className="flex items-center gap-1"><LinkIcon size={16}/> Link de Pagamento</span>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
