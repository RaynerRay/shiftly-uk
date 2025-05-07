import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  doctorProfileImage: f({ image: { maxFileSize: "1MB" } }).onUploadComplete(
    async ({  file }) => {
      console.log("file url", file.url);
      return { uploadedBy: "Shiftly UK" };
    }
  ),
  companyLogo: f({ image: { maxFileSize: "1MB" } }).onUploadComplete(
    async ({  file }) => {
      console.log("file url", file.url);
      return { uploadedBy: "Shiftly UK" };
    }
  ),
  serviceImage: f({ image: { maxFileSize: "1MB" } }).onUploadComplete(
    async ({  file }) => {
      console.log("file url", file.url);
      return { uploadedBy: "Shiftly UK" };
    }
  ),
  blogImage: f({ image: { maxFileSize: "1MB" } }).onUploadComplete(
    async ({  file }) => {
      console.log("file url", file.url);
      return { uploadedBy: "Shiftly UK" };
    }
  ),
  doctorProfessionDocs: f({
    pdf: { maxFileSize: "4MB", maxFileCount: 4 },
  }).onUploadComplete(async ({  file }) => {
    console.log("file url", file.url);
    return { uploadedBy: "Shiftly UK" };
  }),
  patientMedicalFiles: f({
    pdf: { maxFileSize: "4MB", maxFileCount: 4 },
  }).onUploadComplete(async ({  file }) => {
    console.log("file url", file.url);
    return { uploadedBy: "Shiftly UK" };
  }),
  clientProofOfAddress: f({
    pdf: { maxFileSize: "4MB", maxFileCount: 2 },
  }).onUploadComplete(async ({  file }) => {
    console.log("file url", file.url);
    return { uploadedBy: "Shiftly UK" };
  }),
  employersLiability: f({
    pdf: { maxFileSize: "4MB", maxFileCount: 2 },
  }).onUploadComplete(async ({  file }) => {
    console.log("file url", file.url);
    return { uploadedBy: "Shiftly UK" };
  }),
  additionalDocs: f({
    pdf: { maxFileSize: "16MB", maxFileCount: 2 },
  }).onUploadComplete(async ({  file }) => {
    console.log("file url", file.url);
    return { uploadedBy: "Shiftly UK" };
  }),
  dbs: f({
    pdf: { maxFileSize: "16MB", maxFileCount: 2 },
  }).onUploadComplete(async ({  file }) => {
    console.log("file url", file.url);
    return { uploadedBy: "Shiftly UK" };
  }),

} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
