  import React from 'react'
  import technical from '../assets/technical.png'
  import mobile from '../assets/mobile.png'
  import cloud from '../assets/cloud.png'
  import ai from '../assets/ai.png'

  const serviceData = {
    "Web Development": { image:technical, description: "Custom web solutions" },
    "Mobile Apps": { image: mobile, description: "iOS and Android development" },
    "Cloud Solutions": { image: cloud, description: "Scalable cloud services" },
    "AI Services": { image: ai, description: "Intelligent automation" }
  };


  const ServiceBox = ({ children }) => {
    const service = serviceData[children] || {
      image: "../assets/default.png",
      description: "Intelligence projects"
    };

    return (
      <div className="flex flex-col items-center text-center w-48">
        <img src={service.image} alt={children} className=" h-8 mb-2" />
        <h2 className="text-lg font-semibold">{children}</h2>
        <p className="text-gray-600 text-sm">{service.description}</p>
      </div>
    );
  }
  export default ServiceBox;
