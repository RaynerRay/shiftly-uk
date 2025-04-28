"use client";

import React, { useEffect, useState } from 'react';
import { BookOpen, ChevronRight, Calendar, ArrowRight } from 'lucide-react';
import { getBlogPosts, BlogPostProps } from "@/actions/blogs";
import Link from 'next/link';
import Image from 'next/image';

const Media = () => {
  const [blogs, setBlogs] = useState<BlogPostProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const response = await getBlogPosts({
          sort: "latest",
          onlyPublished: true
        });
        
        if (response.status === 200 && response.data) {
          // Only take the first 3 blog posts
          const firstThreePosts = response.data.slice(0, 3);
          setBlogs(firstThreePosts);
          setError(null);
        } else {
          setError("Failed to load blog posts");
          console.error("Error from server:", response.error);
        }
      } catch (err) {
        console.error("Error fetching blogs:", err);
        setError("An error occurred while fetching blogs");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Format date helper
  // const formatDate = (date: Date) => {
  //   return new Date(date).toLocaleDateString('en-US', {
  //     year: 'numeric',
  //     month: 'long',
  //     day: 'numeric'
  //   });
  // };

  return (
    <div className="w-full bg-gradient-to-br from-sky-700 to-sky-800 py-16 px-4 md:px-8 text-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="w-16 h-1 bg-sky-400 mb-8"></div>
          <h2 className="text-xl font-medium text-sky-300 mb-2">Our latest updates</h2>
          <h1 className="text-3xl md:text-4xl font-bold text-orange-400 mb-12">News & Insights</h1>
        </div>
        
        {/* Blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {loading ? (
            // Loading state - show 3 skeleton cards
            Array(3).fill(0).map((_, index) => (
              <div key={index} className="bg-sky-800 rounded-xl overflow-hidden animate-pulse">
                <div className="h-48 bg-sky-700/50"></div>
                <div className="p-6">
                  <div className="h-4 bg-sky-600 rounded w-1/3 mb-4"></div>
                  <div className="h-6 bg-sky-600 rounded w-3/4 mb-3"></div>
                  <div className="h-4 bg-sky-600/60 rounded w-full mb-2"></div>
                  <div className="h-4 bg-sky-600/60 rounded w-5/6 mb-6"></div>
                  <div className="h-5 bg-sky-600 rounded w-1/2"></div>
                </div>
                <div className="p-4 flex justify-center">
                  <div className="h-10 bg-orange-400/50 rounded-full w-36"></div>
                </div>
              </div>
            ))
          ) : error ? (
            // Error state
            <div className="col-span-3 text-center py-10">
              <p className="text-red-300">{error}</p>
            </div>
          ) : blogs.length === 0 ? (
            // No blogs found state
            <div className="col-span-3 text-center py-10">
              <p className="text-sky-200">No articles available at the moment.</p>
            </div>
          ) : (
            // Display actual blogs
            blogs.map((blog) => (
              <div key={blog.id} className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-sky-400 to-orange-400 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
                <div className="relative flex flex-col h-full bg-sky-800 rounded-xl overflow-hidden">
                  <div className="h-48 bg-sky-700">
                    {blog.image ? (
                      <Image
                      height={100}
                      width={100} 
                        src={blog.image} 
                        alt={blog.title} 
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center bg-opacity-50 bg-gray-50">
                        <BookOpen className="h-16 w-16 text-sky-300" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 p-6">
                    <div className="flex items-center mb-4 text-sky-300">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span className="text-sm">
                        {blog.lastUpdated}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-3">{blog.title}</h3>
                    {/* <p className="text-sky-200 mb-6">
                      {blog.content ? blog.content.substring(0, 120) + '...' : 'No content available'}
                    </p> */}
                    {/* <div className="text-lg font-bold">Shiftly Team</div> */}
                  </div>
                  <div className="bg-sky-800 p-4 flex justify-center">
                    <Link href={`/articles/${blog.slug}`}>
                      <button className="flex items-center justify-center space-x-2 bg-orange-400 hover:bg-orange-500 text-sky-900 font-medium py-2 px-6 rounded-full transition-colors">
                        <span>Read article</span>
                        <ArrowRight className="h-5 w-5" />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* CTA Button */}
        <div className="mt-12 text-center">
          <Link href="/blogs">
            <button className="inline-flex items-center justify-center px-8 py-3 border border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-sky-900 rounded-full transition-all duration-300 group">
              View all news and insights
              <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Media;