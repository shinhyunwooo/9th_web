const SkeletonGrid = ({ count = 12 }: { count?: number }) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-2">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="w-full aspect-square bg-white/10 animate-pulse rounded" />
      ))}
    </div>
  );
};
export default SkeletonGrid;
