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
    { title: 'Monday', component: <Monday profile={profile} day="monday" /> },
    { title: 'Tuesday', component: <Tuesday profile={profile} day="tuesday" /> },
    { title: 'Wednesday', component: <Wednesday profile={profile} day="wednesday" /> },
    { title: 'Thursday', component: <Thursday profile={profile} day="thursday" /> },
    { title: 'Friday', component: <Friday profile={profile} day="friday" /> },
    { title: 'Saturday', component: <Saturday profile={profile} day="saturday" /> },
    { title: 'Sunday', component: <Sunday profile={profile} day="sunday" /> },
  ];

  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <p className="py-3 text-lg font-semibold">Add availability for the week</p>
      
      {/* Tab buttons */}
      <div className="flex flex-wrap gap-2 border-b border-gray-200">
        {tabs.map((tab, i) => (
          <button
            key={i}
            onClick={() => setActiveTab(i)}
            className={`px-4 py-2 text-sm font-medium transition-colors duration-200 border-b-2 ${
              activeTab === i
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-blue-500 hover:border-blue-300'
            }`}
          >
            {tab.title}
          </button>
        ))}
      </div>

      {/* Active tab content */}
      <div className="mt-4">{tabs[activeTab].component}</div>
    </div>
  );
}
