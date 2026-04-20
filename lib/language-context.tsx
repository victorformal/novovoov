"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "fr" | "en"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations: Record<Language, Record<string, string>> = {
  fr: {
    // Navigation
    "nav.shop": "Boutique",
    "nav.wallPanels": "Panneaux Muraux",
    "nav.lighting": "Eclairage",
    "nav.decor": "Decoration",
    "nav.about": "A Propos",
    "nav.contact": "Contact",
    "nav.cart": "Panier",
    "nav.changeLanguage": "Changer de langue",

    // Hero Section
    "hero.badge": "Nouvelle Collection 2026",
    "hero.title": "Sublimez Votre Espace avec un Design Intemporel",
    "hero.description": "Decouvrez notre collection selectionnee de panneaux muraux, eclairages et decorations d'inspiration scandinave. Fabriques avec des materiaux durables pour la maison moderne.",
    "hero.cta": "Voir la Collection",
    "hero.ourStory": "Notre Histoire",
    "hero.free": "Gratuit",
    "hero.freeShipping": "Livraison France",
    "hero.days": "30 Jours",
    "hero.returns": "Retours",
    "hero.years": "5 Ans",
    "hero.warranty": "Garantie",
    "hero.imageAlt": "Salon scandinave moderne avec panneaux muraux en bois",

    // Categories
    "categories.browse": "Parcourir",
    "categories.title": "Acheter par Categorie",
    "categories.subtitle": "Explorez nos collections soigneusement selectionnees, chacune concue pour apporter chaleur et caractere a votre interieur.",
    "categories.wallPanels": "Panneaux Muraux",
    "categories.wallPanelsDesc": "Acoustiques et decoratifs",
    "categories.lighting": "Eclairage",
    "categories.lightingDesc": "Lampes et luminaires",
    "categories.decor": "Decoration",
    "categories.decorDesc": "Vases et objets",
    "categories.viewAll": "Voir Tout",

    // Featured
    "featured.selection": "Selection",
    "featured.title": "Collection en Vedette",
    "featured.subtitle": "Nos pieces les plus appreciees, selectionnees pour leur artisanat exceptionnel et leur design.",
    "featured.viewAll": "Voir Tout",

    // Newsletter
    "newsletter.title": "Rejoignez la Communaute PANNEAU WOOD",
    "newsletter.subtitle": "Inscrivez-vous pour des offres exclusives, de l'inspiration design et un acces anticipe aux nouvelles collections.",
    "newsletter.placeholder": "Entrez votre email",
    "newsletter.button": "S'inscrire",
    "newsletter.thanks": "Merci pour votre inscription !",
    "newsletter.thanksDesc": "Nous vous contacterons avec de l'inspiration design et des offres exclusives.",
    "newsletter.privacy": "En vous inscrivant, vous acceptez notre Politique de Confidentialite. Desabonnez-vous a tout moment.",

    // Featured Products
    "featured.title": "Produits Populaires",
    "featured.subtitle": "Nos articles les plus apprecies par nos clients",
    "featured.viewAll": "Voir Tous les Produits",
    "featured.addToCart": "Ajouter au Panier",

    // Trends
    "trends.badge": "Tendances Design",
    "trends.title": "L'Art du Style Japandi",
    "trends.description": "Ou le minimalisme japonais rencontre la fonctionnalite scandinave. Notre collection incarne l'equilibre parfait entre chaleur et simplicite, creant des espaces a la fois sereins et accueillants.",
    "trends.feature1": "Materiaux naturels qui vieillissent magnifiquement avec le temps",
    "trends.feature2": "Lignes epurees avec des details organiques et artisanaux",
    "trends.feature3": "Palettes neutres qui creent des environnements calmes et concentres",
    "trends.cta": "Explorer la Collection",
    "trends.imageAlt1": "Interieur Japandi avec elements en bois naturel",
    "trends.imageAlt2": "Bureau moderne avec panneaux acoustiques",
    "trends.imageAlt3": "Lampe minimaliste dans une chambre",
    "trends.imageAlt4": "Decoration ceramique sur etagere minimaliste",

    // Testimonials
    "testimonials.badge": "Temoignages",
    "testimonials.title": "Ce que Disent nos Clients",
    "testimonials.subtitle": "Rejoignez des milliers de clients satisfaits qui ont transforme leur maison avec PANNEAU WOOD.",
    "testimonials.review1.name": "Sophie M.",
    "testimonials.review1.location": "Paris, France",
    "testimonials.review1.text": "Les panneaux en chene ont completement transforme notre salon. La qualite est exceptionnelle et l'installation a ete etonnamment simple.",
    "testimonials.review2.name": "Marc L.",
    "testimonials.review2.location": "Lyon, France",
    "testimonials.review2.text": "Un artisanat magnifique. J'ai commande les panneaux acoustiques pour mon studio a domicile et la difference sonore est remarquable. En plus, ils sont superbes.",
    "testimonials.review3.name": "Emma K.",
    "testimonials.review3.location": "Bordeaux, France",
    "testimonials.review3.text": "PANNEAU WOOD est devenu ma reference pour la decoration interieure. Chaque piece que j'ai achetee semble soigneusement concue et construite pour durer.",

    // Newsletter
    "newsletter.title": "Restez Informe",
    "newsletter.subtitle": "Inscrivez-vous a notre newsletter pour recevoir nos dernieres nouveautes et offres exclusives",
    "newsletter.placeholder": "Votre adresse email",
    "newsletter.button": "S'inscrire",

    // Footer
    "footer.description": "Panneaux en lattes de bois premium et decoration interieure selectionnee. Nous croyons en un artisanat de qualite, des materiaux durables et un design intemporel qui sublime chaque espace.",
    "footer.shop": "Boutique",
    "footer.allProducts": "Tous les Produits",
    "footer.wallPanels": "Panneaux Muraux",
    "footer.lighting": "Eclairage",
    "footer.mirrors": "Miroirs",
    "footer.decor": "Decoration",
    "footer.company": "Entreprise",
    "footer.about": "A Propos",
    "footer.contact": "Contact",
    "footer.sustainability": "Durabilite",
    "footer.careers": "Carrieres",
    "footer.support": "Support",
    "footer.shipping": "Livraison",
    "footer.returns": "Retours",
    "footer.faq": "FAQ",
    "footer.careGuide": "Guide d'Entretien",
    "footer.rights": "Tous droits reserves.",
    "footer.privacy": "Politique de Confidentialite",
    "footer.terms": "Conditions d'Utilisation",

    // Products
    "products.title": "Nos Produits",
    "products.filters": "Filtres",
    "products.sortBy": "Trier par",
    "products.backToProducts": "Retour aux produits",
    "products.inStock": "En stock",
    "products.outOfStock": "Rupture de stock",

    // Cart
    "cart.title": "Votre Panier",
    "cart.empty": "Votre panier est vide",
    "cart.continueShopping": "Continuer vos achats",
    "cart.subtotal": "Sous-total",
    "cart.shipping": "Livraison",
    "cart.free": "Gratuit",
    "cart.total": "Total",
    "cart.checkout": "Passer la commande",
    "cart.remove": "Supprimer",

    // About
    "about.title": "Notre Histoire",
    "about.subtitle": "Depuis plus de 10 ans, nous creons des espaces de vie exceptionnels",

    // Contact
    "contact.title": "Contactez-Nous",
    "contact.subtitle": "Notre equipe est la pour vous aider",
    "contact.name": "Nom",
    "contact.email": "Email",
    "contact.message": "Message",
    "contact.send": "Envoyer",
  },
  en: {
    // Navigation
    "nav.shop": "Shop",
    "nav.wallPanels": "Wall Panels",
    "nav.lighting": "Lighting",
    "nav.decor": "Decor",
    "nav.about": "About",
    "nav.contact": "Contact",
    "nav.cart": "Cart",
    "nav.changeLanguage": "Change language",

    // Hero Section
    "hero.badge": "New Collection 2026",
    "hero.title": "Elevate Your Space with Timeless Design",
    "hero.description": "Discover our curated collection of wall panels, lighting and Scandinavian-inspired decor. Crafted with sustainable materials for the modern home.",
    "hero.cta": "View Collection",
    "hero.ourStory": "Our Story",
    "hero.free": "Free",
    "hero.freeShipping": "France Shipping",
    "hero.days": "30 Days",
    "hero.returns": "Returns",
    "hero.years": "5 Years",
    "hero.warranty": "Warranty",
    "hero.imageAlt": "Modern Scandinavian living room with wood wall panels",

    // Categories
    "categories.browse": "Browse",
    "categories.title": "Shop by Category",
    "categories.subtitle": "Explore our carefully curated collections, each designed to bring warmth and character to your interior.",
    "categories.wallPanels": "Wall Panels",
    "categories.wallPanelsDesc": "Acoustic and decorative",
    "categories.lighting": "Lighting",
    "categories.lightingDesc": "Lamps and fixtures",
    "categories.decor": "Decor",
    "categories.decorDesc": "Vases and objects",
    "categories.viewAll": "View All",

    // Featured
    "featured.selection": "Selection",
    "featured.title": "Featured Collection",
    "featured.subtitle": "Our most loved pieces, selected for their exceptional craftsmanship and design.",
    "featured.viewAll": "View All",

    // Newsletter
    "newsletter.title": "Join the PANNEAU WOOD Community",
    "newsletter.subtitle": "Sign up for exclusive offers, design inspiration and early access to new collections.",
    "newsletter.placeholder": "Enter your email",
    "newsletter.button": "Subscribe",
    "newsletter.thanks": "Thank you for subscribing!",
    "newsletter.thanksDesc": "We will contact you with design inspiration and exclusive offers.",
    "newsletter.privacy": "By subscribing, you agree to our Privacy Policy. Unsubscribe at any time.",

    // Featured Products
    "featured.title": "Popular Products",
    "featured.subtitle": "Our most loved items by our customers",
    "featured.viewAll": "View All Products",
    "featured.addToCart": "Add to Cart",

    // Trends
    "trends.badge": "Design Trends",
    "trends.title": "The Art of Japandi Style",
    "trends.description": "Where Japanese minimalism meets Scandinavian functionality. Our collection embodies the perfect balance between warmth and simplicity, creating spaces that are both serene and inviting.",
    "trends.feature1": "Natural materials that age beautifully over time",
    "trends.feature2": "Clean lines with organic, artisanal details",
    "trends.feature3": "Neutral palettes that create calm, focused environments",
    "trends.cta": "Explore Collection",
    "trends.imageAlt1": "Japandi interior with natural wood elements",
    "trends.imageAlt2": "Modern office with acoustic panels",
    "trends.imageAlt3": "Minimalist lamp in bedroom",
    "trends.imageAlt4": "Ceramic decor on minimalist shelf",

    // Testimonials
    "testimonials.badge": "Testimonials",
    "testimonials.title": "What Our Customers Say",
    "testimonials.subtitle": "Join thousands of satisfied customers who have transformed their homes with PANNEAU WOOD.",
    "testimonials.review1.name": "Sophie M.",
    "testimonials.review1.location": "Paris, France",
    "testimonials.review1.text": "The oak panels completely transformed our living room. The quality is exceptional and the installation was surprisingly simple.",
    "testimonials.review2.name": "Marc L.",
    "testimonials.review2.location": "Lyon, France",
    "testimonials.review2.text": "Beautiful craftsmanship. I ordered the acoustic panels for my home studio and the sound difference is remarkable. Plus, they look stunning.",
    "testimonials.review3.name": "Emma K.",
    "testimonials.review3.location": "Bordeaux, France",
    "testimonials.review3.text": "PANNEAU WOOD has become my go-to for interior decor. Every piece I've purchased feels thoughtfully designed and built to last.",

    // Newsletter
    "newsletter.title": "Stay Informed",
    "newsletter.subtitle": "Subscribe to our newsletter to receive our latest news and exclusive offers",
    "newsletter.placeholder": "Your email address",
    "newsletter.button": "Subscribe",

    // Footer
    "footer.description": "Premium wood slat panels and curated interior decor. We believe in quality craftsmanship, sustainable materials and timeless design that elevates every space.",
    "footer.shop": "Shop",
    "footer.allProducts": "All Products",
    "footer.wallPanels": "Wall Panels",
    "footer.lighting": "Lighting",
    "footer.mirrors": "Mirrors",
    "footer.decor": "Decor",
    "footer.company": "Company",
    "footer.about": "About",
    "footer.contact": "Contact",
    "footer.sustainability": "Sustainability",
    "footer.careers": "Careers",
    "footer.support": "Support",
    "footer.shipping": "Shipping",
    "footer.returns": "Returns",
    "footer.faq": "FAQ",
    "footer.careGuide": "Care Guide",
    "footer.rights": "All rights reserved.",
    "footer.privacy": "Privacy Policy",
    "footer.terms": "Terms of Use",

    // Products
    "products.title": "Our Products",
    "products.filters": "Filters",
    "products.sortBy": "Sort by",
    "products.backToProducts": "Back to products",
    "products.inStock": "In stock",
    "products.outOfStock": "Out of stock",

    // Cart
    "cart.title": "Your Cart",
    "cart.empty": "Your cart is empty",
    "cart.continueShopping": "Continue shopping",
    "cart.subtotal": "Subtotal",
    "cart.shipping": "Shipping",
    "cart.free": "Free",
    "cart.total": "Total",
    "cart.checkout": "Checkout",
    "cart.remove": "Remove",

    // About
    "about.title": "Our Story",
    "about.subtitle": "For over 10 years, we have been creating exceptional living spaces",

    // Contact
    "contact.title": "Contact Us",
    "contact.subtitle": "Our team is here to help you",
    "contact.name": "Name",
    "contact.email": "Email",
    "contact.message": "Message",
    "contact.send": "Send",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("fr")

  useEffect(() => {
    const saved = localStorage.getItem("language") as Language
    if (saved && (saved === "fr" || saved === "en")) {
      setLanguageState(saved)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem("language", lang)
  }

  const t = (key: string): string => {
    return translations[language][key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
