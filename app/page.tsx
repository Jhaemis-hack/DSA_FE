import Header from "./components/Header"
import Hero from "./components/Hero"
import Features from "./components/Features"
import FeaturedMentors from "./components/FeaturedMentors"
import WhyChoose from "./components/WhyChoose"
import Footer from "./components/Footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Features />
      <FeaturedMentors />
      <WhyChoose />
      <Footer />
    </div>
  )
}
