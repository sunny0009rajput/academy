import React from 'react';
import { Play, Users, CheckCircle, ThumbsUp, Award } from 'lucide-react';

const FocusSection = () => {
  const features = [
    {
      id: 1,
      title: "REAL-WORLD SKILLS",
      description: "We teach practical real-world skills that we truly believe can have a positive impact on your life.",
      icon: <Play className="w-8 h-8" />,
      iconBg: "bg-gray-200",
      iconColor: "text-gray-800"
    },
    {
      id: 2,
      title: "ON-DEMAND COURSE VIDEOS",
      description: "You can watch our courses on a mobile or computer as many time as you like, with lifetime access.",
      icon: <Users className="w-8 h-8" />,
      iconBg: "bg-gray-200",
      iconColor: "text-gray-800"
    },
    {
      id: 3,
      title: "EFFECTIVE FORMAT",
      description: "Learn in the engaging format that Dhruv Rathee educational videos are known and loved for.",
      icon: <CheckCircle className="w-8 h-8" />,
      iconBg: "bg-gray-200",
      iconColor: "text-gray-800"
    },
    {
      id: 4,
      title: "STUDENT SATISFACTION",
      description: "We care about your learning, development, and experience.",
      icon: <ThumbsUp className="w-8 h-8" />,
      iconBg: "bg-gray-200",
      iconColor: "text-gray-800"
    },
    {
      id: 5,
      title: "COMPLETION CERTIFICATE",
      description: "A certificate of completion lets you show off your accomplishment",
      icon: <ThumbsUp className="w-8 h-8" />,
      iconBg: "bg-gray-200",
      iconColor: "text-gray-800"
    }
  ];

  return (
    <div className="w-full bg-black/90 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
            WHAT WE FOCUS ON
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Top Row - 3 cards */}
          <div className="bg-black rounded-3xl p-8 flex items-center justify-between min-h-[200px] group hover:bg-gray-750 transition-colors duration-300">
            <div className="flex-1 pr-6">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
                PREVIOUS YEAR<br />QUESTIONS
              </h3>
              <p className="text-white/80 text-base leading-relaxed">
                Access all important SSC questions from previous years to boost your preparation.
              </p>
            </div>
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-gray-200 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Play className="w-8 h-8 text-gray-800" />
              </div>
            </div>
          </div>

          <div className="bg-black rounded-3xl p-8 flex items-center justify-between min-h-[200px] group hover:bg-gray-750 transition-colors duration-300">
            <div className="flex-1 pr-6">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
                ALL IMPORTANT<br />TOPICS
              </h3>
              <p className="text-white/80 text-base leading-relaxed">
                Our SSC sheets cover all essential topics, saving your time and making preparation easier
              </p>
            </div>
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-gray-200 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Users className="w-8 h-8 text-gray-800" />
              </div>
            </div>
          </div>

          <div className="bg-black rounded-3xl p-8 flex items-center justify-between min-h-[200px] group hover:bg-gray-750 transition-colors duration-300">
            <div className="flex-1 pr-6">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
                EASY-TO-USE<br />FORMAT
              </h3>
              <p className="text-white/80 text-base leading-relaxed">
                Our sheets are structured in a clear and simple format for quick learning and revision.
              </p>
            </div>
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-gray-200 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <CheckCircle className="w-8 h-8 text-gray-800" />
              </div>
            </div>
          </div>

          {/* Bottom Row - 2 cards spanning wider */}
          <div className="md:col-span-1 lg:col-span-1 bg-black rounded-3xl p-8 flex items-center justify-between min-h-[200px] group hover:bg-gray-750 transition-colors duration-300">
            <div className="flex-1 pr-6">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
                STUDENT SUCCESS
              </h3>
              <p className="text-white/80 text-base leading-relaxed">
                Thousands of students trust CodeMonarch Academy for SSC preparation and excel in exams.
              </p>
            </div>
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-gray-200 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <ThumbsUp className="w-8 h-8 text-gray-800" />
              </div>
            </div>
          </div>

          <div className="md:col-span-1 lg:col-span-2 bg-black rounded-3xl p-8 flex items-center justify-between min-h-[200px] group hover:bg-gray-750 transition-colors duration-300">
            <div className="flex-1 pr-6">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
                REVISION MADE EASY
              </h3>
              <p className="text-white/80 text-base leading-relaxed">
                With all key questions in one sheet, revising for SSC exams has never been simpler.
              </p>
            </div>
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-gray-200 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <ThumbsUp className="w-8 h-8 text-gray-800" />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile-specific layout for better readability on small screens */}
        <div className="block md:hidden mt-8">
          <div className="space-y-6">
            {features.map((feature, index) => (
              <div key={feature.id} className="bg-black rounded-3xl p-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className={`w-12 h-12 ${feature.iconBg} rounded-xl flex items-center justify-center`}>
                      {React.cloneElement(feature.icon, { 
                        className: `w-6 h-6 ${feature.iconColor}` 
                      })}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-white/80 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FocusSection;