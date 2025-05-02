
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
<div>
    All Blogs
    <Link href={"/dashboard/blogs/create"} className='bg-gray-800 py-2 px-3 rounded-md text-gray-50'> Create New Blog</Link>
</div>
  )
}

export default page