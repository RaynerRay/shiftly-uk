"use server";

import EmailTemplate from "@/components/Emails/email-template";
import { prismaClient } from "@/lib/db";
import { DoctorDetail, RegisterInputProps } from "@/types/types";
import generateSlug from "@/utils/generateSlug";
import bcrypt from "bcrypt";
import { Resend } from "resend";
import {
  createDoctorProfile,
  createClientProfile,
  createIndividualClientProfile
} from "./onboarding";
import { generateTrackingNumber } from "@/lib/generateTracking";
import { isEmailBlacklisted } from "@/lib/isEmailBlackListed";

export async function createUser(formData: RegisterInputProps) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { fullName, email, role, phone, password, plan } = formData;

  try {
    if (isEmailBlacklisted(email)) {
      return {
        error: `Please use a valid, non-temporary email address.`,
        status: 409,
        data: null,
      };
    }

    const existingUser = await prismaClient.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return {
        data: null,
        error: `User with this email (${email}) already exists in the Database`,
        status: 409,
      };
    }

    // Encrypt the Password with bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Generate Token for email verification
    const generateToken = () => {
      const min = 100000; // Minimum 6-figure number
      const max = 999999; // Maximum 6-figure number
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    
    const userToken = generateToken();
    
    // Create the user first
    const newUser = await prismaClient.user.create({
      data: {
        name: fullName,
        slug: generateSlug(fullName),
        email,
        phone,
        password: hashedPassword,
        role,
        plan,
        token: userToken,
      },
    });

    // After user creation, create the appropriate profile based on role
    if (newUser && newUser.id) {
      try {
        if (role === "DOCTOR") {
          // Create doctor profile
          await createDoctorProfile({
            firstName: newUser.name.split(" ")[0] || "",
            lastName: newUser.name.split(" ")[1] || "",
            trackingNumber: generateTrackingNumber(),
            userId: newUser.id,
            phone: newUser.phone,
            email: newUser.email,
          });
        } 
        else if (role === "CLIENT") {
          // Create client profile
          console.log("Creating company client profile for user:", newUser.id);
          const clientResult = await createClientProfile({
            name: fullName,
            userId: newUser.id,
            phone: newUser.phone || "",
            email: newUser.email,
            employersLiability: [],
            trackingNumber: generateTrackingNumber(),  // Added this as it's required by the onboarding function
          });
          console.log("Individual client profile creation result:", clientResult);
          if (clientResult.error) {
            console.error("Failed to create individual client profile:", clientResult.error);
          }
        } 
        else if (role === "INDIVIDUALCLIENT") {
          console.log("Creating individual client profile for user:", newUser.id);
          // Create individual client profile
          // Match the parameter names expected by the onboarding createIndividualClientProfile function
          const individualClientResult = await createIndividualClientProfile({
            name: fullName,  // Changed from fullName to name to match the onboarding function
            userId: newUser.id,
            phone: newUser.phone || "",
            email: newUser.email,
            trackingNumber: generateTrackingNumber(),  // Added this as it's required by the onboarding function
          });
          
          console.log("Individual client profile creation result:", individualClientResult);
          
          if (individualClientResult.error) {
            console.error("Failed to create individual client profile:", individualClientResult.error);
          }
        }
      } catch (profileError) {
        console.error(`Error creating profile for role ${role}:`, profileError);
        // We don't want to fail the entire user registration if profile creation fails
        // The user can complete their profile later
      }
    }

    // Send verification email
    try {
      const token = newUser.token;
      const firstName = newUser.name.split(" ")[0];
      const linkText = "Verify your Account";
      const message = "Thank you for registering with Shiftly UK. To complete your registration and verify your email address, please enter the following 6-digit verification code on our website:";
      
      const sendMail = await resend.emails.send({
        from: "Shiftly <info@shiftly.uk>",
        to: email,
        subject: "Verify Your Email Address",
        react: EmailTemplate({ firstName, token, linkText, message }),
      });
    } catch (emailError) {
      console.error("Error sending verification email:", emailError);
      // Continue even if email sending fails
    }

    return {
      data: newUser,
      error: null,
      status: 200,
    };
  } catch (error) {
    console.error("Error in createUser:", error);
    return {
      error: "Something went wrong during user registration",
      status: 500,
      data: null,
    };
  }
}


export async function updateUserById(id: string) {
  if (!id || id.trim() === '') {
    return null;
  }
  
  try {
    const updatedUser = await prismaClient.user.update({
      where: {
        id,
      },
      data: {
        isVerfied: true,
      },
    });
    return updatedUser;
  } catch (error) {
    console.error("Error updating user verification status:", error);
    return null;
  }
}




export async function getUserById(id: string) {
  if (id) {
    try {
      const user = await prismaClient.user.findUnique({
        where: {
          id,
        },
      });
      return user;
    } catch (error) {
      console.log(error);
    }
  }
}

