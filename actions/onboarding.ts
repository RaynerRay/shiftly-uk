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

export async function createClientProfile(formData: any) {
  const {
    name,
    trackingNumber,
    userId,
    phone,
    email,
  } = formData;

  try {
    // First check if a profile already exists for this user
    const existingProfile = await prismaClient.clientProfile.findUnique({
      where: {
        userId,
      },
    });

    if (existingProfile) {
      // If profile exists, update it instead of creating a new one
      const updatedProfile = await prismaClient.clientProfile.update({
        where: {
          userId,
        },
        data: {
          name,
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
    const newProfile = await prismaClient.clientProfile.create({
      data: {
        name,
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

export async function createIndividualClientProfile(formData: any) {
  const {
    name,
    trackingNumber,
    userId,
    phone,
    email,
  } = formData;

  try {
    // Validate inputs
    if (!userId || userId.trim() === '') {
      return {
        data: null,
        status: 400,
        error: "Invalid user ID provided",
      };
    }

    console.log("Creating individual profile with data:", {
      name,
      trackingNumber,
      userId,
      phone,
      email
    });

    // First check if a profile already exists for this user
    let existingProfile = null;
    try {
      existingProfile = await prismaClient.individualClientProfile.findUnique({
        where: {
          userId,
        },
      });
    } catch (findError) {
      console.error("Error finding existing individual profile:", findError);
      // Continue execution even if find fails
    }

    if (existingProfile) {
      console.log("Found existing profile, updating it");
      // If profile exists, update it instead of creating a new one
      const updatedProfile = await prismaClient.individualClientProfile.update({
        where: {
          userId,
        },
        data: {
          fullName: name,
          trackingNumber,
          phone,
          email,
        },
      });

      return {
        data: updatedProfile,
        status: 200,
        error: null,
      };
    }

    console.log("No existing profile found, creating new one");
    // If no profile exists, create a new one
    const newProfile = await prismaClient.individualClientProfile.create({
      data: {
        fullName: name,
        trackingNumber,
        userId,
        phone: phone || "",
        email,
        // Required fields with empty defaults
        address: "",
        nextOfKinName: "",
        nextOfKinNumber: "",
        proofOfAddress: [],
      },
    });

    console.log("Successfully created new individual profile:", newProfile.id);
    return {
      data: newProfile,
      status: 201,
      error: null,
    };
  } catch (error) {
    console.error("Error in createIndividualClientProfile:", error);
    return {
      data: null,
      status: 500,
      error: "Something went wrong while creating individual client profile",
    };
  }
}

// export async function createAvailability(availabilityData: any) {
//   try {
//     const newAvailability = await prismaClient.availability.create({
//       data: {
//         monday: availabilityData.monday,
//         tuesday: availabilityData.tuesday,
//         wednesday: availabilityData.wednesday,
//         thursday: availabilityData.thursday,
//         friday: availabilityData.friday,
//         saturday: availabilityData.saturday,
//         doctorProfileId: availabilityData.doctorProfileId,
//       },
//     });

//     return {
//       data: newAvailability,
//       error: null,
//       status: 200,
//     };
//   } catch (error) {
//     console.log(error);
//     return {
//       data: null,
//       error: "Failed to create availability",
//       status: 500,
//     };
//   }
// }


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

