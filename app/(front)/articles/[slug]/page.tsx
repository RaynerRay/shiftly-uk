import React from "react";
import { getBlogPostBySlug } from "@/actions/blogs";
import Image from "next/image";
import { notFound } from "next/navigation";
// import type { Metadata } from "next"; // Metadata is already imported above for generateMetadata
import { ShareButtons } from "@/app/(front)/articles/[slug]/ShareButtons";
import { Metadata } from "next";

// Define proper types for params using Next.js 15 expected pattern
interface PageProps {
 params: Promise<{
  slug: string;
 }>;
}

// ✅ Metadata generation (rest of this function is unchanged)
export async function generateMetadata(
 { params }: PageProps
): Promise<Metadata> {
 const resolvedParams = await params;
 const slug = resolvedParams.slug;
 try {
  const response = await getBlogPostBySlug(slug);

  if (response.status !== 200 || !response.data) {
   return {
    title: "Blog Post Not Found",
    description: "The requested blog post could not be found.",
   };
  }

  const blog = response.data;

  return {
   title: `${blog.title} | Shiftly.uk`,
   description: blog.title,
   openGraph: {
    title: blog.title,
    description: blog.title,
    url: `https://shiftly.uk/articles/${resolvedParams.slug}`,
    images: blog.image?.length
     ? [{ url: blog.image, width: 1200, height: 630, alt: blog.title }]
     : [{ url: '/placeholder.jpg', width: 1200, height: 630, alt: blog.title }],
    type: "article",
   },
   twitter: {
    card: "summary_large_image",
    title: blog.title,
    description: blog.title,
    images: blog.image?.length ? [blog.image] : ['/placeholder.jpg'],
   }
  };
 } catch (error) {
  console.error("Error generating metadata:", error);
  return {
   title: "Blog Post | Shiftly.uk",
   description: "Shiftly.uk blog post",
  };
 }
}


// ✅ Page Component
export default async function BlogPostPage({ params }: PageProps) {
 const resolvedParams = await params;
 const slug = resolvedParams.slug; // Keep this one

 try {
  const response = await getBlogPostBySlug(slug);

  if (response.status !== 200 || !response.data) {
   console.error("Blog post not found:", slug);
   notFound();
  }

  const blog = response.data;
  const postUrl = `https://shiftly.uk/articles/${slug}`;

  return (
   <article className="container mx-auto px-4 py-12 max-w-4xl">
    {/* Title */}
    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 leading-tight">
     {blog.title}
    </h1>

    {/* Image */}
    <div className="relative w-full h-96 mb-8">
     <Image
      src={blog.image?.length ? blog.image : '/placeholder.jpg'}
      alt={blog.title}
      fill
      className="object-cover rounded-lg"
      priority
     />
    </div>

    {/* Categories */}
    {Array.isArray(blog.categories) && (
     <div className="flex flex-wrap gap-2 mb-6">
      {blog.categories.map((category: string, index: number) => (
       <span
        key={index}
        className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
       >
        {category}
       </span>
      ))}
     </div>
    )}

    {/* Meta */}
    <div className="flex items-center gap-4 mb-8 text-gray-600">
     <span className="text-sm">
      Last updated: {blog.lastUpdated}
     </span>
    </div>

    {/* Content */}
    <div className="prose prose-lg max-w-none text-sky-900">
     <div dangerouslySetInnerHTML={{ __html: blog.content ?? "" }} />
    </div>

    {/* Share */}
    <div className="mt-12 pt-8 border-t border-gray-200">
     <div className="flex justify-between items-center">
      <div className="text-sm text-gray-600">
       Share this article:
      </div>
      <ShareButtons url={postUrl} title={blog.title} />
     </div>
    </div>
   </article>
  );
 } catch (error) {
  console.error("Error rendering blog post:", error);
  notFound();
 }
}

// Generate static paths for all blog posts (rest of this function is unchanged)
export async function generateStaticParams(): Promise<{ slug: string }[]> {
 try {
  // Import the function to get all blog posts
  const { getBlogPosts } = await import("@/actions/blogs");

  // Fetch all blog posts
  const response = await getBlogPosts();

  // Check if the response is valid
  if (!response || response.status !== 200 || !response.data) {
   console.warn("Failed to fetch blog posts for static generation");
   return [];
  }

  // Map the blog posts to their slugs
  const slugs = response.data.map(post => ({
   slug: post.slug
  }));

  console.log(`Generated static paths for ${slugs.length} blog posts`);
  return slugs;
 } catch (error) {
  console.error("Error generating static params:", error);
  return [];
 }
}