export async function updateDoctorStatus(profileId: string, status: "PENDING" | "APPROVED" | "REJECTED") {
  "use server";
  
  try {
    if (!profileId) {
      return {
        error: "Profile ID is required",
        status: 400,
        data: null,
      };
    }

    const updatedProfile = await prismaClient.doctorProfile.update({
      where: {
        id: profileId,
      },
      data: {
        status,
      },
    });

    return {
      data: updatedProfile,
      error: null,
      status: 200,
    };
  } catch (error) {
    console.error("Error updating doctor status:", error);
    return {
      data: null,
      error: "Failed to update doctor status",
      status: 500,
    };
  }
}

// export async function getDoctors() {
//   try {
//     const doctors = await prismaClient.user.findMany({
//       where: {
//         role: "DOCTOR",
//       },
//       include: {
//         doctorProfile: true,
//       },
//     });
//     return doctors;
//   } catch (error) {
//     console.log(error);
//     return null;
//   }
// }
export async function getDoctors() {
  try {
    const doctors = await prismaClient.user.findMany({
      where: {
        role: "DOCTOR",
        doctorProfile: {
          status: "APPROVED" // Only get verified doctors
        }
      },
      select: {
        id: true,
        name: true,
        email: true,
        slug: true,
        phone: true,
        doctorProfile: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            gender: true,
            bio: true,
            profilePicture: true,
            profession: true,
            hourlyWage: true,
            status: true,
            dob: true,
            middleName: true,
            
            // Add other specific fields you need from the DoctorProfile
            availability: {
              select: {
                monday: true,
                tuesday: true,
                wednesday: true,
                thursday: true,
                friday: true,
                saturday: true,
                sunday: true,
              },
            },
          },
        },
      },
    });

    return doctors;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getDoctorsAdmin() {
  try {
    const doctors = await prismaClient.user.findMany({
      where: {
        role: "DOCTOR",
        
      },
      select: {
        id: true,
        name: true,
        email: true,
        slug: true,
        phone: true,
        doctorProfile: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            gender: true,
            bio: true,
            profilePicture: true,
            profession: true,
            hourlyWage: true,
            status: true,
            dob: true,
            middleName: true,
            
            // Add other specific fields you need from the DoctorProfile
            availability: {
              select: {
                monday: true,
                tuesday: true,
                wednesday: true,
                thursday: true,
                friday: true,
                saturday: true,
                sunday: true,
              },
            },
          },
        },
      },
    });

    return doctors;
  } catch (error) {
    console.log(error);
    return null;
  }
}
export async function getDoctorBySlug(slug: string) {
  if (slug) {
    try {
      const doctor = await prismaClient.user.findFirst({
        where: {
          role: "DOCTOR",
          slug,
        },
        select: {
          id: true,
          name: true,
          email: true,
          slug: true,
          phone: true,
          doctorProfile: {
            select: {
              firstName: true,
              lastName: true,
              gender: true,
              bio: true,
              profilePicture: true,
              hourlyWage: true,
              yearsOfExperience: true,
              // country: true,
              city: true,
              state: true,
              // primarySpecialization: true,
              otherSpecialties: true,
              // hospitalName: true,
              // hospitalAddress: true,
              // hospitalContactNumber: true,
              // hospitalEmailAddress: true,
              // hospitalWebsite: true,
              // hospitalHoursOfOperation: true,
              servicesOffered: true,
              // insuranceAccepted: true,
              // educationHistory: true,
              // research: true,
              // accomplishments: true,
              // Add other specific fields you need from the DoctorProfile
              availability: {
                select: {
                  monday: true,
                  tuesday: true,
                  wednesday: true,
                  thursday: true,
                  friday: true,
                  saturday: true,
                  sunday: true,
                },
              },
            },
          },
        },
      });
      if (!doctor) {
        return null;
      }
      return doctor as DoctorDetail;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
export async function getDoctorById(id: string) {
  if (id) {
    try {
      const doctor = await prismaClient.user.findFirst({
        where: {
          role: "DOCTOR",
          id,
        },
        select: {
          id: true,
          name: true,
          email: true,
          slug: true,
          phone: true,
          doctorProfile: {
            select: {
              firstName: true,
              lastName: true,
              gender: true,
              bio: true,
              profilePicture: true,
              operationMode: true,
              profession: true,
              hourlyWage: true,
              yearsOfExperience: true,
              // country: true,
              city: true,
              state: true,
              // primarySpecialization: true,
              otherSpecialties: true,
              // hospitalName: true,
              // hospitalAddress: true,
              // hospitalContactNumber: true,
              // hospitalEmailAddress: true,
              // hospitalWebsite: true,
              // hospitalHoursOfOperation: true,
              servicesOffered: true,
              // insuranceAccepted: true,
              // educationHistory: true,
              // research: true,
              // accomplishments: true,
              // Add other specific fields you need from the DoctorProfile
              availability: {
                select: {
                  monday: true,
                  tuesday: true,
                  wednesday: true,
                  thursday: true,
                  friday: true,
                  saturday: true,
                  sunday: true,
                },
              },
            },
          },
        },
      });
      if (!doctor) {
        return null;
      }
      return doctor as DoctorDetail;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
export async function getDoctorProfile(id: string) {
  if (id) {
    try {
      const profile = await prismaClient.doctorProfile.findUnique({
        where: {
          userId: id,
        },
        include: {
          availability: true,
        },
      });
      return profile;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
