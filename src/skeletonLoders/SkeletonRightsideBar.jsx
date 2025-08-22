import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function SkeletonRightsideBar() {
  return (
    <div className="px-2 md:pl-[9%] lg:pl-0 w-full lg:p-2 lg:w-[24%] lg:my-10 pt-3 lg:pr-7 font-fredoka lg:block bg-[#fcfbfb] lg:bg-transparent">
      
      {/* Logged-in user skeleton (desktop only) */}
      <div className="lg:flex items-center gap-2 hidden mb-5">
        <Skeleton circle width={36} height={36} />
        <div className="flex flex-col gap-1">
          <Skeleton width={100} height={10} />
          <Skeleton width={140} height={10} />
        </div>
      </div>

      {/* Suggested header (mobile) */}
      <h1 className="text-gray-600 lg:hidden mx-2">
        <Skeleton width={120} height={12} />
      </h1>

      {/* Suggested header (desktop) */}
      <div className="items-center justify-between text-sm gap-4 hidden lg:flex">
        <Skeleton width={120} height={10} />
        <Skeleton width={50} height={10} />
      </div>

      {/* Suggested users list */}
      <div className="lg:my-5 h-24 lg:h-auto hide-scrollbar overflow-auto flex lg:block gap-4 lg:gap-0 px-1">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className="flex items-center justify-center lg:justify-between my-5 gap-3 min-w-12"
          >
            <div className="flex items-center gap-2 max-w-[80%] flex-col lg:flex-row">
              <Skeleton circle width={48} height={48} />
              <div className="flex flex-col gap-1">
                <Skeleton width={80} height={10} />
                <div className="hidden lg:block">
                  <Skeleton width={120} height={10} />
                </div>
              </div>
            </div>
            <div className="hidden lg:block">
              <Skeleton width={50} height={10} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SkeletonRightsideBar;
