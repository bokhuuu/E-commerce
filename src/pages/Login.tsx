import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormData } from "../schemas/loginSchema";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const login = useAuthStore((s) => s.login);
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    login(data.email);
    navigate("/");

    setTimeout(() => {
      logout();
      navigate("/login");
    }, 10 * 1000);
  };

  return (
    <div className="max-w-sm mx-auto py-10">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register("email")}
          placeholder="Email"
          className="w-full border px-3 py-2 rounded"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        <input
          {...register("password")}
          placeholder="Password"
          type="password"
          className="w-full border px-3 py-2 rounded"
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
        >
          Log In
        </button>
      </form>
    </div>
  );
};

export default Login;
