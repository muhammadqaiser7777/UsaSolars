import { memo } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useNavigate } from "react-router-dom";

const AboutUs = memo(() => {
// Add display name for memoized component
AboutUs.displayName = "AboutUs";
  const navigate = useNavigate();

  return (
    <div className="text-tertiary bg-primary pb-10 pt-10">
      {/* Preload About Us image for faster loading */}
      <link rel="preload" href="/assets/images/About-us.webp" as="image" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title Section */}
        <div className="text-center">
          <h2 className="text-3xl sm:text-6xl mb-4 hover-animation cursor-pointer">
            About Us
          </h2>
          <p className="text-xl text-heading font-semibold">
            Connecting you with expert solar installers for a brighter future.
          </p>
        </div>

        {/* Image + Text Section */}
        <div className="mt-10 flex flex-col lg:flex-row items-center lg:items-start gap-8">
          {/* Lazy Loading Image */}
          <div className="lg:w-1/2 w-full flex justify-center aspect-[4/3]">
            <LazyLoadImage
              src="/assets/images/About-us.webp"
              alt="About Us"
              effect="blur"
              threshold={200} // Loads slightly before entering viewport
              className="rounded-lg shadow-lg w-full h-full object-cover"
              width={800}
              height={600}
              decoding="async"
              placeholderSrc="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmM2YzIi8+PC9zdmc+"
            />
          </div>

          {/* Static Content */}
          <div className="lg:w-1/2 w-full space-y-6">
            <StaticContent />

            {/* CTA Button */}
            <button
              onClick={() => navigate("/form")}
              className="bg-heading text-primary p-2 rounded-4xl mt-10 text-2xl font-semibold cursor-pointer  px-5 md:px-30"
            >
              Get My Consultation!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

// Memoizing StaticContent to prevent re-renders
const StaticContent = memo(function StaticContent() {
  return (
    <>
      <p className="leading-relaxed mb-6">
        <span className="font-semibold text-heading">USA Solars</span> simplifies
        the transition to solar energy by connecting homeowners and businesses
        with expert solar installers across the U.S. Our platform makes it easy
        to compare multiple quotes, find the right provider, and make informed
        decisions—all in just a few clicks.
      </p>
      <p className="leading-relaxed mb-6">
        Whether you&apos;re looking to reduce energy costs, achieve energy
        independence, or contribute to a greener future, we streamline the
        process with trusted professionals and innovative solutions.
      </p>

      <h3 className="text-2xl font-semibold text-heading mb-4">
        Why Choose USA Solars?
      </h3>
      <ul className="list-disc pl-6 space-y-2">
        <li>Get connected with top solar professionals near you.</li>
        <li>Save time by comparing multiple quotes in one place.</li>
        <li>Make informed decisions with transparent pricing and expert guidance.</li>
        <li>Take a step toward energy independence with ease.</li>
      </ul>

      <p className="leading-relaxed mt-6 font-semibold text-heading">
        Switch to solar effortlessly with USA Solars!
      </p>
    </>
  );
});

export default AboutUs;
