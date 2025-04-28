"use client";

import React, { FC } from "react";
import {
  ArrowRight,
  Wallet,
  CalendarDays,
  ChevronUp,
  ChevronDown,
} from "lucide-react";

import { useState } from "react";

// interface FAQItem {
//   qn: string;
//   ans: string;
// }

const faqs = {
  worker: [
    {
      qn: "Is there a fee to register as a Shiftly worker?",
      ans: "No, signing up is completely free.",
    },
    {
      qn: "What are the qualifications to become a Shiftly worker?",
      ans: "For carers, you need at least 6 months of work experience in the UK. If you require a visa to work, it must be valid and permit self-employment. Nurses need a minimum of 2 years' experience and must hold a UK pin number.",
    },
    {
      qn: "How often should I update my availability?",
      ans: "You can set your availability up to 14 days in advance. We recommend keeping it updated regularly to get the most recent job offers.",
    },
   
    {
      qn: "What documents are required during the registration process?",
      ans: "Carers should provide their up-to-date Mandatory Training Certificates or, optionally, an NVQ Diploma/Care Certificate. For specialist skills like medication administration or having a driving license, related certificates are needed. Nurses must provide their Mandatory Training Certificates. Both roles require a clear DBS certificate (no older than 2 years, ideally on a live register), a recent professional photo, and contact details for two referees.",
    },
    {
      qn: "Who can serve as my referee?",
      ans: "Carers need one professional reference, typically from a previous care employer, and one personal reference from someone who knows you well. Nurses are required to provide two professional references from a senior nurse, clinical manager, or nursing agency.",
    },
   
    {
      qn: "Can I cancel an accepted work assignment?",
      ans: "Once you accept an assignment, you're expected to complete it. If necessary, you can cancel with a valid reason by giving at least 12 hours' notice.",
    },
    {
      qn: "How and when do I get paid after completing an assignment?",
      ans: "After you confirm your worked hours, the timesheet is sent to the client for approval. Payments are made within 7 days after approval.",
    },
  ],
  client: [
    {
      qn: "How do I create a client account?",
      ans: "To register, go to the sign-up page and fill out the required details. After that, you can start booking workers.",
    },
    {
      qn: "What is the cost of booking a worker?",
      ans: "Final amount will be calculated on the booking page.",
    },
    {
      qn: "Is it possible to book more than one worker at a time?",
      ans: "Yes, you can book multiple workers for different tasks as needed.",
    },
  ],
};

const cards = [
  {
    title: " Join Our Network",
    description:
      "Start a new application to join our network of healthcare providers.",
    link: "/register?role=DOCTOR&plan=free",
    linkTitle: "Start a new application",
  },
  {
    title: "Resume Your Application",
    description:
      "Pick up where you left off and complete your onboarding process.",
    link: "/onboarding/resume",
    linkTitle: "Resume Application",
  },
];

