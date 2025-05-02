'use client';

import React, { useState } from 'react';
import { DoctorProfile } from '@prisma/client';
import Monday from './AvailabilityDays/Monday';
import Tuesday from './AvailabilityDays/Tuesday';
import Wednesday from './AvailabilityDays/Wednesday';
import Thursday from './AvailabilityDays/Thursday';
import Friday from './AvailabilityDays/Friday';
import Saturday from './AvailabilityDays/Saturday';
import Sunday from './AvailabilityDays/Sunday';

export default function AvailabilitySettings({
  profile,
}: {
  profile: DoctorProfile | undefined | null;
}) {
  const tabs = [
    { title: 'Mon', fullTitle: 'Monday', component: <Monday profile={profile} day="monday" /> },
    { title: 'Tue', fullTitle: 'Tuesday', component: <Tuesday profile={profile} day="tuesday" /> },
    { title: 'Wed', fullTitle: 'Wednesday', component: <Wednesday profile={profile} day="wednesday" /> },
    { title: 'Thu', fullTitle: 'Thursday', component: <Thursday profile={profile} day="thursday" /> },
    { title: 'Fri', fullTitle: 'Friday', component: <Friday profile={profile} day="friday" /> },
    { title: 'Sat', fullTitle: 'Saturday', component: <Saturday profile={profile} day="saturday" /> },
    { title: 'Sun', fullTitle: 'Sunday', component: <Sunday profile={profile} day="sunday" /> },
  ];

  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <p className="py-2 sm:py-3 text-base sm:text-lg font-semibold">Add availability for the week</p>
      
      {/* Tab buttons - Mobile dropdown for small screens */}
      <div className="block sm:hidden mb-4">
        <select 
          value={activeTab}
          onChange={(e) => setActiveTab(Number(e.target.value))}
          className="w-full p-2 border border-gray-300 rounded-md bg-white"
        >
          {tabs.map((tab, i) => (
            <option key={i} value={i}>
              {tab.fullTitle}
            </option>
          ))}
        </select>
      </div>

      {/* Tab buttons - Regular tabs for larger screens */}
      <div className="hidden sm:flex flex-wrap gap-2 border-b border-gray-200">
        {tabs.map((tab, i) => (
          <button
            key={i}
            onClick={() => setActiveTab(i)}
            className={`px-3 sm:px-4 py-2 text-sm font-medium transition-colors duration-200 border-b-2 ${
              activeTab === i
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-blue-500 hover:border-blue-300'
            }`}
          >
            <span className="sm:hidden">{tab.title}</span>
            <span className="hidden sm:inline">{tab.fullTitle}</span>
          </button>
        ))}
      </div>

      {/* Active tab content */}
      <div className="mt-4">{tabs[activeTab].component}</div>
    </div>
  );
}