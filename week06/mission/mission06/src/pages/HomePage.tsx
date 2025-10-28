// src/pages/HomePage.tsx
import { useEffect, useState } from "react";
import LpCard from "../components/LpCard";
import SkeletonGrid from "../components/Skeleton";
import { useGetLpList } from "../hooks/queries/useGetLpList";
import { PAGINATION_ORDER } from "../enums/common";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [sort, setSort] = useState<PAGINATION_ORDER>(PAGINATION_ORDER.asc);
  const { data, isPending, isError, refetch } = useGetLpList({ order: sort, limit: 30 });
  const navigate = useNavigate();

  // 로그인 성공 후 복귀
  useEffect(() => {
    const postLoginRedirect = localStorage.getItem("postLoginRedirect");
    if (postLoginRedirect) {
      localStorage.removeItem("postLoginRedirect");
      navigate(postLoginRedirect);
    }
  }, [navigate]);

  if (isPending) return <SkeletonGrid count={12} />;

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

  return (
    <>
      <div className="flex justify-end mr-10 mb-3">
        <div className="flex border border-white rounded-md overflow-hidden">
          <button
            onClick={() => setSort(PAGINATION_ORDER.asc)}
            className={`px-4 py-1.5 text-sm font-medium ${
              sort === PAGINATION_ORDER.asc ? "bg-white text-black" : "text-white hover:bg-white/10"
            }`}
          >
            오래된순
          </button>
          <button
            onClick={() => setSort(PAGINATION_ORDER.desc)}
            className={`px-4 py-1.5 text-sm font-medium ${
              sort === PAGINATION_ORDER.desc ? "bg-white text-black" : "text-white hover:bg-white/10"
            }`}
          >
            최신순
          </button>
        </div>
      </div>
      {data && data.length === 0 && (
        <div className="text-white text-center my-10">
          표시할 LP가 없습니다. 먼저 업로드를 해보세요.
        </div>
      )}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-2">
        {data?.map((lp) => (
          <LpCard key={lp.id} lp={lp} />
        ))}
      </div>
    </>
  );
};

export default HomePage;
