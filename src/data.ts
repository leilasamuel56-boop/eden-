/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Service, WellnessPackage, Review, BridalPackage } from "./types";

export const COMPANY_INFO = {
  name: "Eden SPA Ouaga",
  subName: "by Nour Cosmétique",
  address: "Village Nong Taaba, Ouaga 2000, 01 BP 1338 Ouaga 01, Ouagadougou, Burkina Faso",
  whatsapp: "+22671944622", // Clean numeric format for wa.me redirect
  phoneDisplay: "+226 71 94 46 22",
  phoneSecondary: "+226 01 20 01 00",
  secondaryFormatted: "+22601200100",
  hours: "Ouvert tous les jours de 09h00 à 20h00",
  hoursHint: "Généralement très fréquenté vers 10h. Pensez à réserver à l'avance !",
  googleRating: 4.9,
  googleReviewCount: 14,
  instagramUrl: "https://www.instagram.com/eden.spa.oua/",
  instagramHandle: "@eden.spa.oua",
  facebookUrl: "https://www.facebook.com/people/Eden-spa-Ouagadougou/100063510526362/",
  facebookName: "Eden spa | Ouagadougou",
  offerMonthCountdownDays: 15, // Countdown end relative to current time for monthly offer
};

export const SERVICES: Service[] = [
  // --- MASSAGES ---
  {
    id: "massage-relaxant",
    name: "Massage Relaxant",
    category: "Massages d'Exception",
    description: "Une évasion sensorielle fluide aux huiles aromatiques chaudes de Nour Cosmétique. Idéal pour libérer le stress quotidien, détendre profondément les muscles fatigués et apaiser durablement l'esprit dans une ambiance tamisée propice au lâcher-prise.",
    durationMin: 60,
    priceFCFA: 20000,
    imageSrc: "https://i.imgur.com/9V7M8om.jpeg",
  },
  {
    id: "massage-tonifiant",
    name: "Massage Tonifiant",
    category: "Massages d'Exception",
    description: "Un soin dynamisant qui allie des pressions appuyées et des mouvements vigoureux pour stimuler la circulation sanguine, raviver l'énergie vitale et libérer les tensions accumulées du corps tout entier.",
    durationMin: 60,
    priceFCFA: 25000,
    imageSrc: "https://i.imgur.com/afz2RZ8.jpeg",
  },
  {
    id: "massage-sportif",
    name: "Massage Sportif",
    category: "Massages d'Exception",
    description: "Une technique thérapeutique rigoureuse ciblant les muscles en profondeur. Recommandé pour soulager les courbatures chroniques, assouplir les articulations et optimiser la récupération musculaire après l'effort physique.",
    durationMin: 60,
    priceFCFA: 25000,
    imageSrc: "https://i.imgur.com/p3YFODG.jpeg",
  },
  {
    id: "massage-amincissant",
    name: "Massage Amincissant",
    category: "Massages d'Exception",
    description: "Un protocole minceur ciblé de palpé-roulé manuel associé à des huiles essentielles drainantes de Nour Cosmétique. Idéal pour raffermir les tissus, relancer la lymphe et sculpter harmonieusement la silhouette.",
    durationMin: 60,
    priceFCFA: 25000,
    imageSrc: "https://i.imgur.com/oZuWVIg.jpeg",
  },
  {
    id: "massage-4mains",
    name: "Massage 04 Mains",
    category: "Massages d'Exception",
    description: "Une expérience royale absolue où deux praticiennes synchronisent parfaitement leurs mouvements pour envelopper votre corps d'une vague de bien-être continue. Le summum du lâcher-prise neurologique et physique.",
    durationMin: 60,
    priceFCFA: 35000,
    imageSrc: "https://i.imgur.com/SHXIjv1.jpeg",
  },
  {
    id: "massage-couple",
    name: "Massage Couple",
    category: "Massages d'Exception",
    description: "Partagez un instant de sérénité suspendu dans le temps avec l'être cher ou un proche. Deux tables disposées côte à côte dans une cabine privatisée et parfumée, bercée par une musique douce et une lueur de bougies apaisantes.",
    durationMin: 60,
    priceFCFA: 40000,
    imageSrc: "https://i.imgur.com/X4SPcoQ.jpeg",
  },
  {
    id: "massage-vip",
    name: "Massage VIP (Relaxant/Tonifiant)",
    category: "Massages d'Exception",
    description: "Le soin de prestige par excellence dans notre suite VIP privative. Un massage sur-mesure combinant techniques de relaxation et de tonification profonde, accompagné d'huiles rares de Nour Cosmétique et d'un service d'exception.",
    durationMin: 60,
    priceFCFA: 50000,
    imageSrc: "https://i.imgur.com/AKyJFsD.jpeg",
  },

  // --- SOINS CORPORELS ---
  {
    id: "soin-corps-neutre",
    name: "Soin Corps Neutre",
    category: "Soins Corporels",
    description: "Un soin corporel purifiant, doux et réhydratant en profondeur. Idéal pour nourrir intensément la peau de manière saine et naturelle, sans parfum ni colorant de synthèse, pour retrouver un équilibre cutané parfait.",
    durationMin: 45,
    priceFCFA: 15000,
    imageSrc: "https://i.imgur.com/QyAW1b5.jpeg",
  },
  {
    id: "soin-corps-clarifiant",
    name: "Soin Corps Clarifiant",
    category: "Soins Corporels",
    description: "Spécialement formulé pour unifier le teint, raviver l'éclat de la peau et estomper délicatement les imperfections cutanées. Offrez à votre corps une luminosité rafraîchissante et un toucher soyeux incomparable.",
    durationMin: 60,
    priceFCFA: 20000,
    imageSrc: "https://i.imgur.com/1VrcXqk.jpeg",
  },
  {
    id: "soin-corps-eclaircissant",
    name: "Soin Corps Éclaircissant & Modelage",
    category: "Soins Corporels",
    description: "Un protocole d'exception combinant une exfoliation active éclaircissante, un soin illuminateur de teint et un modelage relaxant enveloppant. Redonne instantanément éclat radieux et douceur infinie à l'ensemble du corps.",
    durationMin: 75,
    priceFCFA: 30000,
    imageSrc: "https://i.imgur.com/woNE99K.jpeg",
  },

  // --- SOINS VISAGE ---
  {
    id: "soin-neutre",
    name: "Soin neutre",
    category: "Soins Visage",
    description: "Un véritable retour aux sources de la pureté cutanée. Ce nettoyage profond libère les pores, unifie le teint et redonne de la clarté naturelle à votre épiderme grâce à un gommage délicat et un masque purifiant adapté aux besoins essentiels de votre visage.",
    durationMin: 45,
    priceFCFA: 10000,
    imageSrc: "https://i.imgur.com/bh7QENs.jpeg",
  },
  {
    id: "soin-eclatant-lumino-therapie",
    name: "Soin éclatant + Lumino Thérapie",
    category: "Soins Visage",
    description: "Sublimez votre visage d'un éclat spectaculaire. Un rituel revitalisant alliant actifs illuminants et l'innovation de la lumino-thérapie par LED jaune et rouge pour stimuler la microcirculation, unifier le grain de peau et raviver l'éclat originel de votre teint.",
    durationMin: 60,
    priceFCFA: 15000,
    imageSrc: "https://i.imgur.com/k1spxPq.jpeg",
  },
  {
    id: "soin-anti-acne-lumino-therapie",
    name: "Soin Anti-acné + Lumino Thérapie",
    category: "Soins Visage",
    description: "Un traitement purifiant souverain pour apaiser et rééquilibrer les peaux sujettes aux imperfections. La synergie d'extraits botaniques assainissants et de la lumino-thérapie LED bleue régule l'excès de sébum, réduit visiblement les rougeurs et accélère la cicatrisation cutanée.",
    durationMin: 60,
    priceFCFA: 15000,
    imageSrc: "https://i.imgur.com/orCFv2v.jpeg",
  },
  {
    id: "soin-vip-lumino-therapie",
    name: "Soin VIP + Lumino Thérapie",
    category: "Soins Visage",
    description: "La quintessence absolue du soin du visage sur-mesure. Une expérience multisensorielle d'exception combinant exfoliation enzymatique, sérums hautement concentrés, massage facial remodelant et lumino-thérapie personnalisée pour une peau visiblement regalbée, repulpée et divinement lumineuse.",
    durationMin: 90,
    priceFCFA: 30000,
    imageSrc: "https://i.imgur.com/Z4q7UpW.jpeg",
  },
  {
    id: "soin-anti-age",
    name: "Soin Anti-âge",
    category: "Soins Visage",
    description: "Un élixir de jeunesse pour lifter et raffermir les traits fatigués. Ce rituel d'exception associe des manoeuvres de massage manuel sculptant et de savantes techniques d'application de collagène et d'acide hyaluronique pour repulper les rides, estomper les ridules et redessiner l'ovale du visage.",
    durationMin: 75,
    priceFCFA: 20000,
    imageSrc: "https://i.imgur.com/1lSjXWN.jpeg",
  },

  // --- JACUZZI ---
  {
    id: "jacuzzi-solo",
    name: "Bain Jacuzzi Hydro-Massant (Solo)",
    category: "Rituels Jacuzzi",
    description: "Profitez en toute intimité de notre jacuzzi de luxe avec buses de massage, chromothérapie apaisante, sels parfumés et thé de bienvenue offert.",
    durationMin: 45,
    priceFCFA: 15000,
    imageSrc: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "jacuzzi-complice-duo",
    name: "Rituel Jacuzzi Plaisir Complice (Duo)",
    category: "Rituels Jacuzzi",
    description: "Espace privatisé pour deux. Bain à remous parfumé, plateau de fruits exotiques de saison, nectars de fruits rafraîchissants et bougies d'ambiance.",
    durationMin: 60,
    priceFCFA: 35000,
    imageSrc: "https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=600&auto=format&fit=crop",
  },

  // --- MANUCURE / PEDICURE / ONGLES ---
  {
    id: "manucure-pedicure",
    name: "Manucure - Pédicure",
    category: "Beauté Pieds & Mains",
    description: "Le rituel de beauté complet absolu pour vos mains et vos pieds. Comprend un limage précis, soin des cuticules, gommage exfoliant lissant aux huiles parfumées et un massage relaxant d'hydratation intense.",
    durationMin: 75,
    priceFCFA: 10000,
    imageSrc: "https://i.imgur.com/xkWoMK7.jpeg",
  },
  {
    id: "pedicure-simple",
    name: "Pédicure simple",
    category: "Beauté Pieds & Mains",
    description: "Un soin ciblé et efficace pour la mise en beauté et la fraîcheur immédiate de vos pieds. Bain relaxant, soin des ongles et des cuticules, suivi d'une hydratation douce de la peau.",
    durationMin: 45,
    priceFCFA: 7000,
    imageSrc: "https://i.imgur.com/r66u1el.jpeg",
  },
  {
    id: "pose-vernis-classique",
    name: "Pose vernis classique",
    category: "Beauté Pieds & Mains",
    description: "Une application minutieuse de vernis classique haut de gamme parmi une large palette de teintes éclatantes, sublimée par un top coat protecteur brillant.",
    durationMin: 20,
    priceFCFA: 2000,
    imageSrc: "https://i.imgur.com/fDBVmP7.jpeg",
  },
  {
    id: "pose-vernis-classique-capsule",
    name: "Pose vernis classique sur capsule",
    category: "Beauté Pieds & Mains",
    description: "Rallongement élégant de l'ongle grâce à la pose de capsules délicates, complété par une application de vernis classique pour un rendu sophistiqué.",
    durationMin: 40,
    priceFCFA: 3000,
    imageSrc: "https://i.imgur.com/BRluLHE.jpeg",
  },
  {
    id: "pose-vernis-permanent-pieds",
    name: "Pose vernis permanent sur pieds",
    category: "Beauté Pieds & Mains",
    description: "Un vernis permanent longue durée d'une brillance parfaite et sans écaillement, spécialement posé et catalysé sous lampe pour des pieds impeccables pendant des semaines.",
    durationMin: 30,
    priceFCFA: 3000,
    imageSrc: "https://i.imgur.com/ihiRA5U.jpeg",
  },
  {
    id: "pose-vernis-permanent-mains-pieds",
    name: "Pose vernis permanent mains & pieds",
    category: "Beauté Pieds & Mains",
    description: "Le duo de charme parfait. Pose de vernis permanent sur-mesure sur les mains et les pieds, garantissant une brillance éclatante et une tenue irréprochable de longue durée.",
    durationMin: 50,
    priceFCFA: 6000,
    imageSrc: "https://i.imgur.com/01lf6Oi.jpeg",
  },
  {
    id: "pose-permanent-capsule",
    name: "Pose permanent sur capsule",
    category: "Beauté Pieds & Mains",
    description: "Allongement de l'ongle par capsules haute résistance, suivi d'une pose de vernis permanent brillant pour une tenue maximale sans retouche.",
    durationMin: 45,
    priceFCFA: 5000,
    imageSrc: "https://i.imgur.com/QElK5j3.jpeg",
  },
  {
    id: "pose-gel",
    name: "Pose gel",
    category: "Beauté Pieds & Mains",
    description: "La technique de modelage en gel pour fortifier, structurer et galber magnifiquement vos ongles naturels, avec une brillance et un raffinement sans compromis.",
    durationMin: 60,
    priceFCFA: 10000,
    imageSrc: "https://i.imgur.com/6thUxqj.jpeg",
  },
  {
    id: "pose-resine",
    name: "Pose résine",
    category: "Beauté Pieds & Mains",
    description: "Une pose d'acrylique d'une solidité légendaire pour sculpter des ongles d'une symétrie parfaite et hautement personnalisables selon vos souhaits artistiques.",
    durationMin: 60,
    priceFCFA: 10000,
    imageSrc: "https://i.imgur.com/o0Pyhfk.jpeg",
  },
  {
    id: "grainage",
    name: "Grainage",
    category: "Beauté Pieds & Mains",
    description: "Soin de polissage expert permettant d'affiner le grain de l'ongle, d'unifier sa surface et de lui redonner un éclat naturel sain et radieux.",
    durationMin: 30,
    priceFCFA: 7000,
    imageSrc: "https://i.imgur.com/WcuPvLk.jpeg",
  },
  {
    id: "pose-gel-chablon",
    name: "Pose gel sur chablon",
    category: "Beauté Pieds & Mains",
    description: "Une technique de rallongement sur-mesure sans capsule, sculptée directement au gel sur vos ongles pour un résultat ultra-naturel, souple et surprenant de légèreté.",
    durationMin: 90,
    priceFCFA: 15000,
    imageSrc: "https://i.imgur.com/Cc9nG8K.jpeg",
  },
  {
    id: "remplissage-gel",
    name: "Remplissage gel",
    category: "Beauté Pieds & Mains",
    description: "Soin d'entretien de votre pose de gel toutes les 3 à 4 semaines. Comble la repousse de l'ongle, réajuste la forme et renouvelle le vernis pour un aspect neuf.",
    durationMin: 60,
    priceFCFA: 7000,
    imageSrc: "https://i.imgur.com/Gau7KFf.jpeg",
  },
  {
    id: "depose-vernis-permanent",
    name: "Dépose vernis permanent",
    category: "Beauté Pieds & Mains",
    description: "Retrait en douceur de votre vernis permanent à l'aide de papillotes de soins nourrissants Nour Cosmétique, respectant parfaitement la kératine naturelle de l'ongle.",
    durationMin: 15,
    priceFCFA: 1000,
    imageSrc: "https://i.imgur.com/HsPPAJg.jpeg",
  },
  {
    id: "depose-gel",
    name: "Dépose gel",
    category: "Beauté Pieds & Mains",
    description: "Technique de retrait sécurisée de la pose en gel par ponçage professionnel précis, suivi d'un soin durcisseur réparateur pour fortifier l'ongle.",
    durationMin: 30,
    priceFCFA: 2000,
    imageSrc: "https://i.imgur.com/B1clcB8.jpeg",
  },

  // --- ÉPILATIONS ---
  {
    id: "epilation-aisselles",
    name: "Épilation aisselles",
    category: "Épilations",
    description: "Un soin d’épilation précis et rapide réalisé à l'aide d'une cire tiède enrichie en actifs apaisants. Élimine efficacement les poils tout en respectant la sensibilité extrême de cette zone délicate, pour une douceur durable et une peau parfaitement nette.",
    durationMin: 15,
    priceFCFA: 6000,
    imageSrc: "https://i.imgur.com/yvehB8T.jpeg",
  },
  {
    id: "epilation-menton",
    name: "Épilation menton",
    category: "Épilations",
    description: "Une épilation ciblée du visage pour éliminer en douceur les duvets et poils indésirables du menton. Réalisée avec une cire haute tolérance cutanée qui respecte la fragilité de la peau et ralentit la repousse.",
    durationMin: 15,
    priceFCFA: 4000,
    imageSrc: "https://i.imgur.com/kQdTjSt.jpeg",
  },
  {
    id: "epilation-sourcil",
    name: "Épilation sourcil",
    category: "Épilations",
    description: "Une restructuration ou un entretien minutieux de la ligne de vos sourcils à la cire tiède de précision. Redessine harmonieusement le regard tout en préservant la symétrie naturelle de votre visage.",
    durationMin: 15,
    priceFCFA: 3000,
    imageSrc: "https://i.imgur.com/YKoYxmL.jpeg",
  },
  {
    id: "epilation-maillot",
    name: "Épilation maillot",
    category: "Épilations",
    description: "Une épilation classique ou échancrée selon vos préférences, réalisée avec une cire professionnelle de grande douceur pour minimiser les sensations d'inconfort. Laisse la peau lisse et impeccablement soignée.",
    durationMin: 30,
    priceFCFA: 12000,
    imageSrc: "https://i.imgur.com/BvqlWeK.jpeg",
  },
  {
    id: "epilation-maillot-complet",
    name: "Épilation maillot complet",
    category: "Épilations",
    description: "Un protocole d'épilation intégrale ultra-soigné combinant technicité et douceur absolue. Utilisation d'une cire premium spécialement conçue pour les zones ultra-sensibles, suivie de l'application d'un soin hydratant et apaisant.",
    durationMin: 40,
    priceFCFA: 15000,
    imageSrc: "https://i.imgur.com/TOx9CcG.jpeg",
  },
  {
    id: "epilation-demi-jambe",
    name: "Épilation demi-jambe",
    category: "Épilations",
    description: "Retrouvez des jambes divinement lisses et douces. Élimination complète des poils des chevilles aux genoux avec une cire fluide de haute qualité qui respecte la circulation sanguine et exfolie délicatement.",
    durationMin: 30,
    priceFCFA: 10000,
    imageSrc: "https://i.imgur.com/2lt6DJC.jpeg",
  },
  {
    id: "epilation-jambe-complete",
    name: "Épilation jambe complète",
    category: "Épilations",
    description: "Le soin de douceur totale pour vos jambes, des chevilles jusqu'aux cuisses. Une cire tiède douce est appliquée avec précision pour une peau soyeuse, satinée et libérée de toutes imperfections pour plusieurs semaines.",
    durationMin: 45,
    priceFCFA: 20000,
    imageSrc: "https://i.imgur.com/SZeO5OD.jpeg",
  },
  {
    id: "epilation-bras",
    name: "Épilation bras",
    category: "Épilations",
    description: "Une élimination impeccable des poils sur toute la longueur des bras. Réalisée avec une cire protectrice qui adoucit la peau et garantit un résultat net, homogène et un toucher velours irrésistible.",
    durationMin: 30,
    priceFCFA: 10000,
    imageSrc: "https://i.imgur.com/7bb2Vrm.jpeg",
  },
  {
    id: "epilation-tout-le-corps",
    name: "Épilation tout le corps",
    category: "Épilations",
    description: "L'expérience d'épilation absolue et prestigieuse pour un corps d'une douceur infinie de la tête aux pieds. Un rituel complet comprenant toutes les zones souhaitées, réalisé avec le plus grand soin et suivi d'une onctueuse hydratation protectrice Nour Cosmétique.",
    durationMin: 90,
    priceFCFA: 40000,
    imageSrc: "https://i.imgur.com/3oSpha5.jpeg",
  }
];

