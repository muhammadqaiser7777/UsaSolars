import PropTypes from "prop-types";
import { useState, useEffect, memo } from "react";
import { useInView } from "react-intersection-observer";

const stats = [
  { value: 1000, suffix: "+", label: "Clients" },
  { value: 10000, suffix: "+", label: "Systems Installed" },
  { value: 100, suffix: "%", label: "Efficiency" },
  { value: 300, suffix: " MW", label: "Annual Production" },
  { value: 22, suffix: "", label: "Years of Experience" },
  { value: 386, suffix: " KT", label: "CO2 Reduced" },
];

const AnimatedNumber = ({ targetValue, suffix }) => {
  // PropTypes validation for AnimatedNumber
  AnimatedNumber.propTypes = {
    targetValue: PropTypes.number.isRequired,
    suffix: PropTypes.string,
  };
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true });

  useEffect(() => {
    if (inView) {
      let start = Math.floor(targetValue * 0.6);
      setCount(start);

      const increment = Math.ceil(targetValue / 100);
      const interval = setInterval(() => {
        setCount((prev) => {
          if (prev >= targetValue) {
            clearInterval(interval);
            return targetValue;
          }
          return prev + increment;
        });
      }, 30);

      return () => clearInterval(interval);
    }
  }, [inView, targetValue]);

  return (
    <span ref={ref} className="animate-fade-in">
      {count}
      {suffix}
    </span>
  );
};

const CompaniesSection = memo(() => {
  // Add display name for memoized component
  CompaniesSection.displayName = "CompaniesSection";
  return (
    <section className="p-6 bg-heading text-primary">
      <div className="container mx-auto grid justify-center grid-cols-2 text-center lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="flex flex-col justify-start m-2 lg:m-6 cursor-pointer"
          >
            <p className="text-4xl font-bold leading-none lg:text-6xl">
              <AnimatedNumber targetValue={stat.value} suffix={stat.suffix} />
            </p>
            <p className="text-sm sm:text-base">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
});

export default CompaniesSection;
