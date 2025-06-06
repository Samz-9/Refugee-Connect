import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-[#54616c] h-[14vh] m-1 rounded-xl text-white py-8 px-8">
      <div className="flex flex-col lg:flex-row justify-around items-center w-full max-w-screen-xl mx-auto">
        <p className="text-sm text-center lg:text-left">© 2025 ClimateRefugeeConnect</p>
        <ul className="flex flex-col lg:flex-row items-center space-y-2 lg:space-y-0 lg:space-x-6 text-sm">
          <li><a href="/tos" className="hover:underline">Terms of Service</a></li>
          <li><a href="/gtc" className="hover:underline">General Terms and Conditions</a></li>
          <li><a href="/privacy" className="hover:underline">Privacy Policy</a></li>
          <li><a href="/cookies" className="hover:underline">Cookie Policy</a></li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer
