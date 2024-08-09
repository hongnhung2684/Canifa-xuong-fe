import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";

import instance from "../apis";

import { User } from "./../interfaces/User";
import { loginSchema, registerSchema } from "../utils/validation";
import { useAuth } from "../contexts/AuthContext";

type Props = {
  isLogin?: boolean;
};

// const userSchema = z.object({
//   email: z.string().email(),
//   password: z.string().min(6).max(255),
//   confirmPass: z.string().min(6).max(255),
// });

const AuthForm = ({ isLogin }: Props) => {
  const { login: contextLogin } = useAuth();
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    resolver: zodResolver(isLogin ? loginSchema : registerSchema),
  });
  const onSubmit = async (data: User) => {
    try {
      if (isLogin) {
        const res = await instance.post(`/auth/login`, data);
        contextLogin(res.data.accessToken, res.data.user);
        nav(res.data.user.role === "admin" ? "/admin" : "/");
      } else {
        const res = await instance.post(`/auth/register`, {
          email: data.email,
          password: data.password,
        });

        alert(res.data.message);
        nav("/login");
      }
    } catch (error: any) {
      alert(error.response?.data?.message || "Error!");
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>{isLogin ? "Login" : "Register"}</h1>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            className="form-control"
            type="email"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <span className="text-danger">{errors.email.message}</span>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            className="form-control"
            type="password"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <span className="text-danger">{errors.password.message}</span>
          )}
        </div>
        {!isLogin && (
          <div className="mb-3">
            <label htmlFor="confirmPass" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              {...register("confirmPass", { required: true })}
            />
            {errors.confirmPass && (
              <span className="text-danger">{errors.confirmPass.message}</span>
            )}
          </div>
        )}
        <button className="btn btn-primary w-100">
          {isLogin ? "Login" : "Register"}
        </button>
        {isLogin ? (
          <Link to="/register">Register</Link>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </form>
    </div>
  );
};
export default AuthForm;
