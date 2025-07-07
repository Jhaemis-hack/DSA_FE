import { Check } from "lucide-react"

const menteesBenefits = [
  "Get personalized career guidance from experts",
  "Access to exclusive industry insights",
  "Build meaningful long-term relationships",
  "Accelerate your professional growth",
]

const mentorsBenefits = [
  "Share your expertise and make an impact",
  "Build your personal brand and network",
  "Develop your leadership and coaching skills",
  "Earn additional income through mentoring",
]

const stats = [
  { number: "10,000+", label: "Successful mentoring connections" },
  { number: "500+", label: "Expert mentors from top companies" },
  { number: "95%", label: "Satisfaction rate from our users" },
]

export default function WhyChoose() {
  return (
    <section className="w-full px-4 py-16 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose MentorConnect?</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We connect ambitious professionals with experienced industry leaders to accelerate career growth and unlock
            potential.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">For Mentees</h3>
            <ul className="space-y-4">
              {menteesBenefits.map((benefit, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                    <Check className="w-3 h-3 text-green-600" />
                  </div>
                  <span className="text-gray-700">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">For Mentors</h3>
            <ul className="space-y-4">
              {mentorsBenefits.map((benefit, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                    <Check className="w-3 h-3 text-green-600" />
                  </div>
                  <span className="text-gray-700">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index}>
              <div className="text-3xl font-bold text-blue-600 mb-2">{stat.number}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
