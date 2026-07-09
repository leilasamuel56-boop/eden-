/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import {
  Sparkles,
  MapPin,
  Phone,
  Clock,
  Calendar,
  User,
  Users,
  Check,
  Star,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Instagram,
  Facebook,
  MessageSquare,
  ArrowUp,
  Menu,
  X,
  Gift,
  Award,
  Info,
  Heart,
  FileText
} from "lucide-react";
import { COMPANY_INFO, SERVICES, WELLNESS_PACKAGES, BRIDAL_PACKAGES, REVIEWS } from "./data";
import { Service, WellnessPackage, BookingDetails, BridalPackage } from "./types";

// Safe Image component with elegant vector/gradient fallback on error
function ImageWithFallback({
  src,
  alt,
  className,
  ...props
}: React.ImgHTMLAttributes<HTMLImageElement>) {
  const [imgSrc, setImgSrc] = useState(src);
  const [isError, setIsError] = useState(false);

  const handleError = () => {
    if (!isError) {
      setIsError(true);
      // Fallback to a highly elegant abstract wellness vector graphic with warm luxury gold gradients
      setImgSrc(
        "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='600' height='400' viewBox='0 0 600 400'><rect width='100%' height='100%' fill='%23faf7f2'/><circle cx='300' cy='180' r='100' fill='%23eadeca' opacity='0.4' filter='blur(30px)'/><path d='M150 280 C 250 240, 350 320, 450 280' stroke='%23c5a880' stroke-width='2.5' fill='none' opacity='0.6'/><path d='M200 300 C 280 270, 320 330, 400 300' stroke='%23829384' stroke-width='1.5' fill='none' opacity='0.4'/><circle cx='300' cy='140' r='15' fill='%23c5a880' opacity='0.7'/></svg>"
      );
    }
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      onError={handleError}
      loading="lazy"
      referrerPolicy="no-referrer"
      {...props}
    />
  );
}

