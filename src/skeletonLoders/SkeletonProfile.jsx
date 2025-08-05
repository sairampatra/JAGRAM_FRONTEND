import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function SkeletonProfile() {
  return (
    <div className="flex max-w-4xl justify-center mx-auto pl-10">
      <div className="flex flex-col gap-20 p-8 w-full">
        {/* Top section */}
        <div className="grid grid-cols-2 gap-4">
          <section>
            <Skeleton circle height={128} width={128} />
          </section>
          <section className="flex flex-col gap-5">
            {/* Buttons + username */}
            <div className="flex items-center gap-2">
              <Skeleton width={100} height={20} />
              <Skeleton width={90} height={30} />
              <Skeleton width={100} height={30} />
              <Skeleton width={80} height={30} />
            </div>

            {/* Posts / Following / Followers */}
            <div className="flex items-center gap-4">
              <Skeleton width={60} height={20} />
              <Skeleton width={60} height={20} />
              <Skeleton width={60} height={20} />
            </div>

            {/* Bio and badge */}
            <div className="flex flex-col gap-1">
              <Skeleton width={150} height={16} />
              <Skeleton width={100} height={20} />
            </div>
          </section>
        </div>

        {/* Tabs */}
        <div className="border-t border-t-gray-200">
          <div className="flex items-center justify-center gap-10 text-sm py-3">
            <Skeleton width={50} height={20} />
            <Skeleton width={50} height={20} />
            <Skeleton width={50} height={20} />
            <Skeleton width={50} height={20} />
          </div>

          {/* Post grid */}
          <div className="grid grid-cols-3 gap-1">
            {[...Array(3)].map((_, i) => (
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
  )
}

export default SkeletonProfile
