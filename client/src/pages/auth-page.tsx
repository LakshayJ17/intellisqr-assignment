import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthSchema, type AuthInput } from "../schema/auth-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { loginUser, registerUser } from "../api/user-api";
import { useEffect } from "react";

export default function AuthPage() {
  const { pathname } = useLocation();

  const isSignup = pathname === "/signup";
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AuthInput>({
    resolver: zodResolver(AuthSchema),
  });

  const mutation = useMutation({
    mutationFn: isSignup ? registerUser : loginUser,
    onSuccess: (data) => {
      if (data?.token) localStorage.setItem("token", data.token);
      navigate("/dashboard");
    },
  });

  useEffect(() => {
    reset();
  }, [pathname]);

  return (
    <form
      onSubmit={handleSubmit((data) =>
        mutation.mutate({ email: data.email, password: data.password })
      )}
      className="flex flex-col max-w-5xl items-center justify-center border rounded-xl bg-yellow-400 gap-10 "
    >
      <h2>{isSignup ? "Sign Up" : "Sign In"}</h2>

      {isSignup ? (
        <div className="flex">
          <p>Already have an account ?</p>
          <button onClick={() => navigate("/signin")}>Signin</button>
        </div>
      ) : (
        <div className="flex">
          <p>New to platform ?</p>
          <button onClick={() => navigate("/signup")}>Signup</button>
        </div>
      )}

      <input {...register("email")} placeholder="Email" />
      {errors.email && <p className="text-red-600">{errors.email.message}</p>}

      <input {...register("password")} placeholder="Password" />
      {errors.password && (
        <p className="text-red-600">{errors.password.message}</p>
      )}

      <button type="submit" disabled={mutation.isPending}>
        {mutation.isPending
          ? isSignup
            ? "Signing up..."
            : "Signing in..."
          : isSignup
          ? "Sign Up"
          : "Sign In"}
      </button>

      {mutation.isError && (
        <p className="text-red-500">{mutation.error.message}</p>
      )}
    </form>
  );
}
