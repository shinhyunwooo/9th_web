import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";

export default function Navbar() {
  const { logout, accessToken } = useAuth();

  return (
    // 화면 전체 너비 바
    <nav className="sticky top-0 z-50 w-full bg-gray-800">
      {/* 안쪽 컨테이너: 좌우 패딩만, 폭은 화면에 맞춰 유연 */}
      <div className="mx-auto w-full max-w-screen-2xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="text-2xl font-bold text-pink-500">홈</Link>
          <Link to="/me" className="text-sm text-gray-200 hover:underline">My Page</Link>
        </div>

        <div className="flex gap-3">
          {accessToken ? (
            <button className="rounded-lg bg-pink-600 px-4 py-2 text-white" onClick={logout}>
              로그아웃
            </button>
          ) : (
            <>
              <Link to="/login" className="px-4 py-2 text-white">로그인</Link>
              <Link to="/signup" className="rounded-lg bg-pink-600 px-4 py-2 text-white">회원가입</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
