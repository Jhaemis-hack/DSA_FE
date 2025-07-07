const mentors = [
  {
    name: "Sarah Chen",
    role: "Senior Product Manager",
    company: "Google",
    avatar: "SC",
  },
  {
    name: "Marcus Johnson",
    role: "Engineering Director",
    company: "Microsoft",
    avatar: "MJ",
  },
  {
    name: "Elena Rodriguez",
    role: "VP of Design",
    company: "Airbnb",
    avatar: "ER",
  },
]

export default function FeaturedMentors() {
  return (
    <section className="w-full px-4 py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Featured Mentors</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {mentors.map((mentor, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-semibold text-lg">{mentor.avatar}</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1">{mentor.name}</h3>
              <p className="text-gray-600 mb-1">{mentor.role}</p>
              <p className="text-sm text-gray-500">{mentor.company}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
