"use client"

import Image from "next/image"
import { useLanguage } from "@/lib/language-context"

const CONTENT = {
  en: {
    title: "Recessed LED Strip Lighting",
    subtitle: "Elevate your acoustic panels with integrated vertical LED lighting. Create stunning visual effects with customizable brightness, flexible installation, and premium quality construction. Perfect for living rooms, bedrooms, offices, and commercial spaces.",
    features: {
      smartDimming: { title: "Smart Dimming", desc: "Stepless brightness control from 10% to 100% with memory function" },
      easyInstall: { title: "Easy Installation", desc: "Quick Connect system with extra-long cables for flexible placement" },
      premiumQuality: { title: "Premium Quality", desc: "Superior adhesive tape that is stickier and thicker than competitors" },
      energyEfficient: { title: "Energy Efficient", desc: "50,000+ hour lifespan using only 0.43 kWh per day" },
    },
    images: [
      { title: "Easy Installation", description: "5-step installation process: Attach light tapes to power, attach sensor switch, attach power cord, peel protective film, and stick to wall" },
      { title: "Living Room Ambiance", description: "Transform your living room with vertical recessed LED strips that accentuate acoustic panels for stunning visual impact" },
      { title: "TV Wall Enhancement", description: "Create a cinema-like atmosphere with recessed LED strips framing your entertainment area" },
      { title: "Kitchen Cabinet Lighting", description: "CIR90 high-brightness linear lighting provides vibrant illumination for kitchen cabinets and workspaces" },
      { title: "Professional Office Space", description: "Create a productive and stylish office environment with integrated recessed LED panels" },
      { title: "Bedroom Relaxation", description: "Design a serene bedroom sanctuary with warm recessed LED lighting integrated into wall panels" },
      { title: "Multi-Pack Installation", description: "Create stunning wall displays with 8-pack LED strip installations across large areas" },
      { title: "Elegant Design Integration", description: "Seamlessly integrate recessed LED strips with acoustic panels for sophisticated interior design" },
      { title: "Decorative Bedroom Setup", description: "Transform your bedroom with recessed LED lighting integrated into wood slat acoustic panels" },
      { title: "Commercial Application", description: "Perfect for restaurants and dining spaces - create an upscale ambiance with recessed LED strips" },
      { title: "Smart Dimming (10-100%)", description: "Control brightness effortlessly with long-press dimming - adjust from 10% to 100% brightness in real-time" },
      { title: "Smart Control Features", description: "Memory function remembers your last brightness setting - turn on at your preferred brightness level automatically" },
      { title: "Quick Connect System", description: "Extra-long connecting cables (2m/78.74 inch) allow flexible LED strip placement and installation" },
      { title: "Multiple Size Options", description: "Available in multiple lengths: 18\", 26\", 34\", and 42\" - choose the perfect size for your space" },
      { title: "Versatile Applications", description: "Perfect for offices, bedrooms, living rooms, sofa walls - limitless design possibilities" },
      { title: "Premium Adhesive", description: "Our customized adhesive tape is stickier and thicker than competitors - secure and long-lasting installation" },
      { title: "Energy Efficient & Durable", description: "50,000+ hour service life with only 0.43 kWh/day consumption - eco-friendly and economical" },
    ],
  },
  fr: {
    title: "Eclairage LED Encastre",
    subtitle: "Sublimez vos panneaux acoustiques avec un eclairage LED vertical integre. Creez des effets visuels epoustouflants avec une luminosite personnalisable, une installation flexible et une construction de qualite superieure. Parfait pour les salons, chambres, bureaux et espaces commerciaux.",
    features: {
      smartDimming: { title: "Variateur Intelligent", desc: "Controle de luminosite progressif de 10% a 100% avec fonction memoire" },
      easyInstall: { title: "Installation Facile", desc: "Systeme Quick Connect avec cables extra-longs pour un placement flexible" },
      premiumQuality: { title: "Qualite Premium", desc: "Ruban adhesif superieur plus collant et plus epais que la concurrence" },
      energyEfficient: { title: "Econome en Energie", desc: "Duree de vie de 50 000+ heures avec seulement 0,43 kWh par jour" },
    },
    images: [
      { title: "Installation Facile", description: "Processus d'installation en 5 etapes : Connecter les bandes lumineuses a l'alimentation, fixer l'interrupteur capteur, brancher le cordon d'alimentation, retirer le film protecteur et coller au mur" },
      { title: "Ambiance Salon", description: "Transformez votre salon avec des bandes LED encastrees verticales qui mettent en valeur les panneaux acoustiques pour un impact visuel saisissant" },
      { title: "Mur TV Ameliore", description: "Creez une atmosphere de cinema avec des bandes LED encastrees encadrant votre espace divertissement" },
      { title: "Eclairage Cuisine", description: "L'eclairage lineaire haute luminosite CIR90 offre un eclairage vibrant pour les armoires de cuisine et espaces de travail" },
      { title: "Espace Bureau Professionnel", description: "Creez un environnement de bureau productif et elegant avec des panneaux LED encastres integres" },
      { title: "Detente Chambre", description: "Concevez un sanctuaire de chambre serein avec un eclairage LED encastre chaleureux integre aux panneaux muraux" },
      { title: "Installation Multi-Pack", description: "Creez de superbes affichages muraux avec des installations de bandes LED en pack de 8 sur de grandes surfaces" },
      { title: "Integration Design Elegant", description: "Integrez harmonieusement les bandes LED encastrees avec les panneaux acoustiques pour un design interieur sophistique" },
      { title: "Configuration Chambre Decorative", description: "Transformez votre chambre avec un eclairage LED encastre integre aux panneaux acoustiques en lattes de bois" },
      { title: "Application Commerciale", description: "Parfait pour les restaurants et espaces de restauration - creez une ambiance haut de gamme avec des bandes LED encastrees" },
      { title: "Variateur Intelligent (10-100%)", description: "Controlez la luminosite sans effort avec la variation par pression longue - ajustez de 10% a 100% en temps reel" },
      { title: "Fonctions de Controle Intelligent", description: "La fonction memoire retient votre dernier reglage de luminosite - allumez automatiquement a votre niveau prefere" },
      { title: "Systeme Quick Connect", description: "Les cables de connexion extra-longs (2m/78,74 pouces) permettent un placement et une installation flexibles des bandes LED" },
      { title: "Options de Tailles Multiples", description: "Disponible en plusieurs longueurs : 18\", 26\", 34\" et 42\" - choisissez la taille parfaite pour votre espace" },
      { title: "Applications Polyvalentes", description: "Parfait pour bureaux, chambres, salons, murs canape - possibilites de design illimitees" },
      { title: "Adhesif Premium", description: "Notre ruban adhesif personnalise est plus collant et plus epais que la concurrence - installation securisee et durable" },
      { title: "Econome et Durable", description: "Duree de vie de 50 000+ heures avec seulement 0,43 kWh/jour - ecologique et economique" },
    ],
  },
}

