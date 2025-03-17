import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  
import Ips_Logo from '../assets/IPS WHITE batch 1.png';
import { Link } from 'react-scroll';

const Header = () => {
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleJoinCommunity = () => {
        navigate('/join-community');  
    };

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const handleMobileMenuClick = (section) => {
        setMobileMenuOpen(false); // Close the menu when a link is clicked
    };

    return (
        <div className='w-full h-[80px] flex px-4 md:px-10 justify-between items-center font-primary bg-white shadow-md fixed top-0 left-0 right-0 z-50'>
            {/* Logo and Title */}
            <div className='flex items-center gap-2 md:gap-5'>
                <img src={Ips_Logo} alt="Logo" className='w-[50px] h-[50px] md:w-[70px] md:h-[70px]' />
                <h1 className='font-semibold text-xl md:text-2xl mokoto-text'>IPS Tech Community</h1>
            </div>

            {/* Desktop Navigation */}
            <ul className='hidden md:flex items-center gap-6 lg:gap-10 mokoto-text'>
                {['home', 'about', 'projects', 'contact'].map((section) => (
                    <Link 
                        key={section} 
                        to={section} 
                        smooth={true} 
                        duration={1000}
                    >
                        <li className='text-base lg:text-lg font-semibold cursor-pointer px-3 lg:px-7 py-2 rounded-lg transition-all duration-300 hover:bg-blue-600 hover:text-white'>
                            {section.charAt(0).toUpperCase() + section.slice(1)}
                        </li>
                    </Link>
                ))}
            </ul>

            {/* Desktop Join Community Button */}
            <div className='hidden md:block'>
                <button 
                    className='text-white px-4 py-2 rounded-lg bg-blue-600 font-medium cursor-pointer transition-all duration-300 hover:bg-blue-700'
                    onClick={handleJoinCommunity}  
                >
                    Join Community
                </button>
            </div>

            {/* Mobile Menu Button */}
            <div className='md:hidden flex items-center gap-2'>
                <button 
                    className='text-white px-3 py-1 rounded-lg bg-blue-600 font-medium text-sm cursor-pointer transition-all duration-300 hover:bg-blue-700'
                    onClick={handleJoinCommunity}  
                >
                    Join
                </button>
                <button 
                    onClick={toggleMobileMenu}
                    className='text-blue-600 p-2 focus:outline-none'
                >
                    {mobileMenuOpen ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    )}
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className='md:hidden absolute top-[80px] left-0 right-0 bg-white shadow-md z-40'>
                    <ul className='flex flex-col w-full mokoto-text'>
                        {['home', 'about', 'projects', 'contact'].map((section) => (
                            <Link 
                                key={section} 
                                to={section} 
                                smooth={true} 
                                duration={1000} 
                                onClick={() => handleMobileMenuClick(section)}
                            >
                                <li className='text-base font-semibold cursor-pointer px-6 py-4 border-b border-gray-100 hover:bg-blue-50 transition-all duration-200'>
                                    {section.charAt(0).toUpperCase() + section.slice(1)}
                                </li>
                            </Link>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Header;