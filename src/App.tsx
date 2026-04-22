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
  Youtube,
  ShieldCheck,
  Users,
  ShoppingCart,
  LayoutGrid,
  Bike,
  BarChart3,
  ClipboardList,
  Settings,
  Calendar,
  Wrench,
  Eye,
  Tag,
  Box,
  BookOpen,
  PieChart,
  Maximize2,
  ZoomIn
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
  const [selectedDashboard, setSelectedDashboard] = useState<{id: number, title: string, description: string, image: string, qualities?: string[], icon?: React.ReactNode, isNew?: boolean} | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [currentZoomImage, setCurrentZoomImage] = useState<string | null>(null);

const dashboardFeatures = [
    { 
      id: 1, 
      title: "Login Multusuários", 
      icon: <ShieldCheck className="w-5 h-5" />, 
      description: "Gestão robusta de segurança com hierarquia de acesso, logs de auditoria e recuperação mestre em tempo real.", 
      image: "/dashboard-1.jpg",
      qualities: ["Hierarquia de Acesso", "Logs de Atividade", "Segurança Criptografada", "Senha Master"]
    },
    { 
      id: 2, 
      title: "Painel de Atendimento", 
      icon: <Users className="w-5 h-5" />, 
      description: "Controle dinâmico de produtividade com visão Kanban, sistema drag & drop e fila de produção inteligente.", 
      image: "/dashboard-2.jpg",
      qualities: ["Visualização Kanban", "Status em Tempo Real", "Atalhos Inteligentes", "Gráficos de Fluxo"]
    },
    { 
      id: 3, 
      title: "PDV (Venda Rápida)", 
      icon: <ShoppingCart className="w-5 h-5" />, 
      description: "Terminal de vendas ultra-veloz com suporte a múltiplos pagamentos, descontos flexíveis e busca instantânea de itens.", 
      image: "/dashboard-3.jpg",
      qualities: ["Múltiplos Pagamentos", "Descontos Item/Geral", "Busca Instantânea", "Faturamento Rápido"]
    },
    { 
      id: 4, 
      title: "MESAS (Salão)", 
      icon: <LayoutGrid className="w-5 h-5" />, 
      description: "Gestão completa do salão com controle de consumo ativo, tempo de permanência e status de higienização automatizado.", 
      image: "/dashboard-4.jpg", 
      isNew: true,
      qualities: ["Status de Consumo", "Tempo de Mesa", "Reserva Dinâmica", "Controle de Cozinha"]
    },
    { 
      id: 5, 
      title: "DELIVERY", 
      icon: <Bike className="w-5 h-5" />, 
      description: "Integração omnicanal para pedidos via WhatsApp e balcão com rastreamento logístico e alertas de entrega automáticos.", 
      image: "/dashboard-5.jpg", 
      isNew: true,
      qualities: ["Fila de Entrega Pro", "Cálculo de Taxas", "Integração WhatsApp", "Logística de Motoboys"]
    },
    { 
      id: 6, 
      title: "FINANCEIRO", 
      icon: <BarChart3 className="w-5 h-5" />, 
      description: "Controle monetário rigoroso com fluxo de caixa, DRE automatizado e dashboards de lucratividade avançada.", 
      image: "/dashboard-6.jpg",
      qualities: ["Fluxo de Caixa", "DRE Automático", "Relatórios PDF/Excel", "Gestão de Contas"]
    },
    { 
      id: 7, 
      title: "PEDIDOS", 
      icon: <ClipboardList className="w-5 h-5" />, 
      description: "Pipeline de vendas otimizado para transformar cotações em pedidos finalizados com agilidade e total rastreabilidade.", 
      image: "/dashboard-7.jpg",
      qualities: ["Conversão de Cotação", "Filtros Avançados", "Histórico Completo", "Gestão de Status"]
    },
    { 
      id: 8, 
      title: "GESTÃO", 
      icon: <Settings className="w-5 h-5" />, 
      description: "Inteligência de mercado com curva ABC de produtos, análise de performance de vendas e fidelização de clientes VIP.", 
      image: "/dashboard-8.jpg",
      qualities: ["Curva ABC", "Gestão de Estoque", "Ranking Financeiro", "Fidelidade VIP"]
    },
    { 
      id: 9, 
      title: "CALENDÁRIO", 
      icon: <Calendar className="w-5 h-5" />, 
      description: "Planejamento logístico centralizado com alertas inteligentes de prazos e visão 360° de todos os agendamentos.", 
      image: "/dashboard-9.jpg",
      qualities: ["Alertas de Prazos", "Visão Mensal/Semanal", "Lembretes Automáticos", "Gestão de Datas"]
    },
    { 
      id: 10, 
      title: "ORDEM DE SERVIÇO", 
      icon: <Wrench className="w-5 h-5" />, 
      description: "Sistema técnico completo com anexos fotográficos, laudos detalhados e rastreio de solução para assistências técnicas.", 
      image: "/dashboard-10.jpg", 
      isNew: true,
      qualities: ["Laudo Técnico Pro", "Anexo de Imagens", "Checklist de Entrada", "Status de Reparo"]
    },
    { 
      id: 11, 
      title: "MÓDULO ÓTICA", 
      icon: <Eye className="w-5 h-5" />, 
      description: "Especialização para óticas com receitas digitais detalhadas, controle de laboratórios e histórico refrativo integrado.", 
      image: "/dashboard-11.jpg", 
      isNew: true,
      qualities: ["Receituário Completo", "Ficha Médica D+E", "Venda de Lentes", "Controle Ótico"]
    },
    { 
      id: 12, 
      title: "ETIQUETAS", 
      icon: <Tag className="w-5 h-5" />, 
      description: "Personalização de rótulos e códigos de barras com suporte a múltiplas bobinas e impressoras térmicas de mercado.", 
      image: "/dashboard-12.jpg", 
      isNew: true,
      qualities: ["Código de Barras/QR", "Impressão Térmica", "Etiquetas Atacado", "Logomarca Própria"]
    },
    { 
      id: 13, 
      title: "COMANDA ELETRÔNICA", 
      icon: <Smartphone className="w-5 h-5" />, 
      description: "Mobilidade total para atendimento via app móvel, reduzindo erros de pedido e acelerando o fluxo de cozinha e bar.", 
      image: "/dashboard-13.jpg", 
      isNew: true,
      qualities: ["App para Garçom", "Impressão Remota", "Fechamento de Mesa", "Sincronia Instantânea"]
    },
    { 
      id: 14, 
      title: "CARDÁPIO DIGITAL", 
      icon: <BookOpen className="w-5 h-5" />, 
      description: "Menu virtual interativo com imagens de alta definição e navegação por categorias que estimulam o consumo médio.", 
      image: "/dashboard-14.jpg", 
      isNew: true,
      qualities: ["Link Interativo", "QR Code Dinâmico", "Imagens em 4K", "Filtros de Categoria"]
    },
    { 
      id: 15, 
      title: "DASHBOARD GERENTE BI", 
      icon: <PieChart className="w-5 h-5" />, 
      description: "Análises avançadas com dashboards de lucratividade, projeções de metas e análise de retorno sobre investimento estratégico em tempo real.", 
      image: "/dashboard-15.jpg", 
      isNew: true,
      qualities: ["Indicadores de Negócio", "Projeção de Metas", "Retorno em Tempo Real", "Ranking de Lucro"]
    },
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
        <section id="dashboard" className="py-32 bg-[#020202] relative overflow-hidden">
          {/* Hardware Background Elements */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 1.5px 1.5px, #10b981 1.5px, transparent 0)', backgroundSize: '48px 48px' }} />
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="flex flex-col lg:flex-row items-end justify-between mb-20 gap-10">
              <div className="max-w-3xl">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2 mb-6"
                >
                  <span className="px-4 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono uppercase tracking-[0.2em]">
                    v20.04.2026
                  </span>
                  <div className="flex items-center gap-2 ml-4">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse" />
                    <span className="text-zinc-500 text-[10px] font-mono uppercase tracking-widest opacity-70">Sistema em Operação</span>
                  </div>
                </motion.div>
                
                <h2 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tighter leading-[0.9] text-white">
                  DASHBOARD <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-300 to-white">
                    EMPRESA PRO
                  </span>
                </h2>
                
                <p className="text-zinc-400 text-xl leading-relaxed max-w-2xl font-light">
                  A solução definitiva de <span className="text-emerald-400 font-medium">Inteligência ERP</span> para a gestão 360° do seu negócio. Automatize complexidades com <span className="text-white font-medium">PDV Multi-canais, Delivery Integrado, Controle de Estoque Rigoroso, Gestão Avançada de Mesas, Ordens de Serviço (OS)</span> e um ecossistema financeiro completo com relatórios estratégicos em tempo real.
                </p>
              </div>

              <div className="flex flex-col gap-6 w-full lg:w-auto">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-5 rounded-3xl bg-zinc-900/30 border border-zinc-800/50 backdrop-blur-xl shadow-2xl">
                    <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest mb-2 opacity-60">Arquitetura</p>
                    <div className="text-white font-mono text-sm flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      SQL Híbrido
                    </div>
                  </div>
                  <div className="p-5 rounded-3xl bg-zinc-900/30 border border-zinc-800/50 backdrop-blur-xl shadow-2xl">
                    <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest mb-2 opacity-60">Sincronia</p>
                    <div className="text-white font-mono text-sm flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      Nuvem Automática
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.a 
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    href="https://drive.google.com/file/d/1aKrjYPKgEajOUjd_uCfzQ9F-ggOKxN4L/view?usp=sharing" 
                    target="_blank"
                    className="flex-1 inline-flex items-center justify-center gap-3 bg-emerald-500 text-zinc-950 font-black py-4 px-10 rounded-2xl transition-all shadow-[0_10px_30px_rgba(16,185,129,0.2)] hover:bg-emerald-400"
                  >
                    <Download className="w-5 h-5" />
                    WINDOWS
                  </motion.a>
                  <motion.a 
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    href="https://drive.google.com/file/d/1ZtKGNHloGustvSwb_MczFjYWy941ZhX9/view?usp=sharing" 
                    target="_blank"
                    className="flex-1 inline-flex items-center justify-center gap-3 bg-white/5 text-white border border-white/10 backdrop-blur-md font-bold py-4 px-10 rounded-2xl transition-all hover:bg-white/10"
                  >
                    <Download className="w-5 h-5" />
                    LINUX
                  </motion.a>
                </div>
                
                <p className="text-[11px] text-zinc-500 text-center font-mono opacity-50 uppercase tracking-widest mt-2">
                  * Licença de teste grátis por 7 dias
                </p>
                <div className="flex items-center justify-center gap-2 mt-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                  <Maximize2 size={12} className="text-emerald-500 animate-pulse" />
                  <span className="text-[10px] text-zinc-400 font-medium uppercase tracking-wider">Clique nos cards para ampliar as imagens</span>
                </div>
              </div>
            </div>

            {/* Bento Grid Features */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 auto-rows-[220px]">
              {dashboardFeatures.map((feature, idx) => {
                // Bento Layout Logic
                const isVerticalLarge = [2, 5, 10, 13].includes(feature.id);
                const isHorizontalLarge = [1, 6, 8, 14, 15].includes(feature.id);
                
                let colSpan = "md:col-span-12 lg:col-span-3";
                let rowSpan = "row-span-1";

                if (isVerticalLarge) rowSpan = "row-span-2";
                if (isHorizontalLarge) colSpan = "md:col-span-12 lg:col-span-6";

                return (
                  <motion.div
                    key={feature.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    onClick={() => setSelectedDashboard(feature)}
                    className={cn(
                      "group relative bg-zinc-900/20 border border-white/[0.03] rounded-[2.5rem] overflow-hidden cursor-pointer hover:border-emerald-500/30 transition-all duration-700 shadow-2xl",
                      colSpan,
                      rowSpan
                    )}
                  >
                    {/* Background Visual */}
                    <div className="absolute inset-0 z-0">
                      <img 
                        src={feature.image} 
                        alt={feature.title}
                        className="w-full h-full object-cover grayscale opacity-10 group-hover:grayscale-0 group-hover:opacity-40 group-hover:scale-110 transition-all duration-1000 ease-out"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
                    </div>

                    {/* Content Layer */}
                    <div className="absolute inset-0 p-8 flex flex-col z-10">
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-zinc-950 transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]">
                          {feature.icon || <Box className="w-6 h-6" />}
                        </div>
                        {feature.isNew && (
                          <span className="px-3 py-1 rounded-lg bg-emerald-500 text-zinc-950 text-[10px] font-black uppercase tracking-tighter shadow-lg">
                            NOVO
                          </span>
                        )}
                      </div>
                      
                      <div className="mt-auto">
                        <div className="flex items-center gap-2 mb-2 text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity">
                          <ZoomIn size={12} />
                          <span className="text-[10px] font-bold uppercase tracking-widest">Clique para ver detalhes</span>
                        </div>
                        <h4 className="text-2xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors tracking-tight">
                          {feature.title}
                        </h4>
                        <p className={cn(
                          "text-zinc-400 leading-snug transition-all duration-700 font-light",
                          (isHorizontalLarge || isVerticalLarge || feature.id === 1) 
                            ? "text-base opacity-90" 
                            : "text-sm opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0"
                        )}>
                          {feature.description}
                        </p>
                      </div>
                    </div>

                    {/* Glossy Edge Overlay */}
                    <div className="absolute inset-0 pointer-events-none border border-white/[0.05] rounded-[2.5rem]" />
                  </motion.div>
                );
              })}
            </div>

            {/* Support / Credentials Banner */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="mt-20 p-8 md:p-12 rounded-[3.5rem] bg-gradient-to-br from-zinc-900/50 to-emerald-900/10 border border-white/[0.05] backdrop-blur-2xl flex flex-col lg:flex-row items-center justify-between gap-10 shadow-3xl"
            >
              <div className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left max-w-2xl">
                <div className="w-20 h-20 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shadow-inner">
                  <ShieldCheck className="w-10 h-10 text-emerald-400" />
                </div>
                <div>
                  <h5 className="text-2xl font-bold text-white mb-2 tracking-tight">Primeiro acesso facilitado</h5>
                  <p className="text-zinc-400 text-lg font-light leading-relaxed">
                    Instale em poucos minutos e comece a gerenciar seu negócio agora. Utilize as credenciais padrão abaixo para acessar todas as funcionalidades imediatamente.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row items-stretch gap-4 w-full lg:w-auto">
                <div className="flex flex-col items-center bg-zinc-950/80 px-8 py-5 rounded-3xl border border-white/[0.05] flex-1">
                  <span className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest mb-2">Usuário</span>
                  <code className="text-emerald-400 font-mono text-xl font-bold">admin</code>
                </div>
                <div className="flex flex-col items-center bg-zinc-950/80 px-8 py-5 rounded-3xl border border-white/[0.05] flex-1">
                  <span className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest mb-2">SENHA</span>
                  <code className="text-emerald-400 font-mono text-xl font-bold">123</code>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Dashboard Modal */}
        <AnimatePresence>
          {selectedDashboard && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-md"
              onClick={() => setSelectedDashboard(null)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="bg-zinc-950 border border-white/10 rounded-[3rem] p-8 md:p-12 max-w-5xl w-full max-h-[90vh] overflow-y-auto relative shadow-[0_30px_100px_rgba(0,0,0,0.8)]"
                onClick={(e) => e.stopPropagation()}
              >
                <button 
                  onClick={() => setSelectedDashboard(null)}
                  className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-all z-20"
                >
                  <X className="w-6 h-6" />
                </button>

                <div className="flex flex-col lg:flex-row gap-12 items-start">
                  <div className="lg:w-1/2 space-y-8">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                        {selectedDashboard.icon || <Box className="w-8 h-8" />}
                      </div>
                      <div>
                        <span className="text-emerald-500 text-[10px] uppercase font-bold tracking-[0.3em] mb-1 block">Recurso do Sistema</span>
                        <h3 className="text-4xl font-black text-white tracking-tight">{selectedDashboard.title}</h3>
                      </div>
                    </div>
                    
                    <p className="text-zinc-400 text-xl leading-relaxed font-light">
                      {selectedDashboard.description}
                    </p>

                    <div className="pt-8 border-t border-white/5">
                      <div className="flex items-center gap-4 mb-6">
                        <span className="w-3 h-3 rounded-full bg-emerald-500" />
                        <div className="text-white font-medium uppercase text-sm tracking-widest">Qualidades do Módulo</div>
                      </div>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {(selectedDashboard.qualities || ['Sincronização Cloud', 'Relatórios PDF', 'Exportação Excel', 'Interface Responsiva']).map((item) => (
                          <li key={item} className="flex items-center gap-3 text-zinc-500 text-sm">
                            <div className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button 
                      onClick={() => setSelectedDashboard(null)}
                      className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-all"
                    >
                      Voltar ao Painel
                    </button>
                  </div>

                  <div className="lg:w-1/2 w-full">
                    <div 
                      onClick={() => setCurrentZoomImage(selectedDashboard.image)}
                      className="rounded-[2rem] overflow-hidden border border-white/10 shadow-3xl bg-zinc-900 aspect-video relative group cursor-zoom-in"
                    >
                      <img 
                        src={selectedDashboard.image} 
                        alt={selectedDashboard.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform scale-90 group-hover:scale-100">
                        <div className="px-6 py-3 bg-zinc-950/80 backdrop-blur-xl border border-white/10 rounded-full text-white font-bold flex items-center gap-2 shadow-2xl">
                          <Maximize2 size={20} className="text-emerald-500" />
                          Ampliar Imagem
                        </div>
                      </div>
                    </div>
                    <p className="text-zinc-600 text-[10px] uppercase tracking-[0.2em] mt-4 text-center">Visualização de Interface v20.04.2026</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Full Screen Image Zoom Lightbox */}
        <AnimatePresence>
          {currentZoomImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
              onClick={() => setCurrentZoomImage(null)}
            >
              <button 
                onClick={() => setCurrentZoomImage(null)}
                className="absolute top-10 right-10 w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all z-[210] border border-white/10"
              >
                <X className="w-8 h-8" />
              </button>

              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="relative max-w-[95vw] max-h-[85vh] rounded-2xl overflow-hidden shadow-[0_0_100px_rgba(16,185,129,0.2)] bg-zinc-900 border border-white/5"
                onClick={(e) => e.stopPropagation()}
              >
                <img 
                  src={currentZoomImage} 
                  alt="Interface Ampliada"
                  className="w-full h-full object-contain cursor-default"
                  referrerPolicy="no-referrer"
                />
                
                {/* Image Navigation Hint */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full bg-zinc-950/80 backdrop-blur-md border border-white/10 text-zinc-400 text-xs font-medium flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                  Visualização em Alta Definição
                </div>
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

