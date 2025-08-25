import { useNavigate } from "react-router-dom";

const BulbSection = () => {
  const navigate = useNavigate();
  return (
    <section className="bg-white text-primary py-12 px-6 md:px-16 md: relative">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
        {/* Left Content */}
        <div className="md:w-1/2 text-center md:text-left">
          <p className="uppercase text-lg font-bold text-heading">
            Looking for a trusted solar panel installer?
          </p>
          <h1 className="text-3xl md:text-5xl font-bold mt-3 leading-tight">
            We connect you with top-rated solar providers nationwide
          </h1>

          {/* Buttons and Contact */}
          <div className="mt-6 flex flex-col md:flex-row items-center md:items-start">
            <button
              onClick={() => navigate("/form")}
              className="bg-heading text-primary px-6 py-3 rounded-full text-lg font-semibold shadow-md hover:bg-primary hover:text-heading transition cursor-pointer"
            >
              Get Started
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
          <img
            src="/assets/images/Bulb.png" // Replace with your actual image path
            alt="Solar Energy Bulb"
            className="w-full max-w-lg md:max-w-xl "
          />
        </div>
      </div>
    </section>
  );
};

export default BulbSection;
