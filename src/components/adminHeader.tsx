"use client";

import { logOut } from "../services/authService";

import { useStore } from "../UserStore/userData";

import { Button } from "./ui/Button";
import { Link, useNavigate } from "react-router-dom";

const AdminHeader = () => {
  const navigate = useNavigate();

  const handleLogOutEvent = async function () {
    const response = await logOut();

    if (response?.status_code === 200) {
      await useStore.getState().clearUserData();
      navigate("/", { replace: true });
    }
  };

  return (
    <header className="w-full px-4 py-4 bg-white border-b border-gray-200 fixed z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2 cursor-pointer">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">M</span>
          </div>
          <span className="text-xl font-semibold text-gray-900">
            MentorConnect
          </span>
        </div>

        <nav className="hidden md:flex items-center space-x-8 relative">
          <Link to="/admin-dashboard">
            <button
              className={`font-medium hover:text-blue-700 transition-colors cursor-pointer 
                "text-gray-600"
              `}
            >
              Dashboard
            </button>
          </Link>
          <Link to="/create-account">
            <button
              className={`hover:text-gray-900 transition-colors cursor-pointer "text-gray-600"`}
            >
              Create New User
            </button>
          </Link>
        </nav>
        <div className="flex items-center space-x-3">
          <div className="flex justify-center gap-4">
            <Button size="sm" variant="fire" onClick={handleLogOutEvent}>
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;

//    {openMangeProfile ? (
//               <div className="fixed inset-0  bg-transparent bg-opacity-40 flex justify-end ">
//                 <div
//                   className="bg-white w-[20rem] sm:w-[35rem] transform translate-x-0 transition-transform duration-300 ease-in-out shadow-[0_0px_15px_.1px_#222] h-screen overflow-y-auto scrollbar-hide "
//                   onClick={(e) => e.stopPropagation()}
//                 >
//                   <SideSlide
//                     onClose={() => setOpenMangeProfile(!openMangeProfile)}
//                   />
//                 </div>
//               </div>
//             ) : (
//               ""
//             )}

// function SideSlide({ onClose }: { onClose: () => void }) {
//   return (
//     <div>
//       <span onClick={onClose} className="cursor-pointer">
//         <MdClose className="text-3xl mx-6 my-5" />
//       </span>
//       <UpdateProfile />
//     </div>
//   );
// }
