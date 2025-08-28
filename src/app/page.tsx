import React from "react";
//import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import ExperienceTimeline from "./pages/ExperienceTimeline";
import Project from "./pages/Project";

import Testimonials from "./pages/Carousel";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div className="bg-slate-900 text-white min-h-screen">
      <Navbar />
      <Hero />
      <ExperienceTimeline />
      <Project />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default App;
