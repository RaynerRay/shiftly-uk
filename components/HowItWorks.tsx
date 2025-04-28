import React from 'react';
import { Search, Calendar, Clock, CheckCircle, UserPlus, Building } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: <UserPlus className="w-8 h-8 text-sky-600" />,
      title: "Professional Sign-Up",
      description: "Healthcare professionals join our platform, verify their credentials, and set up their professional profile with specialties and experience."
    },
    {
      icon: <Calendar className="w-8 h-8 text-sky-600" />,
      title: "Availability Management",
      description: "Professionals manage their schedule by setting recurring availability or specific time slots, ensuring work-life balance."
    },
    {
      icon: <Search className="w-8 h-8 text-sky-600" />,
      title: "Easy Search",
      description: "Healthcare facilities search for available professionals based on specialty, location, and required timing."
    },
    {
      icon: <Clock className="w-8 h-8 text-sky-600" />,
      title: "Booking Request",
      description: "Facilities select their preferred time slot and send a booking request to the healthcare professional."
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-sky-600" />,
      title: "Confirmation",
      description: "Professionals review and confirm bookings, with automatic notifications sent to both parties."
    },
    {
      icon: <Building className="w-8 h-8 text-sky-600" />,
      title: "Facility Access",
      description: "Once confirmed, professionals receive facility details and access instructions for their upcoming shift."
    }
  ];

  return (
    <div className="bg-gradient-to-r from-neutral-300 to-sky-200 text-gray-200">
    <div className="max-w-7xl mx-auto px-4 py-16 bg-gradient-to-r from-neutral-300 to-sky-200 text-gray-200">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Our platform connects healthcare professionals with facilities seamlessly.
          Here is how our booking process works from start to finish.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {steps.map((step, index) => (
          <div 
            key={index}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="bg-sky-50 w-16 h-16 rounded-full flex items-center justify-center mb-4">
              {step.icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              {step.title}
            </h3>
            <p className="text-gray-600">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default HowItWorks;