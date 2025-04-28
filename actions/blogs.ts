"use server";

import { prismaClient } from "@/lib/db";
import { revalidatePath } from "next/cache";

// Updated interface to match Prisma return type
export interface BlogPostProps {
  id: string;
  title: string;
  slug: string;
  content: string | null;  // Changed to match Prisma's null possibility
  image: string;
  categories: string[];
  publishedAt: Date | null; // Changed to match Prisma's null possibility
  lastUpdated: string;
  isPublished: boolean;
  createdAt: Date;         // Added Prisma fields
  updatedAt?: Date;        // Added Prisma fields (optional as it might not always be present)
}

// Add this debug function to test database connection
export async function debugGetAllBlogPosts() {
  try {
    // Simple query to get all blog posts without any filters
    const allPosts = await prismaClient.blogPost.findMany();
    console.log("Total posts found:", allPosts.length);
    
    return {
      data: allPosts,
      count: allPosts.length,
      status: 200,
      error: null,
    };
  } catch (error) {
    console.error("Database error:", error);
    return {
      data: null,
      count: 0,
      status: 500,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

// Simplified getBlogPosts with better debugging
export async function getBlogPosts({
  search = "",
  category = "",
  sort = "latest",
  onlyPublished = true,
} = {}) {
  try {
    console.log("Server received filters:", { search, category, sort, onlyPublished });
    
    // Start with basic where clause
    let whereClause: any = {};
    
    // Only include published posts if specified
    if (onlyPublished) {
      whereClause.isPublished = true;
    }
    
    // Add search filter
    if (search && search.trim() !== "") {
      whereClause.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { content: { contains: search, mode: "insensitive" } },
      ];
    }
    
    // Add category filter
    if (category && category.trim() !== "") {
      whereClause.categories = { has: category };
    }
    
    // Simple sorting
const orderBy = sort === "oldest" 
? { createdAt: "asc" as const } 
: { createdAt: "desc" as const };
    
    
    // Execute query
    const blogPosts = await prismaClient.blogPost.findMany({
      where: whereClause,
      orderBy,
    });
    
    console.log(`Found ${blogPosts.length} matching blog posts`);
    
    return {
      data: blogPosts,
      status: 200,
      error: null,
    };
  } catch (error) {
    console.error("Error in getBlogPosts:", error);
    return {
      data: null,
      status: 500,
      error: String(error),
    };
  }
}

export async function createBlogPost(data: BlogPostProps) {
  try {
    const existingBlogPost = await prismaClient.blogPost.findUnique({
      where: {
        slug: data.slug,
      },
    });

    if (existingBlogPost) {
      return {
        data: null,
        status: 409,
        error: "Blog post with this slug already exists",
      };
    }

    const newBlogPost = await prismaClient.blogPost.create({
      data,
    });

    revalidatePath("/dashboard/blogs");
    console.log(newBlogPost);

    return {
      data: newBlogPost,
      status: 201,
      error: null,
    };
  } catch (error) {
    console.log(error);
    return {
      data: null,
      status: 500,
      error,
    };
  }
}

export async function updateBlogPost(id: string, data: BlogPostProps) {
  try {
    const existingBlogPost = await prismaClient.blogPost.findUnique({
      where: {
        id,
      },
    });

    if (!existingBlogPost) {
      return {
        data: null,
        status: 404,
        error: "Blog post does not exist",
      };
    }

    const updatedBlogPost = await prismaClient.blogPost.update({
      where: {
        id,
      },
      data,
    });

    revalidatePath("/dashboard/blogs");
    console.log(updatedBlogPost);

    return {
      data: updatedBlogPost,
      status: 201,
      error: null,
    };
  } catch (error) {
    console.log(error);
    return {
      data: null,
      status: 500,
      error,
    };
  }
}

// export async function createManyBlogPosts() {
//   try {
//     const blogPosts = [
//       {
//         title: "Understanding Modern Web Development",
//         slug: "understanding-modern-web-development",
//         image: "/female-carer.jpg",
//         categories: ["Technology", "Education"],
//         lastUpdated: "01/11/2024",
//         isPublished: true,
//       },
//       {
//         title: "Implementing Design Systems at Scale",
//         slug: "implementing-design-systems-at-scale",
//         image: "/female-carer.jpg",
//         categories: ["Design", "Development"],
//         lastUpdated: "01/11/2024",
//         isPublished: true,
//       },
//     ];

//     for (const blogPost of blogPosts) {
//       try {
//         await createBlogPost(blogPost);
//       } catch (error) {
//         console.error(`Error creating blog post "${blogPost.title}":`, error);
//       }
//     }

//     return {
//       status: 201,
//       error: null,
//     };
//   } catch (error) {
//     console.log(error);
//     return {
//       data: null,
//       status: 500,
//       error,
//     };
//   }
// }


export async function deleteBlogPost(id: string) {
    try {
      await prismaClient.blogPost.delete({
        where: {
          id,
        },
      });
  
      revalidatePath("/dashboard/blogs");
  
      return {
        ok: true,
        status: 200,
        error: null,
      };
    } catch (error) {
      console.log(error);
      return {
        data: null,
        status: 500,
        error,
      };
    }
  }
  
export async function getBlogPostBySlug(slug: string) {
  try {
    const blogPost = await prismaClient.blogPost.findUnique({
      where: {
        slug,
      },
    });

    return {
      data: blogPost,
      status: 200,
      error: null,
    };
  } catch (error) {
    console.log(error);
    return {
      data: null,
      status: 500,
      error,
    };
  }
}



export async function searchBlogPosts(query: string) {
  try {
    const blogPosts = await prismaClient.blogPost.findMany({
      where: {
        OR: [
          {
            title: {
              contains: query,
              mode: 'insensitive',
            },
          },
          {
            content: {
              contains: query,
              mode: 'insensitive',
            },
          },
        ],
        isPublished: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return {
      data: blogPosts,
      status: 200,
      error: null,
    };
  } catch (error) {
    console.log(error);
    return {
      data: null,
      status: 500,
      error,
    };
  }
}

export async function getBlogPostsByCategory(category: string) {
  try {
    const blogPosts = await prismaClient.blogPost.findMany({
      where: {
        categories: {
          has: category,
        },
        isPublished: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return {
      data: blogPosts,
      status: 200,
      error: null,
    };
  } catch (error) {
    console.log(error);
    return {
      data: null,
      status: 500,
      error,
    };
  }
}




// Keep your createBlogPost, updateBlogPost, createManyBlogPosts, deleteBlogPost, and getBlogPostBySlug as they are
// ... (unchanged code omitted for brevity)

// Updated getBlogPosts with filters
// export async function getBlogPosts({
//   search = "",
//   category = "",
//   sort = "latest",
//   onlyPublished = true,
// } = {}) {
//   try {
//     // Create a where clause object
//     const whereClause: any = {};
    
//     // Only include published posts unless specified otherwise
//     if (onlyPublished) {
//       whereClause.isPublished = true;
//     }
    
//     // Add search filter if provided
//     if (search && search.trim() !== "") {
//       whereClause.OR = [
//         { title: { contains: search, mode: "insensitive" } },
//         { content: { contains: search, mode: "insensitive" } },
//       ];
//     }
    
//     // Add category filter if provided and not empty
//     if (category && category !== "" && category !== "all") {
//       whereClause.categories = { has: category };
//     }
    
//     // Determine sort order
//     let orderBy: any = {};
//     if (sort === "latest") {
//       orderBy = { createdAt: "desc" };
//     } else if (sort === "oldest") {
//       orderBy = { createdAt: "asc" };
//     } else {
//       // Default to latest
//       orderBy = { createdAt: "desc" };
//     }

//     const blogPosts = await prismaClient.blogPost.findMany({
//       where: whereClause,
//       orderBy: orderBy,
//     });

//     return {
//       data: blogPosts,
//       status: 200,
//       error: null,
//     };
//   } catch (error) {
//     console.log(error);
//     return {
//       data: null,
//       status: 500,
//       error,
//     };
//   }
// }

// Optional: Keep getPublishedBlogPosts as a convenience function
export async function getPublishedBlogPosts() {
  return getBlogPosts({ onlyPublished: true });
}

// Remove redundant searchBlogPosts and getBlogPostsByCategory
// since getBlogPosts now handles these cases

// Add function to get all categories (useful for the frontend dropdown)
export async function getBlogCategories() {
  try {
    const posts = await prismaClient.blogPost.findMany({
      select: { categories: true },
      where: { isPublished: true },
    });
    const categories = Array.from(
      new Set(posts.flatMap((post) => post.categories))
    );
    return {
      data: ["", ...categories],
      status: 200,
      error: null,
    };
  } catch (error) {
    console.log(error);
    return {
      data: null,
      status: 500,
      error,
    };
  }
}