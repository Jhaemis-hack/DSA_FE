import type { SessionType } from "../types";

export default function UpcomingSession({ session }: { session: SessionType }) {
  const handleJoinSession = (sessionId: number) => {
    console.log("Joining session:", sessionId);
    // Implement join session logic
  };

  const handleReschedule = (sessionId: number) => {
    console.log("Rescheduling session:", sessionId);
    // Implement reschedule logic
  };
  

  return (
    <div
      key={session.id}
      className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 flex items-center justify-between"
    >
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
          <span className="text-white font-semibold">
            {session.name.split(" ").length > 1
              ? session.name
                  .split(" ")
                  .map((N) => N.toUpperCase())
                  .join()
              : session.name.split("")[0].toUpperCase()}
          </span>
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 text-lg">
            {session.industry[0]}
          </h3>
          <p className="text-gray-600">with {session.name}</p>
          <p className="text-sm text-gray-500">
            {session.start} - {session.end}
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <>
          <button
            onClick={() => handleJoinSession(Number(session.id))}
            className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            starting soon
          </button>
          <button
            onClick={() => handleReschedule(Number(session.id))}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            cancel
          </button>
        </>
      </div>
    </div>
  );
}
