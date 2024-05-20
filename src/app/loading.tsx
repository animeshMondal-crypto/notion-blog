import { Skeleton } from "@/components/ui/skeleton";

function Loading() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-3xl font-bold text-center mb-8">Latest Blogs</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array(3)
            .fill(1)
            .map((_, index) => (
              <div key={index} className="rounded-lg overflow-hidden shadow-md">
                <Skeleton className="h-40 w-full" />
                <div className="px-4 py-10 flex flex-col gap-5">
                  <Skeleton className="h-4 w-[150px]" />
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-4 w-[100px]" />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Loading;
