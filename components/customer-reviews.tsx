"use client"

import { useState } from "react"
import Image from "next/image"
import { Star, ThumbsUp, User } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

interface Review {
  id: string
  author: string
  rating: number
  title: string
  titleFr?: string
  date: string
  dateFr?: string
  country: string
  verified: boolean
  color?: string
  colorFr?: string
  size?: string
  content: string
  contentFr?: string
  images: string[]
  helpfulCount: number
}

const reviews: Review[] = [
  {
    id: "1",
    author: "Marie Dubois",
    rating: 5,
    title: "Completely transformed my living room",
    titleFr: "Transforme completement mon salon",
    date: "February 20, 2026",
    dateFr: "Fevrier 20, 2026",
    country: "France",
    verified: true,
    color: "Natural Oak",
    colorFr: "Chene Naturel",
    size: "270x110cm",
    content:
      "I absolutely love this acoustic panel! Installation was very easy and it looks amazing behind the TV. The sound quality in the living room has improved dramatically. Conversations no longer echo. Highly recommended!",
    contentFr:
      "J'adore ce panneau acoustique! L'installation a ete tres facile et cela rend magnifique derriere la TV. La qualite du son s'est considerablement amelioree dans le salon. Les conversations ne resonnent plus. Je recommande vivement!",
    images: ["/flexible-panel-natural-oak-living-room.jpg"],
    helpfulCount: 42,
  },
  {
    id: "2",
    author: "Jean-Pierre Moreau",
    rating: 5,
    title: "Perfect for remote work",
    titleFr: "Parfait pour le teletravail",
    date: "February 18, 2026",
    dateFr: "Fevrier 18, 2026",
    country: "France",
    verified: true,
    color: "Grey",
    colorFr: "Gris",
    size: "270x110cm",
    content:
      "I installed it in my office and video calls are much better. The panel absorbs background noise perfectly. It looks very professional behind me during online meetings.",
    contentFr:
      "J'ai installe dans mon bureau et les appels video sont beaucoup meilleurs. Le panneau absorbe le bruit de fond parfaitement. C'est tres professionnel derriere moi pendant les reunions en ligne.",
    images: ["/flexible-panel-grey-tv-wall.jpg"],
    helpfulCount: 38,
  },
  {
    id: "3",
    author: "Beatrice Laurent",
    rating: 5,
    title: "Perfect design and function",
    titleFr: "Design et fonction parfaits",
    date: "February 16, 2026",
    dateFr: "Fevrier 16, 2026",
    country: "France",
    verified: true,
    color: "Natural Oak",
    colorFr: "Chene Naturel",
    size: "270x110cm",
    content:
      "Excellent quality! My husband and I installed it around the TV. The panel is flexible and adaptable - we were able to work around the electrical outlets easily. It's absolutely beautiful!",
    contentFr:
      "Qualite excellente! Mon mari et moi avons installe autour de la TV. Le panneau est flexible et adaptable - nous avons pu contourner les prises electriques facilement. C'est absolument magnifique!",
    images: ["/flexible-panel-natural-oak-tv-feature.jpg"],
    helpfulCount: 35,
  },
  {
    id: "4",
    author: "Carlos Rodriguez",
    rating: 5,
    title: "Professional gaming setup",
    titleFr: "Configuration de gaming professionnel",
    date: "February 14, 2026",
    dateFr: "Fevrier 14, 2026",
    country: "France",
    verified: true,
    color: "Black",
    colorFr: "Noir",
    size: "270x110cm",
    content:
      "I installed it with LED lighting and it's epic! The acoustic absorption is remarkable when I play online - my microphone picks up much less ambient noise. Perfect investment.",
    contentFr:
      "J'ai installe avec des LED et c'est epique! L'absorption acoustique est remarquable quand je joue en ligne - mon micro prend beaucoup moins de bruit ambiant. Investissement parfait.",
    images: ["/flexible-panel-smoked-oak-entertainment.jpg"],
    helpfulCount: 51,
  },
  {
    id: "5",
    author: "Fernanda Silva",
    rating: 5,
    title: "Complete living room renovation",
    titleFr: "Renovation complete du salon",
    date: "February 12, 2026",
    dateFr: "Fevrier 12, 2026",
    country: "France",
    verified: true,
    color: "Smoked Oak",
    colorFr: "Chene Fume",
    size: "270x110cm",
    content:
      "I never imagined that one panel could make such a difference! Beyond improving acoustics, it completely transformed the visual appearance of my living room. Highly recommended.",
    contentFr:
      "Je n'imaginais pas qu'un panneau pouvait faire une telle difference! En plus d'ameliorer l'acoustique, cela a completement transforme l'aspect visuel de mon salon. Tres recommande.",
    images: ["/flexible-panel-walnut-office.jpg"],
    helpfulCount: 29,
  },
  {
    id: "6",
    author: "Richard Blanc",
    rating: 5,
    title: "Easy to install during renovation",
    titleFr: "Facile a installer meme en construction",
    date: "February 10, 2026",
    dateFr: "Fevrier 10, 2026",
    country: "France",
    verified: true,
    color: "Natural Oak",
    colorFr: "Chene Naturel",
    size: "270x110cm",
    content:
      "I'm in the final stages of renovating my home. The panel arrived at the perfect time and is very easy to work with. It integrates perfectly with my design vision. I'm ordering more!",
    contentFr:
      "Je suis en phase finale de renovation de ma maison. Le panneau est arrive au bon moment et est tres facile a travailler. Il s'integre parfaitement dans ma vision de design. J'en prends d'autres!",
    images: ["/flexible-panel-natural-oak-entryway.jpg"],
    helpfulCount: 22,
  },
  {
    id: "7",
    author: "Ines Martin",
    rating: 5,
    title: "Elegant bathroom solution",
    titleFr: "Solution elegante pour la salle de bain",
    date: "February 08, 2026",
    dateFr: "Fevrier 08, 2026",
    country: "France",
    verified: true,
    color: "Natural Oak",
    colorFr: "Chene Naturel",
    size: "270x110cm",
    content:
      "Yes, I installed it in the bathroom above the vanity. The panel is durable and the acoustic absorption incredibly reduces echo. It's elegant and minimalist. Very satisfied with the result!",
    contentFr:
      "Oui, je l'ai mis dans la salle de bain au-dessus du lavabo. Le panneau est resistant et l'absorption acoustique reduit incroyablement l'echo. C'est elegant et minimaliste. Tres satisfait du resultat!",
    images: ["/flexible-panel-bathroom-accent.jpg"],
    helpfulCount: 18,
  },
  {
    id: "8",
    author: "Alexandre Ferre",
    rating: 5,
    title: "Premium workspace setup",
    titleFr: "Configuration de travail premium",
    date: "February 06, 2026",
    dateFr: "Fevrier 06, 2026",
    country: "France",
    verified: true,
    color: "Grey",
    colorFr: "Gris",
    size: "270x110cm",
    content:
      "Sound professional here - this panel delivers on its promises. The absorption is consistent and the design is clean. Perfect for a home studio. Definitely a quality investment.",
    contentFr:
      "Professionnel du son ici - ce panneau livre ce qu'il promet. L'absorption est coherente et le design est epure. Parfait pour un studio maison. Definitivement un investissement de qualite.",
    images: ["/flexible-panel-desk-workspace.jpg"],
    helpfulCount: 44,
  },
  {
    id: "9",
    author: "Suzanne Beaumont",
    rating: 5,
    title: "Impressive black panel wall",
    titleFr: "Mur de panneaux noirs impressionnant",
    date: "February 04, 2026",
    dateFr: "Fevrier 04, 2026",
    country: "France",
    verified: true,
    color: "Black",
    colorFr: "Noir",
    size: "270x110cm",
    content:
      "I created an accent wall with multiple black panels. The look is modern and sophisticated. The room's acoustics have improved dramatically. All my visitors love it!",
    contentFr:
      "J'ai cree un mur d'accent avec plusieurs panneaux noirs. Le look est moderne et sophistique. L'acoustique de la piece s'est considerablement amelioree. Tous mes visiteurs adorent!",
    images: ["/images/review-staircase-dark-panels.jpg"],
    helpfulCount: 40,
  },
  {
    id: "10",
    author: "Philippe Mercier",
    rating: 5,
    title: "Exceptional versatility",
    titleFr: "Polyvalence exceptionnelle",
    date: "February 02, 2026",
    dateFr: "Fevrier 02, 2026",
    country: "France",
    verified: true,
    color: "Natural Oak",
    colorFr: "Chene Naturel",
    size: "270x110cm",
    content:
      "I used the panels in multiple areas of my home - living room, office, even open kitchen. The flexibility allows perfect adaptation to any space. Undeniable quality!",
    contentFr:
      "J'ai utilise les panneaux dans plusieurs zones de ma maison - salon, bureau, meme cuisine ouverte. La flexibilite permet une adaptation parfaite dans n'importe quel espace. Qualite indeniable!",
    images: ["/images/review-modern-kitchen-panels.jpg"],
    helpfulCount: 37,
  },
]

const totalReviews = 2847

const LABELS = {
  en: {
    title: "Customer Reviews",
    outOf: "out of",
    reviews: "reviews",
    posted: "Posted",
    in: "in",
    on: "on",
    size: "Size",
    color: "Color",
    verifiedPurchase: "Verified Purchase",
    helpful: "people found this helpful",
    helpfulButton: "Helpful",
    thanks: "Thanks!",
  },
  fr: {
    title: "Avis Clients",
    outOf: "sur",
    reviews: "avis",
    posted: "Avis postes",
    in: "en",
    on: "le",
    size: "Taille",
    color: "Couleur",
    verifiedPurchase: "Achat Verifie",
    helpful: "personnes trouvent cet avis utile",
    helpfulButton: "Utile",
    thanks: "Merci !",
  },
}

export function CustomerReviews() {
  const [helpfulReviews, setHelpfulReviews] = useState<string[]>([])
  const { language } = useLanguage()
  const isFrench = language === "fr"
  const t = LABELS[language]

  const handleHelpful = (reviewId: string) => {
    if (!helpfulReviews.includes(reviewId)) {
      setHelpfulReviews([...helpfulReviews, reviewId])
    }
  }

  const averageRating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length

  return (
    <section className="mt-16 border-t border-border pt-12 overflow-hidden">
      {/* Header */}
      <div className="mb-8">
        <h2 className="font-serif text-xl sm:text-2xl">{t.title}</h2>
        <div className="mt-3 flex items-center gap-2 sm:gap-3 flex-wrap">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-4 sm:h-5 w-4 sm:w-5 ${star <= averageRating ? "fill-amber-400 text-amber-400" : "text-gray-300"}`}
              />
            ))}
          </div>
          <span className="text-xs sm:text-sm text-muted-foreground">
            {averageRating.toFixed(1)} {t.outOf} 5 | {totalReviews} {t.reviews}
          </span>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-8">
        {reviews.map((review) => (
          <article key={review.id} className="border-b border-border pb-8 last:border-0">
            {/* Author */}
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-8 sm:h-10 w-8 sm:w-10 items-center justify-center rounded-full bg-muted flex-shrink-0">
                <User className="h-4 sm:h-5 w-4 sm:w-5 text-muted-foreground" />
              </div>
              <span className="font-medium text-sm sm:text-base">{review.author}</span>
            </div>

            {/* Rating & Title */}
            <div className="flex items-start gap-2 mb-1 flex-wrap">
              <div className="flex flex-shrink-0">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-3.5 sm:h-4 w-3.5 sm:w-4 ${star <= review.rating ? "fill-amber-400 text-amber-400" : "text-gray-300"}`}
                  />
                ))}
              </div>
              <span className="font-semibold text-sm sm:text-base break-words">
                {isFrench ? (review.titleFr || review.title) : review.title}
              </span>
            </div>

            {/* Date & Location */}
            <p className="text-xs sm:text-sm text-muted-foreground mb-1">
              {t.posted} {t.in} {review.country} {t.on} {isFrench ? (review.dateFr || review.date) : review.date}
            </p>

            {/* Product Details */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs sm:text-sm mb-3">
              {review.size && <span className="text-muted-foreground">{t.size}: {review.size}</span>}
              {review.size && review.color && <span className="text-muted-foreground">|</span>}
              {review.color && <span className="text-muted-foreground">{t.color}: {isFrench ? (review.colorFr || review.color) : review.color}</span>}
              {review.verified && (
                <>
                  <span className="text-muted-foreground">|</span>
                  <span className="font-medium text-amber-600">{t.verifiedPurchase}</span>
                </>
              )}
            </div>

            {/* Content */}
            <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
              {isFrench ? (review.contentFr || review.content) : review.content}
            </p>

            {/* Images */}
            {review.images.length > 0 && (
              <div className="flex gap-2 mb-4 overflow-x-auto">
                {review.images.map((image, index) => (
                  <div
                    key={index}
                    className="h-24 w-24 sm:h-32 sm:w-32 flex-shrink-0 overflow-hidden rounded-lg bg-muted"
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`Review image ${index + 1}`}
                      width={128}
                      height={128}
                      className="h-full w-full object-cover"
                      style={{ width: "auto", height: "auto" }}
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Helpful */}
            <div className="flex items-center gap-4">
              <p className="text-xs sm:text-sm text-muted-foreground">
                {review.helpfulCount + (helpfulReviews.includes(review.id) ? 1 : 0)} {t.helpful}
              </p>
            </div>
            <div className="flex items-center gap-3 mt-2">
              <button
                onClick={() => handleHelpful(review.id)}
                disabled={helpfulReviews.includes(review.id)}
                className="flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ThumbsUp className="h-3.5 sm:h-4 w-3.5 sm:w-4" />
                {helpfulReviews.includes(review.id) ? t.thanks : t.helpfulButton}
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
