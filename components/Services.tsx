import React from "react";
import { ChevronRight, Heart, Users, Home, Star, Briefcase, Shield, Clock, UserPlus } from "lucide-react";
import Head from "next/head";
import Link from "next/link";

const Services = () => {
  // SEO metadata
  const pageTitle = "Healthcare Professional Services | Shiftly UK";
  const pageDescription = "Connect with qualified nurses, carers, and social workers across the UK for professional healthcare services in homes, care facilities, and community settings.";
  const keywords = "healthcare workers, nurses, carers, social workers, home care, UK healthcare, adult social care, child social workers";

  return (
    <>
      {/* SEO Head Tags */}
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={keywords} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://shiftly.uk/services" />
        <meta property="og:image" content="https://shiftly.uk/images/services-og.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <link rel="canonical" href="https://shiftly.uk/services" />
      </Head>

      <main id="main-content" className="w-full bg-gradient-to-br from-sky-50 to-sky-100 py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header - Improved heading structure */}
          <section aria-labelledby="main-heading" className="text-center mb-16">
            <div className="flex items-center justify-center mb-4" aria-hidden="true">
              <div className="h-1 w-12 bg-orange-500 rounded-full mr-3"></div>
              <Star className="text-orange-500 h-6 w-6" />
              <div className="h-1 w-12 bg-orange-500 rounded-full ml-3"></div>
            </div>
            <h1 id="main-heading" className="text-4xl md:text-5xl font-bold text-sky-600 mb-6">
              Healthcare Professional Services
            </h1>
            <p className="text-sky-700 max-w-4xl mx-auto text-lg">
              shiftly connects private clients, care homes, clinics, the NHS, and local council healthcare services 
              with qualified, vetted UK-based healthcare workers. Our platform makes it easy to find trusted carers, nurses, 
              and social workers for both temporary shifts and permanent roles, ensuring high-quality care for individuals 
              and communities across the UK.
            </p>
          </section>

          {/* Healthcare Professional Categories */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {/* Category 1 - Social Workers */}
            <article className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-6 border-l-4 border-orange-500">
              <Shield className="h-8 w-8 text-sky-500 mb-4" />
              <h3 className="text-xl font-bold text-sky-600 mb-2">Social Workers</h3>
              <p className="text-sky-700">Qualified child and adult social workers providing statutory assessments, safeguarding services, and care planning throughout the UK.</p>
            </article>

            {/* Category 2 - Nurses */}
            <article className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-6 border-l-4 border-orange-500">
              <Heart className="h-8 w-8 text-sky-500 mb-4" />
              <h3 className="text-xl font-bold text-sky-600 mb-2">Nurses</h3>
              <p className="text-sky-700">Registered nurses offering clinical care, medication management, wound care, and specialist nursing services in various settings.</p>
            </article>

            {/* Category 3 - Carers */}
            <article className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-6 border-l-4 border-orange-500">
              <Users className="h-8 w-8 text-sky-500 mb-4" />
              <h3 className="text-xl font-bold text-sky-600 mb-2">Carers</h3>
              <p className="text-sky-700">Experienced care assistants providing personal care, companionship, and practical support for elderly, disabled, and vulnerable individuals.</p>
            </article>
          </div>

          {/* Main Service Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 - Social Work Services */}
            <article className="bg-sky-900 rounded-2xl overflow-hidden shadow-xl transform transition-all hover:scale-105 border-t-4 border-orange-500 h-full">
              <div className="p-8 h-full flex flex-col">
                <header className="flex items-center mb-4">
                  <Shield className="text-sky-300 mr-3 h-6 w-6" aria-hidden="true" />
                  <h2 id="social-work-heading" className="text-3xl font-bold text-sky-300">Social Work Services</h2>
                </header>
                <h3 className="text-2xl font-semibold text-white mb-6">
                  Child & Adult Protection Experts
                </h3>
                <ul className="space-y-4 text-sky-100 mb-8" aria-labelledby="social-work-heading">
                  <li>✅ <span>Child protection assessments and interventions</span></li>
                  <li>⚡ <span>Adult safeguarding and mental capacity assessments</span></li>
                  <li>🛠️ <span>Care planning and case management</span></li>
                  <li>💼 <span>Mental health support and approved mental health professionals</span></li>
                </ul>
                <div className="mt-auto">
                  <Link
                    href="/social-work-services"
                    className="inline-flex items-center text-orange-400 hover:text-orange-300 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-orange-300 focus:ring-offset-2 focus:ring-offset-sky-900 rounded-md px-2 py-1"
                    aria-label="Learn more about our social work services"
                  >
                    Find out more <ChevronRight className="ml-1 h-5 w-5" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </article>

            {/* Card 2 - Nursing Services */}
            <article className="bg-white rounded-2xl overflow-hidden shadow-xl transform transition-all hover:scale-105 relative h-full">
              <div className="absolute top-0 right-0 bg-orange-500 text-white py-1 px-4 rounded-bl-lg text-sm font-medium">
                High Demand
              </div>
              <div className="p-8 h-full flex flex-col">
                <header className="flex items-center mb-4">
                  <Heart className="text-sky-500 mr-3 h-6 w-6" aria-hidden="true" />
                  <h2 id="nursing-heading" className="text-3xl font-bold text-sky-500">Nursing Services</h2>
                </header>
                <p className="text-sky-700 mb-6">
                  Professional nursing care in various settings:
                </p>
                <ul className="space-y-2 mb-8 list-disc pl-8" aria-labelledby="nursing-heading">
                  <li className="text-sky-700">
                    General nursing and medication management
                  </li>
                  <li className="text-sky-700">
                    Specialist wound care and pressure sore prevention
                  </li>
                  <li className="text-sky-700">
                    Palliative and end-of-life nursing care
                  </li>
                  <li className="text-sky-700">
                    Mental health nursing and dementia care
                  </li>
                </ul>
                <div className="mt-auto">
                  <Link
                    href="/nursing-services"
                    className="inline-flex items-center text-sky-500 hover:text-sky-600 bg-orange-100 py-2 px-4 rounded-lg transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-sky-500"
                    aria-label="Learn about our nursing services"
                  >
                    Learn More <ChevronRight className="ml-1 h-5 w-5" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </article>

            {/* Card 3 - Care Support Services */}
            <article className="bg-sky-800 rounded-2xl overflow-hidden shadow-xl transform transition-all hover:scale-105 border-b-4 border-orange-500 h-full">
              <div className="p-8 h-full flex flex-col">
                <header className="flex items-center mb-4">
                  <Users className="text-sky-300 mr-3 h-6 w-6" aria-hidden="true" />
                  <h2 id="care-heading" className="text-3xl font-bold text-sky-300">Care Support Services</h2>
                </header>
                <h3 className="text-2xl font-semibold text-white mb-6">
                  Compassionate Personal Care
                </h3>
                <ul className="space-y-4 mb-8" aria-labelledby="care-heading">
                  <li className="flex items-start">
                    <Heart className="h-6 w-6 text-orange-400 mr-3 flex-shrink-0 mt-1" aria-hidden="true" />
                    <span className="text-sky-100">
                      Personal care including bathing, dressing, and toileting assistance
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Heart className="h-6 w-6 text-orange-400 mr-3 flex-shrink-0 mt-1" aria-hidden="true" />
                    <span className="text-sky-100">
                      Medication prompting and monitoring
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Heart className="h-6 w-6 text-orange-400 mr-3 flex-shrink-0 mt-1" aria-hidden="true" />
                    <span className="text-sky-100">
                      Companionship and emotional support
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Heart className="h-6 w-6 text-orange-400 mr-3 flex-shrink-0 mt-1" aria-hidden="true" />
                    <span className="text-sky-100">
                      Meal preparation and household assistance
                    </span>
                  </li>
                </ul>
                <div className="mt-auto">
                  <Link
                    href="/care-services"
                    className="inline-flex items-center bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-orange-300"
                    aria-label="Learn more about our care support services"
                  >
                    Get Started <ChevronRight className="ml-1 h-5 w-5" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </article>
          </div>

          {/* Services By Setting Section */}
          <section className="mt-16 bg-white rounded-2xl shadow-xl p-8">
            <header className="text-center mb-10">
              <h2 className="text-3xl font-bold text-sky-600">Services By Setting</h2>
              <p className="text-sky-700 mt-2">Quality healthcare professionals available wherever you need them</p>
            </header>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Setting 1 - Home Care */}
              <div className="border-l-4 border-orange-500 pl-4">
                <div className="flex items-center mb-3">
                  <Home className="h-6 w-6 text-sky-500 mr-2" />
                  <h3 className="text-xl font-bold text-sky-600">Home Care</h3>
                </div>
                <p className="text-sky-700 mb-4">Professional support delivered in the comfort of your own home:</p>
                <ul className="text-sky-700 space-y-2 list-disc pl-5">
                  <li>Daily living assistance and personal care</li>
                  <li>Post-hospital discharge support</li>
                  <li>Respite care for family caregivers</li>
                  <li>Specialized dementia and end-of-life care</li>
                </ul>
              </div>
              
              {/* Setting 2 - Care Homes */}
              <div className="border-l-4 border-orange-500 pl-4">
                <div className="flex items-center mb-3">
                  <Briefcase className="h-6 w-6 text-sky-500 mr-2" />
                  <h3 className="text-xl font-bold text-sky-600">Care Homes</h3>
                </div>
                <p className="text-sky-700 mb-4">Skilled professionals to support residential care settings:</p>
                <ul className="text-sky-700 space-y-2 list-disc pl-5">
                  <li>Staff coverage for unexpected absences</li>
                  <li>Specialized nurses for complex care needs</li>
                  <li>Social workers for resident assessments</li>
                  <li>Activity coordinators and wellbeing specialists</li>
                </ul>
              </div>
              
              {/* Setting 3 - Hospitals & NHS */}
              <div className="border-l-4 border-orange-500 pl-4">
                <div className="flex items-center mb-3">
                  <Heart className="h-6 w-6 text-sky-500 mr-2" />
                  <h3 className="text-xl font-bold text-sky-600">Hospitals & NHS</h3>
                </div>
                <p className="text-sky-700 mb-4">Supporting healthcare institutions across the UK:</p>
                <ul className="text-sky-700 space-y-2 list-disc pl-5">
                  <li>Bank and agency nurses for all departments</li>
                  <li>Hospital discharge social workers</li>
                  <li>Mental health professionals for psychiatric units</li>
                  <li>Healthcare assistants for ward support</li>
                </ul>
              </div>
            </div>
          </section>

          {/* How It Works Section */}
          <section className="mt-16 bg-gradient-to-br from-sky-900 to-sky-800 rounded-2xl shadow-xl p-8 text-white">
            <header className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white">How Our Platform Works</h2>
              <p className="text-sky-200 mt-2">Finding the right healthcare professional is quick and simple</p>
            </header>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Step 1 */}
              <div className="text-center">
                <div className="bg-orange-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UserPlus className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-orange-300 mb-2">Register</h3>
                <p className="text-sky-200">Create your account as a client or healthcare facility</p>
              </div>
              
              {/* Step 2 */}
              <div className="text-center">
                <div className="bg-orange-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-orange-300 mb-2">Search</h3>
                <p className="text-sky-200">Search verified professionals in your location</p>
              </div>
              
              {/* Step 3 */}
              <div className="text-center">
                <div className="bg-orange-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-orange-300 mb-2">Review Matches</h3>
                <p className="text-sky-200">Browse verified professionals matching your criteria</p>
              </div>
              
              {/* Step 4 */}
              <div className="text-center">
                <div className="bg-orange-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-orange-300 mb-2">Book & Confirm</h3>
                <p className="text-sky-200">Schedule shifts or long-term placements securely</p>
              </div>
            </div>
            
            <div className="mt-10 text-center">
              <Link
                href="/register"
                className="inline-flex items-center bg-orange-500 text-white py-3 px-6 rounded-lg hover:bg-orange-600 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-orange-300 text-lg"
              >
                Find Healthcare Professionals Today <ChevronRight className="ml-2 h-5 w-5" aria-hidden="true" />
              </Link>
            </div>
          </section>

          {/* Structured data for SEO */}
          <script type="application/ld+json" dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              "name": "Shiftly UK Healthcare Services",
              "description": "Connecting qualified healthcare professionals with clients and organizations across the UK",
              "provider": {
                "@type": "Organization",
                "name": "Shiftly UK",
                "url": "https://shiftly.uk"
              },
              "serviceType": ["Healthcare Staffing", "Social Care", "Nursing Services"],
              "areaServed": {
                "@type": "Country",
                "name": "United Kingdom"
              }
            })
          }} />
        </div>
      </main>
    </>
  );
};

export default Services;