import React from "react";
import { FaGithub, FaLinkedin, FaDiscord } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 md:py-10">
      <div className="max-w-6xl mx-auto px-4 md:px-12">
        {/* Mobile: Stack vertically, Center align */}
        {/* Desktop: Flex row with space between */}
        <div className="flex flex-col md:flex-row md:justify-between space-y-8 md:space-y-0">
          
          {/* Company Info */}
          <div className="text-center md:text-left md:w-1/4">
            <h2 className="text-xl font-bold flex items-center justify-center md:justify-start mokoto-text">
              <span className="text-blue-400 text-2xl mr-2">{"</>"}</span> IPS Tech
            </h2>
            <p className="text-gray-400 text-sm mt-2">
              Empowering innovation through community collaboration
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left md:w-1/4">
            <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-blue-400">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400">Projects</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400">Services</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400">Contact</a></li>
            </ul>
          </div>

          {/* Connect - Social Links */}
          <div className="text-center md:text-left md:w-1/4">
            <h3 className="text-lg font-semibold mb-3">Connect</h3>
            
            {/* Mobile: Horizontal icon layout */}
            <div className="flex justify-center md:hidden space-x-8 mt-4">
              <a href="https://github.com/Kite-IPS" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400">
                <FaGithub className="text-2xl" />
              </a>
              <a href="https://lnkd.in/gZdPmjSB" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400">
                <FaLinkedin className="text-2xl" />
              </a>
              <a href="mailto:your-email@gmail.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400">
                <BiLogoGmail className="text-2xl" />
              </a>
              <a href="https://discord.com/invite/your-invite-link" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400">
                <FaDiscord className="text-2xl" />
              </a>
            </div>
            
            {/* Desktop: List with text */}
            <ul className="hidden md:block space-y-3">
              <li>
                <a href="https://github.com/Kite-IPS" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 flex items-center gap-2">
                  <FaGithub /> GitHub
                </a>
              </li>
              <li>
                <a href="https://lnkd.in/gZdPmjSB" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 flex items-center gap-2">
                  <FaLinkedin /> LinkedIn
                </a>
              </li>
              <li>
                <a href="mailto:your-email@gmail.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 flex items-center gap-2">
                  <BiLogoGmail /> Gmail
                </a>
              </li>
              <li>
                <a href="https://discord.com/invite/your-invite-link" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 flex items-center gap-2">
                  <FaDiscord /> Discord
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Copyright - Optional */}
        <div className="mt-8 pt-6 border-t border-gray-800 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} IPS Tech. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;