const IMAGE_SOURCES = [
  "/recessed-led-howto.jpg",
  "/recessed-led-living-room.jpg",
  "/recessed-led-tv-wall.jpg",
  "/recessed-led-kitchen.jpg",
  "/recessed-led-office.jpg",
  "/recessed-led-bedroom.jpg",
  "/recessed-led-8pack-install.jpg",
  "/recessed-led-living-room-2.jpg",
  "/recessed-led-bedroom-decoration.jpg",
  "/recessed-led-restaurant.jpg",
  "/recessed-led-dimming-feature.jpg",
  "/recessed-led-dimmer-control.jpg",
  "/recessed-led-quick-connect.jpg",
  "/recessed-led-black-b-specs.jpg",
  "/recessed-led-room-applications.jpg",
  "/recessed-led-adhesive-quality.jpg",
  "/recessed-led-energy-efficient.jpg",
]

export function RecessedLedSection() {
  const { language } = useLanguage()
  const t = CONTENT[language]

  return (
    <section className="mt-16 sm:mt-24 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="mb-8 sm:mb-12">
          <h2 className="font-serif text-2xl sm:text-3xl mb-4 text-foreground">
            {t.title}
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl">
            {t.subtitle}
          </p>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {t.images.map((item, index) => (
            <div
              key={index}
              className="flex flex-col h-full rounded-lg overflow-hidden bg-card border border-border hover:shadow-lg transition-shadow duration-300"
            >
              {/* Image Container */}
              <div className="relative w-full h-48 sm:h-56 md:h-64 overflow-hidden bg-muted flex-shrink-0">
                <Image
                  src={IMAGE_SOURCES[index]}
                  alt={item.title}
                  width={400}
                  height={300}
                  className="w-full h-full object-cover"
                  style={{ width: "auto", height: "auto" }}
                />
              </div>

              {/* Content */}
              <div className="p-4 sm:p-6 flex flex-col flex-grow">
                <h3 className="font-semibold text-base sm:text-lg mb-2 text-foreground">
                  {item.title}
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Features Summary */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 bg-muted p-6 sm:p-8 rounded-lg">
          <div>
            <h4 className="font-semibold text-foreground mb-2">{t.features.smartDimming.title}</h4>
            <p className="text-sm text-muted-foreground">{t.features.smartDimming.desc}</p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-2">{t.features.easyInstall.title}</h4>
            <p className="text-sm text-muted-foreground">{t.features.easyInstall.desc}</p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-2">{t.features.premiumQuality.title}</h4>
            <p className="text-sm text-muted-foreground">{t.features.premiumQuality.desc}</p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-2">{t.features.energyEfficient.title}</h4>
            <p className="text-sm text-muted-foreground">{t.features.energyEfficient.desc}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
