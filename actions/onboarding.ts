"use server";

import WelcomeEmail from "@/components/Emails/welcome-email";
import { prismaClient } from "@/lib/db";
import { Resend } from "resend";

export async function createDoctorProfile(formData: any) {
  const {
    dob,
    firstName,
    gender,
    lastName,
    middleName,
    page,
    trackingNumber,
    userId,
    phone,
    email,
  } = formData;

  try {
    // First check if a profile already exists for this user
    const existingProfile = await prismaClient.doctorProfile.findUnique({
      where: {
        userId,
      },
    });

    if (existingProfile) {
      // If profile exists, update it instead of creating a new one
      const updatedProfile = await prismaClient.doctorProfile.update({
        where: {
          userId,
        },
        data: {
          dob,
          firstName,
          gender,
          lastName,
          middleName,
          page,
          trackingNumber,
          phone,
          email,
        },
      });

      return {
        data: updatedProfile,
        status: 201,
        error: null,
      };
    }

    // If no profile exists, create a new one
    const newProfile = await prismaClient.doctorProfile.create({
      data: {
        dob,
        firstName,
        gender,
        lastName,
        middleName,
        page,
        trackingNumber,
        userId,
        phone,
        email,
      },
    });

    return {
      data: newProfile,
      status: 201,
      error: null,
    };
  } catch (error) {
    console.log(error);
    return {
      data: null,
      status: 500,
      error: "Something went wrong",
    };
  }
}
export async function createAvailability(data: any) {
  try {
    const newAvail = await prismaClient.availability.create({
      data,
    });
    console.log(newAvail);
    return newAvail;
  } catch (error) {
    console.log(error);
    return {
      data: null,
      status: 500,
      error: "Something went wrong",
    };
  }
}

export async function updateDoctorProfile(id: string | undefined, data: any) {
  if (id) {
    try {
      const updatedProfile = await prismaClient.doctorProfile.update({
        where: {
          id,
        },
        data,
      });
      console.log(updatedProfile);
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
export async function updateAvailabilityById(
  id: string | undefined,
  data: any
) {
  if (id) {
    try {
      const updatedAva = await prismaClient.availability.update({
        where: {
          id,
        },
        data,
      });
      console.log(updatedAva);
      return {
        data: updatedAva,
        status: 201,
        error: null,
      };
    } catch (error) {
      console.log(error);
      return {
        data: null,
        status: 500,
        error: "Availability was not updated",
      };
    }
  }
}

export async function getApplicationByTrack(trackingNumber: string) {
  if (trackingNumber) {
    try {
      const existingProfile = await prismaClient.doctorProfile.findUnique({
        where: {
          trackingNumber,
        },
      });
      if (!existingProfile) {
        return {
          data: null,
          status: 404,
          error: "Wrong Tracking Number",
        };
      }
      return {
        data: existingProfile,
        status: 200,
        error: null,
      };
    } catch (error) {
      console.log(error);
      return {
        data: null,
        status: 500,
        error: "Something Went wrong",
      };
    }
  }
}

export async function completeProfile(id: string | undefined, data: any) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  if (id) {
    try {
      const existingProfile = await prismaClient.doctorProfile.findUnique({
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

      //send a welcome email
      const firstName = existingProfile.firstName;
      const email = existingProfile.email as string;
      const previewText = "Welcome to Shiftly UK ";
      const message =
        "Thanks for joining Shiftly UK — we are excited to have you onboard! If you have any questions, feel free to WhatsApp us at +44 794 763 7714.";
      const sendMail = await resend.emails.send({
        from: "Shiftly <noreply@shiftly.uk>",
        to: email,
        subject: "Welcome to Shiftly UK",
        react: WelcomeEmail({ firstName, previewText, message }),
      });
      const updatedProfile = await prismaClient.doctorProfile.update({
        where: {
          id,
        },
        data,
      });
      console.log(updatedProfile);
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
export async function getDoctorProfileById(userId: string | undefined) {
  if (userId) {
    try {
      const profile = await prismaClient.doctorProfile.findUnique({
        where: {
          userId,
        },
        include: {
          availability: true,
        },
      });
      // console.log(profile);
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
