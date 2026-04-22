/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Printer, 
  TrendingUp, 
  Smartphone, 
  Monitor, 
  MapPin, 
  CreditCard, 
  Truck,
  ChevronRight,
  ChevronLeft,
  Menu,
  X,
  Instagram,
  Facebook,
  MessageCircle,
  Quote,
  Star,
  Mail,
  Clock,
  Download,
  Youtube
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import logo from './assets/logo.svg';
import PartnersSection from './components/PartnersSection';
import { TikTokIcon, KwaiIcon } from './components/Icons';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import { Pricing } from './components/Pricing';

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedDashboard, setSelectedDashboard] = useState<{id: number, title: string, description: string, image: string, isNew?: boolean} | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

const dashboardFeatures = [
    { id: 1, title: "Login Multusuários", description: "Controle de permissões de acordo com cargo / função, para usuários com login / senha, e senha master para recuperação de acesso.", image: "/dashboard-1.jpg" },
    { id: 2, title: "Painel de Atendimento", description: "Gerenciamento de fila de atendimento (Arrastar e Soltar) e status de produção, com gráficos; Visualização em kanban e listas; Botões de acesso rápido com atalhos.", image: "/dashboard-2.jpg" },
    { id: 3, title: "PDV (Venda Rápida)", description: "Busca de produtos e clientes simplificada, formas de pagamentos multiplas, informação de vezes para cartão de crédito, desconto em real ou percentual, tanto por item quanto geral, e opções de acréscimo.", image: "/dashboard-3.jpg" },
    { id: 4, title: "MESAS (Salão de Atendimento)", description: "Criação de mesas com quantidades de pessoas, colunas para melhor visualização, tempo de permanencia e valor de consumo atualizado em tempo real, impressão de via cozinha com observações, impressão de parcial, reserva de mesas, controle de higienização de mesas, e histórico de mesas recem concluidas.", image: "/dashboard-4.jpg", isNew: true },
    { id: 5, title: "DELIVERY (Entregas Whatsapp e Balcão)", description: "Inclusão de pedidos feito pelo whatsapp e tambem feitos diretamente no balcão, exibição de tempo desde a criação do pedido atualizado em tempo real, dados de entrega com ponto de referencia, taxa de entrega, previsão de entrega em minutos, informações de troco para com valor a levar trocado, formas de pagamento facilitadas, envio de status para o cliente nos processos de preparação e de envio, impressão pedido, cozinha e entrega para motoboy, e coluna de entregas finalizadas recentimentes.", image: "/dashboard-5.jpg", isNew: true },
    { id: 6, title: "FINANCEIRO (Contas à Pagar e à Receber)", description: "Inclusão de Receitas e Despesas para um melhor controle financeiro, contando com categorias ajustaveis, relatorios detalhados com diversos filtros, exportação em PDF E PLANILHAS, com visualização de gráficos estilo barras e pizza.", image: "/dashboard-6.jpg" },
    { id: 7, title: "PEDIDOS", description: "Visualização de pedidos por status, cotações, abertos, finalizados, cancelados e excluidos, com resumo das informações básicas necessárias para identificar e visualizar, podendo editar a depender so status, e podendo tranformar cotação em pedido, dentre várias outra possibilidades a ser explorada nesta seção.", image: "/dashboard-7.jpg" },
    { id: 8, title: "GESTÃO", description: "visualização de analise financeira de vendas, por gráficos, produtos, formas de pagamento, origem de vendas e vários filtros, também é possivel gerenciar clientes, visualizando data da ultima compra, valor total gasto, ver o nivel vip do cliente, visualizar produtos com variações e kits, verificar a movimentação do estoque, fazer acertos e conferencias, e fazer a gestão de equipe, cargos, funcoes e definir a senha master, todos os campos existem opções de impressão, exportação em pdf e planilha.", image: "/dashboard-8.jpg" },
    { id: 9, title: "CALENDÁRIO (Entrega / produção)", description: "visualização geral de entregas atuais, e futuras relacionado a pedidos de produção que possuem status, mostrando entregas próximas e entregas em atraso, conta com lembretes ao fazer login no sistema que ajuda a focar nas demandas.", image: "/dashboard-9.jpg" },
    { id: 10, title: "OS (Ordem de Serviço)", description: "Painel de ordem de serviços, com descrição de problemas, tipo, marca, modelo, numero serial, anexo de fotos, informações de defeito, informações de solução, gráficos e listas informativas, status personalizados e exportações em pdf e excell, data e horario de entrada, aceita multiplas formas de pagamento, peças e serviços cadastrados como assistencia técnica, com ou sem movimentação de estoque, etc...", image: "/dashboard-10.jpg", isNew: true },
    { id: 11, title: "ÓTICA", description: "Módulo ótica, com dados sobre receita, informações detalhadas sobre olho direito e esquerdo, totalmente integrado com financeiro para pagamentos de entrada e pagamentos futuros, impressão de recibo de entrega, mensagens de cobrança via whatsapp, assim como status e resumo da venda, opção de cotação e muito mais.", image: "/dashboard-11.jpg", isNew: true },
    { id: 12, title: "ETIQUETAS", description: "Módulo para impressão de etiquetas de diversos tamanhos, modelos e formas, usado para impressora A4 e também bobinas 50mm e 80mm, com inserção de logomarca, validade, lote, fabricação, código de barras, etc.", image: "/dashboard-12.jpg", isNew: true },
  ];

  const getBusinessStatus = () => {
    const now = new Date();
    const day = now.getDay();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const time = hour + minute / 60;
    const dayName = ['Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado'][day];

    const holidays = ["01-01", "02-17", "04-03", "04-21", "05-01", "06-04", "09-07", "10-12", "11-02", "11-15", "11-20", "12-25"];
    const formattedDate = `${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    
    const isHoliday = holidays.includes(formattedDate);
    const isOpen = !isHoliday && day !== 0 && (day === 6 ? (time >= 9 && time < 14) : (time >= 9 && time < 18));
    
    return { 
      isOpen, 
      message: isOpen ? "Aberto agora" : "Fechado agora"
    };
  };

  const [businessStatus, setBusinessStatus] = useState(getBusinessStatus());

  useEffect(() => {
    const interval = setInterval(() => setBusinessStatus(getBusinessStatus()), 60000);
    return () => clearInterval(interval);
  }, []);

  const portfolioImages = [
    {
      url: "/portfolio-1.jpg",
      title: "Cartões de Visita Premium",
      category: "Papelaria Corporativa"
    },
    {
      url: "/portfolio-2.jpg",
      title: "Identidade Visual",
      category: "Branding"
    },
    {
      url: "/portfolio-3.jpg",
      title: "Flyers e Panfletos",
      category: "Marketing Offline"
    },
    {
      url: "/portfolio-4.jpg",
      title: "Social Media Design",
      category: "Marketing Digital"
    },
    {
      url: "/portfolio-5.jpg",
      title: "Banners e Lonas",
      category: "Comunicação Visual"
    },
    {
      url: "/portfolio-6.jpg",
      title: "Cardápios Digitais",
      category: "Design para Gastronomia"
    },
    {
      url: "/portfolio-7.jpg",
      title: "Adesivos Personalizados",
      category: "Papelaria Criativa"
    },
    {
      url: "/portfolio-8.jpg",
      title: "Brindes Corporativos",
      category: "Marketing de Relacionamento"
    },
    {
      url: "/portfolio-9.jpg",
      title: "Logotipos Modernos",
      category: "Criação de Logo"
    },
    {
      url: "/portfolio-10.jpg",
      title: "Catálogos e Revistas",
      category: "Design Editorial"
    },
    {
      url: "/portfolio-11.jpg",
      title: "Embalagens Personalizadas",
      category: "Packaging"
    },
    {
      url: "/portfolio-12.jpg",
      title: "Convites Digitais",
      category: "Social"
    },
    {
      url: "/portfolio-13.jpg",
      title: "Fachadas e Letreiros",
      category: "Comunicação Visual"
    },
    {
      url: "/portfolio-14.jpg",
      title: "Uniformes Personalizados",
      category: "Vestuário"
    }
  ];

  const [isPaused, setIsPaused] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const pauseCarousel = () => {
    setIsPaused(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setIsPaused(false), 10000);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % portfolioImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isPaused, portfolioImages.length]);

  const nextSlide = () => {
    pauseCarousel();
    setCurrentSlide((prev) => (prev + 1) % portfolioImages.length);
  };

  const prevSlide = () => {
    pauseCarousel();
    setCurrentSlide((prev) => (prev - 1 + portfolioImages.length) % portfolioImages.length);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Início', href: '#home' },
    { name: 'Serviços', href: '#services' },
    { name: 'Preços', href: '#pricing' },
    { name: 'Dashboard', href: '#dashboard' },
    { name: 'Sobre Nós', href: '#about' },
    { name: 'Contato', href: '#contact' },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans selection:bg-emerald-500/30">
      {/* Navbar */}
      <header
        className={cn(
          'fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b',
          isScrolled
            ? 'bg-zinc-950/80 backdrop-blur-md border-zinc-800 py-4 shadow-lg shadow-emerald-900/10'
            : 'bg-transparent border-transparent py-6'
        )}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <a href="#home" className="flex items-center gap-3 group">
            <img 
              src={logo} 
              alt="Pires Consultoria Logo" 
              className="w-12 h-12 rounded-xl object-contain border border-lime-400/30 shadow-[0_0_15px_rgba(163,230,53,0.2)] group-hover:shadow-[0_0_25px_rgba(163,230,53,0.4)] transition-all bg-zinc-950"
            />
            <span className="font-bold text-sm sm:text-xl tracking-tight block">
              Pires <span className="text-lime-400">Consultoria e Gráfica</span>
              <span className="block text-[10px] sm:text-xs font-normal text-zinc-500 mt-0.5 sm:mt-1">CNPJ: 54.687.778/0001-40</span>
              <div className="relative group mt-1.5 inline-block">
                <div className={cn("px-2 py-0.5 text-[10px] font-medium rounded-full flex items-center gap-1.5 border animate-pulse", businessStatus.isOpen ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30" : "bg-red-500/10 text-red-400 border-red-500/30")}>
                  <div className={cn("w-1.5 h-1.5 rounded-full animate-pulse", businessStatus.isOpen ? "bg-emerald-500" : "bg-red-500")} />
                  {businessStatus.message}
                </div>
                <div className="absolute top-full left-0 mt-2 p-3 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none w-48 z-50 shadow-xl">
                  <p className="font-bold mb-1 text-white">Horário de Atendimento:</p>
                  <p>Segunda a Sexta: 9h às 18h</p>
                  <p>Sábados: 9h às 14h</p>
                  <p>Domingos e Feriados: Fechado</p>
                </div>
              </div>
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-zinc-400 hover:text-emerald-300 transition-all px-3 py-1 rounded-lg border border-transparent hover:border-emerald-500/50 hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:bg-emerald-500/10"
              >
                {link.name}
              </a>
            ))}
            <a
              href="https://wa.me/5581989818298" // WhatsApp
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 rounded-full bg-gradient-to-br from-emerald-400 via-emerald-500 to-emerald-700 text-zinc-950 font-bold text-sm hover:from-emerald-300 hover:via-emerald-400 hover:to-emerald-600 transition-all shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),inset_0_-2px_4px_rgba(0,0,0,0.4),0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[inset_0_2px_4px_rgba(255,255,255,0.5),inset_0_-2px_4px_rgba(0,0,0,0.5),0_0_30px_rgba(16,185,129,0.5)] flex items-center gap-2 border border-emerald-400/50"
            >
              <MessageCircle className="w-4 h-4" />
              Fale Conosco
            </a>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-zinc-400 hover:text-emerald-400 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-zinc-950/95 backdrop-blur-xl pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-semibold text-zinc-300 hover:text-emerald-400 transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="https://wa.me/5581989818298"
                target="_blank"
                rel="noreferrer"
                className="mt-4 px-6 py-4 rounded-xl bg-gradient-to-br from-emerald-400 via-emerald-500 to-emerald-700 text-zinc-950 font-bold text-center hover:from-emerald-300 hover:via-emerald-400 hover:to-emerald-600 transition-all shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),inset_0_-2px_4px_rgba(0,0,0,0.4)] flex items-center justify-center gap-2 border border-emerald-400/50"
              >
                <MessageCircle className="w-5 h-5" />
                Fale Conosco no WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* Hero Section */}
        <section id="home" className="relative pt-40 pb-20 md:pt-52 md:pb-32 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Animated Gradient Orbs */}
            <motion.div 
              className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px]"
              animate={{ 
                x: [0, 100, -50, 0],
                y: [0, -50, 100, 0],
                scale: [1, 1.1, 0.9, 1]
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div 
              className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-emerald-900/20 rounded-full blur-[100px]"
              animate={{ 
                x: [0, -80, 40, 0],
                y: [0, 60, -80, 0],
                scale: [1, 1.2, 0.8, 1]
              }}
              transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
            />
            
            {/* Subtle Particles */}
            {[...Array(20)].map((_, i) => {
              const left = `${(i * 17) % 100}%`;
              const top = `${(i * 23) % 100}%`;
              const duration = (i % 5) + 5;
              const delay = (i % 4) * 1.5;
              
              return (
                <motion.div
                  key={i}
                  className="absolute w-1.5 h-1.5 bg-emerald-400/30 rounded-full"
                  style={{ left, top }}
                  animate={{
                    y: [0, -100],
                    opacity: [0, 1, 0],
                    scale: [0, 1.5, 0]
                  }}
                  transition={{
                    duration,
                    repeat: Infinity,
                    ease: "linear",
                    delay
                  }}
                />
              );
            })}
          </div>
          
          <div className="w-full px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700 text-emerald-400 text-sm font-medium mb-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_4px_10px_rgba(0,0,0,0.5)]"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse" />
                Inovação e Tecnologia
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight"
              >
                Soluções completas em <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">
                  TI, Marketing e Gráfica
                </span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg md:text-xl text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed"
              >
                A Pires Consultoria e Gráfica transforma o seu negócio com tecnologia de ponta, tráfego pago estratégico e impressões de alta qualidade.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <a
                  href="#services"
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-br from-emerald-400 via-emerald-500 to-emerald-700 text-zinc-950 font-bold hover:from-emerald-300 hover:via-emerald-400 hover:to-emerald-600 transition-all shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),inset_0_-2px_4px_rgba(0,0,0,0.4),0_0_30px_rgba(16,185,129,0.3)] hover:shadow-[inset_0_2px_4px_rgba(255,255,255,0.5),inset_0_-2px_4px_rgba(0,0,0,0.5),0_0_40px_rgba(16,185,129,0.5)] hover:-translate-y-1 flex items-center justify-center gap-2 border border-emerald-400/50"
                >
                  Conheça Nossos Serviços
                  <ChevronRight className="w-5 h-5" />
                </a>
                <a
                  href="#contact"
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700 text-zinc-300 font-bold hover:from-zinc-700 hover:to-zinc-800 hover:text-white transition-all shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_4px_10px_rgba(0,0,0,0.5)] flex items-center justify-center"
                >
                  Falar com Especialista
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-24 bg-zinc-900/50 border-y border-zinc-800/50 relative">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Nossas Especialidades</h2>
              <p className="text-zinc-400 max-w-2xl mx-auto">
                Oferecemos um ecossistema completo para impulsionar a sua marca no mundo físico e digital.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
              {[
                {
                  icon: <Monitor className="w-8 h-8 drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]" />,
                  title: 'Consultoria em TI',
                  description: 'Soluções tecnológicas inteligentes para otimizar processos e escalar o seu negócio com segurança.',
                  subServices: ['Suporte Remoto', 'Redes Wifi e Cabeadas', 'Manutenção de Impressoras', 'Formatação de Notebooks e Desktops']
                },
                {
                  icon: <Printer className="w-8 h-8 drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]" />,
                  title: 'Gráfica Rápida',
                  description: 'Impressões de alta qualidade, materiais promocionais e corporativos com agilidade e precisão.',
                  subServices: ['Banners e Lonas', 'Cartões de Visita', 'Brindes Personalizados', 'Panfletos, Flyers e Folhetos']
                },
                {
                  icon: <TrendingUp className="w-8 h-8 drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]" />,
                  title: 'Tráfego Pago',
                  description: 'Estratégias avançadas de anúncios para atrair clientes qualificados e multiplicar suas vendas.',
                  subServices: ['Google e Meta Ads', 'Seguidores Orgânicos', 'Gestão de Redes Sociais', 'Material Para Campanhas']
                },
                {
                  icon: <Smartphone className="w-8 h-8 drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]" />,
                  title: 'Eletrônicos & Importados',
                  description: 'Os melhores produtos tecnológicos e importados com garantia e procedência.',
                  subServices: ['Celulares e Tablets', 'Produtos exclusivos', 'Perfumes Importados', 'Computadores e Notebooks']
                },
              ].map((service, index) => (
                <motion.div
                  key={index}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  initial="initial"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.5 }}
                  variants={{
                    initial: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: index * 0.1 } },
                  }}
                  className="p-8 rounded-3xl bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_10px_20px_rgba(0,0,0,0.5)] hover:border-emerald-500/50 hover:from-zinc-800 hover:to-zinc-900 transition-all duration-300 group hover:-translate-y-1 flex flex-col"
                >
                  <motion.div 
                    className="w-16 h-16 rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center text-emerald-400 mb-6 group-hover:from-emerald-400 group-hover:via-emerald-500 group-hover:to-emerald-700 group-hover:text-zinc-950 transition-all shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_4px_10px_rgba(0,0,0,0.5)] group-hover:shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),inset_0_-2px_4px_rgba(0,0,0,0.4),0_0_20px_rgba(16,185,129,0.4)] border border-zinc-700 group-hover:border-emerald-400/50"
                    animate={{ 
                      y: [0, -4, 0],
                      scale: [1, 1.05, 1]
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity, 
                      ease: "easeInOut",
                      delay: index * 0.2
                    }}
                  >
                    {service.icon}
                  </motion.div>
                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-zinc-400 leading-relaxed mb-6">
                    {service.description}
                  </p>
                  
                  {/* Branching Services */}
                  <motion.div
                    initial="initial"
                    animate={hoveredIndex === index ? "hover" : "initial"}
                    whileInView="hover"
                    viewport={{ once: false, amount: 0.5 }}
                    variants={{
                      initial: { height: 0, opacity: 0 },
                      hover: { height: 'auto', opacity: 1, transition: { duration: 0.3 } }
                    }}
                    className="overflow-hidden mt-auto border-t border-zinc-700 pt-4"
                  >
                    <p className="text-emerald-400 text-sm font-semibold mb-2">Alguns Serviços:</p>
                    <ul className="space-y-1">
                      {service.subServices.map((sub, i) => (
                        <li key={i} className="text-zinc-300 text-sm flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          {sub}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* Portfolio Carousel */}
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-10">
                <h3 className="text-2xl md:text-3xl font-bold mb-2">Portfólio Gráfico</h3>
                <p className="text-zinc-400">Confira alguns de nossos trabalhos</p>
                <p className="text-zinc-600 text-[10px] mt-2 uppercase tracking-widest">Imagens meramente ilustrativas</p>
              </div>

              <div className="relative group">
                <div className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950 shadow-2xl aspect-video md:aspect-[21/9] relative">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentSlide}
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      className="absolute inset-0"
                    >
                      <img 
                        src={portfolioImages[currentSlide].url} 
                        alt={portfolioImages[currentSlide].title}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80" />
                      <div className="absolute bottom-0 left-0 p-8 md:p-12">
                        <span className="text-emerald-400 font-mono text-sm mb-2 block uppercase tracking-wider">
                          {portfolioImages[currentSlide].category}
                        </span>
                        <h4 className="text-2xl md:text-4xl font-bold text-white">
                          {portfolioImages[currentSlide].title}
                        </h4>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Navigation Buttons */}
                  <button 
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-zinc-900/80 border border-zinc-700 text-white flex items-center justify-center hover:bg-emerald-500 hover:text-zinc-950 transition-all z-20 backdrop-blur-sm"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button 
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-zinc-900/80 border border-zinc-700 text-white flex items-center justify-center hover:bg-emerald-500 hover:text-zinc-950 transition-all z-20 backdrop-blur-sm"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>

                {/* Indicators */}
                <div className="flex justify-center gap-2 mt-6">
                  {portfolioImages.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => { pauseCarousel(); setCurrentSlide(i); }}
                      className={cn(
                        "w-2 h-2 rounded-full transition-all duration-300",
                        currentSlide === i ? "w-8 bg-emerald-500" : "bg-zinc-700 hover:bg-zinc-600"
                      )}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <Pricing />

        {/* About & Differentials Section */}
        <section id="about" className="py-24 relative overflow-hidden">
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 h-2/3 bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="lg:w-1/2">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-3xl md:text-5xl font-bold mb-6">
                    Por que escolher a <span className="text-emerald-500">Pires</span>?
                  </h2>
                  <p className="text-lg text-zinc-400 mb-8 leading-relaxed">
                    Somos a parceira ideal para empresas que buscam modernização, visibilidade e resultados concretos. Unimos tecnologia, marketing e produção gráfica em um só lugar.
                  </p>
                  
                  <div className="space-y-6">
                    {[
                      {
                        icon: <MapPin className="w-6 h-6 text-emerald-400 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]" />,
                        title: 'Presença Estratégica',
                        desc: (
                          <div className="flex flex-col gap-2 mt-1">
                            <a href="https://www.google.com/maps/search/?api=1&query=Pires+Consultoria+Olinda+PE" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors flex items-center gap-2">
                              <MapPin className="w-4 h-4" /> Matriz: Olinda - PE
                            </a>
                            <a href="https://www.google.com/maps/search/?api=1&query=Pires+Consultoria+Abreu+e+Lima+PE" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors flex items-center gap-2">
                              <MapPin className="w-4 h-4" /> Filial: Abreu e Lima - PE
                            </a>
                          </div>
                        ),
                      },
                      {
                        icon: <CreditCard className="w-6 h-6 text-emerald-400 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]" />,
                        title: 'Facilidade de Pagamento',
                        desc: 'Parcele seus projetos e compras em até 18x no cartão.',
                      },
                      {
                        icon: <Truck className="w-6 h-6 text-emerald-400 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]" />,
                        title: 'Logística Eficiente',
                        desc: 'Entregamos em toda a região metropolitana com rapidez e segurança.',
                      },
                    ].map((item, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center border border-zinc-700 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_4px_10px_rgba(0,0,0,0.5)]">
                          {item.icon}
                        </div>
                        <div>
                          <h4 className="text-xl font-bold mb-1">{item.title}</h4>
                          <div className="text-zinc-400">{item.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
              
              <div className="lg:w-1/2 w-full">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="relative rounded-3xl overflow-hidden border border-zinc-700 bg-gradient-to-br from-zinc-800 to-zinc-950 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_20px_40px_rgba(0,0,0,0.6)] aspect-square md:aspect-[4/3] flex items-center justify-center"
                >
                  {/* Abstract Tech Graphic */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                  
                  {/* Animated Grid Pan */}
                  <motion.div 
                    className="absolute inset-0 bg-[linear-gradient(to_right,#10b98112_1px,transparent_1px),linear-gradient(to_bottom,#10b98112_1px,transparent_1px)] bg-[size:48px_48px]"
                    animate={{ backgroundPosition: ['0px 0px', '48px 48px'] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  />

                  <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-emerald-500 opacity-20 blur-[100px]"></div>
                  
                  {/* Rotating Rings */}
                  <motion.div 
                    className="absolute m-auto left-0 right-0 top-0 bottom-0 w-[240px] h-[240px] rounded-full border border-dashed border-emerald-500/30"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  />
                  <motion.div 
                    className="absolute m-auto left-0 right-0 top-0 bottom-0 w-[280px] h-[280px] rounded-full border border-emerald-500/10"
                    animate={{ rotate: -360, scale: [1, 1.05, 1] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                  />

                  {/* Scanning Line */}
                  <motion.div 
                    className="absolute left-0 right-0 h-[2px] bg-emerald-500/50 blur-[1px]"
                    animate={{ top: ['0%', '100%', '0%'] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  />
                  
                  <div className="relative z-10 text-center p-8">
                    <motion.img 
                      src={logo} 
                      alt="Pires Consultoria Logo" 
                      className="w-32 h-32 mx-auto rounded-2xl mb-6 shadow-[0_0_30px_rgba(163,230,53,0.3)] border border-lime-400/30 object-contain bg-zinc-950"
                      animate={{ y: [-5, 5, -5] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <h3 className="text-2xl font-bold text-white mb-2">Pires Consultoria e Gráfica</h3>
                    <p className="text-lime-400 font-mono text-sm">TI • SM • GRÁFICA</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Dashboard Section */}
        <section id="dashboard" className="py-24 bg-zinc-950 relative">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-emerald-400">DASHBOARD EMPRESA PRO</h2>
              <p className="text-zinc-400 text-lg mb-8">
                O sistema de gestão da Pires Consultoria e Gráfica que atende perfeitamente a pizzarias, lanchonetes, restaurantes, hamburguerias, gráficas, armarinhos, variedades, assistência técnicas... Funciona com banco de dados SQL local e também nuvem de forma hibrida, conta com backup manual e automatico ao abrir e fechar o sistema tanto na nuvem como local, personalização de logomarca e fundo de tela, possui controle de estoque, sistema de mesas, pdv, delivery, Os (Ordem de Serviço), contas a pagar e receber, sistemas de relatório completo, calendário de entregas em tempo real, com integração de envio de status e mensagens para clientes via whatsapp de forma simplificada, suporte total para exportação em PDF, PLANILHA, impressões A4, bobinas térmica 80mm e 58mm, rodando em ambiente WINDOWS, LINUX E MACOS
              </p>
              <div className="flex flex-col items-center gap-3">
                <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4 mt-2 mb-2">
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-400 rounded-xl blur-lg opacity-75 animate-pulse"></div>
                    <a 
                      href="https://drive.google.com/file/d/1zYAVLSYD3SMx8K65z4Pksxc7culBcbnU/view?usp=sharing" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold py-4 px-8 rounded-xl transition-all duration-300 hover:scale-105 shadow-xl"
                    >
                      <Download className="w-5 h-5" />
                      BAIXAR VERSÃO WINDOWS
                      <div className="absolute -top-3 -right-3 bg-blue-600 text-white font-black text-[9px] sm:text-[10px] px-2 py-1 rounded-full shadow-[2px_2px_0px_rgba(0,0,0,1)] border-2 border-zinc-950 transform -rotate-6 z-10 whitespace-nowrap">
                        v15.04.2026
                      </div>
                    </a>
                  </div>
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-400 rounded-xl blur-lg opacity-75 animate-pulse"></div>
                    <a 
                      href="https://drive.google.com/file/d/1gQVkWezS2YRYsFSGswvQYe0RsnW-Z_ae/view?usp=sharing" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold py-4 px-8 rounded-xl transition-all duration-300 hover:scale-105 shadow-xl"
                    >
                      <Download className="w-5 h-5" />
                      BAIXAR VERSÃO LINUX
                      <div className="absolute -top-3 -right-3 bg-blue-600 text-white font-black text-[9px] sm:text-[10px] px-2 py-1 rounded-full shadow-[2px_2px_0px_rgba(0,0,0,1)] border-2 border-zinc-950 transform -rotate-6 z-10 whitespace-nowrap">
                        v15.04.2026
                      </div>
                    </a>
                  </div>
                  <div className="relative group mt-4 sm:mt-0">
                    <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-400 rounded-xl blur-lg opacity-75 animate-pulse"></div>
                    <div 
                      className="relative inline-flex items-center gap-2 bg-emerald-500 text-zinc-950 font-bold py-4 px-8 rounded-xl shadow-xl cursor-default opacity-90"
                    >
                      <Download className="w-5 h-5" />
                      BAIXAR VERSÃO MACOS
                      <div className="absolute -top-4 -right-4 bg-[#ff2a5f] text-white font-black text-[10px] sm:text-xs px-3 py-1.5 rounded-full shadow-[2px_2px_0px_rgba(0,0,0,1)] border-2 border-zinc-950 transform rotate-12 z-10 whitespace-nowrap">
                        EM BREVE
                      </div>
                    </div>
                  </div>
                </div>
                <span className="text-zinc-500 text-sm font-medium text-center">* INSTALE JÁ E TESTE POR 7 DIAS TOTALMENTE GRATUITO, COM TODAS AS FUNCIONALIDADES, SEM COMPROMISSO!</span>
                <span className="text-red-500 font-bold text-center">PRIMEIRO ACESSO: LOGIN - admin / SENHA - 123</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {dashboardFeatures.map((feature) => (
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: feature.id * 0.1 }}
                  onClick={() => setSelectedDashboard(feature)}
                  className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 hover:border-emerald-500/50 hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(16,185,129,0.2)] transition-all cursor-pointer relative"
                >
                  {feature.isNew && (
                    <div className="absolute -top-3 -right-3 bg-gradient-to-br from-lime-400 to-emerald-500 text-zinc-950 font-black text-xs px-3 py-1.5 rounded-lg shadow-[0_5px_15px_rgba(163,230,53,0.4)] border border-lime-300 transform rotate-12 z-10">
                      NOVO!
                    </div>
                  )}
                  <div className="aspect-video bg-zinc-800 rounded-xl overflow-hidden border border-zinc-700 mb-4">
                    <img 
                      src={feature.image} 
                      alt={feature.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <h4 className="text-lg font-semibold text-white">{feature.title}</h4>
                  <p className="text-zinc-400 text-sm">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Dashboard Modal */}
        <AnimatePresence>
          {selectedDashboard && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
              onClick={() => setSelectedDashboard(null)}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
                onClick={(e) => e.stopPropagation()}
              >
                <button 
                  onClick={() => setSelectedDashboard(null)}
                  className="absolute top-4 right-4 text-zinc-400 hover:text-white"
                >
                  <X className="w-8 h-8" />
                </button>
                <img 
                  src={selectedDashboard.image} 
                  alt={selectedDashboard.title}
                  className="w-full rounded-xl mb-6 border border-zinc-700"
                  referrerPolicy="no-referrer"
                />
                <h3 className="text-3xl font-bold text-white mb-2">{selectedDashboard.title}</h3>
                <p className="text-zinc-400 text-lg">{selectedDashboard.description}</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-24 bg-zinc-900/30 border-t border-zinc-800/50 relative">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">O Que Dizem Nossos Clientes</h2>
              <p className="text-zinc-400 max-w-2xl mx-auto">
                Histórias de sucesso de quem confiou na Pires Consultoria para alavancar seus resultados.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "Misslany Cristina",
                  company: "Cliente",
                  text: "Atendimento nota 100000 super atencioso o Diego. Tira todas as nossas dúvidas . Material de qualidade. Com certeza ganhou uma cliente 🙏",
                  rating: 5
                },
                {
                  name: "Jéssica Santos",
                  company: "Cliente",
                  text: "Excelente atendimento, rapidez e eficiência no que se propõe a fazer, entrega qualidade nos seus serviços.",
                  rating: 5
                },
                {
                  name: "JPaty E Giulyo Alves",
                  company: "Cliente",
                  text: "A melhor gráfica de Caetés 1. Atendimentos excepcional e muito responsável na entrega.",
                  rating: 5
                }
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.15, ease: "easeOut" }}
                  whileHover={{ y: -5 }}
                  className="p-8 rounded-3xl bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 relative group hover:border-emerald-500/50 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex flex-col"
                >
                  <Quote className="absolute top-6 right-6 w-12 h-12 text-zinc-800 group-hover:text-emerald-500/20 transition-colors duration-300" />
                  <div className="relative z-10 flex-1 flex flex-col">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 font-bold text-xl border border-emerald-500/20 shrink-0">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-white">{testimonial.name}</h4>
                        <p className="text-sm text-emerald-400">{testimonial.company}</p>
                      </div>
                    </div>
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-zinc-400 leading-relaxed italic flex-1">
                      "{testimonial.text}"
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-16 text-center">
              <a 
                href="https://www.google.com/search?sca_esv=3f9b988949b33d18&sxsrf=ANbL-n60W1Y_4bW6JbrWU7Y6b-ZmO10gWA:1773785768310&si=AL3DRZEsmMGCryMMFSHJ3StBhOdZ2-6yYkXd_doETEE1OR-qOTtGdsdiF1SwNDgxLSIiBbmYWNdQ3folQ72ncSfkuTIEHopvvRVxi-3E8hXyhTXeiEPzDCnWAOofDAxViNs5GyKW6YgdsqQucqSWQRMpQKusTp_kvIvVcVDcFvMRzZOCVAHIYpo%3D&q=Pires+Consultoria+e+Gr%C3%A1fica+Matriz+Olinda+Coment%C3%A1rios&sa=X&ved=2ahUKEwj7woL1-qeTAxXBBrkGHeRpDywQ0bkNegQISRAH&biw=1897&bih=911&dpr=1.35" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-zinc-800 hover:bg-zinc-700 text-white rounded-full font-bold transition-all border border-zinc-700 hover:border-emerald-500/50 shadow-lg hover:shadow-emerald-500/20"
              >
                Ver mais avaliações no Google
                <ChevronRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="contact" className="py-24 relative">
          <div className="container mx-auto px-6">
            <div className="bg-gradient-to-br from-emerald-900/40 to-zinc-900 border border-emerald-500/20 rounded-3xl p-8 md:p-16 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none"></div>
              
              <h2 className="text-3xl md:text-5xl font-bold mb-6 relative z-10">Pronto para transformar seu negócio?</h2>
              <p className="text-xl text-zinc-300 mb-10 max-w-2xl mx-auto relative z-10">
                Entre em contato com a nossa equipe de especialistas e descubra como podemos ajudar você a alcançar o próximo nível.
              </p>
              <a
                href="https://wa.me/5581989818298"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-br from-emerald-400 via-emerald-500 to-emerald-700 text-zinc-950 font-bold hover:from-emerald-300 hover:via-emerald-400 hover:to-emerald-600 transition-all shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),inset_0_-2px_4px_rgba(0,0,0,0.4),0_0_30px_rgba(16,185,129,0.3)] hover:shadow-[inset_0_2px_4px_rgba(255,255,255,0.5),inset_0_-2px_4px_rgba(0,0,0,0.5),0_0_40px_rgba(16,185,129,0.5)] hover:-translate-y-1 relative z-10 border border-emerald-400/50"
              >
                <MessageCircle className="w-5 h-5 drop-shadow-[0_1px_1px_rgba(255,255,255,0.5)]" />
                Iniciar Atendimento
              </a>
            </div>
          </div>
        </section>
      </main>

      <PartnersSection />

      {/* Footer */}
      <footer className="bg-zinc-950 pt-20 pb-10 border-t border-zinc-900">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-12 md:gap-x-12 lg:gap-x-0 mb-16">
            <div className="lg:col-span-2 lg:pr-12 lg:border-r border-lime-400/30">
              <a href="#home" className="flex items-center gap-3 mb-6">
                <img 
                  src={logo} 
                  alt="Pires Consultoria Logo" 
                  className="w-10 h-10 rounded-lg object-contain border border-lime-400/30 shadow-[0_0_15px_rgba(163,230,53,0.2)] bg-zinc-950"
                />
                <span className="font-bold text-xl tracking-tight">
                  Pires <span className="text-lime-400">Consultoria e Gráfica</span>
                  <span className="block text-xs font-normal text-zinc-500 mt-1">CNPJ: 54.687.778/0001-40</span>
                </span>
              </a>
              <p className="text-zinc-400 max-w-sm mb-6">
                Soluções integradas em Tecnologia da Informação, Marketing Digital (Tráfego Pago) e Gráfica Rápida.
              </p>
              <h4 className="text-lg font-bold mb-6 text-white">E-mail</h4>
              <a href="mailto:contato@piresconsultoriaegrafica.com.br" className="flex items-start gap-2 text-zinc-400 hover:text-emerald-400 transition-colors mb-8">
                <Mail className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <span>contato@piresconsultoriaegrafica.com.br</span>
              </a>
              <div className="flex items-center gap-4">
                <a href="https://www.instagram.com/piresconsultoriaegrafica/" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400 hover:bg-emerald-500 hover:text-zinc-950 transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="https://www.facebook.com/people/Pires-Consultoria-em-Ti-Sm-e-Gr%C3%A1fica-R%C3%A1pida/61555367639012/" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400 hover:bg-emerald-500 hover:text-zinc-950 transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="https://www.tiktok.com/@pires.consultoria94?_r=1&_t=ZS-95jjHxsYgVk" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400 hover:bg-emerald-500 hover:text-zinc-950 transition-colors">
                  <TikTokIcon className="w-5 h-5" />
                </a>
                <a href="https://k.kwai.com/u/@piresconsultoria/vnFQyCm3" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400 hover:bg-emerald-500 hover:text-zinc-950 transition-colors">
                  <KwaiIcon className="w-5 h-5" />
                </a>
                <a href="https://www.youtube.com/@PiresConsultoriaeGr%C3%A1fica" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400 hover:bg-emerald-500 hover:text-zinc-950 transition-colors">
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>
            
            <div className="lg:px-12 lg:border-r border-lime-400/30">
              <h4 className="text-lg font-bold mb-6 text-white">Links Rápidos</h4>
              <ul className="space-y-4">
                <li><a href="#home" className="text-zinc-400 hover:text-emerald-400 transition-colors">Início</a></li>
                <li><a href="#services" className="text-zinc-400 hover:text-emerald-400 transition-colors">Serviços</a></li>
                <li><a href="#pricing" className="text-zinc-400 hover:text-emerald-400 transition-colors">Preços</a></li>
                <li><a href="#dashboard" className="text-zinc-400 hover:text-emerald-400 transition-colors">Dashboard</a></li>
                <li><a href="#about" className="text-zinc-400 hover:text-emerald-400 transition-colors">Sobre Nós</a></li>
                <li><a href="#contact" className="text-zinc-400 hover:text-emerald-400 transition-colors">Contato</a></li>
              </ul>
            </div>
            
            <div className="lg:pl-12">
              <h4 className="text-lg font-bold mb-6 text-white">Unidades</h4>
              <ul className="space-y-4 text-zinc-400">
                <li>
                  <a href="https://www.google.com/maps/search/?api=1&query=Pires+Consultoria+Olinda+PE" target="_blank" rel="noreferrer" className="flex items-start gap-2 hover:text-emerald-400 transition-colors">
                    <MapPin className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Matriz: Olinda - PE</span>
                  </a>
                </li>
                <li>
                  <a href="https://www.google.com/maps/search/?api=1&query=Pires+Consultoria+Abreu+e+Lima+PE" target="_blank" rel="noreferrer" className="flex items-start gap-2 hover:text-emerald-400 transition-colors">
                    <MapPin className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Filial 1: Abreu e Lima - PE</span>
                  </a>
                </li>
              </ul>
              <h4 className="text-lg font-bold mt-8 mb-6 text-white">Horário de Atendimento</h4>
              <div className="flex items-start gap-2 text-zinc-400">
                <Clock className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <div className="text-sm space-y-1">
                  <p>Segunda a Sexta: 9h às 18h</p>
                  <p>Sábados: 9h às 14h</p>
                  <p>Domingos e Feriados: Fechado</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-zinc-500 text-sm">
              © {new Date().getFullYear()} Pires Consultoria em TI & SM e Gráfica Rápida. Todos os direitos reservados.
            </p>
            <p className="text-zinc-500 text-sm flex items-center gap-1">
              Feito com <span className="text-emerald-500">♥</span> e Tecnologia
            </p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/5581989818298"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-br from-[#25D366] to-[#128C7E] text-white rounded-full flex items-center justify-center shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),inset_0_-2px_4px_rgba(0,0,0,0.4),0_4px_20px_rgba(37,211,102,0.4)] hover:scale-110 transition-transform hover:shadow-[inset_0_2px_4px_rgba(255,255,255,0.5),inset_0_-2px_4px_rgba(0,0,0,0.5),0_4px_25px_rgba(37,211,102,0.6)] border border-[#25D366]/50"
      >
        <MessageCircle className="w-7 h-7 drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]" />
      </a>

    </div>
  );
}

