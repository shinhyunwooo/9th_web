import { Routes, Route, Link } from "react-router-dom";
import LoginPage from "./pages/LoginPage";

function HomePage() {
  return (
    <div className="min-h-screen text-white flex flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold">홈 화면</h1>
      <Link to="/login" className="px-4 py-2 rounded-md bg-pink-500 hover:bg-pink-600">
        로그인으로 이동
      </Link>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}
