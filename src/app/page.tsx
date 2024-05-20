import { getAllBlogs } from "@/lib/notion";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const dynamic = "force-dynamic";

async function Page() {
  const blogs = await getAllBlogs();

  return (
    <div className="flex flex-col min-h-screen mx-10">
      <div className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-3xl text-slate-700 font-bold text-center mb-8">
          Latest Blogs
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <Link href={`/${blog.slug}`} key={blog.id}>
              <div className="border rounded-lg overflow-hidden shadow-md cursor-pointer transform transition duration-300 hover:scale-105">
                <Image
                  src={blog.cover}
                  width={0}
                  height={0}
                  unoptimized={true}
                  alt={blog.title}
                  className="h-40 w-full object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
                  <p className="text-gray-400 mb-4">{blog.description}</p>
                  <p className="text-gray-500">{blog.date}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Page;
