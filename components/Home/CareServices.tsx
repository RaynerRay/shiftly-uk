import React from "react";
import { ChevronRight, Heart, Users, Home, BookOpen, Star } from "lucide-react";
import Head from "next/head";
import Link from "next/link";

const CareServices = () => {
  // SEO metadata
  const pageTitle = "Care Services & Staffing Solutions | Shiftly";
  const pageDescription = "Shiftly provides high-quality care services and healthcare staffing solutions with verified professionals for care homes and individuals needing home care.";
  const keywords = "healthcare staffing, care services, home care, healthcare professionals, care providers";

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
        <meta property="og:url" content="https://shiftly.uk/care-services" />
        <meta property="og:image" content="https://shiftly.uk/images/care-services-og.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <link rel="canonical" href="https://shiftly.uk/care-services" />
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
              Care services and staffing solutions
            </h1>
            <p className="text-sky-700 max-w-4xl mx-auto text-lg">
              At the heart of what we do is a commitment to people. We partner
              with care providers by supplying experienced carers, nurses, and
              social workers who enhance and uphold the quality of care in every
              setting. We also offer home care
              services—empowering individuals to live with dignity,
              independence, and comfort in their own homes. Whether in a care
              facility or at home, our focus remains the same: dependable,
              compassionate care designed around each person&aposs unique needs.
            </p>
          </section>

          {/* Cards Container - Using semantic HTML with proper roles */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 - Why Choose Shiftly? */}
            <article className="bg-sky-900 rounded-2xl overflow-hidden shadow-xl transform transition-all hover:scale-105 border-t-4 border-orange-500 h-full">
              <div className="p-8 h-full flex flex-col">
                <header className="flex items-center mb-4">
                  <Users className="text-sky-300 mr-3 h-6 w-6" aria-hidden="true" />
                  <h2 id="why-choose-heading" className="text-3xl font-bold text-sky-300">Why Choose Shiftly?</h2>
                </header>
                <h3 className="text-2xl font-semibold text-white mb-6">
                  Simplifying Healthcare Staffing
                </h3>
                <ul className="space-y-4 text-sky-100 mb-8" aria-labelledby="why-choose-heading">
                  <li>✅ <span>Verified professionals rigorously vetted for quality</span></li>
                  <li>⚡ <span>Instant connections between shifts and workers</span></li>
                  <li>🛠️ <span>A streamlined platform built for speed and ease</span></li>
                </ul>
                <div className="mt-auto">
                  <Link
                    href="/howitworks"
                    className="inline-flex items-center text-orange-400 hover:text-orange-300 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-orange-300 focus:ring-offset-2 focus:ring-offset-sky-900 rounded-md px-2 py-1"
                    aria-label="Learn more about why to choose Shiftly"
                  >
                    Find out more <ChevronRight className="ml-1 h-5 w-5" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </article>

            {/* Card 2 - How It Works */}
            <article className="bg-white rounded-2xl overflow-hidden shadow-xl transform transition-all hover:scale-105 relative h-full">
              <div className="absolute top-0 right-0 bg-orange-500 text-white py-1 px-4 rounded-bl-lg text-sm font-medium">
                Quick Start
              </div>
              <div className="p-8 h-full flex flex-col">
                <header className="flex items-center mb-4">
                  <Home className="text-sky-500 mr-3 h-6 w-6" aria-hidden="true" />
                  <h2 id="how-it-works-heading" className="text-3xl font-bold text-sky-500">How It Works</h2>
                </header>
                <p className="text-sky-700 mb-6">
                  Getting started on Shiftly is fast and effortless:
                </p>
                <ol className="space-y-2 mb-8 list-decimal pl-8" aria-labelledby="how-it-works-heading">
                  <li className="text-sky-700">
                    Create an account and complete your profile
                  </li>
                  <li className="text-sky-700">
                    Providers search for professionals
                  </li>
                  <li className="text-sky-700">
                    Professionals can accept shifts matching their availability
                  </li>
                </ol>
                <div className="mt-auto">
                  <Link
                    href="/join/professionals"
                    className="inline-flex items-center text-sky-500 hover:text-sky-600 bg-orange-100 py-2 px-4 rounded-lg transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-sky-500"
                    aria-label="Get started with Shiftly"
                  >
                    Get Started <ChevronRight className="ml-1 h-5 w-5" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </article>

            {/* Card 3 - Our Commitment */}
            <article className="bg-sky-800 rounded-2xl overflow-hidden shadow-xl transform transition-all hover:scale-105 border-b-4 border-orange-500 h-full">
              <div className="p-8 h-full flex flex-col">
                <header className="flex items-center mb-4">
                  <BookOpen className="text-sky-300 mr-3 h-6 w-6" aria-hidden="true" />
                  <h2 id="commitment-heading" className="text-3xl font-bold text-sky-300">Our Commitment</h2>
                </header>
                <h3 className="text-2xl font-semibold text-white mb-6">
                  Trust. Quality. Efficiency.
                </h3>
                <ul className="space-y-4 mb-8" aria-labelledby="commitment-heading">
                  <li className="flex items-start">
                    <Heart className="h-6 w-6 text-orange-400 mr-3 flex-shrink-0 mt-1" aria-hidden="true" />
                    <span className="text-sky-100">
                      Consistently provide verified, skilled professionals for every shift
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Heart className="h-6 w-6 text-orange-400 mr-3 flex-shrink-0 mt-1" aria-hidden="true" />
                    <span className="text-sky-100">
                      Save valuable time and resources through smart hiring tools
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Heart className="h-6 w-6 text-orange-400 mr-3 flex-shrink-0 mt-1" aria-hidden="true" />
                    <span className="text-sky-100">
                      Foster long-term trust between providers and professionals
                    </span>
                  </li>
                </ul>
                <div className="mt-auto">
                  {/* <a
                    href="/our-commitment"
                    className="inline-flex items-center bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-orange-300"
                    aria-label="Learn more about our commitment"
                  >
                    Learn More <ChevronRight className="ml-1 h-5 w-5" aria-hidden="true" />
                  </a> */}
                </div>
              </div>
            </article>
          </div>

          {/* Structured data for SEO */}
          <script type="application/ld+json" dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              "name": "Shiftly Care Services",
              "description": "High-quality care services and healthcare staffing solutions with verified professionals",
              "provider": {
                "@type": "Organization",
                "name": "Shiftly",
                "url": "https://yshiftly.uk"
              },
              "serviceType": ["Healthcare Staffing", "Home Care"],
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

export default CareServices;