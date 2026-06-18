import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { DoctorProfile } from "@/components/DoctorProfile";
import { Qualifications } from "@/components/Qualifications";
import { Services } from "@/components/Services";
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
        <DoctorProfile />
        <Qualifications />
        <Services />
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
