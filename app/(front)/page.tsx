
import Head from "next/head";
// import { getDoctors } from "@/actions/users";
import React from "react";
import Hero from "@/components/frontend/Hero";
// import LogoClouds from "@/components/frontend/LogoClouds";
// import Banner from "@/components/frontend/Banner";
import CareServices from "@/components/Home/CareServices";
import Media from "@/components/Home/Media";
import FAQ from "@/components/Home/FAQ";

export default async function Home() {
  return (
    <>
      <Head>
        <title>
          Shiftly | Connect with Trusted Healthcare Professionals for Extra
          Shifts & Staffing
        </title>
        <meta
          name="description"
          content="Shiftly connects care workers, nurses, and social workers with private clients, the NHS, and councils across the UK. Find extra shifts or hire trusted healthcare staff easily."
        />
        <meta
          name="keywords"
          content="Shiftly, healthcare workers, extra shifts, care workers, nurses, social workers, healthcare marketplace, medical staffing"
        />
        {/* Open Graph / Facebook  */}
        <meta
          property="og:title"
          content="Shiftly | Home - Instant Staffing for UK Healthcare Providers"
        />
        <meta
          property="og:description"
          content="Discover extra shift opportunities and trusted healthcare staffing solutions on Shiftly."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.shiftly.uk" />
        <meta
          property="og:image"
          content="https://www.shiftly.uk/images/og-image.jpg"
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Shiftly | Home - Instant Staffing for UK Healthcare Providers"
        />
        <meta
          name="twitter:description"
          content="Shiftly connects healthcare professionals with extra shift opportunities and helps clients find trusted staff."
        />
        <meta
          name="twitter:image"
          content="https://www.shiftly.uk/images/twitter-image.jpg"
        />
      </Head>
      <section className="">
        <Hero />

        {/* <LogoClouds /> */}
        <CareServices />
        <Media />
        <FAQ />
      </section>
    </>
  );
}
