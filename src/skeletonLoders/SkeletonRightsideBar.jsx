import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function SkeletonRightsideBar() {
  return (
    <div className="w-[24%] my-10 pr-7 font-fredoka ">
      {/* Logged-in user skeleton */}
      <div className="flex items-center gap-2 mb-5">
        <Skeleton circle width={36} height={36} />
        <div className="flex flex-col gap-1">
          <Skeleton width={100} height={10} />
          <Skeleton width={140} height={10} />
        </div>
      </div>

      {/* Suggested section header */}
      <div className='flex items-center justify-between text-sm gap-4'>
        <Skeleton width={120} height={10} />
        <Skeleton width={50} height={10} />
      </div>

      {/* Suggested users skeleton (5 items) */}
      {[...Array(20)].map((_, index) => (
        <div key={index} className='flex items-center justify-between my-5 gap-3'>
          <div className='flex items-center gap-2 max-w-[80%]'>
            <Skeleton circle width={36} height={36} />
            <div className='flex flex-col gap-1'>
              <Skeleton width={100} height={10} />
              <Skeleton width={140} height={10} />
            </div>
          </div>
          <Skeleton width={50} height={10} />
        </div>
      ))}
    </div>
  )
}

export default SkeletonRightsideBar
