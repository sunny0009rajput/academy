"use client";
import React, { useState } from "react";
import Link from "next/link"; // <-- Import Link for navigation
import { BookOpenText, Zap, Heart, Star } from "lucide-react";

export default function AllCourses() {
  const [selectedCard, setSelectedCard] = useState(null);

  const cards = [
    {
      id: 1,
      title: "SSC GK Sheet",
      description:
        "SSC GK Sheet – Access all important SSC General Knowledge questions, including previous years’ and high-priority topics, to boost your exam preparation efficiently.",
      image: "ssc.png",
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-50 to-pink-50",
      url: "/sscsheet/gk", // <-- Redirect URL
    },
    {
      id: 2,
      title: "SSC English Sheet",
      description:
        "SSC English Sheet – Access all important SSC English questions, including previous years’ and high-priority topics, to boost your exam preparation efficiently.",
      image: "ssc.png",
      gradient: "from-yellow-500 to-orange-500",
      bgGradient: "from-yellow-50 to-orange-50",
      url: "/soon",
    },
    {
      id: 3,
      title: "SSC Math Sheet",
      description:
        "SSC Maths Sheet – Access all important SSC Mathematics questions, including previous years’ and high-priority topics, to boost your exam preparation efficiently.",
      image: "ssc.png",
      gradient: "from-red-500 to-rose-500",
      bgGradient: "from-red-50 to-rose-50",
      url: "/soon",
    },
    {
      id: 4,
      title: "SSC Reasoning Sheet",
      description:
        "SSC Reasoning Sheet – Access all important SSC Reasoning questions, including previous years’ and high-priority topics, to boost your exam preparation efficiently.",
      image: "ssc.png",
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50",
      url: "/soon",
    },
  ];

  const handleCardClick = (id) => {
    setSelectedCard(id);
    setTimeout(() => setSelectedCard(null), 300);
  };

  return (
    <div className="min-h-screen bg-black/90 py-42 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Discover Our Sheets
          </h1>
          <p className="text-lg text-white max-w-2xl mx-auto">
            Click on any card to explore important SSC questions and topics
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card) => (
            <Link key={card.id} href={card.url}>
              <div
                onClick={() => handleCardClick(card.id)}
                className={`group relative cursor-pointer transition-all duration-300 transform hover:-translate-y-2 ${
                  selectedCard === card.id ? "scale-95" : "hover:scale-105"
                }`}
              >
                <div className="h-full bg-black/90 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden">
                  <div
                    className={`h-2 bg-gradient-to-r ${card.gradient}`}
                  ></div>

                  <div className="p-6">
                    <div className="overflow-hidden rounded-t-2xl">
                      <img
                        src={card.image}
                        alt={card.title}
                        className="w-auto h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    <h3 className="text-xl font-bold text-white mt-2 mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-green-600 group-hover:to-green-500 transition-all duration-300">
                      {card.title}
                    </h3>

                    <p className="text-white text-sm leading-relaxed">
                      {card.description}
                    </p>
                  </div>

                  <div className="px-6 pb-6">
                    <div
                      className={`inline-flex items-center text-sm font-semibold bg-gradient-to-r ${card.gradient} bg-clip-text text-transparent group-hover:translate-x-1 transition-transform duration-300`}
                    >
                      View Sheet
                      <svg
                        className="w-4 h-4 ml-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>

                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${card.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none rounded-2xl`}
                  ></div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