export const WELLNESS_PACKAGES: WellnessPackage[] = [
  {
    id: "rituel-eden-sublime",
    name: "Rituel Eden Sublime",
    description: "Notre forfait combiné signature pour une renaissance corporelle complète de la tête aux pieds. Le bien-être absolu.",
    originalPrice: 70000,
    packagePrice: 59000, // Safe savings of 11,000 FCFA
    durationMin: 150,
    includesList: [
      "Massage Évasion Sensorielle au choix (60 min)",
      "Gommage Sublime Coco & Karité (45 min)",
      "Soin Visage Flash Éclat Hydratant (45 min)",
      "Thé détoxifiant & collation de prestige offerte"
    ],
    imageSrc: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=600&auto=format&fit=crop",
    popular: true
  },
  {
    id: "escapade-amoureuse-duo",
    name: "Escapade Romantique en Duo",
    description: "Partagez un moment d'exception suspendu dans le temps avec la personne de votre choix. Conçu pour déconnecter à deux.",
    originalPrice: 85000,
    packagePrice: 75000, // Saving 10,000 FCFA
    durationMin: 120,
    includesList: [
      "Privatisation Jacuzzi avec bougies & musique (45 min)",
      "Massages relaxants simultanés en cabine duo (60 min)",
      "Coupes de nectars pétillants non-alcoolisés & plateau de fruits frais",
      "Une petite surprise parfumée Nour Cosmétique offerte"
    ],
    imageSrc: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=600&auto=format&fit=crop",
    popular: false
  },
  {
    id: "rituel-perle-de-beaute",
    name: "Rituel Reine de Sabbat",
    description: "Un parcours beauté complet et ressourçant pour briller d'un éclat nouveau lors de vos grands événements ou votre routine mensuelle.",
    originalPrice: 55000,
    packagePrice: 48000, // Saving 7,000 FCFA
    durationMin: 165,
    includesList: [
      "Beauté des Mains Signature complète (45 min)",
      "Beauté des Pieds Royale Spa avec massage (60 min)",
      "Pose de vernis semi-permanent (mains ou pieds)",
      "Soin visage purifiant & coup d'éclat (60 min)",
      "Boisson fraîche fruitée de bienvenue"
    ],
    imageSrc: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=600&auto=format&fit=crop",
    popular: false
  }
];

