export interface SessionInterface {
  session: {
    id: number;
    title: string;
    mentor: string;
    time: string;
    avatar: string;
    status: string;
  };
}

export default function UpcomingSession({ session }: SessionInterface) {
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
          <span className="text-white font-semibold">{session.avatar}</span>
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 text-lg">
            {session.title}
          </h3>
          <p className="text-gray-600">with {session.mentor}</p>
          <p className="text-sm text-gray-500">{session.time}</p>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        {session.status === "active" ? (
          <>
            <button
              onClick={() => handleJoinSession(session.id)}
              className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              Join now
            </button>
            <button
              onClick={() => handleReschedule(session.id)}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              Reschedule
            </button>
          </>
        ) : (
          <>
            <button className="px-4 py-2 bg-gray-400 text-white rounded-lg text-sm font-medium cursor-not-allowed">
              Pending
            </button>
            <button
              onClick={() => handleReschedule(session.id)}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              Reschedule
            </button>
          </>
        )}
      </div>
    </div>
  );
}
