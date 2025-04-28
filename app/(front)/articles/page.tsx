// app/blogs/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { getBlogPosts, BlogPostProps } from "@/actions/blogs";
import { Search } from "lucide-react";
import { categoryOptions } from "@/lib/blogCategories";
import BlogCard from "@/components/BlogFront/BlogCard";

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<BlogPostProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    sort: "latest",
  });
  
  // Use state for input values to avoid immediate re-renders
  const [searchInput, setSearchInput] = useState("");
  
  // Function to fetch blogs
  const fetchBlogs = async (filterParams: typeof filters) => {
    setLoading(true);
    try {
      const response = await getBlogPosts({
        search: filterParams.search,
        category: filterParams.category,
        sort: filterParams.sort,
        onlyPublished: true,
      });
      
      if (response.status === 200 && response.data) {
        setBlogs(response.data);
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

  // Initial load
  useEffect(() => {
    fetchBlogs(filters);
  }, [filters]); // Include filters dependency
  
  // Handle filter changes with debouncing
  useEffect(() => {
    // Using a timeout for debounce inside the effect
    const timeoutId = setTimeout(() => {
      if (filters.search !== searchInput) {
        setFilters(prev => ({ ...prev, search: searchInput }));
      }
    }, 300);
    
    // Clean up the timeout
    return () => clearTimeout(timeoutId);
  }, [searchInput, filters.search]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };
  
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters(prev => ({ ...prev, search: searchInput }));
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters(prev => ({ ...prev, category: e.target.value }));
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters(prev => ({ ...prev, sort: e.target.value }));
  };

  const resetFilters = () => {
    setSearchInput("");
    setFilters({
      search: "",
      category: "",
      sort: "latest",
    });
  };

  return (
    <div className="max-w-7xl mx-auto py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">All Articles</h1>
      
      <div className="flex flex-wrap gap-4 mb-8">
        <form onSubmit={handleSearchSubmit} className="flex-1 min-w-[300px]">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchInput}
              onChange={handleSearch}
              className="w-full p-3 pr-10 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-500"
            />
            <button 
              type="submit"
              className="absolute right-2 rounded-md text-gray-50 bg-sky-500 py-3 px-5 top-1 flex gap-2">
              
              <Search size={20} />
            </button>
          </div>
        </form>

        <select
          value={filters.category}
          onChange={handleCategoryChange}
          className="p-3 rounded-lg border border-gray-200 min-w-[150px] focus:outline-none focus:border-blue-500"
        >
          <option value="">All Categories</option>
          {categoryOptions.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>

        <select
          value={filters.sort}
          onChange={handleSortChange}
          className="p-3 rounded-lg border border-gray-200 min-w-[150px] focus:outline-none focus:border-blue-500"
        >
          <option value="latest">Latest</option>
          <option value="oldest">Oldest</option>
        </select>

        <button
          onClick={resetFilters}
          className="px-6 py-3 bg-orange-200 text-gray-700 rounded-lg hover:bg-orange-300 transition-colors"
        >
          Reset
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded mb-4">
          <p>{error}</p>
        </div>
      )}

      <div className="min-h-[300px]">
        {loading ? (
          <div className="text-center py-10">
            <p className="text-gray-600">Loading blog posts...</p>
          </div>
        ) : blogs.length === 0 ? (
          <p className="text-gray-600 text-center py-10">
            No articles found matching your filters.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

