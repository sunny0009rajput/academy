import React from 'react';
import { Youtube, Instagram, Twitter, Facebook } from 'lucide-react';

const AboutSection = () => {
  const socialLinks = [
    {
      name: "YouTube",
      icon: <Youtube className="w-6 h-6" />,
      url: "https://www.youtube.com/channel/UCZXCgZgwwneej0Q_qXD3Kew",
      hoverColor: "hover:bg-red-600"
    },
    {
      name: "Instagram", 
      icon: <Instagram className="w-6 h-6" />,
      url: "https://www.instagram.com/codemonarchsunny/?hl=en",
      hoverColor: "hover:bg-pink-600"
    },
    {
      name: "Twitter",
      icon: <Twitter className="w-6 h-6" />,
      url: "https://www.instagram.com/codemonarchsunny/?hl=en",
      hoverColor: "hover:bg-blue-400"
    },
    {
      name: "Facebook",
      icon: <Facebook className="w-6 h-6" />,
      url: "https://www.instagram.com/codemonarchsunny/?hl=en",
      hoverColor: "hover:bg-blue-600"
    }
  ];

  return (
    <div className="w-full bg-black/90 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Desktop and Tablet Layout */}
        <div className="hidden md:grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Side - Image */}
          <div className="relative">
            <div className="relative group">
              <img
                src="about.png"
                alt="Sunny Rajput"
                className="w-full h-auto lg:h-auto object-cover rounded-3xl shadow-2xl transition-transform duration-500 group-hover:scale-105"
              />
              
              {/* Headphones Overlay Effect */}
              <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-gray-800/30 to-transparent rounded-t-3xl"></div>
              
              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-500/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-purple-500/20 rounded-full blur-xl"></div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="space-y-8">
            
            {/* About Label */}
            <div>
              <span className="text-white/60 text-sm font-medium tracking-wider uppercase">
                ABOUT
              </span>
            </div>

            {/* Main Title */}
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
              CODEMONARCH ACADEMY
            </h2>

            {/* Subtitle */}
            <p className="text-white/80 text-lg font-medium tracking-wide">
              A DEDICATED EDUCATIONAL PLATFORM FOR GOVERMENT EXAM PREPARATION
            </p>

            {/* Description Paragraphs */}
            <div className="space-y-6">
              <p className="text-white/90 text-base lg:text-lg leading-relaxed">
                At CodeMonarch Academy, we are passionate about helping students excel in GOVERMENT exams. Our expertise lies in creating concise, easy-to-understand, and highly organized educational sheets that cover previous years’ questions and all important topics.
              </p>
              
              <p className="text-white/90 text-base lg:text-lg leading-relaxed">
                 We strongly believe in empowering students through structured learning, efficient revision, and clarity of concepts. Our goal is to simplify GOVERMENT exam preparation, save your time, and help you achieve success with confidence.
              </p>
            </div>

            {/* Social Links */}
            <div className="pt-4">
              <p className="text-white/80 text-base mb-4">Find CodeMonarch Academy on:</p>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    className={`w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-300 ${social.hoverColor} hover:scale-110 hover:shadow-lg`}
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="block md:hidden space-y-8">
          
          {/* Mobile Image */}
          <div className="relative">
            <img
              src="about.png"
              alt="Sunny Rajput"
              className="w-full h-auto object-cover rounded-3xl shadow-2xl mx-auto"
            />
            
            {/* Mobile Decorative Elements */}
            <div className="absolute -top-3 -right-3 w-16 h-16 bg-blue-500/20 rounded-full blur-lg"></div>
            <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-purple-500/20 rounded-full blur-xl"></div>
          </div>

          {/* Mobile Content */}
          <div className="text-center space-y-6">
            
            {/* About Label */}
            <span className="text-white/60 text-sm font-medium tracking-wider uppercase">
              ABOUT
            </span>

            {/* Mobile Title */}
            <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
              CODEMONARCH ACADEMY
            </h2>

            {/* Mobile Subtitle */}
            <p className="text-white/80 text-base sm:text-lg font-medium tracking-wide">
              A DEDICATED EDUCATIONAL PLATFORM FOR GOVERMENT EXAM PREPARATION
            </p>

            {/* Mobile Description */}
            <div className="space-y-4">
              <p className="text-white/90 text-sm sm:text-base leading-relaxed">
                At CodeMonarch Academy, we are passionate about helping students excel in SSC exams. Our expertise lies in creating concise, easy-to-understand, and highly organized educational sheets that cover previous years’ questions and all important topics.
              </p>
              
              <p className="text-white/90 text-sm sm:text-base leading-relaxed">
                We strongly believe in empowering students through structured learning, efficient revision, and clarity of concepts. Our goal is to simplify SSC preparation, save your time, and help you achieve success with confidence.
              </p>
            </div>

            {/* Mobile Social Links */}
            <div className="pt-4">
              <p className="text-white/80 text-sm mb-4">Find Dhruv on:</p>
              <div className="flex justify-center space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    className={`w-11 h-11 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-300 ${social.hoverColor} active:scale-95`}
                    aria-label={social.name}
                  >
                    {React.cloneElement(social.icon, { className: "w-5 h-5" })}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;