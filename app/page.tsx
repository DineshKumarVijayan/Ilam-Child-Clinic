import { Header } from "@/components/Header";
import { HeroImageCarousel } from "@/components/HeroImageCarousel";
import { Hero } from "@/components/Hero";
import { DoctorProfile } from "@/components/DoctorProfile";
import { Services } from "@/components/Services";
import { GrowthJourney } from "@/components/GrowthJourney";
import { Timings } from "@/components/Timings";
import { GoogleReviews } from "@/components/GoogleReviews";
import { FAQ } from "@/components/FAQ";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { FloatingActions } from "@/components/FloatingActions";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <HeroImageCarousel />
        <DoctorProfile />
        <Services />
        <GrowthJourney />
        <Timings />
        <GoogleReviews />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
