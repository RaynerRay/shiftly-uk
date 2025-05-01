"use client";

import { useState, useRef, useEffect } from 'react';

interface Section {
  id: string;
  title: string;
  content: string[];
}

const page = () => {
  const [activeSection, setActiveSection] = useState<string>('');
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const termsSections: Section[] = [
    {
      id: 'agreement-overview',
      title: '1. Agreement Overview',
      content: [
        'These terms form the agreement between CloudBreak group and the Client for the introduction of Workers via the Shiftly UK Platform.  acts as an employment agency under the Conduct Regulations 2003, facilitating connections between Clients and Workers for Assignments.',
        'The Client is a business or individual seeking Worker services through the platform, subject to these terms.'
      ],
      
    },
    {
      id: 'Shiflty-obligations',
      title: '2. Shiflty Obligations',
      content: [
        'Shiflty will screen Workers to ensure they meet regulatory standards, including right-to-work verification, before approving their platform accounts. Only Workers meeting minimum criteria for the role will be introduced.',
        'For Assignments requiring qualifications or involving Vulnerable Persons, Shiflty will take reasonable steps to obtain and provide copies of relevant certifications, DBS certificates, and references, and confirm Worker suitability. If unable to fully comply, Shiflty will inform the Client of steps taken.',
        'Before an Assignment begins, Shiflty will provide the Client with Worker identity, qualifications, agreed pay rate, notice period, and invoicing details via the platform.'
      ],

    },
    {
      id: 'client-obligations',
      title: '3. Client Obligations',
      content: [
        'To enable Shiflty’s compliance with Conduct Regulations, the Client must provide details of the Assignment, including work type, location, hours, supervisor contact, required qualifications, health and safety risks, and Assignment duration.',
        'The Client must execute a Hirer/Worker Agreement with the Worker before the Assignment starts.'
      ],
  
    },
    {
      id: 'transfer-fee',
      title: '4. Transfer Fee',
      content: [
        'The Client will incur a Transfer Fee if they engage a Worker introduced by Shiflty, other than via Shiflty, or introduce the Worker to a third party resulting in an engagement, during the Assignment or within the Relevant Period (or within 6 months of introduction if not previously engaged).',
        'The Transfer Fee is calculated as the Shiflty booking fees multiplied by 100, plus VAT, as per Schedule 1.'
      ],
   
    },
    {
      id: 'fees-and-vat',
      title: '5. Fees and VAT',
      content: [
        'The Client will pay Shiflty’s booking fee in advance and the Worker’s Assignment Fee upon Assignment completion. Shiflty will provide fee details via the platform. The Client must approve timesheets within 48 hours of submission, or they are deemed approved.',
        'The Client cannot reject timesheets due to dissatisfaction with work quality. Shiflty invoices include verified timesheets. The booking fee must be paid before the Assignment starts, and Assignment Fees are due after Worker hours are confirmed.',
        'Late payments incur 4% annual interest above the Bank of England’s base rate. VAT is charged on booking fees. Funds for Assignment Fees are transferred directly to the Worker, with Shiflty holding any pre- or post-Assignment funds in trust.'
      ],
  
    },
    {
      id: 'dispute-and-cancellation',
      title: '6. Dispute and Cancellation',
      content: [
        'For disputes over Worker hours, the Client must notify Shiflty within 48 hours of timesheet submission and cooperate to resolve the issue. Shiflty facilitates but is not responsible for resolving payment disputes between Client and Worker.',
        'Cancellations incur a £5 charge, with the booking fee refunded. Less than 24 hours’ notice incurs the full booking fee; less than 6 hours’ notice incurs the booking fee plus the Worker’s agreed fee.'
      ],
  
    },
    {
      id: 'termination',
      title: '7. Termination',
      content: [
        'Shiflty may terminate this agreement immediately if the Client materially breaches terms (and fails to remedy within 5 days if remediable), repeatedly breaches terms, or suspends/ceases business operations.'
      ],
 
    },
    {
      id: 'indemnities-and-insurance',
      title: '8. Indemnities and Insurance',
      content: [
        'Shiflty is not liable for losses from Worker failure, negligence, misconduct, or Assignment termination, except for death or personal injury due to Shiflty’s negligence. The Client will indemnify Shiflty against losses from Client negligence, misrepresentation, or breach of obligations.',
        'The Client must comply with statutory requirements, including Data Protection Laws and Health and Safety regulations, and maintain Employer’s and Public Liability Insurance for Workers, providing proof to Shiflty upon request.'
      ],
  
    },
    {
      id: 'confidentiality',
      title: '9. Confidentiality',
      content: [
        'Worker information is confidential, subject to Data Protection Laws, and provided solely for work-finding purposes. The Client must not use or disclose it for other purposes or to third parties.',
        'Shiflty business information must be kept confidential and not shared, except for information already in the public domain.'
      ],
    
    },
    {
      id: 'data-protection',
      title: '10. Data Protection',
      content: [
        'Both parties, as data controllers, must comply with Data Protection Legislation (e.g., UK GDPR, Data Protection Act 2018) when sharing personal data for compliance with Conduct Regulations and healthcare laws.',
        'Each party must ensure lawful data transfer, inform data subjects, process data only for agreed purposes, protect data with technical measures, and assist with data subject requests, breach notifications, and compliance. Breaches allow termination if unremedied within 30 days.',
        'Each party indemnifies the other against losses from Data Protection Legislation breaches.'
      ],
  
    },
    {
      id: 'intellectual-property-and-warranties',
      title: '11. Intellectual Property and Warranties',
      content: [
        'All intellectual property rights from Assignments belong to the Client. Shiflty will ensure Workers execute necessary documents to effect this.',
        'Shiflty warrants it has the expertise to provide services using qualified personnel and will comply with all relevant laws and regulations.'
      ],
  
    },
    {
      id: 'additional-terms',
      title: '12. Additional Terms',
      content: [
        'Neither party may solicit the other’s key executives for 6 months post-agreement, except via non-targeted national campaigns.',
        'This agreement does not create a partnership or agency. Variations require written, signed agreement. Force majeure excuses performance delays for up to 4 weeks, after which the unaffected party may terminate with 7 days’ notice.',
        'No third-party rights are created under the Contracts (Rights of Third Parties) Act 1999.'
      ],
     
    },
    {
      id: 'governing-law-jurisdiction',
      title: '13. Governing Law and Jurisdiction',
      content: [
        'This agreement and any disputes (including non-contractual disputes) are governed by the laws of England and Wales.',
        'The courts of England and Wales have exclusive jurisdiction over any disputes or claims arising from this agreement.'
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
      <div className="flex flex-col md:flex-row gap-4 mb-6 px-6 ">
         
         <a
           href="/terms-and-conditions/workers"
           className="px-6 py-3 rounded-lg text-white bg-sky-500 hover:bg-sky-600 text-center transition-colors"
         >
           View Workers Terms
         </a>
       </div>
        <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-xl p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Shiftly UK Client Terms and Conditions</h1>
          <p className="text-gray-600 mb-8">
            Welcome to Shiftly UK, operated by CloudBreak Group Ltd. By accessing our Click Shifts platform as a Client, you agree to these terms. Please review them carefully.
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
              These terms may be updated periodically. Continued use of the Shiftly UK platform constitutes acceptance of the latest terms.
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default page;