"use client";

import { useState, useRef, useEffect } from 'react';

interface Section {
  id: string;
  title: string;
  content: string[];
}

const ShiftlyUKTerms = () => {
  const [activeSection, setActiveSection] = useState<string>('');
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const termsSections: Section[] = [
    {
      id: 'agreement-overview',
      title: '1. Agreement Overview',
      content: [
        'These terms constitute the full agreement between Shiftly and the Worker for access to the Shiftly UK Platform. The platform connects Workers with Clients to arrange Assignments, with no direct contract existing between Shiftly and the Worker for the Assignments themselves.',
        'The Worker is an independent contractor and not an employee of Shiftly or the Client. The Worker is free to engage with other third parties, provided this does not interfere with delivering services per industry standards.'
      ],
     
    },
    {
      id: 'assignments',
      title: '2. Assignments',
      content: [
        'Workers must create an account on the Shiftly UK Platform. Shiftly will verify the Worker’s suitability before granting access.',
        'Due to the nature of temporary work, Shiftly does not guarantee the availability of Assignments. Workers are responsible for determining the suitability of any Assignment.',
        'For each Assignment, Shiftly will provide details including Client identity, Assignment duration, role, location, hours, pay rate, health and safety risks, and required qualifications.'
      ],
   
    },
    {
      id: 'transfer-fees',
      title: '3. Transfer Fees',
      content: [
        'Shiftly may charge the Client an Introduction Fee if the Client hires the Worker directly within the Relevant Period or introduces the Worker to a third party who then engages the Worker within the same period.'
      ],
    
    },
    {
      id: 'worker-obligations',
      title: '4. Worker Obligations',
      content: [
        'Workers are not required to accept any Assignment. If accepted, Workers must follow the Client’s reasonable instructions, provide necessary qualifications (e.g., DBS certificate, references), and deliver services to Good Industry Practice standards.',
        'Workers must submit electronic timesheets within 24 hours of Assignment completion for Client approval. Workers must notify the Client at least 12 hours in advance if unable to attend and immediately if they become unsuitable for an Assignment.',
        'Workers are responsible for maintaining accurate account details, ensuring account security, and complying with Client health, safety, and equal opportunities policies.'
      ],
  
    },
    {
      id: 'remuneration',
      title: '5. Remuneration',
      content: [
        'Upon submission of approved timesheets, the Client will pay the Worker the agreed Rate of Pay within 7 days. The Rate of Pay is specified in the Assignment Schedule.',
        'No payment is provided for time not worked, including holidays or absences, unless otherwise agreed.'
      ],

    },
    {
      id: 'termination',
      title: '6. Termination',
      content: [
        'Shiftly may terminate this agreement with immediate notice if the Worker materially breaches the terms, repeatedly fails to comply, or commits an unremediable breach.',
        'During investigations into breaches, Shiftly may suspend the Worker’s account and withdraw Assignments. If the Shiftly-Client agreement ends, the Worker’s Assignment will terminate without liability, except for payment for work completed.'
      ],

    },
    {
      id: 'confidentiality',
      title: '7. Confidentiality',
      content: [
        'To protect Shiftly’s confidentiality, Workers must keep all Shiftly business and affairs information (Confidential Information) private, use it only for performing services, and not disclose or copy it without Shiftly’s express authorization, except as required for Assignment duties, in which case copies belong to Shiftly.',
        'These restrictions do not apply to disclosures authorized by Shiftly, required by law, or already in the public domain (unless due to the Worker’s unauthorized disclosure), or protected disclosures under section 43A of the Employment Rights Act 1996.',
        'Workers and Shiftly may report suspected crimes, comply with HMRC or regulatory requirements, cooperate with investigations, comply with court orders, disclose to confidential advisors (e.g., legal, medical), or make other legally required disclosures without breaching confidentiality.'
      ],
  
    },
    {
      id: 'data-protection',
      title: '8. Data Protection',
      content: [
        'Shiftly collects and processes Worker information in accordance with the Privacy Notice available on the Shiftly UK website. Workers must sign and date the Privacy Notice.'
      ],
  
    },
    {
      id: 'warranties-indemnities',
      title: '9. Warranties and Indemnities',
      content: [
        'Workers warrant that all provided application information is accurate, they possess the necessary experience, qualifications, and authorizations for Assignments, have valid UK work rights, have no relevant criminal convictions, are willing to work in the Client’s role, and operate as self-employed independent contractors.',
        'Workers will indemnify Shiftly and the Client against losses (including legal fees) arising from their failure to meet obligations, negligent or fraudulent acts, unauthorized disclosure of Confidential Information, or employment-related claims connected to Assignments or this agreement.'
      ],
   
    },
    {
      id: 'entire-agreement',
      title: '10. Entire Agreement',
      content: [
        'This agreement is the complete and exclusive agreement between Shiftly and the Worker, superseding all prior agreements, promises, or representations, whether written or oral.',
        'Both parties confirm they rely only on this agreement’s terms, not on any external statements or assurances. Variations to this agreement must be written, signed by both parties, and provided to the Worker within five business days of agreement.'
      ],
   
    },
    {
      id: 'governing-law-jurisdiction',
      title: '11. Governing Law and Jurisdiction',
      content: [
        'This agreement and any disputes (including non-contractual disputes) are governed by and construed in accordance with the laws of England and Wales.',
        'Both parties agree that the courts of England and Wales have exclusive jurisdiction to settle any disputes or claims arising from this agreement.'
      ],
 
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -80% 0px' }
    );

    Object.values(sectionRefs.current).forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const section = sectionRefs.current[id];
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  return (
    <div className="flex flex-col md:flex-row bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <div className="md:w-72 bg-white p-6 md:fixed md:h-screen overflow-y-auto shadow-lg">
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-900">Table of Contents</h3>
        </div>
        <nav>
          <ul>
            {termsSections.map((section) => (
              <li key={section.id} className="mb-3">
                <button
                  onClick={() => scrollToSection(section.id)}
                  className={`text-left w-full py-2 px-4 rounded-lg transition-colors ${
                    activeSection === section.id
                      ? 'bg-blue-200 text-blue-800 font-semibold'
                      : 'text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {section.title}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 md:ml-72 p-6 md:p-10">
         {/* Buttons */}
         <div className="flex flex-col md:flex-row gap-4 mb-6 px-6 ">
         
          <a
            href="/terms-and-conditions/clients"
            className="px-6 py-3 rounded-lg text-white bg-sky-500 hover:bg-sky-600 text-center transition-colors"
          >
            View Client Terms
          </a>
        </div>
        <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-xl p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Shiftly Workers Terms and Conditions</h1>
          <p className="text-gray-600 mb-8">
            Welcome to Shiftly UK, operated by CloudBreak group Ltd. By accessing our Click Shifts platform, you agree to these terms. Please review them carefully.
          </p>
          
          {termsSections.map((section) => (
            <div
              key={section.id}
              id={section.id}
              ref={(el: HTMLDivElement | null) => {
                sectionRefs.current[section.id] = el;
              }}
              className="mb-10 scroll-mt-6"
            >
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4 flex items-center gap-3">
            
                {section.title}
              </h2>
              {section.content.map((paragraph, index) => (
                <p key={index} className="text-gray-600 mb-4 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          ))}

          <footer className="text-center text-gray-500 mt-10 border-t pt-6">
            <p>
              These terms may be updated from time to time. Continued use of the Shiftly UK platform constitutes acceptance of the latest terms.
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default ShiftlyUKTerms;