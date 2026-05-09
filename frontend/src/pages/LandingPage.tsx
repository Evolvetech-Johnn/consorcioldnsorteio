import { HeroSection } from '../components/landing/HeroSection'
import { BenefitsSection } from '../components/landing/BenefitsSection'
import { Footer } from '../components/landing/Footer'

export function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <BenefitsSection />
      <Footer />
    </div>
  )
}
