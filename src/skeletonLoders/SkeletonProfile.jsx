import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function SkeletonProfile() {
  return (
    <div className="m-5 flex max-w-4xl justify-start md:justify-center mx-auto md:pl-10 md:px-5">
      <div className="flex flex-col gap-7 items-center sm:p-6 w-full">
        {/* Top Section */}
        <div className="px-3 flex gap-5 sm:gap-14 md:px-5 items-center w-full">
          {/* Avatar + bio (mobile) */}
          <section className="flex flex-col items-center">
            <span className="font-medium mb-3 md:hidden block">
              <Skeleton width={100} height={20} />
            </span>
            <Skeleton circle height={80} width={80} className="md:h-32 md:w-32" />

            {/* Bio under avatar (mobile only) */}
            <div className="flex flex-col gap-2 md:hidden mt-2">
              <Skeleton width={140} height={14} />
              <Skeleton width={100} height={14} />
            </div>
          </section>

          {/* Username + stats + buttons (desktop) */}
          <section className="flex flex-col gap-4 w-full">
            <div className="flex flex-col md:flex-row md:items-center md:gap-2 gap-4">
              {/* Username */}
              <span className="hidden md:block">
                <Skeleton width={120} height={20} />
              </span>

              {/* Buttons */}
              <div className="sm:flex gap-3 hidden">
                <Skeleton width={90} height={30} />
                <Skeleton width={100} height={30} />
                <Skeleton width={80} height={30} />
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-4">
              <Skeleton width={60} height={20} />
              <Skeleton width={60} height={20} />
              <Skeleton width={60} height={20} />
            </div>

            {/* Bio (desktop) */}
            <div className="hidden md:flex flex-col gap-2">
              <Skeleton width={160} height={16} />
              <Skeleton width={120} height={18} />
            </div>
          </section>
        </div>

        {/* Buttons (mobile only) */}
        <div className="flex gap-3 sm:hidden">
          <Skeleton width={90} height={30} />
          <Skeleton width={100} height={30} />
          <Skeleton width={80} height={30} />
        </div>

        {/* Tabs */}
        <div className="border-t border-t-gray-200 w-full">
          <div className="flex items-center justify-center gap-10 text-sm">
            <Skeleton width={50} height={20} />
            <Skeleton width={50} height={20} />
            <Skeleton width={50} height={20} />
            <Skeleton width={50} height={20} />
          </div>

          {/* Post grid */}
          <div className="grid grid-cols-3 sm:gap-1 gap-[1px] mb-12">
            {[...Array(6)].map((_, i) => (
              <Skeleton
                key={i}
                height={200}
                className="aspect-square w-full rounded-sm"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SkeletonProfile;
