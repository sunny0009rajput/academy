import React from "react";

const FooterSection = () => {
  const quickLinks = [
    { name: "Login", url: "/customerlogin" },
    { name: "Home", url: "/" },
    { name: "Top", url: "#" },
    { name: "Support", url: "/support" },
    { name: "Courses", url: "/" },
    { name: "Contact Us", url: "/support" },
  ];

  return (
    <footer className="w-full bg-black/90 border-t border-gray-800">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-1 lg:gap-1">
          {/* Left Section - Brand and Description */}
          <div className="flex flex-col"> {/* ✅ Reduced vertical gap */}
            {/* Logo and Brand */}
            <div className="flex items-center">
              <img
                src="LOGO.png"
                alt="CodeMonarch Academy Logo"
                className="w-28 h-20 sm:w-40 sm:h-28 md:w-52 md:h-32 lg:w-60 lg:h-34 object-contain shadow-md transition-all duration-300"
              />
            </div>

            {/* Description */}
            <div className="max-w-md">
              <p className="text-white/80 text-base leading-relaxed">
                At CodeMonarch Academy, we help students prepare effectively for
                government job exams by providing expert guidance, practical
                strategies, and high-quality study materials empowering them
                to achieve their career goals with confidence and success.
              </p>
            </div>
          </div>

          {/* Right Section - Quick Links */}
          <div>
            <h3 className="text-white text-lg font-bold mt-16 mb-6 uppercase tracking-wide">
              QUICK LINKS
            </h3>

            {/* Desktop Layout - 2 columns */}
            <div className="hidden sm:grid sm:grid-cols-2 gap-x-8 gap-y-1">
              {quickLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  className="text-white/70 hover:text-white transition-colors duration-300 text-base"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Mobile Layout - Single column */}
            <div className="block sm:hidden space-y-4">
              {quickLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  className="block text-white/70 hover:text-white transition-colors duration-300 text-base"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Section */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="text-center">
            <p className="text-white/60 text-sm">
              Copyright © 2025 CodeMonarch Academy
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
