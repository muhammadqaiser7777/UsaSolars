// import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import ScrollUp from "./components/ScrollUp";
import Contact from "./components/Contact";
import AboutUs from "./components/AboutUs";
// import CompaniesSection from "./components/CompaniesSection";
import FormSection from "./components/FormSection";
import AutoScroll from "./components/AutoScroll";
import PrivacyPolicy from "./components/PrivacyPolicy";
import UserTerms from "./components/UserTerms";
import CaliforniaPrivacyNotice from "./components/CaliforniaPrivacyNotice";
import ThankYou from "./components/ThankYou";
import EnergySection from "./components/EnergySection";
import ServiceTypes from "./components/ServiceTypes";
import BulbSection from "./components/BulbSection";
import MarketingPartners from "./components/MarketingPartners";

function App() {
  return (
    <Router>
      <div className="bg-secondary text-white">
        <NavBar />
        <ScrollUp />
        <AutoScroll />

        <Routes>
          {/* Main Home Page */}
          <Route
            path="/"
            element={
              <>
                <div id="home" className="min-h-screen pt-24">
                  <Hero />
                </div>
                <EnergySection />
                <ServiceTypes />
                <BulbSection />
                {/* <div id="companies">
                  <CompaniesSection />
                </div> */}
              </>
            }
          />

          {/* Separate Routes for Pages */}
          <Route
            path="/form"
            element={
              <div className="pt-24">
                <FormSection />
              </div>
            }
          />
          <Route
            path="/about"
            element={
              <div className="min-h-screen pt-24">
                <AboutUs />
              </div>
            }
          />
          <Route
            path="/contact"
            element={
              <div className="min-h-screen pt-24">
                <Contact />
              </div>
            }
          />
           <Route
            path="/privacy-policy"
            element={
              <div className="min-h-screen pt-10">
                <PrivacyPolicy />
              </div>
            }
          />
           <Route
            path="/user-terms"
            element={
              <div className="min-h-screen pt-10">
                <UserTerms />
              </div>
            }
          />
           <Route
            path="/california-privacy"
            element={
              <div className="min-h-screen pt-10">
                <CaliforniaPrivacyNotice />
              </div>
            }
          />
           <Route
            path="/marketing-partners"
            element={
              <div className="min-h-screen pt-10">
                <MarketingPartners />
              </div>
            }
          />
           <Route
            path="/thank-you"
            element={
              <div className="min-h-screen pt-10">
                <ThankYou />
              </div>
            }
          />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
