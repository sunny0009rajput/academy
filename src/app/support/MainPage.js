"use client";
import { useState } from "react";
import { ChevronDown, Mail, Phone, MapPin, Heart, Contact,ArrowLeft } from "lucide-react";
import ContactSection from "./ContactSection";
import Image from "next/image";
import Navbar from "../Navbar";
import FooterSection from "../FooterSection";
export default function DoubtSupportPage() {
  const [isDoubtExpanded, setIsDoubtExpanded] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white pt-18 px-2 py-2 lg:px-28 lg:py-28">
      {/* Header */}
      <Navbar/>
        {/* 🔙 Back Button */}
      
      

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Doubt Section Card */}
        <section className="bg-black/50 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
          <button
            onClick={() => setIsDoubtExpanded(!isDoubtExpanded)}
            className="w-full px-8 py-6 flex items-center justify-between bg-gradient-to-r from-red-500 to-orange-500 text-white hover:from-red-500 hover:to-orange-500 transition-all"
          >
            <div className="text-left">
              <h2 className="text-2xl font-bold">Have a Doubt?</h2>
              <p className="mt-1 text-blue-100">
                Click to submit your questions
              </p>
            </div>
            <ChevronDown
              className={`w-6 h-6 transition-transform duration-300 ${
                isDoubtExpanded ? "rotate-180" : ""
              }`}
            />
          </button>

          <div
            className={`transition-all duration-500 ease-in-out ${
              isDoubtExpanded
                ? "max-h-[900px] opacity-100"
                : "max-h-0 opacity-0"
            } overflow-hidden`}
          >
            <div className="p-8">
              <div className="bg-gray-50 rounded-xl p-4">
                <iframe
                  src="https://docs.google.com/forms/d/e/1FAIpQLSfmBiTzCMOIKgXc3XH85ojW2MZ6ZjaiJNO01plJDh4tMA1x8A/viewform?embedded=true"
                  width="100%"
                  height="799"
                  frameBorder="0"
                  marginHeight="0"
                  marginWidth="0"
                  className="rounded-lg"
                >
                  Loading…
                </iframe>
              </div>
            </div>
          </div>
        </section>

        {/* Support Us Section */}
        <section className="bg-black/50 rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-pink-100 rounded-full mb-4">
              <Heart className="w-8 h-8 text-pink-600" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">
              Support Us
            </h2>
            <p className="text-white">
              Your generous support ensures that CodeMonarch Academy remains completely free,<br></br> empowering students everywhere to achieve their dreams
            </p>
          </div>

          <div className="flex flex-col items-center space-y-4">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl">
              {/* QR Code Placeholder - Replace with actual QR code */}
              <div className="w-100 h-100 ">
                <div className="text-center">
                  
                    <span className="text-4xl">
                      <Image
                        src="/payme.jpg" // ← your logo image path (inside public/ folder)
                        alt="payment QR code"
                        width={300} // ← adjust as per your design
                        height={300}
                        className="inline-block object-contain"
                      />
                    </span>
                  
                  
                </div>
              </div>
            </div>
            <p className="text-white text-center max-w-md">
              Scan the QR code to help us keep this website free for all students.
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <FooterSection/>
    </div>
  );
}
