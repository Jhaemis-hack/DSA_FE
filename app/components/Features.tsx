import { Star, Calendar, TrendingUp } from "lucide-react"

const features = [
  {
    icon: Star,
    title: "Expert Mentors",
    description: "Get guidance from industry leaders and experienced professionals in your field.",
  },
  {
    icon: Calendar,
    title: "Flexible Scheduling",
    description: "Book sessions that fit your schedule with our easy-to-use scheduling system.",
  },
  {
    icon: TrendingUp,
    title: "Proven Results",
    description: "Join thousands of professionals who have accelerated their careers through mentorship.",
  },
]

export default function Features() {
  return (
    <section className="w-full px-4 py-16 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-lg border border-gray-100 hover:shadow-lg transition-shadow"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
