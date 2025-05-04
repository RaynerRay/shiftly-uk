// import { CheckCircle, ShieldCheck, Users, Clock } from "lucide-react";

// export default function page() {
//   return (
//     <div className="max-w-4xl mx-auto p-6 space-y-6">
//       <h1 className="text-3xl font-bold text-center">Terms and Conditions</h1>
//       <p className="text-gray-700">
//         Welcome to Shiftly UK. By using our platform, you agree to comply with our
//         terms and conditions. Please read them carefully.
//       </p>

//       <section>
//         <h2 className="text-2xl font-semibold flex items-center gap-2">
//           <ShieldCheck className="text-blue-500" /> User Eligibility
//         </h2>
//         <p className="text-gray-700">
//           Users must be verified healthcare professionals or registered
//           healthcare providers to access our services.
//         </p>
//       </section>

//       <section>
//         <h2 className="text-2xl font-semibold flex items-center gap-2">
//           <Users className="text-green-500" /> Account Responsibilities
//         </h2>
//         <p className="text-gray-700">
//           Users are responsible for maintaining the security of their account
//           and ensuring that all provided information is accurate and up to date.
//         </p>
//       </section>

//       <section>
//         <h2 className="text-2xl font-semibold flex items-center gap-2">
//           <CheckCircle className="text-purple-500" /> Booking and Payments
//         </h2>
//         <p className="text-gray-700">
//           Shiftly facilitates connections between professionals and providers.
//           Payment terms and shift agreements are subject to mutual consent
//           between parties.
//         </p>
//       </section>

//       <section>
//         <h2 className="text-2xl font-semibold flex items-center gap-2">
//           <Clock className="text-orange-500" /> Booking Policies
//         </h2>
//         <p className="text-gray-700">
//           Once a booking is confirmed, the agreed hours cannot be changed within 24 hours of the shift start time. 
//           Additionally, all appointments must be made at least 3 hours before the scheduled shift begins.
//         </p>
//       </section>

//       <section>
//         <h2 className="text-2xl font-semibold flex items-center gap-2">
//           <ShieldCheck className="text-red-500" /> Compliance and Conduct
//         </h2>
//         <p className="text-gray-700">
//           Users must adhere to all UK healthcare regulations and professional
//           standards. Misconduct may result in account suspension or termination.
//         </p>
//       </section>

//       <section>
//         <h2 className="text-2xl font-semibold flex items-center gap-2">
//           <Users className="text-yellow-500" /> Liability and Disputes
//         </h2>
//         <p className="text-gray-700">
//           Shiftly is not liable for disputes arising between users. Any legal
//           matters must be resolved independently.
//         </p>
//       </section>

//       <footer className="text-center text-gray-600 mt-6 border-t pt-4">
//         <p>
//           These terms may be updated periodically. Continued use of the platform
//           indicates acceptance of the latest terms.
//         </p>
//       </footer>
//     </div>
//   );
// }
"use client"

import { useState, useRef, useEffect } from 'react';

interface Section {
  id: string;
  title: string;
  content: string[];
}

