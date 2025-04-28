import React from "react";
import { getBlogPostBySlug } from "@/actions/blogs";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function BlogPostPage(props: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
  // Await params before accessing properties
  const params = await props.params;
  const slug = (params as { slug: string }).slug;
  
  const response = await getBlogPostBySlug(slug);
  
  if (response.status !== 200 || !response.data) {
    notFound();
  }
  
  const blog = response.data;
  
  return (
    <article className="container mx-auto px-4 py-12 max-w-4xl">
      {/* Title */}
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 leading-tight">
        {blog.title}
      </h1>
      {/* Header Image */}
      <div className="relative w-full h-96 mb-8">
        <Image
          src={blog.image}
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
      
      {/* Content */}
      <div className="prose prose-lg max-w-none">
        <div
          className="text-gray-800 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: blog.content ?? "" }}
        />
      </div>
      
      {/* Optional: Add a footer section */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-600">
            Share this article:
          </div>
          <div className="flex gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <span className="text-gray-600">Twitter</span>
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <span className="text-gray-600">Facebook</span>
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <span className="text-gray-600">LinkedIn</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export async function generateStaticParams() {
  return [];
}