import React from "react";
import { getBlogPostBySlug } from "@/actions/blogs";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { ShareButtons } from "./ShareButtons";

// Generate metadata for social sharing and SEO
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  // Await params before using its properties in Next.js 15
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  
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
      url: `https://shiftly.uk/articles/${slug}`,
      images: blog.image && typeof blog.image === 'string' && blog.image.length > 0
        ? [{ url: blog.image, width: 1200, height: 630, alt: blog.title }] 
        : [{ url: '/placeholder.jpg', width: 1200, height: 630, alt: blog.title }],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.title,
      images: blog.image && typeof blog.image === 'string' && blog.image.length > 0
        ? [blog.image] 
        : ['/placeholder.jpg'],
    }
  };
}

export default async function BlogPostPage(props: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
  // Await params before accessing properties
  const params = await props.params;
  const slug = (params as { slug: string }).slug;
  
  const response = await getBlogPostBySlug(slug);
  
  if (response.status !== 200 || !response.data) {
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
      {/* Header Image */}
      <div className="relative w-full h-96 mb-8">
        <Image
          src={
            blog.image && typeof blog.image === 'string' && blog.image.length > 0
              ? blog.image
              : '/placeholder.jpg' // Path to your placeholder in the public folder
          }
          alt={blog.title}
          fill
          className="object-cover rounded-lg"
          priority
        />
      </div>
      
      {/* Categories */}
      <div className="flex flex-wrap gap-2 mb-6">
        {blog.categories.map((category, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
          >
            {category}
          </span>
        ))}
      </div>
      
      {/* Meta Info */}
      <div className="flex items-center gap-4 mb-8 text-gray-600">
        <span className="text-sm">
          Last updated: {blog.lastUpdated}
        </span>
        {/* Add more meta info if available, like author or reading time */}
      </div>
      
      
      {/* Content - Apply prose classes here */}
      <div className="prose prose-lg max-w-none text-sky-900">
        <div dangerouslySetInnerHTML={{ __html: blog.content ?? "" }} />
      </div>
      
      {/* Share section with functional buttons */}
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
}

export async function generateStaticParams() {
  return [];
}