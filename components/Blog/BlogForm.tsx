"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import TextInput from "../FormInputs/TextInput";
import SubmitButton from "../FormInputs/SubmitButton";
import { createBlogPost, updateBlogPost } from "@/actions/blogs";
import { BlogPostProps } from "@/actions/blogs";
import generateSlug from "@/utils/generateSlug";
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import ImageInput from "../FormInputs/ImageInput";

type BlogFormProps = {
  title: string;
  description: string;
  blogPost?: any;  // eslint-disable-line @typescript-eslint/no-explicit-any
  isEditing?: boolean;
};

export default function BlogForm({
  title,
  description,
  blogPost,
  isEditing = false,
}: BlogFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState(blogPost?.content || "");
  const router = useRouter();
  const [blogImage, setBlogImage] = useState("");
  
  // Define categories for selection
  const categoryOptions = [
    { value: "health-news-policy", label: "Healthcare News & Policies " },
    { value: "mental-health", label: "Mental Health & Wellness" },
    { value: "nutrition-fitness", label: "Nutrition & Fitness" },
    { value: "diseases-treatments", label: "Diseases & Treatments" },
    { value: "digital-health", label: "Telemedicine & Digital Health" },
    { value: "social-care-public-health", label: "Social Care & Public Health" },
    { value: "health-technology-innovation", label: "Health Technology & Innovation" },
    { value: "patient-wellness-self-care", label: "Patient Wellness & Self-care" },
    { value: "mental-health-wellbeing", label: "Mental Health & Wellbeing" },
    { value: "chronic-condition-management", label: "Chronic Conditions" },
    { value: "elderly-dementia-care", label: "Elderly & Dementia Care" },
    { value: "caregiver-support", label: "Caregivers" },
    { value: "primary-care-gp-clinics", label: "Primary Care & GP Clinics" },
    { value: "clinical-best-practices", label: "Clinical Best Practices" },
    { value: "patient-stories-case-studies", label: "Patient Stories & Case Studies" },
    { value: "emergency-care", label: "Emergency & First Aid" },
    { value: "general", label: "General Healthcare" }
  ];
  
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<BlogPostProps>({
    defaultValues: {
      title: blogPost?.title || "",
      content: blogPost?.content || "",
      image: blogPost?.image || "/placeholder.jpg",
      categories: blogPost?.categories || [],
      lastUpdated: blogPost?.lastUpdated || new Date().toLocaleDateString('en-GB'),
      isPublished: blogPost?.isPublished || false,
    },
  });

  // Watch the selected categories to show them as selected in UI
  const selectedCategories = watch("categories") || [];

  // Handle ReactQuill content change
  const handleEditorChange = (newContent: string) => {
    setContent(newContent);
    setValue("content", newContent);
  };

  // ReactQuill modules configuration
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["blockquote", "code-block"],
      [{ color: [] }, { background: [] }],
      ["link", "image"],
      ["clean"],
    ],
  };

  // Toggle category selection
  const toggleCategory = (category: string) => {
    const current = [...selectedCategories];
    if (current.includes(category)) {
      setValue(
        "categories",
        current.filter((c) => c !== category)
      );
    } else {
      setValue("categories", [...current, category]);
    }
  };

  async function onSubmit(data: BlogPostProps) {
    setIsLoading(true);
    
    // Generate slug from the current form title
    const generatedSlug = generateSlug(data.title);
    data.slug = generatedSlug;
    data.image = blogImage;
    
    
    data.lastUpdated = new Date().toLocaleDateString('en-GB');
    data.content = content; // Ensure the latest content from ReactQuill is included
    
    try {
      let res;
      if (isEditing && blogPost?.id) {
        res = await updateBlogPost(blogPost.id, data);
        if (res?.status === 201) {
          toast.success("Blog post updated successfully");
          router.push("/dashboard/blogs");
          router.refresh();
        } else {
          throw new Error();
        }
      } else {
        res = await createBlogPost(data);
        if (res?.status === 201) {
          toast.success("Blog post created successfully");
          router.push("/dashboard/blogs");
          router.refresh();
        } else {
          throw new Error();
        }
      }
    } catch (error: any) {  // eslint-disable-line @typescript-eslint/no-explicit-any
      toast.error(error.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full">
      <div className="text-center border-b border-gray-200 pb-4 dark:border-slate-600">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">
          {title}
        </h1>
        <p className="text-balance text-muted-foreground">{description}</p>
      </div>
      
      <form className="py-4 px-4 mx-auto" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
          <TextInput
            label="Blog Title"
            register={register}
            name="title"
            errors={errors}
            placeholder="Enter blog title"
            className="col-span-full"
          />
          
          {/* Slug field removed as it will be auto-generated */}
          
          <div className="col-span-full">
            <label className="block text-sm font-medium mb-1">Content</label>
            <div className="mb-6">
              <ReactQuill
                theme="snow"
                value={content}
                onChange={handleEditorChange}
                modules={modules}
                className="min-h-[200px]"
              />
              {errors.content && (
                <span className="text-red-500 text-sm">{errors.content.message}</span>
              )}
            </div>
          </div>
          
       
             <ImageInput
            label="Blog Image (make sure image size is less than 1 mb)"
            imageUrl={blogImage}
            setImageUrl={setBlogImage}
            endpoint="blogImage"
          />
         
          
          <div className="col-span-full">
            <label className="block text-sm font-medium mb-1">Categories</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {categoryOptions.map((category) => (
                <div
                  key={category.value}
                  onClick={() => toggleCategory(category.value)}
                  className={`cursor-pointer p-2 border rounded-md transition-colors ${
                    selectedCategories.includes(category.value)
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  {category.label}
                </div>
              ))}
            </div>
            {errors.categories && (
              <span className="text-red-500 text-sm">
                {errors.categories.message}
              </span>
            )}
          </div>
          
          <div className="col-span-full flex items-center gap-2">
            <input
              type="checkbox"
              id="isPublished"
              {...register("isPublished")}
              className="w-4 h-4"
            />
            <label htmlFor="isPublished" className="text-sm">
              Publish immediately
            </label>
          </div>
        </div>
        
        <div className="mt-16 flex justify-center items-center">
          <SubmitButton
            title={isEditing ? "Update Blog Post" : "Create Blog Post"}
            isLoading={isLoading}
            loadingTitle={isEditing ? "Updating..." : "Creating..."}
          />
        </div>
      </form>
    </div>
  );
}