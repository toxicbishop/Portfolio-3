"use client";

import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

export const Skeleton = ({ className }: SkeletonProps) => {
  return (
    <div className={cn("animate-pulse rounded-md bg-muted/50", className)} />
  );
};

export const ProjectCardSkeleton = () => {
  return (
    <div className="flex items-center justify-center">
      <div
        className="relative w-full max-w-[400px] h-auto rounded-lg overflow-hidden"
        style={{ aspectRatio: "3/2" }}>
        <Skeleton className="absolute inset-0" />
        <div className="absolute w-full h-1/2 bottom-0 left-0 p-6 flex flex-col justify-end gap-2">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-20" />
        </div>
      </div>
    </div>
  );
};

export const ModalContentSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 p-4">
      <Skeleton className="h-8 w-1/2 mx-auto" />
      <div className="flex justify-center gap-4">
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-10 w-24" />
      </div>
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-4 w-4/6" />
      <Skeleton className="h-48 w-full rounded-lg" />
    </div>
  );
};
