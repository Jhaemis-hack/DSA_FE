import { MdCancel } from "react-icons/md";
import type { SessionType } from "../types";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { giveFeedback } from "../services/menteeService";

export default function PassSessions({ session }: { session: SessionType }) {
  const [openFeedback, setOpenFeedBack] = useState<boolean>(false)

  const handleFeedbackEvent =async (payload: any) => {
    await giveFeedback(session.id, payload)
    // Implement rating logic
  };

  const renderStars = (rating: number) => {
    // console.log("rating here", rating);
    
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={index < rating ? "text-yellow-400" : "text-gray-300"}
      >
        <FaStar/>
      </span>
    ));
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
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-1">
          {renderStars(session.rating)}
        </div>
        <button
          onClick={() => setOpenFeedBack(!openFeedback)}
          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
        >
          update Feedback
        </button>
        {openFeedback ? <FeedBack isOpen={() => setOpenFeedBack(!openFeedback)} sendFeedback={handleFeedbackEvent} feedbackBody={session.feedback} sessionRating={session.rating} /> : ""}
      </div>
    </div>
  );
}

function FeedBack({ isOpen, sendFeedback, feedbackBody, sessionRating }: any) {
  const [rating, setRating] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>("");

  const ratingHandler = (rate: number) => {
    if (rating === rate) return setRating((prev) => prev - 1);
    setRating(rate);
  };
  

  useEffect(()=>{
    setFeedback(feedbackBody)
    setRating(sessionRating)
  },[])

  const HandleFeedbackEvent = function(){
    if (!rating || !feedback) return;

    const payload = {
      feedback: feedback,
      rating: rating
    }
    sendFeedback(payload)
    isOpen()
  }

  return (
    <div className="absolute h-80 bg-amber-100 w-150 left-145 top-70 py-5 px-10 text-lg rounded-2xl shadow-blue-200 shadow-lg">
      <MdCancel className="hover:text-2xl relative left-130" onClick={isOpen} />
      <h3 className="font-bold text-2xl">Session feedback</h3>
      <textarea
        name="feedback"
        id="feedback"
        value={feedback}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFeedback(e.target.value)}
        className="border-2 h-30 w-130 rounded-lg bg-neutral-50 p-1 text-md "
      />

      <p className="pt-2">Rate the session: </p>
      <ul className="flex gap-3 justify-start items-center ">
        <li
          onClick={() => ratingHandler(1)}
          className={rating >= 1 ? "text-yellow-500" : ""}
        >
          <FaStar className={rating >= 1 ? "text-2xl" : ""} />
        </li>
        <li
          onClick={() => ratingHandler(2)}
          className={rating >= 2 ? "text-yellow-500" : ""}
        >
          <FaStar className={rating >= 2 ? "text-2xl" : ""} />
        </li>
        <li
          onClick={() => ratingHandler(3)}
          className={rating >= 3 ? "text-yellow-500" : ""}
        >
          <FaStar className={rating >= 3 ? "text-2xl" : ""} />
        </li>
        <li
          onClick={() => ratingHandler(4)}
          className={rating >= 4 ? "text-yellow-500" : ""}
        >
          <FaStar className={rating >= 4 ? "text-2xl" : ""} />
        </li>
        <li
          onClick={() => ratingHandler(5)}
          className={rating >= 5 ? "text-yellow-500" : ""}
        >
          <FaStar className={rating >= 5 ? "text-2xl" : ""} />
        </li>
      </ul>
      <br />
      <button onClick={HandleFeedbackEvent} className="bg-blue-800 text-white rounded-md px-4 py-1 absolute right-10 top-64">
        save
      </button>
    </div>
  );
}
