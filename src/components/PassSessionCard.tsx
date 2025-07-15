export interface SessionInterface {
  session: {
    id: number;
    title: string;
    mentor: string;
    date: string;
    avatar: string;
    rating: number;
  };
}

export default function PassSessions({ session }: SessionInterface) {
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
          <span className="text-white font-semibold">{session.avatar}</span>
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 text-lg">
            {session.title}
          </h3>
          <p className="text-gray-600">with {session.mentor}</p>
          <p className="text-sm text-gray-500">{session.date}</p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-1">
          {renderStars(session.rating)}
        </div>
        <button
          onClick={() => handleRateAgain(session.id)}
          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
        >
          Rate Again
        </button>
      </div>
    </div>
  );
}
