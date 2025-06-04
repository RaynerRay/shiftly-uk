"use server";

import WelcomeEmail from "@/components/Emails/welcome-email";
import { prismaClient } from "@/lib/db";
import { generateTrackingNumber } from "@/lib/generateTracking";
import { ClientProfileFormProps } from "@/types/types";
import { Resend } from "resend";


export async function createClientProfile(formData: ClientProfileFormProps) {
  const {
    name,
    companyNumber,
    cqcNumber,
    organisationType,
    companyLogo,
    bio,
    email,
    website,
    phone,
    city,
    address,
    employersLiability,
    userId,
  } = formData;

  try {
    // Generate a unique tracking number
    const trackingNumber = generateTrackingNumber();

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
      existingProfile = await prismaClient.clientProfile.findUnique({
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
      const updatedProfile = await prismaClient.clientProfile.update({
        where: {
          userId,
        },
        data: {
          name,
          companyNumber,
          cqcNumber,
          organisationType,
          companyLogo,
          bio,
          email,
          website,
          phone,
          city,
          address,
          employersLiability: employersLiability || [],
        },
      });

      return {
        data: updatedProfile,
        status: 201,
        error: null,
      };
    }

    // If no profile exists, create a new one
    const newProfile = await prismaClient.clientProfile.create({
      data: {
        name,
        companyNumber: companyNumber || null,
        cqcNumber: cqcNumber || null,
        organisationType: organisationType || null,
        companyLogo: companyLogo || null,
        bio: bio || null,
        email: email || null,
        website: website || null,
        phone: phone || null,
        city: city || null,
        address: address || null,
        employersLiability: employersLiability || [],
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
    console.log("Error creating client profile:", error);
    return {
      data: null,
      status: 500,
      error: "Something went wrong while creating the client profile",
    };
  }
}

export async function updateClientProfile(id: string | undefined, data: any) {
  if (!id || id.trim() === '') {
    return {
      data: null,
      status: 400,
      error: "Invalid profile ID provided",
    };
  }

  try {
    const updatedProfile = await prismaClient.clientProfile.update({
      where: {
        id,
      },
      data,
    });

    return {
      data: updatedProfile,
      status: 201,
      error: null,
    };
  } catch (error) {
    console.log("Error updating client profile:", error);
    return {
      data: null,
      status: 500,
      error: "Profile was not updated",
    };
  }
}



export async function completeClientProfile(id: string | undefined, data: any) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  
  if (id) {
    try {
      const existingProfile = await prismaClient.clientProfile.findUnique({
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

      // Send a welcome email
      // const name = existingProfile.name;
      const email = existingProfile.email;
      
      if (email) {
        const previewText = "Welcome to Shiftly UK";
        const message =
          "Thanks for joining Shiftly UK as a client — we look forward to providing you with our services! If you have any questions, feel free to WhatsApp us at +44 794 763 7714.";
        
        await resend.emails.send({
          from: "Shiftly <noreply@shiftly.uk>",
          to: email,
          subject: "Welcome to Shiftly UK",
          react: WelcomeEmail({  previewText, message }),
        });
      }
      
      // Update the profile status to ACTIVE or as needed
      const updatedProfile = await prismaClient.clientProfile.update({
        where: {
          id,
        },
        data: {
          ...data,
        },
      });
      
      return {
        data: updatedProfile,
        status: 201,
        error: null,
      };
    } catch (error) {
      console.log(error);
      return {
        data: null,
        status: 500,
        error: "Profile was not updated",
      };
    }
  }
}

export async function getClientProfileById(userId: string ) {
  if (userId) {
    try {
      const profile = await prismaClient.clientProfile.findUnique({
        where: {
          userId,
        },
      });
      
      return {
        data: profile,
        status: 200,
        error: null,
      };
    } catch (error) {
      console.log(error);
      return {
        data: null,
        status: 500,
        error: "Profile was not fetched",
      };
    }
  }
}

export async function getClientProfileByTrackingNumber(trackingNumber: string) {
  if (trackingNumber) {
    try {
      const profile = await prismaClient.clientProfile.findUnique({
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
      console.log(error);
      return {
        data: null,
        status: 500,
        error: "Profile was not fetched",
      };
    }
  }
}