"use client"
import { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// FAQ data type definitions
type FAQItem = {
  qn: string;
  ans: string;
};

type FAQData = {
  worker: FAQItem[];
  client: FAQItem[];
};

export default function FAQ() {
  const [activeTab, setActiveTab] = useState<'worker' | 'client'>('worker');
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // FAQ data
  const faqs: FAQData = {
    worker: [
      {
        qn: "Is there a fee to register as a Shiftly worker?",
        ans: "No, signing up is completely free."
      },
      {
        qn: "What are the qualifications to become a Shiftly worker?",
        ans: "For carers, you need at least 6 months of work experience in the UK. If you require a visa to work, it must be valid and permit self-employment. Nurses need a minimum of 2 years' experience and must hold a UK pin number."
      },
      {
        qn: "How often should I update my availability?",
        ans: "You can set your availability up to 14 days in advance. We recommend keeping it updated regularly to get the most recent job offers."
      },
      {
        qn: "What documents are required during the registration process?",
        ans: "Carers should provide their up-to-date Mandatory Training Certificates or, optionally, an NVQ Diploma/Care Certificate. For specialist skills like medication administration or having a driving license, related certificates are needed. Nurses must provide their Mandatory Training Certificates. Both roles require a clear Disclosure and Barring Service certificate (DBS) certificate (no older than 2 years, ideally on a live register), a recent professional photo, and contact details for two referees."
      },
      {
        qn: "Who can serve as my referee?",
        ans: "Carers need one professional reference, typically from a previous care employer, and one personal reference from someone who knows you well. Nurses are required to provide two professional references from a senior nurse, clinical manager, or nursing agency."
      },
      {
        qn: "Can I cancel an accepted work assignment?",
        ans: "Once you accept an assignment, you're expected to complete it. If necessary, you can cancel with a valid reason by giving at least 12 hours' notice."
      },
      {
        qn: "How and when do I get paid after completing an assignment?",
        ans: "After you confirm your worked hours, the timesheet is sent to the client for approval. Payments are made within 7 days after approval."
      }
    ],
    client: [
      {
        qn: "How do I create a client account?",
        ans: "To register, go to the sign-up page and fill out the required details. After that, you can start booking workers."
      },
      {
        qn: "What is the cost of booking a worker?",
        ans: "Final amount will be calculated on the booking page."
      },
      {
        qn: "Is it possible to book more than one worker at a time?",
        ans: "Yes, you can book multiple workers for different tasks as needed."
      }
    ]
  };

  return (
    <div className="bg-gradient-to-b from-sky-50 to-white py-16 px-4 rounded-2xl shadow-sm">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="inline-block font-sans text-4xl md:text-5xl font-bold text-gray-900 mb-4 relative">
            Frequently Asked 
            <span className="font-serif italic text-sky-600"> Questions</span>
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-sky-400 to-orange-500 rounded-full"></div>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mt-4">
            Find answers to common questions about working with or hiring through Shiftly
          </p>
        </div>
        
        {/* Tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1 bg-sky-400 rounded-xl shadow-inner">
            <button
              onClick={() => {
                setActiveTab('worker');
                setActiveIndex(null);
              }}
              className={`relative py-3 px-6 md:px-10 text-gray-100 md:text-lg font-medium transition-all duration-300 ease-in-out rounded-lg ${
                activeTab === 'worker'
                  ? 'text-sky-100 shadow-lg bg-sky-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              {activeTab === 'worker' && (
                <motion.div
                  layoutId="tab-background"
                  className="absolute inset-0 bg-gradient-to-r from-sky-500 to-indigo-600 rounded-lg -z-10"
                  initial={false}
                />
              )}
              For Workers
            </button>
            <button
              onClick={() => {
                setActiveTab('client');
                setActiveIndex(null);
              }}
              className={`relative py-3 px-6 md:px-10 text-base md:text-lg font-medium transition-all duration-300 ease-in-out rounded-lg ${
                activeTab === 'client'
                  ? 'text-sky-100 shadow-lg bg-sky-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              {activeTab === 'client' && (
                <motion.div
                  layoutId="tab-background"
                  className="absolute inset-0 bg-gradient-to-r from-sky-500 to-indigo-600 rounded-lg -z-10"
                  initial={false}
                />
              )}
              For Clients
            </button>
          </div>
        </div>

        {/* FAQ Content */}
        <div className="bg-white shadow-xl rounded-2xl p-1 border border-gray-100">
          <div className="divide-y divide-gray-100">
            <AnimatePresence>
              {faqs[activeTab].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="overflow-hidden"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full py-5 px-6 flex justify-between items-center group text-left"
                  >
                    <span className="text-lg font-medium text-gray-800 group-hover:text-sky-600 transition-colors duration-200">
                      {faq.qn}
                    </span>
                    <div className="flex-shrink-0 ml-4 bg-gray-50 rounded-full p-2 group-hover:bg-sky-100 transition-colors duration-200">
                      {activeIndex === index ? (
                        <ChevronUp className="w-5 h-5 text-sky-600" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-sky-600" />
                      )}
                    </div>
                  </button>
                  
                  <AnimatePresence>
                    {activeIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-5">
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-gray-600 leading-relaxed">
                              {faq.ans}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
        
        {/* Call to action */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">Still have questions?</p>
          <a 
            href="#contact" 
            className="inline-flex items-center px-6 py-3 rounded-lg bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-medium shadow-lg shadow-sky-100 hover:shadow-xl hover:shadow-sky-200 transition-all duration-300 transform hover:-translate-y-1"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
}