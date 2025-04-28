import Head from "next/head";

import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import React, { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default async function Layout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions);
  return (
    <div>
        <Head>
        <title>Shiftly | Connecting healthcare professionals with extra shift opportunities and linking clients with trusted staff.</title>
        <meta
          name="description"
          content="Shiftly connects healthcare professionals looking for extra shifts with clients seeking reliable, experienced professionals."
        />
        <meta
          name="keywords"
          content="Shiftly, healthcare workers, extra shifts, healthcare marketplace, medical staffing, healthcare jobs"
        />
        {/* Open Graph / Facebook */}
        <meta property="og:title" content="Shiftly | Healthcare" />
        <meta
          property="og:description"
          content="Connecting healthcare professionals with opportunities for extra shifts and helping clients find trusted medical staff."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.shiftly.uk" />
        <meta property="og:image" content="/images/og-image.jpg" /> {/* Update with your image path */}
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Shiftly | Healthcare" />
        <meta
          name="twitter:description"
          content="Connecting healthcare professionals with extra shift opportunities and linking clients with trusted staff."
        />
        <meta name="twitter:image" content="/images/twitter-image.jpg" /> {/* Update with your image path */}
      </Head>
     
      <Navbar 
      session={session}
       />
      {children}
      <Footer />
    </div>
  );
}
