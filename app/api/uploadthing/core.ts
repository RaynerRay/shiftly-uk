import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  doctorProfileImage: f({ image: { maxFileSize: "1MB" } }).onUploadComplete(
    async ({  file }) => {
      console.log("file url", file.url);
      return { uploadedBy: "Shiftly" };
    }
  ),
  serviceImage: f({ image: { maxFileSize: "1MB" } }).onUploadComplete(
    async ({  file }) => {
      console.log("file url", file.url);
      return { uploadedBy: "Shiftly" };
    }
  ),
  BlogImage: f({ image: { maxFileSize: "1MB" } }).onUploadComplete(
    async ({  file }) => {
      console.log("file url", file.url);
      return { uploadedBy: "Shiftly" };
    }
  ),
  doctorProfessionDocs: f({
    pdf: { maxFileSize: "4MB", maxFileCount: 4 },
  }).onUploadComplete(async ({  file }) => {
    console.log("file url", file.url);
    return { uploadedBy: "Shiftly" };
  }),
  patientMedicalFiles: f({
    pdf: { maxFileSize: "4MB", maxFileCount: 4 },
  }).onUploadComplete(async ({  file }) => {
    console.log("file url", file.url);
    return { uploadedBy: "Shiftly" };
  }),
  additionalDocs: f({
    pdf: { maxFileSize: "4MB", maxFileCount: 4 },
  }).onUploadComplete(async ({  file }) => {
    console.log("file url", file.url);
    return { uploadedBy: "Shiftly" };
  }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
