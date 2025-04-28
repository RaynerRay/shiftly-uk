// components/Frontend/Blog/BlogCard.tsx
import React from "react";
import Image from "next/image";
import { BlogPostProps } from "@/actions/blogs";
import Link from "next/link";

export default function BlogCard({ blog }: { blog: BlogPostProps }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <Link href={`/articles/${blog.slug}`}>
        <Image
          src={blog.image}
          alt={blog.title}
          className="w-full object-cover h-56"
          width={600}
          height={350}
        />
      </Link>
      
      <div className="p-4">
        <div className="flex flex-wrap gap-2 mb-3">
          {blog.categories.map((category, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md"
            >
              {category}
            </span>
          ))}
        </div>
        
        <Link href={`/articles/${blog.slug}`}>
          <h2 className="text-lg font-semibold text-gray-800 mb-4 hover:text-blue-600 transition-colors">
            {blog.title}
          </h2>
        </Link>
        
        <div className="flex items-center gap-3">
          <p className="text-xs text-gray-400">
            Last updated: {blog.lastUpdated}
          </p>
        </div>
      </div>
    </div>
  );
}