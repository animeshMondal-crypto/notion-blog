import { Skeleton } from "@/components/ui/skeleton";

function Loading() {
  return (
    <div className="w-full h-full">
      <Skeleton className="h-40 w-full mb-4" />
      <div className="max-w-[47.5rem] m-auto flex flex-col gap-5">
        <Skeleton className="h-8 w-[200px] my-4" />
        <Skeleton className="h-10 w-full mb-2" />
        <Skeleton className="h-10 w-full mb-4" />
        <Skeleton className="h-48 w-full mb-4" />
      </div>
    </div>
  );
}

export default Loading;
