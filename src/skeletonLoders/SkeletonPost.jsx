import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function SkeletonPost() {
  return (
    <div className="mb-8 md:my-8 w-full max-w-md mx-auto max-[484px]:max-w-none">
      
      {/* Top Section: Avatar + Name + More */}
      <div className="flex items-center justify-between max-[484px]:px-3">
        <div className="flex items-center gap-2">
          <Skeleton circle width={28} height={28} />
          <div className="flex items-center gap-3">
            <Skeleton width={80} height={14} />
            <Skeleton width={50} height={14} />
          </div>
        </div>
        <Skeleton width={20} height={20} />
      </div>

      {/* Image Section */}
      <Skeleton className="rounded-sm aspect-square my-2 w-full object-cover" height={360} />

      {/* Action Buttons (like, comment, share, bookmark) */}
      <div className="flex items-center justify-between my-2 max-[484px]:px-3">
        <div className="flex items-center gap-3">
          <Skeleton width={22} height={22} />
          <Skeleton width={22} height={22} />
          <Skeleton width={22} height={22} />
        </div>
        <Skeleton width={22} height={22} />
      </div>

      {/* Like count */}
      <Skeleton width={100} height={14} className="max-[484px]:px-3 block mb-2" />

      {/* Username + Caption */}
      <div className="flex flex-col gap-1">
        <Skeleton width={80} height={12} className="max-[484px]:px-3" />
        <Skeleton width={"80%"} height={12} />
      </div>

      {/* View comments */}
      <Skeleton width={120} height={12} className="max-[484px]:px-3 mt-1" />

      {/* Comment input + post button */}
      <div className="flex items-center justify-between mt-2">
        <Skeleton width={"80%"} height={20} className="max-[484px]:px-3" />
        <Skeleton width={40} height={20} className="max-[484px]:px-3" />
      </div>
    </div>
  );
}

export default SkeletonPost;
