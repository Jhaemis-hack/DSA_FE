import type { SessionType } from "../types";


export default function PassSessions({ session }:  { session: SessionType }) {
      const handleRateAgain = (sessionId: number) => {
    console.log("Rating session again:", sessionId)
    // Implement rating logic
  }
      const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className={index < rating ? "text-yellow-400" : "text-gray-300"}>
        ⭐
      </span>
    ))
  }
  return (
    <div
      key={session.id}
      className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 flex items-center justify-between"
    >
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
          <span className="text-white font-semibold">{session.name.split(" ").length > 1
              ? session.name
                  .split(" ")
                  .map((N) => N.toUpperCase())
                  .join()
              : session.name.split("")[0].toUpperCase()}</span>
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 text-lg">
            {session.industry[0]}
          </h3>
          <p className="text-gray-600">with {session.name}</p>
          <p className="text-sm text-gray-500">{session.start} - {session.end}</p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-1">
          {renderStars(session.rating)}
        </div>
        <button
          onClick={() => handleRateAgain(session.rating)}
          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
        >
          Rate Again
        </button>
      </div>
    </div>
  );
}
