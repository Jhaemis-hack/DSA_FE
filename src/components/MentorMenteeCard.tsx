import { Button } from "./ui/Button";

interface CardObject {
  Role: any;
  makeRequest: (id: string) => void;
}

export default function MentorMenteeCard({ Role, makeRequest }: CardObject) {
  return (
    <>
      <div className="text-center mb-4">
        <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
          <span className="text-white font-semibold text-lg">
            {Role.name.split("")[0].toLocaleUpperCase()}
          </span>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-1">
          {Role.name}
        </h3>
      </div>

      <div className="mb-4">
        <div className="flex flex-wrap gap-2 justify-center">
          {Role.skill.map((skill: string, index: number) => (
            <span
              key={index}
              className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
      <div>{Role.industry[0]}hiiii</div>
      <div className="text-center flex justify-center items-center gap-3">
        {Role.status && Role.status === "accepted" ? (
          <div className="flex justify-center items-center">
            <Button className="w-full">{Role.status}</Button>
            <Button
              onClick={() => makeRequest(`${Role.id}`)}
              className="w-full"
            >
              Book Session
            </Button>
          </div>
        ) : Role.status !== "accepted" ? (
          <Button className="w-full">{Role.status}</Button>
        ) : (
          <Button onClick={() => makeRequest(`${Role.id}`)} className="w-full">
            Request Mentorship
          </Button>
        )}
      </div>
    </>
  );
}
