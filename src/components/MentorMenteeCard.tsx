import { Button } from "./ui/Button";

interface RoleObject {
    Role: {
    id: number;
    name: string;
    avatar: string;
    rating: number;
    sessions: number;
    skills: string[];
    price: number;
    }
}

export default function MentorMenteeCard({ Role }: RoleObject) {
  return (
    <>
      <div className="text-center mb-4">
        <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
          <span className="text-white font-semibold text-lg">
            {Role.avatar}
          </span>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-1">
          {Role.name}
        </h3>
        <div className="flex items-center justify-center space-x-4 text-sm text-gray-600 mb-3">
          <span>⭐ {Role.rating}</span>
          <span>📅 {Role.sessions} sessions</span>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex flex-wrap gap-2 justify-center">
          {Role.skills.map((skill: string, index: number) => (
            <span
              key={index}
              className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="text-center">
        <div className="text-2xl font-bold text-gray-900 mb-3">
          ${Role.price}/session
        </div>
        <Button className="w-full">Book Session</Button>
      </div>
    </>
  );
}