export const BRIDAL_PACKAGES: BridalPackage[] = [
  {
    id: "mariee-formule-1",
    name: "Formule 1",
    description: "Le rituel impérial de mise en beauté absolue pour votre grand jour. Un parcours de soin d'exception combinant pure détente et rituels sublimes de la tête aux pieds.",
    priceText: "Prestige",
    images: [
      "https://i.imgur.com/0ldMEzo.jpeg",
      "https://i.imgur.com/18NelQJ.jpeg",
      "https://i.imgur.com/7A6xpcF.jpeg",
      "https://i.imgur.com/CjbNdOb.jpeg",
      "https://i.imgur.com/fbMEnRC.jpeg"
    ],
    includesList: [
      "04 Soins corps",
      "02 Soins visage",
      "02 Manucure-Pédicure",
      "01 Pose gel/résine",
      "01 Massage"
    ]
  },
  {
    id: "mariee-formule-2",
    name: "Formule 2",
    description: "La quintessence de l'éclat et du bien-être pour vous sublimer de façon mémorable avant la célébration.",
    priceText: "Raffinement",
    images: [
      "https://i.imgur.com/IQBu9ID.jpeg",
      "https://i.imgur.com/7EnHGma.jpeg",
      "https://i.imgur.com/GY6BeFQ.jpeg",
      "https://i.imgur.com/vrvt5UR.jpeg",
      "https://i.imgur.com/N47t7vf.jpeg"
    ],
    includesList: [
      "02 Manucure-Pédicure",
      "01 Coiffure",
      "01 Soin corps",
      "01 Soin visage",
      "01 Massage"
    ]
  }
];

export const REVIEWS: Review[] = [
  {
    id: "rev-1",
    name: "Assiata Sawadogo",
    rating: 5,
    text: "Un moment magique ! L'accueil est incroyable et le massage signature est le meilleur que j'ai pu avoir à Ouaga. Le gommage coco et karité laisse une peau d'une douceur infinie. Un institut 5 étoiles à Ouaga 2000.",
    date: "Il y a 2 semaines",
    source: "Google"
  },
  {
    id: "rev-2",
    name: "Marc-Aurèle Compaoré",
    rating: 5,
    text: "J'y suis allé en duo avec mon épouse. Le forfait Jacuzzi + Massage est exceptionnel. Tout est fait pour relaxer dans un calme absolu. Propreté impeccable et équipe d'un grand professionnalisme.",
    date: "Il y a 1 mois",
    source: "Google"
  },
  {
    id: "rev-3",
    name: "Fatoumata Barry",
    rating: 5,
    text: "Les soins du visage de Nour Cosmétique sont d'une qualité inégalée. Ma peau revit depuis que je fais mes soins ici. Je recommande chaudement la carte fidélité qui offre d'excellents avantages.",
    date: "Il y a 3 semaines",
    source: "Google"
  }
];


