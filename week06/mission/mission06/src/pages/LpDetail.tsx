// src/pages/LpDetail.tsx
import { useParams } from "react-router-dom";
import { useGetLpDetail } from "../hooks/queries/useGetLpDetail";

const LpDetail = () => {
  const { lpId } = useParams();
  const { data, isPending, isError, refetch } = useGetLpDetail(lpId);

  if (isPending) return <div className="text-white text-2xl">Loading...</div>;
  if (isError)
    return (
      <div className="text-white text-xl flex flex-col items-center gap-3">
        에러가 발생했습니다.
        <button onClick={() => refetch()} className="px-3 py-1 rounded bg-white text-black hover:bg-white/80">
          다시 시도
        </button>
      </div>
    );
  if (!data) return null;

  return (
    <article className="mx-auto max-w-3xl space-y-5 p-6 bg-gray-800 rounded-2xl text-white">
      <header className="flex items-center justify-between text-sm opacity-90">
        <span>{data.author?.name ?? "작성자"}</span>
        <time>{new Date(data.updatedAt).toLocaleDateString()}</time>
      </header>

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">{data.title}</h1>
        <div className="flex items-center gap-4 text-sm">
          <button className="hover:underline">수정</button>
          <button className="hover:underline">삭제</button>
        </div>
      </div>

      {/* ✅ 썸네일: 실패 시 fallback.png로 대체 */}
      <img
        src={data.thumbnail || "/fallback.png"}
        alt={data.title}
        className="w-full max-h-[480px] object-cover rounded shadow-2xl"
        loading="lazy"
        decoding="async"
        onError={(e) => {
          const img = e.currentTarget as HTMLImageElement;
          img.src = "/fallback.png";
          img.onerror = null; // 루프 방지
        }}
      />

      <section className="leading-relaxed text-gray-100">{data.content}</section>

      <footer className="flex items-center justify-center gap-2 text-lg">
        <button className="text-2xl">❤️</button>
        <span>{data.likes?.length ?? 0}</span>
      </footer>
    </article>
  );
};

export default LpDetail;