const Page: FC = () => {
  const [activeTab, setActiveTab] = useState<"client" | "worker">("worker");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index); // Toggle active FAQ
  };

  return (
    <section className="relative py-20 md:py-8 overflow-hidden bg-gradient-to-r from-neutral-300 to-sky-200 text-gray-200">
      <div className="relative container px-4 mx-auto">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center mb-2">
            <h1 className="font-heading text-2xl sm:text-4xl font-bold text-gray-900 mb-10">
              <span>Pick Up Extra Shifts, Keep Every</span>{" "}
              <span className="font-serif italic">Penny!</span>
            </h1>
          </div>

          <div className="flex flex-wrap -mx-4 items-center mb-10">
            <div className="w-full lg:w-1/2 px-4 mb-20 lg:mb-0">
              <div className="">
                <div className="w-full sm:w-1/2 lg:w-full px-4 mb-10">
                  <div className="max-w-md">
                    <div className="flex items-center">
                      <div className="flex w-14 h-14 mb-6 items-center justify-center bg-sky-200 rounded-full">
                        <Wallet className="text-sky-900" size={32} />
                      </div>
                      <h5 className="text-xl font-semibold text-gray-900 mb-2 px-4">
                        Keep 100% of Your Earnings
                      </h5>
                    </div>
                    <p className="text-gray-500">
                      Unlike traditional agencies that take up to 40% of your
                      pay, with Shiftly you keep every penny you earn. No hidden
                      fees, no commission cuts.
                    </p>
                  </div>
                </div>
                <div className="w-full sm:w-1/2 lg:w-full px-4 ">
                  <div className="max-w-md">
                    <div className="flex items-center">
                      <div className="flex w-14 h-14 mb-6 items-center justify-center bg-green-200 rounded-full">
                        <CalendarDays className="text-green-900" size={32} />
                      </div>
                      <h5 className="text-xl font-semibold text-gray-900 mb-2 px-4">
                        Flexible Scheduling
                      </h5>
                    </div>
                    <p className="text-gray-500">
                      Choose when and where you want to work. Pick up shifts
                      that fit your lifestyle and maintain perfect work-life
                      balance.
                    </p>
                  </div>
                </div>

                {/* <ul className="mb-10 mx-4">
                  <li className="flex mb-4 items-center">
                    <div className="flex flex-shrink-0 mr-3 items-center justify-center w-6 h-6 bg-green-500 rounded-full">
                      <CheckCircle className="text-white" size={12} />
                    </div>
                    <span className="text-gray-600">
                      Direct payments completing your shift
                    </span>
                  </li>
                  <li className="flex mb-4 items-center">
                    <div className="flex flex-shrink-0 mr-3 items-center justify-center w-6 h-6 bg-green-500 rounded-full">
                      <CheckCircle className="text-white" size={12} />
                    </div>
                    <span className="text-gray-600">
                      Access to premium rates and overtime opportunities
                    </span>
                  </li>
                  <li className="flex items-center">
                    <div className="flex flex-shrink-0 mr-3 items-center justify-center w-6 h-6 bg-green-500 rounded-full">
                      <CheckCircle className="text-white" size={12} />
                    </div>
                    <span className="text-gray-600">
                      Full transparency - see exact pay rates before accepting
                      shifts
                    </span>
                  </li>
                </ul> */}
                {/* <div className="sm:flex items-center">
                  <a
                    className="relative group inline-block w-full sm:w-auto mb-3 sm:mb-0 sm:mr-4 py-4 px-6 text-center text-white font-semibold bg-sky-900 rounded-md overflow-hidden"
                    href="#"
                  >
                    <div className="absolute top-0 right-full w-full h-full bg-gray-900 transform group-hover:translate-x-full group-hover:scale-102 transition duration-500"></div>
                    <span className="relative">Join Now</span>
                  </a>
                  <a
                    className="inline-flex w-full sm:w-auto py-4 px-6 items-center justify-center text-sky-900 font-semibold border border-gray-200 hover:border-orange-900 rounded-md transition duration-200"
                    href="#"
                  >
                    Learn More
                  </a>
                </div> */}
              </div>
            </div>
            <div className="w-full xl:w-1/2 px-4">
              <div className="grid grid-cols-1 md:grid-cols-2">
                {cards.map((card, i) => {
                  return (
                    <div key={i} className="w-full xl:w-auto  border border-sky-200 rounded-md mx-1">
                      <div className="xl:max-w-sm h-full">
                        <div className="px-9 py-8 h-full bg-sky-50 rounded-md shadow-7xl ">
                          <div className="flex flex-col justify-between h-full ">
                            <div>
                              <h3 className="mb-5 text-xl text-sky-900 font-bold leading-snug">
                                {card.title}
                              </h3>
                              <p className="mb-24 text-gray-900 font-medium">
                                {card.description}
                              </p>
                            </div>
                            <a
                              className="inline-flex items-center text-white hover:text-gray-200 px-4 py-2 rounded-md bg-sky-600 hover:bg-sky-700"
                              href={card.link}
                            >
                              <span className="mr-2 text-sm font-sans font-semibold">
                                {card.linkTitle}
                              </span>
                              <ArrowRight className="text-white h-4" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="bg-gray-50 mt-6 rounded-md">
            <div className="flex justify-center pt-20">
              <h1 className="font-heading text-2xl sm:text-4xl font-bold text-gray-900 mb-10">
                <span>Frequently Asked</span>{" "}
                <span className="font-serif italic">Questions</span>
              </h1>
            </div>
            <div className="max-w-4xl mx-auto p-6">
      

      {/* Tabs */}
      <div className="flex justify-center space-x-4 mb-8">
        <button
          className={`py-3 px-2 text-lg font-semibold transition-all duration-200 ease-in-out
            ${
              activeTab === "worker"
                ? "text-white bg-sky-600 shadow-lg shadow-sky-200"
                : "text-gray-600 bg-gray-100 hover:bg-gray-200"
            } rounded-lg`}
          onClick={() => setActiveTab("worker")}
        >
          For Workers
        </button>
        <button
          className={`py-3 px-8 text-lg font-semibold transition-all duration-200 ease-in-out
            ${
              activeTab === "client"
                ? "text-white bg-sky-600 shadow-lg shadow-sky-200"
                : "text-gray-600 bg-gray-100 hover:bg-gray-200"
            } rounded-lg`}
          onClick={() => setActiveTab("client")}
        >
          For Clients
        </button>
      </div>

      {/* FAQ Content */}
      <div className=" shadow-lg rounded-xl p-6 border border-gray-100">
        {activeTab === "client" &&
          faqs.client.map((faq, index) => (
            <div 
              key={index} 
              className={`border-b border-gray-200 ${
                index === faqs.client.length - 1 ? 'border-b-0' : ''
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="py-4 w-full flex justify-between items-center group hover:text-sky-600 transition-colors duration-200"
              >
                <span className="text-lg font-semibold text-gray-800 group-hover:text-sky-600">
                  {faq.qn}
                </span>
                <div className="flex-shrink-0 ml-4">
                  {activeIndex === index ? (
                    <ChevronUp className="w-6 h-6 text-sky-600" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-gray-400 group-hover:text-sky-600" />
                  )}
                </div>
              </button>
              {activeIndex === index && (
                <div className="pb-4 pr-12">
                  <p className="text-gray-600 leading-relaxed">
                    {faq.ans}
                  </p>
                </div>
              )}
            </div>
          ))}

        {activeTab === "worker" &&
          faqs.worker.map((faq, index) => (
            <div 
              key={index} 
              className={`border-b border-gray-200 ${
                index === faqs.worker.length - 1 ? 'border-b-0' : ''
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="py-4 w-full flex justify-between items-center group hover:text-sky-600 transition-colors duration-200"
              >
                <span className="text-lg font-semibold text-gray-800 group-hover:text-sky-600">
                  {faq.qn}
                </span>
                <div className="flex-shrink-0 ml-4">
                  {activeIndex === index ? (
                    <ChevronUp className="w-6 h-6 text-sky-600" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-gray-400 group-hover:text-sky-600" />
                  )}
                </div>
              </button>
              {activeIndex === index && (
                <div className="pb-4 pr-12">
                  <p className="text-gray-600 leading-relaxed">
                    {faq.ans}
                  </p>
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
