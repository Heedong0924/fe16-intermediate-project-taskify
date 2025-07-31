import { Skeleton } from '@/components/ui/skeleton';
import SkeletonParagraph from '@/components/ui/SkeletonParagraph';

const ColumnComponentSkeleton = () => {
  return (
    <div className="mt-[119px] flex h-full max-w-full grow flex-col md:mt-[59px] lg:flex-row">
      {[...Array(3)].map((_) => (
        <section className="shrink-0 border-r-1 px-5 lg:w-[354px]">
          <div className="flex h-full shrink-0 flex-col pt-[22px]">
            <div className="flex shrink-0 items-center justify-between">
              <div className="flex h-[26px] items-center">
                <Skeleton className="bg-taskify-neutral-300 h-2 w-2 shrink-0 rounded-full" />
                <Skeleton className="bg-taskify-neutral-300 mx-1 h-[26px] w-15" />
                <Skeleton className="bg-taskify-neutral-300 h-[26px] w-[26px]" />
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="bg-taskify-neutral-300 h-[26px] w-15" />
                <Skeleton className="bg-taskify-neutral-300 h-[26px] w-[26px]" />
              </div>
            </div>
            <Skeleton className="bg-taskify-neutral-300 my-5 h-10" />

            <SkeletonParagraph
              lines={3}
              lineClassName="bg-taskify-neutral-300 w-full h-20 my-4"
              isFadingOut
            />
          </div>
        </section>
      ))}
    </div>
  );
};

export default ColumnComponentSkeleton;
