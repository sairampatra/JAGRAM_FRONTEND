import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css";

function SkelitonPost() {
  return (
     <div className="my-8 w-full max-w-sm mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Skeleton circle width={28} height={28} />
          <div className="flex items-center gap-3">
            <Skeleton width={80} height={14} />
            <Skeleton width={50} height={14} />
          </div>
        </div>
        <Skeleton width={20} height={20} />
      </div>

      <Skeleton className="rounded-sm aspect-square my-2 w-full object-cover" height={360} />

      <div className="flex items-center justify-between my-2">
        <div className="flex items-center gap-3">
          <Skeleton width={20} height={20} />
          <Skeleton width={20} height={20} />
          <Skeleton width={20} height={20} />
        </div>
        <Skeleton width={20} height={20} />
      </div>

      <Skeleton width={100} height={14} />
      <Skeleton width={200} height={14} />
      <Skeleton width={140} height={14} />

      <div className="flex items-center justify-between mt-2">
        <Skeleton width={"80%"} height={20} />
        <Skeleton width={40} height={20} />
      </div>
    </div>
    
  )
}

export default SkelitonPost

