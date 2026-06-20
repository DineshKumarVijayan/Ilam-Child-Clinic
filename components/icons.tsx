import {
  Activity,
  Apple,
  ArrowRight,
  Baby,
  BadgeCheck,
  BarChart3,
  Calendar,
  CalendarCheck,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  Ear,
  Footprints,
  GraduationCap,
  Grid2x2,
  Heart,
  Home,
  Leaf,
  Lightbulb,
  Mail,
  MapPin,
  Menu,
  Milk,
  PawPrint,
  Phone,
  PersonStanding,
  Plane,
  Plus,
  Quote,
  Ruler,
  ShieldCheck,
  Smile,
  Soup,
  Sparkles,
  SprayCan,
  Sprout,
  Star,
  Stethoscope,
  Syringe,
  User,
  Users,
  Weight,
  Wind,
  X,
  HelpCircle,
} from "lucide-react";

type IconProps = {
  className?: string;
};

export function StethoscopeIcon({ className }: IconProps) {
  return <Stethoscope className={className} />;
}

export function SyringeIcon({ className }: IconProps) {
  return <Syringe className={className} />;
}

export function ChartIcon({ className }: IconProps) {
  return <BarChart3 className={className} />;
}

export function BabyIcon({ className }: IconProps) {
  return <Baby className={className} />;
}

export function FootprintsIcon({ className }: IconProps) {
  return <Footprints className={className} />;
}

export function WalkingChildIcon({ className }: IconProps) {
  return <PersonStanding className={className} />;
}

export function NutritionIcon({ className }: IconProps) {
  return <Sprout className={className} />;
}

export function LungsIcon({ className }: IconProps) {
  return <Wind className={className} />;
}

export function NebuliserIcon({ className }: IconProps) {
  return <SprayCan className={className} />;
}

export function EntIcon({ className }: IconProps) {
  return <Ear className={className} />;
}

export function SkinIcon({ className }: IconProps) {
  return <Sparkles className={className} />;
}

export function PhoneIcon({ className }: IconProps) {
  return <Phone className={className} />;
}

/** Brand logo — not available in lucide-react, kept as a custom mark. */
export function WhatsAppIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

/** Brand logo — not available in lucide-react, kept as a custom mark. */
export function InstagramIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function MapPinIcon({ className }: IconProps) {
  return <MapPin className={className} />;
}

export function MailIcon({ className }: IconProps) {
  return <Mail className={className} />;
}

export function ClockIcon({ className }: IconProps) {
  return <Clock className={className} />;
}

export function ChevronDownIcon({ className }: IconProps) {
  return <ChevronDown className={className} />;
}

export function ChevronLeftIcon({ className }: IconProps) {
  return <ChevronLeft className={className} />;
}

export function ChevronRightIcon({ className }: IconProps) {
  return <ChevronRight className={className} />;
}

export function GraduationCapIcon({ className }: IconProps) {
  return <GraduationCap className={className} />;
}

export function CheckIcon({ className }: IconProps) {
  return <Check className={className} />;
}

export function HomeIcon({ className }: IconProps) {
  return <Home className={className} />;
}

export function GridIcon({ className }: IconProps) {
  return <Grid2x2 className={className} />;
}

export function StarIcon({ className }: IconProps) {
  return <Star className={className} />;
}

export function QuestionIcon({ className }: IconProps) {
  return <HelpCircle className={className} />;
}

export function CalendarIcon({ className }: IconProps) {
  return <Calendar className={className} />;
}

export function MenuIcon({ className }: IconProps) {
  return <Menu className={className} />;
}

export function CloseIcon({ className }: IconProps) {
  return <X className={className} />;
}

export function SmileIcon({ className }: IconProps) {
  return <Smile className={className} />;
}

export function MilkIcon({ className }: IconProps) {
  return <Milk className={className} />;
}

export function SoupIcon({ className }: IconProps) {
  return <Soup className={className} />;
}

export function AppleIcon({ className }: IconProps) {
  return <Apple className={className} />;
}

export function LeafIcon({ className }: IconProps) {
  return <Leaf className={className} />;
}

export function LightbulbIcon({ className }: IconProps) {
  return <Lightbulb className={className} />;
}

export function CalendarCheckIcon({ className }: IconProps) {
  return <CalendarCheck className={className} />;
}

export function HeartIcon({ className }: IconProps) {
  return <Heart className={className} />;
}

export function PlaneIcon({ className }: IconProps) {
  return <Plane className={className} />;
}

export function ArrowRightIcon({ className }: IconProps) {
  return <ArrowRight className={className} />;
}

export function BadgeCheckIcon({ className }: IconProps) {
  return <BadgeCheck className={className} />;
}

export function PawPrintIcon({ className }: IconProps) {
  return <PawPrint className={className} />;
}

export function PlusIcon({ className }: IconProps) {
  return <Plus className={className} />;
}

export function QuoteIcon({ className }: IconProps) {
  return <Quote className={className} />;
}

export function ShieldCheckIcon({ className }: IconProps) {
  return <ShieldCheck className={className} />;
}

export function UserIcon({ className }: IconProps) {
  return <User className={className} />;
}

export function UsersIcon({ className }: IconProps) {
  return <Users className={className} />;
}

export function ActivityIcon({ className }: IconProps) {
  return <Activity className={className} />;
}

export function RulerIcon({ className }: IconProps) {
  return <Ruler className={className} />;
}

export function WeightIcon({ className }: IconProps) {
  return <Weight className={className} />;
}

const serviceIconMap = {
  stethoscope: StethoscopeIcon,
  syringe: SyringeIcon,
  chart: ChartIcon,
  baby: BabyIcon,
  nutrition: NutritionIcon,
  lungs: LungsIcon,
  nebuliser: NebuliserIcon,
  ent: EntIcon,
  skin: SkinIcon,
} as const;

export function ServiceIcon({
  name,
  className,
}: {
  name: keyof typeof serviceIconMap;
  className?: string;
}) {
  const Icon = serviceIconMap[name];
  return <Icon className={className} />;
}

const journeyIconMap = {
  smile: SmileIcon,
  footprints: FootprintsIcon,
  walking: WalkingChildIcon,
  graduation: GraduationCapIcon,
  milk: MilkIcon,
  bowl: SoupIcon,
  apple: AppleIcon,
  leaf: LeafIcon,
} as const;

export function JourneyIcon({
  name,
  className,
}: {
  name: keyof typeof journeyIconMap;
  className?: string;
}) {
  const Icon = journeyIconMap[name];
  return <Icon className={className} />;
}
