"use server";

import WelcomeEmail from "@/components/Emails/welcome-email";
import { prismaClient } from "@/lib/db";
import { Resend } from "resend";
import { generateTrackingNumber } from "@/lib/generateTracking";
import { IndividualClientFormProps } from "@/types/types";

export async function createIndividualClientProfile(formData: IndividualClientFormProps) {
  const {
    fullName,
    email,
    phone,
    address,
    nextOfKinName,
    nextOfKinNumber,
    proofOfAddress,
    userId,
  } = formData;

  try {
    // Validate that userId is not empty or undefined
    if (!userId || userId.trim() === '') {
      return {
        data: null,
        status: 400,
        error: "Invalid user ID provided",
      };
    }

    // First check if a profile already exists for this user
    let existingProfile = null;
    try {
      existingProfile = await prismaClient.individualClientProfile.findUnique({
        where: {
          userId,
        },
      });
    } catch (error) {
      console.log("Error finding existing profile:", error);
      // Continue execution even if find fails
    }

    if (existingProfile) {
      // If profile exists, update it instead of creating a new one
      const updatedProfile = await prismaClient.individualClientProfile.update({
        where: {
          userId,
        },
        data: {
          fullName,
          email,
          phone,
          address,
          nextOfKinName,
          nextOfKinNumber,
          proofOfAddress: proofOfAddress || [],
        },
      });

      return {
        data: updatedProfile,
        status: 200, // Changed from 201 to 200 for updates
        error: null,
      };
    }

    // Generate a unique tracking number for new profiles only
    const trackingNumber = generateTrackingNumber();

    // If no profile exists, create a new one
    const newProfile = await prismaClient.individualClientProfile.create({
      data: {
        fullName,
        email,
        phone,
        address: address || "",
        nextOfKinName: nextOfKinName || "",
        nextOfKinNumber: nextOfKinNumber || "",
        proofOfAddress: proofOfAddress || [],
        userId,
        trackingNumber,
      },
    });

    return {
      data: newProfile,
      status: 201,
      error: null,
    };
  } catch (error) {
    console.error("Error creating individual client profile:", error);
    return {
      data: null,
      status: 500,
      error: "Something went wrong while creating the individual client profile",
    };
  }
}
export async function getIndividualClientProfileById(userId: string | undefined) {
  if (!userId || userId.trim() === '') {
    return {
      data: null,
      status: 400,
      error: "Invalid user ID provided",
    };
  }

  try {
    const profile = await prismaClient.individualClientProfile.findUnique({
      where: {
        userId,
      },
    });
    
    if (!profile) {
      return {
        data: null,
        status: 404,
        error: "Profile not found",
      };
    }
    
    return {
      data: profile,
      status: 200,
      error: null,
    };
  } catch (error) {
    console.error("Error fetching individual client profile:", error);
    return {
      data: null,
      status: 500,
      error: "Profile was not fetched",
    };
  }
}



export async function updateIndividualClientProfile(
  profileId: string, 
  formData: IndividualClientFormProps
) {
  try {
    console.log("Updating individual profile with ID:", profileId);
    console.log("Update data:", formData);

    // Validate inputs
    if (!profileId || profileId.trim() === '') {
      return {
        data: null,
        status: 400,
        error: "Invalid profile ID provided",
      };
    }

    // Update the profile
    const updatedProfile = await prismaClient.individualClientProfile.update({
      where: {
        id: profileId,
      },
      data: {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        nextOfKinName: formData.nextOfKinName,
        nextOfKinNumber: formData.nextOfKinNumber,
        proofOfAddress: formData.proofOfAddress || [],
      },
    });

    console.log("Successfully updated individual profile:", updatedProfile.id);
    return {
      data: updatedProfile,
      status: 201,
      error: null,
    };
  } catch (error) {
    console.error("Error in updateIndividualClientProfile:", error);
    return {
      data: null,
      status: 500,
      error: "Something went wrong while updating individual client profile",
    };
  }
}
export async function completeIndividualClientProfile(id: string | undefined, data: any) {
  if (!id || id.trim() === '') {
    return {
      data: null,
      status: 400,
      error: "Invalid profile ID provided",
    };
  }

  try {
    const existingProfile = await prismaClient.individualClientProfile.findUnique({
      where: {
        id,
      },
    });
    
    if (!existingProfile) {
      return {
        data: null,
        status: 404,
        error: "Profile Not Found",
      };
    }

    // Update the profile first
    const updatedProfile = await prismaClient.individualClientProfile.update({
      where: {
        id,
      },
      data,
    });

    // Send a welcome email if email exists
    if (existingProfile.email) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        const email = existingProfile.email;
        const previewText = "Welcome to Shiftly UK";
        const message =
          "Thanks for joining Shiftly UK as a client — we look forward to providing you with our services! If you have any questions, feel free to WhatsApp us at +44 794 763 7714.";
        
        await resend.emails.send({
          from: "Shiftly <noreply@shiftly.uk>",
          to: email,
          subject: "Welcome to Shiftly UK",
          react: WelcomeEmail({ previewText, message }),
        });
      } catch (emailError) {
        console.error("Error sending welcome email:", emailError);
        // Continue even if email fails - don't block profile update
      }
    }
    
    return {
      data: updatedProfile,
      status: 200, // Changed from 201 to 200 for updates
      error: null,
    };
  } catch (error) {
    console.error("Error completing individual client profile:", error);
    return {
      data: null,
      status: 500,
      error: "Profile was not updated",
    };
  }
}



export async function getIndividualClientProfileByTrackingNumber(trackingNumber: string | undefined) {
  if (!trackingNumber || trackingNumber.trim() === '') {
    return {
      data: null,
      status: 400,
      error: "Invalid tracking number provided",
    };
  }

  try {
    const profile = await prismaClient.individualClientProfile.findUnique({
      where: {
        trackingNumber,
      },
    });
    
    if (!profile) {
      return {
        data: null,
        status: 404,
        error: "Invalid tracking number",
      };
    }
    
    return {
      data: profile,
      status: 200,
      error: null,
    };
  } catch (error) {
    console.error("Error fetching individual client profile by tracking number:", error);
    return {
      data: null,
      status: 500,
      error: "Profile was not fetched",
    };
  }
}