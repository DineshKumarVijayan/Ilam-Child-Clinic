export const siteConfig = {
  name: "ILAM Child Clinic & Vaccination Centre",
  shortName: "ILAM Child Clinic",
  tagline: "Compassionate pediatric care for your little ones in Chennai",
  description:
    "ILAM Child Clinic & Vaccination Centre in Vanagaram, Chennai offers child clinic consultations, vaccinations, nebulisation, ENT, and skin care for infants and children in a warm, child-friendly environment.",
  url: "https://ilamchildclinic.com",
  logo: "/clinic-logo.png",
  phone: "+919600998860",
  phoneDisplay: "+91 9600998860",
  whatsappNumber: "919600998860",
  whatsappMessage: "Hello Doctor, I would like to book an appointment",
  email: "ilamchildclinic@gmail.com",
  instagramHandle: "ilam_child_clinic",
  instagramUrl: "https://instagram.com/ilam_child_clinic",
  address: {
    line1:
      "123, 4th Street, Union Road, Yadaval St, near Sri Padmavathi Palace",
    line2: "Kambar Nagar, Vanagaram, Adayalampattu, Chennai, Tamil Nadu 600095",
    country: "India",
  },
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.5662440477954!2d80.1551442!3d13.063258799999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a526182d988931f%3A0xc257a8ba71dc54b1!2sILAM%20CHILD%20CLINIC%20AND%20VACCINATION%20CENTRE%20-%20Pediatrician!5e0!3m2!1sen!2sin!4v1781767149870!5m2!1sen!2sin",
  googleReviewsUrl:
    "https://search.google.com/local/reviews?placeid=ChIJH5OI2YJhUjoRsVTccbqoV8I",
  googleRating: 4.9,
  googleReviewCount: "120+",
  heroCarousel: {
    // Time each slide stays before auto-advancing (in milliseconds). Configurable.
    intervalMs: 10000,
    // Images shown in serial order. Add your files to /public and list them here
    // in the same order as their serial numbers.
    images: [
      { src: "/carousel/1.png", alt: "When should I worry? Warning signs to watch for in your child" },
      { src: "/carousel/2.png", alt: "Vaccine importance — why timely vaccination protects your child" },
      { src: "/carousel/3.png", alt: "Medicine safety — safe medicine habits for children" },
      { src: "/carousel/4.png", alt: "Myth vs fact — clearing up common child health myths" },
      { src: "/carousel/5.png", alt: "Parent survival tips — handling fever, diarrhea, cold and cough at home" },
      { src: "/carousel/6.png", alt: "Child nutrition — building a healthy, balanced plate" },
    ],
  },
  hero: {
    badge: "Trusted Pediatric Care · Chennai",
    headingLine1: "Healthy Today,",
    headingLine2: "Happy Tomorrow",
    subtext:
      "Compassionate care for every stage of your child's growth, from newborns to teenagers.",
    // Main hero photo — drop your file at this path in /public to replace the placeholder.
    image: "/hero/hero.png",
    imageAlt: "Pediatrician examining a happy baby at ILAM Child Clinic",
    familyBadge: {
      label: "Loved by 500+ Families",
      avatar: "/hero/avatar.png",
    },
    locationNote: "Conveniently located for you",
    highlights: [
      { label: "Experienced Pediatricians", icon: "doctor" },
      { label: "Vaccination Centre", icon: "syringe" },
      { label: "Child-Friendly Environment", icon: "handheart" },
    ],
    features: [
      { title: "Newborn Care", description: "Gentle care for your little one", icon: "baby" },
      { title: "Vaccinations", description: "Complete immunization under one roof", icon: "shield" },
      { title: "Growth Monitoring", description: "Track milestones, nurture better", icon: "family" },
      { title: "Adolescent Health", description: "Support for a healthy young life", icon: "pulse" },
      { title: "Quick Support", description: "We're here when you need us", icon: "phone" },
    ],
  },
  doctors: [
    {
      name: "Dr. Tarun",
      title: "Consultant Pediatrician",
      image: "/Tarun.png",
      qualifications: ["MBBS", "MD (Pediatrics)", "DNB"],
      education: [
        { degree: "MBBS", institution: "JJM Medical College" },
        { degree: "MD (Pediatrics)", institution: "Kilpauk Medical College" },
        { degree: "DNB (Pediatrics)", institution: "NBE Certified" },
      ],
      bio: "Dr. Tarun provides thoughtful, evidence-based care for infants, children, and adolescents with a calm and reassuring approach for every family.",
    },
    {
      name: "Dr. Akshaya",
      title: "Consultant Pediatrician",
      image: "/Akshaya.png",
      qualifications: ["MBBS", "MD (Pediatrics)", "DNB"],
      education: [
        { degree: "MBBS", institution: "Karpaga Vinayaga Institute of Medical Sciences" },
        { degree: "MD (Pediatrics)", institution: "Madras Medical College – ICH Egmore" },
        { degree: "DNB (Pediatrics)", institution: "NBE Certified" },
      ],
      bio: "Dr. Akshaya focuses on gentle pediatric consultations, vaccination guidance, and clear communication to help parents feel confident about their child's care.",
    },
  ],
  qualifications: [
    {
      title: "MBBS",
      description: "Bachelor of Medicine and Bachelor of Surgery",
    },
    {
      title: "MD (Pediatrics)",
      description: "Doctor of Medicine in Pediatrics",
    },
  ],
  experience: [
    "Both doctors are qualified with MBBS and MD (Pediatrics)",
    "Consultant pediatricians at ILAM Child Clinic & Vaccination Centre, Chennai",
    "Child clinic consultations for fever, cough, feeding concerns, and routine checkups",
    "Vaccination, nebulisation, ENT, and skin care services for infants and children",
  ],
  services: [
    {
      title: "New Born Care",
      description:
        "General pediatric consultations for infants and children, including fever, cough, feeding concerns, and routine checkups.",
      icon: "stethoscope",
    },
    {
      title: "Vaccination",
      description:
        "Immunization services following the recommended child vaccination schedule with proper guidance for parents.",
      icon: "syringe",
    },
    {
      title: "Nebulisation",
      description:
        "Nebulisation support for breathing difficulty, wheezing, cough, and other respiratory concerns in children.",
      icon: "nebuliser",
    },
    {
      title: "ENT",
      description:
        "Evaluation and care for common ear, nose, and throat problems in children.",
      icon: "ent",
    },
    {
      title: "Skin",
      description:
        "Consultation for common pediatric skin conditions such as rashes, allergies, and infections.",
      icon: "skin",
    },
    {
      title: "Growth & Development Assessment",
      description:
        "Regular tracking of your child's growth, milestones, and development to ensure healthy progress at every age.",
      icon: "chart",
    },
    {
      title: "Lactation & Nutrition Counselling",
      description:
        "Guidance for mothers on breastfeeding and age-appropriate nutrition to support healthy growth in infants and children.",
      icon: "nutrition",
    },
    {
      title: "Childhood Asthma, Allergy & Infectious Diseases",
      description:
        "Diagnosis and management of asthma, wheezing, allergies, and common infectious diseases in infants and children.",
      icon: "lungs",
    },
  ],
  timings: [
    { day: "Monday – Saturday", hours: "9:00 AM – 9:00 PM" },
    { day: "Sunday", hours: "9:00 AM – 1:00 PM" },
  ],
  growthJourney: [
    {
      age: "0–3 Months",
      stage: "Newborn",
      icon: "smile",
      image: "/growth/newborn.png",
      milestones: ["Smiles", "Recognizes parents"],
      nutritionIcon: "milk",
      nutrition: "Breast milk or formula. Feed on demand.",
    },
    {
      age: "6–12 Months",
      stage: "Infant",
      icon: "footprints",
      image: "/growth/infant.png",
      milestones: ["Rolls over", "Responds to sounds"],
      nutritionIcon: "bowl",
      nutrition: "Purees and mashed foods.",
    },
    {
      age: "1–3 Years",
      stage: "Toddler",
      icon: "walking",
      image: "/growth/toddler.png",
      milestones: ["Says simple words", "Starts walking"],
      nutritionIcon: "apple",
      nutrition: "Balanced meals and fruits.",
    },
    {
      age: "4–8 Years",
      stage: "Child",
      icon: "graduation",
      image: "/growth/child.png",
      milestones: ["Improves coordination & balance", "Builds reading, writing & social skills"],
      nutritionIcon: "leaf",
      nutrition: "Protein and calcium rich foods.",
    },
  ],
  growthBanner: {
    tips: [
      {
        icon: "lightbulb",
        title: "Every child is unique",
        description:
          "Milestones may vary, but love, care and good nutrition help every child thrive.",
      },
      {
        icon: "calendar",
        title: "Stay on track",
        description:
          "Regular check-ups and early guidance ensure a healthier tomorrow.",
      },
    ],
    cta: "Book Growth Check",
  },
  funFacts: [
    "Babies are born with about 300 bones — many fuse together over time, leaving adults with 206.",
    "Newborns can sleep up to 16 hours a day, in short stretches around the clock.",
    "Most children catch 6–8 colds every year before age 6 — it's a normal part of building immunity.",
    "A baby's sense of smell is so strong they can recognize their mother's scent within days of birth.",
    "Children's bones heal faster than adults' because they're still growing and full of blood supply.",
    "Babies don't produce tears when they cry until they're about 1–3 months old.",
  ],
  monthlyHealthFocus: [
    {
      month: "January",
      emoji: "🌅",
      title: "New Year Immunity Boost",
      tips: [
        "Check that vaccinations are on schedule",
        "Offer warm, balanced winter meals",
        "Keep a consistent sleep routine",
      ],
    },
    {
      month: "February",
      emoji: "🤧",
      title: "Cold & Cough Care",
      tips: [
        "Encourage frequent handwashing",
        "Keep your child warm during temperature dips",
        "Watch for fever lasting more than 2 days",
      ],
    },
    {
      month: "March",
      emoji: "🌼",
      title: "Seasonal Allergy Awareness",
      tips: [
        "Watch for sneezing, itchy eyes, or rashes",
        "Keep indoor spaces clean and dust-free",
        "Consult a doctor if symptoms persist",
      ],
    },
    {
      month: "April",
      emoji: "🌤️",
      title: "Sun Safety & Skin Care",
      tips: [
        "Dress your child in light, breathable cotton",
        "Apply child-safe sunscreen outdoors",
        "Avoid direct sun exposure between noon and 3 PM",
      ],
    },
    {
      month: "May",
      emoji: "🥵",
      title: "Beat the Heat",
      tips: [
        "Offer water and fluids frequently",
        "Limit outdoor play during peak heat hours",
        "Watch for signs of heat rash or exhaustion",
      ],
    },
    {
      month: "June",
      emoji: "☀️",
      title: "Summer Hydration",
      tips: [
        "Drink enough water",
        "Avoid midday heat",
        "Watch for dehydration symptoms",
      ],
    },
    {
      month: "July",
      emoji: "🌧️",
      title: "Monsoon Hygiene & Infection Care",
      tips: [
        "Avoid letting children play in stagnant water",
        "Serve freshly cooked, warm food",
        "Watch for fever, cold, or stomach infections",
      ],
    },
    {
      month: "August",
      emoji: "👀",
      title: "Eye Care & Screen Time Balance",
      tips: [
        "Limit screen time and encourage outdoor play",
        "Follow the 20-20-20 rule for eye breaks",
        "Watch for excessive eye rubbing or squinting",
      ],
    },
    {
      month: "September",
      emoji: "🍎",
      title: "Immunity Boosting Foods",
      tips: [
        "Add seasonal fruits and vegetables to meals",
        "Include nuts and seeds for healthy growth",
        "Maintain regular mealtimes",
      ],
    },
    {
      month: "October",
      emoji: "🦟",
      title: "Mosquito-borne Illness Awareness",
      tips: [
        "Use mosquito nets or repellents safely",
        "Remove stagnant water around the home",
        "Seek care promptly for high or persistent fever",
      ],
    },
    {
      month: "November",
      emoji: "🎆",
      title: "Festive Season Safety",
      tips: [
        "Keep children away from firecrackers",
        "Watch for smoke-related cough or breathing issues",
        "Maintain regular sleep and meal routines",
      ],
    },
    {
      month: "December",
      emoji: "❄️",
      title: "Winter Wellness & Skin Care",
      tips: [
        "Moisturize skin to prevent dryness",
        "Dress in layers to stay warm",
        "Ensure adequate vitamin D from sunlight",
      ],
    },
  ],
  reviews: [
    {
      name: "Priya R.",
      rating: 5,
      text: "Very patient and caring doctors. They explained everything clearly about my child's fever and vaccination schedule. The clinic is clean and child-friendly.",
      date: "2 weeks ago",
      avatarColor: "teal",
    },
    {
      name: "Karthik M.",
      rating: 5,
      text: "We visited for our baby's routine checkup. Dr. Tarun and Dr. Akshaya are both very approachable. Booking through WhatsApp was easy too.",
      date: "1 month ago",
      avatarColor: "amber",
    },
    {
      name: "Anitha S.",
      rating: 5,
      text: "Excellent vaccination centre with a calm environment. Staff were helpful and the doctors took time to answer all our questions as new parents.",
      date: "2 months ago",
      avatarColor: "blue",
    },
  ],
  reviewHighlights: [
    { icon: "shieldcheck", title: "Verified parent", subtitle: "feedback" },
    { icon: "whatsapp", title: "Fast WhatsApp", subtitle: "booking" },
    { icon: "plus", title: "High quality", subtitle: "pediatric care" },
    { icon: "smile", title: "Child-friendly", subtitle: "clinic" },
  ],
  reviewsCta: "Read more parent reviews",
  faqs: [
    {
      question: "When should I take my child to a pediatrician?",
      answer:
        "You should visit a pediatrician if your child has high fever, breathing difficulty, persistent cough, poor feeding, vomiting, diarrhea, unusual tiredness, rashes, or any symptoms that worry you.",
    },
    {
      question: "How often should my baby have routine checkups?",
      answer:
        "Babies usually need regular checkups during the first year to monitor growth, feeding, development, and vaccinations. The doctor will guide you based on your child's age and health.",
    },
    {
      question: "What vaccinations does my child need?",
      answer:
        "Vaccinations depend on your child's age and immunization schedule. Please bring your child's vaccination record during the visit so the doctor can advise correctly.",
    },
    {
      question: "What should I do if my child has fever?",
      answer:
        "Keep your child hydrated, dress them comfortably, and monitor temperature. Avoid self-medicating. Visit the doctor if fever is high, persistent, or associated with breathing difficulty, poor feeding, seizures, rash, or unusual sleepiness.",
    },
    {
      question: "Do you treat newborn babies?",
      answer:
        "Yes, the clinic provides consultation for newborn care, feeding concerns, jaundice, weight monitoring, and common newborn health issues.",
    },
    {
      question: "Can I contact the clinic through WhatsApp?",
      answer:
        "Yes, you can click the WhatsApp button on the website to send an appointment enquiry message directly.",
    },
    {
      question: "What should I bring for my child's appointment?",
      answer:
        "Please bring previous prescriptions, vaccination records, medical reports, allergy details, and a list of current medicines if any.",
    },
  ],
  navLinks: [
    { label: "Home", href: "#home" },
    { label: "Doctors", href: "#doctor" },
    { label: "Services", href: "#services" },
    { label: "Timings", href: "#timings" },
    { label: "Reviews", href: "#reviews" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" },
  ],
} as const;

export function getWhatsAppUrl() {
  const text = encodeURIComponent(siteConfig.whatsappMessage);
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${text}`;
}

export function getPhoneUrl() {
  return `tel:${siteConfig.phone.replace(/\s/g, "")}`;
}