const TermsAndConditionsComponent = () => {
  const [activeSection, setActiveSection] = useState<string>('');
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const termsAndConditions: Section[] = [
    {
      id: 'commencement-term',
      title: '1. Commencement and Term',
      content: [
        'Save for where the Client has entered into a signed Shiftly issued Agreement, these terms shall set out the agreement between Shiftly and the Client, for the supply of Temporary Workers by Shiftly to the Client. For the purposes of the Conduct Regulations 2003, Shiftly acts as an employment business in relation to the Introduction and supply of Temporary Workers pursuant to this agreement.'
      ]
    },
    {
      id: 'third-party-funding',
      title: '2. Third Party Funding',
      content: [
        '2.1 Notwithstanding any current, pending, transferred or approved funding application by the Client (or any other third party) in relation to the Agency Services the Client remains liable for the Service Fee as set out herein.',
        '2.2 The obligation of the Client to pay such fees to the Agency may only be transferred to a third party with the prior written consent of the Agency.'
      ]
    },
    {
      id: 'agency-obligations',
      title: '3. Agency Obligations',
      content: [
        '3.1 The Agency will provide Agency Services to the Client in consideration for the Clients paying the Service Fees to the Agency, subject to this Agreement.',
        '3.2 For the purposes of the Conduct Regulations 2003, Agency acts as an employment business in relation to the introduction and supply of Temporary Workers pursuant to this Agreement.',
        '3.3 The Agency will use reasonable endeavours to supply to the Client Temporary Workers suitable to carry out work of such nature as the Client notifies to the Agency. The Agency does not warrant, represent or undertake to find a suitable candidate for each vacancy notified to it by the Client.',
        '3.4 When supplying a Temporary Worker to a Client, the Agency will inform the Client, so far as enabled to do so by information provided by the Temporary Worker to the Agency:',
       
        ]
    },
    {
      id: 'service-fees',
      title: '4. Service Fees, Payment and Service Fee increase',
      content: [
        '4.1 The Client will pay to the Agency for the supply of the Temporary Worker as set out in your unique Rates Link the following:',
        '4.1.1 the hourly Service Fees (rounded up to the nearest 15 minutes) in respect of each Temporary Worker for all hours (or part thereof) worked by that Temporary Worker;',
        '4.1.2 National insurance which shall be calculated at 13.80% of the relevant hourly staff pay or other such amount as set out in the Rate Link from time to time;',
        '4.1.3 Other expenses such as the cost of hotel, subsistence, travelling and any other ancillary expenses ("Expenses") reasonably and properly incurred by the Temporary Worker in the provision of the Assignment',
        '4.1.4 Subject to the compliance with AWR regulations as set out in 5.1.6 Temporary Workers shall not have a default unpaid rest period within their timesheet and any such rest period shall be paid unless such break is added on the timesheet.',
        '4.2 Your Rates Link will set out any discount to invoices that you may earn from time to time subject to achieving certain milestones in relation to booking hours. Agency reserves the right to disapply any such discount where Client fails to adhere to the payment terms as set out in clause 4.6.',
        '4.3 Agency will submit its invoice to the Client in respect of the Service Fees and any Expenses weekly in arrears or such longer period at the Agencys sole discretion.',
        '4.4 Unless specifically otherwise agreed between the parties in writing, the Agency does not agree to submit any details of shifts worked by Workers on to any systems operated by the Client directly or by third parties on behalf of the Client in order to receive payment.',
        '4.5 Agency will submit invoices to the Client via email unless the Client has notified Agency that it wishes to access invoices online through the Agency online invoicing system ("Shiftly"). To the extent that Shiftly is or becomes unavailable at any time, Agency shall be entitled at its discretion to submit invoices to affected Client by email.',
        '4.6 The payment of the Service Fees, national insurance, travel and other expenses will be made by the Client to the Agency within 28 days of the date of the Agencys invoice in respect of the amounts specified in the invoice. Time shall be of the essence in relation to payment of the Service Fees.',
        '4.7 The Client shall pay by bank transfer or faster payment to a bank account nominated in writing (or as set out in the invoice) by Agency.',
        '4.8 All amounts stated are exclusive of VAT and any other applicable taxes, which will if applicable be charged in addition at the rate in force at the time the services are provided.',
        '4.9 If the Client does not make a payment by the date stated in an invoice or as otherwise provided for in this Agreement, then the Agency will be entitled:',
        '4.9.1 to charge interest (both before and after any judgment) on the outstanding amount at the rate of 8% per annum above the base lending rate of the Bank of England, accruing daily;',
        '4.9.2 to require the Client to pay, in advance, for any Agency Services, or any part of the Agency Services, which have not yet been performed;',
        '4.9.3 not to perform any further Agency Services, or any part of the Agency Services;',
        '4.9.4 to disapply any volume discount as set out in the Rates Link; and',
        '4.9.5 to withdraw without notice any Temporary Worker(s) currently Engaged by the Client.',
        '4.10 When making a payment the Client will provide the same day a remittance advice that sets out quote the invoice numbers or shifts covered by such payment. Failure to provide this information will entitle the Agency to charge an administration fee of £25 for every such occurrence.',
        '4.11 The Agency may set and vary credit limits and payment terms from time to time and has the right to withhold all further supplies of Agency Services without liability to the Client if the Client exceeds such credit limit or payment terms.',
        '4.12 The Agency may increase its Rates during the Term provided that:',
        '4.12.1 The new Rate is communicated to the Client; and',
        '4.12.2 The new Rate is applied at least 28 days after it is communicated.'
      ],
    },
    
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            setActiveSection(id);
          }
        });
      },
      { rootMargin: '-20% 0px -80% 0px' }
    );

    // Observe all section elements
    Object.values(sectionRefs.current).forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      // Cleanup when component unmounts
      observer.disconnect();
    };
  }, []);

  const scrollToSection = (id: string) => {
    const section = sectionRefs.current[id];
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  return (
    <div className="flex flex-col md:flex-row bg-gray-50 min-h-screen">
    {/* Sidebar */}
    <div className="md:w-64 bg-white p-4 md:fixed md:h-screen overflow-y-auto shadow-md">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-800">Contents</h3>
      </div>
      <nav>
        <ul>
          {termsAndConditions.map((section) => (
            <li key={section.id} className="mb-2">
              <button
                onClick={() => scrollToSection(section.id)}
                className={`text-left w-full py-2 px-3 rounded-lg transition-colors ${
                  activeSection === section.id
                    ? 'bg-blue-100 text-blue-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-100'
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
    <div className="flex-1 md:ml-64 p-4 md:p-8">
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg p-6 md:p-8">
        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <a
            href="/terms-and-conditions/worker"
            className="px-6 py-3 rounded-lg text-white bg-gray-600 hover:bg-gray-800 text-center transition-colors"
          >
            View Worker Terms
          </a>
          <a
            href="/terms-and-conditions/clients"
            className="px-6 py-3 rounded-lg text-white bg-sky-500 hover:bg-sky-600 text-center transition-colors"
          >
            View Client Terms
          </a>
        </div>
  
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
          Terms and Conditions
        </h1>
  
        {termsAndConditions.map((section) => (
          <div
            key={section.id}
            id={section.id}
            ref={(el: HTMLDivElement | null) => {
              sectionRefs.current[section.id] = el;
            }}
            className="mb-8 scroll-mt-4"
          >
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">
              {section.title}
            </h2>
            {section.content.map((paragraph, index) => (
              <p
                key={index}
                className="text-gray-700 mb-3 leading-relaxed"
              >
                {paragraph}
              </p>
            ))}
          </div>
        ))}
      </div>
    </div>
  </div>
  
  );
};

export default TermsAndConditionsComponent;