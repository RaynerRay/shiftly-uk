import React from 'react';
import { Search} from 'lucide-react';
import Image from 'next/image';

interface BlogPost {
  id: number;
  title: string;
  image: string;
  categories: string[];
  lastUpdated: string;
 
}

const BlogListingPage = () => {
  const posts: BlogPost[] = [
    {
      id: 1,
      title: 'Understanding Modern Web Development',
      image: '/female-carer.jpg',
      categories: ['Technology', 'Education'],
      lastUpdated: '01/11/2024'
    },
    {
      id: 2,
      title: 'Implementing Design Systems at Scale',
      image: '/female-carer.jpg',
      categories: ['Design', 'Development'],
      lastUpdated: '01/11/2024'
     
    },

  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">All Articles</h1>
        
        {/* Filters Section */}
        <div className="flex flex-wrap gap-4 mb-8">
          <div className="flex-1 min-w-[300px]">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-full p-3 pr-10 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-500"
              />
              <Search className="absolute right-3 top-3 text-gray-400" size={20} />
            </div>
          </div>
          
          <select className="p-3 rounded-lg border border-gray-200 min-w-[200px] focus:outline-none focus:border-blue-500">
            <option>All Hubs</option>
            <option>Learning Hub</option>
            <option>Company News</option>
          </select>
          
          <select className="p-3 rounded-lg border border-gray-200 min-w-[150px] focus:outline-none focus:border-blue-500">
            <option>All Sections</option>
            <option>Technology</option>
            <option>Education</option>
          </select>
          
          <select className="p-3 rounded-lg border border-gray-200 min-w-[150px] focus:outline-none focus:border-blue-500">
            <option>Sort</option>
            <option>Latest</option>
            <option>Popular</option>
          </select>
          
          <button className="px-6 py-3 bg-orange-200 text-gray-700 rounded-lg hover:bg-orange-300 transition-colors">
            Reset
          </button>
        </div>
        
        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="relative">
                <Image
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                  width={100}
                  height={100}
                />
                
              </div>
              
              <div className="p-4">
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.categories.map((category, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md"
                    >
                      {category}
                    </span>
                  ))}
                </div>
                
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  {post.title}
                </h2>
                
                <div className="flex items-center gap-3">
                <p className="text-xs text-gray-400">
                      Last updated: {post.lastUpdated}
                    </p>
               
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogListingPage;