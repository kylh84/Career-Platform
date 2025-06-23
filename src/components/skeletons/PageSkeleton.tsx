import React from 'react';

const shimmer = 'bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:400%_100%] animate-[shimmer_1.5s_infinite]';

const PageSkeleton: React.FC = () => (
  <div className="pt-8 pb-8 px-4 md:px-10 ml-0 md:ml-[240px] space-y-8">
    {/* Title skeleton */}
    <div className={`h-8 w-1/3 rounded-lg ${shimmer}`}></div>
    {/* Subtitle skeleton */}
    <div className={`h-4 w-2/3 rounded ${shimmer}`}></div>
    <div className={`h-4 w-1/2 rounded ${shimmer}`}></div>
    {/* Card/content skeleton */}
    <div className={`h-64 w-full rounded-xl ${shimmer}`}></div>
    {/* Optional: Button skeletons */}
    <div className="flex gap-4 mt-8">
      <div className={`h-10 w-32 rounded-full ${shimmer}`}></div>
      <div className={`h-10 w-24 rounded-full ${shimmer}`}></div>
    </div>
  </div>
);

export default PageSkeleton;
