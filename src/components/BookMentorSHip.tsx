// import Header from "./Header"
// import { Button } from "./ui/Button"
// import { Card } from "./ui/Card"
// import type { AppView } from "../types"
// import MentorMenteeCard from "./MentorMenteeCard"
// import { useEffect } from "react"
// import { BookASession } from "../services/menteeService"

// interface FindMentorsProps {
//   user: any
// }

// const BookMentorship = ({ user }: FindMentorsProps) => {
  
//   const mentors = [
//     {
//       id: 1,
//       name: "Sarah Chen",
//       avatar: "SC",
//       rating: 4.9,
//       sessions: 150,
//       skills: ["Product Strategy", "User Research"],
//       price: 120,
//     },
//     {
//       id: 2,
//       name: "Marcus Johnson",
//       avatar: "MJ",
//       rating: 4.7,
//       sessions: 200,
//       skills: ["Software Design", "Team Leadership"],
//       price: 150,
//     },
//     {
//       id: 3,
//       name: "Elena Rodriguez",
//       avatar: "ER",
//       rating: 4.8,
//       sessions: 175,
//       skills: ["UI/UX Design", "Design Systems"],
//       price: 100,
//     },
//   ]

//     // useEffect(() => {
//     //   const controller = new AbortController();
  
//     //   async function requestMentorship() {
//     //     const data: mentorObject[] = await BookASession(mentorId);
//     //     setMentors(data);
//     //   }
//     //   requestMentorship()
  
//     //   return () => controller.abort();
//     // }, [mentorId]);

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Header user={user} currentPage="find-mentors" />

//       <div className="max-w-6xl mx-auto px-4 py-8">
//         <div className="flex items-center mb-8">
//           <h1 className="text-3xl font-bold text-gray-900">Book A Session</h1>
//         </div>

//         <div className="grid md:grid-cols-3 gap-6">
//           {mentors.map((mentor) => (
//             <Card key={mentor.id} className="p-6">
//               <MentorMenteeCard Role={mentor} />
//             </Card>
//           ))}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default BookMentorship;
