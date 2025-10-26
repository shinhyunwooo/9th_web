import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "../schemas/authSchema";
import { useAuth } from "../context/authContext";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from?.pathname || "/";

  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: LoginFormData) => {
    const ok = await login(data);
    if (ok) navigate(from, { replace: true });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 px-4">
      <div className="w-full max-w-md">
        <button onClick={() => navigate(-1)} className="mb-8 flex items-center gap-2 text-white">
          <span className="text-2xl">←</span><span>뒤로가기</span>
        </button>

        <div className="rounded-lg bg-gray-800 p-8">
          <h1 className="mb-8 text-center text-3xl font-bold text-white">로그인</h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <input
                type="email"
                placeholder="이메일을 입력해주세요"
                {...register("email")}
                className="w-full rounded-lg bg-white px-4 py-3 text-gray-900 placeholder-gray-500"
              />
              {errors.email && <p className="mt-2 text-sm text-red-500">{errors.email.message}</p>}
            </div>

            <div>
              <input
                type="password"
                placeholder="비밀번호를 입력해주세요"
                {...register("password")}
                className="w-full rounded-lg bg-white px-4 py-3 text-gray-900 placeholder-gray-500"
              />
              {errors.password && <p className="mt-2 text-sm text-red-500">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              disabled={!isValid}
              className={`w-full rounded-lg py-3 font-semibold ${
                isValid ? "bg-pink-600 text-white" : "cursor-not-allowed bg-gray-600 text-gray-400"
              }`}
            >
              로그인
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
