import Demo from '../components/Demo'
import FAQ from '../components/FAQ'
import FinalCta from '../components/FinalCta'
import Footer from '../components/Footer'
import Hero from '../components/Hero'
import Nav from '../components/Nav'
import Pricing from '../components/Pricing'
import Problem from '../components/Problem'
import Solution from '../components/Solution'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-navy-950">
      <Nav />
      <main>
        <Hero />
        <Problem />
        <Solution />
        <Demo />
        <Pricing />
        <FAQ />
        <FinalCta />
      </main>
      <Footer />
    </div>
  )
}
