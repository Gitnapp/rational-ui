import { Skeleton } from "@garage/ui/components/ui/skeleton";

import { ShowcaseSection, Stack } from "../showcase";

export function SkeletonSection() {
  return (
    <ShowcaseSection
      id="skeleton"
      title="Skeleton"
      description="Loading placeholder for content that hasn't arrived yet."
    >
      <Stack>
        <div className="flex items-center gap-3">
          <Skeleton className="size-10 rounded-full" />
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
      </Stack>
    </ShowcaseSection>
  );
}
