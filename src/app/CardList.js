import React from "react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

export default function CardList() {
  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-center gap-10 bg-black/90 pt-10 pb-10">
        
        <div className="flex-shrink-0 w-[450px] md:w-[650px]">
          <div className="bg-black/50 rounded-xl border border-black shadow-xl w-full h-[200px] md:h-[350px] overflow-hidden flex items-center justify-center relative">
            <Image
              src="/sum1.png" // Make sure the image path is correct
              alt="Card"
              layout="fill" // Ensures the image fills the container
              objectFit="cover" // Ensures the image covers the container without distortion
              className="rounded-xl"
            />
          </div>
        </div>

        {/* Text Section */}
        <div className="max-w-md text-left text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            How to Use Our Platform
          </h2>
          {/* <p className="text-white text-base md:text-lg leading-relaxed mb-6">
            Build your food delivery platform just like Swiggy & Zomato. With
            real-time order tracking, restaurant management, and delivery
            partner apps, our solution helps you start your own on-demand food
            delivery business instantly.
          </p> */}

          {/* ✅ Tick List */}
          <ul className="space-y-3 mb-6 text-white">
            <li className="flex items-center gap-2 text-white">
              ✓ Login/Signup to get started
            </li>
            <li className="flex items-center gap-2 text-white">
              ✓ Browse Sheets and select your desired one
            </li>
            <li className="flex items-center gap-2 text-white">
              ✓ Progress Bar to track your learning
            </li>
            <li className="flex items-center gap-2 text-white">✓ View Notes/Solutions with video explanations</li>
            <li className="flex items-center gap-2 text-white">
              ✓ Revision Mode for practicing learned questions
            </li>
            <li className="flex items-center gap-2 text-white">
              ✓ Question Status to see the exam year or status
            </li>
            <li className="flex items-center gap-2 text-white">
              ✓ Revision List for easy access to all revision questions
            </li>
          </ul>
        </div>
      </div>

      
    </>
  );
}
