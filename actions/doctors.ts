"use server";

import { prismaClient } from "@/lib/db";
import { Doctor } from "@/types/types";
import generateSlug from "@/utils/generateSlug";

type ServiceProps = {
  title: string;
  slug: string;
  id?: string;
};
export type DataProps = {
  doctors: Doctor[] | undefined;
  services: ServiceProps[];
};
// export async function getDoctorsByServiceSlug(slug: string) {
//   try {
//     if (slug) {
//       let doctors: any[] | undefined = [];
//       let services: ServiceProps[] = [];
//       const service = await prismaClient.service.findUnique({
//         where: {
//           slug,
//         },
//         include: {
//           doctorProfiles: {
//             include: {
//               availability: true,
//             },
//           },
//         },
//       });
//       doctors = service?.doctorProfiles.map((doc) => {
//         return {
//           id: doc.userId,
//           name: `${doc.firstName} ${doc.lastName} `,
//           email: doc.email ?? "",
//           phone: doc.phone ?? "",
//           slug: generateSlug(`${doc.firstName} ${doc.lastName} `),
//           doctorProfile: doc,
//         };
//       });
//       services = await prismaClient.service.findMany({
//         where: {
//           id: {
//             not: service?.id,
//           },
//         },
//       });
//       const data: DataProps = {
//         doctors,
//         services,
//       };
//       return data as DataProps;
//     }
//   } catch (error) {
//     console.log(error);
//     return [];
//   }
// }
// export async function getDoctorsBySpecialtySlug(slug: string) {
//   try {
//     if (slug) {
//       let doctors: any[] | undefined = [];
//       let services: ServiceProps[] = [];
//       const service = await prismaClient.speciality.findUnique({
//         where: {
//           slug,
//         },
//         include: {
//           doctorProfiles: {
//             include: {
//               availability: true,
//             },
//           },
//         },
//       });
//       doctors = service?.doctorProfiles.map((doc) => {
//         return {
//           id: doc.userId,
//           name: `${doc.firstName} ${doc.lastName} `,
//           email: doc.email ?? "",
//           phone: doc.phone ?? "",
//           slug: generateSlug(`${doc.firstName} ${doc.lastName} `),
//           doctorProfile: doc,
//         };
//       });
//       services = await prismaClient.speciality.findMany({
//         where: {
//           id: {
//             not: service?.id,
//           },
//         },
//       });
//       const data: DataProps = {
//         doctors,
//         services,
//       };
//       return data as DataProps;
//     }
//   } catch (error) {
//     console.log(error);
//     return [];
//   }
// }
// export async function getDoctorsBySymptomId(symptomId: string) {
//   try {
//     if (symptomId) {
//       let doctors: any[] | undefined = [];
//       let services: ServiceProps[] = [];
//       const doctorProfiles = await prismaClient.doctorProfile.findMany({
//         where: {
//           symptomIds: {
//             has: symptomId, // This checks if symptomIds array contains the symptomId
//           },
//         },
//         include: {
//           availability: true,
//         },
//       });
//       doctors = doctorProfiles.map((doc) => {
//         return {
//           id: doc.userId,
//           name: `${doc.firstName} ${doc.lastName} `,
//           email: doc.email ?? "",
//           phone: doc.phone ?? "",
//           slug: generateSlug(`${doc.firstName} ${doc.lastName} `),
//           doctorProfile: doc,
//         };
//       });
//       services = await prismaClient.symptom.findMany({
//         where: {
//           id: {
//             not: symptomId,
//           },
//         },
//       });
//       const data: DataProps = {
//         doctors,
//         services,
//       };
//       return data as DataProps;
//     }
//   } catch (error) {
//     console.log(error);
//     return [];
//   }
// }

// export async function getDoctorsBySearch(query: string) {
//   if (query) {
//     const services = await prismaClient.service.findMany({
//       where: {
//         OR: [
//           { title: { contains: query, mode: "insensitive" } },
//           { slug: { contains: query, mode: "insensitive" } },
//         ],
//       },
//       select: {
//         id: true,
//         title: true,
//         slug: true,
//         imageUrl: true,
//         _count: {
//           select: {
//             doctorProfiles: true,
//           },
//         },
//       },
//     });
  
//     const doctorProfiles = await prismaClient.doctorProfile.findMany({
//       where: {
//         OR: [
//           { firstName: { contains: query, mode: "insensitive" } },
//           { lastName: { contains: query, mode: "insensitive" } },
//           { servicesOffered: { hasSome: [query] } },
//         ],
//       },
//       include: {
//         availability: true,
//       },
//     });
//     const doctors = doctorProfiles.map((doc) => {
//       return {
//         id: doc.userId,
//         name: `${doc.firstName} ${doc.lastName} `,
//         email: doc.email ?? "",
//         phone: doc.phone ?? "",
//         slug: generateSlug(`${doc.firstName} ${doc.lastName} `),
//         doctorProfile: doc,
//       };
//     });
//     return {
     
//       doctors,
//     };
//   }
// }

export async function getDoctorsBySearch(city?: string, profession?: string) {
  try {
    const whereClause: any = {
      status: "APPROVED" // Only get verified doctors
    };

    if (city) {
      whereClause.city = city;
    }

    if (profession) {
      whereClause.profession = profession;
    }

    const doctorProfiles = await prismaClient.doctorProfile.findMany({
      where: whereClause,
      include: {
        user: true,
        availability: true,
      },
    });

    // Map to match the local Doctor interface
    const doctors = doctorProfiles.map((doc) => ({
      id: doc.userId,
      userId: doc.userId,
      firstName: doc.firstName,
      lastName: doc.lastName,
      email: doc.user?.email ?? "",
      phone: doc.user?.phone ?? "",
      slug: generateSlug(`${doc.firstName} ${doc.lastName}`),
      availability: doc.availability,
      doctorProfile: doc // Add this to accommodate additional fields
    }));

    return {
      doctors,
    };
  } catch (error) {
    console.error("Error in getDoctorsBySearch:", error);
    return { doctors: [] };
  }
}
