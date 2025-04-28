"use server";

import { AppointmentUpdateProps } from "@/components/Dashboard/Doctor/UpdateAppointmentForm";
import NewAppointmentEmail from "@/components/Emails/new-appointment";
import { prismaClient } from "@/lib/db";
import { AppointmentProps, ServiceProps } from "@/types/types";
import { Appointment, PaymentStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;



export async function createAppointment(data: AppointmentProps) {
  // Create a new instance of Resend in the function scope
  const resend = new Resend(process.env.RESEND_API_KEY);
  
  try {
    const doctor = await prismaClient.user.findUnique({
      where: {
        id: data.doctorId,
      },
    });
    
    if (!doctor || !doctor.email) {
      return {
        data: null,
        status: 400,
        error: "Doctor not found or missing email",
      };
    }
    
    const newAppointment = await prismaClient.appointment.create({
      data,
    });
    
    const firstName = doctor.name;
    const doctorMail = doctor.email;
    const link = `${baseUrl}/dashboard/doctor/appointments/view/${newAppointment.id}`;
    const message = "hi, you have a new Shiftly appointment. Please review the details and either accept or reject it by clicking the button below.";
    
    // Add error handling for email sending
    try {
      const sendMail = await resend.emails.send({
        from: "Medical App <noreply@shiftly.uk>",
        to: doctorMail,
        subject: "New Appointment Approval Needed",
        react: NewAppointmentEmail({ firstName, link, message }),
      });
      
      console.log("Email sent successfully:", sendMail);
    } catch (emailError) {
      console.error("Failed to send email:", emailError);
      // Continue execution even if email fails
    }
    
    revalidatePath("/dashboard/doctor/appointments");
    
    return {
      data: newAppointment,
      status: 201,
      error: null,
    };
  } catch (error) {
    console.error("Error creating appointment:", error);
    return {
      data: null,
      status: 500,
      error,
    };
  }
}
export async function updateAppointment(id: string, data: AppointmentProps) {
  try {
    const updatedAppointment = await prismaClient.appointment.update({
      where: {
        id,
      },
      data,
    });
    revalidatePath("/dashboard/doctor/appointments");
    // console.log(updatedAppointment);
    return {
      data: updatedAppointment,
      status: 201,
      error: null,
    };
  } catch (error) {
    console.log(error);
    return {
      data: null,
      status: 500,
      error,
    };
  }
}
export async function updateAppointmentById(
  id: string,
  data: AppointmentUpdateProps
) {
  try {
    const updatedAppointment = await prismaClient.appointment.update({
      where: {
        id,
      },
      data,
    });
    const patientId = updatedAppointment.patientId;
    const patient = await prismaClient.user.findUnique({
      where: {
        id: patientId,
      },
    });
    const firstName = patient?.name;
    const doctorMail = patient?.email;
    const link = `${baseUrl}/dashboard/user/appointments/view/${updatedAppointment.id}`;
    const message =
      "Your appointment has been approved. You can View the Details here";
    const sendMail = await resend.emails.send({
      from: "Medical App <noreply@shiftly.uk>",
      to: doctorMail ?? "",
      subject: "Appointment Approved",
      react: NewAppointmentEmail({ firstName, link, message }),
    });
    revalidatePath("/dashboard/doctor/appointments");
    revalidatePath("/dashboard/user/appointments");
    // console.log(updatedAppointment);
    return {
      data: updatedAppointment,
      status: 201,
      error: null,
    };
  } catch (error) {
    console.log(error);
    return {
      data: null,
      status: 500,
      error,
    };
  }
}

export async function updateAppointmentStatus(id: string, paymentStatus: PaymentStatus) {
  try {
    const updatedAppointment = await prismaClient.appointment.update({
      where: {
        id,
      },
      data: {
        paymentStatus,
      },
    });
    
    revalidatePath(`/dashboard/doctor/appointments/view/${id}`);
    revalidatePath("/dashboard/doctor/appointments");
    
    return {
      data: updatedAppointment,
      status: 200,
      error: null,
    };
  } catch (error) {
    console.error("Error updating appointment payment status:", error);
    return {
      data: null,
      status: 500,
      error,
    };
  }
}

export async function updateAppointmentCompletion(
  id: string, 
  isCompleted: boolean,
  actualStartTime: Date | null = null,
  actualFinishTime: Date | null = null,
  actualHours: number | null = null,
  finalCharge: number | null = null,
  totalHours: number = 0,
  hourlyRate: number = 0
) {
  try {
    let calculatedFinalCharge = finalCharge;
    
    // If no final charge is provided but we have actual hours, calculate it
    if (!calculatedFinalCharge && actualHours !== null) {
      // Use whichever is greater between actualHours and totalHours
      const hoursToCharge = Math.max(actualHours, totalHours);
      calculatedFinalCharge = Math.round(hoursToCharge * hourlyRate);
    }
    
    const updatedAppointment = await prismaClient.appointment.update({
      where: { id },
      data: { 
        isCompleted,
        actualStartTime,
        actualFinishTime,
        actualHours,
        finalCharge: calculatedFinalCharge
      },
    });
    
    revalidatePath("/dashboard/doctor/appointments");
    return {
      data: updatedAppointment,
      status: 200,
      error: null,
    };
  } catch (error) {
    console.log(error);
    return {
      data: null,
      status: 500,
      error,
    };
  }
}

export async function getAppointments() {
  try {
    const appointments = await prismaClient.appointment.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return {
      data: appointments,
      status: 200,
      error: null,
    };
  } catch (error) {
    console.log(error);
    return {
      data: null,
      status: 500,
      error,
    };
  }
}
export async function getPatientAppointments(patientId: string) {
  try {
    const appointments = await prismaClient.appointment.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        patientId,
      },
    });
    return {
      data: appointments,
      status: 200,
      error: null,
    };
  } catch (error) {
    console.log(error);
    return {
      data: null,
      status: 500,
      error,
    };
  }
}
export async function getAppointmentByPatientId(patientId: string | undefined) {
  if (patientId) {
    try {
      const appointment = await prismaClient.appointment.findFirst({
        where: {
          patientId,
        },
      });
      if (!appointment) {
        return null;
      }
      return appointment as Appointment;
    } catch (error) {
      // console.log(error);
      return {
        data: null,
        status: 500,
        error,
      };
    }
  }
}
export async function getDoctorAppointments(doctorId: string) {
  try {
    const appointments = await prismaClient.appointment.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        doctorId,
      },
    });
    return {
      data: appointments,
      status: 200,
      error: null,
    };
  } catch (error) {
    console.log(error);
    return {
      data: null,
      status: 500,
      error,
    };
  }
}
export async function getAppointmentById(id: string) {
  try {
    if (id) {
      const appointment = await prismaClient.appointment.findUnique({
        where: {
          id,
        },
      });
      return appointment;
    }
  } catch (error) {
    console.log(error);
  }
}
export async function deleteAppointment(id: string) {
  try {
    await prismaClient.appointment.delete({
      where: {
        id,
      },
    });
    revalidatePath("/dashboard/doctor/appointments");
    return {
      ok: true,
      status: 200,
      error: null,
    };
  } catch (error) {
    console.log(error);
    return {
      data: null,
      status: 500,
      error,
    };
  }
}
