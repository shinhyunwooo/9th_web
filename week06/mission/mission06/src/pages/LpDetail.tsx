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
        <button
          onClick={() => refetch()}
          className="px-3 py-1 rounded bg-white text-black hover:bg-white/80"
        >
          다시 시도
        </button>
      </div>
    );

  if (!data) return null;

  return (
    <article className="mx-auto max-w-3xl space-y-5 p-6 bg-gray-800 rounded-2xl text-white">
      {/* 메타 */}
      <header className="flex items-center justify-between text-sm opacity-90">
        <span>{data.author?.name}</span>
        <time>{new Date(data.updatedAt).toLocaleDateString()}</time>
      </header>

      {/* 제목/액션 */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">{data.title}</h1>
        <div className="flex items-center gap-4 text-sm">
          <button className="hover:underline">수정</button>
          <button className="hover:underline">삭제</button>
        </div>
      </div>

      {/* 썸네일 */}
      <img src={data.thumbnail} alt={data.title} className="w-full rounded shadow-2xl" />

      {/* 본문 */}
      <section className="leading-relaxed text-gray-100">{data.content}</section>

      {/* 좋아요 */}
      <footer className="flex items-center justify-center gap-2 text-lg">
        <button className="text-2xl">❤️</button>
        <span>{data.likes.length}</span>
      </footer>
    </article>
  );
};

export default LpDetail;
