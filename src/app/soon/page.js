
import React  from 'react';
import { Mail, Clock, Rocket } from 'lucide-react';
import Navbar from '../Navbar';

export default function ComingSoon() {
  

  return (
    <div className="min-h-screen bg-black flex items-center justify-center  overflow-hidden relative">
        <Navbar/>
      

      <div className="max-w-4xl w-full relative mt-28 z-10">
        <div className="flex justify-center mb-8 animate-bounce">
          <div className="bg-black bg-opacity-10 backdrop-blur-lg p-6 rounded-full border border-white border-opacity-20">
            <Rocket className="w-12 h-12 md:w-16 md:h-16 text-white" />
          </div>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight">
            Coming Soon
          </h1>
          <p className="text-lg md:text-xl text-purple-200 max-w-2xl mx-auto px-4">
            We are in the process of creating the English Sheet, and we will soon be releasing the English sheet on our platform
          </p>
        </div>

        

        

        
      </div>
    </div>
  );
}