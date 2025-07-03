"use client";
import { useState } from 'react'
import { FaBars } from 'react-icons/fa'
import Link from "next/link";
import Footer from "@/components/footer";
import Alerts from "@/components/Alerts";

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSb = () => {
    setSidebarOpen(!sidebarOpen);
  }
  return (<>
    <div className="bg-gradient-to-b from-[#dae9be] to-[#c4dfaa]">

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleSb}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 w-64 h-full bg-white shadow-lg z-40 transform transition-transform duration-300 ${sidebarOpen ? 'left-0' : '-left-full'
          }`}>
        <div className="p-4 border-b text-lg font-semibold text-black">Menu</div>
        <nav className="flex flex-col space-y-4 p-4 text-gray-800">
          <a href="/" className="hover:font-semibold">Home</a>
          <a href="/login" className="hover:font-semibold">Login</a>
          <a href="/about" className="hover:font-semibold">About</a>
          <a href="mailto:rrandomm122@gmail.com" className="hover:font-semibold">Contact</a>
        </nav>
      </div>
      <header className="flex items-center border glass-navbar border-[#3b5731] py-3 px-4 md:px-10 bg-[#c7f8b5] justify-between">
        <div className="font-extrabold tracking-wide text-xl md:text-2xl uppercase text-[#2f4627]"> CLIMATE REFUGEE CONNECT</div>
        <ul className="hidden md:flex gap-8">
          <a href="/about"><li className="hover:cursor-pointer transition-all duration-300 ease-in-out hover:font-semibold hover:bg-green-100 px-6 py-3 rounded-full" >About</li></a>
          <li className="hover:cursor-pointer transition-all duration-300 ease-in-out hover:font-semibold hover:bg-green-100 px-6 py-3 rounded-full">Features</li>
          <li className="hover:cursor-pointer transition-all duration-300 ease-in-out hover:font-semibold hover:bg-green-100 px-6 py-3 rounded-full">Communtities</li>
          <a href="mailto:rrandomm122@gmail.com"><li className="hover:cursor-pointer transition-all duration-300 ease-in-out hover:font-semibold hover:bg-green-100 px-6 py-3 rounded-full">Contact Us</li></a>
        </ul>
        <Link href={'/login'}><button className="cursor-pointer hidden md:block transition-all duration-300 ease-in-out shadow-lg hover:bg-green-700 text-lg hover:text-white rounded-2xl border-[1px] px-8 py-2 border-[#3b5731] font-semibold text-[#2f4627]">Login</button></Link>
        <button onClick={toggleSb} className="md:hidden text-gray-700 p-1 focus:outline-none">
          <FaBars className="text-xl" />
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] max-w-[1400px] md:flex items-center px-2 pb-2 mb-4 justify-between">
        <div className="bg-[url('/BG.jpg')] hidden md:block bg-contain h-[88vh] w-[70%] bg-center bg-no-repeat"></div>

        <main class="md:hidden glass-section rounded-3xl p-8 lg:p-12 shadow-xl border border-white border-opacity-20 relative overflow-hidden">
          <div class="absolute top-[-50%] right-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle,rgba(76,175,80,0.1)_0%,transparent_70%)] animate-float"></div>
          <h1 class="text-[#1b5e20] text-4xl lg:text-6xl font-extrabold mb-6 leading-tight relative z-10">Rebuilding Lives Beyond Climate Borders</h1>
          <p class="text-[#2d5a2d] text-lg lg:text-xl mb-12 opacity-90 relative z-10">Helping climate refugees find safe countries for a fresh start through our innovative matching platform.</p>
 
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 my-12">
            <div class="glass-card p-8 rounded-2xl text-center shadow-lg border border-white border-opacity-30 transition-all duration-300 ease-in-out relative overflow-hidden hover:-translate-y-2 hover:shadow-xl hover:shadow-gray-300/50">
              <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#4caf50] to-[#66bb6a] transform -translate-x-full transition-transform duration-600 ease-in-out"></div>
              <div class="text-5xl mb-6 text-[#4caf50]">👤</div>
              <h3 class="text-xl font-bold text-[#1b5e20] mb-4">Step 1: Tell us about your situation</h3>
              <p class="text-[#2d5a2d] opacity-90 leading-relaxed">Share your location, skills, needs, and circumstances. Our secure platform ensures your privacy while gathering essential information.</p>
            </div>
            <div class="glass-card p-8 rounded-2xl text-center shadow-lg border border-white border-opacity-30 transition-all duration-300 ease-in-out relative overflow-hidden hover:-translate-y-2 hover:shadow-xl hover:shadow-gray-300/50">
              <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#4caf50] to-[#66bb6a] transform -translate-x-full transition-transform duration-600 ease-in-out"></div>
              <div class="text-5xl mb-6 text-[#4caf50]">🤝</div>
              <h3 class="text-xl font-bold text-[#1b5e20] mb-4">Step 2: We match you</h3>
              <p class="text-[#2d5a2d] opacity-90 leading-relaxed">Our AI-powered system connects you to suitable destinations and opportunities based on your profile and preferences.</p>
            </div>
            <div class="glass-card p-8 rounded-2xl text-center shadow-lg border border-white border-opacity-30 transition-all duration-300 ease-in-out relative overflow-hidden hover:-translate-y-2 hover:shadow-xl hover:shadow-gray-300/50">
              <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#4caf50] to-[#66bb6a] transform -translate-x-full transition-transform duration-600 ease-in-out"></div>
              <div class="text-5xl mb-6 text-[#4caf50]">🌟</div>
              <h3 class="text-xl font-bold text-[#1b5e20] mb-4">Start a new chapter</h3>
              <p class="text-[#2d5a2d] opacity-90 leading-relaxed">Begin your journey in a welcoming, supportive environment with access to resources and community connections.</p>
            </div>
          </div>

          <div class="text-center mt-12">
            <a href="/login" class="btn-gradient btn-gradient-hover inline-block text-white px-12 py-4 rounded-full font-bold text-lg transition-all duration-300 ease-in-out shadow-xl hover:-translate-y-1 hover:shadow-2xl relative overflow-hidden">Get Started Today</a>
          </div>
        </main>

        <div className="h-[86vh] w-full glass-sidebar md:w-[30%] mt-3 rounded-xl border shadow-lg">
          <Alerts />
        </div>
      </div>
    </div>
    <Footer />
  </>
  );
}
