export function SkeletonTestCard() {
  return (
    <div className="animate-pulse p-4 border rounded-xl space-y-4 bg-[--surface-card]">
      <div className="h-40 bg-[--surface-card] rounded-md"></div>
      <div className="h-4 g-[--surface-card] rounded-md w-3/4"></div>
      <div className="h-4 g-[--surface-card] rounded-md w-1/2"></div>
      <div className="h-4 g-[--surface-card] rounded-md w-1/4"></div>
    </div>
  );
}
