import heroImage from "../../src/assets/images.jpeg";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();

  const handleUserModeEvent = function (mode: string) {
    navigate("/signup", {
      replace: true,
      state: { role: mode },
    });
  };

  return (
    <section className="w-full px-4 py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
          Connect with Expert Mentors
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Accelerate your career growth with personalized guidance from industry
          leaders. Find your perfect mentor and unlock your potential.
        </p>

        <div className="w-full max-w-lg mx-auto mb-12 bg-gray-200 rounded-2xl aspect-video flex items-center justify-center overflow-hidden hover:scale-105 outline-gray-900 outline-4 hover:outline-0">
          {/* <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
            <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[12px] border-b-gray-400 ml-1"></div>
          </div> */}
          <img src={heroImage} alt="hero Image" className="w-full h-96" />
        </div>

        <div id="getstarted" className="flex flex-col sm:flex-row gap-4 justify-center">
          <div className={`role-option`}>
            <div
              onClick={() => handleUserModeEvent("mentee")}
              style={{ display: "flex", alignItems: "center", gap: "12px" }}
              className="cursor-pointer border border-gray-300 text-neutral-100 hover:bg-gray-50 hover:text-[#222222] bg-[#222222]  px-8 py-6 rounded-xl"
            >
              <div style={{ fontSize: "20px" }}>👤</div>
              <span className="text-xl font-bold">
                I'm looking for a mentor
              </span>
            </div>
          </div>

          <div className={`role-option `}>
            <div
              onClick={() => handleUserModeEvent("mentor")}
              style={{ display: "flex", alignItems: "center", gap: "12px" }}
              className="cursor-pointer border border-gray-300 text-neutral-100 hover:bg-gray-50 hover:text-[#222222] bg-[#222222]  px-8 py-6 rounded-xl"
            >
              <div style={{ fontSize: "20px" }}>⭐</div>
              <span className="text-xl font-bold">I want to be a mentor</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
