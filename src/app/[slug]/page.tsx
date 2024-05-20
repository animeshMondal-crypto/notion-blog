import React from "react";
import SingleBlogPage from "@/components/single-blog-page";

function Page({ params }: any) {
  const { slug } = params;
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <div className="max-w-full">
          <SingleBlogPage slug={slug} />
        </div>
      </div>
    </div>
  );
}

export default Page;
