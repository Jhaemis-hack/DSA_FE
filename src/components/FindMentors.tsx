import Header from "./Header"
import { Button } from "./ui/Button"
import { Card } from "./ui/Card"
import type { AppView } from "../types"

interface FindMentorsProps {
  user: any
  onNavigate: (view: AppView) => void
}

const FindMentors = ({ user, onNavigate }: FindMentorsProps) => {
  const mentors = [
    {
      id: 1,
      name: "Sarah Chen",
      avatar: "SC",
      rating: 4.9,
      sessions: 150,
      skills: ["Product Strategy", "User Research"],
      price: 120,
    },
    {
      id: 2,
      name: "Marcus Johnson",
      avatar: "MJ",
      rating: 4.7,
      sessions: 200,
      skills: ["Software Design", "Team Leadership"],
      price: 150,
    },
    {
      id: 3,
      name: "Elena Rodriguez",
      avatar: "ER",
      rating: 4.8,
      sessions: 175,
      skills: ["UI/UX Design", "Design Systems"],
      price: 100,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} onNavigate={onNavigate} currentPage="find-mentors" />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Find Your Perfect Mentor</h1>
          <div className="flex space-x-4">
            <select className="form-select bg-white">
              <option>All Categories</option>
              <option>Product Management</option>
              <option>Engineering</option>
              <option>Design</option>
            </select>
            <select className="form-select bg-white">
              <option>Sort by Rating</option>
              <option>Sort by Price</option>
              <option>Sort by Experience</option>
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {mentors.map((mentor) => (
            <Card key={mentor.id} className="p-6">
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-semibold text-lg">{mentor.avatar}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{mentor.name}</h3>
                <div className="flex items-center justify-center space-x-4 text-sm text-gray-600 mb-3">
                  <span>⭐ {mentor.rating}</span>
                  <span>📅 {mentor.sessions} sessions</span>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex flex-wrap gap-2 justify-center">
                  {mentor.skills.map((skill, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 mb-3">${mentor.price}/session</div>
                <Button className="w-full">Book Session</Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FindMentors
