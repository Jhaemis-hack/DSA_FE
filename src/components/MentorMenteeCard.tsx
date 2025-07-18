import { useState } from "react";
import { Button } from "./ui/Button";
import BookingUI from "./BookingUi";
import { MdClose } from "react-icons/md";

interface CardObject {
  Role: any;
  makeRequest: (id: string) => void;
}

export default function MentorMenteeCard({ Role, makeRequest }: CardObject) {
  const [booking, setBooking] = useState<boolean>(false);

  return (
    <>
      <div className="text-center mb-4 relative">
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
          {Role &&
            Role.skill.map((skill: string, index: number) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
              >
                {skill}
              </span>
            ))}
        </div>
      </div>
      {Role.industry ? (
        <div className="text-center text-lg mb-4">{Role?.industry[0]}</div>
      ) : (
        ""
      )}
      <div className="text-center flex justify-center items-center gap-3 w-full">
        {Role.menteeId ? (
          // If menteeId exists, only show Accept/Reject
          <div className="flex flex-col gap-2 w-full">
            <Button
              onClick={() => makeRequest(`${Role._id}?accepted`)}
              className="w-full"
            >
              Accept
            </Button>
            <Button
              onClick={() => makeRequest(`${Role._id}?rejected`)}
              className="w-full"
            >
              Reject
            </Button>
          </div>
        ) : Role.status === "accepted" ? (
          // If no menteeId and status is accepted → Book Session
          <div className="flex gap-2 w-full">
            <Button variant="good" className="w-full">
              {Role.status}
            </Button>
            <Button onClick={() => setBooking(!booking)} className="w-full">
              Book Session
            </Button>
          </div>
        ) : Role.status && Role.status === "rejected" ? (
          // No menteeId and status is pending/rejected/etc.
          <Button variant="danger" className="w-full">
            {Role.status}
          </Button>
        ) : Role.status && Role.status === "pending" ? (
          // No menteeId and status is pending/rejected/etc.
          <Button className="w-full">{Role.status}</Button>
        ) : (
          // No menteeId and no status → can request mentorship
          <Button onClick={() => makeRequest(Role._id)} className="w-full">
            Request Mentorship
          </Button>
        )}
      </div>
      {booking ? (
        <div className="absolute top-[23rem] z-10 bg-transparent bg-opacity-40 flex justify-center ">
          <div className="bg-white w-[30rem] sm:w-[20rem] transform translate-x-0 transition-transform duration-300 ease-in-out shadow-[0_0px_10px_.1px_#999] h-[23rem] overflow-y-auto scrollbar-hide ">
            <MdClose
              onClick={() => setBooking(!booking)}
              className="text-3xl right-3 absolute mt-2 cursor-pointer"
            />
            <BookingUI mentorId={Role.id} close={() => setBooking(!booking)} />
          </div>
        </div>
      ) : (
        ""
      )}
      {/* <BookSessionModal isOpen={() => setBooking(!booking)} mentorId={Role.mentorId}/> : "" */}
    </>
  );
}
// () => makeRequest(Role._id)
// function BookSessionModal({
//   isOpen,
//   mentorId,
// }: {
//   isOpen: () => void;
//   mentorId: string;
// }) {
//   return (
//     <div className="absolute top-56 md:right-[30%] bg-transparent bg-opacity-40 flex justify-center ">
//       <div className="bg-white w-[30rem] sm:w-[40rem] transform translate-x-0 transition-transform duration-300 ease-in-out shadow-[0_0px_10px_.1px_#999] h-[23rem] overflow-y-auto scrollbar-hide ">
//         <MdClose
//           onClick={isOpen}
//           className="text-3xl right-3 absolute mt-2 cursor-pointer"
//         />
//         <div className="grid grid-cols-2 px-3">
//           <BookingUI mentorId={mentorId} />
//           <form
//             action=""
//             className="text-lg font-semibold flex flex-col justify-center"
//           >
//             <h3 className="mb-3">Available time for session: 2pm - 5pm</h3>
//             <label htmlFor="selectedDate">Selected Date:</label>
//             <input
//               type="date"
//               // value={}
//               className={`w-full px-3 h-12 border border-[#CFCFCF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#111111] focus:border-transparent`}
//             />
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }
