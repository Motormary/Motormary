import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
      <div className="absolute top-[calc(50%-3rem)] left-[calc(50%-3rem)] w-24 h-24 animate-spin rounded-full bg-none border-t-8 blur-sm border-primary"></div>
  )
}
