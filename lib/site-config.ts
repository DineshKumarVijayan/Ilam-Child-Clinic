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
  email: "info@ilamchildclinic.com",
  address: {
    line1:
      "123, 4th Street, Union Road, Yadaval St, near Sri Padmavathi Palace",
    line2: "Kambar Nagar, Vanagaram, Adayalampattu, Chennai, Tamil Nadu 600095",
    country: "India",
  },
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.5662440477954!2d80.1551442!3d13.063258799999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a526182d988931f%3A0xc257a8ba71dc54b1!2sILAM%20CHILD%20CLINIC%20AND%20VACCINATION%20CENTRE%20-%20Pediatrician!5e0!3m2!1sen!2sin!4v1781767149870!5m2!1sen!2sin",
  googleReviewsUrl: "https://maps.app.goo.gl/nNQmXopJgFnq4ewa8",
  googleRating: 4.9,
  googleReviewCount: "120+",
  doctors: [
    {
      name: "Dr. Tarun",
      title: "Consultant Pediatrician",
      image: "/doctor-placeholder.svg",
      qualifications: ["MBBS", "MD (Pediatrics)"],
      bio: "Dr. Tarun provides thoughtful, evidence-based care for infants, children, and adolescents with a calm and reassuring approach for every family.",
    },
    {
      name: "Dr. Akshaya",
      title: "Consultant Pediatrician",
      image: "/doctor-placeholder.svg",
      qualifications: ["MBBS", "MD (Pediatrics)"],
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
      title: "Child Clinic",
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
  ],
  timings: [
    { day: "Monday – Saturday", hours: "1:00 PM – 10:00 PM" },
    { day: "Sunday", hours: "10:00 AM – 1:00 PM" },
  ],
  reviews: [
    {
      name: "Priya R.",
      rating: 5,
      text: "Very patient and caring doctors. They explained everything clearly about my child's fever and vaccination schedule. The clinic is clean and child-friendly.",
      date: "2 weeks ago",
    },
    {
      name: "Karthik M.",
      rating: 5,
      text: "We visited for our baby's routine checkup. Dr. Tarun and Dr. Akshaya are both very approachable. Booking through WhatsApp was easy too.",
      date: "1 month ago",
    },
    {
      name: "Anitha S.",
      rating: 5,
      text: "Excellent vaccination centre with a calm environment. Staff were helpful and the doctors took time to answer all our questions as new parents.",
      date: "2 months ago",
    },
  ],
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
