// This is a server component (no need for "use client" here)

import { getDoctorsBySearch } from "@/actions/doctors";
import { getClientProfileById } from "@/actions/clientonboarding";
import { getIndividualClientProfileById } from "@/actions/individualclient"; // Add this import
import DoctorsListWithPagination from "@/components/DoctorsListWithPagination";
import { separateAndCapitalise } from "@/lib/utils";
import { Doctor } from "@/types/types";
import Adverts from "@/components/frontend/Adverts";
import SearchBarSP from '@/components/frontend/SearchBarSP';
import { getServerSession } from "next-auth/next";
import Link from "next/link";
import { authOptions } from "@/lib/auth";

export default async function SearchPage(props: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
  // Get the user's session
  const session = await getServerSession(authOptions);
  
  // Check if user is authenticated
  if (!session?.user) {
    return (
      <div className="container max-w-7xl mx-auto px-4 py-16">
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Access Restricted</h1>
          <p className="text-gray-700 mb-6">
            Please log in to access our database of professionals.
          </p>

          <div className="flex gap-6 justify-center">
            <Link 
              href="/login" 
              className="inline-block bg-sky-600 hover:bg-sky-700 text-white font-medium py-2 px-6 rounded-full transition-colors"
            >
              Login
            </Link>
            <Link 
              href="/register" 
              className="inline-block bg-sky-600 hover:bg-sky-700 text-white font-medium py-2 px-6 rounded-full transition-colors"
            >
              Register Now
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // For CLIENT and INDIVIDUALCLIENT roles, check approval status
  let isApproved = false;
  let clientProfile = null;
  
  if (session.user.role === "CLIENT") {
    const profileResponse = await getClientProfileById(session.user.id);
    console.log(profileResponse)
    clientProfile = profileResponse?.data;
    isApproved = clientProfile?.status === "APPROVED";
  } else if (session.user.role === "INDIVIDUALCLIENT") {
    const profileResponse = await getIndividualClientProfileById(session.user.id);
    clientProfile = profileResponse?.data;
    console.log(profileResponse)
    isApproved = clientProfile?.status === "APPROVED";
  }
  
  // Check if user is authorized (ADMIN always authorized, clients need approval)
  const isAuthorized = session.user.role === "ADMIN" || 
    ((session.user.role === "CLIENT" || session.user.role === "INDIVIDUALCLIENT") && isApproved);

  // If not authorized, show the appropriate message based on user status
  if (!session?.user) {
    // User is not logged in
    return (
      <div className="container max-w-7xl mx-auto px-4 py-16">
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Access Restricted</h1>
          <p className="text-gray-700 mb-6">
            Please log in to access our database of professionals.
          </p>

          <div className="flex gap-6 justify-center">
            <Link 
              href="/login" 
              className="inline-block bg-sky-600 hover:bg-sky-700 text-white font-medium py-2 px-6 rounded-full transition-colors"
            >
              Login
            </Link>
            <Link 
              href="/register" 
              className="inline-block bg-sky-600 hover:bg-sky-700 text-white font-medium py-2 px-6 rounded-full transition-colors"
            >
              Register Now
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthorized) {
    // User is logged in but doesn't have the right role or approval status
    const isClientRole = session.user.role === "CLIENT" || session.user.role === "INDIVIDUALCLIENT";
    const isPendingApproval = isClientRole && !isApproved;
    
    return (
      <div className="container max-w-7xl mx-auto px-4 py-16">
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <h1 className="text-2xl font-bold mb-4">
            {isPendingApproval ? "Account Pending Approval" : "Access Restricted"}
          </h1>
          <p className="text-gray-700 mb-6">
            {isPendingApproval 
              ? "Your account is currently under review. You'll be able to access our database of professionals once your account is approved."
              : "Only approved clients can access our database of professionals."
            }
          </p>

          {!isPendingApproval && (
            <div className="flex gap-6 justify-center">
              <Link 
                href="/register" 
                className="inline-block bg-sky-600 hover:bg-sky-700 text-white font-medium py-2 px-6 rounded-full transition-colors"
              >
                Register as Client
              </Link>
            </div>
          )}
        </div>
      </div>
    );
  }
  
  // Extract search parameters from props and await them
  const searchParams = await props.searchParams || {};
  
  // Ensure city and profession have default values to prevent errors
  const city = searchParams.city || "";
  const profession = searchParams.profession || "";
    
  try {
    // Fetch doctor data based on city and profession
    const data = await getDoctorsBySearch(city, profession);
    
    // Safely handle potential null/undefined response
    const doctors: Doctor[] = data?.doctors?.map(doc => ({
      id: doc.id || "",
      name: `${doc.firstName || ""} ${doc.lastName || ""}`.trim(),
      email: doc.email || '',
      phone: doc.phone || '',
      slug: doc.slug || "",
      doctorProfile: {
        firstName: doc.firstName || "",
        lastName: doc.lastName || "",
        // Add other relevant fields from doc with non-null fallbacks
        gender: doc.doctorProfile?.gender || null,
        profession: doc.doctorProfile?.profession || null,
        bio: doc.doctorProfile?.bio || null,
        profilePicture: doc.doctorProfile?.profilePicture || null,
        hourlyWage: doc.doctorProfile?.hourlyWage || 0,
        availability: doc.doctorProfile?.availability || null
      }
    })) || [];

    // Format search parameters for display
    const formattedProfession = profession ? separateAndCapitalise(profession) : "";
    const formattedCity = city ? separateAndCapitalise(city) : "";
        
    return (
      <div className="container max-w-7xl mx-auto px-4 py-8">
        {/* Search */}
        <div className="mb-8">
          <SearchBarSP />
        </div>
          
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-2">
          {/* Sidebar - Left Column on Desktop */}
          <div className="lg:col-span-1 order-1">
            {/* Advertisements - Only visible on desktop */}
            <div className="hidden lg:block">
              <Adverts />
            </div>
          </div>
            
          {/* Main Content - Right Column on Desktop, Middle on Mobile */}
          <div className="lg:col-span-5 order-2">
            {/* Doctor Results with pagination */}
            <div className="bg-white rounded-lg shadow p-4">
              {doctors && doctors.length > 0 ? (
                <>
                  <h1 className="text-2xl font-bold mb-6">
                    {formattedCity && formattedProfession
                      ? `Results for ${formattedProfession}s in ${formattedCity}`
                      : formattedCity
                      ? `Professionals in ${formattedCity}`
                      : formattedProfession
                      ? `${formattedProfession}s`
                      : "All professionals"}
                  </h1>
                  {/* Pass fetched doctors data to client-side pagination component */}
                  <DoctorsListWithPagination doctors={doctors} />
                </>
              ) : (
                <div className="text-center py-10">
                  <h2 className="text-xl font-semibold mb-4">
                    {formattedCity && formattedProfession
                      ? `No results found for ${formattedProfession}s in ${formattedCity}.`
                      : formattedCity
                      ? `No professionals found in ${formattedCity}.`
                      : formattedProfession
                      ? `No ${formattedProfession} professionals found.`
                      : "No professionals found."}
                  </h2>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Advertisements - Only visible on mobile, at the bottom */}
        <div className="mt-8 lg:hidden">
          <Adverts />
        </div>
      </div>
    );
  } catch (error) {
    // Handle any errors during fetch or data processing
    console.error("Error fetching doctors:", error);
    
    return (
      <div className="container max-w-7xl mx-auto px-4 py-8">
        {/* Search */}
        <div className="mb-8">
          <SearchBarSP />
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-center py-10">
            <h2 className="text-xl font-semibold mb-4">
              Unable to load results. Please try your search again.
            </h2>
          </div>
        </div>
        
        {/* Advertisements - Mobile view */}
        <div className="mt-8">
          <Adverts />
        </div>
      </div>
    );
  }
}