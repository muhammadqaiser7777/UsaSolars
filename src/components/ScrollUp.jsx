import { useState, useEffect } from "react";
import { FiChevronUp } from "react-icons/fi"; // ✅ Importing React Icon

const ScrollUp = () => {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(() => {
        setShowScroll(window.scrollY > 500);
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    showScroll && (
      <div
        onClick={scrollTop}
        className="fixed bottom-5 right-5 cursor-pointer z-50"
      >
        <div className="w-12 h-12 flex items-center justify-center bg-black text-white rounded-full shadow-2xl hover:scale-105 transition-all duration-300 animate-bounce hover:bg-heading hover:text-black">
          <FiChevronUp className="w-8 h-8" /> 
        </div>
      </div>
    )
  );
};

export default ScrollUp;
