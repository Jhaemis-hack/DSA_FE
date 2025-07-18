import { Link } from "react-router-dom";

export default function DropDown({click}: {click: ()=> void}) {

  return (
    <div className="bg-neutral-100 rounded-xl flex justify-center items-center absolute h-14 w-[20rem] top-10 gap-3 font-medium shadow-sm border border-gray-100">
      <Link to="/find-mentors">
        <h3 onClick={click}>Request Mentorship</h3>
      </Link>
      <Link to="/request-status">
        <h3 onClick={click}>Check Request Status</h3>
      </Link>
    </div>
  );
}