export default function App() {
  // Navigation & Category States
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);



  // Loyalty Program interactive simulator
  const [stamps, setStamps] = useState<number>(3); // Starts at 3 for fun interactivity

  // Selection states for the Reservation Form
  const [selectedItem, setSelectedItem] = useState<{
    id: string;
    name: string;
    price: number;
    type: "service" | "package";
  }>({
    id: SERVICES[0].id,
    name: SERVICES[0].name,
    price: SERVICES[0].priceFCFA,
    type: "service"
  });

  const [bookingForm, setBookingForm] = useState<BookingDetails>({
    clientName: "",
    preferredDate: "",
    preferredTime: "",
    peopleCount: 1,
    notes: ""
  });

  const [bookingFeedback, setBookingFeedback] = useState<string | null>(null);

  // Countdown timer state for the Monthly Promo
  const [timeLeft, setTimeLeft] = useState({
    days: 14,
    hours: 18,
    minutes: 42,
    seconds: 59
  });

  // Load categories dynamically
  const categories = ["All", ...Array.from(new Set(SERVICES.map((s) => s.category)))];

  // Initialize countdown
  useEffect(() => {
    const target = new Date();
    target.setDate(target.getDate() + COMPANY_INFO.offerMonthCountdownDays);
    target.setHours(23, 59, 59, 999);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const diff = target.getTime() - now;

      if (diff <= 0) {
        clearInterval(timer);
        return;
      }

      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days: d, hours: h, minutes: m, seconds: s });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Monitor scroll for back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Set selected item and scroll to booking form
  const handleSelectForBooking = (
    id: string,
    name: string,
    price: number,
    type: "service" | "package"
  ) => {
    try {
      setSelectedItem({ id, name, price, type });
      const bookingSection = document.getElementById("reservation-anchor");
      if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    } catch (e) {
      console.error("Scroll error:", e);
    }
  };

  // Select monthly promo automatically and scroll
  const handleSelectMonthlyPromo = () => {
    handleSelectForBooking(
      "promo-month",
      "Offre Spéciale du Mois : Massage Signature (90 min) + Jacuzzi Privé",
      50000,
      "package"
    );
  };

  // Trigger real WhatsApp redirection with clean structured data
  const handleConfirmReservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingForm.clientName.trim()) {
      setBookingFeedback("Veuillez saisir votre nom pour finaliser.");
      return;
    }
    if (!bookingForm.preferredDate) {
      setBookingFeedback("Veuillez choisir une date souhaitée.");
      return;
    }
    if (!bookingForm.preferredTime) {
      setBookingFeedback("Veuillez choisir une heure de rendez-vous.");
      return;
    }

    try {
      // Structure the luxury message template beautifully
      const formattedPrice = selectedItem.price.toLocaleString("fr-FR") + " FCFA";
      const message = `Bonjour Eden SPA Ouaga ! ✨
Je souhaite réserver le soin d'exception suivant :

🌸 Prestation : ${selectedItem.name}
💰 Tarif estimé : ${formattedPrice}

👤 Nom complet : ${bookingForm.clientName}
📅 Date souhaitée : ${bookingForm.preferredDate}
🕒 Heure souhaitée : ${bookingForm.preferredTime}
👥 Nombre de personnes : ${bookingForm.peopleCount}
📝 Note / Demande particulière : ${bookingForm.notes || "Aucune"}

Merci de me confirmer la disponibilité !`;

      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodedMessage}`;

      // Show temporary successful feedback
      setBookingFeedback("Redirection vers WhatsApp en cours...");
      setTimeout(() => {
        setBookingFeedback(null);
      }, 3000);

      window.open(whatsappUrl, "_blank");
    } catch (err) {
      console.error("WhatsApp redirection failed:", err);
      setBookingFeedback("Une erreur est survenue lors de la redirection.");
    }
  };



  return (
    <div id="app-root" className="min-h-screen bg-luxury-cream text-luxury-charcoal selection:bg-luxury-gold/30 font-sans antialiased pb-12">
      
      {/* HEADER SECTION */}
      <header id="main-header" className="sticky top-0 z-50 bg-luxury-cream/80 backdrop-blur-md border-b border-luxury-gold/10 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo Brand */}
          <a href="#accueil" className="flex flex-col group" id="logo-brand">
            <span className="font-serif text-xl sm:text-2xl font-bold tracking-widest text-luxury-charcoal group-hover:text-luxury-gold transition-colors duration-300">
              EDEN SPA
            </span>
            <span className="text-[10px] uppercase tracking-[0.25em] text-luxury-gold-dark font-medium -mt-1 pl-0.5">
              by Nour Cosmétique
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav id="desktop-nav" className="hidden md:flex items-center space-x-8">
            <a href="#accueil" className="text-xs uppercase tracking-widest font-medium hover:text-luxury-gold transition-colors duration-200">Accueil</a>
            <a href="#services" className="text-xs uppercase tracking-widest font-medium hover:text-luxury-gold transition-colors duration-200">Services & Tarifs</a>
            <a href="#forfaits" className="text-xs uppercase tracking-widest font-medium hover:text-luxury-gold transition-colors duration-200">Forfaits</a>
            <a href="#fidelite" className="text-xs uppercase tracking-widest font-medium hover:text-luxury-gold transition-colors duration-200">Fidélité</a>
            <a href="#avis" className="text-xs uppercase tracking-widest font-medium hover:text-luxury-gold transition-colors duration-200">Avis</a>
            <a href="#contact" className="text-xs uppercase tracking-widest font-medium hover:text-luxury-gold transition-colors duration-200">Contact</a>
          </nav>

          {/* Direct WhatsApp Call Action */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="text-right">
              <p className="text-[10px] text-luxury-taupe uppercase tracking-widest font-medium">Réservations directes</p>
              <a href={`tel:${COMPANY_INFO.phoneSecondary}`} className="text-sm font-mono text-luxury-gold-dark hover:underline" id="phone-link">
                {COMPANY_INFO.phoneSecondary}
              </a>
            </div>
            <a
              href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=Bonjour%20Eden%20SPA%20Ouaga%20!%20Je%20souhaite%20obtenir%20des%20renseignements.`}
              target="_blank"
              rel="noreferrer"
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs uppercase tracking-wider px-4 py-2.5 rounded-full flex items-center gap-2 font-medium transition-all duration-300"
              id="cta-whatsapp-header"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-luxury-charcoal hover:text-luxury-gold transition-colors focus:outline-none"
            aria-label="Toggle Menu"
            id="mobile-menu-trigger"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Panel */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-luxury-cream border-b border-luxury-gold/10 px-4 py-6 space-y-4 animate-fadeIn" id="mobile-nav">
            <div className="flex flex-col space-y-4">
              <a
                href="#accueil"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm uppercase tracking-wider font-medium text-luxury-charcoal hover:text-luxury-gold block py-1"
              >
                Accueil
              </a>
              <a
                href="#services"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm uppercase tracking-wider font-medium text-luxury-charcoal hover:text-luxury-gold block py-1"
              >
                Services & Tarifs
              </a>
              <a
                href="#forfaits"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm uppercase tracking-wider font-medium text-luxury-charcoal hover:text-luxury-gold block py-1"
              >
                Forfaits
              </a>
              <a
                href="#fidelite"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm uppercase tracking-wider font-medium text-luxury-charcoal hover:text-luxury-gold block py-1"
              >
                Fidélité
              </a>
              <a
                href="#avis"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm uppercase tracking-wider font-medium text-luxury-charcoal hover:text-luxury-gold block py-1"
              >
                Avis Clients
              </a>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm uppercase tracking-wider font-medium text-luxury-charcoal hover:text-luxury-gold block py-1"
              >
                Contact & Localisation
              </a>
            </div>

            <div className="pt-4 border-t border-luxury-gold/10 flex flex-col gap-3">
              <a
                href={`tel:${COMPANY_INFO.phoneSecondary}`}
                className="flex items-center gap-2 text-xs font-mono text-luxury-taupe py-2"
              >
                <Phone className="w-4 h-4 text-luxury-gold" />
                <span>{COMPANY_INFO.phoneSecondary} (Appel)</span>
              </a>
              <a
                href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=Bonjour%20Eden%20SPA%20Ouaga%20!%20Je%20souhaite%20réserver%20un%20soin.`}
                target="_blank"
                rel="noreferrer"
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-center py-3 rounded-xl flex items-center justify-center gap-2 text-sm font-medium"
                id="cta-whatsapp-mobile-nav"
              >
                <MessageSquare className="w-5 h-5" />
                <span>Réserver via WhatsApp</span>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* HERO SECTION WITH SMOOTH PARALLAX LOOK */}
      <section id="accueil" className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Ambient Darkened Image Overlay */}
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1600&auto=format&fit=crop"
            alt="Eden Spa ambiance sereine"
            className="w-full h-full object-cover scale-105 transition-transform duration-[10000ms] ease-out hover:scale-100"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-luxury-charcoal/95 via-luxury-charcoal/80 to-transparent md:to-luxury-charcoal/30"></div>
          {/* subtle golden sparkles in background */}
          <div className="absolute bottom-10 left-10 text-white/50 animate-pulse hidden md:block">
            <Sparkles className="w-12 h-12 text-luxury-gold opacity-30" />
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full flex flex-col md:flex-row items-center gap-12">
          {/* Main Hero Copy */}
          <div className="w-full md:w-3/5 text-left text-white space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-luxury-gold/20 backdrop-blur-md rounded-full border border-luxury-gold/30 text-luxury-gold text-xs uppercase tracking-widest font-semibold" id="badge-top-hero">
              <Sparkles className="w-3.5 h-3.5 text-luxury-gold" />
              <span>L'Éveil des Sens à Ouagadougou</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6.5xl leading-tight font-medium tracking-wide" id="hero-title">
              Une parenthèse de <br className="hidden sm:inline" />
              <span className="italic text-luxury-gold font-light">bien-être absolu</span> <br />
              au cœur de Ouaga 2000
            </h1>

            <p className="text-sm sm:text-base text-gray-200/90 font-light max-w-xl leading-relaxed">
              Découvrez un sanctuaire de relaxation haut de gamme signé <strong>Nour Cosmétique</strong>. Massages d'exception, rituels jacuzzi en duo et soins divins pour sublimer votre éclat naturel.
            </p>

            {/* Quick Metrics */}
            <div className="flex flex-wrap gap-6 pt-2 text-white">
              <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/10">
                <div className="flex text-amber-400">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                </div>
                <span className="text-xs font-mono font-medium">4,9/5 (14 avis Google)</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/10">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                <span className="text-xs text-emerald-400 font-medium font-mono">Ferme à 20h00</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <a
                href="#services"
                className="bg-luxury-gold hover:bg-luxury-gold-dark text-luxury-charcoal text-center px-8 py-4 rounded-xl text-sm font-semibold uppercase tracking-wider transition-all duration-300 transform hover:scale-[1.02]"
                id="hero-cta-services"
              >
                Découvrir la Carte
              </a>
              <a
                href="#reservation-anchor"
                className="bg-white/10 hover:bg-white/20 text-white text-center border border-white/20 px-8 py-4 rounded-xl text-sm font-semibold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2"
                id="hero-cta-book"
              >
                <Calendar className="w-4 h-4" />
                <span>Prendre Rendez-vous</span>
              </a>
            </div>
          </div>

          {/* Luxury Showcase Interactive Widget */}
          <div className="w-full md:w-2/5 flex justify-center">
            <div className="bg-luxury-charcoal/90 backdrop-blur-lg border border-luxury-gold/30 p-6 rounded-2xl max-w-sm w-full text-white text-center luxury-box-shadow space-y-4 transform rotate-1 hover:rotate-0 transition-transform duration-500" id="hero-mini-widget">
              <div className="w-12 h-12 bg-luxury-gold/10 border border-luxury-gold/30 rounded-full flex items-center justify-center mx-auto text-luxury-gold mb-1">
                <Gift className="w-6 h-6 animate-bounce" />
              </div>
              <h3 className="font-serif text-xl text-luxury-gold font-semibold">Le Privilège Eden</h3>
              <p className="text-xs text-gray-300 font-light leading-relaxed">
                Rejoignez notre programme de fidélité. Cumulez des précieux tampons à chaque visite et bénéficiez de votre <strong>6ème soin offert ou à -50%</strong> !
              </p>
              <div className="pt-2">
                <a
                  href="#fidelite"
                  className="inline-flex items-center gap-1.5 text-xs text-luxury-gold hover:text-white font-medium underline uppercase tracking-wider"
                >
                  <span>Simuler ma carte</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MONTHLY OFFER BANNER WITH DYNAMIC COUNTDOWN */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20" id="offre-mois-sec">
        <div className="bg-gradient-to-r from-luxury-taupe to-luxury-charcoal text-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-luxury-gold/30 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          
          {/* Promo Copy */}
          <div className="space-y-4 max-w-xl text-center lg:text-left">
            <div className="inline-block bg-terracotta-medium/20 text-terracotta-medium px-3 py-1 rounded-full text-xs uppercase tracking-widest font-semibold border border-terracotta-medium/30">
              L'Offre Privilège du Mois
            </div>
            <h2 className="font-serif text-2xl sm:text-3.5xl font-semibold text-luxury-gold">
              Rituel Cocon Impérial : Duo ou Solo
            </h2>
            <p className="text-sm text-gray-300 leading-relaxed font-light">
              Profitez d'un <strong>Massage Signature Eden (90 min)</strong> suivi de <strong>45 minutes de Jacuzzi Privatif</strong> avec collation royale offerte. Économisez plus de 15 000 FCFA sur ce rituel de prestige.
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-xs font-mono pt-1 text-gray-200">
              <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-luxury-gold" /> Durée totale : 2h15</span>
              <span className="flex items-center gap-1.5 text-luxury-gold"><Check className="w-3.5 h-3.5" /> Serviettes, nectars de fruits & mignardises inclus</span>
            </div>
          </div>

          {/* Countdown & Price booking */}
          <div className="flex flex-col items-center bg-white/5 border border-white/10 rounded-2xl p-6 w-full lg:w-96 text-center space-y-4">
            
            <p className="text-xs uppercase tracking-widest text-luxury-gold font-medium">Temps restant pour réserver</p>
            
            {/* Countdown grid */}
            <div className="grid grid-cols-4 gap-3 w-full" id="countdown-grid">
              <div className="bg-luxury-charcoal/80 border border-luxury-gold/20 rounded-xl p-2.5">
                <span className="block font-mono text-xl sm:text-2xl font-bold text-luxury-gold">{String(timeLeft.days).padStart(2, "0")}</span>
                <span className="text-[9px] uppercase text-gray-400">Jours</span>
              </div>
              <div className="bg-luxury-charcoal/80 border border-luxury-gold/20 rounded-xl p-2.5">
                <span className="block font-mono text-xl sm:text-2xl font-bold text-luxury-gold">{String(timeLeft.hours).padStart(2, "0")}</span>
                <span className="text-[9px] uppercase text-gray-400">Heures</span>
              </div>
              <div className="bg-luxury-charcoal/80 border border-luxury-gold/20 rounded-xl p-2.5">
                <span className="block font-mono text-xl sm:text-2xl font-bold text-luxury-gold">{String(timeLeft.minutes).padStart(2, "0")}</span>
                <span className="text-[9px] uppercase text-gray-400">Min</span>
              </div>
              <div className="bg-luxury-charcoal/80 border border-luxury-gold/20 rounded-xl p-2.5">
                <span className="block font-mono text-xl sm:text-2xl font-bold text-luxury-gold">{String(timeLeft.seconds).padStart(2, "0")}</span>
                <span className="text-[9px] uppercase text-gray-400">Sec</span>
              </div>
            </div>

            {/* Price tag & Call to action */}
            <div className="w-full pt-2 flex items-center justify-between border-t border-white/10">
              <div className="text-left">
                <span className="text-[10px] uppercase tracking-wider text-gray-400 line-through">65 000 FCFA</span>
                <span className="block font-serif text-xl sm:text-2xl font-bold text-luxury-gold">50 000 FCFA</span>
              </div>
              <button
                onClick={handleSelectMonthlyPromo}
                className="bg-luxury-gold hover:bg-luxury-gold-dark text-luxury-charcoal px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider font-bold transition-colors duration-300"
                id="btn-book-monthly-promo"
              >
                En profiter
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* SERVICES & TARIFS SECTION */}
      <section id="services" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <p className="text-[11px] uppercase tracking-[0.2em] text-luxury-gold-dark font-semibold">Une Offre Exclusive de Bien-Être</p>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-luxury-charcoal">La Carte de Nos Soins d'Exception</h2>
          <div className="w-16 h-[1.5px] bg-luxury-gold mx-auto"></div>
          <p className="text-sm text-luxury-taupe font-light">
            Découvrez nos tarifs clairs et transparents en Francs CFA (FCFA) pour planifier sereinement votre moment de pure évasion.
          </p>
        </div>

        {/* Dynamic Category Filtering Tabs */}
        <div className="flex flex-wrap justify-center gap-2 border-b border-luxury-gold/10 pb-4" id="category-tabs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs uppercase tracking-widest font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-luxury-gold text-luxury-charcoal font-semibold shadow-sm"
                  : "bg-white text-luxury-taupe border border-luxury-gold/15 hover:bg-luxury-sand/50"
              }`}
            >
              {cat === "All" ? "Tous nos soins" : cat}
            </button>
          ))}
        </div>

        {/* Services Grid with Image & Book triggers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="services-grid">
          {SERVICES.filter((s) => activeCategory === "All" || s.category === activeCategory).map((service) => {
            const isMassage = service.category === "Massages d'Exception";
            const durationLabel = isMassage ? "01H" : `${service.durationMin} Min`;

            return (
              <article
                key={service.id}
                className="bg-white rounded-t-2xl rounded-b-2xl overflow-hidden border border-luxury-gold/10 luxury-box-shadow flex flex-col justify-between luxury-card-hover"
                id={`service-card-${service.id}`}
              >
                <div>
                  {/* Image Wrap */}
                  <div className="relative h-[220px] w-full overflow-hidden bg-luxury-sand rounded-t-2xl">
                    <img
                      src={service.imageSrc}
                      alt={service.name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover rounded-t-2xl transition-transform duration-500 hover:scale-105"
                      style={{ objectFit: "cover", objectPosition: "center" }}
                      onError={(e) => {
                        e.currentTarget.src = "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600";
                      }}
                    />
                    {/* Badge/étiquette top-left in surimpression */}
                    <div className="absolute top-4 left-4 bg-luxury-cream/90 backdrop-blur-md px-3 py-1 rounded-full text-[11px] uppercase tracking-wider font-mono text-luxury-gold-dark font-semibold border border-luxury-gold/20 z-10 shadow-sm">
                      {durationLabel}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-3">
                    <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-luxury-gold-dark font-semibold">
                      <span>{service.category}</span>
                      <span className="font-mono text-luxury-taupe">{durationLabel}</span>
                    </div>
                    <h3 className="font-serif text-lg font-bold text-luxury-charcoal leading-snug">
                      {service.name}
                    </h3>
                    <p className="text-xs text-luxury-taupe font-light leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>

                {/* Price & CTA Block */}
                <div className="p-6 pt-0 border-t border-luxury-gold/5 flex items-center justify-between mt-auto">
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-luxury-taupe block">Tarif</span>
                    <span className="font-mono text-base font-bold text-luxury-gold-dark">
                      {service.priceFCFA.toLocaleString("fr-FR")} FCFA
                    </span>
                  </div>
                  <button
                    data-service={service.name}
                    data-price={service.priceFCFA}
                    onClick={(e) => {
                      const sName = e.currentTarget.getAttribute("data-service") || service.name;
                      const sPrice = Number(e.currentTarget.getAttribute("data-price")) || service.priceFCFA;
                      
                      const formattedPrice = sPrice.toLocaleString("fr-FR") + " FCFA";
                      const message = `Bonjour Eden SPA Ouaga ! ✨\nJe souhaite réserver le soin d'exception suivant :\n\n🌸 Prestation : ${sName}\n💰 Tarif : ${formattedPrice}\n⏱️ Durée : ${durationLabel}\n\nMerci de me confirmer vos disponibilités pour un rendez-vous !`;
                      
                      const whatsappUrl = `https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(message)}`;
                      window.open(whatsappUrl, "_blank");
                    }}
                    className="bg-luxury-sand hover:bg-luxury-gold hover:text-white text-luxury-charcoal text-xs uppercase tracking-wider font-bold px-4 py-2.5 rounded-xl transition-all duration-300"
                    id={`btn-book-${service.id}`}
                  >
                    Réserver ce soin
                  </button>
                </div>
              </article>
            );
          })}
        </div>

      </section>

      {/* COMBINED WELLNESS PACKAGES */}
      <section id="forfaits" className="bg-luxury-sand/40 py-24 border-y border-luxury-gold/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-[11px] uppercase tracking-[0.2em] text-terracotta-medium font-semibold">Le Lâcher-Prise Prolongé</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-luxury-charcoal">Nos Rituels & Forfaits Bien-Être</h2>
            <div className="w-16 h-[1.5px] bg-luxury-gold mx-auto"></div>
            <p className="text-sm text-luxury-taupe font-light">
              Profitez d'un enchaînement de soins d'exception à des tarifs combinés hautement avantageux pour une détente absolue.
            </p>
          </div>

          {/* Packages Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8" id="packages-grid">
            {WELLNESS_PACKAGES.map((pkg) => (
              <div
                key={pkg.id}
                className={`bg-white rounded-3xl overflow-hidden border ${
                  pkg.popular ? "border-luxury-gold ring-1 ring-luxury-gold/30" : "border-luxury-gold/15"
                } luxury-box-shadow flex flex-col justify-between relative`}
                id={`package-card-${pkg.id}`}
              >
                {pkg.popular && (
                  <div className="absolute top-4 left-4 bg-luxury-gold text-luxury-charcoal text-[9px] uppercase tracking-widest font-bold px-3 py-1 rounded-full z-10 animate-pulse">
                    Le Plus Prisé
                  </div>
                )}

                <div className="p-6 sm:p-8 space-y-6">
                  {/* Top Header */}
                  <div className="space-y-2">
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-luxury-charcoal leading-tight">
                      {pkg.name}
                    </h3>
                    <p className="text-xs text-luxury-taupe font-light leading-relaxed">
                      {pkg.description}
                    </p>
                  </div>

                  {/* Pricing Info */}
                  <div className="flex items-baseline gap-3 bg-luxury-cream p-4 rounded-xl border border-luxury-gold/10">
                    <div>
                      <span className="text-[9px] uppercase text-luxury-taupe block">Forfait</span>
                      <span className="font-serif text-xl sm:text-2xl font-bold text-luxury-gold-dark">
                        {pkg.packagePrice.toLocaleString("fr-FR")} FCFA
                      </span>
                    </div>
                    <div className="border-l border-luxury-gold/25 pl-3">
                      <span className="text-[9px] uppercase text-luxury-taupe block line-through">
                        {pkg.originalPrice.toLocaleString("fr-FR")} FCFA
                      </span>
                      <span className="text-[10px] text-emerald-600 font-semibold block font-mono">
                        Économisez {(pkg.originalPrice - pkg.packagePrice).toLocaleString("fr-FR")} FCFA
                      </span>
                    </div>
                  </div>

                  {/* Includes List */}
                  <div className="space-y-3">
                    <p className="text-[10px] uppercase tracking-widest text-luxury-taupe font-semibold">
                      Prestations incluses :
                    </p>
                    <ul className="space-y-2.5 text-xs">
                      {pkg.includesList.map((inc, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-luxury-charcoal/90">
                          <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Duration & Booking trigger */}
                <div className="p-6 sm:p-8 pt-0 border-t border-luxury-gold/5 flex items-center justify-between mt-6">
                  <div className="flex items-center gap-1.5 text-xs text-luxury-taupe font-mono">
                    <Clock className="w-4 h-4 text-luxury-gold" />
                    <span>Durée : {Math.floor(pkg.durationMin / 60)}h{pkg.durationMin % 60 > 0 ? pkg.durationMin % 60 : "00"}</span>
                  </div>
                  <button
                    onClick={() => handleSelectForBooking(pkg.id, pkg.name, pkg.packagePrice, "package")}
                    className="bg-luxury-charcoal hover:bg-luxury-gold text-white hover:text-luxury-charcoal text-xs uppercase tracking-wider font-bold px-5 py-3 rounded-xl transition-all duration-300"
                    id={`btn-book-pkg-${pkg.id}`}
                  >
                    Réserver le pack
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION FORFAITS — LA MARIÉE */}
      <section id="forfaits-mariee" className="bg-white py-24 border-b border-luxury-gold/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-[11px] uppercase tracking-[0.2em] text-luxury-gold-dark font-semibold">Le Grand Jour d'une Vie</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-luxury-charcoal">FORFAITS — La Mariée</h2>
            <div className="w-16 h-[1.5px] bg-luxury-gold mx-auto"></div>
            <p className="text-sm text-luxury-taupe font-light">
              Des rituels de prestige conçus sur-mesure pour sublimer la reine du jour et lui offrir un éclat mémorable.
            </p>
          </div>

          {/* Bridal Packages Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto" id="bridal-packages-grid">
            {BRIDAL_PACKAGES.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-luxury-cream/40 rounded-3xl overflow-hidden border border-luxury-gold/20 luxury-box-shadow flex flex-col justify-between"
                id={`bridal-card-${pkg.id}`}
              >
                <div>
                  {/* Visual top mosaic/collage */}
                  <div className="grid grid-cols-3 h-[220px] w-full gap-1 rounded-t-3xl overflow-hidden bg-luxury-cream">
                    {/* Image 1 (Large - Spans 2 rows) */}
                    <div className="col-span-1 row-span-2 relative h-full">
                      <img
                        src={pkg.images[0]}
                        alt={`${pkg.name} - Soin`}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover object-center"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600";
                        }}
                      />
                    </div>
                    {/* Image 2 */}
                    <div className="col-span-1 row-span-1 relative h-[108px]">
                      <img
                        src={pkg.images[1]}
                        alt={`${pkg.name} - Visage`}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover object-center"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600";
                        }}
                      />
                    </div>
                    {/* Image 3 */}
                    <div className="col-span-1 row-span-1 relative h-[108px]">
                      <img
                        src={pkg.images[2]}
                        alt={`${pkg.name} - Ongles`}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover object-center"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600";
                        }}
                      />
                    </div>
                    {/* Image 4 */}
                    <div className="col-span-1 row-span-1 relative h-[108px]">
                      <img
                        src={pkg.images[3]}
                        alt={`${pkg.name} - Sublimation`}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover object-center"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600";
                        }}
                      />
                    </div>
                    {/* Image 5 */}
                    <div className="col-span-1 row-span-1 relative h-[108px]">
                      <img
                        src={pkg.images[4]}
                        alt={`${pkg.name} - Massage`}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover object-center"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600";
                        }}
                      />
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 sm:p-8 space-y-6">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-serif text-2xl font-bold text-luxury-charcoal">
                          {pkg.name}
                        </h3>
                        <span className="text-[10px] uppercase tracking-widest font-bold bg-luxury-gold/20 text-luxury-gold-dark px-3 py-1 rounded-full border border-luxury-gold/30">
                          {pkg.priceText}
                        </span>
                      </div>
                      <p className="text-xs text-luxury-taupe font-light leading-relaxed">
                        {pkg.description}
                      </p>
                    </div>

                    {/* Includes list with Heart bullets */}
                    <div className="space-y-3">
                      <h4 className="text-[10px] uppercase tracking-widest text-luxury-gold-dark font-bold">
                        Prestations d'Exception incluses :
                      </h4>
                      <ul className="grid grid-cols-1 gap-2.5 text-sm">
                        {pkg.includesList.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-luxury-charcoal/90">
                            <Heart className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5 fill-luxury-gold/10" />
                            <span className="font-medium">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Footer and Button */}
                <div className="p-6 sm:p-8 pt-0 border-t border-luxury-gold/10 mt-6">
                  <button
                    onClick={() => {
                      const includesText = pkg.includesList.map((item) => `• ${item}`).join("\n");
                      const message = `Bonjour Eden SPA Ouaga ! ✨
Je souhaite réserver la formule mariée suivante :

💍 Forfait : ${pkg.name} (La Mariée)
📋 Prestations incluses :
${includesText}

Merci de me recontacter pour planifier mon moment d'exception !`;

                      const encodedMessage = encodeURIComponent(message);
                      const whatsappUrl = `https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodedMessage}`;
                      window.open(whatsappUrl, "_blank");
                    }}
                    className="w-full bg-luxury-charcoal hover:bg-luxury-gold text-white hover:text-luxury-charcoal font-bold py-3.5 rounded-xl text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 border border-luxury-gold/20"
                    id={`btn-book-bridal-${pkg.id}`}
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Réserver ce pack</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* INTERACTIVE BOOKING WIZARD */}
      <section id="reservation-anchor" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="bg-white rounded-3xl border border-luxury-gold/25 shadow-xl overflow-hidden" id="booking-container">
          
          <div className="bg-luxury-charcoal text-white p-8 text-center space-y-2 relative">
            <div className="absolute top-4 right-4 text-luxury-gold/30">
              <Sparkles className="w-8 h-8" />
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-luxury-gold">
              Votre Formulaire de Réservation
            </h2>
            <p className="text-xs text-gray-300 max-w-lg mx-auto font-light">
              Sélectionnez votre soin, remplissez vos préférences et générez votre réservation WhatsApp instantanément. Rapide et sans tracas.
            </p>
          </div>

          <form onSubmit={handleConfirmReservation} className="p-6 sm:p-10 space-y-6">
            
            {/* Display Active Selection */}
            <div className="bg-luxury-cream p-4 rounded-2xl border border-luxury-gold/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-[9px] uppercase tracking-widest text-luxury-gold-dark font-bold block mb-1">
                  Soin Sélectionné
                </span>
                <span className="font-serif text-base sm:text-lg font-semibold text-luxury-charcoal">
                  {selectedItem.name}
                </span>
              </div>
              <div className="bg-white px-4 py-2 rounded-xl border border-luxury-gold/10 text-right shrink-0">
                <span className="text-[9px] uppercase text-luxury-taupe block">Tarif estimé</span>
                <span className="font-mono text-sm sm:text-base font-bold text-luxury-gold-dark">
                  {selectedItem.price.toLocaleString("fr-FR")} FCFA
                </span>
              </div>
            </div>

            {/* Quick selectors drop down */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider font-semibold text-luxury-taupe block">
                  Ou bien, changez de soin :
                </label>
                <select
                  value={selectedItem.id}
                  onChange={(e) => {
                    const serv = SERVICES.find((s) => s.id === e.target.value);
                    if (serv) {
                      setSelectedItem({
                        id: serv.id,
                        name: serv.name,
                        price: serv.priceFCFA,
                        type: "service"
                      });
                    } else {
                      const p = WELLNESS_PACKAGES.find((pkg) => pkg.id === e.target.value);
                      if (p) {
                        setSelectedItem({
                          id: p.id,
                          name: p.name,
                          price: p.packagePrice,
                          type: "package"
                        });
                      }
                    }
                  }}
                  className="w-full bg-white border border-luxury-gold/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-luxury-gold"
                  id="booking-select-care"
                >
                  <optgroup label="Massages d'Exception">
                    {SERVICES.filter((s) => s.category === "Massages d'Exception").map((s) => (
                      <option key={s.id} value={s.id}>{s.name} ({s.priceFCFA.toLocaleString("fr-FR")} FCFA)</option>
                    ))}
                  </optgroup>
                  <optgroup label="Soins Corporels & Gommages">
                    {SERVICES.filter((s) => s.category === "Soins Corporels").map((s) => (
                      <option key={s.id} value={s.id}>{s.name} ({s.priceFCFA.toLocaleString("fr-FR")} FCFA)</option>
                    ))}
                  </optgroup>
                  <optgroup label="Soins Visage">
                    {SERVICES.filter((s) => s.category === "Soins Visage").map((s) => (
                      <option key={s.id} value={s.id}>{s.name} ({s.priceFCFA.toLocaleString("fr-FR")} FCFA)</option>
                    ))}
                  </optgroup>
                  <optgroup label="Rituels Jacuzzi">
                    {SERVICES.filter((s) => s.category === "Rituels Jacuzzi").map((s) => (
                      <option key={s.id} value={s.id}>{s.name} ({s.priceFCFA.toLocaleString("fr-FR")} FCFA)</option>
                    ))}
                  </optgroup>
                  <optgroup label="Beauté Pieds & Mains">
                    {SERVICES.filter((s) => s.category === "Beauté Pieds & Mains").map((s) => (
                      <option key={s.id} value={s.id}>{s.name} ({s.priceFCFA.toLocaleString("fr-FR")} FCFA)</option>
                    ))}
                  </optgroup>
                  <optgroup label="Forfaits & Rituels Combinés">
                    {WELLNESS_PACKAGES.map((p) => (
                      <option key={p.id} value={p.id}>{p.name} ({p.packagePrice.toLocaleString("fr-FR")} FCFA)</option>
                    ))}
                  </optgroup>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider font-semibold text-luxury-taupe block">
                  Votre Nom complet <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-luxury-gold">
                    <User className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Assiata Sawadogo"
                    value={bookingForm.clientName}
                    onChange={(e) => setBookingForm({ ...bookingForm, clientName: e.target.value })}
                    className="w-full bg-white border border-luxury-gold/20 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-luxury-gold"
                    id="booking-name"
                  />
                </div>
              </div>

            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider font-semibold text-luxury-taupe block">
                  Date souhaitée <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-luxury-gold">
                    <Calendar className="w-4 h-4" />
                  </span>
                  <input
                    type="date"
                    required
                    min={new Date().toISOString().split("T")[0]}
                    value={bookingForm.preferredDate}
                    onChange={(e) => setBookingForm({ ...bookingForm, preferredDate: e.target.value })}
                    className="w-full bg-white border border-luxury-gold/20 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-luxury-gold font-mono"
                    id="booking-date"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider font-semibold text-luxury-taupe block">
                  Heure souhaitée <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  value={bookingForm.preferredTime}
                  onChange={(e) => setBookingForm({ ...bookingForm, preferredTime: e.target.value })}
                  className="w-full bg-white border border-luxury-gold/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-luxury-gold font-mono"
                  id="booking-time"
                >
                  <option value="">Sélectionner l'heure</option>
                  <option value="09:00">09h00</option>
                  <option value="10:00">10h00 (Fréquenté)</option>
                  <option value="11:00">11h00</option>
                  <option value="12:00">12h00</option>
                  <option value="13:00">13h00</option>
                  <option value="14:00">14h00</option>
                  <option value="15:00">15h00</option>
                  <option value="16:00">16h00</option>
                  <option value="17:00">17h00</option>
                  <option value="18:00">18h00</option>
                  <option value="19:00">19h00 (Dernier soin)</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider font-semibold text-luxury-taupe block">
                  Nombre de Personnes
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-luxury-gold">
                    <Users className="w-4 h-4" />
                  </span>
                  <input
                    type="number"
                    min="1"
                    max="6"
                    value={bookingForm.peopleCount}
                    onChange={(e) => setBookingForm({ ...bookingForm, peopleCount: parseInt(e.target.value) || 1 })}
                    className="w-full bg-white border border-luxury-gold/20 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-luxury-gold font-mono"
                    id="booking-people"
                  />
                </div>
              </div>

            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider font-semibold text-luxury-taupe block">
                Notes ou demandes spéciales (Ex: Préférence masseuse, allergies, anniversaire...)
              </label>
              <textarea
                placeholder="Indiquez ici toute information utile pour personnaliser votre expérience..."
                rows={3}
                value={bookingForm.notes}
                onChange={(e) => setBookingForm({ ...bookingForm, notes: e.target.value })}
                className="w-full bg-white border border-luxury-gold/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-luxury-gold"
                id="booking-notes"
              ></textarea>
            </div>

            {/* Error or success feedback */}
            {bookingFeedback && (
              <div className="bg-luxury-sand text-luxury-taupe p-3 rounded-xl text-xs text-center font-medium animate-pulse" id="booking-feedback">
                {bookingFeedback}
              </div>
            )}

            {/* Submit Reservation Action */}
            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl text-sm uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-emerald-600/10"
              id="booking-submit-btn"
            >
              <MessageSquare className="w-5 h-5" />
              <span>Réserver maintenant via WhatsApp</span>
            </button>

            {/* Trust disclaimer */}
            <p className="text-[10px] text-center text-luxury-taupe">
              En cliquant, un message pré-rempli s'ouvrira sur WhatsApp. Notre équipe de Ouaga 2000 vous répondra sous quelques minutes pour confirmer le créneau.
            </p>

          </form>

        </div>
      </section>



      {/* LOYALTY CARD INTERACTIVE STAMPS */}
      <section id="fidelite" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="bg-gradient-to-b from-luxury-sand to-white rounded-3xl p-8 sm:p-12 border border-luxury-gold/20 luxury-box-shadow space-y-8" id="fidelity-card-section">
          
          {/* Header */}
          <div className="text-center space-y-2">
            <span className="text-[11px] uppercase tracking-[0.2em] text-luxury-gold-dark font-semibold">Le Privilège Infini</span>
            <h2 className="font-serif text-3xl font-semibold text-luxury-charcoal">Votre Programme de Fidélité Actif</h2>
            <p className="text-sm text-luxury-taupe max-w-md mx-auto font-light">
              Chez Eden SPA, chaque instant de détente compte. Pour 5 soins effectués, votre <strong>6ème soin d'exception est offert ou à -50%</strong> !
            </p>
          </div>

          {/* Interactive stamps simulation box */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-luxury-gold/15 max-w-lg mx-auto text-center space-y-6">
            
            <p className="text-xs text-luxury-taupe">
              💡 <strong className="text-luxury-charcoal">Simulation interactive :</strong> Cliquez sur les cercles pour marquer vos visites virtuelles !
            </p>

            {/* Stamps container */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-4" id="stamps-grid">
              {[1, 2, 3, 4, 5, 6].map((num) => {
                const isActive = num <= stamps;
                const isGift = num === 6;

                return (
                  <button
                    key={num}
                    type="button"
                    onClick={() => {
                      if (isActive) {
                        // Toggle down
                        setStamps(num - 1);
                      } else {
                        // Toggle up
                        setStamps(num);
                      }
                    }}
                    className={`h-16 rounded-xl flex flex-col items-center justify-center relative transition-all duration-300 ${
                      isActive
                        ? isGift
                          ? "bg-terracotta-medium text-white border-2 border-terracotta-dark shadow-md"
                          : "bg-luxury-gold text-luxury-charcoal border-2 border-luxury-gold-dark shadow-sm"
                        : "bg-luxury-cream text-luxury-taupe border border-luxury-gold/15 hover:bg-luxury-sand"
                    }`}
                    title={`Étape ${num}`}
                  >
                    {isActive ? (
                      isGift ? (
                        <Gift className="w-6 h-6 animate-pulse" />
                      ) : (
                        <Award className="w-6 h-6" />
                      )
                    ) : (
                      <span className="font-mono text-sm font-semibold">{num}</span>
                    )}

                    {isGift && !isActive && (
                      <span className="absolute -top-2 -right-2 bg-terracotta-medium text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full uppercase">
                        Cadeau
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Stamps feedback messaging */}
            <div className="space-y-2 pt-2">
              <div className="w-full bg-luxury-cream h-2.5 rounded-full overflow-hidden border border-luxury-gold/10">
                <div
                  className="bg-luxury-gold h-full transition-all duration-500 ease-out"
                  style={{ width: `${(stamps / 6) * 100}%` }}
                ></div>
              </div>

              <p className="text-xs font-mono font-bold text-luxury-gold-dark">
                {stamps === 6
                  ? "🎁 Félicitations ! Votre 6ème soin est OFFERT ou à -50% !"
                  : stamps === 5
                  ? "Plus qu'une seule visite pour débloquer votre soin offert !"
                  : `Vous avez validé ${stamps} soin${stamps > 1 ? "s" : ""}. Encore ${6 - stamps} visite${6 - stamps > 1 ? "s" : ""} !`}
              </p>
            </div>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 text-center">
            <div className="space-y-1">
              <div className="text-luxury-gold font-bold font-serif text-lg">1. Profitez</div>
              <p className="text-xs text-luxury-taupe font-light">Commandez n'importe quel soin à notre carte à Ouaga 2000.</p>
            </div>
            <div className="space-y-1">
              <div className="text-luxury-gold font-bold font-serif text-lg">2. Cumulez</div>
              <p className="text-xs text-luxury-taupe font-light">Votre carte numérique ou papier est créditée à chaque visite.</p>
            </div>
            <div className="space-y-1">
              <div className="text-luxury-gold font-bold font-serif text-lg">3. Savourez</div>
              <p className="text-xs text-luxury-taupe font-light">Bénéficiez du 6e soin offert pour récompenser votre fidélité.</p>
            </div>
          </div>

        </div>
      </section>

      {/* REVIEWS & SOCIAL PROOF */}
      <section id="avis" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-[11px] uppercase tracking-[0.2em] text-luxury-gold-dark font-semibold">Témoignages Clients</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-luxury-charcoal">La Voix de nos Hôtes</h2>
          <div className="w-16 h-[1.5px] bg-luxury-gold mx-auto"></div>
          <p className="text-sm text-luxury-taupe font-light">
            Découvrez pourquoi notre clientèle de Ouagadougou nous attribue la note exceptionnelle de 4,9/5.
          </p>
        </div>

        {/* Global Google Rating Badge */}
        <div className="bg-white border border-luxury-gold/15 rounded-2xl p-6 max-w-md mx-auto text-center shadow-sm space-y-2" id="reviews-summary-badge">
          <div className="flex items-center justify-center gap-1.5">
            <span className="font-serif text-4xl font-extrabold text-luxury-charcoal">{COMPANY_INFO.googleRating}</span>
            <span className="text-lg text-luxury-taupe font-medium">/ 5</span>
          </div>
          <div className="flex justify-center text-amber-400">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className="w-5 h-5 fill-current" />
            ))}
          </div>
          <p className="text-xs text-luxury-taupe">
            Moyenne exceptionnelle basée sur <strong className="text-luxury-charcoal">{COMPANY_INFO.googleReviewCount} avis réels vérifiés</strong>.
          </p>
          <div className="pt-2">
            <a
              href="https://www.google.com/maps"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-luxury-gold-dark hover:underline font-semibold uppercase tracking-wider"
            >
              <span>Voir sur Google Maps</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Individual Reviews Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8" id="reviews-grid">
          {REVIEWS.map((rev) => (
            <blockquote
              key={rev.id}
              className="bg-white p-6 rounded-2xl border border-luxury-gold/10 luxury-box-shadow flex flex-col justify-between"
              id={`review-card-${rev.id}`}
            >
              <div className="space-y-4">
                
                {/* Rating Stars & Verified badge */}
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="bg-luxury-sand text-[10px] text-luxury-gold-dark font-medium px-2 py-0.5 rounded-full font-mono uppercase">
                    Vérifié {rev.source}
                  </span>
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-luxury-taupe italic font-light leading-relaxed">
                  "{rev.text}"
                </p>

              </div>

              {/* Review Author & Date */}
              <div className="pt-4 border-t border-luxury-gold/5 mt-6 flex items-center justify-between text-xs text-luxury-taupe font-mono">
                <cite className="font-serif not-italic font-bold text-luxury-charcoal">
                  {rev.name}
                </cite>
                <span>{rev.date}</span>
              </div>
            </blockquote>
          ))}
        </div>

      </section>

      {/* CONTACT, HORAIRES & GOOGLE MAPS LOCALISATION */}
      <section id="contact" className="bg-luxury-sand/30 py-24 border-t border-luxury-gold/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-[11px] uppercase tracking-[0.2em] text-luxury-gold-dark font-semibold">Prendre Attache</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-luxury-charcoal">Nous Situer & Nous Contacter</h2>
            <div className="w-16 h-[1.5px] bg-luxury-gold mx-auto"></div>
            <p className="text-sm text-luxury-taupe font-light">
              Eden SPA est idéalement situé au cœur de Ouaga 2000 pour votre parfaite commodité.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12" id="contact-container">
            
            {/* Contact Details & Social Rails */}
            <div className="lg:col-span-5 space-y-8 flex flex-col justify-between">
              
              <div className="space-y-6">
                
                {/* Horaires block */}
                <div className="bg-white p-6 rounded-2xl border border-luxury-gold/15 space-y-3 shadow-sm">
                  <div className="flex items-center gap-3 text-luxury-gold-dark">
                    <Clock className="w-5 h-5 shrink-0" />
                    <h3 className="font-serif text-lg font-bold text-luxury-charcoal">Nos Horaires d'Ouverture</h3>
                  </div>
                  <p className="text-sm text-luxury-taupe font-mono pl-8 font-medium">
                    {COMPANY_INFO.hours}
                  </p>
                  <p className="text-xs text-terracotta-medium italic pl-8 flex items-start gap-1.5 leading-relaxed font-light">
                    <Info className="w-4 h-4 shrink-0 mt-0.5 text-terracotta-medium" />
                    <span>{COMPANY_INFO.hoursHint}</span>
                  </p>
                </div>

                {/* Coordonnées block */}
                <div className="bg-white p-6 rounded-2xl border border-luxury-gold/15 space-y-4 shadow-sm">
                  <div className="flex items-center gap-3 text-luxury-gold-dark">
                    <MapPin className="w-5 h-5 shrink-0" />
                    <h3 className="font-serif text-lg font-bold text-luxury-charcoal">Adresse de l'Institut</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-luxury-taupe pl-8 leading-relaxed font-light">
                    {COMPANY_INFO.address}
                  </p>

                  <div className="border-t border-luxury-gold/10 pt-4 space-y-2">
                    <div className="flex items-center gap-2 pl-8">
                      <span className="text-xs uppercase tracking-wider text-luxury-taupe font-semibold w-24">Téléphone :</span>
                      <a href={`tel:${COMPANY_INFO.secondaryFormatted}`} className="text-xs font-mono text-luxury-gold-dark hover:underline">
                        {COMPANY_INFO.phoneSecondary}
                      </a>
                    </div>
                    <div className="flex items-center gap-2 pl-8">
                      <span className="text-xs uppercase tracking-wider text-luxury-taupe font-semibold w-24">WhatsApp :</span>
                      <a href={`https://wa.me/${COMPANY_INFO.whatsapp}`} target="_blank" rel="noreferrer" className="text-xs font-mono text-emerald-600 hover:underline">
                        {COMPANY_INFO.phoneDisplay}
                      </a>
                    </div>
                  </div>
                </div>

              </div>

              {/* Social networks & Community references */}
              <div className="bg-white p-6 rounded-2xl border border-luxury-gold/15 space-y-4 shadow-sm">
                <h4 className="text-xs uppercase tracking-widest text-luxury-taupe font-semibold">Suivez Eden SPA sur nos réseaux</h4>
                <div className="flex flex-col sm:flex-row gap-4">
                  
                  <a
                    href={COMPANY_INFO.instagramUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 flex items-center gap-3 p-3 bg-luxury-cream hover:bg-luxury-sand rounded-xl border border-luxury-gold/10 text-xs transition-colors"
                  >
                    <Instagram className="w-5 h-5 text-pink-600" />
                    <div>
                      <span className="font-semibold block text-luxury-charcoal">Instagram</span>
                      <span className="text-luxury-taupe font-mono text-[10px]">{COMPANY_INFO.instagramHandle}</span>
                    </div>
                  </a>

                  <a
                    href={COMPANY_INFO.facebookUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 flex items-center gap-3 p-3 bg-luxury-cream hover:bg-luxury-sand rounded-xl border border-luxury-gold/10 text-xs transition-colors"
                  >
                    <Facebook className="w-5 h-5 text-blue-700" />
                    <div>
                      <span className="font-semibold block text-luxury-charcoal">Facebook</span>
                      <span className="text-luxury-taupe font-mono text-[10px]">Eden spa</span>
                    </div>
                  </a>

                </div>
              </div>

            </div>

            {/* Google Maps iFrame */}
            <div className="lg:col-span-7 h-96 lg:h-auto rounded-3xl overflow-hidden border-2 border-luxury-gold/20 shadow-lg relative bg-luxury-sand">
              <iframe
                title="Google Maps Location of Eden SPA Ouaga"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3897.6402773539824!2d-1.4883111242337777!3d12.339841887926177!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xe2ebe859842a2ab%3A0xe9f00fb4cae44a49!2sNour%20Cosm%C3%A9tique!5e0!3m2!1sfr!2sbf!4v1700000000000!5m2!1sfr!2sbf"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                onError={(e) => {
                  console.error("Maps iframe load error");
                }}
              ></iframe>
            </div>

          </div>

        </div>
      </section>

      {/* FOOTER COORD & COPYRIGHT */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 border-t border-luxury-gold/10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8">
          
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <span className="font-serif text-lg font-bold tracking-widest text-luxury-charcoal">
              EDEN SPA OUAGA
            </span>
            <span className="text-[10px] uppercase tracking-[0.25em] text-luxury-gold-dark font-medium">
              by Nour Cosmétique
            </span>
            <p className="text-[11px] text-luxury-taupe mt-1 max-w-sm font-light">
              Votre havre de paix, de détente et d'éclat à Ouagadougou, Burkina Faso.
            </p>
          </div>

          {/* Bottom quick navigation links */}
          <div className="flex flex-wrap justify-center gap-6 text-xs text-luxury-taupe font-medium">
            <a href="#accueil" className="hover:text-luxury-gold transition-colors">Accueil</a>
            <a href="#services" className="hover:text-luxury-gold transition-colors">Services</a>
            <a href="#forfaits" className="hover:text-luxury-gold transition-colors">Forfaits</a>
            <a href="#contact" className="hover:text-luxury-gold transition-colors">Contact</a>
          </div>

        </div>

        {/* Fine print & legal warnings */}
        <div className="border-t border-luxury-gold/5 pt-8 text-center space-y-2 text-[10px] text-luxury-taupe">
          <p>© {new Date().getFullYear()} Eden SPA Ouaga (by Nour Cosmétique). Tous droits réservés.</p>
          <p className="font-light">
            Développé avec soin pour une expérience de réservation fluide sur mobile Android et iOS.
          </p>
        </div>
      </footer>

      {/* PERSISTENT FLOATING WHATSAPP CTA - SEAMLESS MOBILE & DESKTOP */}
      <a
        href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=Bonjour%20Eden%20SPA%20Ouaga%20!%20Je%20souhaite%20réserver%20un%20soin.`}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-emerald-600 hover:bg-emerald-700 text-white p-4 rounded-full shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center border-2 border-white/20"
        title="Discuter avec nous sur WhatsApp"
        id="floating-whatsapp-trigger"
      >
        <MessageSquare className="w-6 h-6 shrink-0" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 font-semibold text-xs uppercase tracking-wider pl-0">
          Réservation
        </span>
      </a>

      {/* Scroll to Top button */}
      {showScrollTop && (
        <button
          onClick={() => {
            try {
              window.scrollTo({ top: 0, behavior: "smooth" });
            } catch (err) {
              console.error(err);
            }
          }}
          className="fixed bottom-6 left-6 z-40 bg-luxury-cream/80 backdrop-blur-md border border-luxury-gold/30 text-luxury-charcoal p-3.5 rounded-full shadow-lg hover:bg-luxury-sand transition-all duration-300 flex items-center justify-center hover:scale-105"
          title="Retourner en haut"
          id="scroll-to-top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}

    </div>
  );
}
