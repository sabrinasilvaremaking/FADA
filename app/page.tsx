'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { Star, Menu } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';

const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];
const landonEase: [number, number, number, number] = [0.76, 0, 0.24, 1];

function Preloader({ onComplete }: { onComplete: () => void }) {
  return (
    <motion.div 
      initial={{ y: 0 }}
      animate={{ y: "-100%" }}
      transition={{ duration: 1.2, ease: landonEase, delay: 1.5 }}
      onAnimationComplete={onComplete}
      className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center pointer-events-none"
    >
      <div className="overflow-hidden">
        <motion.div
           initial={{ y: "100%" }}
           animate={{ y: 0 }}
           transition={{ duration: 1, ease: smoothEase, delay: 0.2 }}
           className="text-white font-serif text-3xl md:text-5xl"
        >
           Fada Studio
        </motion.div>
      </div>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-6 w-48 h-px bg-white/20 relative overflow-hidden"
      >
        <motion.div 
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ duration: 1, ease: "linear", delay: 0.6 }}
          className="absolute inset-0 bg-white"
        />
      </motion.div>
    </motion.div>
  )
}

function TextReveal({ text, className = "", delay = 0, isSerif = false }: { text: string, className?: string, delay?: number, isSerif?: boolean }) {
  const words = text.split(" ");
  return (
    <div className={`flex flex-wrap leading-tight ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="overflow-hidden inline-flex mr-[0.25em] mb-1">
          <motion.span
            initial={{ y: "110%", rotateZ: 3 }}
            whileInView={{ y: 0, rotateZ: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1.2, ease: landonEase, delay: delay + i * 0.05 }}
            className={`inline-block origin-bottom-left ${isSerif ? 'font-serif' : ''}`}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </div>
  );
}

function ParallaxImage({ src, alt, className = "" }: { src: string, alt: string, className?: string }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  
  return (
    <div ref={ref} className={`overflow-hidden relative ${className}`}>
      <motion.div style={{ y, height: "130%", top: "-15%" }} className="absolute inset-0 w-full">
        <Image src={src} alt={alt} fill className="object-cover" referrerPolicy="no-referrer" />
      </motion.div>
    </div>
  );
}

function Navbar() {
  return (
    <motion.nav 
      initial={{ y: "-100%" }}
      animate={{ y: 0 }}
      transition={{ duration: 1.2, ease: landonEase, delay: 2 }}
      className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-zinc-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center group">
              <div className="relative flex items-center justify-start w-40 h-16 md:w-48 md:h-16 transition-opacity group-hover:opacity-70">
                <Image 
                  src="https://i.imgur.com/wcHo7ne.png" 
                  alt="Fada Studio" 
                  fill 
                  className="object-contain md:object-left"
                  referrerPolicy="no-referrer"
                />
              </div>
            </Link>
          </div>
          <div className="hidden md:flex space-x-8 items-center">
            <Link href="/" className="text-sm uppercase tracking-widest font-medium transition-colors hover:text-black text-zinc-500 hover:scale-105 transform inline-block">
              O Estúdio
            </Link>
            <Link href="/" className="text-sm uppercase tracking-widest font-medium transition-colors hover:text-black text-zinc-500 hover:scale-105 transform inline-block">
              Serviços
            </Link>
            <Link href="/" className="text-sm uppercase tracking-widest font-medium transition-colors hover:text-black text-zinc-500 hover:scale-105 transform inline-block">
              Contactos
            </Link>
            <Link href="https://pt.zappysoftware.com/m/fadastudio" target="_blank" className="inline-flex items-center justify-center whitespace-nowrap font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-black text-white hover:bg-white hover:text-black border border-black transition-all duration-300 h-9 px-4 text-xs uppercase tracking-wider relative overflow-hidden group">
              <span className="relative z-10 transition-colors duration-300 group-hover:text-black">Reserva Online</span>
              <div className="absolute inset-0 bg-white transform scale-y-0 origin-bottom transition-transform duration-500 ease-out group-hover:scale-y-100" />
            </Link>
          </div>
          <div className="flex md:hidden items-center">
            <button className="text-black hover:text-zinc-600 focus:outline-none">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [0.6, 0]);

  return (
    <section ref={ref} className="relative h-[100dvh] flex items-center justify-center overflow-hidden bg-black text-white">
      <motion.div style={{ y }} className="absolute inset-0 z-0 h-[120dvh] top-[-10dvh]">
        <motion.div style={{ opacity }} className="absolute inset-0 z-10 bg-black" />
        <Image 
          src="https://i.imgur.com/xbz0hZW.png"
          alt="Hero"
          fill
          className="hidden md:block object-cover scale-105"
          referrerPolicy="no-referrer"
          priority
        />
        <Image 
          src="https://i.imgur.com/xbz0hZW.png"
          alt="Hero Mobile"
          fill
          className="block md:hidden object-cover scale-105"
          referrerPolicy="no-referrer"
          priority
        />
      </motion.div>
      
      <div className="relative z-10 w-full px-6 md:px-12 h-[100dvh] flex flex-col justify-between pb-4 md:pb-8 pt-24 md:pt-28 text-white pointer-events-none">
        <div className="flex justify-between items-start text-[0.55rem] md:text-xs uppercase tracking-[0.3em] font-light opacity-70 shrink-0 overflow-hidden">
          <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 1, delay: 2.2, ease: smoothEase }}>
            Aveiro, PT
          </motion.div>
        </div>
        
        <div className="flex flex-col items-center justify-center flex-1 py-8 overflow-hidden pointer-events-auto">
          <div className="mb-6 md:mb-8 text-center flex flex-col items-center w-full">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }} 
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }} 
              transition={{ duration: 2, ease: landonEase, delay: 1.8 }}
              className="mb-2 md:mb-4 flex items-center justify-center w-full"
            >
              <div className="relative flex items-center justify-center w-[50vw] max-w-[250px] h-[50vw] max-h-[250px] md:w-[35vh] md:max-w-[500px] md:h-[35vh] lg:w-[40vh] lg:h-[40vh]">
                <Image 
                  src="https://i.imgur.com/wcHo7ne.png" 
                  alt="Fada Studio"
                  fill
                  className="object-contain invert brightness-0 drop-shadow-2xl"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
          </div>
        </div>

        <div className="flex justify-center items-end mt-4 shrink-0 overflow-hidden h-16">
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const { scrollY } = useScroll();
  const x1 = useTransform(scrollY, [0, 2000], [0, -400]);
  const x2 = useTransform(scrollY, [0, 2000], [-400, 0]);

  return (
    <div className="bg-white text-black py-8 border-b border-zinc-100 overflow-hidden flex flex-col gap-6 whitespace-nowrap">
       <motion.div style={{ x: x1 }} className="flex space-x-12 px-4 items-center opacity-80 min-w-max">
          {[...Array(4)].map((_, i) => (
            <span key={i} className="text-sm md:text-base font-serif tracking-[0.1em] flex items-center">
              ELEVAMOS A SUA ESTÉTICA PRESERVANDO A SUA SAÚDE NATURAL.
              <Star className="w-4 h-4 ml-12 opacity-50" />
            </span>
          ))}
       </motion.div>
       <motion.div style={{ x: x2 }} className="flex space-x-12 px-4 items-center opacity-80 min-w-max hidden md:flex">
          {[...Array(4)].map((_, i) => (
            <span key={i} className="text-sm md:text-base font-serif tracking-[0.1em] flex items-center text-zinc-400">
              ELEVAMOS A SUA ESTÉTICA PRESERVANDO A SUA SAÚDE NATURAL.
              <Star className="w-4 h-4 ml-12 opacity-50" />
            </span>
          ))}
       </motion.div>
    </div>
  );
}

function Principles() {
  const list = [
    { title: "Assepsia", text: "Protocolos rigorosos e esterilização clínica de todos os instrumentos de manicure." },
    { title: "Pureza", text: "Vernizes e produtos premium livres de componentes tóxicos ou químicos agressores." },
    { title: "Precisão", text: "Tratamento perfeito da cutícula, simetria e arquitetura da unha estudada ao milímetro." }
  ];
  return (
    <section className="bg-zinc-50 py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
          {list.map((item, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1, ease: landonEase, delay: i * 0.2 }}
              className="flex flex-col items-center text-center group"
            >
              <div className="overflow-hidden mb-6">
                <motion.span 
                  initial={{ y: "100%" }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: smoothEase, delay: 0.2 + i * 0.2 }}
                  className="block text-xs tracking-[0.3em] font-light uppercase text-zinc-400 font-mono"
                >
                  0{i+1}
                </motion.span>
              </div>
              <h3 className="font-serif text-3xl mb-4 group-hover:scale-105 transition-transform duration-500 ease-out">{item.title}</h3>
              <p className="text-zinc-500 font-light leading-relaxed max-w-xs">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  const [active, setActive] = useState<number | null>(null);

  const services = [
    { title: "Alinhamento Russo Nude", image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=800", desc: "Nivelamento térmico e cobertura nude ultrabrilhante. Foco em simetria de cutículas de forma totalmente assética e indolor." },
    { title: "Verniz Gel", image: "https://i.imgur.com/5fvJhG8.jpeg", desc: "Acabamento de alto brilho e resistência prolongada sem lascar, garantindo unhas impecáveis por semanas." },
    { title: "Banho de Gel Fortalecedor", image: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&q=80&w=800", desc: "Aperfeiçoamento estrutural de unhas mais fracas ou quebradiças, conferindo resistência extrema." },
    { title: "Nail Art Personalizada", image: "https://images.unsplash.com/photo-1519014816548-bf5fe059e98b?auto=format&fit=crop&q=80&w=800", desc: "Design minimalista e elegante criado à mão livre, combinando estética e personalidade na medida certa." },
    { title: "Coleção de Gel Hemma-Free", image: "https://images.unsplash.com/photo-1516975080661-46bacece8ea6?auto=format&fit=crop&q=80&w=800", desc: "Fórmulas livres de monómeros tóxicos, ideais para peles sensíveis, mantendo o brilho incomparável." },
    { title: "Extensão em Fibra de Vidro", image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=800", desc: "Extremidades ultrafinas e estruturadas com alta durabilidade e aspeto totalmente natural." },
  ];

  // Disable scroll when modal is open
  useEffect(() => {
    if (active !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [active]);

  return (
    <>
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24 flex flex-col items-center">
            <TextReveal text="Coleção de Assinatura" className="font-serif text-4xl md:text-5xl lg:text-7xl mb-8 justify-center" isSerif />
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4 }}
              className="w-12 h-[1px] bg-black mb-8"
            />
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.6 }}
              className="text-zinc-500 font-light max-w-2xl mx-auto text-sm md:text-base leading-relaxed"
            >
              Imersão estética e rigor clínico criados à medida. Filtre as nossas artes de assinatura.
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-20">
            {services.map((svc, i) => (
               <motion.div 
                  key={i} 
                  layoutId={`card-${i}`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-5%" }}
                  transition={{ duration: 1.2, ease: landonEase, delay: (i % 3) * 0.15 }}
                  className="group cursor-pointer flex flex-col"
                  onClick={() => setActive(i)}
               >
                  <motion.div layoutId={`image-container-${i}`} className="aspect-[4/5] bg-zinc-100 mb-6 overflow-hidden relative rounded-sm">
                     <motion.img layoutId={`image-${i}`} src={svc.image} alt={svc.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                     <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-700 z-10" />
                  </motion.div>
                  <div className="overflow-hidden mb-2">
                    <motion.h3 
                      layoutId={`title-${i}`}
                      className="font-serif text-xl md:text-2xl opacity-95 group-hover:opacity-100 transition-opacity tracking-wide block m-0"
                    >
                      {svc.title}
                    </motion.h3>
                  </div>
                  <motion.p 
                    layoutId={`desc-${i}`}
                    className="text-zinc-500 font-light text-sm leading-relaxed m-0"
                  >
                    {svc.desc}
                  </motion.p>
               </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {active !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-12 pointer-events-auto"
          >
             <div 
               className="absolute inset-0 bg-white/90 backdrop-blur-md cursor-pointer" 
               onClick={() => setActive(null)} 
             />
             
             <motion.div 
                layoutId={`card-${active}`} 
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="relative bg-white z-10 max-w-5xl w-full max-h-[90vh] shadow-2xl overflow-hidden rounded-sm flex flex-col md:flex-row"
             >
                <div className="w-full md:w-1/2 aspect-square md:aspect-auto md:h-[90vh]">
                    <motion.div layoutId={`image-container-${active}`} className="w-full h-full relative">
                        <motion.img layoutId={`image-${active}`} src={services[active].image} alt={services[active].title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </motion.div>
                </div>
                <div className="p-8 md:p-16 w-full md:w-1/2 flex flex-col justify-center bg-white overflow-y-auto max-h-[50vh] md:max-h-[90vh]">
                   <div className="overflow-hidden mb-6">
                     <motion.h3 
                       layoutId={`title-${active}`} 
                       className="font-serif text-3xl md:text-5xl text-black m-0"
                     >
                       {services[active].title}
                     </motion.h3>
                   </div>
                   <motion.p 
                     layoutId={`desc-${active}`} 
                     className="text-zinc-600 font-light leading-relaxed mb-12 text-base md:text-lg m-0"
                   >
                     {services[active].desc}
                   </motion.p>
                   <motion.div
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0, y: 10 }}
                     transition={{ delay: 0.2 }}
                   >
                     <Link href="https://pt.zappysoftware.com/m/fadastudio" target="_blank" className="group relative inline-flex items-center justify-center whitespace-nowrap font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-black bg-white border border-black hover:border-transparent h-14 px-10 text-xs uppercase tracking-[0.2em] transition-all duration-500 overflow-hidden mb-6 md:mb-12 w-full md:w-auto">
                        <span className="relative z-10 transition-colors duration-500 group-hover:text-white">Reservar</span>
                        <div className="absolute inset-0 bg-black transform scale-y-0 origin-bottom transition-transform duration-500 ease-out group-hover:scale-y-100" />
                     </Link>
                   </motion.div>
                   <motion.button 
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     exit={{ opacity: 0 }}
                     onClick={() => setActive(null)} 
                     className="self-start uppercase tracking-[0.3em] text-[0.65rem] font-light pb-1 border-b border-black/20 hover:border-black text-zinc-500 hover:text-black transition-all"
                   >
                     Fechar Visão
                   </motion.button>
                </div>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Quote() {
  return (
    <section className="py-32 md:py-48 bg-zinc-50 text-center px-6 relative flex flex-col justify-center items-center overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <TextReveal 
          text="O nível de perfeccionismo e o cuidado com as minhas unhas transformaram por completo a minha experiência num salão. Um verdadeiro refúgio analógico." 
          className="text-3xl md:text-5xl lg:text-6xl justify-center" 
          isSerif 
        />
      </div>
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.8, ease: landonEase }}
        className="mt-16 text-xs uppercase tracking-[0.3em] font-mono text-zinc-400 flex items-center gap-4"
      >
        <span className="w-8 h-px bg-zinc-300"></span>
        Opinião Verificada
        <span className="w-8 h-px bg-zinc-300"></span>
      </motion.div>
    </section>
  );
}

function Cta() {
  return (
    <section className="py-40 md:py-56 bg-black text-white text-center px-6 relative overflow-hidden flex flex-col justify-center items-center">
      <div className="absolute inset-0 z-0 opacity-40">
        <ParallaxImage src="https://images.unsplash.com/photo-1519014816548-bf5fe059e98b?auto=format&fit=crop&q=80&w=1920" alt="Ambiente Relaxante" className="w-full h-full grayscale brightness-50" />
      </div>
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        <TextReveal text="Desperte O Melhor de Si" className="text-5xl md:text-7xl lg:text-8xl mb-16 justify-center" isSerif />
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 1, delay: 0.5, ease: landonEase }}
        >
          <Link href="https://pt.zappysoftware.com/m/fadastudio" target="_blank" className="group relative inline-flex items-center justify-center whitespace-nowrap font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-black bg-white h-16 px-12 text-xs uppercase tracking-[0.2em] transition-all duration-500 overflow-hidden">
             <span className="relative z-10 transition-colors duration-500 group-hover:text-white">Agendar Momento</span>
             <div className="absolute inset-0 bg-zinc-900 transform scale-y-0 origin-bottom transition-transform duration-500 ease-out group-hover:scale-y-100" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-white pt-24 pb-12 px-6 border-t border-zinc-100">
       <div className="max-w-7xl mx-auto flex flex-col items-center text-center gap-16 mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 1, ease: landonEase }} 
            className="max-w-md flex flex-col items-center"
          >
             <Image 
               src="https://i.imgur.com/wcHo7ne.png"
               alt="Fada Studio"
               width={160}
               height={64}
               className="mb-8 origin-center animate-flap transition-all"
               referrerPolicy="no-referrer"
             />
             <p className="text-zinc-500 font-light text-sm leading-relaxed">
               Hemma & TPO free ! Não fazemos unhas, cuidamos delas. Uma experiência de luxo para a saúde e beleza das suas mãos.
             </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 1, ease: landonEase, delay: 0.2 }} 
            className="flex flex-col sm:flex-row justify-center gap-16 md:gap-32 w-full text-center sm:text-left"
          >
             <div>
                <h4 className="text-sm uppercase tracking-widest font-semibold mb-6">Explore</h4>
                <ul className="space-y-4 text-zinc-500 font-light text-sm">
                  <li className="overflow-hidden"><Link href="/" className="hover:text-black transition-colors block hover:-translate-y-0.5 transform duration-300">Início</Link></li>
                  <li className="overflow-hidden"><Link href="/" className="hover:text-black transition-colors block hover:-translate-y-0.5 transform duration-300">O Estúdio</Link></li>
                  <li className="overflow-hidden"><Link href="/" className="hover:text-black transition-colors block hover:-translate-y-0.5 transform duration-300">Serviços</Link></li>
                  <li className="overflow-hidden"><Link href="/" className="hover:text-black transition-colors block hover:-translate-y-0.5 transform duration-300">Contactos</Link></li>
                </ul>
             </div>
             <div>
                <h4 className="text-sm uppercase tracking-widest font-semibold mb-6">Contactos</h4>
                <ul className="space-y-4 text-zinc-500 font-light text-sm">
                  <li>Rua Gustavo Ferreira Pinto Basto 15,<br/>Aveiro, 3810-009</li>
                  <li>⏰ Todos os dias | 09h às 20h (Por marcação)</li>
                  <li><a href="https://wa.me/351928116651" target="_blank" className="hover:text-black transition-colors">WhatsApp: +351 928 116 651</a></li>
                  <li><a href="tel:+351300505149" className="hover:text-black transition-colors">Tel: +351 300 505 149</a></li>
                  <li><a href="https://instagram.com/fadastudio.pt" target="_blank" className="hover:text-black transition-colors">IG: @fadastudio.pt</a></li>
                </ul>
             </div>
          </motion.div>
       </div>
       <motion.div 
         initial={{ opacity: 0 }} 
         whileInView={{ opacity: 1 }} 
         viewport={{ once: true }} 
         transition={{ duration: 1, delay: 0.5 }}
         className="max-w-7xl mx-auto border-t border-zinc-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-light text-zinc-400"
       >
          <p>© 2026 Fada Studio. Todos os direitos reservados.</p>
          <p className="tracking-[0.2em] uppercase">Concebido com precisão absoluta.</p>
       </motion.div>
    </footer>
  );
}

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <AnimatePresence>
        {loading && <Preloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Marquee />
        <Principles />
        <Services />
        <Quote />
        <Cta />
      </main>
      <Footer />
    </div>
  );
}
